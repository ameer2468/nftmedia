import React from "react";
import ViewCount from "../global/view-count";
import CommentCount from "../global/comment-count";
import VoteCount from "../global/vote-count";
import { Avatar } from "../global/avatar";

const PostContent = () => {
  return (
    <div className="bg-gradient-to-br to-zinc-50 from-sky-50 rounded-xl p-10">
      <div>
        <h2 className="font-bold text-[30px] lg:text-[40px]">
          Bitcoin price drop
        </h2>
        <div className="flex gap-10 mb-8 mt-2">
          <CommentCount count="12" />
          <ViewCount count="25" />
          <VoteCount count="18" />
        </div>
      </div>
      <div className="flex items-center gap-2 mb-5">
        <p className="font-bold">By:</p>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Avatar className="w-10" />
            <p className="font-bold text-sky-500">John Doe</p>
          </div>
          <p className="ml-5 font-bold text-sm opacity-50">Today at 5:43PM</p>
        </div>
      </div>
      <p className="leading-6">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi,
        aut consequatur, delectus deserunt doloremque doloribus eaque eligendi
        facilis labore laudantium libero nesciunt, numquam optio quam sed sunt
        tenetur voluptatibus? Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Accusantium aliquam aliquid amet, aut beatae dicta est
        facilis harum ipsa labore nemo nihil quam quia quisquam recusandae saepe
        velit voluptas voluptatum? Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Ipsa laboriosam magnam quam saepe unde? Consequuntur
        cum, dolor ea excepturi iusto nihil repellat tenetur unde. Animi
        dignissimos nisi nulla quae rerum.
      </p>
    </div>
  );
};

export default PostContent;
