import { useSelector } from "react-redux";

const Comment = ({ author, text }) => {
  const isAdmin = useSelector((state) => state.user.value.admin);

  return (
    <div className="py-2 border-b">
      {isAdmin ? (
        <h3 className="text-blue-800">
          <em>{author}</em>
        </h3>
      ) : (
        <h3 className="text-blue-600">
          <em>{author}</em>
        </h3>
      )}
      <p>{text}</p>
    </div>
  );
};

export default Comment;
