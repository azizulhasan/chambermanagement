import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchData } from '../../../utilities/utilities';

const Settings = () => {
    const loggedInUser = useSelector((state) => state.users.loggedInUser);

    console.log({ loggedInUser });

    const fetchUserDetails = async (id) => {
        try {
            const { data } = await fetchData({
                endpoint: `/api/userSchedule/doctorschedules/${id}`,
            });
            console.log({ data });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <h2 className="pb-2 text-base sm:text-lg font-medium">
                Personal Information
            </h2>
            <div className="p-4 border blur-filter rounded-md bg-gray-50 overflow-x-auto text-sm md:text-base flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                    <div>
                        <label>Name:</label>
                        <input
                            type="string"
                            value="John"
                            className="bg-gray-100 px-2 py-1 rounded-tl-md rounded-tr-md border-b"
                        />
                    </div>
                    <div>
                        Phone:{' '}
                        <input
                            type="string"
                            value="+8801XXXXXXXXX"
                            className="bg-gray-100 px-2 py-1 rounded-tl-md rounded-tr-md border-b"
                        />
                    </div>
                    <div>
                        Email:{' '}
                        <input
                            disabled
                            type="string"
                            value="johndoe@gmail.com"
                            className="bg-gray-100 px-2 py-1 rounded-tl-md rounded-tr-md border-b"
                        />
                    </div>
                    <div>
                        Password:{' '}
                        <input
                            type="string"
                            value="***********"
                            className="bg-gray-100 px-2 py-1 rounded-tl-md rounded-tr-md border-b"
                        />
                    </div>
                </div>
                <div>
                    <button className="border px-4 py-1 text-white bg-themeColor rounded-md">
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
