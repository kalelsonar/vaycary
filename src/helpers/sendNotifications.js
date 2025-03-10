
// Fetch request
import fetch from '../core/fetch';
import { pushNotificationMessage } from './pushNotificationMessage';
import { getShortPushNotification } from '../core/pushNotifications/getShortPushNotification';

export async function sendNotifications(actionType, notifyContent, userId) {

    const { title, message } = await pushNotificationMessage(actionType, notifyContent);
    const trimContent = await getShortPushNotification(message);
    let content = notifyContent;
    content['title'] = title;
    content['message'] = trimContent || message;

    const resp = await fetch('/push-notification', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content,
            userId
        }),
        credentials: 'include'
    });

    const { status, errorMessage } = resp.json;

    return await {
        status,
        errorMessage
    };

}

export default {
    sendNotifications
}
