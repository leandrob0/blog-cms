import { useSelector , useDispatch } from "react-redux";
import { deleteComment } from "../services/posts";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/user";

const Comment = ({ author, text , id , setComments }) => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteClicked = (e) => {
    const id = e.target.previousSibling.id;
    const token = JSON.parse(localStorage.getItem("userCMS")).token;

    deleteComment(id, token)
      .then(res => {
        console.log(res);
        setComments(res.comments);
      })
      .catch(err => {
        console.log(err);
        dispatch(logout());
        return navigate("/login");
      })
  }

  return (
    <div className="flex justify-between">
      <div className="py-2 border-b" id={id}>
        {user.username === author ? (
          <h3 className="text-blue-800">
            <b>{author}</b>
          </h3>
        ) : (
          <h3 className="text-blue-600">
            {author}
          </h3>
        )}
        <p>{text}</p>
      </div>
      <button type="button" onClick={deleteClicked} className="bg-red-600 px-3 font-bold border border-black rounded hover:cursor-pointer">Delete comment</button>
    </div>
  );
};

export default Comment;
