const express = require("express");
const router = express.Router();
const db = require("../mysql/db");
router.post("/loadidcard", (req, res) => {
  const idData = req.body.idData;
  console.log(idData);
  //db.connect();
  db.query(
    `select * from savedform where datenow="${idData}";`,
    (err, data) => {
      if (err) {
        res.send({ data: "에러가 발생했습니다." });
        console.log(err);
      } else {
        console.log("조회 성공");
        res.send({ data: data });
        //db.end();
      }
    }
  );
});
router.post("/marriageform", (req, res) => {
  let requestedData = req.body[0];
  let requestedDateNow = req.body[1];
  let formData = {
    marriage_man: requestedData.marriage_man,
    marriage_woman: requestedData.marriage_woman,
    marriage_date: requestedData.marriage_date,
    message_invite: requestedData.message_invite,
    description_location: requestedData.description_location,
    phone_man: requestedData.phone_man,
    phone_woman: requestedData.phone_woman,
    man_account: requestedData.man_account,
    woman_account: requestedData.woman_account,
    datenow: requestedDateNow,
  };
  //db.connect();
  db.query(
    `INSERT INTO savedform (marriage_man, marriage_woman,marriage_date,message_invite,description_location, phone_man, phone_woman,man_account,woman_account,datenow) VALUES ('${formData.marriage_man}', '${formData.marriage_woman}','${formData.marriage_date}', '${formData.message_invite}','${formData.description_location}', '${formData.phone_man}', '${formData.phone_woman}', '${formData.man_account}','${formData.woman_account}','${formData.datenow}');`,
    (err, data) => {
      if (err) {
        res.send({ data: "에러가 발생했습니다." });
        console.log(err);
      } else {
        console.log("insert 성공");
        res.send({ data: formData.datenow });
        //db.end();
      }
    }
  );
});

module.exports = router;
