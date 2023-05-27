const { addMsg, getAllMsg } = require("../app/controllers/message.controller");

const router = require("express").Router();

router.post("/addmsg/", addMsg);
router.post("/getmsg/", getAllMsg);

module.exports = router;
