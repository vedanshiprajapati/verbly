import { BACKEND_URL } from "@/constants/const";
import { signin, signup } from "@vedanshi/verbly-common";

export const postLogin = async (data: signin): Promise<any> => {
    const response = await fetch(`${BACKEND_URL}user/signin`, {
        method: "POST",
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('falied to login');
    }
    return response.json();
}

export const postSignup = async (data: signup): Promise<any> => {
    const response = await fetch(`${BACKEND_URL}user/signup`, {
        method: "POST",
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('falied to signup');
    }
    return response.json();
}
export const GetProfile = async (username: string) => {
    const response = await fetch(`${BACKEND_URL}user/${username}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (!response.ok) {
        throw new Error('falied to get profile');
    }

    return response.json();
}

export const UpdateProfile = async (data: { name: string, email: string, username: string }) => {
    const response = await fetch(`${BACKEND_URL}user/profile/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to update profile');
    }

    return response.json();
};