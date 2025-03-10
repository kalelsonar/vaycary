export function becomeHostStepInfo(formPage) {
  let step;
  const step1Pages = [
    "room",
    "bedrooms",
    "bathrooms",
    "location",
    "map",
    "amenities",
    "spaces",
  ];

  const step2Pages = ["photos", "cover-photo", "description", "title"];
  const step3Pages = [
    "guest-requirements",
    "house-rules",
    "review-how-guests-book",
    "advance-notice",
    "booking-window",
    "min-max-nights",
    "calendar",
    "pricing",
    "discount",
    "booking-scenarios",
    "local-laws",
  ];

  if (step1Pages.indexOf(formPage) > -1) {
    step = 1;
  } else if (step2Pages.indexOf(formPage) > -1) {
    step = 2;
  } else if (step3Pages.indexOf(formPage) > -1) {
    step = 3;
  }
  return step;
}
