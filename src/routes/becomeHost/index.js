import React from 'react';

import NewListLayout from '../../components/Layout/NewListLayout';
import ListLayout from '../../components/Layout/ListLayout';
import BecomeHost from './BecomeHost';
import NotFound from '../notFound/NotFound';

import { checkListing } from '../../actions/Listing/checkListing';
import { getSideMenu } from '../../actions/siteadmin/getSideMenu';

import { getListingSteps, resetListingSteps } from '../../actions/getListingSteps';
import { getListingFields } from '../../actions/getListingFields';
import { getListingStepTwo } from '../../actions/Listing/getListingStepTwo';

import { restrictUrls } from '../../helpers/adminPrivileges';
import { becomeHostStepInfo } from '../../helpers/BecomeAHost/becomeAHostHeader';

import messages from '../../locale/messages';

export default async function action({ params, store, intl, query }) {
  
  const title = intl?.formatMessage(messages.becomeAHost);
  const isAuthenticated = store.getState().runtime.isAuthenticated;
  const isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  const listingFields = store.getState().listingFields.data;
  const listingSteps = store.getState().location.listingSteps;
  const initialValuesLoaded = store.getState().location.initialValuesLoaded;
  const baseCurrency = store.getState().currency.base;
  const listId = params.listId;
  const formPage = params.formPage;
  const formBaseURI = "/become-a-host/";

  let adminPrivileges, mode;
  adminPrivileges = store.getState().adminPrevileges.privileges && store.getState().adminPrevileges.privileges.privileges;

  await store.dispatch(getSideMenu());

  if ("mode" in query) {
    if (query.mode === "new") {
      mode = query.mode;
    }
  }

  if (!isAuthenticated && !isAdminAuthenticated) {
    return { redirect: '/login' };
  }

  // Admin restriction
  if (isAdminAuthenticated && !restrictUrls('/become-a-host/', adminPrivileges)) {
    return { redirect: '/siteadmin' };
  }

  // Fetch all settings fields 
  if (listingFields === undefined) {
    store.dispatch(getListingFields());
  }

  if (listId != undefined && !isNaN(listId)) {
    var response;
    //checkListing
    await store.dispatch(checkListing(listId, 'listing')).then(function (res) {
      response = isAdminAuthenticated ? true : res;
    });

    if (response === true) {
      // Fetch All steps status
      if (listingSteps === undefined) {
        store.dispatch(getListingSteps(listId));
      } else {
        // Fetch All steps status for another list
        if (listingSteps.listId != listId) {
          store.dispatch(getListingSteps(listId));
        } else if (formPage && formPage == 'home') {
          store.dispatch(getListingSteps(listId));
        }
      }
      store.dispatch(getListingStepTwo(listId));
    } else {
      return {
        title,
        component: <NewListLayout><NotFound /></NewListLayout>
      }
    }
  } else {
    if (initialValuesLoaded != true || (mode && mode == 'new')) {
      await store.dispatch(resetListingSteps());
      await store.dispatch(getListingSteps());
    }
  }

  if (listId  && !isNaN(listId)) {
    let step = becomeHostStepInfo(formPage);
    if (step) {
      return {
        title,
        component: <ListLayout
          listId={Number(listId)}
          formPage={formPage}
          formBaseURI={formBaseURI}
          step={step}
        >
          <BecomeHost
            listId={Number(listId)}
            title={title}
            formPage={formPage}
            formBaseURI={formBaseURI}
            mode={mode}
            baseCurrency={baseCurrency}
            step={step}
          />
        </ListLayout>,
      };
    }
  }

  return {
    title,
    component: <NewListLayout>
      <BecomeHost
        listId={Number(listId)}
        title={title}
        formPage={formPage}
        formBaseURI={formBaseURI}
        mode={mode}
        baseCurrency={baseCurrency}
      />
    </NewListLayout>
  };
}
