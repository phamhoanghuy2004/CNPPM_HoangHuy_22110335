import { Request, Response, RequestHandler } from "express";
import db from "../models/index"; // import database
import CRUDservice from "../services/CRUDService"; // import service

// Hàm getHomePage
const getHomePage: RequestHandler = async (req: Request, res: Response) => {
  try {
    let data = await CRUDservice.getAllUser();
    console.log(".................");
    console.log(data);
    console.log(".................");
    res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Lỗi server!");
  }
};

// Hàm getAbout
const getAboutPage: RequestHandler = (req: Request, res: Response) => {
  res.render("test/about.ejs");
};

// Hàm CRUD
const getCRUD: RequestHandler = (req: Request, res: Response) => {
  res.render("crud.ejs");
};

// Hàm findAll CRUD
const getFindAllCrud: RequestHandler = async (req: Request, res: Response) => {
  let data = await CRUDservice.getAllUser();
  res.render("users/findAllUser.ejs", {
    datalist: data,
  });
};

// Hàm post CRUD
const postCRUD: RequestHandler = async (req: Request, res: Response) => {
  let message = await CRUDservice.createNewUser(req.body);
  console.log(message);
  res.send("Post crud to server");
};

// Hàm lấy dữ liệu để edit
const getEditCRUD: RequestHandler = async (req: Request, res: Response) => {
  const userId = Number(req.query.id); // convert sang number

  if (!isNaN(userId) && userId > 0) {
    let userData = await CRUDservice.getUserInfoById(userId);
    res.render("users/editUser.ejs", {
      data: userData,
    });
  } else {
    res.send("Không lấy được id");
  }
};

// Hàm update
const putCRUD: RequestHandler = async (req: Request, res: Response) => {
  let data = req.body;
  let data1 = await CRUDservice.updateUser(data);
  res.render("users/findAllUser.ejs", {
    datalist: data1,
  });
};

// Hàm delete
const deleteCRUD: RequestHandler = async (req: Request, res: Response) => {
  const id = Number(req.query.id);

  if (!isNaN(id) && id > 0) {
    await CRUDservice.deleteUserById(id);
    res.send("Deleted!!!!!!!!!!!!!");
  } else {
    res.send("Not find user");
  }
};

// Export ra object
export default {
  getHomePage,
  getAboutPage,
  getCRUD,
  postCRUD,
  getFindAllCrud,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
};
