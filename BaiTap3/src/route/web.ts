import express, { Application, Request, Response } from "express";
import homeController from "../controllers/homeController";

const router = express.Router();

const initWebRoutes = (app: Application): void => {
  // cách 1: viết trực tiếp
  router.get("/", (req: Request, res: Response) => {
    return res.send("Phạm Hoàng Huy");
  });

  // cách 2: gọi hàm trong controller
  router.get("/home", homeController.getHomePage);        // url cho trang chủ
  router.get("/about", homeController.getAboutPage);      // url cho trang about
  router.get("/crud", homeController.getCRUD);            // url get crud
  router.post("/post-crud", homeController.postCRUD);     // url post crud
  router.get("/get-crud", homeController.getFindAllCrud); // url lấy findAll
  router.get("/edit-crud", homeController.getEditCRUD);   // url get editcrud
  router.post("/put-crud", homeController.putCRUD);       // url put crud
  router.get("/delete-crud", homeController.deleteCRUD);  // url get delete crud

  // gắn router vào app
  app.use("/", router);
};

export default initWebRoutes;
