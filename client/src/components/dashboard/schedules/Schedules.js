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
import { convertUTCDateToLocalDate } from '../../../utilities/timeUtilities';
import { fetchSingleUser } from '../../../store/usersSlice';
import { database } from '../../../database';
import { Link } from 'react-router-dom';
import { Edit, Trash } from '../../../assets/svg-components';

export default function Schedules() {
    const dispatch = useDispatch();
    const { schedules, SCHEDULE_HEADERS } = useSelector(
        (state) => state.schedules
    );
    const { singleUser } = useSelector((state) => state.users);
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
                        schedules.map((schedule, index) => {
                            return (
                                <tr key={index}>
                                    {SCHEDULE_HEADERS.map(({ prop }, key) => {
                                        let date = convertUTCDateToLocalDate(
                                            new Date(schedule['updatedAt'])
                                        ).toLocaleString();

                                        let value =
                                            prop === 'updatedAt'
                                                ? date
                                                : schedule[prop];

                                        if (Array.isArray(value)) {
                                            return (
                                                <td key={key}>
                                                    {value.map(
                                                        (offDay, index) => (
                                                            <span key={offDay}>
                                                                {offDay}
                                                                {index <
                                                                    value.length -
                                                                        1 &&
                                                                    ', '}
                                                            </span>
                                                        )
                                                    )}
                                                </td>
                                            );
                                        }

                                        return (
                                            <td key={key}>
                                                {value}
                                                {prop === 'perSessionLength' &&
                                                    ' mins'}
                                            </td>
                                        );
                                    })}
                                    <td>
                                        {/* <Button
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
                                        </Button> */}
                                        <Button
                                            className="mr-2"
                                            bsPrefix="azh_btn azh_btn_edit"
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                            }}
                                            onClick={(e) =>
                                                dispatch(
                                                    fetchSingleSchedule(
                                                        schedules[index]['_id']
                                                    )
                                                )
                                            }
                                        >
                                            {Edit}
                                        </Button>
                                        <Button
                                            bsPrefix="azh_btn azh_btn_trash"
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                            }}
                                            onClick={(e) =>
                                                deleteData(
                                                    schedules[index]['_id']
                                                )
                                            }
                                        >
                                            {Trash}
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
        </React.Fragment>
    );
}
