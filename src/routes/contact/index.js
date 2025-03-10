import React from 'react';
import Layout from '../../components/Layout';
import messages from '../../locale/messages';
import Contact from './Contact';

const title = 'Contact Us';

export default function action({ intl }) {

  const title = intl?.formatMessage(messages.contactForm);

  return {
    title,
    component: <Layout><Contact title={title} /></Layout>,
  };
}
