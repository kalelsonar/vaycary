import { json2csv } from 'json-2-csv';
import { getTransactions } from './getTransactionsData';
import {
	users,
	reservations,
	listings,
	inquiry
} from './CSVData';

let allowedTransactionTypes = ['completed', 'future', 'grossEarnings'];

const CSVRoutes = app => {

	app.get('/export-transaction', async (req, res) => {
		try {
			let type = req?.query?.type,
				hostId = req?.user?.id,
				toCurrency = req?.query?.toCurrency,
				listId = req?.query?.listId,
				payoutId = req?.query?.payoutId,
				searchKey = req?.query?.searchKey;

			if (!req?.user || !req?.user?.id || req?.user?.admin || !allowedTransactionTypes.includes(type)) {
				res.redirect('/');
				return '';
			}

			let data = await getTransactions({ hostId, toCurrency, type, listId, payoutId, searchKey });

			const csvData = json2csv(data);
			res.setHeader('Content-disposition', 'attachment; filename=' + type + '-transactions.csv');
			res.set('Content-Type', 'text/csv');
			res.send(csvData);
		} catch (error) {
			console.log(error)
		}
	});

	app.get('/export-admin-data', async function (req, res) {
		try {
			let data = [];
			let type = req?.query?.type,
				userType = req?.query?.usertype,
				toCurrency = req?.query?.toCurrency,
				searchType = req?.query?.searchType,
				keyword = req?.query?.keyword;

			if (req?.user?.admin && type) {
				if (type === 'users') {
					data = await users(keyword, userType);
				} else if (type === 'listings') {
					data = await listings(keyword);
				} else if (type === 'reservations') {
					data = await reservations(keyword, toCurrency, searchType);
				} else if (type === 'inquiry') {
					data = await inquiry(keyword, toCurrency);
				}

				const csvData = json2csv(data);

				res.setHeader('Content-disposition', 'attachment; filename=' + type + '-data.csv');
				res.set('Content-Type', 'text/csv');
				res.send(csvData);
			} else {
				res.redirect('/');
			}
		}
		catch (error) {
			console.log('******************Export CSV Error******************');
			console.log(error);
			res.redirect('/');
		}
	});
};

export default CSVRoutes;