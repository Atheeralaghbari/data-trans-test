export async function DELETE(request, { params }) {
  const { id } = params;
  const response = fetch("https://jsonplaceholder.typicode.com/posts/" + id, {
    method: "DELETE",
  });
  const posts = await response;
  console.log("post=>", posts.status);
  if (posts.status == 200) {
    return new Response(
      JSON.stringify({ message: "Post deleted successfully!", status: 200 }),
      {
        status: 200,
      }
    );
  }

  return new Response(
    JSON.stringify({ message: "Post not found", status: 404 }),
    {
      status: 404,
    }
  );
}
