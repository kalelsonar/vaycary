import { ListCalendar, ListBlockedDates } from '../../data/models';

export async function findURL(url, listId) {
	const findURL = await ListCalendar.findOne({
		where: {
			listId,
			url
		}
	});
	if (findURL) {
		return true;
	} else {
		return false;
	}
}

export async function storeCalendar(url, listId, name) {
	return await ListCalendar.create({
		listId,
		name,
		url,
	});
}

export async function getCalendarData(offset) {
	return await ListCalendar.findAll({
		limit: 100,
		offset,
		raw: true
	});
}

export async function blockDates(listId, calendarId, blockedDates, dayStatus) {
	return await ListBlockedDates.findOrCreate({
		where: {
			listId,
			blockedDates,
			dayStatus
		},
		defaults: {
			//properties you want on create
			listId,
			calendarId,
			blockedDates,
			calendarStatus: 'blocked'
		}
	});
}

export async function removeBlockedDates(listId, calendarId) {
	await ListBlockedDates.destroy({
		where: {
			listId,
			calendarId
		}
	});
}

export async function getCalendarDataCount() {
	return await ListCalendar.count()
}