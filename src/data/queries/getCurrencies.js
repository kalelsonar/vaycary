import {
  GraphQLString as StringType,
  GraphQLInt as IntType
} from 'graphql';
import { Currencies } from '../../data/models';
import CurrencyListType from '../types/CurrencyListType';

const getCurrencies = {

  type: CurrencyListType,

  args: {
    requestedFrom: { type: StringType },
    currentPage: { type: IntType }
  },

  async resolve({ request }, { requestedFrom, currentPage }) {

    try {

      let limit = 10, offset = 0, where, results, count;

      if (currentPage) offset = (currentPage - 1) * limit;

      if (requestedFrom != 'siteadmin') where = { isEnable: true };

      if (requestedFrom != 'siteadmin') {
        results = await Currencies.findAll({
          order: [
            ['isBaseCurrency', 'DESC'],
          ]
        });
      } else {
        results = await Currencies.findAll({
          where,
          limit,
          offset,
          order: [
            ['isBaseCurrency', 'DESC'],
            ['id', 'DESC']
          ]
        });
      }
      count = await Currencies.count({})

      return {
        results,
        count
      }

    } catch (error) {
      return {
        status: 400
      }
    }
  },
};

export default getCurrencies;