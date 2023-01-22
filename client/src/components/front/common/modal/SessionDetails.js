import React from "react";
import Select from "../form/Select";

export default function SessionDetails() {
    return <div className=" flex border py-4 mb-8 ">
        <div className="w-60 ">
            <Select defaultOption="Select Session" classes={'border w-60 p-2'} options={['option', 'option-2', 'option-3']} id="session_name" name="session_name" />
        </div>
        <div className="w-60">
            <Select defaultOption="Select Doctor" classes={'border w-60 p-2'} options={['option', 'option-2', 'option-3']} id="doctor_name" name="doctor_name" />
        </div>
        <div className="w-60 w-60">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>

    </div>;
}
