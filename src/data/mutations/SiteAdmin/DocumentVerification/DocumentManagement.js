import UserVerifiedInfoType from '../../../types/UserVerifiedInfoType';
import { UserVerifiedInfo } from '../../../models';

import {
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';

const DocumentManagement = {

  type: UserVerifiedInfoType,

  args: {
    userId: { type: StringType },
    isIdVerification: { type: IntType }
  },

  async resolve({ request }, { userId, isIdVerification }) {

    if (request.user && request.user.admin == true) {
      let isDocumentUpdate = false;

      const updateDocumentManagement = await UserVerifiedInfo.update(
        {
          isIdVerification
        },
        {
          where: {
            userId
          }
        }
      )
        .then(function (instance) {
          // Check if any rows are affected
          if (instance > 0) {
            isDocumentUpdate = true;
          }
        });

      if (isDocumentUpdate) {
        return {
          status: 'success'
        }
      } else {
        return {
          status: 'failed'
        }
      }
    } else {
      return {
        status: "failed"
      }
    }
  },
};

export default DocumentManagement;

/*

 mutation DocumentManagement ($id: String, $isIdVerification: Boolean){
                    DocumentManagement(id: $id, isIdVerification: $isIdVerification){
                        status
    }
}
*/