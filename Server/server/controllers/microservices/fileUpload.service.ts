import { Router } from "express";
import {
  FileUploadInterface,
  FORBIDDEN,
  handleMutipleFilesUpload,
  handleSingleFileUpload,
  Next,
  OK,
  RequestInterface,
  ResponseInterface,
  SUCCESS,
  warn
} from "../../utils";

const router = Router();

router.post(
  "/",
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      const files: FileUploadInterface | FileUploadInterface[] = (req as any)
        .files.files;

      if (!files || Object.keys(files).length === 0) {
        return next(warn(res, 400, `No files has been uploaded!`));
      }

      // For single File Upload
      if ((files as any).length === undefined) {
        return await handleSingleFileUpload(files, res);
      }

      // Looping through various fileIterators and storing them - Multiple FileUploads
      await handleMutipleFilesUpload(files);

      return res.status(OK).send({
        ...SUCCESS,
        message: `Files has been successfully uploaded!`,
      });
    } catch (error) {
      next(warn(res, FORBIDDEN, "No file has been uploaded!"));
    }

    next();
  }
);

export default router;
