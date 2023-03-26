export const amOrPm = (t) =>
    t.format('A').toLowerCase() === 'am' ? 'AM' : 'PM';

export function convertUTCDateToLocalDate(date) {
    var newDate = new Date(
        date.getTime() + date.getTimezoneOffset() * 60 * 1000
    );

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
}

export const getMonthName = (month) => {
    let months = ['January', 'February', 'March', 'April', "May", 'June', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    return months[month]
}
