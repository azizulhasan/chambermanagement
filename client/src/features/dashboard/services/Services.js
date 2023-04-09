import React, { useEffect } from 'react';
import { Col, Row, Table, Button } from 'react-bootstrap';
import {
    fetchServices,
    fetchSingleService,
    deleteService,
} from '../../../store/serviceSlice';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Components
 */
import ServicesModal from './ServicesModal';
import { addCSS } from '../../../utilities/utilities';
import {
    DatatableWrapper,
    Filter,
    Pagination,
    PaginationOptions,
    TableBody,
    TableHeader,
} from 'react-bs-datatable';
import { Edit, Trash } from '../../../assets/atlasIcons/AtlasIconsSolid';
import { database } from '../../../data/database';

// Then, use it in a component.
export default function Services() {
    const dispatch = useDispatch();
    const { services, SERVICE_HEADERS } = useSelector(
        (state) => state.services
    );

    let SERVICE_BODY = JSON.parse(JSON.stringify(services)).map(
        (service, i) => {
            return {
                ...service,
                image: (
                    <span
                        dangerouslySetInnerHTML={{
                            __html: services[i]['image'],
                        }}
                    ></span>
                ),
                action: (
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
                            onClick={(e) =>
                                dispatch(
                                    fetchSingleService(SERVICE_BODY[i]['_id'])
                                )
                            }
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
                            onClick={(e) => deleteData(SERVICE_BODY[i]['_id'])}
                        >
                            <Trash />
                        </Button>
                    </div>
                ),
            };
        }
    );

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    addCSS(['/assets/dashboard/css/services.css']);

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
        dispatch(deleteService(id));
    };

    if (document.getElementsByClassName('btn-primary')[0]) {
        document.getElementsByClassName(
            'btn-primary'
        )[0].style.backgroundColor = database.basic.themeColor;
    }

    if (services.length === 0) {
        return <span>No services found</span>;
    }

    return (
        <React.Fragment>
            <Row className="mb-4 p-2">
                <Col
                    xs={12}
                    lg={12}
                    className="d-flex flex-col justify-content-start align-items-start"
                >
                    <ServicesModal />
                </Col>
            </Row>
            <DatatableWrapper
                body={SERVICE_BODY}
                headers={SERVICE_HEADERS}
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
