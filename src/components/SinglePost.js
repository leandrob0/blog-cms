import { useDispatch } from "react-redux";
import { clickedPost } from "../features/postId";
import { useNavigate } from "react-router-dom";

const SinglePost = ({ title, text, pub, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // set a redux global state of the post we curr want to see.
  const getPostId = (e) => {
    const id = e.target.parentNode.parentNode.id;
    localStorage.setItem("postIdCMS", JSON.stringify({ postId: id }));
    dispatch(clickedPost({ postId: id }));

    return navigate("/post");
  };

  const deletePost = (e) => {
    const id = e.target.parentNode.parentNode.id;
    console.log(id);
  };

  const editPost = (e) => {
    const id = e.target.parentNode.parentNode.id;
    console.log(id);
  };

  const publishPost = (e) => {
    const id = e.target.parentNode.parentNode.id;
    console.log(id);
  };

  return (
    <article
      className="p-3 m-12 border border-indigo-400 rounded shadow-indigo-400/80 max-w-xl"
      id={id}
    >
      <div className="p-2 border-b-2 bg-indigo-300 w-full h-full rounded">
        <p
          className="font-bold hover:underline hover:cursor-pointer"
          onClick={getPostId}
        >
          {title}
        </p>
      </div>
      <div className="px-2 line-clamp-6">
        <p>{text}</p>
      </div>
      <div>
        <button className="bg-red-600" onClick={deletePost}>
          Delete post
        </button>
        <button className="bg-blue-600" onClick={editPost}>
          Edit post
        </button>
        {pub ? (
          <button className="bg-green-600" onClick={publishPost}>
            Unpublish post
          </button>
        ) : (
          <button className="bg-green-600" onClick={publishPost}>
            Publish post
          </button>
        )}
      </div>
    </article>
  );
};

export default SinglePost;
