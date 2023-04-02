import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { Multiselect } from 'multiselect-react-dropdown';
import {
    showModal,
    addSchedule,
    saveSchedule,
    updateSchedule,
    updateScheduleState,
    fetchSchedules,
} from '../../../store/schedulesSlice';
import { fetchUsers } from '../../../store/usersSlice';

import { useDispatch, useSelector } from 'react-redux';

import { sliceComponentName } from '../../../utilities/utilities';
import { amOrPm } from '../../../utilities/timeUtilities';

import SlotPicker from './timeslots/SlotPicker';

/**
 * Css
 */

export default function SchedulesModal() {
    const dispatch = useDispatch();
    const { schedules } = useSelector((state) => state.schedules);
    const { singleUser } = useSelector((state) => state.users);
    useEffect(() => {
        dispatch(fetchSchedules());
    }, []);

    const { singleSchedule, isModalActive, options } = useSelector(
        (state) => state.schedules
    );
    const { users } = useSelector((state) => state.users);

    const [schedule, setSchedule] = useState(() => singleSchedule);
    const [field, setField] = useState(() => []);
    const [selectedTime, setSelectedTime] = useState([]);
    const [lang, setLang] = useState('en');
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const interval = 60;

    /**
     * Handle content change value.
     * @param {event} e
     */
    const handleChange = (e) => {
        if (Array.isArray(e)) {
            let data = { offDay: e };
            dispatch(updateScheduleState(data));
        } else {
            let data = { [e.target.name]: e.target.value };
            dispatch(updateScheduleState(data));
        }
    };

    useEffect(() => {
        if (singleSchedule._id) {
            setIsUpdateMode(true);
        }
        dispatch(fetchUsers());
    }, []);

    useEffect(() => {
        if (singleSchedule._id) {
            dispatch(showModal(true));
            setSchedule(singleSchedule);
        }
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
        let data = {};
        for (let [key, value] of form.entries()) {
            data[key] = value;
            if (key === '' || value === '') {
                if (key !== 'search_name_input') {
                    alert('Please fill the value of : ' + key);
                    return;
                }
            }
        }

        if (!singleSchedule.timeSlots.length) {
            alert('Please fill Time slots');
        }
        /**
         * Update data if "_id" exists. else save form data.
         */

        if (data._id !== undefined) {
            console.log({ sID96: data._id });
            dispatch(updateSchedule([data._id, singleSchedule]));
        } else {
            dispatch(saveSchedule(singleSchedule));
        }
    };

    const scheduleAdd = () => {
        dispatch(addSchedule());
    };

    const addToSelectedArray = (slot) => {
        let from = slot.format('hh:mm') + amOrPm(slot);
        let to =
            slot
                .add(singleSchedule.perSessionLength ?? 60, 'm')
                .format('hh:mm') + amOrPm(slot);
    };

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
                        {singleSchedule._id
                            ? `Update ${sliceComponentName()} Section Content`
                            : `${sliceComponentName()} Section Content`}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        {singleSchedule._id && (
                            <Form.Control
                                type="text"
                                id="_id"
                                onChange={handleChange}
                                value={singleSchedule._id}
                                name="_id"
                                placeholder="id"
                                hidden
                            />
                        )}
                        <Form.Group
                            className="mb-4"
                            controlId="singleSchedule.branch"
                        >
                            <Form.Label>Branch</Form.Label>
                            <Form.Control
                                type="text"
                                name="branch"
                                onChange={handleChange}
                                value={singleSchedule.branch}
                                placeholder="branch name"
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-4"
                            controlId="singleSchedule.branch"
                        >
                            <Form.Label>Consultant</Form.Label>
                            <Form.Select
                                name="user"
                                onChange={handleChange}
                                defaultValue={singleSchedule.user}
                            >
                                {!isUpdateMode && (
                                    <option value={'0'}>
                                        Select Consultant
                                    </option>
                                )}
                                {users.length &&
                                    users.map((user, i) =>
                                        user.userRole === 'DOCTOR' ? (
                                            <option key={i} value={user._id}>
                                                {user.name}
                                            </option>
                                        ) : null
                                    )}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group
                            className="mb-4"
                            controlId="singleSchedule.perSessionLength"
                        >
                            <Form.Label>Per Session Length</Form.Label>
                            <Form.Control
                                type="number"
                                name="perSessionLength"
                                onChange={handleChange}
                                value={singleSchedule.perSessionLength ?? 60}
                                placeholder="Per Session Length"
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-4"
                            controlId="singleSchedule.offDay"
                        >
                            <Form.Label>Off Day</Form.Label>
                            <Multiselect
                                onSelect={handleChange}
                                onRemove={handleChange}
                                options={options} // Options to display in the dropdown
                                isObject={false}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-4"
                            controlId="singleSchedule.timeSlots"
                        >
                            <Form.Label>Time Slots</Form.Label>
                            <SlotPicker
                                interval={singleSchedule.perSessionLength ?? 60}
                                from={'07:00'}
                                to={'23:00'}
                                unAvailableSlots={['12:00']}
                                lang={'en'}
                                defaultSelectedTime=""
                                onSelectTime={(s) => addToSelectedArray(s)}
                            />
                        </Form.Group>

                        <button
                            className="azh_btn w-100"
                            id="singleSchedule.sumbit"
                            type="submit"
                        >
                            {singleSchedule._id ? 'Update' : 'Submit'}
                        </button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
