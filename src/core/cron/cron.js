var CronJob = require('cron').CronJob;
import fetch from '../fetch';
import { Currencies, CurrencyRates } from '../../data/models';
import { coinbase, cronTimezone, coinbaseCurrencyUrl } from '../../config';

const cron = app => {
	try {
		new CronJob('0 0 1,13 * * *', async function () {
			console.log('holy moly currency rates updating...');

			let baseCurrency, baseData, currenciesData = [], ratesData, findCurrency;
			let validCurrencies, validCurrencyCodes = [], currenciesKey, findValidCurrencyCodes;

			const findAllCurrencies = await Currencies.findAll({
				attributes: ['symbol', 'isEnable', 'isPayment', 'isBaseCurrency'],
				raw: true
			});

			baseCurrency = findAllCurrencies.find((o) => {
				return o.isBaseCurrency == 1
			})

			const symbol = baseCurrency.symbol;

			const validCurrencyURL = coinbaseCurrencyUrl;

			const response = await fetch(validCurrencyURL);

			if (response) {
				const { data } = await response.json();
				validCurrencies = data.map((o) => { return o.id })
			}

			const URL = `${coinbase}` + symbol;
			const resp = await fetch(URL);
			const { data } = await resp.json();
			const currencyData = data.rates;

			baseData = {
				currencyCode: symbol,
				rate: 1.00,
				isBase: true
			};

			currenciesKey = Object.keys(currencyData).map((data) => {
				findValidCurrencyCodes = validCurrencies.find((item) => {
					return item == data
				})
				return findValidCurrencyCodes
			})

			currenciesKey.map((o) => {
				if (o !== undefined) {
					validCurrencyCodes.push(o)
				}
			})

			validCurrencyCodes.map((item) => {
				findCurrency = findAllCurrencies.find((o) => {
					if (o.symbol == item) {
						return o
					}
				})
				
				currenciesData.push(findCurrency ? findCurrency : { symbol: item, isEnable: 0, isPayment: 0, isBaseCurrency: 0 })
			})

			ratesData = Object.keys(currencyData).map(function (data) {
				return { "currencyCode": data, rate: currencyData[data] };
			});

			ratesData.push(baseData);

			await Currencies.truncate();
			await Currencies.bulkCreate(currenciesData);

			if (ratesData && ratesData.length > 0) {
				await CurrencyRates.truncate();
				await CurrencyRates.bulkCreate(ratesData);
			}
		}, null, true, cronTimezone);
	} catch (error) {
		console.log(error)
	}
};

export default cron;