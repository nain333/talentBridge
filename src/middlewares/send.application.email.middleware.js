import transporter from "../configs/mail.config.js";
import JobModel from "../models/job.model.js";

const sendApplicationEmail = async (
  req,
  res,
  next
) => {
  try {
    const job = JobModel.findById(req.params.id);

    if (!job) {
      return next();
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: "Application Received",
      html: `
        <h2>Application Submitted Successfully</h2>

        <p>Hello ${req.body.name},</p>

        <p>
          Your application for
          <strong>${job.jobdesignation}</strong>
          at
          <strong>${job.companyname}</strong>
          has been received.
        </p>

        <p>
          We will contact you if your profile
          matches the requirements.
        </p>

        <p>
          Thank you for using TalentBridge.
        </p>
      `,
    });

    next();
  } catch (error) {
    console.error(error);

    next();
  }
};

export default sendApplicationEmail;