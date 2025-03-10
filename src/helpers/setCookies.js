import jwt from 'jsonwebtoken';
import { auth } from '../config';

export const setCookies = ({ userLogin, response, admin }) => {
    try {
        let token;
        const expiresIn = admin ? (60 * 60 * 24 * 1) : (60 * 60 * 24 * 180);

        if (admin) {
            token = jwt.sign({ id: userLogin.id, email: userLogin.email, admin: true }, auth.jwt.secret, { expiresIn });
        } else {
            token = jwt.sign({ id: userLogin.id, email: userLogin.email }, auth.jwt.secret, { expiresIn });
        }

        response.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });

    } catch (error) {
        console.log(error)
    }
}