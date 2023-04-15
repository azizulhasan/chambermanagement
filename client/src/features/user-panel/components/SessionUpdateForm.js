import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../../../components/form/Input';
import Select from '../../../components/form/Select';
import { updateSchedule } from '../../../store/userScheduleSlice';

const SessionUpdateForm = ({
    currentValues,
    setOpen,
    options = ['Upcomming', 'Ongoing', 'Completed'],
}) => {
    const [formData, setformData] = useState(null);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let form = new FormData(e.target);
        for (let [key, value] of form.entries()) {
            if (key === '' || value === '') {
                alert('Please fill the value of : ' + key);
                return;
            }
        }
        let data = {
            session_name: formData.session_name,
            session_date: formData.session_date,
            session_time: formData.session_time,
            per_session_length: formData.per_session_length,
            status: formData.status,
        };
        dispatch(updateSchedule([formData._id, data]));
        setOpen(false);
    };

    const bgColor =
        formData?.status === 'Completed'
            ? 'bg-themeColor'
            : formData?.status === 'Upcomming'
            ? 'bg-yellow-600'
            : formData?.status === 'Ongoing'
            ? 'bg-red-600'
            : 'black';

    useEffect(() => {
        setformData({ ...currentValues });
    }, [currentValues]);

    if (!formData) {
        return <div>Please Wait...</div>;
    }

    return (
        <div className="px-8 py-14 bg-gray-50 flex flex-col gap-10 rounded-md relative">
            <button
                onClick={() => setOpen(false)}
                className="absolute top-6 right-6 text-2xl"
            >
                &#x2715;
            </button>
            <h1 className="text-xl font-semibold">Edit session</h1>
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="  overflow-x-auto text-sm md:text-base flex flex-col gap-10"
            >
                <div className="flex flex-col gap-4">
                    <Input
                        classes="w-full ml-4 rounded-none p-2"
                        placeholder="session name"
                        name="session_name"
                        type="text"
                        label="Name"
                        value={formData.session_name}
                        onChange={(e) => handleChange(e)}
                    />

                    <Input
                        classes="w-full ml-4 rounded-none p-2"
                        placeholder="session date"
                        name="session_date"
                        type="text"
                        label="Date"
                        value={formData.session_date.slice(0, 10)}
                        onChange={(e) => handleChange(e)}
                    />

                    <Input
                        classes="w-full ml-4 rounded-none p-2"
                        placeholder="session time"
                        name="session_time"
                        type="text"
                        label="Time"
                        value={formData.session_time}
                        onChange={(e) => handleChange(e)}
                    />
                    <Input
                        classes="w-full ml-4 rounded-none p-2"
                        placeholder="session length"
                        name="per_session_length"
                        type="text"
                        label="Length"
                        value={formData.per_session_length}
                        onChange={(e) => handleChange(e)}
                    />
                    <div className="flex gap-3">
                        <label className="text-gray-500">Status </label>
                        <Select
                            name="status"
                            value={formData.status}
                            onChange={(e) => handleChange(e)}
                            options={options}
                            classes={bgColor + ' text-white py-1'}
                        />
                    </div>
                </div>

                <button type="submit" className="form__input--submit w-full">
                    Update
                </button>
            </form>
        </div>
    );
};

export default SessionUpdateForm;
