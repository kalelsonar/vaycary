// For sequelize functions
import sequelize from '../../../sequelize';
import {
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';
import { ThreadItems } from '../../../models';
import { InquiryType } from '../../../types/ThreadItemsType';

const getAllInquiryAdmin = {

  type: InquiryType,

  args: {
    currentPage: { type: IntType },
    searchList: { type: StringType },
  },

  async resolve({ request }, { currentPage, searchList }) {
    if (request.user.admin) {
      const limit = 10;
      let type = 'inquiry';
      let where = {
        type,
        status: {
          $or: [
            {
              $in: ['inquiry', 'preApproved']
            },
            {
              $eq: null
            }
          ]
        },
      };
      let inquiryData, count;
      let offset = 0;

      if (currentPage) {
        offset = (currentPage - 1) * limit;
      }

      if (searchList) {
        where = {
          $or: [
            {
              id: {
                $like: '%' + searchList + '%'
              }
            },
            {
              status: {
                $like: '%' + searchList + '%'
              }
            },
            {
              threadId: {
                $or: [
                  {
                    $in: [
                      sequelize.literal(`SELECT id from Threads where listId = (SELECT id from Listing where title like "%${searchList}%")`)
                    ]
                  },
                  {
                    $in: [
                      sequelize.literal(`SELECT id from Threads where host = (SELECT id from User where email like "%${searchList}%") or guest = (SELECT id from User where email like "%${searchList}%")`)
                    ]
                  }
                ]
              }
            },
          ],
          type
        }

      }

      inquiryData = await ThreadItems.findAll({
        attributes: [
          'id', 'threadId', 'startDate', 'endDate', 'type', [sequelize.literal('TIMESTAMPDIFF(HOUR, createdAt, NOW())'), 'timeDiff']
        ],
        where,
        limit,
        order: [['createdAt', 'DESC']],
        offset,
        having: {
          timeDiff: { lt: 24 }
        },
        raw: true
      });
      count = await ThreadItems.findAll({
        attributes: [
          'id', 'threadId', 'startDate', 'endDate', 'type', [sequelize.literal('TIMESTAMPDIFF(HOUR, createdAt, NOW())'), 'timeDiff']
        ],
        where,
        order: [['createdAt', 'DESC']],
        having: {
          timeDiff: { lt: 24 }
        },
        raw: true
      });

      count = count && count.length;

      if (inquiryData) {
        return {
          inquiryData,
          count
        }
      }

    } else {
      return {
        status: 'Not loggedin'
      };
    }
  }
};

export default getAllInquiryAdmin;