import React from "react";
import TextInput from "../components/global/textinput";
import Button from "../components/global/button";
import Card from "../components/settings/card";

const Settings = () => {
  return (
    <div className="w-full top-post pt-48 px-5  lg:pl-64 lg:pr-32 lg:pt-48">
      <h2 className="font-bold text-[30px] lg:text-[40px] mb-10">⚙ Settings</h2>
      <Card
        subtitle="You can only change your display name once every 30 days."
        title="Display Name"
      >
        <TextInput className="bg-zinc-100" placeholder="New display name" />
        <Button className="bg-sky-500 normal-case mt-5" text="Confirm" />
      </Card>
    </div>
  );
};

export default Settings;
