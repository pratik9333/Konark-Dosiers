var schedule = require("node-schedule");
const Recharge = require("../models/recharge");
const User = require("../models/user");
const { sendMail } = require("../utils/nodemailer");
let moment = require("moment");

let expiryDate;

const packRemainder = async (user) => {
  try {
    expiryDate = user.activePack.expiresAt.split("-").map(function (item) {
      return parseInt(item, 10);
    });

    const rechargePack = await Recharge.findById(user.activePack.recharge);
    let remainderDate = new Date(
      expiryDate[0],
      expiryDate[1] - 1,
      expiryDate[2],
      20,
      11,
      0
    );
    remainderDate.setDate(remainderDate.getDate() - 1);

    const j = schedule.scheduleJob(remainderDate, function () {
      const subject = `Recharge pack remiander`;
      const mailBody = `<h4>Hello ${user.firstname} ${user.lastname}, your recharge pack <b>${rechargePack.packname}</b> is going to be expire tomorrow. You can recharge your account through our website with amazing recharge offers available!<h4> <br />

    <p>Thanks and regards,<br />
    Konark Dossiers</p>`;
      sendMail(user.email, mailBody, subject);
    });
    console.log(j);
    await expirePack(user, rechargePack, expiryDate);
  } catch (error) {
    console.log(error);
  }
};

const expirePack = async (user) => {
  let date = new Date(
    expiryDate[0],
    expiryDate[1] - 1,
    expiryDate[2],
    20,
    12,
    00
  );

  const j = schedule.scheduleJob(date, async () => {
    user.activePack.expiresAt = null;
    console.log(21);
    await user.save();
  });

  console.log(j);
};

exports.scheduleAgainDueToServerDown = async () => {
  const users = await User.find();

  for (let user of users) {
    if (
      user.newUser === false &&
      user.activePack.expiresAt !== null &&
      user.role == "user"
    ) {
      let currentDate = new Date(Date.now());
      currentDate = moment(currentDate).format("YYYY-MM-DD");
      if (moment(user.activePack.expiresAt).isAfter(currentDate)) {
        await packRemainder(user);
      }
    }
  }
};
