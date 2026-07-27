import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EditJob from "./pages/recruiter/EditJob";
import Analytics from "./pages/recruiter/Analytics";
import CreateJob from "./components/recruiter/CreateJob";
import ApplicantsPage from "./pages/recruiter/ApplicantsPage";

import Login from "./pages/Login";
import Register from "./pages/Register";
import CandidateDashboard from "./pages/candidate/Dashboard";
import BrowseJobs from "./pages/candidate/BrowseJobs";
import SavedJobs from "./pages/candidate/SavedJobs";
import RecruiterDashboard from "./pages/recruiter/Dashboard";
import NotFound from "./pages/NotFound";
import JobDetails from "./pages/candidate/JobDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import MyApplications from "./pages/candidate/MyApplications";
import Profile from "./pages/candidate/Profile";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Navigate to="/login" replace />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route
                    path="/candidate"
                    element={
                        <ProtectedRoute role="candidate">
                            <CandidateDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/candidate/jobs"
                    element={
                        <ProtectedRoute role="candidate">
                            <BrowseJobs />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/candidate/saved"
                    element={
                        <ProtectedRoute role="candidate">
                            <SavedJobs />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/candidate/jobs/:id"
                    element={
                        <ProtectedRoute role="candidate">
                            <JobDetails />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/recruiter/jobs/:id/applicants"
                    element={
                        <ProtectedRoute role="recruiter">
                            <ApplicantsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/candidate/profile"
                    element={
                        <ProtectedRoute role="candidate">
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/recruiter/jobs/edit/:id"
                    element={
                        <ProtectedRoute role="recruiter">
                            <EditJob />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/recruiter/analytics"
                    element={
                        <ProtectedRoute role="recruiter">
                            <Analytics />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/recruiter/dashboard"
                    element={
                        <ProtectedRoute role="recruiter">
                            <RecruiterDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/recruiter"
                    element={
                        <ProtectedRoute role="recruiter">
                            <RecruiterDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/candidate/applications"
                    element={
                        <ProtectedRoute role="candidate">
                            <MyApplications />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/recruiter/jobs/create"
                    element={
                        <ProtectedRoute role="recruiter">
                            <CreateJob />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;