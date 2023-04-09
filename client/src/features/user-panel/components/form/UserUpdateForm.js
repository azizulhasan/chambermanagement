import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserFromUserPanel } from '../../../../store/usersSlice';
import Input from '../../../../components/form/Input';
import { FormValidate } from '../../../../utilities/FormValidate';

const UserUpdateForm = ({ currentValues, setEditMode }) => {
    const [data, setData] = useState(null);
    const [errorMessages, setErrorMessages] = useState({})
    const [formSubmitted, setFormSubmitted] = useState(true)
    const [confirmPassword, setConfirmPassword] = useState(false);
    const { loggedInUser } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        let formVal = new FormValidate();
        let res = formVal.validate(e.target.value, e.target.getAttribute('type'))
        let errMessge = {
            ...res,
            ...{
                fieldName: e.target.name,
                isFormSubmitted: formSubmitted,
            }
        }
        let tempErrs = structuredClone(errorMessages)
        tempErrs[e.target.name] = errMessge;
        setErrorMessages(tempErrs)
        setData({ ...data, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        console.log(errorMessages)
    }, [errorMessages])


    const handleSubmit = (e) => {
        e.preventDefault();
        // let formVal = new FormValidate();
        // let errors = [];
        // Object.keys(data).map((key) => {
        //     if (key == 'name' && !formVal.validate(data[key])) {
        //         errors.push(key);
        //     }

        //     if (key == 'phone' && !formVal.validate(data[key])) {
        //         errors.push(key);
        //     }
        // });

        // if (errors.length) {
        //     alert(
        //         'Please fill the proper value of these fields ' +
        //             errors.join(', ')
        //     );
        //     return;
        // }

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

        dispatch(updateUserFromUserPanel(JSON.stringify(payload)));
    };

    useEffect(() => {
        setData({ ...currentValues, confirmPassword: '' });
    }, [currentValues]);

    useEffect(() => {
        if (data?.password !== currentValues.password) {
            setConfirmPassword(true);
        } else if (data?.password === currentValues.password) {
            setConfirmPassword(false);
        }
    }, [data?.password, currentValues.password]);

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
                    errObj={errorMessages.hasOwnProperty('name') ? errorMessages.name : { type: 'red-700', message: 'name', isFormSubmitted: true, fieldName: 'name' }}
                />

                <Input
                    classes="w-full ml-4 rounded-none p-2"
                    placeholder="Phone"
                    name="phone"
                    type="number"
                    label="Phone"
                    value={data.phone}
                    onChange={(e) => handleChange(e)}
                    errObj={errorMessages.hasOwnProperty('phone') ? errorMessages.phone : { type: 'red-700', message: 'phone', isFormSubmitted: true, fieldName: 'phone' }}
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
                />

                {confirmPassword && (
                    <Input
                        classes="w-full ml-4 rounded-none p-2"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        value={data.confirmPassword}
                        onChange={(e) => handleChange(e)}
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
