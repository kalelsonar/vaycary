import twilio from 'twilio';
import moment from 'moment';
import { UserProfile } from '../../../data/models';
import { updateVerificationCode, getCountryCode } from './helpers/dbFunctions';
import { getConfigurationData } from '../../email/helpers/getUserEmail';
import showErrorMessage from '../../../helpers/showErrorMessage';


const TwilioSms = app => {
    app.post('/send-verification-code', async function (req, res) {

        const twillioData = await getConfigurationData({ name: ['twillioAccountSid', 'twillioAuthToken', 'twillioPhone', 'siteName'] });
        const client = new twilio(twillioData.twillioAccountSid, twillioData.twillioAuthToken);
        let responseStatus = 200, errorMessage;
        let phoneNumber = req.body.phoneNumber;
        let dialCode = req.body.dialCode;
        let userProfileNumber = req.body.userProfileNumber;
        let verificationCode = Math.floor(1000 + Math.random() * 9000);
        let message = twillioData.siteName + ' security code: ' + verificationCode;
        message += '. Use this to finish verification.';
        let userId = req.user.id;
        let today = moment();
        let convertedNumber = dialCode + phoneNumber;

        try {

            let findUpdatedTime = await UserProfile.findOne({
                attributes: ['codeUpdatedAt'],
                where: {
                    userId
                },
                raw: true
            });


            if (findUpdatedTime && findUpdatedTime.codeUpdatedAt != null) {
                let codeUpdatedAt = moment(findUpdatedTime.codeUpdatedAt);
                let timeDiff = today.diff(codeUpdatedAt, 'minutes');
                if (timeDiff < 2 && userProfileNumber == convertedNumber) {
                    responseStatus = 400;
                    errorMessage = await showErrorMessage({ errorCode: 'otpError' })
                }
            }

            if (responseStatus === 200) {
                await updateVerificationCode(verificationCode, userId);

                const responseData = await client.messages
                    .create({
                        body: message,
                        from: twillioData.twillioPhone,
                        to: convertedNumber
                    });
            }

        } catch (error) {
            responseStatus = 400;
            errorMessage = error.message;
        }



        res.send({ status: responseStatus, errorMessage });
    });
};

export default TwilioSms;