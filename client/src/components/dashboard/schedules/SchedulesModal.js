import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { showModal, addSchedule, saveSchedule, updateSchedule } from "../../../store/schedulesSlice";
import {useDispatch, useSelector} from "react-redux";

import { Editor } from "@tinymce/tinymce-react";

import { getIframeContent, previewImage } from "./SchedulesHooks";
import { sliceComponentName } from "../../../utilities/utilities";

/**
 * Css
 */

export default function SchedulesModal() {

  const { singleSchedule, isModalActive , SCHEDULE_ROLES} = useSelector( state => state.schedules)

  const [schedule , setSchedule ] = useState(() => singleSchedule)

  const dispatch = useDispatch();
  /**
   * Handle content change value.
   * @param {event} e
   */
  const handleChange = (e) => {
    if(e.target.name === 'scheduleRole' && e.target.value === 'DOCTOR' ) {
      document.getElementsByClassName('schedule.speciality')[0].style.display= 'block'
    }else if(e.target.name === 'scheduleRole' && e.target.value !== 'DOCTOR' ) {
      document.getElementsByClassName('schedule.speciality')[0].style.display= 'none'
    }
    setSchedule({ ...schedule, ...{ [e.target.name]: e.target.value } });
  };

  useEffect(() => {
    
    if(singleSchedule.name) {
      setSchedule(singleSchedule)
      dispatch(showModal(true))
    }

  }, [singleSchedule]);
  
  /**
   * Handle schedules content form submission
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
          (key === "image" && value.name === "" && !schedule.image)
        ) {
          if(data.scheduleRole !== 'DOCTOR' && key == 'speciality'){

          }else{
            alert("Please fill the value of : " + key);
            return;
          }
          
        }
      if(key === "image" && value.name === "" && schedule.image){
        data[key] = schedule.image;
      }else{
        data[key] = value;
      }
    }
    /**
     * format form data.
     */
    let formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key !== "_id") {
        formData.append(key, data[key]);
      }
    });
    formData.append("details", getIframeContent());
    
    // for( data of formData.values()){
    //   console.log(data)
    // }
    
    
    /**
     * Update data if "_id" exists. else save form data.
     */
    if (data._id !== undefined) {
      formData.append( 'id', data._id );
      dispatch( updateSchedule( formData ) ) ;
    } else {
      dispatch( saveSchedule( formData ) ) ;
    }
  };

  const scheduleAdd = () => {
    dispatch(addSchedule());
    setSchedule({});
  }
  return (
    <>
      <Button bsPrefix="azh_btn" onClick={(e) => scheduleAdd()}>
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
            {schedule._id
              ? `Update ${sliceComponentName()} Section Content`
              : `${sliceComponentName()} Section Content`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} encType='multipart/form-data'>
            {schedule._id && (
              <Form.Control
                type="text"
                id="_id"
                onChange={handleChange}
                value={schedule._id}
                name="_id"
                placeholder="id"
                hidden
              />
            )}

            <Form.Group className="mb-4" controlId="schedule.name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                value={schedule.name}
                placeholder="name"
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="schedule.email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleChange}
                value={schedule.email}
                placeholder="email"
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="schedule.phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                name="phone"
                onChange={handleChange}
                value={schedule.phone}
                placeholder="phone"
              />
            </Form.Group> 
            <Form.Group className="mb-4" controlId="schedule.scheduleRole">
              <Form.Label>Schedule Role</Form.Label>
              <Form.Select  name="scheduleRole"  onChange={handleChange} defaultValue={schedule.scheduleRole}>
                <option value="0">Select A Role</option>
                { SCHEDULE_ROLES.length &&  SCHEDULE_ROLES.map((role, index)=>{
                  return <option key={index} value={role}>{role}</option>
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group style={ schedule.speciality ? {"display": "block"} :  {"display": "none"}} className="mb-4 schedule.speciality" controlId="schedule.speciality">
              <Form.Label>Speciality</Form.Label>
              <Form.Control
                type="text"
                name="speciality"
                onChange={handleChange}
                value={schedule.speciality}
                placeholder="speciality"
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="schedule.details">
              <Form.Label>Details</Form.Label>
              <Editor
                initialValue={schedule.details}
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
                <Form.Group className="mb-4" controlId="schedule.image">
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
                  controlId="schedule.imagePreview"
                >
                  <img
                    id="previewImage"
                    height="100"
                    width="100"
                    alt={schedule.image}
                    src={schedule.image}
                  />
                </Form.Group>
              </Col>
            </Row>
            <button
              className="azh_btn w-100"
              type="submit"
              id="schedule.sumbit"
            >
              {schedule._id ? "Update" : "Submit"}
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
