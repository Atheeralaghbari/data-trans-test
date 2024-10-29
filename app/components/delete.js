"use client";
import React from "react";
export default function Delete({ id, callBackResponse }) {
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (confirmed) {
      const req = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          method: "DELETE",
        }
      );

      if (req.status == 200) {
        callBackResponse({ message: "Post deleted successfully!", data: [] });
      } else {
        callBackResponse("Post not found!");
      }
    }
  };
  return (
    <div>
      <button
        onClick={handleDelete}
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Delete Post
      </button>
    </div>
  );
}
