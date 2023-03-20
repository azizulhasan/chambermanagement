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
import { convertUTCDateToLocalDate } from '../../../utilities/timeUtilities';

// Then, use it in a component.
export default function DashboardContent() {
    const [body, setBody] = useState([]);
    const [headers, setHeaders] = useState([]);
    const schedules = useSelector((state) => state.schedules);
    const dispatch = useDispatch();

    console.log({ schedules });

    useEffect(() => {
        /**
         * Get data from and display to table.
         */
        dispatch(fetchSchedules());
    }, []);

    useEffect(() => {
        if (schedules.SCHEDULE_HEADERS) {
            setHeaders(schedules.SCHEDULE_HEADERS);
            setBody(() => {
                return schedules.schedules.map((schedule) => {
                    return {
                        branch: schedule.branch,
                        consultantName: schedule.consultantName,
                        perSessionLength: `${schedule.perSessionLength} mins`,
                        offDay:
                            schedule.offDay.length > 1
                                ? schedule.offDay.join(', ')
                                : schedule.offDay,
                        updatedAt: convertUTCDateToLocalDate(
                            new Date(schedule.updatedAt)
                        ).toLocaleString(),
                    };
                });
            });
        }
    }, [schedules]);

    return (
        <DatatableWrapper
            body={body}
            headers={headers}
            paginationOptionsProps={{
                initialState: {
                    rowsPerPage: 10,
                    options: [5, 10, 15, 20],
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
                <TableHeader tableHeaders={schedules.SCHEDULE_HEADERS} />
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
