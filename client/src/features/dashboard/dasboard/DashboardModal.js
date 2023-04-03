import { Button, Modal } from 'react-bootstrap';

export default function DashboardModal({ showModal, setShowModal, modalData }) {
    const handleClose = () => setShowModal(false);

    return (
        <>
            <Modal
                show={showModal}
                onHide={handleClose}
                // backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Session Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                        }}
                    >
                        <div>
                            <div>Session: {modalData?.session_name}</div>
                            <div>Scheduled At: {modalData?.session_time}</div>
                            <div>
                                Length: {modalData?.per_session_length} mins
                            </div>
                            <div>Status: {modalData?.status}</div>
                        </div>
                        <div>
                            <div>Patient: {modalData?.name}</div>
                            <div>Phone: {modalData?.phone}</div>
                            <div>Email: {modalData?.email}</div>
                        </div>
                        <div>
                            <div>Doctor: {modalData?.consultantData?.name}</div>
                            <div>Phone: {modalData?.consultantData?.phone}</div>
                            <div>Email: {modalData?.consultantData?.email}</div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
