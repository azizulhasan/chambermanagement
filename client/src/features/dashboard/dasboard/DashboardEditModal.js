import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateSchedule } from '../../../store/userScheduleSlice';

export default function DashboardEditModal({
    showModal,
    setShowModal,
    modalData,
}) {
    const [formData, setFormData] = useState({
        session_name: '',
        session_date: '',
        session_time: '',
        per_session_length: '',
    });
    const dispatch = useDispatch();

    const handleClose = () => setShowModal(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        let form = new FormData(e.target);
        for (let [key, value] of form.entries()) {
            if (key === '' || value === '') {
                alert('Please fill the value of : ' + key);
                return;
            }
        }
        let data = {
            session_name: formData.session_name,
            session_date: formData.session_date,
            session_time: formData.session_time,
            per_session_length: formData.per_session_length,
        };
        dispatch(updateSchedule([formData._id, data]));
        setShowModal(false);
    };

    useEffect(() => {
        setFormData({ ...modalData });
    }, [modalData]);

    return (
        <>
            <Modal
                size="lg"
                show={showModal}
                onHide={handleClose}
                // backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Session</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onSubmit={(e) => handleSubmit(e)}
                        encType="multipart/form-data"
                    >
                        <Form.Group
                            className="mb-4"
                            controlId="formSessionName"
                        >
                            <Form.Label>Session name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="session_name"
                                onChange={(e) => handleChange(e)}
                                value={formData.session_name}
                                placeholder="session name"
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-4"
                            controlId="formSessionDate"
                        >
                            <Form.Label>Session date:</Form.Label>
                            <Form.Control
                                type="text"
                                name="session_date"
                                onChange={(e) => handleChange(e)}
                                value={formData.session_date.slice(0, 10)}
                                placeholder="session date"
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-4"
                            controlId="formSessionTime"
                        >
                            <Form.Label>Session time:</Form.Label>
                            <Form.Control
                                type="text"
                                name="session_time"
                                onChange={(e) => handleChange(e)}
                                value={formData.session_time}
                                placeholder="session time"
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-4"
                            controlId="formPerSessionLength"
                        >
                            <Form.Label>
                                Session length (in minutes):
                            </Form.Label>
                            <Form.Control
                                type="number"
                                name="per_session_length"
                                onChange={(e) => handleChange(e)}
                                value={formData.per_session_length}
                                placeholder="session length"
                            />
                        </Form.Group>
                        <button className="azh_btn w-100" type="submit">
                            Update
                        </button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
