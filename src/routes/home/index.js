import React from 'react';
import Home from './Home';
import HomeLayout from '../../components/Layout/HomeLayout';
import { getListingFields } from '../../actions/getListingFields'

import { setPersonalizedValues } from '../../actions/personalized';

export default async function action({ store }) {
  const title = store.getState().siteSettings.data.siteTitle;
  const description = store.getState().siteSettings.data.metaDescription;
  const listingFields = store.getState().listingFields.data;
  const layoutType = store.getState().siteSettings.data.homePageType;
  const wholeData = store.getState().homeBannerImages.data;

  if (listingFields === undefined) await store.dispatch(getListingFields());

  const guestField = await store.getState().listingFields.data;
  let guestCount = 1;
  if (guestField) {
    guestCount = guestField.personCapacity && guestField.personCapacity[0] && guestField.personCapacity[0].startValue;
  }
  await store.dispatch(setPersonalizedValues({ name: 'personCapacity', value: Number(guestCount) }));

  return {
    title,
    description,
    listingFields,
    component: <HomeLayout
      layoutType={layoutType}
    >
      <Home layoutType={layoutType} wholeData={wholeData} />
    </HomeLayout>
  };
}