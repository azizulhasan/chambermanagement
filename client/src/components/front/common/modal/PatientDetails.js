import React from "react";
import Input from '../form/Input'
export default function PatientDetails() {

    const getFormValue = (e) => {
        console.log(e);
    }
    return <div className="flex border justify-between py-4 mb-8 ">
        <div className=" w-full col-span-4">
            <Input name="name" type="text" placeholder="Name" id="name" classes={"w-full border p-2"} onChange={(e) => getFormValue(e)} />
        </div>
        <div className="w-full px-2 col-span-4">
            <Input name="email" type="email" placeholder="Email" id="email" classes={"w-full border p-2 "} onChange={(e) => getFormValue(e)} />
        </div>
        <div className="w-full col-span-4">
            <Input name="phone" type="number" placeholder="Phone number" id="phone" classes={"w-full border p-2"} onChange={(e) => getFormValue(e)} />
        </div>
    </div>;
}
