import { Router } from "express";
import jobController from "../controllers/job.controller.js";

import applicantController from "../controllers/applicant.controller.js";
import handleResumeUpload from "../middlewares/resume.validation.middleware.js";
import authorizeJobOwner from "../middlewares/job.authorizattion.middleware.js";
import sendApplicationEmail from "../middlewares/send.application.email.middleware.js";
const router = Router();

router.get("/jobs", jobController.renderJobs);

router.get("/jobs/new", jobController.renderNewJob);

router.post("/jobs", jobController.createJob);
router.get("/jobs/search", jobController.searchJobs);

router.get("/jobs/:id", jobController.renderJobDetails);

router.get("/jobs/:id/edit", authorizeJobOwner, jobController.renderEditJob);

router.post("/jobs/:id/edit", authorizeJobOwner, jobController.updateJob);

router.post("/jobs/:id/delete", authorizeJobOwner, jobController.deleteJob);

router.get("/jobs/:id/apply", applicantController.renderApplyForm);

router.post("/apply/:id", handleResumeUpload,sendApplicationEmail, applicantController.applyForJob);
router.get(
  "/jobs/:id/applicants",
  authorizeJobOwner,
  applicantController.viewApplicants,
);
export default router;
