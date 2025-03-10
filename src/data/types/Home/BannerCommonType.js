import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType,
    GraphQLList as List
} from 'graphql';

import sequelize from '../../sequelize';

// Types
import ImageBannerType from '../ImageBannerType';
import PopularLocationType from '../../types/siteadmin/PopularLocationType';
import HomeBannerType from '../../types/HomeBannerType';
import StaticBlockType from '../../types/siteadmin/StaticBlockType';
import ShowListingType from '../../types/ShowListingType';

import { HomeBanner, ImageBanner, PopularLocation, StaticInfoBlock, Recommend, Listing, ListViews } from '../../models';

const BannerCommonType = new ObjectType({
    name: 'BannerCommonType',
    fields: {
        id: { type: IntType },
        title: {  type: StringType },
        content: { type: StringType },
        isEnable: { type: BooleanType },
        getHomeBanner: {
            type: new List(HomeBannerType),
            resolve() {
              return HomeBanner.findAll({});
            }
        },
    }
});

export default BannerCommonType;