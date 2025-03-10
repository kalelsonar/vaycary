import { User, Listing, UserProfile, ListingData } from "../../../data/models";

const getData = async ({ id }) => {
    try {
        const host = await User.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: UserProfile,
                    as: 'profile'
                }
            ]
        });
        return await host;
    }
    catch (error) {
        return false;
    }
}

const getListingData = async ({ id }) => {
    try {
        const list = await Listing.findOne({
            where: {
                id
            },
            include: [
                {
                    model: ListingData,
                    as: 'listingData'
                }
            ]
        });
        return await list;
    }
    catch (error) {
        return false;
    }
}

export {
    getData,
    getListingData
}