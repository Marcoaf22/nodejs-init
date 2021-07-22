const jwt = require("jsonwebtoken");
const { User } = require("../app/Models");

const generarJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

const getUser = async (uid) => {
  const user = await User.findById(uid);
  //   console.log(user);
  return user;
};

const sessionFinish = async (code) => {
  try {
    await Session.findOneAndUpdate(
      { code },
      { active: false, date_finish: Date.now() }
    );
  } catch (error) {
    console.log(error);
    return false;
  }
  //   console.log(user);
  return true;
};

module.exports = {
  generarJWT,
  getUser,
  sessionFinish,
};
