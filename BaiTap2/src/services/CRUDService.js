import bcrypt from 'bcryptjs';
import db from '../models/index';
import { where } from 'sequelize';

const salt = bcrypt.genSaltSync(10); // tạo ra hash password

let createNewUser = async (data) => { // hàm tao user với tham số data được truyền vào
    return new Promise(async (resolve, reject) => { // dùng Promise để lấy kết quả, trong trường hợp bất đồng bộ
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);

            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId
            });

            resolve('CK create a new user successful');

            //console.log(data from service);
            //console.log(data) //log dữ liệu từ bên data
            //console.log(hashPasswordFromBcrypt);
        } catch (e) {
            reject(e)
        }
    })
}

let hashUserPassword = (password) => { // dùng Promise để lấy kết quả, trong trường hợp bất đồng bộ
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

//lấy tất cả findAll CRUD
let getAllUser = () => {
    return new Promise(async (resolve, reject) => { // dùng Promise để lấy kết quả, trong trường hợp bất đồng bộ
        try {
            let users = await db.User.findAll({
                raw: true, //hiển thị liệu gọc
            });
            resolve(users); //hàm trả về kết quả
        } catch (e) {
            reject(e);
        }
    })
}

//lấy findOne CRUD
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => { // dùng Promise để lấy kết quả, trong trường hợp bất đồng bộ
        try {
            let user = await db.User.findOne({
                where: { id: userId }, //query điều kiện cho than 5s
                raw: true
            });
            if(user){
                resolve(user); //hàm trả về kết quả
            }else{
                resolve([]); //hàm trả về kết quả rỗng
            }
        } catch (e) {
            reject(e)
        }
    })
}

//hàm put CRUD
let updateUser = (data) => {
    return new Promise(async (resolve, reject) => { // dùng Promise để lấy kết quả, trong trường hợp bất đồng bộ
        try {
            let user = await db.User.findOne({
            where: { id: data.id } //query điều kiện cho tham số
            });
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                //lấy danh sách user
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            }else{
                resolve(); //hàm trả về kết quả rỗng
            }
        } catch (e) {
            reject(e)
        }
    })
}

//hàm xóa user
let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => { // dùng Promise để lấy kết quả, trong trường hợp bất đồng bộ
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            });
            if(user){
                user.destroy();
            }
            resolve(); //là return
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = { //xuất hàm ra bên ngoài
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUser: updateUser,
    deleteUserById: deleteUserById
}