import messages from '../../../../locale/messages';
import { inputDescLimit } from '../../../../helpers/textRestriction';

const validate = values => {

  const errors = {}

  if (!values.policyName) {
    errors.policyName = messages.required;
  } else if (values.policyName.trim() == '') {
    errors.policyName = messages.required;
  }

  if (!values.policyContent) {
    errors.policyContent = messages.required;
  } else if (values.policyContent.trim() == '') {
    errors.policyContent = messages.required;
  } else if (values?.policyContent?.length > inputDescLimit) {
    errors.policyContent = messages.descriptionFieldRestriction;
  }

  if ((values.priorDays == null || values.priorDays == undefined) || values.priorDays === '') {
    errors.priorDays = messages.required;
  } else if (values.priorDays && values.priorDays.toString().trim() == '') {
    errors.priorDays = messages.required;
  } else if (values.priorDays && (isNaN(values.priorDays) || (!/^[0-9]+$/.test(values.priorDays)))) {
    errors.priorDays = messages.emptySpace;
  }


  if ((values.accommodationPriorCheckIn == null || values.accommodationPriorCheckIn == undefined) || values.accommodationPriorCheckIn === '') {
    errors.accommodationPriorCheckIn = messages.required;
  } else if (values.accommodationPriorCheckIn && values.accommodationPriorCheckIn.toString().trim() == '') {
    errors.accommodationPriorCheckIn = messages.required;
  } else if (values.accommodationPriorCheckIn && values.accommodationPriorCheckIn.toString().trim() == '') {
    errors.accommodationPriorCheckIn = messages.required;
  } else if (values.accommodationPriorCheckIn && (isNaN(values.accommodationPriorCheckIn) || (!/^[0-9\.]+$/.test(values.accommodationPriorCheckIn)) || (parseInt(values.accommodationPriorCheckIn, 10) < 0) || (parseInt(values.accommodationPriorCheckIn, 10) > 100))) {
    errors.accommodationPriorCheckIn = messages.emptySpace;
  }

  if ((values.accommodationBeforeCheckIn == null || values.accommodationBeforeCheckIn == undefined) || values.accommodationBeforeCheckIn === '') {
    errors.accommodationBeforeCheckIn = messages.required;
  } else if (values.accommodationBeforeCheckIn && values.accommodationBeforeCheckIn.toString().trim() == '') {
    errors.accommodationBeforeCheckIn = messages.required;
  } else if (values.accommodationBeforeCheckIn && values.accommodationBeforeCheckIn.toString().trim() == '') {
    errors.accommodationBeforeCheckIn = messages.required;
  } else if (values.accommodationBeforeCheckIn && (isNaN(values.accommodationBeforeCheckIn) || (!/^[0-9\.]+$/.test(values.accommodationBeforeCheckIn)) || (parseInt(values.accommodationBeforeCheckIn, 10) < 0) || (parseInt(values.accommodationBeforeCheckIn, 10) > 100))) {
    errors.accommodationBeforeCheckIn = messages.emptySpace;
  }


  if ((values.accommodationDuringCheckIn == null || values.accommodationDuringCheckIn == undefined) || values.accommodationDuringCheckIn === '') {
    errors.accommodationDuringCheckIn = messages.required;
  } else if (values.accommodationDuringCheckIn && values.accommodationDuringCheckIn.toString().trim() == '') {
    errors.accommodationDuringCheckIn = messages.required;
  } else if (values.accommodationDuringCheckIn && values.accommodationDuringCheckIn.toString().trim() == '') {
    errors.accommodationDuringCheckIn = messages.required;
  } else if (values.accommodationDuringCheckIn && (isNaN(values.accommodationDuringCheckIn) || (!/^[0-9\.]+$/.test(values.accommodationDuringCheckIn)) || (parseInt(values.accommodationDuringCheckIn, 10) < 0) || (parseInt(values.accommodationDuringCheckIn, 10) > 100))) {
    errors.accommodationDuringCheckIn = messages.emptySpace;
  }


  if ((values.guestFeePriorCheckIn == null || values.guestFeePriorCheckIn == undefined) || values.guestFeePriorCheckIn === '') {
    errors.guestFeePriorCheckIn = messages.required;
  } else if (values.guestFeePriorCheckIn && values.guestFeePriorCheckIn.toString().trim() == '') {
    errors.guestFeePriorCheckIn = messages.required;
  } else if (values.guestFeePriorCheckIn && values.guestFeePriorCheckIn.toString().trim() == '') {
    errors.guestFeePriorCheckIn = messages.required;
  } else if (values.guestFeePriorCheckIn && (isNaN(values.guestFeePriorCheckIn) || (!/^[0-9\.]+$/.test(values.guestFeePriorCheckIn)) || (parseInt(values.guestFeePriorCheckIn, 10) < 0) || (parseInt(values.guestFeePriorCheckIn, 10) > 100))) {
    errors.guestFeePriorCheckIn = messages.emptySpace;
  }


  if ((values.guestFeeBeforeCheckIn == null || values.guestFeeBeforeCheckIn == undefined) || values.guestFeeBeforeCheckIn === '') {
    errors.guestFeeBeforeCheckIn = messages.required;
  } else if (values.guestFeeBeforeCheckIn && values.guestFeeBeforeCheckIn.toString().trim() == '') {
    errors.guestFeeBeforeCheckIn = messages.required;
  } else if (values.guestFeeBeforeCheckIn && values.guestFeeBeforeCheckIn.toString().trim() == '') {
    errors.guestFeeBeforeCheckIn = messages.required;
  } else if (values.guestFeeBeforeCheckIn && (isNaN(values.guestFeeBeforeCheckIn) || (!/^[0-9\.]+$/.test(values.guestFeeBeforeCheckIn)) || (parseInt(values.guestFeeBeforeCheckIn, 10) < 0) || (parseInt(values.guestFeeBeforeCheckIn, 10) > 100))) {
    errors.guestFeeBeforeCheckIn = messages.emptySpace;
  }

  if ((values.guestFeeDuringCheckIn == null || values.guestFeeDuringCheckIn == undefined) || values.guestFeeDuringCheckIn === '') {
    errors.guestFeeDuringCheckIn = messages.required;
  } else if (values.guestFeeDuringCheckIn && values.guestFeeDuringCheckIn.toString().trim() == '') {
    errors.guestFeeDuringCheckIn = messages.required;
  } else if (values.guestFeeDuringCheckIn && values.guestFeeDuringCheckIn.toString().trim() == '') {
    errors.guestFeeDuringCheckIn = messages.required;
  } else if (values.guestFeeDuringCheckIn && (isNaN(values.guestFeeDuringCheckIn) || (!/^[0-9\.]+$/.test(values.guestFeeDuringCheckIn)) || (parseInt(values.guestFeeDuringCheckIn, 10) < 0) || (parseInt(values.guestFeeDuringCheckIn, 10) > 100))) {
    errors.guestFeeDuringCheckIn = messages.emptySpace;
  }

  if ((values.hostFeePriorCheckIn == undefined) || values.hostFeePriorCheckIn === '') {
    errors.hostFeePriorCheckIn = messages.required;
  } else if (values.hostFeePriorCheckIn && values.hostFeePriorCheckIn.toString().trim() == '') {
    errors.hostFeePriorCheckIn = messages.required;
  } else if (values.hostFeePriorCheckIn && values.hostFeePriorCheckIn.toString().trim() == '') {
    errors.hostFeePriorCheckIn = messages.required;
  } else if (values.hostFeePriorCheckIn && (isNaN(values.hostFeePriorCheckIn) || (!/^[0-9\.]+$/.test(values.hostFeePriorCheckIn)) || (parseInt(values.hostFeePriorCheckIn, 10) < 0) || (parseInt(values.hostFeePriorCheckIn, 10) > 100))) {
    errors.hostFeePriorCheckIn = messages.emptySpace;
  }

  if ((values.hostFeeBeforeCheckIn == null || values.hostFeeBeforeCheckIn == undefined) || values.hostFeeBeforeCheckIn === '') {
    errors.hostFeeBeforeCheckIn = messages.required;
  } else if (values.hostFeeBeforeCheckIn && values.hostFeeBeforeCheckIn.toString().trim() == '') {
    errors.hostFeeBeforeCheckIn = messages.required;
  } else if (values.hostFeeBeforeCheckIn && values.hostFeeBeforeCheckIn.toString().trim() == '') {
    errors.hostFeeBeforeCheckIn = messages.required;
  } else if (values.hostFeeBeforeCheckIn && (isNaN(values.hostFeeBeforeCheckIn) || (!/^[0-9\.]+$/.test(values.hostFeeBeforeCheckIn)) || (parseInt(values.hostFeeBeforeCheckIn, 10) < 0) || (parseInt(values.hostFeeBeforeCheckIn, 10) > 100))) {
    errors.hostFeeBeforeCheckIn = messages.emptySpace;
  }

  if ((values.hostFeeDuringCheckIn == null || values.hostFeeDuringCheckIn == undefined) || values.hostFeeDuringCheckIn === '') {
    errors.hostFeeDuringCheckIn = messages.required;
  } else if (values.hostFeeDuringCheckIn && values.hostFeeDuringCheckIn.toString().trim() == '') {
    errors.hostFeeDuringCheckIn = messages.required;
  } else if (values.hostFeeDuringCheckIn && values.hostFeeDuringCheckIn.toString().trim() == '') {
    errors.hostFeeDuringCheckIn = messages.required;
  } else if (values.hostFeeDuringCheckIn && (isNaN(values.hostFeeDuringCheckIn) || (!/^[0-9\.]+$/.test(values.hostFeeDuringCheckIn)) || (parseInt(values.hostFeeDuringCheckIn, 10) < 0) || (parseInt(values.hostFeeDuringCheckIn, 10) > 100))) {
    errors.hostFeeDuringCheckIn = messages.emptySpace;
  }

  if ((values.nonRefundableNightsPriorCheckIn == null || values.nonRefundableNightsPriorCheckIn == undefined) || values.nonRefundableNightsPriorCheckIn === '') {
    errors.nonRefundableNightsPriorCheckIn = messages.required;
  } else if (values.nonRefundableNightsPriorCheckIn && values.nonRefundableNightsPriorCheckIn.toString().trim() == '') {
    errors.nonRefundableNightsPriorCheckIn = messages.required;
  } else if (values.nonRefundableNightsPriorCheckIn && values.nonRefundableNightsPriorCheckIn.toString().trim() == '') {
    errors.nonRefundableNightsPriorCheckIn = messages.required;
  } else if (values.nonRefundableNightsPriorCheckIn && (isNaN(values.nonRefundableNightsPriorCheckIn) || (!/^[0-9]+$/.test(values.nonRefundableNightsPriorCheckIn)) || (parseInt(values.nonRefundableNightsPriorCheckIn, 10) < 0))) {
    errors.nonRefundableNightsPriorCheckIn = messages.emptySpace;
  }

  if ((values.nonRefundableNightsBeforeCheckIn == null || values.nonRefundableNightsBeforeCheckIn == undefined) || values.nonRefundableNightsBeforeCheckIn === '') {
    errors.nonRefundableNightsBeforeCheckIn = messages.required;
  } else if (values.nonRefundableNightsBeforeCheckIn && values.nonRefundableNightsBeforeCheckIn.toString().trim() == '') {
    errors.nonRefundableNightsBeforeCheckIn = messages.required;
  } else if (values.nonRefundableNightsBeforeCheckIn && values.nonRefundableNightsBeforeCheckIn.toString().trim() == '') {
    errors.nonRefundableNightsBeforeCheckIn = messages.required;
  } else if (values.nonRefundableNightsBeforeCheckIn && (isNaN(values.nonRefundableNightsBeforeCheckIn) || (!/^[0-9]+$/.test(values.nonRefundableNightsBeforeCheckIn)) || (parseInt(values.nonRefundableNightsBeforeCheckIn, 10) < 0))) {
    errors.nonRefundableNightsBeforeCheckIn = messages.emptySpace;
  }

  if ((values.nonRefundableNightsDuringCheckIn == null || values.nonRefundableNightsDuringCheckIn == undefined) || values.nonRefundableNightsDuringCheckIn === '') {
    errors.nonRefundableNightsDuringCheckIn = messages.required;
  } else if (values.nonRefundableNightsDuringCheckIn && values.nonRefundableNightsDuringCheckIn.toString().trim() == '') {
    errors.nonRefundableNightsDuringCheckIn = messages.required;
  } else if (values.nonRefundableNightsDuringCheckIn && values.nonRefundableNightsDuringCheckIn.toString().trim() == '') {
    errors.nonRefundableNightsDuringCheckIn = messages.required;
  } else if (values.nonRefundableNightsDuringCheckIn && (isNaN(values.nonRefundableNightsDuringCheckIn) || (!/^[0-9]+$/.test(values.nonRefundableNightsDuringCheckIn)) || (parseInt(values.nonRefundableNightsDuringCheckIn, 10) < 0))) {
    errors.nonRefundableNightsDuringCheckIn = messages.emptySpace;
  }

  if (!values.subTitle) {
    errors.subTitle = messages.required;
  } else if (values.subTitle.trim() == '') {
    errors.subTitle = messages.required;
  } else if (values?.subTitle?.length > inputDescLimit) {
    errors.subTitle = messages.descriptionFieldRestriction;
  }

  if (!values.subContent) {
    errors.subContent = messages.required;
  } else if (values.subContent.trim() == '') {
    errors.subContent = messages.required;
  } else if (values?.subContent?.length > inputDescLimit) {
    errors.subContent = messages.descriptionFieldRestriction;
  }

  if (!values.content1) {
    errors.content1 = messages.required;
  } else if (values.content1.trim() == '') {
    errors.content1 = messages.required;
  } else if (values?.content1?.length > inputDescLimit) {
    errors.content1 = messages.descriptionFieldRestriction;

  }

  if (!values.content2) {
    errors.content2 = messages.required;
  } else if (values.content2.trim() == '') {
    errors.content2 = messages.required;
  } else if (values?.content2?.length > inputDescLimit) {
    errors.content2 = messages.descriptionFieldRestriction;
  }

  if (!values.content3) {
    errors.content3 = messages.required;
  } else if (values.content3.trim() == '') {
    errors.content3 = messages.required;
  } else if (values?.content3?.length > inputDescLimit) {
    errors.content3 = messages.descriptionFieldRestriction;
  }


  return errors
}

export default validate