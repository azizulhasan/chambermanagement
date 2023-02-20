import React, { useState } from "react";

const Settings = () => {
  const [prevPassword, setPrevPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div>
      <h2 className="pb-2 text-base sm:text-lg font-medium">
        Personal Information
      </h2>
      <div className="p-4 border blur-filter rounded-md bg-gray-50 overflow-x-auto text-sm md:text-base flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <div>
            Name:
            <div className="bg-gray-100 px-2 py-1 rounded-tl-md rounded-tr-md border-b">
              John Doe
            </div>
          </div>
          <div>
            Phone:{" "}
            <div className="bg-gray-100 px-2 py-1 rounded-tl-md rounded-tr-md border-b">
              +8801XXXXXXXXX
            </div>
          </div>
          <div>
            Email:{" "}
            <div className="bg-gray-100 px-2 py-1 rounded-tl-md rounded-tr-md border-b">
              johndoe@gmail.com
            </div>
          </div>
          <div>
            Password:{" "}
            <div className="bg-gray-100 px-2 py-1 rounded-tl-md rounded-tr-md border-b">
              ************
            </div>
          </div>
        </div>
        <div>
          <button className="border px-4 py-1 hover:bg-gray-100 rounded-md">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
