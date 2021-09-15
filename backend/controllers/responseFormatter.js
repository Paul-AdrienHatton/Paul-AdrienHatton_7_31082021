class ResponseFormatter {
  static responseSuccess(res, message) {
    res.status(200).json({
      message: message,
    });
  }

  static responseError(res, code, message) {
    res.status(code).json({
      message: message,
    });
  }
}

module.exports = ResponseFormatter;