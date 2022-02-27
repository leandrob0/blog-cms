import axios from "axios";
const baseUrl = "/api/posts";

// Returns X last post published (sorted by update time).
export const getLastXpublishedPosts = async (limit) => {
    const result = await axios.get(`${baseUrl}/${limit}/sorted`);
    return result.data;
}

// Returns the specified post details and comments.
export const getSpecificPost = async (id) => {
    const result = await axios.get(`${baseUrl}/${id}`);
    return result.data;
}