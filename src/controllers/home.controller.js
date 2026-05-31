class HomeController {
  renderHome(req, res) {
    res.render("home/index", {
      title: "TalentBridge",
      styles:'<link rel="stylesheet" href="/css/home.css">'
    });
  }
}

export default new HomeController();