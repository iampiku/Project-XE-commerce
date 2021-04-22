import { Router } from "express";
import {
  FileUploadInterface,
  FORBIDDEN,
  handleMultipleFilesUploadMiddleWare,
  handleMutipleFilesUpload,
  handleSingleFileUpload,
  handleSingleFileUploadMiddleWare,
  INTERNAL_SERVER_ERROR,
  Next,
  OK,
  RequestInterface,
  requiresAuth,
  ResponseInterface,
  SUCCESS,
  warn
} from "../../utils";

const router = Router();

// [POST] Generic FileUpload Function
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
        return await handleSingleFileUpload(files as FileUploadInterface);
      }

      // Looping through various
      // fileIterators and storing them - Multiple FileUploads
      await handleMutipleFilesUpload(files as FileUploadInterface[]);

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

// [POST] User Avatar Upload Service
router.post(
  "/user-avatar",
  requiresAuth,
  handleSingleFileUploadMiddleWare,
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      const avatarPath = (req as any).avatarPath;
      return res.status(OK).send({
        ...SUCCESS,
        avatarPath,
        message: "user profile picture uploaded successfully!",
      });
    } catch (error) {
      warn(res, FORBIDDEN, error || "You are not authroized");
    }
  }
);

router.post(
  "/:productId/product-images",
  handleMultipleFilesUploadMiddleWare,
  async (req: RequestInterface, res: ResponseInterface, next: Next) => {
    try {
      const uploadImages = (req as any).uploadImages;

      return res.status(OK).send({
        ...SUCCESS,
        uploadImages,
        message: "all images has been uploaded!",
      });
    } catch (error) {
      return warn(res, INTERNAL_SERVER_ERROR, error);
    }
  }
);

export default router;
