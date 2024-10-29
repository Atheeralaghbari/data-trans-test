"use client";
import { useState, useEffect } from "react";

import Delete from "@/app/components/delete";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Edit from "@/app/components/edit";

const Post = ({ params }) => {
  const [responseBack, setResponseBack] = useState();
  const router = useParams();
  const router2 = useRouter();
  const [posts, setPosts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/" + router.id
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <section>
      {responseBack ? (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg max-w-2xl mx-auto"></div>
      ) : (
        ""
      )}
      <div className="bg-emerald-50  p-2  max-w-2xl mx-auto my-5 ">
        <h1 className="text-teal-500">{posts.title}</h1>
        <p>{posts.body}</p>
        <Delete
          id={posts.id}
          callBackResponse={(data) => {
            setResponseBack(data.message);

            setPosts([]);
            setTimeout(() => {
              router2.push("/");
            }, [2000]);
          }}
        />
        <Edit
          data={posts}
          callBackResponse={(data) => {
            setResponseBack(data.message);
            setPosts(data.data);
          }}
        />
      </div>
    </section>
  );
};

export default Post;
