import { Router } from "express";
import { FORBIDDEN, INTERNAL_SERVER_ERROR, OK, SUCCESS, warn } from "../utils";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const files = (req as any).files;

    if (!files || Object.keys(files).length === 0) {
      return next(warn(res, 400, `No files has been uploaded!`));
    }

    const storagePath = "/public/uploads";
    return res.status(OK).send({
      ...SUCCESS,
      message: `all files has been successfully uploaded`,
      files,
    });
  } catch (error) {
    next(warn(res, FORBIDDEN, error));
  }

  next();
});

export default router;
