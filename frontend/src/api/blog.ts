import { BACKEND_URL} from "@/constants/const";
import { MutationFunction } from "@tanstack/react-query";
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

export const PostIndividualBlog = async <T>(blogInfo: createBlog): Promise<T> => {
    const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }
    const response = await fetch(`${BACKEND_URL}blog/edit`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogInfo),
    });

    if (!response.ok) {
        throw new Error('Failed to publish blog');
    }

    return response.json();
};

interface PublishBlogResponse {
    message: string,
    details: {
        title: string,
        content: string,
        id: string,
        author: {
            username: string,
            name?: string,
        }
    };
}

interface PublishBlogVariables {
    id: string;
    blogInfo: createBlog;
}

export const UpdateIndividualBlog: MutationFunction<PublishBlogResponse, PublishBlogVariables> =
    async ({ id, blogInfo }) => {
        const response = await fetch(`${BACKEND_URL}blog/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(blogInfo),
        });

        if (!response.ok) {
            throw new Error('Failed to publish blog');
        }

        return response.json();
    };

export const fetchAllBlogs = async () => {
    const response = await fetch(`${BACKEND_URL}blog/bulk`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    const { details } = await response.json();
    return details;
};
