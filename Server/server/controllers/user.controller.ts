import { Router } from "express";
import { User } from "../../database/schema";
import { OK, SignupInterface, uuid, warn } from "../utils";

const router = Router();

// [GET] All Users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.status(OK).send({
      status: "success",
      statusCode: 200,
      users,
    });
  } catch (error) {
    // warn(res, error);
  }
  next();
});

// [POST] Create User
router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password, username } = req.body as SignupInterface;
    console.log(req.body);

    const payload = {
      name,
      email,
      uuid: uuid(),
      username,
      password,
    };

    const resp = await User.create(payload);

    return res.status(OK).send(resp);
  } catch (error) {
    warn(res, error);
  }
  next();
});

export default router;
