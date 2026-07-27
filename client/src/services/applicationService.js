import api from "./api";

export async function applyForJob(jobId, coverLetter = "") {
    const response = await api.post(
        `/applications/${jobId}`,
        { coverLetter }
    );

    return response.data;
}
export async function getMyApplications() {

    const response = await api.get("/applications/my");

    return response.data;

}