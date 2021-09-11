function responseSuccess(res, message) {
  res.status(200).json({
    message: message,
  });
}

function responseError(res, code, message) {
  res.status(code).json({
    message: message,
  });
}

module.exports = { responseSuccess, responseError };
