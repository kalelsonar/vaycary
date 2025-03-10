import React from 'react';
import { io } from 'socket.io-client';
import { connect } from 'react-redux';
import { setUserLogout } from '../actions/logout';
import { getUnreadThreadsQuery, getThreadQuery, getUnreadThreadsCountQuery, getAllThreadsQuery } from '../helpers/socket/socketActions';
import { socketUrl } from '../config';

const secure = socketUrl && socketUrl.indexOf('https://') >= 0 ? true : false;
const socket = io.connect(socketUrl, {
    secure,
    upgrade: true,
    transports: ['websocket'],
    reconnection: true,
    forceNew: true,
    rejectUnauthorized: false
});

class SocketProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null
        };
    }

    componentDidUpdate() {
        const { userId, getUnreadThreadsQuery, getThreadQuery, getUnreadThreadsCountQuery, getAllThreadsQuery } = this.props

        socket.on(`messageThread-${userId}`, (socket) => {
            getUnreadThreadsQuery();
            getUnreadThreadsCountQuery();
        });

        socket.on(`viewMessageThread-${userId}`, (socket) => {
            getThreadQuery({ threadId: socket?.threadId, type: socket?.type });
            getAllThreadsQuery({ threadId: socket?.threadId, type: socket?.type });
        });
    }

    componentDidMount() {
        const { userId, getUnreadThreadsQuery, getThreadQuery, getUnreadThreadsCountQuery, getAllThreadsQuery } = this.props

        socket.on(`messageThread-${userId}`, async (socket) => {
            await getUnreadThreadsQuery();
            await getUnreadThreadsCountQuery();
        });

        socket.on(`viewMessageThread-${userId}`, (socket) => {
            getThreadQuery({ threadId: socket?.threadId, type: socket?.type });
            getAllThreadsQuery({ threadId: socket?.threadId, type: socket?.type });
        });
    }

    componentWillUnmount() {
        const { id } = this.state;

        if (id) {
            socket.off(`updateUserLogout-${id}`);
            socket.off(`adminUserLogout-${id}`);
            socket.off(`messageThread-${id}`);
            socket.off(`viewMessageThread-${id}`);
        }
    }

    handleUserId = (userId) => {
        this.setState({ id: userId })
    }

    render() {
        const { userId, adminId, setUserLogout } = this.props;

        socket.on(`updateUserLogout-${userId}`, (socket) => {
            setUserLogout({})
            this.handleUserId(userId);
        });
        socket.on(`adminUserLogout-${adminId}`, (socket) => {
            setUserLogout({ isAdmin: true })
            this.handleUserId(adminId);
        });
        return (
            <>
            </>
        )
    }
}

const mapState = (state) => ({
    userId: state?.account?.data?.userId,
    adminId: state?.adminPrevileges?.privileges?.id
});

const mapDispatch = {
    setUserLogout,
    getUnreadThreadsQuery,
    getThreadQuery,
    getUnreadThreadsCountQuery,
    getAllThreadsQuery
};
export default (connect(mapState, mapDispatch)(SocketProvider));
