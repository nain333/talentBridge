import JobModel from "../models/job.model.js";

export default function authorizeJobOwner(
  req,
  res,
  next
) {
  const job = JobModel.findById(req.params.id);

  if (!job) {
    return res.status(404).render("404");
  }

  if (job.recruiterId !== req.session.recruiterId) {
    return res.status(403).send("Access denied");
  }

  next();
}