import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { Multiselect } from 'multiselect-react-dropdown';
import { showModal, addSchedule, saveSchedule, updateSchedule } from "../../../store/schedulesSlice";
import {useDispatch, useSelector} from "react-redux";

import { sliceComponentName } from "../../../utilities/utilities";

import SlotPicker  from './timeslots/SlotPicker';

/**
 * Css
 */

export default function SchedulesModal() {

  const { singleSchedule, isModalActive , options} = useSelector( state => state.schedules)
  const [schedule , setSchedule ] = useState(() => singleSchedule)
  const [field , setField ] = useState(() => []);
  const [selectedTime, setSelectedTime] = useState(0);
  const [lang, setLang] = useState('en');
  const interval = 30;

  const dispatch = useDispatch();
  /**
   * Handle content change value.
   * @param {event} e
   */
  const handleChange = (e) => {
    setSchedule({ ...schedule, ...{ [e.target.name]: e.target.value } });
  };

  useEffect(() => {
    
    if(singleSchedule.branch) {
      setSchedule(singleSchedule)
      dispatch(showModal(true))
    }
    console.log(singleSchedule)
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
          
            alert("Please fill the value of : " + key);
            return;
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


   const  onSelect = (selectedList, selectedItem) => {
    console.log(selectedList )
    console.log(selectedItem )
  }

  const onRemove =(selectedList, removedItem) =>{
    console.log(selectedList,removedItem )
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

            <Form.Group className="mb-4" controlId="schedule.branch">
              <Form.Label>Branch</Form.Label>
              <Form.Control
                type="text"
                name="branch"
                onChange={handleChange}
                value={schedule.branch}
                placeholder="branch name"
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="schedule.perSessionLength">
              <Form.Label>Per Session Lenghth</Form.Label>
              <Form.Control
                type="number"
                name="perSessionLength"
                onChange={handleChange}
                value={schedule.perSessionLength}
                placeholder="Per Session Lenghth"
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="schedule.offDay" >
            <Form.Label>Off Day</Form.Label>
              <Multiselect
                options={options} // Options to display in the dropdown
                isObject={false}
                style={{"color":"red"}}
                />
            </Form.Group>
            <Form.Group className="mb-4" controlId="schedule.timeSlots">
              <Form.Label>Time Slots</Form.Label>
               <SlotPicker
                interval={schedule.perSessionLength}
                from={'07:00'}
                to={'23:00'}
                unAvailableSlots={['12:00']}
                lang={lang}
                defaultSelectedTime="12:00"
                onSelectTime={s => setSelectedTime(s)}
            />
            </Form.Group>
          
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
