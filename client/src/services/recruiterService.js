import api from "./api";

export async function getRecruiterJobs() {
    const response = await api.get("/jobs/recruiter/my");
    return response.data;
}
export async function getAnalytics() {

    const response = await api.get(
        "/recruiter/analytics"
    );

    return response.data;

}
export async function getJob(id) {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
}

export async function createJob(data) {
    const response = await api.post("/jobs", data);
    return response.data;
}

export async function updateJob(id, data) {
    const response = await api.put(`/jobs/${id}`, data);
    return response.data;
}

export async function deleteJob(id) {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
}

export async function getApplicants(jobId) {
    const response = await api.get(
        `/recruiter/jobs/${jobId}/applicants`
    );
    return response.data;
}

export async function updateApplicationStatus(id, status) {
    const response = await api.put(
        `/recruiter/applications/${id}`,
        { status }
    );
    return response.data;
}