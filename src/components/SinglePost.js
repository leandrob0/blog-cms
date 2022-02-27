import { useDispatch } from "react-redux";
import { clickedPost } from "../features/post";
import { useNavigate } from "react-router-dom";

const SinglePost = ({title, text, id}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // set a redux global state of the post we curr want to see.
    const getPostId = (e) => {
        const id = e.target.parentNode.parentNode.id;
        localStorage.setItem("postIdCMS", JSON.stringify({postId: id}))
        dispatch(clickedPost({postId: id}));

        return navigate("/post");
    }

    return (
        <article className="p-3 m-12 border border-indigo-400 rounded shadow-indigo-400/80 max-w-xl" id={id}>
            <div className="p-2 border-b-2 bg-indigo-300 w-full h-full rounded">
                <p className="font-bold hover:underline hover:cursor-pointer" onClick={getPostId}>{title}</p>
            </div>
            <div className="px-2 line-clamp-6">
                <p>{text}</p>
            </div>
        </article>
    )
}

export default SinglePost