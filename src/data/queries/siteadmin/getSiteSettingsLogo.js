import {
    GraphQLString as StringType,
    GraphQLNonNull as NonNull
} from 'graphql';
import { SiteSettings } from '../../../data/models';
import SiteSettingsType from '../../types/siteadmin/SiteSettingsType';
import showErrorMessage from '../../../helpers/showErrorMessage';

const getSiteSettingsLogo = {

    type: SiteSettingsType,

    args: {
        title: { type: new NonNull(StringType) },
        name: { type: new NonNull(StringType) }
    },

    async resolve({ request }, { title, name }) {
        try {
            if (request.user && request.user.admin) {
                return await SiteSettings.findOne({ where: { title, name } });
            }
            return { status: '500', errorMessage: showErrorMessage({ errorCode: 'loginError' }) }
        } catch (e) {
            return {
                status: '400',
                errorMessage: showErrorMessage({ errorCode: 'catchError', error: e })
            }
        }
    }
};

export default getSiteSettingsLogo;

/*

query getSiteSettingsLogo($title: String!, $name: String!) {
    getSiteSettingsLogo(title:$title, name: $name) {
        status
        errorMessage
    }
}

*/