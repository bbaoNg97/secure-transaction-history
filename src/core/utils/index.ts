import moment from 'moment';

  /**
   * Format a date in ISO String to the format DD MMM YYYY.
   * @param isoDate date in ISO String
   * @returns DDMMYYYY
   **/
export function formatDateToDDMMYYYY(isoDate: string) {
    const date = moment(isoDate);
    return date.format('DD MMM YYYY');
}

/**
* Format a date in ISO String to the format DD MMM YYYY, HH:mm A.
* @param isoDate date in ISO String
* @returns DD MMM YYYY, HH:mm A
**/
export function formatDate(isoDate: string) {
    const date = moment(isoDate);
    return date.format('DD MMM YYYY, HH:mm A');
}

export function formatAmountWithDecimals(amount: number) {
    return amount.toLocaleString('en-US', { minimumFractionDigits: 2 });
}