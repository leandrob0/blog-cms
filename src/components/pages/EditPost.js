import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editPost } from "../../services/posts";
import { clickedPost } from "../../features/postId";
import { getSpecificPost } from "../../services/posts";

const EditPost = () => {
  const [formValue, setFormValue] = useState({
    title: "",
    text: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getSpecificPost(id)
      .then((res) => {
        setFormValue({ title: res.post.title, text: res.post.text });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const body = {
      title: formValue.title,
      text: formValue.text,
    };

    const token = JSON.parse(localStorage.getItem("userCMS")).token;

    editPost(id, body, token)
      .then((res) => {
        // Set the localStorage in case the user refresh while viewing an specific post. And set the redux state, then navigates to that post.
        localStorage.setItem("postIdCMS", JSON.stringify({ postId: id }));
        dispatch(clickedPost({ postId: id }));

        return navigate("/post");
      })
      .catch((err) => {
        console.log(err);
        return navigate("/login");
      });
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={(e) => onSubmit(e)}
        className="flex flex-col p-10 m-20 gap-10 border border-gray-400 rounded shadow-lg break-words focus:border-gray-700"
      >
        <fieldset className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            placeholder="Insert title here."
            className="border border-gray-400 rounded w-60 md:w-80 focus:outline-gray-700 p-1"
            type="text"
            id="title"
            name="title"
            value={formValue.title}
            onChange={handleChange}
            required
          />
        </fieldset>
        <fieldset className="flex flex-col">
          <label htmlFor="text">Text</label>
          <textarea
            placeholder="Insert post content here."
            className="border border-gray-400 rounded w-60 md:w-80 focus:outline-gray-700 p-1"
            type="text"
            id="text"
            name="text"
            value={formValue.text}
            onChange={handleChange}
            required
          />
        </fieldset>
        <button className="rounded px-4 py-2 bg-indigo-700 text-white hover:bg-indigo-900 hover:shadow-indigo-600/2020 transition">
          Edit post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
