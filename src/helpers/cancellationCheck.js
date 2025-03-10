//helper to check the type
export function typeCheck(interval, cancellation) {
    let type;

    if (interval > cancellation.priorDays) {
        type = 'priorCheckIn'
    } else if (interval <= cancellation.priorDays && interval > 0) {
        type = 'beforeCheckIn'
    } else {
        type = 'duringCheckIn'
    }

    return type
};


//helper to get the cancellation rule
export function cancellationRule(type, cancellationRuleObj, cancellation) {

    if (type == 'priorCheckIn') {
        cancellationRuleObj = {
            accomodation: cancellation.accommodationPriorCheckIn,
            guestFees: cancellation.guestFeePriorCheckIn,
            nonRefundableNights: cancellation.nonRefundableNightsPriorCheckIn,
            priorDays: cancellation.priorDays,
            policyName: cancellation.policyName,
            policyContent: cancellation.policyContent,
        }
    } else if (type == 'beforeCheckIn') {
        cancellationRuleObj = {
            accomodation: cancellation.accommodationBeforeCheckIn,
            guestFees: cancellation.guestFeeBeforeCheckIn,
            nonRefundableNights: cancellation.nonRefundableNightsBeforeCheckIn,
            priorDays: cancellation.priorDays,
            policyName: cancellation.policyName,
            policyContent: cancellation.policyContent,
        }
    } else {
        cancellationRuleObj = {
            accomodation: cancellation.accommodationDuringCheckIn,
            guestFees: cancellation.guestFeeDuringCheckIn,
            nonRefundableNights: cancellation.nonRefundableNightsDuringCheckIn,
            priorDays: cancellation.priorDays,
            policyName: cancellation.policyName,
            policyContent: cancellation.policyContent,
        }
    }

    return cancellationRuleObj;

}