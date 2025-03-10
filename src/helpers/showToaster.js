import { toastr } from "react-redux-toastr";
import errorMessage from "./ErrorMessages/errorMessages_en";

const showToaster = async ({ messageId, toasterType, requestContent, language }) => {

    let result, lang, title;
    lang = language ? language : 'en'

    if (lang == 'en') {
        title = await errorMessage(toasterType);
        result = await errorMessage(messageId, requestContent)
    }

    return toastr[toasterType](title, result)
}
export default showToaster