import api from "./api";

/*
Get all jobs
*/

export const getJobs = async (params = {}) => {

    const response = await api.get("/jobs", {
        params,
    });

    return response.data;

};
export async function getJobById(id) {

    const response = await api.get(`/jobs/${id}`);

    return response.data;

}
/*
Get single job
*/

export const getJob = async (id) => {

    const response = await api.get(`/jobs/${id}`);

    return response.data;

};

/*
Recruiter
*/

export const createJob = async (data) => {

    const response = await api.post(
        "/jobs",
        data
    );

    return response.data;

};

export const updateJob = async (
    id,
    data
) => {

    const response = await api.put(
        `/jobs/${id}`,
        data
    );

    return response.data;

};

export const deleteJob = async (
    id
) => {

    const response = await api.delete(
        `/jobs/${id}`
    );

    return response.data;

};