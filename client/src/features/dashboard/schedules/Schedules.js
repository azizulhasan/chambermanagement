import React, { useEffect } from 'react';
import { Col, Row, Table, Button } from 'react-bootstrap';
import {
    fetchSchedules,
    deleteSchedule,
    showModal,
} from '../../../store/schedulesSlice';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Components
 */
import SchedulesModal from './SchedulesModal';
import { addCSS } from '../../../utilities/utilities';
import { convertUTCDateToLocalDate } from '../../../utilities/timeUtilities';
import { fetchSingleUser } from '../../../store/usersSlice';
import { AdminDashboardIcons, database } from '../../../data/database';
import {
    DatatableWrapper,
    Filter,
    Pagination,
    PaginationOptions,
    TableBody,
    TableHeader,
} from 'react-bs-datatable';

const { Edit, Trash } = AdminDashboardIcons;

export default function Schedules() {
    const dispatch = useDispatch();
    const { schedules, SCHEDULE_HEADERS } = useSelector(
        (state) => state.schedules
    );


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

    const Action = ({ schedule }) => (
        <div>
            <Button
                style={{
                    width: '45px',
                    height: '30px',
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                className="mr-2"
                bsPrefix="azh_btn azh_btn_edit"
                onClick={(e) => {
                    dispatch(showModal(true));
                }}
            >
                <Edit />
            </Button>
            <Button
                style={{
                    width: '45px',
                    height: '30px',
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                bsPrefix="azh_btn azh_btn_trash"
                onClick={(e) => deleteData(schedule['_id'])}
            >
                <Trash />
            </Button>
        </div>
    );

    let headers = [];
    let body = [];

    headers = [...SCHEDULE_HEADERS, { prop: 'action', title: 'Action' }].map(
        (header) => {
            if (header.prop === 'action') {
                return header;
            }
            return { ...header, isFilterable: true };
        }
    );
    body = schedules.map((schedule) => {
        return {
            ...schedule,
            perSessionLength: schedule.perSessionLength + ' mins',
            offDay: Array.isArray(schedule.offDay)
                ? schedule.offDay.join(', ')
                : schedule.offDay,
            updatedAt: convertUTCDateToLocalDate(
                new Date(schedule['updatedAt'])
            ).toLocaleString(),
            action: <Action schedule={schedule} />,
        };
    });

    if (document.getElementsByClassName('btn-primary')[0]) {
        document.getElementsByClassName(
            'btn-primary'
        )[0].style.backgroundColor = database.basic.themeColor;
    }

    useEffect(() => {
        dispatch(fetchSchedules());
        addCSS(['/assets/dashboard/css/schedules.css']);
    }, []);

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
        </React.Fragment>
    );
}
