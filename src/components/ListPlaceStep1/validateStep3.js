import messages from '../../locale/messages';

const validateStep3 = values => {

	const errors = {};

	if (Number(values.checkInStart) >= Number(values.checkInEnd)) errors.checkInStart = messages.advanceNoticeError;

	if (Number(values.checkInStart) < 8 || Number(values.checkInStart) > 25) errors.checkInStart = messages.advanceNoticeInvalid;

	if (Number(values.checkInEnd) < 9 || Number(values.checkInEnd) > 26) errors.checkInEnd = messages.advanceNoticeInvalid;

	if (!values.basePrice) errors.basePrice = messages.required;

	if (isNaN(values.basePrice) || (!/^[0-9\.]+$/.test(values.basePrice)) || (parseFloat(values.basePrice, 10) < 1)) errors.basePrice = messages.basePriceInvalid;

	if (values?.basePrice?.length > 15) {
		errors.basePrice = messages.exceedLimit;
	}

	if (values.cleaningPrice) {
		if (isNaN(values.cleaningPrice) || (!/^[0-9\.]+$/.test(values.cleaningPrice)) || (parseInt(values.cleaningPrice, 10) < 0)) errors.cleaningPrice = messages.cleaningPriceInvalid;
	}
	if (values?.cleaningPrice?.length > 15) {
		errors.cleaningPrice = messages.exceedLimit;
	}

	if (values.tax) {
		if (isNaN(values.tax) || (!/^[0-9]+$/.test(values.tax)) || (parseInt(values.tax, 10) < 0) || parseInt(values.tax, 10) > 99) errors.tax = messages.taxInvalid;
	}

	if (values.weeklyDiscount) {
		if (isNaN(values.weeklyDiscount) || (!/^[0-9]+$/.test(values.weeklyDiscount)) || (parseInt(values.weeklyDiscount, 10) < 0) || parseInt(values.weeklyDiscount, 10) > 99) errors.weeklyDiscount = messages.discountInvalid;
	}

	if (values?.weeklyDiscount?.length > 2) {
		errors.weeklyDiscount = messages.discountExceedLimit;
	}

	if (values.monthlyDiscount) {
		if (isNaN(values.monthlyDiscount) || (!/^[0-9]+$/.test(values.monthlyDiscount)) || (parseInt(values.monthlyDiscount, 10) < 0) || parseInt(values.monthlyDiscount, 10) > 99) errors.monthlyDiscount = messages.discountInvalid;
	}
	if (values?.monthlyDiscount?.length > 2) {
		errors.monthlyDiscount = messages.discountExceedLimit;
	}

	if (Number(values.maxNight) > 0) {
		if (values.minNight > values.maxNight) errors.minNight = messages.tripLengthError1;
	}

	if (values.taxRate) {
		if (isNaN(values.taxRate) || (!/^[0-9\.]+$/.test(values.taxRate)) || (parseInt(values.taxRate, 10) < 0) || parseInt(values.taxRate, 10) > 99) errors.taxRate = messages.taxRateInvalidError;
	}

	return errors;
}

export default validateStep3;
