import React, { useState, useEffect, useMemo } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import {
    DatatableWrapper,
    Filter,
    Pagination,
    PaginationOptions,
    TableBody,
    TableHeader,
} from 'react-bs-datatable';
import { useDispatch, useSelector } from 'react-redux';
import { Edit, Trash } from '../../../assets/atlasIcons/AtlasIconsSolid';
import { database } from '../../../data/database';
import { fetchUserSchedules } from '../../../store/userScheduleSlice';
import DashboardModal from './DashboardModal';

export default function Dashboard() {
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const { userSchedules } = useSelector((state) => state.userSchedules);
    const dispatch = useDispatch();

    console.log({ userSchedules });

    const headers = [
        { prop: 'session', title: 'Session', isFilterable: true },
        { prop: 'patient', title: 'Patient', isFilterable: true },
        {
            prop: 'doctor',
            title: 'Doctor',
            isFilterable: true,
        },
        { prop: 'patientPhone', title: 'Patient Phone', isFilterable: true },
        { prop: 'status', title: 'Status', isFilterable: true },
        { prop: 'actions', title: 'Actions', isFilterable: true },
    ];

    const Status = ({
        currentState,
        options = ['Upcomming', 'Ongoing', 'Completed'],
    }) => {
        const [statusState, setStatusState] = useState(currentState);

        const handleStatusChange = (e) => {
            setStatusState(e.target.value);
        };

        return (
            <>
                <select
                    value={statusState}
                    onChange={handleStatusChange}
                    style={{
                        padding: '4px 8px',
                        backgroundColor: `${database.basic.themeColor}`,
                        color: 'white',
                        borderRadius: '4px',
                    }}
                >
                    {options.map((option) => (
                        <option value={option} key={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </>
        );
    };

    const Actions = ({ userSchedule }) => (
        <div style={{ display: 'inline-flex', gap: '4px' }}>
            <button
                style={{
                    padding: '4px 8px',
                    backgroundColor: `${database.basic.themeColor}`,
                    color: 'white',
                    borderRadius: '4px',
                    border: 'none',
                    outline: 'none',
                }}
                onClick={() => {
                    setModalData(userSchedule);
                    setShowModal(true);
                }}
            >
                Details
            </button>
            <button
                style={{
                    padding: '4px 8px',
                    backgroundColor: `${database.basic.themeColor}`,
                    color: 'white',
                    borderRadius: '4px',
                    border: 'none',
                    outline: 'none',
                }}
            >
                Edit
            </button>
        </div>
    );

    const body = useMemo(
        () =>
            userSchedules.map((userSchedule) => {
                let doctor_name = userSchedule.consultantData?.name;

                return {
                    session: userSchedule.session_name,
                    patient: userSchedule.name,
                    doctor: doctor_name,
                    patientPhone: userSchedule.phone,
                    status: <Status currentState={userSchedule.status} />,
                    actions: <Actions userSchedule={userSchedule} />,
                };
            }),
        [userSchedules]
    );

    useEffect(() => {
        dispatch(fetchUserSchedules());

        return () => setShowModal(false);
    }, []);

    if (document.getElementsByClassName('btn-primary')[0]) {
        document.getElementsByClassName(
            'btn-primary'
        )[0].style.backgroundColor = database.basic.themeColor;
    }

    if (body.length === 0) {
        return <span>Loading, Please wait...</span>;
    }

    return (
        <>
            <Row className="mb-4 p-2">
                <Col
                    xs={12}
                    lg={12}
                    className="d-flex flex-col justify-content-start align-items-start"
                >
                    <DashboardModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        modalData={modalData}
                    />
                </Col>
            </Row>
            <DatatableWrapper
                body={body}
                headers={headers}
                paginationOptionsProps={{
                    initialState: {
                        rowsPerPage: 10,
                        options: [5, 10, 15, 20, 30, 50, 70, 100],
                    },
                }}
            >
                <Row className="mb-4 p-2">
                    <Col
                        xs={12}
                        lg={6}
                        className="d-flex flex-col justify-content-end align-items-start"
                    ></Col>
                    <Col
                        xs={12}
                        lg={6}
                        className="d-flex flex-col justify-content-end align-items-end"
                    >
                        <Filter />
                    </Col>
                </Row>
                <Table>
                    <TableHeader />
                    <TableBody />
                </Table>
                <Row className="mb-2 p-2">
                    <Col
                        xs={12}
                        sm={6}
                        lg={4}
                        className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
                    >
                        <PaginationOptions />
                    </Col>
                    <Col
                        xs={12}
                        sm={6}
                        lg={8}
                        className="d-flex flex-col justify-content-end align-items-end mb-2"
                    >
                        <Pagination />
                    </Col>
                </Row>
            </DatatableWrapper>
        </>
    );
}
