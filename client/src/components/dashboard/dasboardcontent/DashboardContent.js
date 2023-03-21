import React, { useState, useEffect } from 'react';
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
import { fetchSchedules } from '../../../store/schedulesSlice';
import { fetchUserSchedules } from '../../../store/userScheduleSlice';
import { convertUTCDateToLocalDate } from '../../../utilities/timeUtilities';

// Then, use it in a component.
export default function DashboardContent() {
    const [body, setBody] = useState([]);
    const [headers, setHeaders] = useState([
        { prop: 'session_name', title: 'Session' },
        { prop: 'doctor_name', title: 'Doctor' },
        { prop: 'patient_details', title: 'Patient Details' },
        { prop: 'session_time', title: 'Scheduled At' },
        { prop: 'status', title: 'Status' },
    ]);
    // const schedules = useSelector((state) => state.schedules);
    const userSchedules = useSelector((state) => state.userSchedules);
    const dispatch = useDispatch();

    console.log({ userSchedules });

    useEffect(() => {
        /**
         * Get data from and display to table.
         */
        // dispatch(fetchSchedules());
        dispatch(fetchUserSchedules());
    }, []);

    // useEffect(() => {
    //     if (userSchedules.SCHEDULE_HEADERS) {
    //         setHeaders(userSchedules.SCHEDULE_HEADERS);
    //         setBody(() => {
    //             return userSchedules.userSchedules?.map((userSchedule) => {
    //                 return {
    //                     session_name: userSchedule.session_name,
    //                     doctor_name: userSchedule.doctor_name,
    //                     patient_details: userSchedule.patient_details,
    //                     session_time: convertUTCDateToLocalDate(
    //                         new Date(userSchedule.scheduled_at)
    //                     ).toLocaleString(),
    //                     status: 'Pending',
    //                 };
    //             });
    //         });
    //     }
    // }, [userSchedules]);

    return (
        <DatatableWrapper
            body={userSchedules?.dashboardTableBody}
            headers={userSchedules?.dashboardTableHeaders}
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
                    lg={2}
                    className="d-flex flex-col justify-content-end align-items-start"
                ></Col>
                <Col
                    xs={12}
                    lg={10}
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
    );
}
