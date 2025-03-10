import {
  GraphQLInt as IntType
} from 'graphql';
import RecommendType from '../../../types/RecommendType';
import { Recommend } from '../../../models';
import showErrorMessage from '../../../../helpers/showErrorMessage';


const removeRecommend = {

  type: RecommendType,

  args: {
    listId: { type: IntType }
  },

  async resolve({ request }, { listId }) {

    if (request.user && request.user.admin == true) {

      const deleteRecommend = await Recommend.destroy({
        where: {
          listId
        }
      });

      return {
        status: deleteRecommend ? 200 : 400,
        errorMessage: deleteRecommend ? null : showErrorMessage({ errorCode: 'commonError' }),
        listId: deleteRecommend ? listId : null,

      }
    } else {
      return {
        status: 400,
        errorMessage: showErrorMessage({ errorCode: 'loginError' })
      }
    }
  },
};

export default removeRecommend;
