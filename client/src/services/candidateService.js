import api from "./api";

export async function getProfile() {
    const res = await api.get("/candidate/profile");
    return res.data;
}

export async function updateProfile(formData) {
    const res = await api.put(
        "/candidate/profile",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return res.data;
}

export async function getSavedJobs() {
    const res = await api.get("/candidate/saved-jobs");
    return res.data;
}

export async function toggleSaveJob(jobId) {
    const res = await api.post(`/candidate/saved-jobs/${jobId}`);
    return res.data;
}