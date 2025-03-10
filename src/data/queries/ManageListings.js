import {
  GraphQLList as List,
  GraphQLString as String
} from 'graphql';
import { Listing, ListSettings, UserListingSteps } from '../../data/models';
import sequelize from '../sequelize';
import ManageListingCommonType from '../types/ManageListingCommonType';

const ManageListings = {

  type: ManageListingCommonType,

  args: {
    searchKey: { type: String }
  },

  async resolve({ request }, { searchKey }) {

    if (request.user && request.user.admin != true) {

      let where = {
        userId: request.user.id,
      }, roomTypeFilter = [];

      if (searchKey) {
        where = {
          title: {
            $like: '%' + searchKey + '%'
          },
          userId: request.user.id,
        }

        let listSettingsData = await ListSettings.findAll({
          attributes: ['id'],
          where: {
            itemName: {
              $like: '%' + searchKey + '%'
            },
            typeId: 1,
            isEnable: true
          },
          raw: true
        });

        if (listSettingsData && listSettingsData.length > 0) {
          roomTypeFilter = listSettingsData.map((item, index) => {
            return item.id;
          });
        }

        let houseType = {};

        if (roomTypeFilter && roomTypeFilter.length > 0) {
          houseType = {
            id: {
              $in: [
                sequelize.literal(`SELECT listId FROM UserListingData WHERE settingsId in (${roomTypeFilter})`)
              ]
            },
            userId: request.user.id,
            title: null,
          }
        } else {
          houseType = {}
        }

        where = {
          $or: [
            {
              title: {
                $like: '%' + searchKey + '%'
              },
              userId: request.user.id,
            }, houseType,
            {
              city: {
                $like: '%' + searchKey + '%'
              },
              userId: request.user.id,
              title: null,
            }
          ]
        }
      }


      const results = await Listing.findAll({
        where,
        order: [['createdAt', 'DESC']],
        include: [{
          model: UserListingSteps,
          as: 'userListingSteps',
          required: true
        }]

      });

      const userListingCount = await Listing.count({
        where: {
          userId: request.user.id,
        },
      });

      return {
        status: 200,
        results,
        userListingCount,
        searchKey
      };

    } else {
      return {
        status: "notLoggedIn"
      }
    }

  },
};

export default ManageListings;
