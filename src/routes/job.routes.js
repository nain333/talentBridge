import { Router } from "express";
import jobController from "../controllers/job.controller.js";

import applicantController from "../controllers/applicant.controller.js";
import handleResumeUpload from "../middlewares/resume.validation.middleware.js";
const router = Router();

router.get("/jobs", jobController.renderJobs);

router.get("/jobs/new", jobController.renderNewJob);

router.post("/jobs", jobController.createJob);
router.get("/jobs/search", jobController.searchJobs);

router.get("/jobs/:id", jobController.renderJobDetails);

router.get("/jobs/:id/edit", jobController.renderEditJob);

router.post("/jobs/:id/edit", jobController.updateJob);

router.post("/jobs/:id/delete", jobController.deleteJob);

router.get("/jobs/:id/apply", applicantController.renderApplyForm);

router.post("/apply/:id", handleResumeUpload, applicantController.applyForJob);
router.get("/jobs/:id/applicants", applicantController.viewApplicants);
export default router;
