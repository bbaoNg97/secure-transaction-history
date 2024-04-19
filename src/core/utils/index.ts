import moment from 'moment';

/**
 * Format a date to the format DD MMM YYYY.
 * @param date
 * @returns DDMMYYYY
 **/
export function formatDateToDDMMYYYY(isoDate: string) {
    const date = moment(isoDate);
    return date.format('DD MMM YYYY');
}

/**
* Format a date to the format DD MMM YYYY, hh:mm A.
* @param date
* @returns DD MMM YYYY, hh:mm A
**/
export function formatDate(isoDate: string) {
    const date = moment(isoDate);
    return date.format('DD MMM YYYY, hh:mm A');
}

export function formatAmountWithDecimals(amount: number) {
    return amount.toLocaleString('en-US', { minimumFractionDigits: 2 });
}