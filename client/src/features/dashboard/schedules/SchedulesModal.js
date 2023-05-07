import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
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
import { fetchBranches } from '../../../store/branchesSlice';

/**
 * Css
 */

export default function SchedulesModal() {
    const dispatch = useDispatch();
    const { schedules } = useSelector((state) => state.schedules);
    useEffect(() => {
        dispatch(fetchSchedules());
    }, []);

    const { singleSchedule, isModalActive, options } = useSelector(
        (state) => state.schedules
    );
    const { users } = useSelector((state) => state.users);
    const { branches } = useSelector((state) => state.branches);


    const [isUpdateMode, setIsUpdateMode] = useState(false);

    /**
     * Handle content change value.
     * @param {event} e
     */
    const handleChange = (e) => {
        if (Array.isArray(e)) {
            let data = { offDay: e };
            dispatch(updateScheduleState(data));
        } else {
            let isScheduledWithBranch = false;
            if (singleSchedule.sessionType === 'physical' && e.target.name === 'user' && e.target.value !== '0') {
                schedules.map(schedule => {
                    if (schedule.user === e.target.value && schedule.branch === singleSchedule.branch) {
                        isScheduledWithBranch = true;
                    }
                })
            }

            if (singleSchedule.sessionType === 'physical' && e.target.name === 'branch' && e.target.value !== '0') {
                schedules.map(schedule => {
                    if (schedule.user === singleSchedule.user && schedule.branch === e.target.value) {
                        isScheduledWithBranch = true;
                    }
                })
            }

            if (isScheduledWithBranch) {
                alert('This dorctor/consultant schedule already done with this branch.')
                e.target.value = '0'
                return;
            }


            let data = { [e.target.name]: e.target.value };
            dispatch(updateScheduleState(data));
        }
    };

    useEffect(() => {
        if (singleSchedule._id) {
            setIsUpdateMode(true);
        }
        dispatch(fetchUsers());
        dispatch(fetchBranches());
    }, []);

    useEffect(() => {
        if (singleSchedule._id) {
            dispatch(showModal(true));
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
            data[key] = value;
            if (key === '' || value === '' || value === '0') {
                if (key !== 'search_name_input') {
                    alert('Please fill the value of : ' + key);
                    return;
                }
            }
        }

        if (!singleSchedule.timeSlots.length) {
            alert('Please fill Time slots');
            return;
        }

        /**
         * Update data if "_id" exists. else save form data.
         */
        if (data._id !== undefined) {
            let tempData = {
                ...singleSchedule,
                ...{ id: data._id }
            }
            dispatch(updateSchedule({
                endpoint: `/api/schedules/${data._id}`,
                config: {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'PUT',
                    body: JSON.stringify(tempData),
                },
            }));
        } else {
            dispatch(saveSchedule({
                endpoint: '/api/schedules',
                config: {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(singleSchedule),
                },
            }))
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
                            controlId="singleSchedule.sessionType"
                        >
                            <Form.Label>Session Type</Form.Label>
                            <Form.Select
                                name="sessionType"
                                onChange={handleChange}
                                defaultValue={singleSchedule.sessionType}
                                required
                            >
                                <option value="physical">Physical</option>
                                <option value="online">Online</option>
                            </Form.Select>
                        </Form.Group>

                        {singleSchedule.sessionType === 'physical' && <Form.Group
                            className="mb-4"
                            controlId="singleSchedule.branch"
                        >
                            <Form.Label>Branch Name</Form.Label>
                            <Form.Select
                                name="branch"
                                onChange={handleChange}
                                defaultValue={singleSchedule.branch}
                                required
                            >
                                <option value="0">Select Branch Name</option>
                                {branches.length &&
                                    branches.map((branch, i) =>
                                        <option key={i} value={branch._id}>
                                            {branch.name}
                                        </option>
                                    )}
                            </Form.Select>
                        </Form.Group>}


                        <Form.Group
                            className="mb-4"
                            controlId="singleSchedule.user"
                        >
                            <Form.Label>Consultant</Form.Label>
                            <Form.Select
                                name="user"
                                onChange={handleChange}
                                defaultValue={singleSchedule.user}
                                required
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
                            controlId="singleSchedule.sessionFee"
                        >
                            <Form.Label>Session Fee</Form.Label>
                            <Form.Control
                                type="number"
                                name="sessionFee"
                                onChange={handleChange}
                                value={singleSchedule.sessionFee}
                                placeholder="Session Fee"
                                required
                            />
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
                                required
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
