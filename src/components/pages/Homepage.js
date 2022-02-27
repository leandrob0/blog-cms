import { useEffect, useState } from "react";
import { getLastXpublishedPosts } from "../../services/posts";
import { useDispatch } from "react-redux";
import { resetClicked } from "../../features/post";

import SinglePost from "../SinglePost";

const LIMIT_POSTS = 6;

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const  dispatch = useDispatch();

  useEffect(() => {
    // Resets the state of the current visited post.
    dispatch(resetClicked());

    // Get all the posts
    setLoading(true);
    getLastXpublishedPosts(LIMIT_POSTS)
      .then(res => {
        setPosts(res.posts);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      })
  // According to Redux Docs, it is safe to add dispatch to the dependencies array. https://react-redux.js.org/api/hooks#usedispatch
  }, [dispatch]);

  // Check the posts state, if there are posts shows them, else, show there are no posts.
  return (
    <div>
      <div className="flex flex-col justify-center items-center p-20 h-20 bg-gradient-to-b from-indigo-400">
        <h3 className="py-2"><b>Welcome to my blog</b></h3>
        <p className="py-2">Click on the title of any post to see it!</p>
      </div>
      <section className="flex flex-wrap justify-center items-center">
        {loading && 
        <div className="animate-pulse h-16 w-16 rounded-full flex justify-center items-center">Loading posts...</div>
        }
        {
          (posts.map(post => {
            return <SinglePost title={post.title} text={post.text} id={post._id} key={post._id}/>
          }))
        }
      </section>
      {
        !loading && <footer className="h-12 border-t-2 flex justify-start text-gray-700 ">
        <div className="py-2 px-6">
          <p>Made by: Leandro Bovino</p>
        </div>
      </footer>
      }
    </div>
  );
};

export default Homepage;
