import React from 'react';
import TextInput from "../components/global/textinput";
import Button from "../components/global/button";

const Settings = () => {
    return (
        <div className="w-full top-post pt-48 px-5  lg:pl-64 lg:pr-32 lg:pt-48">
            <h2 className="font-bold text-[30px] lg:text-[40px] mb-10">⚙ Settings</h2>
            <div className="flex bg-white p-3">
                <TextInput placeholder="New display name" />
                <Button text="Confirm"/>
            </div>
        </div>
    );
};

export default Settings;
