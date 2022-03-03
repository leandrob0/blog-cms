import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSpecificPost } from "../../services/posts";
import { useNavigate } from "react-router-dom";

import Comment from "../Comment";

const PostDetail = () => {
  const [loading, setLoading] = useState(false);
  const [currPost, setCurrPost] = useState({ comments: [] });
  const id = useSelector((state) => state.post.value.postId);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    getSpecificPost(id)
      .then((res) => {
        const post = res.post;
        const comments = res.comments;

        const date = post.updatedAt.split("T")[0];

        setCurrPost({
          author: post.author.username,
          title: post.title,
          text: post.text,
          created: date,
          comments: comments,
        });
      })
      .catch((err) => {
        console.log(err);
        return navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check the posts state, if there are posts shows them, else, show there are no posts.
  return (
    <article className="flex flex-col items-center p-6 sm:m-12 sm:border sm:border-indigo-400 sm:rounded sm:shadow-indigo-400">
      <div className="flex flex-col items-center w-full">
        <div className="flex pb-3 justify-center border-b border-b-gray-700 w-full">
          {loading ? (
            <h2 className="text-2xl animate-pulse">Loading...</h2>
          ) : (
            <h2 className="text-2xl">{currPost.title}</h2>
          )}
        </div>
        <div className="flex justify-between text-gray-700 w-full p-3">
          {loading ? (
            <h2 className="text-2xl animate-pulse">Loading...</h2>
          ) : (
            <>
              <p className="px-6">{currPost.author}</p>
              <p className="px-6">{currPost.created}</p>
            </>
          )}
        </div>
      </div>
      <div className="p-3">
        <p className="text-sm md:text-base">{currPost.text}</p>
      </div>
      <div className="w-full justify-self-start p-3">
        <section>
          <h3 className="font-bold underline ">Comments: </h3>
        </section>
        {currPost.comments.map((comment) => {
          return (
            <Comment
              key={comment._id}
              author={comment.author.username}
              text={comment.text}
              id={comment._id}
              setComments={setCurrPost}
            />
          );
        })}
      </div>
    </article>
  );
};

export default PostDetail;
