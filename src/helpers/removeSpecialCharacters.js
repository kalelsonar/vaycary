import { getConfigurationData } from "../core/email/helpers/getUserEmail"

export const removeSpecialCharacters = async () => {
    try {
        const siteData = await getConfigurationData({ name: ['siteName'] })
        let replaceContent = siteData?.siteName?.replace(/[<>'"\\*]/g, '').trim().slice(0, 22);
        return replaceContent;

    } catch (error) {
        return false;
    }
}