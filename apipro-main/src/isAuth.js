require("dotenv").config();

const isAuth = (req, res, next) => {
  const apiKey = req.headers.apikey;
  const username = req.headers.username;

  if (!apiKey) {
    return res.status(401).json({
      status_code: 401,
      error: {
        code: "ec_auth-01",
        message:
          "Maaf, kamu butuh [apikey] untuk melakukan request API 🤢. Baca panduan lengkap disini https://docs.deaafrizal.com",
      },
    });
  }
  if (!username) {
    return res.status(401).json({
      status_code: 401,
      error: {
        code: "ec_auth-02",
        message:
          "Maaf, kamu butuh [username] untuk melakukan request API 🤢. Baca panduan lengkap disini https://docs.deaafrizal.com",
      },
    });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({
      status_code: 403,
      error: {
        code: "ec_auth-03",
        message:
          "Maaf, [apikey] kamu salah. Silahkan request 🤢. Baca panduan lengkap disini https://docs.deaafrizal.com",
      },
    });
  }
  return next();
};

module.exports = isAuth;
