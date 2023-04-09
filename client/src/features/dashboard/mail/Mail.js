import React, { useState, useEffect } from 'react';
import { Col, Row, Table, Button } from 'react-bootstrap';
import toast from '../../../utilities/Notify';
import WelComeModal from '../../../hooks/WelComeModal';

/**
 * Hooks
 */
import { getData, STORY_HEADERS, deletePost } from './MailHooks';

/**
 * Components
 */
import MailModal from './MailModal';
import {
    DatatableWrapper,
    Filter,
    Pagination,
    PaginationOptions,
    TableBody,
    TableHeader,
} from 'react-bs-datatable';
import { database } from '../../../data/database';

// Then, use it in a component.
export default function Mail() {
    const [mails, setMails] = useState([]);
    const [updateBtn, setUpdateBtn] = useState({ display: false, id: '' });
    const [lgShow, setLgShow] = useState(false);
    const [isWelcomeModalShow, setIsWelcomeModalShow] = useState(false);

    const setMailData = (data) => {
        setMails([data]);
        setUpdateBtn({ display: true, id: data._id });
    };

    /**
     *
     * @param {value} value true or false.
     * @param {id} id get id if want to edit specific experience.
     */
    const modalShow = (value, id = null) => {
        setLgShow(value);
        if (id !== null) {
            setUpdateBtn({ display: false, id: id });
        } else {
            setUpdateBtn({ display: false, id: '' });
        }
    };

    /**
     *
     * @param {id} id get the specific id which want to be deleted.
     */
    const deleteMail = (id) => {
        alert('Are you sure? It will be permanently deleted.');
        deletePost(process.env.REACT_APP_API_URL + '/api/contact_form/' + id)
            .then((res) => {
                setMails(res.data);
                toast('1 Mail Deleted');
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        /**
         * get all emails.
         */
        getData(process.env.REACT_APP_API_URL + '/api/contact_form').then(
            (res) => {
                let data = res.data;
                for (let i = 0; i < data.length; i++) {
                    data[i].action = (
                        <div>
                            <Button
                                style={{
                                    paddingInline: '8px',
                                    paddingBlock: '2px',
                                    marginRight: '4px',
                                }}
                                bsPrefix="azh_btn azh_btn_edit"
                                onClick={(e) =>
                                    modalShow(true, mails[i]['_id'])
                                }
                            >
                                Open
                            </Button>
                            <Button
                                style={{
                                    paddingInline: '8px',
                                    paddingBlock: '2px',
                                }}
                                bsPrefix="azh_btn btn-danger azh_btn_experience"
                                onClick={(e) => deleteMail(mails[i]['_id'])}
                            >
                                Delete
                            </Button>{' '}
                        </div>
                    );
                }

                setMails(res.data);
                if (res.data.length > 0) {
                    setTimeout(
                        () =>
                            setUpdateBtn({
                                display: true,
                                id: res.data[0]._id,
                            }),
                        100
                    );
                }
            }
        );

        /**
         * Onload disply welcome message.
         */
        window.addEventListener('load', function () {
            /**
             * get settings data.
             */
            // getData(process.env.REACT_APP_API_URL + "/api/settings").then((res) => {
            //   // setIsWelcomeModalShow(res.data[0].welcome_message_is_display);
            //   // let welcome_message = this.document.getElementById("welcome_message");
            //   // welcome_message.innerHTML = res.data[0].welcome_message
            // });
        });
    }, []);
    /**
     * is welcome modal show?
     * @param {boolean} value
     */
    const welcomeModalShow = (value) => {
        setIsWelcomeModalShow(value);
    };

    if (document.getElementsByClassName('btn-primary')[0]) {
        document.getElementsByClassName(
            'btn-primary'
        )[0].style.backgroundColor = database.basic.themeColor;
    }

    if (mails.length === 0) {
        return <span>No mail found</span>;
    }

    return (
        <React.Fragment>
            <WelComeModal
                welcomeModalShow={welcomeModalShow}
                isWelcomeModalShow={isWelcomeModalShow}
            />

            <Row className="mb-4 p-2">
                <Col
                    xs={12}
                    lg={12}
                    className="d-flex flex-col justify-content-start align-items-start"
                >
                    <MailModal
                        updateBtn={updateBtn}
                        modalShow={modalShow}
                        lgShow={lgShow}
                        setMailData={setMailData}
                    />
                </Col>
            </Row>

            <DatatableWrapper
                body={mails}
                headers={STORY_HEADERS}
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
