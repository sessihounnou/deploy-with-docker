//const { default: next } = require('next/types')
const prisma = require("../prisma/index");
// const bcrypt = require("bcrypt");
const { cookieToken } = require("../utils/cookieToken");

exports.signup = async (req, res, next) => {
  const {
    bio,
    firstname,
    lastname,
    bornday,
    profilPicture,
    organizationsId,
    email,
    password,
  } = req.body;
  const birthday = new Date(bornday);
  var hashedPassword = bcrypt.hashSync(password);
  try {
    const profil = await prisma.user.create({
      data: {
        bio,
        firstname,
        lastname,
        bornday: birthday,
        email,
        password: hashedPassword,
        organizationsId: [0],
        // phoneNumber,
      },
    });
    res.status(200).json({
      data: profil,
      message: "user has been create successfully",
    });
    // const user = await prisma.user.create({
    //   data: {
    //     profileId: profil.id,
    //     activityId: [],
    //     organizationsId: [],
    //     email,
    //     password: hashedPassword,
    //   },
    // });
  } catch (error) {
    if (error.code === "P2002" && error.meta?.target === "User_email_key") {
      // Gérer l'erreur lorsque l'utilisateur avec cet e-mail existe déjà
      res.status(409).json({ message: "user already exist" });
    } else if (error) {
      res.status(500).json({ message: "An error occurred" });
    }
  }
  // const user = await prisma.user
  //   .create({
  //     data: {
  //       profileId,
  //       activityId,
  //       organizationsId,
  //       email,
  //       password: hashedPassword,
  //     },
  //   })
  //   .then((response) => {
  //     console.log(response);
  //     return res.status(200).send("User created successfully");
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     if (error.code === "P2002" && error.meta?.target === "User_email_key") {
  //       // Gérer l'erreur lorsque l'utilisateur avec cet e-mail existe déjà
  //       return res.status(409).send("user already exist");
  //     }
  //     res.status(500).send("An error occurred");
  //   });
};
exports.signin = async (req, res, next) => {
  const { name, email, password } = req.body;
  await prisma.user
    .findUnique({ where: { email } })
    .then((user) => {
      console.log(user);
      cookieToken(user, res);
    })
    .catch((error) => {
      console.log(error);
    });
};
