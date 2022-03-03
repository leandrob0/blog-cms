import axios from "axios";
const baseUrl = "https://leandroblog-api.herokuapp.com/api";

export const loginUserAdmin = async (body) => {
    const result = await axios.post(`${baseUrl}/login/cms`, body);
    return result.data;
}