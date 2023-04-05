import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserFromUserPanel } from '../../../store/usersSlice';
import { fetchData } from '../../../utilities/utilities';
import UpdateForm from '../components/form/UserUpdateForm';
import UserUpdateForm from '../components/form/UserUpdateForm';
import WindyHookForm from '../components/form/UserUpdateForm';
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
    const [initialValues, setInitialValues] = useState(null);
    const [formState, updateFormState] = useReducer(reducer, initialState);
    const { loggedInUser, userUpdated } = useSelector((state) => state.users);
    const dispatch = useDispatch();

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

        // update request
        dispatch(updateUserFromUserPanel(JSON.stringify(payload)));
        fetchUserDetails(loggedInUser.id);
    };

    async function fetchUserDetails(id) {
        setLoading(true);
        try {
            const data = await fetchData({
                endpoint: `/api/users/${id}`,
            });
            setInitialValues({
                name: data.name,
                phone: data.phone,
                email: data.email,
                password: data.password,
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
    }

    useEffect(() => {
        if (loggedInUser.id) {
            fetchUserDetails(loggedInUser.id);
        }
    }, [loggedInUser.id]);

    useEffect(() => {
        if (userUpdated) {
            fetchUserDetails(loggedInUser.id);
        }
    }, [userUpdated]);

    // if (!initialValues) {
    //     return <div>Please Wait...</div>;
    // }

    // if (!loggedInUser.id) {
    //     return <div>You are not logged in</div>;
    // }

    // if (loading) {
    //     return <div>Loading please wait...</div>;
    // }

    // if (!formState?.email) {
    //     return (
    //         <div>
    //             Couldn't load your details. Please check internet connection and
    //             reload.
    //         </div>
    //     );
    // }

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
                        <div>Password: ********</div>
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
            {editMode ? <UserUpdateForm setEditMode={setEditMode} /> : null}
        </div>
    );
};

export default Settings;
