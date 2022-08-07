import React from "react";
import { Avatar } from "../global/avatar";

const Comment = () => {
  return (
    <div className="bg-white rounded-xl p-5">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center">
          <Avatar className="w-10" />
          <p className="font-bold text-sky-500">John Doe</p>
        </div>
        <p className="ml-5 font-bold text-sm opacity-50">Today at 5:43PM</p>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
        numquam repellendus temporibus. Consectetur deleniti deserunt iusto
        omnis quaerat quam quibusdam reprehenderit totam unde vitae. Explicabo
        minima nostrum optio perferendis tempora.
      </p>
    </div>
  );
};

export default Comment;
