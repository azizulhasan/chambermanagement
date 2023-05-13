import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserFromUserPanel } from '../../../../store/usersSlice';
import Input from '../../../../components/form/Input';
import { FormValidate } from '../../../../utilities/FormValidate';
import { formSubmitted, updateErrMessages } from '../../../../store/commonDataSlice';

const UserUpdateForm = ({ currentValues, setEditMode }) => {
    const [data, setData] = useState(null);
    const { loggedInUser } = useSelector((state) => state.users);
    const { errorMessages, isFormSubmitted } = useSelector((state) => state.common);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        updateErrData(e.target.value, e.target.type, e.target.name)
        setData({ ...data, [e.target.name]: e.target.value });
    };

    let errs = {}
    function updateErrData(value, type, fieldName) {
        let formVal = new FormValidate();
        let tempErrs = errs //structuredClone(errors)
        let res = formVal.validate(value, type)

        let errMessge = {
            ...res,
            ...{
                fieldName: fieldName,
                isFormSubmitted: isFormSubmitted,
            }
        }
        tempErrs[fieldName] = errMessge;
        dispatch(updateErrMessages(tempErrs))
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(formSubmitted(true));
        Object.keys(data).map((key) => {
            let tempField = document.querySelector('input[name="' + key + '"]')
            if (tempField) {
                if (tempField.name == 'password') {
                    if (tempField.value) {
                        updateErrData(data[key], tempField.type, tempField.name)
                    } else {
                        let tempErrs = errs
                        delete tempErrs.password;
                        dispatch(updateErrMessages(tempErrs))
                    }
                } else {
                    updateErrData(data[key], tempField.type, tempField.name)
                }
            }
        });

        for (let i = 0; i < Object.values(errs).length; i++) {
            if (Object.values(errs)[i].message) {
                return;
            }
        }

        // create payload
        let payload = {};
        if (data.password.length > 0) {
            payload = {
                id: loggedInUser.id,
                name: data.name,
                phone: data.phone,
                password: data.password,
            };
        } else {
            payload = {
                id: loggedInUser.id,
                name: data.name,
                phone: data.phone,
            };
        }

        dispatch(updateUserFromUserPanel(payload));
    };

    useEffect(() => {
        setData({ ...currentValues, confirmPassword: '' });
    }, [currentValues]);



    if (!data) {
        return <div>Please Wait...</div>;
    }

    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            className=" bg-gray-50 overflow-x-auto text-sm md:text-base flex flex-col gap-6"
        >
            <div className="flex flex-col gap-4">
                <Input
                    classes="w-full ml-4 rounded-none p-2"
                    placeholder="Name"
                    name="name"
                    type="text"
                    label="Name"
                    value={data.name}
                    onChange={(e) => handleChange(e)}
                    errObj={errorMessages.hasOwnProperty('name') && errorMessages.name}
                />

                <Input
                    classes="w-full ml-4 rounded-none p-2"
                    placeholder="Phone"
                    name="phone"
                    type="number"
                    label="Phone"
                    value={data.phone}
                    onChange={(e) => handleChange(e)}
                    errObj={errorMessages.hasOwnProperty('phone') && errorMessages.phone}
                />

                <Input
                    classes="w-full ml-4 rounded-none p-2"
                    placeholder="Email"
                    name={'email'}
                    type="email"
                    disable
                    toolTip="Email not editable"
                    toolTipCss='!left-[20%]'
                    label={'Email'}
                    value={data.email}
                    readOnly
                />
                <Input
                    classes="w-full ml-4 rounded-none p-2"
                    placeholder="New Password"
                    name="password"
                    type="password"
                    label="Password"
                    value={data.password}
                    onChange={(e) => handleChange(e)}
                    errObj={errorMessages.hasOwnProperty('password') && errorMessages.password}
                />

                {data.password && (
                    <Input
                        classes="w-full ml-4 rounded-none p-2"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        value={data.confirmPassword}
                        onChange={(e) => handleChange(e)}
                        errObj={errorMessages.hasOwnProperty('confirmPassword') && errorMessages.confirmPassword}

                    />
                )}
            </div>
            <div className="flex gap-2">
                <button type="submit" className="form__input--submit">
                    Update
                </button>
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
    );
};

export default UserUpdateForm;
