import UnreadThreadsQuery from '../../components/Dashboard/getUnreadThreads.graphql';
import GetThreadQuery from '../../components/ViewMessage/GetThreadQuery.graphql';
import UnreadCountQuery from '../../components/Inbox/UnreadCount.graphql';
import AllThreadsQuery from '../../../src/routes/inbox/AllThreadsQuery.graphql';

const getUnreadThreadsQuery = () => {
    return async (dispatch, getState, { client }) => {
        await client.query({
            query: UnreadThreadsQuery,
            fetchPolicy: 'network-only'
        });
    }
}

const getUnreadThreadsCountQuery = () => {
    return async (dispatch, getState, { client }) => {
        await client.query({
            query: UnreadCountQuery,
            fetchPolicy: 'network-only'
        });
    }
}

const getAllThreadsQuery = ({ threadId, type }) => {
    return async (dispatch, getState, { client }) => {
        await client.query({
            query: AllThreadsQuery,
            variables: { threadType: type, currentPage: 1 },
            fetchPolicy: 'network-only'
        });
    }
}

const getThreadQuery = ({ threadId, type }) => {
    return async (dispatch, getState, { client }) => {
        await client.query({
            query: GetThreadQuery,
            variables: { threadType: type, threadId: threadId },
            fetchPolicy: 'network-only'
        });
    }
}

export {
    getUnreadThreadsQuery, getUnreadThreadsCountQuery, getThreadQuery, getAllThreadsQuery
}