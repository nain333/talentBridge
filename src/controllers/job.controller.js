import JobModel from "../models/job.model.js";

class JobController {
  renderJobs(req, res) {
    const jobs = JobModel.getAll();

    res.render("jobs/list", { jobs });
  }

  renderNewJob(req, res) {
    res.render("jobs/new");
  }

  createJob(req, res) {
    JobModel.create(req.body);

    res.redirect("/jobs");
  }

  renderJobDetails(req, res) {
    const job = JobModel.findById(req.params.id);

    if (!job) {
      return res.status(404).send("Job not found");
    }

    res.render("jobs/details", { job });
  }

  renderEditJob(req, res) {
    const job = JobModel.findById(req.params.id);

    if (!job) {
      return res.status(404).send("Job not found");
    }

    res.render("jobs/edit", { job });
  }

  updateJob(req, res) {
    JobModel.update(req.params.id, req.body);

    res.redirect(`/jobs/${req.params.id}`);
  }

  deleteJob(req, res) {
    JobModel.delete(req.params.id);

    res.redirect("/jobs");
  }
}

export default new JobController();