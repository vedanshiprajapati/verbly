import { BACKEND_URL } from "@/constants/const";
import { MutationFunction } from "@tanstack/react-query";
import { createBlog } from "@vedanshi/verbly-common";

// const token = localStorage.getItem("token") || "";
export const fetchIndividualBlogs = async (id: string | undefined) => {
    const response = await fetch(`${BACKEND_URL}blog/${id}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    const data = await response.json();
    return data;
};

export const PostIndividualBlog = async (
    blogInfo: createBlog
): Promise<any> => {
    const response = await fetch(`${BACKEND_URL}blog/edit`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(blogInfo),
    });

    if (!response.ok) {
        throw new Error("Failed to publish blog");
    }
    return response.json();
};

interface PublishBlogResponse {
    message: string;
    details: {
        title: string;
        content: string;
        id: string;
        author: {
            username: string;
            name?: string;
        };
    };
}

interface PublishBlogVariables {
    id: string;
    blogInfo: createBlog;
}

export const UpdateIndividualBlog: MutationFunction<
    PublishBlogResponse,
    PublishBlogVariables
> = async ({ id, blogInfo }) => {
    const response = await fetch(`${BACKEND_URL}blog/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(blogInfo),
    });

    if (!response.ok) {
        throw new Error("Failed to publish blog");
    }

    return response.json();
};

export const fetchAllBlogs = async ({ pageParam }: { pageParam: number }) => {
    const response = await fetch(`${BACKEND_URL}blog/bulk?cursor=${pageParam}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    const data = await response.json();
    return { details: data.details, nextCursor: data.nextCursor };
};

export const DeleteBlog = async (id: string) => {
    const response = await fetch(`${BACKEND_URL}blog/${id}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to delete blog");
    }
    return response.json();
};

export const GetIsEditable = async (id: string) => {
    const response = await fetch(`${BACKEND_URL}blog/${id}/iseditable`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!response.ok) {
        throw new Error("Failed to get isEditable");
    }
    return response.json();
};
