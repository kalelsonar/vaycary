import {
  GraphQLInt as IntType
} from 'graphql';
import RecommendType from '../../../types/RecommendType';
import { Recommend, Listing } from '../../../models';
import showErrorMessage from '../../../../helpers/showErrorMessage';


const addRecommend = {

  type: RecommendType,

  args: {
    listId: { type: IntType }
  },

  async resolve({ request }, { listId }) {

    if (request.user && request.user.admin == true) {

      const list = await Listing.findOne({
        where: {
          id: listId,
          isPublished: true
        }
      });

      if (!list) {
        return {
          status: 400,
          errorMessage: showErrorMessage({ errorCode: 'isPublished' })
        }
      }

      const insertRecommend = await Recommend.create({
        listId
      });

      if (insertRecommend) {
        return {
          status: insertRecommend ? 200 : 400,
          errorMessage: insertRecommend ? null : showErrorMessage({ errorCode: 'commonError' })
        };
      }
    } else {
      return {
        status: 400,
        errorMessage: showErrorMessage({ errorCode: 'loginError' })
      }
    }
  },
};

export default addRecommend;
