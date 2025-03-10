import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import bcrypt from 'bcrypt';
import { AdminUser } from '../../../data/models';
import AdminUserLoginType from '../../types/siteadmin/AdminUserLoginType';
import { decode } from '../../../helpers/queryEncryption';
import { setCookies } from '../../../helpers/setCookies';

const adminUserLogin = {

  type: AdminUserLoginType,

  args: {
    email: { type: new NonNull(StringType) },
    password: { type: new NonNull(StringType) },
  },

  async resolve({ request, response }, {
    email,
    password,
  }) {
    try {
      if (!request?.user) {
        const userLogin = await AdminUser.findOne({
          attributes: ['id', 'email', 'password', 'isSuperAdmin'],
          where: { email },
          raw: true
        });

        password = await decode(password);

        if (userLogin) {
          if (bcrypt.compareSync(password, userLogin?.password)) {
            await setCookies({ userLogin, response, admin: true });
            return {
              id: userLogin?.id,
              isSuperAdmin: userLogin?.isSuperAdmin,
              status: "success",
            };
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
          const checkSuperAdmin = await AdminUser.findOne({
            attributes: ['id', 'isSuperAdmin'],
            where: { id: request?.user?.id },
            raw: true
          });

          return {
            id: checkSuperAdmin?.id,
            isSuperAdmin: checkSuperAdmin?.isSuperAdmin,
            status: "loggedIn",
          };
        } else {
          return {
            status: "userLoggedIn",
          };
        }
      }
    } catch (error) {
      return {
        status: "userLoggedIn",
      };
    }
  },
};

export default adminUserLogin;
