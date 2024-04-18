import moment from 'moment';

export function convertToDDMMMYYYY(isoDate: string){
    const date = moment(isoDate);
    return date.format('DD MMM YYYY');
}

export function formatAmountWithCommas(amount:number){
    return amount.toLocaleString();
}