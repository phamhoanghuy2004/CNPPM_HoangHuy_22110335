import bcrypt from "bcryptjs";
import db from "../models/index";

// Kiểu dữ liệu User input (từ form / API)
interface IUserInput {
  id?: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber?: string;
  gender: string | boolean;
  roleId: string;
}

const salt = bcrypt.genSaltSync(10); // tạo salt để hash password

// 🔑 Hash mật khẩu
const hashUserPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, salt);
};

// 🔑 Tạo user mới
const createNewUser = async (data: IUserInput): Promise<string> => {
  try {
    const hashPasswordFromBcrypt = await hashUserPassword(data.password);

    await db.User.create({
      email: data.email,
      password: hashPasswordFromBcrypt,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      phoneNumber: data.phoneNumber,
      gender: data.gender === "1" ? true : false,
      roleId: data.roleId,
    });

    return "✅ Create a new user successful";
  } catch (e) {
    throw e;
  }
};

// 🔑 Lấy tất cả user
const getAllUser = async () => {
  try {
    const users = await db.User.findAll({ raw: true });
    return users;
  } catch (e) {
    throw e;
  }
};

// 🔑 Lấy user theo ID
const getUserInfoById = async (userId: number) => {
  try {
    const user = await db.User.findOne({
      where: { id: userId },
      raw: true,
    });
    return user ?? null;
  } catch (e) {
    throw e;
  }
};

// 🔑 Update user
const updateUser = async (data: IUserInput) => {
  try {
    const user = await db.User.findOne({ where: { id: data.id } });
    if (user) {
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.address = data.address;
      await user.save();

      const allUsers = await db.User.findAll({ raw: true });
      return allUsers;
    }
    return null;
  } catch (e) {
    throw e;
  }
};

// 🔑 Xóa user
const deleteUserById = async (userId: number) => {
  try {
    const user = await db.User.findOne({ where: { id: userId } });
    if (user) {
      await user.destroy();
    }
    return true;
  } catch (e) {
    throw e;
  }
};

export default {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUser,
  deleteUserById,
};
