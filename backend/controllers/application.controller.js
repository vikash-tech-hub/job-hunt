import Application from "../models/application.model.js";
import Job from "../models/job.model.js";

// Apply for a job
export const applyJob = async (req, res) => {
    try {
        const userId = req.id; // from auth middleware
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({ message: "Job ID is required.", success: false });
        }

        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this job", success: false });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false });
        }

        const newApplication = await Application.create({ job: jobId, applicant: userId });
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({ message: "Job applied successfully.", success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

// Get all jobs applied by user
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const applications = await Application.find({ applicant: userId }).populate("job");
        return res.status(200).json({ success: true, applications });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

// Get all applicants for a specific job
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const applications = await Application.find({ job: jobId }).populate("applicant");
        return res.status(200).json({ success: true, applications });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

// Update application status
export const updateStatus = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const { status } = req.body;

        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: "Application not found", success: false });
        }

        application.status = status;
        await application.save();

        return res.status(200).json({ message: "Status updated successfully", success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};
