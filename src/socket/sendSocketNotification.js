import { url } from "../config";
import fetch from "../core/fetch";

const sendSocketNotification = async (endPoint, content) => {

    const response = await fetch(url + '/socketNotification', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            endPoint,
            content
        }),
        credential: 'include'
    });

    const { status, errorMessage } = await response.json();
    return { status, errorMessage };
}

export default sendSocketNotification;