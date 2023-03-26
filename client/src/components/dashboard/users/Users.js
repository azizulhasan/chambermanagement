import React, { useEffect } from 'react';
import { Col, Row, Table, Button } from 'react-bootstrap';
import {
    fetchUsers,
    fetchSingleUser,
    deleteUser,
} from '../../../store/usersSlice';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Components
 */
import UsersModal from './UsersModal';
import { addCSS } from '../../../utilities/utilities';
import { AdminDashboardIcons, database } from '../../../database';
import {
    DatatableWrapper,
    Filter,
    Pagination,
    PaginationOptions,
    TableBody,
    TableHeader,
} from 'react-bs-datatable';

const { Edit, Trash } = AdminDashboardIcons;

export default function Users() {
    const dispatch = useDispatch();
    const { users, USER_HEADERS } = useSelector((state) => state.users);

    addCSS(['/assets/dashboard/css/users.css']);

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
        dispatch(deleteUser(id));
    };

    const Action = ({ user }) => (
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
                onClick={(e) => dispatch(fetchSingleUser(user['_id']))}
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
                onClick={(e) => deleteData(user['_id'])}
            >
                <Trash />
            </Button>
        </div>
    );

    const headers = [...USER_HEADERS, { prop: 'action', title: 'Action' }].map(
        (header) => {
            if (header.prop === 'image' || header.prop === 'action') {
                return header;
            }
            return { ...header, isFilterable: true };
        }
    );
    const body = users.map((user) => {
        const Image = () => (
            <div
                dangerouslySetInnerHTML={{
                    __html: user.image,
                }}
            ></div>
        );
        return {
            ...user,
            image: <Image />,
            action: <Action user={user} />,
        };
    });

    if (document.getElementsByClassName('btn-primary')[0]) {
        document.getElementsByClassName(
            'btn-primary'
        )[0].style.backgroundColor = database.basic.themeColor;
    }

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <>
            <Row className="mb-4 p-2">
                <Col
                    xs={12}
                    lg={12}
                    className="d-flex flex-col justify-content-start align-items-start"
                >
                    <UsersModal />
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
