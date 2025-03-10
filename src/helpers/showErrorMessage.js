import errorMessage from "./ErrorMessages/errorMessages_en";

const showErrorMessage = async ({ errorCode, error, language }) => {
    const lang = language ? language : "en"
    if (lang == "en") {
        return await errorMessage(errorCode, error);
    }
}
export default showErrorMessage;