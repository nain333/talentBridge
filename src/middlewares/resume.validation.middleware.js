import JobModel from "../models/job.model.js";
import uploadResume from "./file.upload.middleware.js";

const handleResumeUpload = (req, res, next) => {
  uploadResume.single("resume")(req, res, (err) => {

    if (err) {
      const job = JobModel.findById(req.params.id);

      return res.status(400).render("jobs/apply", {
        job,
        errors: [
          {
            msg: err.message,
          },
        ],
      });
    }

    next();
  });
};

export default handleResumeUpload;