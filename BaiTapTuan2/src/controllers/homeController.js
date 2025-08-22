import db from "../models/index"; //import database
import CRUDservice from "../services/CRUDservice" //import service

//hàm getHomePage
let getHomePage = async (req, res) => {
    //return res.send('Phạm Hoàng Huy');
    try {
        let data = await CRUDservice.getAllUser(); //lấy dữ liệu từ models/index
        console.log(`.................`);
        console.log(data);
        console.log(`.................`);
        return res.render('homepage.ejs', {
            data: JSON.stringify(data) //trả dữ liệu data về view
        });
    } catch (e) {
        console.log(e);
    }
}

//hàm getAbout
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

//hàm CRUD
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

//hàm findAll CRUD
let getFindAllCrud = async (req, res) => {
    let data = await CRUDservice.getAllUser();
    // console.log(`........................`);
    // console.log(data);
    // console.log(`........................`);
    //return res.send('findAll crud to server');
    return res.render('users/findAllUser.ejs', {
        datalist: data
    }); //gọi view và truyền dữ liệu ra view
}

//hàm post CRUD
let postCRUD = async (req, res) => { //dùng async để xử lý bất đồng bộ
    let message = await CRUDservice.createNewUser(req.body); //gọi service
    //console.log(req.body); //lấy thông tin body của http request
    console.log(message);
    return res.send('Post crud to server');
}

//hàm lấy dữ liệu để edit
let getEditCRUD = async (req, res) => {
    let userId = req.query.id; //check id
    if(userId){
        let userData = await CRUDservice.getUserInfoById(userId);
        // console.log(`........................`);
        // console.log(userData);
        // console.log(`........................`);
        return res.render('users/editUser.ejs', {
            data: userData
        });
    }else{
        return res.send('không lấy được id');
    }
    // console.log(req.query.id);
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let data1 = await CRUDservice.updateUser(data); //update rồi hiện thị lại danh sách user
    //let data1 = await CRUDservice.getAlluser(); //hiện thị danh sách user
    return res.render('users/findAllUser.ejs', {
        datalist: data1
    });
    // return res.send('update thành công');
}

let deleteCRUD = async (req, res) => { //view ?id=1
    let id = req.query.id; //lấy trên view ?id=1
    if(id){
        await CRUDservice.deleteUserById(id);
        return res.send('Deleted!!!!!!!!!!!!!');
    }else{
        return res.send('Not find user');
    }
}

// object: {
//     key: '',
//     value: ''
// }

//export ra object
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    getFindAllCrud: getFindAllCrud,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}