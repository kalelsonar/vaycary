import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import bcrypt from 'bcrypt';
import { User } from '../../data/models';
import userLoginType from '../types/userLoginType';
import { decode } from '../../helpers/queryEncryption';
import { setCookies } from '../../helpers/setCookies';

const userLogin = {
  type: userLoginType,
  args: {
    email: { type: new NonNull(StringType) },
    password: { type: new NonNull(StringType) },
  },
  async resolve({ request, response }, { email, password }) {

    try {

      if (!request?.user) {
        const userLogin = await User.findOne({
          attributes: ['id', 'email', 'password', 'userBanStatus', 'userDeletedAt'],
          where: {
            email: email,
            userDeletedAt: null
          },
        });

        password = decode(password);

        if (userLogin) {
          if (bcrypt.compareSync(password, userLogin?.password)) {
            if (userLogin.userBanStatus == 1) {
              return {
                status: "userbanned",
              };
            } else if (userLogin.userDeletedAt != null) {
              return {
                status: "userDeleted",
              };
            } else {
              await setCookies({ userLogin, response })
              return {
                status: "success",
              };
            }
          } else {
            return {
              status: "password",
            };
          }
        } else {
          return {
            status: "email",
          };
        }
      } else {
        if (request?.user?.admin == true) {
          return {
            status: "adminLoggedIn",
          };
        } else {
          return {
            status: "loggedIn",
          };
        }
      }
    } catch (error) {
      return {
        status: 'loggedIn'
      };
    }
  },
};

export default userLogin;