import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging'
import fetch from 'node-fetch'
import { UserLogin, Currencies } from '../../data/models';
import { getConfigurationData } from '../email/helpers/getUserEmail';
import { tokenSplitup } from './notificationSplitup';

const pushNotificationRoutes = app => {

    app.post('/push-notification', async function (req, res) {
        try {
            const configData = await getConfigurationData({ name: ['fcmPushNotificationKey'] });
            let userId, content, notificationId, deviceId;
            userId = req.body.userId;
            content = req.body.content;
            notificationId = Math.floor(100000 + Math.random() * 900000);
            deviceId = [];
            content['notificationId'] = notificationId;
            content['content_available'] = true;

            const getDeviceIdList = await UserLogin.findAll({
                attributes: ['deviceId'],
                where: {
                    userId: userId
                },
                raw: true
            });

            getDeviceIdList?.length > 0 && getDeviceIdList?.map(async (item) => {
                if (item.deviceId) {
                    deviceId.push(item.deviceId);
                }
            })

            !getApps().length ? initializeApp({ credential: cert(JSON.parse(configData.fcmPushNotificationKey)) }) : getApp();

            const getTokens = await tokenSplitup(deviceId);

            if (getTokens.length > 0) {
                getTokens.map((tokens) => {

                    let message = {
                        notification: {
                            title: content.title,
                            body: content.message,
                        },

                        data: {
                            content: JSON.stringify(content),
                        },
                        tokens
                    };
                    getMessaging().sendEachForMulticast(message)
                        .then((response) => {
                            console.log('Successfully sent message:', response)
                        })
                        .catch((error) => {
                            console.log('Error sending message:', error)
                        })
                })
                res.send({ status: 200, errorMessage: null })
            } else {
                res.send({ status: 400, errorMessage: "error" });
            }
        } catch (error) {
            res.send({ status: 400, errorMessage: error });
        }
    });

    app.post('/updateCoinbase', async function (req, res) {
        const URL = 'https://api.coinbase.com/v2/currencies';
        const resp = await fetch(URL);
        const { data } = await resp.json();
        let newCurrencyList = data && data.length > 0 && data.map(function (currency) {
            return { "symbol": currency.id };
        });
        let existingCurrencyList = await Currencies.findAll({
            attributes: ['id', 'symbol'],
            raw: true
        });
        let filterId = new Set(existingCurrencyList.map(({ symbol }) => symbol));
        let filteredCurrencyList = newCurrencyList.filter(({ symbol }) => !filterId.has(symbol));
        await Currencies.bulkCreate(filteredCurrencyList);
        res.send({ status: 200 });
    });

};

export default pushNotificationRoutes;