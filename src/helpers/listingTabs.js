import messages from "../locale/messages";

import iconOne from '/public/SiteIcons/hostStepIcons/placeType.svg';
import iconTwo from '/public/SiteIcons/hostStepIcons/bed.svg';
import iconThree from '/public/SiteIcons/hostStepIcons/location.svg';
import iconFour from '/public/SiteIcons/hostStepIcons/amenities.svg';
import iconFive from '/public/SiteIcons/hostStepIcons/sharedSpaces.svg';
import iconSix from '/public/SiteIcons/hostStepIcons/photos.svg';
import iconSeven from '/public/SiteIcons/hostStepIcons/nameDesc.svg';
import iconEight from '/public/SiteIcons/hostStepIcons/houseRules.svg';
import iconNine from '/public/SiteIcons/hostStepIcons/notification.svg';
import iconTen from '/public/SiteIcons/hostStepIcons/pricing.svg';
import iconEleven from '/public/SiteIcons/hostStepIcons/discount.svg';
import iconTwelve from '/public/SiteIcons/hostStepIcons/availability.svg';
import iconThirteen from '/public/SiteIcons/hostStepIcons/calendar.svg'
import iconFourteen from '/public/SiteIcons/hostStepIcons/guestRequirement.svg'
import iconFifteen from '/public/SiteIcons/hostStepIcons/bookingType.svg'
import iconSixteen from '/public/SiteIcons/hostStepIcons/law.svg'

let tabBarStep1 = [
    {
        pathname: "room",
        icon: iconOne,
        text: messages.tabPlaceType
    },
    {
        pathname: "bedrooms",
        icon: iconTwo,
        text: messages.bedrooms
    },
    {
        pathname: "map",
        activePaths: ["map", "location"],
        icon: iconThree,
        text: messages.location
    },
    {
        pathname: "amenities",
        icon: iconFour,
        text: messages.aminities
    },
    {
        pathname: "spaces",
        icon: iconFive,
        text: messages.sharedSpaces
    }
];

let tabBarStep2 = [
    {
        pathname: "photos",
        icon: iconSix,
        text: messages.photos
    },
    {
        pathname: "description",
        icon: iconSeven,
        text: messages.descriptionAdminLabel
    },
];

let tabBarStep3 = [
    {
        pathname: "house-rules",
        icon: iconEight,
        text: messages.houseRules
    },
    {
        pathname: "advance-notice",
        icon: iconNine,
        text: messages.advanceNotice
    },
    {
        pathname: "pricing",
        icon: iconTen,
        text: messages.tabPricing
    },
    {
        pathname: "discount",
        icon: iconEleven,
        text: messages.tabDiscount
    },
    {
        pathname: "min-max-nights",
        icon: iconTwelve,
        text: messages.minMaxPanel
    },
    {
        pathname: "calendar",
        icon: iconThirteen,
        text: messages.tabCalendar
    },
    {
        pathname: "guest-requirements",
        icon: iconFourteen,
        text: messages.guestRequirements
    },
    {
        pathname: "booking-scenarios",
        icon: iconFifteen,
        text: messages.bookingType
    },
    {
        pathname: "local-laws",
        icon: iconSixteen,
        text: messages.tabLocalLaws
    }
]

let listingTabs = {
    1: tabBarStep1,
    2: tabBarStep2,
    3: tabBarStep3
  }
  
  const activeTabs = (step, listingSteps) => {
    if (listingSteps && listingSteps.step1 === 'completed' && step == 1) {
      return tabBarStep1
    } else if (listingSteps && listingSteps.step2 === 'completed' && step == 2) {
      return tabBarStep2
    } else if (listingSteps && listingSteps.step4 === 'completed' && step == 3) {
      return tabBarStep3
    } else {
      return [];
    }
  };
  
  const activeTabIndex = ((pathname, step) => {
    pathname = ["map", "location"].includes(pathname) ? "map" : pathname
    return listingTabs[step]?.findIndex(tab => tab.pathname == pathname)
  });
  
  export {
    activeTabs,
    activeTabIndex
  };
  