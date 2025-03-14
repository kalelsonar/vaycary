import ListPhotosType from '../../types/ListPhotosType';
import {
  Listing,
  ListPhotos,
  WishList,
  UserListingSteps,
  SiteSettings
} from '../../models';

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLInt as IntType,
} from 'graphql';

const RemoveListPhotos = {

  type: ListPhotosType,

  args: {
    listId: { type: new NonNull(IntType) },
    name: { type: StringType },
  },

  async resolve({ request, response }, { listId, name }) {

    // Check whether user is logged in
    if (request.user || request.user.admin) {

      let where = { id: listId };
      if (!request.user.admin) {
        where = {
          id: listId,
          userId: request.user.id
        }
      };
      let iscoverPhotoDeleted = false;
      // Check whether listing is available
      const isListingAvailable = await Listing.findOne({ where });

      if (isListingAvailable) {

        const checkPhotoExist = await ListPhotos.findOne({
          where: {
            listId: listId,
            name: name,
          }
        });

        // Create a new record for a photo
        const removePhoto = await ListPhotos.destroy({
          where: {
            listId: listId,
            name: name,
          }
        });
        if (removePhoto) {
          const photosCount = await ListPhotos.count({ where: { listId } });

          let listApprovalStatus;

          const getListApproval = await SiteSettings.findOne({
            attributes: ['value'],
            where: {
              name: 'listingApproval'
            },
            raw: true
          });

          if (getListApproval && getListApproval.value === '1') {
            listApprovalStatus = null;
          } else {
            listApprovalStatus = 'approved';
          }

          if (photosCount < 1) {
            const updateListingStatus = await Listing.update({
              isPublished: false,
              isReady: false,
              coverPhoto: null,
              listApprovalStatus
            }, {
              where: { id: listId }
            });

            let updateListStatus = await WishList.update({
              isListActive: false
            }, {
              where: {
                listId
              }
            });


            const stepDetails = await UserListingSteps.findOne({ where: { listId } });


          } else {
            const changeListingCover = await Listing.findOne({
              where: {
                coverPhoto: checkPhotoExist.id
              }
            });
            if (changeListingCover) {
              await Listing.update({
                coverPhoto: null,
                lastUpdatedAt: new Date()
              }, {
                where: { id: listId }
              });
              iscoverPhotoDeleted = true;
            }
          }

          return {
            status: "success",
            photosCount: photosCount,
            iscoverPhotoDeleted: iscoverPhotoDeleted
          };
        }

      } else {
        return {
          status: "Listing is not available"
        };
      }

    } else {
      return {
        status: "Not loggedIn"
      };
    }

  },
};

export default RemoveListPhotos;

/*
mutation ($userId:String!, $documentId:Int) {
  RemoveDocumentList (userId:$userId, documentId: $documentId) {
    status
    photosCount
  }
}*/
