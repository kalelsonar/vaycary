var CronJob = require('cron').CronJob;
const AllowedLimit = require('async-sema').RateLimit(300);
var ical = require('ical');
import { blockDates, getCalendarData, removeBlockedDates, getCalendarDataCount } from './dbFunctions';
import { getDates } from '../../helpers/dateRange';
const axios = require('axios');

const iCalCron = app => {

    new CronJob('0 35 23 * * *', async function () {  // Run every day on 11.00 PM

        console.log("/********************************************/");
        console.log("HOLY MOLY ICAL CRON STARTED");

        let calendarData, calendarDataCount, offset = 0, limit = 100, totalPages = 1;

        calendarDataCount = await getCalendarDataCount();

        const toSearch = "text/calendar";

        if (calendarDataCount && calendarDataCount > 0) {

            totalPages = Math.floor((calendarDataCount - 1) / limit) + 1;

            for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

                offset = (currentPage - 1) * limit;

                calendarData = await getCalendarData(offset);

                if (calendarData && calendarData.length > 0) {

                    calendarData.map((item) => {
                        axios.get(item.url).then(async (response) => {
                            // handle success
                            if (response && response.data) {
                                var contentType = response.headers['content-type'];
                                var dataIndex = contentType.search(toSearch);
                                if (dataIndex > -1) {
                                    await removeBlockedDates(item.listId, item.id);
                                    var data = ical.parseICS(response.data);
                                    for (var k in data) {
                                        await AllowedLimit();
                                        if (data.hasOwnProperty(k)) {
                                            var ev = data[k];
                                            if (ev.start && ev.end) {
                                                if (ev.start.getDate() === ev.end.getDate() && ev.start.getFullYear() === ev.end.getFullYear() && ev.start.getMonth() === ev.end.getMonth()) {
                                                    await blockDates(item.listId, item.id, ev.start, 'secondHalf' );
                                                } else {
                                                    var range = getDates(ev.start, ev.end);
                                                    range.map(async (day, index) => {
                                                        let dayStatus = index == 0 ? 'secondHalf' : ((range.length - 1) == index ? 'firstHalf' : 'full')
                                                        await blockDates(item.listId, item.id, day, dayStatus);
                                                    });
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }).catch((error) => {
                            // handle error
                            console.error(error);
                        });
                    });
                }
            }
        }

        console.log("HOLY MOLY ICAL CRON COMPLETED");
        console.log("/********************************************/");

    }, null, true, 'America/Los_Angeles');

};

export default iCalCron;