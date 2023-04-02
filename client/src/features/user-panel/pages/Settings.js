import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserFromUserPanel } from '../../../store/usersSlice';
import { fetchData } from '../../../utilities/utilities';
import Tooltip from '../components/Tooltip';

const initialState = {
    name: {
        value: '',
        errorMessage: '',
    },
    phone: {
        value: '',
        errorMessage: '',
    },
    email: {
        value: '',
        errorMessage: '',
    },
    password: {
        value: '',
        errorMessage: '',
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FORM_STATE':
            return {
                ...state,
                name: {
                    value: action.payload.name,
                    errorMessage: '',
                },
                phone: {
                    value: action.payload.phone,
                    errorMessage: '',
                },
                email: {
                    value: action.payload.email,
                    errorMessage: '',
                },
                password: {
                    value: action.payload.password,
                    errorMessage: '',
                },
            };

        case 'UPDATE_NAME':
            return {
                ...state,
                name: {
                    value: action.payload.value,
                    errorMessage: action.payload.errorMessage,
                },
            };
        case 'UPDATE_PHONE':
            return {
                ...state,
                phone: {
                    value: action.payload.value,
                    errorMessage: action.payload.errorMessage,
                },
            };
        case 'UPDATE_EMAIL':
            return {
                ...state,
                email: {
                    value: action.payload.value,
                    errorMessage: action.payload.errorMessage,
                },
            };
        case 'UPDATE_PASSWORD':
            return {
                ...state,
                password: {
                    value: action.payload.value,
                    errorMessage: action.payload.errorMessage,
                },
            };
        default:
            return state;
    }
};

const Settings = () => {
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [userDetails, setUserDetails] = useState({
        name: '',
        phone: '',
        password: '',
    });
    const [formState, updateFormState] = useReducer(reducer, initialState);
    const loggedInUser = useSelector((state) => state.users.loggedInUser);
    const dispatch = useDispatch();

    console.log({ loggedInUser });

    const handleSubmit = (e) => {
        e.preventDefault();
        // validation
        if (
            formState.name.value === undefined ||
            formState.name.value?.trim().length === 0
        ) {
            updateFormState({
                type: 'UPDATE_NAME',
                payload: { errorMessage: 'Required' },
            });
        }
        if (
            formState.phone.value === undefined ||
            formState.phone.value?.toString().trim().length === 0
        ) {
            updateFormState({
                type: 'UPDATE_PHONE',
                payload: { errorMessage: 'Required' },
            });
        }
        if (
            formState.password.value === undefined ||
            formState.password.value?.trim().length === 0
        ) {
            updateFormState({
                type: 'UPDATE_PASSWORD',
                payload: { errorMessage: 'Required' },
            });
        }
        if (
            formState.name.value === undefined ||
            formState.phone.value === undefined ||
            formState.password.value === undefined ||
            formState.name.value?.trim().length === 0 ||
            formState.phone.value?.toString().trim().length === 0 ||
            formState.password.value?.trim().length === 0
        ) {
            return;
        }

        // create payload
        const payload = {
            id: loggedInUser.id,
            name: formState.name.value,
            phone: formState.phone.value,
            // password: formState.password.value,
        };

        console.log(payload);

        // do update request
        dispatch(updateUserFromUserPanel(JSON.stringify(payload)));
    };

    const fetchUserDetails = async (id) => {
        setLoading(true);
        try {
            const data = await fetchData({
                endpoint: `/api/users/${id}`,
            });
            updateFormState({
                type: 'UPDATE_FORM_STATE',
                payload: {
                    name: data.name,
                    phone: data.phone,
                    email: data.email,
                    password: data.password,
                },
            });
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (loggedInUser.id) {
            fetchUserDetails(loggedInUser.id);
        }
    }, []);

    if (!loggedInUser.id) {
        return <div>You are not logged in</div>;
    }

    if (loading) {
        return <div>Loading please wait...</div>;
    }

    if (!formState?.email) {
        return (
            <div>
                Couldn't load your details. Please check internet connection and
                reload.
            </div>
        );
    }

    return (
        <div>
            <h2 className="pb-2 text-base sm:text-lg font-medium">
                Personal Information
            </h2>
            {!editMode ? (
                <div className="p-4 border blur-filter rounded-md bg-gray-50 overflow-x-auto text-sm md:text-base flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <div>Name: {formState.name.value}</div>
                        <div>Phone: {formState.phone.value}</div>
                        <div>Email: {formState.email.value}</div>
                        <div>Password: {formState.password.value}</div>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                setEditMode(true);
                            }}
                            className="font-semibold border px-4 py-1 text-white bg-themeColor rounded-md cursor-pointer"
                        >
                            Edit
                        </button>
                    </div>
                </div>
            ) : null}
            {editMode ? (
                <form
                    onSubmit={handleSubmit}
                    className="p-4 border blur-filter rounded-md bg-gray-50 overflow-x-auto text-sm md:text-base flex flex-col gap-6"
                >
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                            <label htmlFor="name">Name:</label>
                            <input
                                name="name"
                                type="string"
                                value={formState.name.value}
                                className="bg-gray-100 px-2 py-1 rounded-t-md border-b focus:outline-gray-200"
                                onChange={(e) =>
                                    updateFormState({
                                        type: 'UPDATE_NAME',
                                        payload: {
                                            value: e.target.value,
                                        },
                                    })
                                }
                            />
                            <div className="text-red-600">
                                {formState.name.errorMessage}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="phone">Phone:</label>
                            <input
                                name="phone"
                                type="tel"
                                value={formState.phone.value}
                                className="bg-gray-100 px-2 py-1 rounded-t-md border-b focus:outline-gray-200"
                                onChange={(e) =>
                                    updateFormState({
                                        type: 'UPDATE_PHONE',
                                        payload: {
                                            value: e.target.value,
                                        },
                                    })
                                }
                            />
                            <div className="text-red-600">
                                {formState.phone.errorMessage}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label>Email: </label>
                            <Tooltip
                                text="Email not editable"
                                position="left-10"
                            >
                                <div className="bg-gray-100 px-2 py-1 rounded-t-md border-b focus:outline-gray-200">
                                    {formState.email.value}
                                </div>
                            </Tooltip>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password">Password:</label>
                            <input
                                name="password"
                                type="string"
                                value={formState.password.value}
                                className="bg-gray-100 px-2 py-1 rounded-t-md border-b focus:outline-gray-200"
                                onChange={(e) =>
                                    updateFormState({
                                        type: 'UPDATE_PASSWORD',
                                        payload: {
                                            value: e.target.value,
                                        },
                                    })
                                }
                            />
                            <div className="text-red-600">
                                {formState.password.errorMessage}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="submit"
                            value="Update"
                            className="font-semibold border px-4 py-1 text-white bg-themeColor rounded-md cursor-pointer"
                        />
                        <button
                            onClick={() => {
                                setEditMode(false);
                            }}
                            className="font-semibold border px-4 py-1  hover:bg-themeColor hover:text-white rounded-md cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : null}
        </div>
    );
};

export default Settings;
