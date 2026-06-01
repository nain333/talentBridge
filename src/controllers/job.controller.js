import JobModel from "../models/job.model.js";

class JobController {
  renderJobs(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = 3;

    const jobs = JobModel.getPaginated(page, limit);

    const totalPages = JobModel.getTotalPages(limit);

    res.render("jobs/list", {
      jobs,
      page,
      totalPages,
      keyword:""
    });
  }

  renderNewJob(req, res) {
    res.render("jobs/new");
  }

  createJob(req, res) {
    const jobData = {
      ...req.body,
      recruiterId: req.session.recruiterId,
    };

    JobModel.create(jobData);

    res.redirect("/jobs");
  }

  renderJobDetails(req, res) {
    const job = JobModel.findById(req.params.id);

    if (!job) {
      return res.status(404).render("404");
    }

    res.render("jobs/details", { job });
  }

  renderEditJob(req, res) {
    const job = JobModel.findById(req.params.id);

    if (!job) {
      return res.status(404).render("404");
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
  searchJobs(req, res) {
    const keyword = req.query.keyword?.trim().toLowerCase() || "";
    const page = parseInt(req.query.page) || 1;
    const limit = 3;

    const filteredJobs = JobModel.getAll().filter((job) => {
      const skills = Array.isArray(job.skillsrequired)
        ? job.skillsrequired.join(" ").toLowerCase()
        : (job.skillsrequired || "").toLowerCase();

      return (
        job.jobdesignation.toLowerCase().includes(keyword) ||
        job.companyname.toLowerCase().includes(keyword) ||
        job.jobcategory.toLowerCase().includes(keyword) ||
        job.joblocation.toLowerCase().includes(keyword) ||
        skills.includes(keyword)
      );
    });
    const totalPages = Math.ceil(filteredJobs.length / limit);

    const jobs = filteredJobs.slice((page - 1) * limit, page * limit);

    res.render("jobs/list", {
      jobs,
      page,
      totalPages,
      keyword
    });
  }
}

export default new JobController();
