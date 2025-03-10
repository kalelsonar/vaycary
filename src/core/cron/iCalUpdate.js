import axios from "axios";
const AllowedLimit = require('async-sema').RateLimit(300);
import ical from 'ical';
import { getDates } from "../../helpers/dateRange";
import { blockDates, getCalendarData, getCalendarDataCount, removeBlockedDates } from "../iCal/dbFunctions";

const iCalUpdate = app => {
    app.post('/iCalUpdate', async function (req, res) {
        try {
            let calendarData, calendarDataCount, offset = 0, limit = 100, totalPages = 1;
            let contentType, dataIndex, data, dayStatus;

            calendarDataCount = await getCalendarDataCount();

            const toSearch = "text/calendar";

            if (calendarDataCount && calendarDataCount > 0) {
                totalPages = Math.floor((calendarDataCount - 1) / limit) + 1;

                for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
                    offset = (currentPage - 1) * limit;
                    calendarData = await getCalendarData(offset);
                    if (calendarData && calendarData.length > 0) {
                        calendarData && calendarData.map((item) => {
                            axios.get(item.url).then(async (response) => {
                                if (response && response.data) {
                                    contentType = response.headers['content-type'];
                                    dataIndex = contentType.search(toSearch);
                                    if (dataIndex > -1) {
                                        await removeBlockedDates(item.listId, item.id);
                                        data = ical.parseICS(response.data);
                                        for (var k in data) {
                                            await AllowedLimit();
                                            if (data.hasOwnProperty(k)) {
                                                var ev = data[k];
                                                if (ev.start && ev.end) {
                                                    if (ev.start.getDate() === ev.end.getDate() && ev.start.getFullYear() === ev.end.getFullYear() && ev.start.getMonth() === ev.end.getMonth()) {
                                                        await blockDates(item.listId, item.id, ev.start, 'secondHalf');
                                                    } else {
                                                        var range = getDates(ev.start, ev.end);
                                                        range.map(async (day, index) => {
                                                            dayStatus = index == 0 ? 'secondHalf' : ((range.length - 1) == index ? 'firstHalf' : 'full')
                                                            await blockDates(item.listId, item.id, day, dayStatus);
                                                        });
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }).catch((error) => {
                                console.error(error);
                            })
                        })
                    }
                }
                res.send({ status: 200 });
            } else {
                res.send({ status: 400 })
            }
        } catch (error) {
            console.error(error);
        }
    });
}

export default iCalUpdate;