// Redux Form
import { SubmissionError } from 'redux-form';

// Fetch request
import fetch from '../../core/fetch';

// Redux Action
import { getListingDataStep3 } from '../../actions/getListingDataStep3';
import { manageListingSteps } from '../../actions/manageListingSteps';
import { setLoaderStart, setLoaderComplete } from '../../actions/loader/loader';

// For Redirect
import history from '../../core/history';
// Locale
import messages from '../../locale/messages';

async function updateStep3(values, dispatch) {

  let weeklyDiscount = values?.weeklyDiscount || 0;
  let monthlyDiscount = values?.monthlyDiscount || 0;
  let cleaningPrice = values?.cleaningPrice || 0;
  let tax = values?.tax || 0;


  let id, houseRules, bookingNoticeTime, checkInStart, checkInEnd, maxDaysNotice, minNight, maxNight, basePrice, currency, blockedDates, bookingType, cancellationPolicy;

  id = values?.id;
  houseRules = values?.houseRules;
  bookingNoticeTime = values?.bookingNoticeTime;
  checkInStart = values?.checkInStart;
  checkInEnd = values?.checkInEnd;
  maxDaysNotice = values?.maxDaysNotice;
  minNight = values?.minNight; 
  maxNight = values?.maxNight;
  basePrice = values?.basePrice;
  currency = values?.currency;
  blockedDates = values?.blockedDates;
  bookingType = values?.bookingType;
  cancellationPolicy = values?.cancellationPolicy;

  let variables = Object.assign({}, {
    weeklyDiscount, monthlyDiscount, cleaningPrice, tax, id, houseRules, bookingNoticeTime,
    checkInStart, checkInEnd, maxDaysNotice, minNight, maxNight, basePrice, currency, blockedDates, bookingType,
    cancellationPolicy
  });
  
  dispatch(setLoaderStart('updateListing'));
  const query = `query (
  	$id: Int,
    $houseRules: [Int],
    $bookingNoticeTime:String,
    $checkInStart:String,
    $checkInEnd:String,
    $maxDaysNotice:String,
    $minNight:Int,
    $maxNight:Int,
    $basePrice:Float,
    $cleaningPrice:Float,
    $tax:Float,
    $currency:String,
    $weeklyDiscount:Int,
    $monthlyDiscount:Int,
    $blockedDates: [String],
    $bookingType: String!,
    $cancellationPolicy: Int,
  ) {
      updateListingStep3 (
        id: $id,
        houseRules: $houseRules,
        bookingNoticeTime:$bookingNoticeTime,
        checkInStart:$checkInStart,
        checkInEnd:$checkInEnd,
        maxDaysNotice:$maxDaysNotice,
        minNight:$minNight,
        maxNight:$maxNight,
        basePrice:$basePrice,
        cleaningPrice:$cleaningPrice,
        tax:$tax,
        currency:$currency,
        weeklyDiscount:$weeklyDiscount,
        monthlyDiscount:$monthlyDiscount,
        blockedDates: $blockedDates,
        bookingType: $bookingType,
        cancellationPolicy: $cancellationPolicy
      ) {
        status
      }
    }`;

  const resp = await fetch('/graphql', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables
    }),
    credentials: 'include'
  });

  const { data } = await resp.json();

  if (data?.updateListingStep3 != undefined) {
    if (data?.updateListingStep3.status == "success") {
      await dispatch(manageListingSteps(values.id, 3));
      history.push('/become-a-host/' + values.id + '/home');
      await dispatch(getListingDataStep3(values.id));
      await dispatch(setLoaderComplete('updateListing'));
    } else if (data?.updateListingStep3.status == "notLoggedIn") {
      dispatch(setLoaderComplete('updateListing'));
      throw new SubmissionError({ _error: messages.notLoggedIn });
    } else {
      dispatch(setLoaderComplete('updateListing'));
      throw new SubmissionError({ _error: messages.somethingWentWrong });
    }
  } else {
    dispatch(setLoaderComplete('updateListing'));
    throw new SubmissionError({ _error: messages.somethingWentWrong });
  }

}

export default updateStep3;
