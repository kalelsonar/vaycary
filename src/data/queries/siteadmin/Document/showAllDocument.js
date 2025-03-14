import sequelize from '../../../sequelize';
import {
  GraphQLString as StringType,
  GraphQLInt as IntType
} from 'graphql';
import { User } from '../../../../data/models';
import UserDocumentCommonType from '../../../types/siteadmin/UserDocumentListType';
import showErrorMessage from '../../../../helpers/showErrorMessage';

const showAllDocument = {
  type: UserDocumentCommonType,
  args: {
    currentPage: { type: IntType },
    searchList: { type: StringType },
  },
  async resolve({ request, response }, { currentPage, searchList }) {
    try {

      if (!request.user) {
        return {
          status: 500,
          errorMessage: showErrorMessage({ errorCode: 'loginError' })
        }
      }

      const limit = 10;
      let offset = 0, searchFilter = {}, documentFilter = {
        id: {
          $in: [
            sequelize.literal(`SELECT distinct userId FROM DocumentVerification `)
          ]
        }
      };
      // Offset from Current Page
      if (currentPage) {
        offset = (currentPage - 1) * limit;
      }

      if (searchList) {
        searchFilter = {
          id: {
            $or: [{
              $in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${searchList}%'`)]
            }, {
              $in: [sequelize.literal(`SELECT id FROM User WHERE email like '%${searchList}%'`)]
            }, {
              $in: [sequelize.literal(`SELECT userId FROM UserProfile WHERE profileId like '%${searchList}%'`)]
            },]
          }
        }
      }


      // Get All User Profile Data
      const count = await User.findAll({
        attributes: ['id', 'email'],
        where: {
          $and: [
            documentFilter,
            searchFilter
          ]
        }
      });

      // Get All User Profile Data
      const results = await User.findAll({
        attributes: ['id', 'email'],
        where: {
          $and: [
            documentFilter,
            searchFilter
          ]
        },
        limit,
        offset,
      });

      return {
        results,
        count: count ? count.length : 0
      }

    } catch (error) {
      return await {
        status: 400,
        errorMessage: showErrorMessage({ errorCode: 'catchError', error: error.message })
      };
    }
  },
};

export default showAllDocument;