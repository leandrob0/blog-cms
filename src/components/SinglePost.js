import { useDispatch } from "react-redux";
import { clickedPost } from "../features/postId";
import { logout } from "../features/user";
import { useNavigate } from "react-router-dom";
import { deletePost, toggleStatusPost } from "../services/posts";
import { findPostAndReplace } from "../helpers.js/findAndReplace";

const SinglePost = ({ title, text, pub, id, posts, setPosts }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // set a redux global state of the post we curr want to see.
  const getPostId = (e) => {
    const id = e.target.parentNode.parentNode.id;
    localStorage.setItem("postIdCMS", JSON.stringify({ postId: id }));
    dispatch(clickedPost({ postId: id }));

    return navigate("/post");
  };

  const deleteCicked = (e) => {
    const token = JSON.parse(localStorage.getItem("userCMS")).token;
    const id = e.target.parentNode.parentNode.id;

    deletePost(id, token)
      .then((res) => {
        setPosts(res.posts);
      })
      .catch((err) => {
        if (err.response.data.message === "Token expired") {
          dispatch(logout());
          return navigate("/login");
        }
      });
  };

  const editPost = (e) => {
    const id = e.target.parentNode.parentNode.id;

    return navigate(`/edit-post/${id}`);
  };

  const statusPost = (e) => {
    const token = JSON.parse(localStorage.getItem("userCMS")).token;
    const id = e.target.parentNode.parentNode.id;

    toggleStatusPost(id, token)
      .then((res) => {
        setPosts(findPostAndReplace(posts, res.post));
      })
      .catch((err) => {
        console.log(err);
      });
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
      <div className="flex">
        <div
          className="bg-red-600 py-2 px-3 font-bold rounded w-full hover:cursor-pointer"
          onClick={deleteCicked}
        >
          Delete post
        </div>
        <div
          className="bg-blue-600 py-2 px-3 font-bold rounded w-full hover:cursor-pointer"
          onClick={editPost}
        >
          Edit post
        </div>
        {pub ? (
          <div
            className="bg-green-600  py-2 px-3 font-bold rounded w-full hover:cursor-pointer"
            onClick={statusPost}
          >
            Unpublish post
          </div>
        ) : (
          <div
            className="bg-green-600  py-2 px-3 font-bold rounded w-full hover:cursor-pointer"
            onClick={statusPost}
          >
            Publish post
          </div>
        )}
      </div>
    </article>
  );
};

export default SinglePost;
