import { BACKEND_URL, token } from "@/constants/const";
import { createBlog } from "@vedanshi/verbly-common";

export const fetchIndividualBlogs = async (id: string | undefined) => {
    const response = await fetch(`${BACKEND_URL}blog/${id}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data;
};