import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { showModal, addService, saveService, updateService } from "../../../store/serviceSlice";
import {useDispatch, useSelector} from "react-redux";

import { Editor } from "@tinymce/tinymce-react";

import { getIframeContent, previewImage } from "./ServicesHooks";
import { sliceComponentName } from "../../context/utilities";
/**
 * Css
 */

export default function ServicesModal() {

  const { singleService, isModalActive } = useSelector( state => state.services)

  const [service , setService ] = useState(() => singleService)

  const dispatch = useDispatch();
  /**
   * Handle content change value.
   * @param {event} e
   */
  const handleChange = (e) => {
    setService({ ...service, ...{ [e.target.name]: e.target.value } });
  };

  useEffect(() => {
    setService(singleService)
  }, [singleService]);
  
  /**
   * Handle services content form submission
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
          (key === "image" && value.name === "" && !service.image)
        ) {
          alert("Please fill the value of : " + key);
          return;
        }
      if(key === "image" && value.name === "" && service.image){
        data[key] = service.image;
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
      dispatch( updateService( formData ) ) ;
    } else {
      dispatch( saveService( formData ) ) ;
    }
  };
  return (
    <>
      <Button bsPrefix="azh_btn" onClick={(e) => dispatch(addService())}>
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
            {service._id
              ? `Update ${sliceComponentName()} Section Content`
              : `${sliceComponentName()} Section Content`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} encType='multipart/form-data'>
            {service._id && (
              <Form.Control
                type="text"
                id="_id"
                onChange={handleChange}
                value={service._id}
                name="_id"
                placeholder="id"
                hidden
              />
            )}

            <Form.Group className="mb-4" controlId="service.title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                onChange={handleChange}
                value={service.title}
                placeholder="title"
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="service.details">
              <Form.Label>Details</Form.Label>
              <Editor
                initialValue={service.details}
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
                <Form.Group className="mb-4" controlId="service.image">
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
                  controlId="service.imagePreview"
                >
                  <img
                    id="previewImage"
                    height="100"
                    width="100"
                    alt={service.image}
                    src={service.image}
                  />
                </Form.Group>
              </Col>
            </Row>
            <button
              className="azh_btn w-100"
              type="submit"
              id="service.sumbit"
            >
              {service._id ? "Update" : "Submit"}
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
