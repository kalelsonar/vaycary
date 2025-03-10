import React from 'react';
import moment from 'moment';

import Layout from '../../components/Layout';
import ViewListing from './ViewListing';
import NotFound from '../notFound/NotFound';

import fetch from '../../core/fetch';
import { getSpecialPricingData, getListBlockedDates, getFullBlockDates } from '../../actions/Listing/getSpecialPricingData';
import { checkAvailability } from '../../actions/checkAvailability';
import { getListingFields } from '../../actions/getListingFields';
import { setPersonalizedValues } from '../../actions/personalized'
import messages from '../../locale/messages';
import { url, fileuploadDir } from '../../config.js';

const title = 'View Listing';
function renderNotFound() {
  return {
    title,
    component: <Layout><NotFound title={title} /></Layout>,
    status: 404,
  };
}

export default async function action({ params, store, query, intl, client }) {
  const title = intl?.formatMessage(messages.viewListing);

  let listTitle, listDescription, listPhoto, lat, lng, startDate, endDate, guests;
  const baseCurrency = store.getState().currency.base;
  const isAdmin = store.getState().runtime.isAdminAuthenticated;
  let listURL = params?.listId, listId, listURLData, preview = false;
  let viewListingHeader = 'viewListingHeader'

  const getListquery = `
    query GetListMeta($listId: Int!) {
      getListMeta(listId: $listId) {
        id
        title
        description
        isPublished
        listApprovalStatus
        coverPhoto
        listPhotos {
          id
          name
        }
        status
        lat
        lng
        listingData {
          maxNight
          minNight
        }

      }
    }
  `;

  // From URI
  let maximumNights = 0, minimumNights = 0;
  if (params?.preview) {
    preview = true;
  }

  if (listURL && listURL.indexOf('-') >= 0) {
    listURLData = listURL.split('-');
    listId = listURLData[listURLData.length - 1];
  } else {
    listId = listURL;
  }

  if (listId === undefined || isNaN(listId)) {
    renderNotFound();
    return;
  }

  if (listId) {
    await store.dispatch(getListBlockedDates(listId, preview))
    await store.dispatch(getFullBlockDates(listId, preview))
  }
  await store.dispatch(getListingFields());

  // const dates = params.dates;
  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: getListquery,
      variables: { listId }
    }),
  });
  const { data } = await resp.json();

  if ('startdate' in query && 'enddate' in query) {
    let today = moment(new Date()).format("YYYY-MM-DD");
    startDate = moment(query.startdate).format("YYYY-MM-DD");
    endDate = moment(query.enddate).format("YYYY-MM-DD");
    store.dispatch(setPersonalizedValues({ name: 'startDate', value: startDate }));
    store.dispatch(setPersonalizedValues({ name: 'endDate', value: endDate }));

    if ('address' in query) {
      store.dispatch(setPersonalizedValues({ name: 'location', value: query.address }));
    }

    let checkValidDate = false;
    if ((startDate < today) || endDate < today) {
      checkValidDate = true;
    } else if (startDate == endDate) {
      checkValidDate = true;
    } else if (startDate > endDate) {
      checkValidDate = true;
    } else if ((moment(startDate).isValid() == false) || (moment(endDate).isValid() == false)) {
      checkValidDate = true;
    }

    if (checkValidDate) {
      query.startdate = null;
      query.enddate = null;
    }

    startDate = query.startdate;
    endDate = query.enddate;
    maximumNights = data?.getListMeta?.listingData?.maxNight ? data?.getListMeta?.listingData?.maxNight : 0;
    minimumNights = data?.getListMeta?.listingData?.minNight ? data?.getListMeta?.listingData?.minNight : 0;

    const bookingStartDate = store?.getState()?.form?.BookingForm?.values?.startDate;
    const bookingEndDate = store?.getState()?.form?.BookingForm?.values?.endDate;

    const isStartDate = bookingStartDate ? moment(bookingStartDate).format('YYYY-MM-DD') : moment(startDate).format('YYYY-MM-DD');
    const isEndDate = bookingEndDate ? moment(bookingEndDate).format('YYYY-MM-DD') : moment(endDate).format('YYYY-MM-DD');

    await store.dispatch(getSpecialPricingData(listId, isStartDate, isEndDate));
    await store.dispatch(checkAvailability(listId, isStartDate, isEndDate, maximumNights, minimumNights));

  }

  if ('guests' in query) {
    guests = query?.guests;
    store.dispatch(setPersonalizedValues({ name: 'personCapacity', value: guests }));
  }

  if (data?.getListMeta) {
    if (!data.getListMeta.isPublished && !preview && !isAdmin) {
      renderNotFound();
      return;
    }
    listTitle = data?.getListMeta?.title;
    listDescription = data?.getListMeta?.description;
    lat = data?.getListMeta?.lat;
    lng = data?.getListMeta?.lng;
    if (data?.getListMeta?.listPhotos?.length > 0) {
      let coverImage = data?.getListMeta?.listPhotos?.find(o => o.id == data.getListMeta.coverPhoto);
      listPhoto = url + fileuploadDir.replace('.', "") + (coverImage ? coverImage.name : data.getListMeta.listPhotos[0].name);
    }
  } else {
    renderNotFound();
    return;
  }

  return {
    title: listTitle || title,
    description: listDescription || '',
    image: listPhoto || '',
    component:
      <Layout viewListingHeader={viewListingHeader} guests={guests} page={"viewlisting"}>
        <ViewListing
          title={title}
          preview={preview}
          lat={lat}
          lng={lng}
          listId={Number(listId)}
          startDate={startDate}
          endDate={endDate}
          baseCurrency={baseCurrency}
          guests={guests}
        />
      </Layout>,
  };
}
