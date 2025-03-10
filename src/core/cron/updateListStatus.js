var CronJob = require('cron').CronJob;
const AllowedLimit = require('async-sema').RateLimit(25);
import { WishList, Listing } from '../../data/models';

const updateListStatus = app => {

    
    new CronJob('0 0 1-23 * * *', async function () { // Run every day on 1.00 AM, 11.00 PM and every one hour between 1.00 AM and 11.00 PM

        console.log("/********************************************/");
        console.log("HOLY MOLY UPDATE LIST STATUS CRON STARTED");
        let offset = 0, limit = 100, totalPages = 1;

        const getListIdsCount = await Listing.count({});

        if (getListIdsCount && getListIdsCount > 0) {

            totalPages = Math.floor((getListIdsCount - 1) / limit) + 1;

            for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

                offset = (currentPage - 1) * limit;

                const getListIds = await Listing.findAll({
                    attributes: ['id', 'isPublished'],
                    limit,
                    offset,
                    raw: true
                });

                if (getListIds && getListIds.length > 0) {
                    getListIds.map(async (item) => {
                        await AllowedLimit();

                        await WishList.update({
                            isListActive: item.isPublished
                        }, {
                            where: { listId: item.id }
                        });
                    })
                }
            }
        }

        console.log("HOLY MOLY UPDATE LIST STATUS CRON COMPLETED");
        console.log("/********************************************/");

    }, null, true, 'America/Los_Angeles');

};

export default updateListStatus;