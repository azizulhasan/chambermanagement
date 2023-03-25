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
import { database } from '../../../database';
import { fetchUserSchedules } from '../../../store/userScheduleSlice';

export default function DashboardContent() {
    const userSchedules = useSelector((state) => state.userSchedules);
    const dispatch = useDispatch();

    console.log({ userSchedules });

    const headers = [
        { prop: 'session_name', title: 'Session', isFilterable: true },
        { prop: 'doctor_name', title: 'Doctor', isFilterable: true },
        {
            prop: 'patient_details',
            title: 'Patient',
            isFilterable: true,
        },
        { prop: 'session_time', title: 'Scheduled At', isFilterable: true },
        { prop: 'status', title: 'Status', isFilterable: true },
    ];
    const body = useMemo(
        () =>
            userSchedules.userSchedules.map((userSchedule) => {
                let doctor_name = userSchedule.consultantData?.name;
                let Status = () => (
                    <span
                        style={{
                            padding: '4px 8px',
                            backgroundColor: `${database.basic.themeColor}`,
                            opacity: 0.8,
                            color: 'white',
                            borderRadius: '4px',
                        }}
                    >
                        Pending
                    </span>
                );
                return {
                    session_name: userSchedule.session_name,
                    doctor_name: doctor_name,
                    patient_details: userSchedule.name,
                    session_time: userSchedule.session_time,
                    status: <Status />,
                };
            }),
        [userSchedules.userSchedules]
    );

    useEffect(() => {
        dispatch(fetchUserSchedules());

        return () => console.log(userSchedules.userSchedules);
    }, []);

    // useEffect(() => {
    //     setBody(() =>
    //         userSchedules.userSchedules.map((userSchedule) => {
    //             let doctor_name = userSchedule.consultantData?.name;
    //             let Status = () => (
    //                 <span
    //                     style={{
    //                         padding: '4px 8px',
    //                         backgroundColor: `${database.basic.themeColor}`,
    //                         opacity: 0.8,
    //                         color: 'white',
    //                         borderRadius: '4px',
    //                     }}
    //                 >
    //                     Pending
    //                 </span>
    //             );
    //             return {
    //                 session_name: userSchedule.session_name,
    //                 doctor_name: doctor_name,
    //                 patient_details: userSchedule.name,
    //                 session_time: userSchedule.session_time,
    //                 status: <Status />,
    //             };
    //         })
    //     );
    // }, [userSchedules]);

    if (document.getElementsByClassName('btn-primary')[0]) {
        document.getElementsByClassName(
            'btn-primary'
        )[0].style.backgroundColor = database.basic.themeColor;
    }

    if (body.length === 0) {
        return <span>Loading, Please wait...</span>;
    }

    return (
        <DatatableWrapper
            body={body}
            headers={headers}
            paginationOptionsProps={{
                initialState: {
                    rowsPerPage: 10,
                    options: [1, 5, 10, 15, 20, 30, 50, 70, 100],
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
    );
}
