"use client";
import React from "react";

import { useParams } from "next/navigation";
export default function Edit({ data, callBackResponse }) {
  const [post, setPost] = React.useState(data);
  const [showForm, setShowForm] = React.useState(false);

  console.log("searchParams======>", useParams());
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://jsonplaceholder.typicode.com/posts/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then(async (res) => {
        callBackResponse({
          message: "posts Edit successfully!",
          data: await res.json(),
        });
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <button
        onClick={() => setShowForm(!showForm)}
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Edit Post
      </button>
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              title
            </label>
            <input
              type="text"
              name="title"
              value={post.title}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="body"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              body
            </label>
            <input
              name="body"
              value={post.body}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}
