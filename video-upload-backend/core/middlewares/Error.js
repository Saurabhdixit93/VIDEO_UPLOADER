export const notFound = (req, res, next) => {
  res.status(404);
  res.json({
    code: 404,
    error: "Not Found",
    message: `The requested URL ${req.originalUrl} was not found on this server.`,
  });
};

export const error = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: err.name || "Internal Server Error",
    message: err.message || "An unexpected error occurred.",
  });
};
