import {
  GraphQLInt as IntType
} from 'graphql';
import { PopularLocation } from '../../models';
import PopularLocationCommonType from '../../types/siteadmin/PopularLocationCommonType';

const getPopularLocation = {

  type: PopularLocationCommonType,

  args: {
    currentPage: { type: IntType }
  },

  async resolve({ request }, { currentPage }) {
    try {
      let limit = 10, offset = 0;

      if (currentPage) offset = (currentPage - 1) * limit;

      const results = await PopularLocation.findAll({
        limit,
        offset,
        order: [['id', 'DESC']]
      });
      const count = await PopularLocation.count();
      return {
        results,
        count,
        status: 200
      }
    } catch (error) {
      return {
        status: 400
      }
    }
  }
};

export default getPopularLocation;

/**

query getPopularLocation {
  getPopularLocation{
    id
    location
    locationAddress
    image
    isEnable
    createdAt
    updatedAt
  }
}

**/