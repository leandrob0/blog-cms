import axios from "axios";
const baseUrl = "https://leandroblog-api.herokuapp.com/api/posts";

// Returns X last post published (sorted by update time).
export const getAllPosts = async (token) => {
  const result = await axios.get(`${baseUrl}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data;
};

// Returns the specified post details and comments.
export const getSpecificPost = async (id) => {
  const result = await axios.get(`${baseUrl}/${id}`);
  return result.data;
};

// Creates a post and shows its page detail.
export const createPost = async (body, token) => {
  const result = await axios.post(`${baseUrl}`, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data;
};

// Edits a post.
export const editPost = async (id, body, token) => {
  const result = await axios.put(`${baseUrl}/${id}`, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data;
};

// Deletes a post with all its comments and returns all the posts after deletion.
export const deletePost = async (id, token) => {
  const result = await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data;
};

// Toggles the published status from a post, and returns it.
export const toggleStatusPost = async (id, token) => {
  const result = await axios.put(`${baseUrl}/${id}/publish`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data;
};

// Deletes a comment from a post.
export const deleteComment = async (id, token) => {
  const result = await axios.delete(`api/comment/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data;
}