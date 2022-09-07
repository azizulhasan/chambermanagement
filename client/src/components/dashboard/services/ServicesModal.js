import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

import { Editor } from "@tinymce/tinymce-react";

import { getData, postData, getIframeContent, previewImage } from "./ServicesHooks";
import { sliceComponentName } from "../../context/utilities";
/**
 * Css
 */

export default function ServicesModal({
  setServicesData,
  updateBtn,
  modalShow,
  lgShow,
}) {
  const [services, setData] = useState({
    _id: "",
    title: "",
    image: '',
    details: "",
  });
  useEffect(() => {
    if (lgShow === true) {
      if (updateBtn.id !== "") {
        getServicesContent(updateBtn.id);
      } else {
        setData({
          _id: "",
          title: "",
          image: '',
          details: "",
        });
      }
    }
  }, [lgShow]);

  /**
   * get services content by id.
   * @param {id} id
   */
  const getServicesContent = (id) => {
    getData(process.env.REACT_APP_API_URL + "/api/services/" + id)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /**
   * Handle content change value.
   * @param {event} e
   */
  const handleChange = (e) => {
    setData({ ...services, ...{ [e.target.name]: e.target.value } });
  };
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
          (key === "image" && value.name === "" && !services.image)
        ) {
          alert("Please fill the value of : " + key);
          return;
        }
      if(key === "image" && value.name === "" && services.image){
        data[key] = services.image;
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
    
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    // return
    /**
     * Update data if "_id" exists. else save form data.
     */
    if (data._id !== undefined) {
      postData(
        process.env.REACT_APP_API_URL + "/api/services/" + data._id,
        formData
      )
        .then((res) => {
          for( let i = 0; i < res.data.length; i++ ) {
            res.data[i].image = `<img id="previewImage_${i}" height="20" width="20" alt="" src="${res.data[i].image}">`
          }
          setServicesData(res.data);
          modalShow(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      postData(process.env.REACT_APP_API_URL + "/api/services", formData)
        .then((res) => {
          for( let i = 0; i < res.data.length; i++ ) {
            res.data[i].image = `<img id="previewImage_${i}" height="20" width="20" alt="" src="${res.data[i].image}">`
          }
          setServicesData(res.data);
          modalShow(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <Button bsPrefix="azh_btn" onClick={(e) => modalShow(true)}>
        Add {sliceComponentName()}
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={(e) => modalShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {updateBtn.display
              ? `Update ${sliceComponentName()} Section Content`
              : `${sliceComponentName()} Section Content`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} encType='multipart/form-data'>
            {updateBtn.display && (
              <Form.Control
                type="text"
                id="_id"
                onChange={handleChange}
                value={services._id}
                name="_id"
                placeholder="id"
                hidden
              />
            )}

            <Form.Group className="mb-4" controlId="services.title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                onChange={handleChange}
                value={services.title}
                placeholder="title"
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="services.details">
              <Form.Label>Details</Form.Label>
              <Editor
                initialValue={services.details}
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
                <Form.Group className="mb-4" controlId="services.image">
                  <Form.Label> Image</Form.Label>
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
                  controlId="services.imagePreview"
                >
                  <img
                    id="previewImage"
                    height="100"
                    width="100"
                    alt={services.image}
                    src={services.image}
                  />
                </Form.Group>
              </Col>
            </Row>
            <button
              className="azh_btn w-100"
              type="submit"
              id="services.sumbit"
            >
              {updateBtn.display ? "Update" : "Submit"}
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
