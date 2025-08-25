import { Sequelize } from "sequelize";
import path from "path";
import fs from "fs";
import process from "process";
import { initUserModel, User } from "./user";

// Lấy môi trường (development, production, test)
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

// Tạo instance Sequelize
let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable] as string, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Khởi tạo db object để gom tất cả models
const db: {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  User: typeof User;
  [key: string]: any;
} = {
  sequelize,
  Sequelize,
  User: initUserModel(sequelize),
};

// Nếu có nhiều model khác (VD: Post, Comment...) thì import & init thêm ở đây
// const Post = initPostModel(sequelize);
// db.Post = Post;

// Khởi tạo associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName]?.associate) {
    db[modelName].associate(db);
  }
});

export default db;
