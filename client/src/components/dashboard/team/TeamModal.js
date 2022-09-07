import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

import { Editor } from "@tinymce/tinymce-react";

import { getData, postData, getIframeContent, previewImage } from "./TeamHooks";
import { sliceComponentName } from "../../context/utilities";
/**
 * Css
 */

export default function TeamModal({
  setTeamData,
  updateBtn,
  modalShow,
  lgShow,
}) {
const [team, setData] = useState({
    _id: "",
    name: "",
    speciality:'',
    services: [],
    image: '',
    details: "",
  });
  const [services, setServices] = useState([]);
  useEffect(() => {
    getData(process.env.REACT_APP_API_URL + "/api/services").then((res) => {

      let serviceArr = [];
      for( let i = 0; i < res.data.length; i++ ) {
        let temp = { 
          title: res.data[i].title,
          _id: res.data[i]._id
        }
        serviceArr.push(temp)
      }
      setServices(serviceArr);
    });
  }, []);
  useEffect(() => {
    if (lgShow === true) {
      if (updateBtn.id !== "") {
        getTeamContent(updateBtn.id);
      } else {
        setData({
          _id: "",
          name: "",
          speciality:'',
          services: [],
          image: '',
          details: "",
        });
      }
    }
  }, [lgShow]);

  /**
   * get team content by id.
   * @param {id} id
   */
  const getTeamContent = (id) => {
    getData(process.env.REACT_APP_API_URL + "/api/team/" + id)
      .then((res) => {
        setData(res)
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
    setData({ ...team, ...{ [e.target.name]: e.target.value } });
  };
  /**
   * Handle team content form submission
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
    let arr = []
    for (let [key, value] of form.entries()) {
        if (
          key === "" ||
          value === "" ||
          (key === "image" && value.name === "" && !team.image)
        ) {
          alert("Please fill the value of : " + key);
          return;
        }
      if(key === "image" && value.name === "" && team.image){
        data[key] = team.image;
      }else if (key === "services") {
        arr.push(value);
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
    formData.append("services", JSON.stringify(arr));
    
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    // return
    /**
     * Update data if "_id" exists. else save form data.
     */
    if (data._id !== undefined) {
      postData(
        process.env.REACT_APP_API_URL + "/api/team/" + data._id,
        formData
      )
        .then((res) => {
          for( let i = 0; i < res.data.length; i++ ) {
            res.data[i].image = `<img id="previewImage_${i}" height="20" width="20" alt="" src="${res.data[i].image}">`
          }
          setTeamData(res.data);
          modalShow(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      postData(process.env.REACT_APP_API_URL + "/api/team", formData)
        .then((res) => {
          for( let i = 0; i < res.data.length; i++ ) {
            res.data[i].image = `<img id="previewImage_${i}" height="20" width="20" alt="" src="${res.data[i].image}">`
          }
          setTeamData(res.data);
          modalShow(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const isSelected = id => {
    if(team.services.length){
      return team.services[0].includes(id)? true: false;
    }
  }

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
                value={team._id}
                name="_id"
                placeholder="id"
                hidden
              />
            )}

            <Form.Group className="mb-4" controlId="team.name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                value={team.name}
                placeholder="name"
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="team.speciality">
              <Form.Label>Speciality</Form.Label>
              <Form.Control
                type="text"
                name="speciality"
                onChange={handleChange}
                value={team.speciality}
                placeholder="speciality"
              />
            </Form.Group>
              <Form.Group className="mb-4" controlId="team.services">
              <Form.Label>Services</Form.Label>
              <Form.Select name="services" defaultValue={team.services}   multiple>
                <option disabled value={0} >Select Services</option>
                {services.length && services.map((item, index)=>{
                  return (
                    <option key={index}  value={item._id} selected={isSelected(item._id)} >{item.title}</option>
                  )
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-4" controlId="team.details">
              <Form.Label>Details</Form.Label>
              <Editor
                initialValue={team.details}
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
                <Form.Group className="mb-4" controlId="team.image">
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
                  controlId="team.imagePreview">
                  <img
                    id="previewImage"
                    height="100"
                    width="100"
                    alt={team.image}
                    src={team.image}
                  />
                </Form.Group>
              </Col>
            </Row>
            <button
              className="azh_btn w-100"
              type="submit"
              id="team.sumbit"
            >
              {updateBtn.display ? "Update" : "Submit"}
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
