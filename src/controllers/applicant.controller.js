import JobModel from "../models/job.model.js";
import ApplicantModel from "../models/applicant.model.js";

class ApplicantController {
  renderApplyForm(req, res) {
    const job = JobModel.findById(req.params.id);

    if (!job) {
      return res.status(404).render("404");
    }

    res.render("jobs/apply", {
      job,
      errors: [],
    });
  }

  applyForJob(req, res) {
    const job = JobModel.findById(req.params.id);

    if (!job) {
      return res.status(404).render("404");
    }

    if (!req.file) {
      return res.render("jobs/apply", {
        job,
        errors: [
          {
            msg: "Please upload a PDF, DOC or DOCX resume.",
          },
        ],
      });
    }

    const applicant = ApplicantModel.create({
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      resumePath: req.file.filename,
    });

    job.applicants.push(applicant);
    req.session.successMessage =
      "Application submitted successfully.";

    res.redirect(`/jobs/${job.id}`);
  }
  viewApplicants(req, res) {
    const job = JobModel.findById(req.params.id);

    if (!job) {
      return res.status(404).render("404");
    }

    res.render("jobs/applicants", {
      job,
      applicants: job.applicants,
    });
  }
}

export default new ApplicantController();
