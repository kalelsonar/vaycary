// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLBoolean as BooleanType,
  GraphQLFloat as FloatType,
} from 'graphql';

// GraphQL Type
import EditListingType from '../types/EditListingType';

// Sequelize models
import {
  Listing,
  UserAmenities,
  UserSafetyAmenities,
  UserSpaces,
  UserListingData,
  BedTypes
} from '../../data/models';

const updateListing = {

  type: EditListingType,

  args: {
    id: { type: IntType },
    roomType: { type: StringType },
    houseType: { type: StringType },
    residenceType: { type: StringType },
    bedrooms: { type: StringType },
    buildingSize: { type: StringType },
    bedType: { type: StringType },
    beds: { type: IntType },
    personCapacity: { type: IntType },
    bathrooms: { type: FloatType },
    bathroomType: { type: StringType },
    country: { type: StringType },
    street: { type: StringType },
    buildingName: { type: StringType },
    city: { type: StringType },
    state: { type: StringType },
    zipcode: { type: StringType },
    lat: { type: FloatType },
    lng: { type: FloatType },
    isMapTouched: { type: BooleanType },
    amenities: { type: new List(IntType) },
    safetyAmenities: { type: new List(IntType) },
    spaces: { type: new List(IntType) },
    bedTypes: { type: StringType },
  },

  async resolve({ request, response }, {
    id,
    roomType,
    houseType,
    residenceType,
    bedrooms,
    buildingSize,
    bedType,
    beds,
    personCapacity,
    bathrooms,
    bathroomType,
    country,
    street,
    buildingName,
    city,
    state,
    zipcode,
    lat,
    lng,
    isMapTouched,
    amenities,
    safetyAmenities,
    spaces,
    bedTypes
  }) {

    let isListUpdated = false;

    if (request.user || request.user.admin) {

      let where = { id };
      if (!request.user.admin) {
        where = {
          id,
          userId: request.user.id
        }
      };

      await Listing.update({
        residenceType,
        bedrooms,
        bedType,
        beds,
        personCapacity,
        bathrooms,
        country,
        street,
        buildingName,
        city,
        state,
        zipcode,
        lat,
        lng,
        isMapTouched,
        lastUpdatedAt: new Date()
      },
        {
          where
        })
        .spread(function (instance) {
          // Check if any rows are affected
          if (instance > 0) {
            isListUpdated = true;
          }
        });

      // User Settings Data
      if (isListUpdated) {
        await UserListingData.destroy({
          where: {
            listId: id
          }
        });

        let otherListSettings = [
          { settingsId: roomType, listId: id },
          { settingsId: houseType, listId: id },
          { settingsId: buildingSize, listId: id },
          { settingsId: bathroomType, listId: id }
        ];

        // Bulk create on UserListingData to store other settings of this listingSteps
        await UserListingData.bulkCreate(otherListSettings);

        // Amenities
        if (amenities && amenities?.length > 0) {
          let amenitiesData = [];
          await UserAmenities.destroy({
            where: {
              listId: id
            }
          });
          await Promise.all(amenities.map(async (item, key) => {
            amenitiesData.push({
              listId: id,
              amenitiesId: item
            });
          }));
          await UserAmenities.bulkCreate(amenitiesData);
        }

        // Safety Amenities
        if (safetyAmenities && safetyAmenities?.length > 0) {
          let safetyAmenitiesData = [];
          await UserSafetyAmenities.destroy({
            where: {
              listId: id
            }
          });
          await Promise.all(safetyAmenities.map(async (item, key) => {
            safetyAmenitiesData.push({
              listId: id,
              safetyAmenitiesId: item
            })
          }));
          await UserSafetyAmenities.bulkCreate(safetyAmenitiesData);
        }

        // Spaces
        if (spaces && spaces?.length > 0) {
          let spacesData = [];
          await UserSpaces.destroy({
            where: {
              listId: id
            }
          });
          await Promise.all(spaces.map(async (item, key) => {
            spacesData.push({
              listId: id,
              spacesId: item
            });
          }));
          await UserSpaces.bulkCreate(spacesData);

        }

        let bedTypeData;
        if (bedTypes && bedTypes.length > 0) {

          bedTypeData = JSON.parse(bedTypes);

          // items included
          if (bedTypeData) {
            let updateBedData = [];
            await BedTypes.destroy({
              where: {
                listId: id
              }
            });

            await Promise.all(bedTypeData.map(async (item, key) => {
              updateBedData.push({
                listId: id,
                bedCount: item.bedCount,
                bedType: item.bedType
              });
            }));

            await BedTypes.bulkCreate(updateBedData);

          }
        }
      }

      return {
        status: isListUpdated ? 'success' : 'failed'
      }

    } else {
      return {
        status: "notLoggedIn",
      };
    }

  },
};

export default updateListing;
