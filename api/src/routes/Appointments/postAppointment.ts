import { Router } from "express";

import Appointment from "../../models/appointments";
import { verifyToken } from "../../middlewares/auth";

const router = Router();

router.post("/create", async (req, res) => {
  let { user, date, block, barber, office, service } = req.body;
  console.log(req.body);
  block = parseInt(block);
  let todayDate = new Date();
  let todayDateString: string = todayDate.toISOString().split("T")[0];

  let todayDateString_year: string = todayDateString.split("-")[0];
  let todayDateString_month: string = todayDateString.split("-")[1];
  let todayDateString_day: string = todayDateString.split("-")[2];

  //check date
  if (todayDateString_year > date.split("-")[0])
    res
      .status(500)
      .send({ error: `Year cannot be less than ${todayDateString_year}` });
  else if (
    todayDateString_year === date.split("-")[0] &&
    todayDateString_month > date.split("-")[1]
  )
    res
      .status(500)
      .send({ error: `Month cannot be less than ${todayDateString_month}` });
  else if (
    todayDateString_year === date.split("-")[0] &&
    todayDateString_month === date.split("-")[1] &&
    todayDateString_day > date.split("-")[2]
  )
    res
      .status(500)
      .send({ error: `Day cannot be less than ${todayDateString_day}` });
  //check block
  else if (block <= 0 || block >= 9)
    res
      .status(500)
      .send({ error: "schedule block must be a number between 1 and 8" });
  //check apmnt availability
  else {
    try {
      let block_str: string;
      switch (block) {
        case 1:
          block_str = "8:00hs";
          break;
        case 2:
          block_str = "9:00hs";
          break;
        case 3:
          block_str = "10:00hs";
          break;
        case 4:
          block_str = "11:00hs";
          break;
        case 5:
          block_str = "14:00hs";
          break;
        case 6:
          block_str = "15:00hs";
          break;
        case 7:
          block_str = "16:00hs";
          break;
        case 8:
          block_str = "17:00hs";
          break;
      }
      const apmt = new Appointment({
        user: user,
        date: date,
        block: block_str,
        barber: barber,
        office: office,
        service: service,
      });
      const existingApmnt = await Appointment.findOne({
        date: date,
        block: block_str,
        barber: barber,
        office: office,
      });
      if (existingApmnt === null) {
        apmt.save().then((savedApmt) => res.status(200).send(savedApmt));
      } else res.status(500).json({ info: "appointment already taken!" });
    } catch (error) {
      res.status(500).send(error);
    }
  }
});

export default router;
