class HomeController {
  renderHome(req, res) {
    if (req.session.recruiterId) {
      return res.redirect("/jobs");
    }
    res.render("home/index", {
      title: "TalentBridge",
      styles:'<link rel="stylesheet" href="/css/home.css">'
    });
  }
}

export default new HomeController();