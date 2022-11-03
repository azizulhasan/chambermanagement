import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { Multiselect } from 'multiselect-react-dropdown';
import { showModal, addSchedule, saveSchedule, updateSchedule } from "../../../store/schedulesSlice";
import { fetchUsers } from "../../../store/usersSlice";

import { useDispatch, useSelector } from "react-redux";

import { sliceComponentName } from "../../../utilities/utilities";
import { amOrPm } from '../../../utilities/timeUtilities'


import SlotPicker from './timeslots/SlotPicker';

/**
 * Css
 */

export default function SchedulesModal() {

  const { singleSchedule, isModalActive, options } = useSelector(state => state.schedules)
  const { users } = useSelector(state => state.users);

  const [schedule, setSchedule] = useState(() => singleSchedule)
  const [field, setField] = useState(() => []);
  const [selectedTime, setSelectedTime] = useState([]);
  const [lang, setLang] = useState('en');
  const interval = 60;

  const dispatch = useDispatch();
  /**
   * Handle content change value.
   * @param {event} e
   */
  const handleChange = (e) => {
    setSchedule({ ...schedule, ...{ [e.target.name]: e.target.value } });
    console.log(singleSchedule)
  };

  useEffect(() => {

    if (singleSchedule.branch) {
      setSchedule(singleSchedule)
      dispatch(showModal(true))
    }
    dispatch(fetchUsers());
  }, [singleSchedule, dispatch]);

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
    console.log(form.entries());
    return
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
      if (key === "image" && value.name === "" && schedule.image) {
        data[key] = schedule.image;
      } else {
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
      formData.append('id', data._id);
      dispatch(updateSchedule(formData));
    } else {
      dispatch(saveSchedule(formData));
    }
  };

  const scheduleAdd = () => {
    dispatch(addSchedule());
    setSchedule({});
  }


  const addToSelectedArray = (slot) => {
    let from = slot.format('hh:mm') + amOrPm(slot);
    let to = slot.add(schedule.perSessionLength ?? 60, 'm').format('hh:mm') + amOrPm(slot)

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
          <Form onSubmit={handleSubmit}>
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

            <Form.Group className="mb-4" controlId="schedule.branch">
              <Form.Label>Consultant</Form.Label>
              <Form.Select name="user" onChange={handleChange} defaultValue={'0'}>
                <option value={'0'}>Select Consultant</option>
                {users.length && users.map((user, i) => user.userRole === 'DOCTOR' ? (<option key={i} value={user._id}>{user.name}</option>)
                  : null)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-4" controlId="schedule.perSessionLength">
              <Form.Label>Per Session Length</Form.Label>
              <Form.Control
                type="number"
                name="perSessionLength"
                onChange={handleChange}
                value={schedule.perSessionLength ?? 60}
                placeholder="Per Session Length"
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="schedule.offDay" >
              <Form.Label>Off Day</Form.Label>
              <Multiselect
                options={options} // Options to display in the dropdown
                isObject={false}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="schedule.timeSlots">
              <Form.Label>Time Slots</Form.Label>
              <SlotPicker
                interval={schedule.perSessionLength ?? 60}
                from={'07:00'}
                to={'23:00'}
                unAvailableSlots={['12:00']}
                lang={lang}
                defaultSelectedTime="12:00"
                onSelectTime={s => addToSelectedArray(s)}
              />
            </Form.Group>

            <button
              className="azh_btn w-100"
              id="schedule.sumbit"
              type="submit"
            >
              {schedule._id ? "Update" : "Submit"}
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
