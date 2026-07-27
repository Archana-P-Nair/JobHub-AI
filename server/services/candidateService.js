import api from "./api";

export async function getProfile() {

    const response = await api.get("/candidate/profile");

    return response.data;

}

export async function updateProfile(formData) {

    const response = await api.put(

        "/candidate/profile",

        formData,

        {
            headers: {

                "Content-Type": "multipart/form-data",

            },

        }

    );

    return response.data;

}