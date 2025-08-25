import { Model, DataTypes, Optional, Sequelize } from "sequelize";

// Định nghĩa kiểu cho User attributes
interface UserAttributes {
  id: number;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  phoneNumber?: string;
  gender?: boolean;
  image?: string;
  roleId?: string;
  positionId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Khi tạo mới user, id sẽ autoIncrement, createdAt & updatedAt auto set → không bắt buộc
type UserCreationAttributes = Optional<UserAttributes, "id" | "createdAt" | "updatedAt">;

export class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public firstName?: string;
  public lastName?: string;
  public address?: string;
  public phoneNumber?: string;
  public gender?: boolean;
  public image?: string;
  public roleId?: string;
  public positionId?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    // Định nghĩa quan hệ ở đây, ví dụ:
    // this.hasMany(models.Post, { foreignKey: "userId" });
  }
}

// Hàm init model
export function initUserModel(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      image: DataTypes.STRING,
      roleId: DataTypes.STRING,
      positionId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users", // khớp với migration
    }
  );
  return User;
}
