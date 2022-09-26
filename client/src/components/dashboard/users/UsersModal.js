import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { showModal, addUser, saveUser, updateUser } from "../../../store/usersSlice";
import {useDispatch, useSelector} from "react-redux";

import { Editor } from "@tinymce/tinymce-react";

import { getIframeContent, previewImage } from "./UsersHooks";
import { sliceComponentName } from "../../context/utilities";
/**
 * Css
 */

export default function UsersModal() {

  const { singleUser, isModalActive } = useSelector( state => state.users)

  const [user , setUser ] = useState(() => singleUser)

  const dispatch = useDispatch();
  /**
   * Handle content change value.
   * @param {event} e
   */
  const handleChange = (e) => {
    setUser({ ...user, ...{ [e.target.name]: e.target.value } });
  };

  useEffect(() => {
    setUser(singleUser)
  }, [singleUser]);
  
  /**
   * Handle users content form submission
   * @param {event} e
   * @returns
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    /**
     * Get full form data and modify them for saving to database.
     */
    let form = new FormData(e.target);
    let data = {};
    for (let [key, value] of form.entries()) {
        if (
          key === "" ||
          value === "" ||
          (key === "image" && value.name === "" && !user.image)
        ) {
          alert("Please fill the value of : " + key);
          return;
        }
      if(key === "image" && value.name === "" && user.image){
        data[key] = user.image;
      }else{
        data[key] = value;
      }
    }
    /**
     * format form data.
     */
    let formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "_id") {
      } else {
        formData.append(key, data[key]);
      }
    });
    formData.append("details", getIframeContent());
    
    
    /**
     * Update data if "_id" exists. else save form data.
     */
    if (data._id !== undefined) {
      formData.append( 'id', data._id );
      dispatch( updateUser( formData ) ) ;
    } else {
      dispatch( saveUser( formData ) ) ;
    }
  };
  return (
    <>
      <Button bsPrefix="azh_btn" onClick={(e) => dispatch(addUser())}>
        Add {sliceComponentName()}
      </Button>
      <Modal
        size="lg"
        show={isModalActive}
        onHide={(e) => dispatch(showModal(false))}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {user._id
              ? `Update ${sliceComponentName()} Section Content`
              : `${sliceComponentName()} Section Content`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} encType='multipart/form-data'>
            {user._id && (
              <Form.Control
                type="text"
                id="_id"
                onChange={handleChange}
                value={user._id}
                name="_id"
                placeholder="id"
                hidden
              />
            )}

            <Form.Group className="mb-4" controlId="user.title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                onChange={handleChange}
                value={user.title}
                placeholder="title"
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="user.details">
              <Form.Label>Details</Form.Label>
              <Editor
                initialValue={user.details}
                name="details"
                init={{
                  height: 200,
                  menubar: true,
                  plugins: [
                    "a11ychecker advcode advlist anchor autolink codesample fullscreen help  tinydrive",
                    " lists link media noneditable powerpaste preview",
                    " searchreplace table template tinymcespellchecker visualblocks wordcount",
                  ],
                  toolbar:
                    "insertfile a11ycheck undo redo | bold italic | forecolor backcolor | template codesample | alignleft aligncenter alignright alignjustify | bullist numlist | link image tinydrive",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
            </Form.Group>
                        <Row>
              <Col xs={12} sm={6} lg={6}>
                <Form.Group className="mb-4" controlId="user.image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    accept=".png, .jpg, .jpeg, .svg, .gif"
                    name="image"
                    onChange={previewImage}
                    type="file"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} lg={6}>
                <Form.Group
                  className="mb-4"
                  controlId="user.imagePreview"
                >
                  <img
                    id="previewImage"
                    height="100"
                    width="100"
                    alt={user.image}
                    src={user.image}
                  />
                </Form.Group>
              </Col>
            </Row>
            <button
              className="azh_btn w-100"
              type="submit"
              id="user.sumbit"
            >
              {user._id ? "Update" : "Submit"}
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
