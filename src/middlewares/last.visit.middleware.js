const lastVisitMiddleware = (req, res, next) => {
  const lastVisit = req.cookies.lastVisit;

  res.locals.lastVisit = lastVisit || null;

  res.cookie(
    "lastVisit",
    new Date().toLocaleString(),
    {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    }
  );

  next();
};

export default lastVisitMiddleware;