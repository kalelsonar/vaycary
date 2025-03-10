import {
    GraphQLString as StringType,
    GraphQLNonNull as NonNull
} from 'graphql';
import { ForgotPassword, User, UserProfile } from '../../models';
import ForgotPasswordType from '../../types/EmailTokenType';
import showErrorMessage from '../../../helpers/showErrorMessage';
import { sendServerEmail } from '../../../core/email/sendServerEmail';

const sendForgotPassword = {

    type: ForgotPasswordType,

    args: {
        email: { type: new NonNull(StringType) },
    },

    async resolve({ request, response }, { email }) {
        try {
            let userId, token = Date.now(), content = null;

            if (request?.user?.admin) {
                return {
                    status: '404',
                    errorMessage: showErrorMessage({ errorCode: 'adminUserLogged' })
                };
            }

            if (!request?.user) {
                const getUser = await User.findOne({
                    attributes: ['id'],
                    where: {
                        email,
                        userDeletedAt: null
                    },
                    include: [{
                        model: UserProfile, as: 'profile', required: true,
                        attributes: ['firstName']
                    }],
                    raw: true
                });

                if (getUser) {
                    userId = getUser?.id;

                    const userStatus = await User.findOne({
                        attributes: ['id', 'userBanStatus'],
                        where: {
                            id: userId
                        },
                        raw: true
                    });

                    if (userStatus?.userBanStatus) {
                        return {
                            status: '400',
                            errorMessage: showErrorMessage({ errorCode: 'userBanStatus' })
                        };
                    }

                    await ForgotPassword.destroy({
                        where: {
                            email,
                            userId
                        }
                    });

                    await ForgotPassword.create({
                        email,
                        userId,
                        token
                    });

                    content = {
                        token,
                        email,
                        name: getUser && (getUser['profile.firstName'] || getUser['profile']['firstName'])
                    };

                    sendServerEmail(email, 'forgotPasswordLink', content);

                    return {
                        status: '200'
                    };
                } else {
                    return {
                        status: 'accountNotFound',
                        errorMessage: showErrorMessage({ errorCode: 'noAccountExist' })
                    };
                }
            } else {
                return {
                    status: '400',
                    errorMessage: showErrorMessage({ errorCode: 'commonError' })
                };
            }
        } catch (error) {
            return {
                status: '500',
                errorMessage: showErrorMessage({ errorCode: 'commonError' })
            };
        }
    },
};

export default sendForgotPassword;