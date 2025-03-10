import ical from 'ical-generator';
import { url } from '../../../config';
import { getRange } from '../../../helpers/dateRange';
import { isListExist, getBlockedDates } from './dbFunctions';
import { getConfigurationData } from '../../email/helpers/getUserEmail';

const exportICalRoutes = app => {

    app.get('/export-calendar', async function (req, res) {
        const siteData = await getConfigurationData({ name: ['siteName'] });
        const cal = ical({ domain: url, name: siteData.siteName });
        let listId = req.query['id'], datesCollection = [];
        const listData = await isListExist(listId);
        if (listData) {
            const dates = await getBlockedDates(listId);
            if (dates && dates.length > 0) {
                datesCollection = getRange(dates);
                cal.clear();
                datesCollection.map((item) => {
                    cal.createEvent({
                        start: item.startDate,
                        end: item.endDate,
                        summary: siteData.siteName + ' - ' + listData.title,
                        description: listData.title,
                        location: listData.city,
                        url: url + '/rooms/' + listData.id
                    });
                });
            } else {
                cal.clear();
            }
        } else {
            cal.clear();
        }
        cal.serve(res);
    })
};

export default exportICalRoutes;