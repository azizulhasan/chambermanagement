import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserFromUserPanel } from '../../../../store/usersSlice';
import { fetchData } from '../../../../utilities/utilities';
import Tooltip from '../Tooltip';
import HookedInput from './HookedInput';

// validation
const nameValidation = {
    required: { value: true, message: 'Name is required' },
    minLength: {
        value: 2,
        message: 'Min length 2',
    },
    maxLength: {
        value: 100,
        message: 'Max length 100',
    },
    pattern: {
        value: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
        message: 'Enter a valid name',
    },
};

const phoneValidation = {
    required: { value: true, message: 'Phone is required' },
    minLength: {
        value: 2,
        message: 'Min length 2',
    },
    maxLength: {
        value: 14,
        message: 'Max length 14',
    },
    // pattern: {
    //     value: /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/, // to validate Bangladeshi mobile number
    //     message: "Enter a valid phone number"
    // }
};

const passwordValidation = {
    required: { value: true, message: 'Password is required' },
    minLength: {
        value: 6,
        message: 'Minimum length 6',
    },
    // pattern: {
    //     value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    //     message:
    //         'Password should contain at least one letter and one number',
    // },
};

const confirmPasswordValidation = (watch) => {
    return {
        required: { value: true, message: 'Password confirmation required' },
        minLength: {
            value: 6,
            message: 'Minimum length 6',
        },
        // pattern: {
        //     value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        //     message:
        //         'Password should contain at least one letter and one number',
        // },
        validate: (val) => {
            if (watch('password') !== val) {
                return 'Passwords do no match';
            }
        },
    };
};

const UserUpdateForm = ({ setEditMode, initialValues }) => {
    const [confirmPassword, setConfirmPassword] = useState(false);
    const { loggedInUser, userUpdated } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { defaultValues, errors, isDirty, dirtyFields },
    } = useForm();

    async function fetchUserDetails(id) {
        try {
            const data = await fetchData({
                endpoint: `/api/users/${id}`,
            });

            reset({
                name: data.name,
                phone: data.phone,
                email: data.email,
                password: data.password,
                confirmPassword: '',
            });
        } catch (e) {
            console.log(e);
        }
    }

    const updateUser = (data) => {
        // create payload
        const payload = {
            id: loggedInUser.id,
            name: data.name,
            phone: data.phone,
            // password: data.password,
        };

        dispatch(updateUserFromUserPanel(JSON.stringify(payload)));
    };

    useEffect(() => {
        if (loggedInUser.id) {
            fetchUserDetails(loggedInUser.id);
        }
    }, [loggedInUser.id]);

    useEffect(() => {
        if (dirtyFields.password) {
            setConfirmPassword(true);
        } else if (!dirtyFields.password) {
            setConfirmPassword(false);
        }
    }, [dirtyFields.password]);

    useEffect(() => {
        if (userUpdated) {
            fetchUserDetails(loggedInUser.id);
        }
    }, [userUpdated]);

    return (
        <div className="mt-10">
            <form
                onSubmit={handleSubmit(updateUser)}
                className="p-4 border blur-filter rounded-md bg-gray-50 overflow-x-auto text-sm md:text-base flex flex-col gap-4"
            >
                <div>
                    <HookedInput
                        name="name"
                        label="Name: "
                        register={register}
                        validation={nameValidation}
                        styleVariant="edit"
                        withMessageSpace
                        errorMessage={errors.name?.message}
                    />
                    <HookedInput
                        name="phone"
                        label="Phone: "
                        type="tel"
                        register={register}
                        validation={phoneValidation}
                        styleVariant="edit"
                        withMessageSpace
                        errorMessage={errors.phone?.message}
                    />

                    {/* readonly */}
                    <div className="flex flex-col mb-5">
                        <label>Email: </label>
                        <Tooltip text="Email not editable" position="left-10">
                            <div className="bg-gray-100 px-2 py-1 rounded-t-md border-b focus:outline-gray-200">
                                {defaultValues?.email}
                            </div>
                        </Tooltip>
                    </div>
                    <HookedInput
                        name="password"
                        label="Password: "
                        type="password"
                        register={register}
                        validation={passwordValidation}
                        styleVariant="edit"
                        withMessageSpace
                        errorMessage={errors.password?.message}
                    />
                    {confirmPassword ? (
                        <HookedInput
                            name="confirmPassword"
                            label="Confirm Password: "
                            type="password"
                            register={register}
                            validation={confirmPasswordValidation(watch)}
                            styleVariant="edit"
                            withMessageSpace
                            errorMessage={errors.confirmPassword?.message}
                        />
                    ) : null}
                </div>
                <div className="flex gap-2">
                    <input
                        type="submit"
                        value="Update"
                        className="form__input--submit"
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
        </div>
    );
};

export default UserUpdateForm;
