import React, { useEffect } from 'react';
import { Col, Row, Table, Button } from 'react-bootstrap';
import {
    fetchSchedules,
    fetchSingleSchedule,
    deleteSchedule,
} from '../../../store/schedulesSlice';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Components
 */
import SchedulesModal from './SchedulesModal';
import { addCSS } from '../../../utilities/utilities';

export default function Schedules() {
    const dispatch = useDispatch();
    const { schedules, SCHEDULE_HEADERS } = useSelector(
        (state) => state.schedules
    );
    useEffect(() => {
        dispatch(fetchSchedules());
        addCSS(['/assets/dashboard/css/schedules.css']);

    }, []);


    /**
     *
     * @param {id} id get the specific id which want to be deleted.
     */
    const deleteData = (id) => {
        let result = window.confirm(
            'Are you sure? It will be permanently deleted.'
        );
        if (!result) {
            return;
        }
        dispatch(deleteSchedule(id));
    };

    return (
        <React.Fragment>
            <Row className="mb-4 p-2">
                <Col
                    xs={12}
                    lg={12}
                    className="d-flex flex-col justify-content-start align-items-start"
                >
                    <SchedulesModal />
                </Col>
            </Row>
            <Table bordered>
                <thead>
                    <tr>
                        {SCHEDULE_HEADERS.length &&
                            SCHEDULE_HEADERS.map((hearder) => (
                                <th key={hearder.prop}>{hearder.title}</th>
                            ))}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.length &&
                        SCHEDULE_HEADERS.length &&
                        schedules.map((schedule, index) => (
                            <tr key={index}>
                                {SCHEDULE_HEADERS.map(({ prop }, key) => {
                                    return <td key={key}>{schedule[prop]}</td>;
                                })}
                                <td>
                                    <Button
                                        className="mr-2"
                                        bsPrefix="azh_btn azh_btn_edit"
                                        onClick={(e) =>
                                            dispatch(
                                                fetchSingleSchedule(
                                                    schedules[index]['_id']
                                                )
                                            )
                                        }
                                    >
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                    <Button
                                        bsPrefix="azh_btn azh_btn_edit"
                                        onClick={(e) =>
                                            deleteData(schedules[index]['_id'])
                                        }
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </React.Fragment>
    );
}
