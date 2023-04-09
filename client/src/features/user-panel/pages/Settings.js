import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserFromUserPanel } from '../../../store/usersSlice';
import { fetchData } from '../../../utilities/utilities';
import UserUpdateForm from '../components/form/UserUpdateForm';

const Settings = () => {
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentValues, setCurrentValues] = useState(null);
    const { loggedInUser, userUpdated } = useSelector((state) => state.users);

    async function fetchUserDetails(id) {
        setLoading(true);
        try {
            const data = await fetchData({
                endpoint: `/api/users/${id}`,
            });
            setCurrentValues({
                name: data.name,
                phone: data.phone,
                email: data.email,
                password: '',
            });
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (loggedInUser.id) {
            fetchUserDetails(loggedInUser.id);
        }
    }, [loggedInUser.id]);

    if (!loggedInUser?.id) {
        return (
            <div className="p-4">
                Please{' '}
                <a href="/login" className="text-blue-600">
                    login
                </a>{' '}
            </div>
        );
    }

    if (!currentValues) {
        return <div className="p-4">Please wait...</div>;
    }

    return (
        <div className="p-4 ">
            <h2 className="pb-2 text-base sm:text-lg font-medium mb-2">
                {editMode ? 'Edit' : null} Personal Information
            </h2>
            {!editMode ? (
                <div className="bg-gray-50 overflow-x-auto text-sm md:text-base flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <div>Name: {currentValues.name}</div>
                        <div>Phone: {currentValues.phone}</div>
                        <div>Email: {currentValues.email}</div>
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
            {editMode ? (
                <UserUpdateForm
                    currentValues={currentValues}
                    setEditMode={setEditMode}
                />
            ) : null}
        </div>
    );
};

export default Settings;
