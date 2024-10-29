"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ThemeToggle from "./components/ThemeToggle";
const Posts = () => {
  const router = useRouter();
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        setPosts(await res.json());
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex justify-between my-4">
        <ThemeToggle />
        <h1 className="text-purple-600">Posts</h1>
        <button
          type="button"
          onClick={() => router.push("/posts/add")}
          className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          add new
        </button>
      </div>
      <ul className="space-y-2 max-w-xl mx-auto">
        {posts.map((post) => (
          <li
            key={post.id}
            className="bg-green-100 text-gray-500 dark:text-black dark:bg-slate-200 flex gap-1 p-2"
          >
            <span> {post.title}</span>
            <Link href={`/posts/${post.id}`} className="text-blue-700">
              read more..
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
