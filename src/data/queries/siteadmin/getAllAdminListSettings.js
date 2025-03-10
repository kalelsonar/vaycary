import {
  GraphQLInt as IntType,
} from 'graphql';
import GetAllListSettingsType from '../../types/siteadmin/GetAllListSettingsType';
import { ListSettingsTypes, ListSettings } from '../../../data/models';

import showErrorMessage from '../../../helpers/showErrorMessage';

const getAllAdminListSettings = {

  type: GetAllListSettingsType,

  args: {
    typeId: { type: IntType },
    currentPage: { type: IntType }
  },

  async resolve({ request }, { typeId, currentPage }) {
    try {
      if (request.user && request.user.admin == true) {
        let offset = 0, limit = 10;

        if (currentPage) {
          offset = (currentPage - 1) * limit;
        }

        const listSettingsTypeData = await ListSettingsTypes.findOne({
          attributes: ['id', 'typeName', 'fieldType', 'typeLabel', 'isMultiValue'],
          where: {
            id: typeId
          }
        });

        const listSettingsData = await ListSettings.findAll({
          where: {
            typeId
          },
          limit,
          offset,
          order: [['updatedAt', 'DESC']]
        });

        const count = await ListSettings.count({ where: { typeId } });

        if (!listSettingsData) {
          return {
            status: 400,
            errorMessage: showErrorMessage({ errorCode: 'listSettingsData' })
          }
        }

        return {
          listSettingsTypeData,
          listSettingsData,
          count,
          status: 200
        };
      } else {
        return {
          status: 500,
          errorMessage: showErrorMessage({ errorCode: 'adminLogin' })
        }
      }
    } catch (error) {
      return {
        status: 400,
        errorMessage: showErrorMessage({ errorCode: 'catchError', error })
      }
    }
  }
};

export default getAllAdminListSettings;

/*

query getAllAdminListSettings($currentPage: Int,$typeId: Int) {
  getAllAdminListSettings(currentPage: $currentPage,typeId: $typeId){
    status
    errorMessage
    listSettingsTypeData {
      id
      typeName
      typeLabel
      fieldType
    }
    count
    listSettingsData {
      id
      typeId
      itemName
      itemDescription
      otherItemName
      startValue
      endValue
      maximum
      minimum
      isEnable
    }
  }  	
}

*/
