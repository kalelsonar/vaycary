import React from 'react';
import Test from './Test';
import HomeLayout from '../../components/Layout/HomeLayout';

export default async function action() {
  return {
    component: <HomeLayout>
        <Test  />
    </HomeLayout>,
  };
}