import React, { useEffect } from 'react';
import { Col, Row, Table, Button } from 'react-bootstrap';
import {
    fetchServices,
    fetchSingleService,
    deleteService,
} from '../../../../store/serviceSlice';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Components
 */
import ServicesModal from './ServicesModal';
import { addCSS } from '../../../../utilities/utilities';

// Then, use it in a component.
export default function Services() {
    const dispatch = useDispatch();
    const { services, SERVICE_HEADERS } = useSelector(
        (state) => state.services
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
            <Table bordered>
                <thead>
                    <tr>
                        {SERVICE_HEADERS.map((hearder) => (
                            <th key={hearder.prop}>{hearder.title}</th>
                        ))}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {services.length &&
                        services.map((service, index) => (
                            <tr key={index}>
                                {Object.keys(service).map((key) => {
                                    if (key === 'title' || key === 'image') {
                                        return (
                                            <td
                                                key={key}
                                                dangerouslySetInnerHTML={{
                                                    __html: service[key],
                                                }}
                                            ></td>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                                <td>
                                    <Button
                                        className="mr-2"
                                        bsPrefix="azh_btn azh_btn_edit"
                                        onClick={(e) =>
                                            dispatch(
                                                fetchSingleService(
                                                    services[index]['_id']
                                                )
                                            )
                                        }
                                    >
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                    <Button
                                        bsPrefix="azh_btn azh_btn_edit"
                                        onClick={(e) =>
                                            deleteData(services[index]['_id'])
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
