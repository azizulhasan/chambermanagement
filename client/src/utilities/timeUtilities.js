  export const amOrPm = (t) =>
    t.format('A').toLowerCase() === 'am' ? 'AM' : 'PM';