export const removeFromFrontCSSAssets = [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
    process.env.REACT_APP_URL + '/assets/dashboard/css/styles.css',
    process.env.REACT_APP_URL + '/assets/dashboard/css/custom.css',
];

export const removeFromFrontJsAssets = [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js',
    process.env.REACT_APP_URL +
        '/assets/dashboard/vendor/bootstrap/js/bootstrap.bundle.min.js',
    process.env.REACT_APP_URL + '/assets/dashboard/js/scripts.js',
];

export const removeFromDashboardCSSAssets = [
    'https://unicons.iconscout.com/release/v4.0.0/css/line.css',
    process.env.REACT_APP_URL + '/assets/front/css/tailwind.css',
    process.env.REACT_APP_URL + '/assets/front/css/login.css',
    process.env.REACT_APP_URL + '/assets/front/css/slider.css',
    process.env.REACT_APP_URL + '/assets/front/css/carousel.css',
    process.env.REACT_APP_URL + '/assets/front/css/professional.css',
    process.env.REACT_APP_URL + '/assets/front/css/footer.css',
];

export const removeFromDashboardJsAssets = [
    'https://www.gstatic.com/recaptcha/releases/8G7OPK94bhCRbT0VqyEVpQNj/recaptcha__en.js',
    'https://www.google.com/recaptcha/api.js?onload=onloadcallback&render=explicit',
];

// options to pass in "getCurrentPosition" functions
export const options = {
    enableHighAccuracy: true,
    timeout: 3000,
    maximumAge: 0,
};

export const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
export const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];
