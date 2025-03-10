import { getConfigurationData } from '../core/email/helpers/getUserEmail';

const deepLinkBundle = app => {

    app.get('/.well-known/apple-app-site-association', function (req, res, next) {
        next();
    }, async (req, res) => {
        const configData = await getConfigurationData({ name: ['deepLinkBundleId'] });
        const responseJson = {
            applinks: {
                apps: [],
                details: [
                    {
                        appID: configData.deepLinkBundleId,
                        'paths': ['/password/verification/', '/user/verification', '/review/write/', '/review/write', '/rooms/']
                    }
                ]
            }
        };
        res.json(responseJson);
    });

    app.get('/.well-known/assetlinks.json', async function (req, res) {
        const configData = await getConfigurationData({ name: ['deepLinkContent'] });
        res.json(JSON.parse(configData.deepLinkContent));
        return;
    });

};

export default deepLinkBundle;
