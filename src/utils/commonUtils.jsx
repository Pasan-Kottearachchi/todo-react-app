import moment from 'moment';

export const formatDateTime = (date) => {
    return date && moment(date).local().format('DD MMM YYYY hh:mm A');
};