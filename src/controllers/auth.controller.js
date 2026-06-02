import RecruiterModel from "../models/recruiter.model.js";

class AuthController {
  renderRegister(req, res) {
    if (req.session.recruiterId) {
      return res.redirect("/jobs");
    }
    res.render("auth/register", {
      error: null,
      errors: [],
    });
  }

  renderLogin(req, res) {
    if (req.session.recruiterId) {
      return res.redirect("/jobs");
    }
    res.render("auth/signIn", {
      error: null,
      errors: [],
    });
  }

  postRegister(req, res) {
    const { name, email, password } = req.body;

    const existingRecruiter = RecruiterModel.findByEmail(email);

    if (existingRecruiter) {
      return res.render("auth/register", {
        error:null,
        errors: [
          {
            msg: "Email already registered",
          },
        ],
      });
    }

    RecruiterModel.create({
      name,
      email,
      password,
    });

    res.redirect("/login");
  }

  postSignIn(req, res) {
    const { email, password } = req.body;

    const recruiter = RecruiterModel.findByEmail(email);

    if (!recruiter || recruiter.password !== password) {
      return res.render("auth/signIn", {
        error: "Invalid credentials",
        errors: null,
      });
    }

    req.session.recruiterId = recruiter.id;

    res.redirect("/jobs");
  }

  logout(req, res) {
    req.session.destroy(() => {
      res.redirect("/login");
    });
  }
}

export default new AuthController();
