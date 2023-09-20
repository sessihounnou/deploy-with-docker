const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controllers/user.controller");
const {
  CommunityPost,
  GetAllCommunityPost,
  UpdateCommunityPost,
  DeleteOneCommunityPost,
} = require("../controllers/activity.controller");
const { authenticateToken } = require("../utils/cookieToken");
const {
  CreateNewCaptor,
  GetAllCaptor,
  GetOneCaptor,
  GetAllCaptorData,
  PutCaptorData,
  CreateCaptorData,
  GetLastCaptorData,
} = require("../controllers/iot.controller");

router.route("/signup").post(signup);
router.route("/signin").post(signin);
//Community CRUD
router.route("/feed").post(CommunityPost);
router.route("/feed").get(authenticateToken, GetAllCommunityPost);
router.route("/feed").put(UpdateCommunityPost);
router.route("/feed").delete(DeleteOneCommunityPost);
//CRUD Iot
router.route("/captor").get(GetAllCaptor);
router.route("/captor").post(CreateNewCaptor);
router.route("/captor/:id").get(GetOneCaptor);

/* Captor Data */
router.route("/captor-data").get(GetAllCaptorData);
router.route("/captor-data").put(PutCaptorData);
router.route("/captor-data").post(CreateCaptorData);
router.route("/captor-data-byi").post(GetLastCaptorData);

module.exports = router;
