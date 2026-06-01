import { Router } from "express";
import jobController from "../controllers/job.controller.js";

const router = Router();

router.get("/jobs", jobController.renderJobs);

router.get("/jobs/new", jobController.renderNewJob);

router.post("/jobs", jobController.createJob);

router.get("/jobs/:id", jobController.renderJobDetails);

router.get("/jobs/:id/edit", jobController.renderEditJob);

router.post("/jobs/:id/edit", jobController.updateJob);

router.post("/jobs/:id/delete", jobController.deleteJob);

export default router;