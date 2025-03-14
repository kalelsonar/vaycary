import DataType from 'sequelize';
import Model from '../sequelize';
import bcrypt from 'bcrypt';
import { NULL } from 'graphql/language/kinds';
const User = Model.define('User', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },
  email: {
    type: DataType.STRING(255),
    validate: {
      is: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i
    },
    allowNull: false,
  },
  password: {
    type: DataType.STRING,
    allowNull: false,
  },
  emailConfirmed: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },
  type: {
    type: DataType.STRING,
  },
  userBanStatus: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },
  userDeletedAt: {
    type: DataType.DATE,
  }
},
  {
    indexes: [
      { fields: ['email'] },
    ],
  });
User['generateHash'] = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

export default User;
