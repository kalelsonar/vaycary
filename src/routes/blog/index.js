import React from 'react';
import Layout from '../../components/Layout';
import NotFound from '../notFound/NotFound';
import fetch from '../../core/fetch';
import Blog from './blog';
import messages from '../../locale/messages';

export default async function action(store, params, intl, path) {
    let blogUrl = '';

    blogUrl = params.u1;

    let title = 'Static Page';
    title = intl?.formatMessage(messages.staticTab);

    let description = "";

    const query = `
    query getBlogHome ($pageUrl: String!) {
    getBlogHome (pageUrl: $pageUrl) {
        id
        metaTitle
        metaDescription
        pageUrl
        pageTitle
        content
        footerCategory
        isEnable
        createdAt
    }
    }
`;

    const paramsValue = {
        pageUrl: blogUrl
    };

    const resp = await fetch('/graphql', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: paramsValue
        }),
        credentials: 'include',
    });

    const { data } = await resp.json();

    if (data && data.getBlogHome) {
        title = data.getBlogHome.pageTitle;
        description = data.getBlogHome.metaDescription;
        return {
            title,
            description,
            component: <Layout><Blog image={data.getBlogHome.image} initialValues={data.getBlogHome}></Blog></Layout>,
        };
    }
    else {
        title = "Not Found"
        return {
            title,
            component: <Layout><NotFound title={title} /></Layout>,
            status: 404,
        };
    };
}

