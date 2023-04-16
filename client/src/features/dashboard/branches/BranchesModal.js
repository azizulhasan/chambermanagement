import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import {
    showModal,
    addBranch,
    saveBranch,
    updateBranch,
} from '../../../store/branchesSlice';
import { useDispatch, useSelector } from 'react-redux';

import { Editor } from '@tinymce/tinymce-react';

import { getIframeContent, previewImage } from './BranchesHooks';
import { sliceComponentName } from '../../../utilities/utilities';
/**
 * Css
 */

export default function BranchesModal() {
    const { singleBranch, isModalActive } = useSelector(
        (state) => state.branches
    );

    const [branch, setBranch] = useState(() => singleBranch);

    const dispatch = useDispatch();
    /**
     * Handle content change value.
     * @param {event} e
     */
    const handleChange = (e) => {
        setBranch({ ...branch, ...{ [e.target.name]: e.target.value } });
    };

    useEffect(() => {
        if (singleBranch.name) {
            setBranch(singleBranch);
            dispatch(showModal(true));
        }
    }, [singleBranch]);

    /**
     * Handle branches content form submission
     * @param {event} e
     * @returns
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        /**
         * Get full form data and modify them for saving to database.
         */
        let form = new FormData(e.target);
        let data = {};
        for (let [key, value] of form.entries()) {
            if (
                key === '' ||
                value === ''
            ) {
                if (key === 'name' || key === 'address') {
                    alert('Please fill the value of : ' + key);
                    return;
                }
            }

            data[key] = value;
        }
        /**
         * format form data.
         */
        let formData = {};
        Object.keys(data).forEach((key) => {
            if (key === '_id') {
            } else {
                formData[key] = data[key];
            }
        });
        formData['address'] = getIframeContent();
        formData['details'] = getIframeContent(1);

        /**
         * Update data if "_id" exists. else save form data.
         */
        if (data._id !== undefined) {
            formData['id'] = data._id;
            dispatch(updateBranch({
                endpoint: '/api/branches',
                config: {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'PUT',
                    body: JSON.stringify(formData),
                },
            }));
        } else {
            dispatch(saveBranch({
                endpoint: '/api/branches',
                config: {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(formData),
                },
            }));
        }
    };

    const branchAdd = () => {
        dispatch(addBranch());
        setBranch({});
    };
    return (
        <>
            <Button bsPrefix="azh_btn" onClick={(e) => branchAdd()}>
                Add {sliceComponentName()}
            </Button>
            <Modal
                size="lg"
                show={isModalActive}
                onHide={(e) => dispatch(showModal(false))}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {branch._id
                            ? `Update ${sliceComponentName()} Section Content`
                            : `${sliceComponentName()} Section Content`}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} encType="multipart/form-data">
                        {branch._id && (
                            <Form.Control
                                type="text"
                                id="_id"
                                onChange={handleChange}
                                value={branch._id}
                                name="_id"
                                placeholder="id"
                                hidden
                            />
                        )}

                        <Form.Group className="mb-4" controlId="branch.name">
                            <Form.Label>Branch Name<sup className='text-red-500'>*</sup></Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                onChange={handleChange}
                                value={branch.name}
                                placeholder="Branch Name"
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-4"
                            controlId="branch.address"
                        >
                            <Form.Label>Address<sup className='text-red-500'>*</sup></Form.Label>
                            <Editor
                                initialValue={branch.address}
                                name="address"
                                init={{
                                    height: 200,
                                    menubar: true,
                                    plugins: [
                                        'a11ychecker advcode advlist anchor autolink codesample fullscreen help  tinydrive',
                                        ' lists link media noneditable powerpaste preview',
                                        ' searchreplace table template tinymcespellchecker visualblocks wordcount',
                                    ],
                                    toolbar:
                                        'insertfile a11ycheck undo redo | bold italic | forecolor backcolor | template codesample | alignleft aligncenter alignright alignjustify | bullist numlist | link image tinydrive',
                                    content_style:
                                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-4"
                            controlId="branch.details"
                        >
                            <Form.Label>Details</Form.Label>
                            <Editor
                                initialValue={branch.details}
                                name="details"
                                init={{
                                    height: 200,
                                    menubar: true,
                                    plugins: [
                                        'a11ychecker advcode advlist anchor autolink codesample fullscreen help  tinydrive',
                                        ' lists link media noneditable powerpaste preview',
                                        ' searchreplace table template tinymcespellchecker visualblocks wordcount',
                                    ],
                                    toolbar:
                                        'insertfile a11ycheck undo redo | bold italic | forecolor backcolor | template codesample | alignleft aligncenter alignright alignjustify | bullist numlist | link image tinydrive',
                                    content_style:
                                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-4"
                            controlId="branch.phone"
                        >
                            <Form.Label>Phone Numbers</Form.Label>
                            <Form.Control
                                type="textarea"
                                name="phone"
                                onChange={handleChange}
                                value={branch.phone}
                                placeholder="Phone number, can be multiple"
                            />
                        </Form.Group>
                        <button
                            className="azh_btn w-100"
                            type="submit"
                            id="branch.sumbit"
                        >
                            {branch._id ? 'Update' : 'Submit'}
                        </button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
