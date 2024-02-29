// Controller for the home page
exports.homePage = (req, res) => {
  res.render('index', { title: "Jordan Rios's Blog Site" });
};
