import {
    days,
    months,
    options,
    removeFromDashboardCSSAssets,
    removeFromDashboardJsAssets,
    removeFromFrontCSSAssets,
    removeFromFrontJsAssets,
} from './data';
import { cancelConfirm, getSwalOptions, ctxSwal } from './sweetAlert';
import { FormValue } from './FormValue';

const getAllScripts = () => {
    let allScripts = Object.values(document.getElementsByTagName('script'));
    let scriptArr = [];
    for (let i in allScripts) {
        scriptArr.push(allScripts[i].src);
    }

    return scriptArr;
};
/**
 * Load all scripts.
 * @param {url} script url
 */
export const addScripts = (scripts) => {
    let scriptArr = getAllScripts();
    let currentScripts = [];
    [...scripts].forEach((script) => {
        let tag = document.createElement('script');
        tag.async = true;
        tag.src = script;
        /**
         * If link starts with http means this is an extarnal url add this as it is.
         * Else add with the url orgin
         */
        if (script.slice(0, 4) !== 'http') {
            script = process.env.REACT_APP_URL + script;
        }
        if (!scriptArr.includes(script) && !currentScripts.includes(scripts)) {
            currentScripts.push(script);
            document.body.appendChild(tag);
        }
    });
    removeJsFromDOM(scriptArr);
};

const getAllCSSFiles = () => {
    let allCSS = Object.values(document.getElementsByTagName('link'));
    let cssArr = [];
    for (let i in allCSS) {
        if (allCSS[i].rel === 'stylesheet') {
            cssArr.push(allCSS[i].href);
        }
    }
    return cssArr;
};
/**
 * Load all css.
 * @param {url} script url
 */
export const addCSS = (css) => {
    let previousCSSFiles = getAllCSSFiles();
    let currentCSSFiles = [];
    [...css].forEach((script) => {
        let tag = document.createElement('link');
        tag.rel = 'stylesheet';
        tag.href = script;
        /**
         * If link starts with http means this is an extarnal url add this as it is.
         * Else add with the url orgin
         */
        if (script.slice(0, 4) !== 'http') {
            script = window.location.origin + script;
        }
        if (
            !previousCSSFiles.includes(script) &&
            !currentCSSFiles.includes(script)
        ) {
            document.head.appendChild(tag);
            currentCSSFiles.push(script);
        }
    });
    removeCSSFromDOM(previousCSSFiles);
};

export function removeCSSFromDOM(cssFilesArr) {
    let pathArr = window.location.pathname;
    let arr = [];
    if (pathArr.includes('dashboard')) {
        cssFilesArr.map((cssFile) => {
            if (!removeFromDashboardCSSAssets.includes(cssFile)) {
                arr.push(cssFile);
            } else {
                let link = document.querySelector(
                    'link[href="' +
                        cssFile.replace(process.env.REACT_APP_URL, '') +
                        '"]'
                );
                if (link) link.remove();
            }
        });
    } else {
        cssFilesArr.map((cssFile) => {
            if (!removeFromFrontCSSAssets.includes(cssFile)) {
                arr.push(cssFile);
            } else {
                // .replace(process.env.REACT_APP_URL, '')
                let link = document.querySelector(
                    'link[href="' +
                        cssFile.replace(process.env.REACT_APP_URL, '') +
                        '"]'
                );
                if (link) link.remove();
            }
        });
    }
}

export function removeJsFromDOM(jsFiles) {
    let pathArr = window.location.pathname;
    let arr = [];
    if (pathArr.includes('dashboard')) {
        jsFiles.map((jsFile) => {
            if (!removeFromDashboardJsAssets.includes(jsFile)) {
                arr.push(jsFile);
            } else {
                let script = document.querySelector(
                    'script[src="' + jsFile + '"]'
                );
                if (script) script.remove();
            }
        });
    } else {
        jsFiles.map((jsFile) => {
            if (!removeFromFrontJsAssets.includes(jsFile)) {
                arr.push(jsFile);
            } else {
                // .replace(process.env.REACT_APP_URL, '')
                let script = document.querySelector(
                    'script[src="' +
                        jsFile.replace(process.env.REACT_APP_URL, '') +
                        '"]'
                );
                if (script) script.remove();
            }
        });
    }
}

/**
 * Post data method.
 * @param {url} url api url
 * @param {method} method request type
 * @returns
 */
export const postData = async (url = '', data = {}) => {
    // Default options are marked with *

    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: data, // body data type must match "Content-Type" header
    });
    const responseData = await response.json(); // parses JSON response into native JavaScript objects

    return responseData;
};

/**
 * Post data method.
 * @param {url} url api url
 * @param {method} method request type
 * @returns
 */
export const postWithoutImage = async (url = '', data = {}) => {
    // Default options are marked with *
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const responseData = await response.json(); // parses JSON response into native JavaScript objects

    return responseData;
};

/**
 * get data methon
 * @param {url} url api url
 * @returns  data mixed.
 */
export const getData = async (url = '') => {
    const response = await fetch(url);
    const data = await response.json();
    return data; // parses JSON response into native JavaScript objects
};

let lastUrl = window.location.pathname;
let componentName = '';

new MutationObserver(() => {
    const url = window.location.pathname;
    if (url !== lastUrl) {
        lastUrl = url;
        componentName = getName(lastUrl);
    }
}).observe(document, { subtree: true, childList: true });

/**
 * Get component name
 */
export const getComponentName = () => {
    return componentName ? componentName : getName(window.location.pathname);
};

export const sliceComponentName = () => {
    let component = getComponentName().replace(/\s/g, '').trim().split('/');

    return component[component.length - 1];
};

export const getName = (lastUrl = window.location.pathname) => {
    let urlArr = lastUrl.split('/');
    let componentArr = '';
    if (urlArr[1] !== '') {
        for (let i = 1; i < urlArr.length; i++) {
            let url = urlArr[i];
            componentArr += ' / ' + url[0].toUpperCase() + '' + url.slice(1);
        }
    }
    return componentArr;
};

/**
 *
 * @param {coockie_name} name
 * @param {coockie_value} value
 * @param {exprires} days
 */
function setCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

/**
 *
 * @param {coockie_name} name
 * @returns
 */
function getCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}
/**
 *
 * @param {coockie_name} name
 */
function eraseCookie(name) {
    document.cookie =
        name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

var errorCallback = function (error) {
    var errorMessage = 'Unknown error';
    switch (error.code) {
        case 1:
            errorMessage = 'Permission denied';
            break;
        case 2:
            errorMessage = 'Position unavailable';
            break;
        case 3:
            errorMessage = 'Timeout';
            break;
        default:
            errorMessage = 'Timeout';
    }
    console.log(errorMessage);
};

/**
 * get location data of user.
 * @param {window.navigator} navigator
 */
export const setUserAddress = (navigator) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            getLocationData,
            errorCallback,
            options
        );
    } else {
        throw new Error('Geolocation is not supported by this browser.');
    }
};

/**
 * Current location data
 * @param {position} position
 */
let userAddress = {};
function getLocationData(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var request = new XMLHttpRequest();

    var method = 'GET';
    var url =
        'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' +
        latitude +
        '&longitude=' +
        longitude +
        '&localityLanguage=en';
    var async = true;

    request.open(method, url, async);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            let userData = JSON.parse(request.responseText);
            userAddress['continent'] = userData.continent;
            userAddress['countryName'] = userData.countryName;
            userAddress['locality'] = userData.locality;
            userAddress['principalSubdivision'] = userData.principalSubdivision;
            userAddress['city'] =
                userData.localityInfo.administrative[1].isoName;
        }
    };

    request.send();
}
/**
 * Get user browser data. window.navigator object's data. loop throw the object and get all string
 * and boolean data
 * @param {navigator} navigator
 * @returns
 */
export const getUserBrowserData = (navigator) => {
    let browserData = {};
    for (var key in navigator) {
        if (
            typeof navigator[key] === 'string' ||
            typeof navigator[key] === 'boolean'
        ) {
            browserData[key] = navigator[key];
        }
    }

    return browserData;
};
/**
 * city, country, division, locality etc.
 * @returns user location data
 */
export const getUserAddress = () => {
    return userAddress;
};
/**
 * set sessionStorage
 * @param {object} data data object with key and value
 */
export const setSessionStorage = (data) => {
    if (typeof data === 'object') {
        Object.keys(data).map((key) => {
            if (data[key]) {
                window.sessionStorage.setItem(key, data[key]);
            }
        });
    }
};

export const isValidJSON = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};
/**
 *
 * @param {array} keys session storage keys is array.
 */
export const getSessionStorage = (keys = []) => {
    let sessionData = {};
    if (Array.isArray(keys) && keys.length) {
        for (let i = 0; i < keys.length; i++) {
            let data = window.sessionStorage.getItem(keys[i]);
            if (data !== null && isValidJSON(data)) {
                sessionData[keys[i]] = JSON.parse(data);
            } else if (data !== null) {
                sessionData[keys[i]] = data;
                console.log({ else: data });
            }
        }
    } else {
        let session = window.sessionStorage;
        for (let key in session) {
            let keyData = window.sessionStorage.getItem(key);
            if (keyData !== null && isValidJSON(keyData)) {
                sessionData[key] = JSON.parse(keyData);
            } else if (keyData !== null) {
                sessionData[key] = keyData;
            }
        }
    }
    return sessionData;
};

/**
 *
 * @param {array} keys session storage keys is array.
 */
// export const getSessionStorage = (keys = []) => {
//     let sessionData = {};
//     if (typeof keys === 'array' && keys.length) {
//         for (let i = 0; i < keys.length; i++) {
//             let data = window.sessionStorage.getItem(keys[i]);
//             if (isValidJSON(data)) {
//                 sessionData[keys[i]] = JSON.parse(data)
//             } else {
//                 sessionData[keys[i]] = data;
//             }
//         }
//     } else {
//         let session = window.sessionStorage;
//         for (let key in session) {
//             let keyData = window.sessionStorage.getItem(key);
//             console.log(keyData)
//             if (isValidJSON(keyData)) {
//                 sessionData[key] = JSON.parse(keyData)
//             } else if (keyData) {
//                 sessionData[key] = keyData;
//             }
//         }
//     }
//     return sessionData;

// };

export const saveSessionData = (sessionKey = 'test', data = null) => {
    let prevData = window.sessionStorage.getItem(sessionKey);
    let newData = null;
    let typeofData = Array.isArray(data)
        ? 'array'
        : typeof data === 'object'
        ? 'object'
        : 'all';
    switch (typeofData) {
        case 'object':
            newData = JSON.stringify(data);
            break;
        case 'array':
            if (prevData && prevData !== undefined) {
                prevData = JSON.parse(prevData);
                newData = prevData.concat(data);
            } else {
                newData = data;
            }
            newData = JSON.stringify(newData);
            break;
        default:
            newData = data;
    }
    window.sessionStorage.setItem(sessionKey, newData);
};
/**
 * Set localStorage
 * @param {object} data data object with key and value
 */
export const setLocalStorage = (data) => {
    if (
        data === 'undefined' ||
        data === null ||
        data === '' ||
        Array.isArray(data) ||
        typeof data === 'string' ||
        (typeof data === 'object' && Object.keys(data).length === 0)
    )
        return;
    Object.keys(data).map((key) => {
        if (data[key]) {
            window.localStorage.setItem(key, data[key]);
        }
    });

    let storageData = {};
    let storage = window.localStorage;
    for (let key in storage) {
        if (data.hasOwnProperty(key)) {
            let keyData = window.localStorage.getItem(key);
            if (keyData) {
                storageData[key] = keyData;
            }
        }
    }

    return storageData;
};

/**
 *
 * @param {array} keys local storage keys is array.
 */
export const getLocalStorage = (keys = []) => {
    let localData = {};
    if (typeof keys === 'array' && keys.length) {
        for (let i = 0; i < keys.length; i++) {
            localData[keys[i]] = window.localStorage.getItem(keys[i]);
        }
    } else {
        let storage = window.localStorage;
        for (let key in storage) {
            let keyData = window.localStorage.getItem(key);
            if (keyData) {
                localData[key] = keyData;
            }
        }
    }

    return localData;
};

export const getRgisteredUser = () => {
    return {
        session: getSessionStorage()['user']
            ? JSON.parse(getSessionStorage()['user'])
            : null,
        storage: getLocalStorage()['user']
            ? JSON.parse(getLocalStorage()['user'])
            : null,
    };
};

export const authenTicateUser = (loggedInUser) => {
    if (!loggedInUser) return false;

    if (!loggedInUser.session && !loggedInUser.storage) {
        return false;
    }

    return true;
};

export const isAdmin = (loggedInUser) => {
    return loggedInUser !== undefined && loggedInUser.userRole === 'ADMIN';
};

export const getUserName = () => {
    return window.sessionStorage.getItem('user')
        ? JSON.parse(getSessionStorage()['user'])['name']
        : window.localStorage.getItem('user')
        ? window.localStorage.getItem('user')['storage']
        : '';
};
export const logout = () => {
    window.localStorage.removeItem('user');
    window.sessionStorage.removeItem('user');

    window.location.href = process.env.REACT_APP_URL + '/';
};

export const hideMenuOnScroll = () => {
    if (window.innerWidth > 991) {
        window.onscroll = function () {
            if (window.pageYOffset >= 1800) {
                document.getElementById('header').style.display = 'none';
                document.getElementById('header').className = '';
            } else {
                document.getElementById('header').style.display = 'block';
                document.getElementById('header').className =
                    'd-flex flex-column justify-content-center';
            }
        };
    }
};

export const getFormattedDate = () => {
    var d = new Date();
    var day = days[d.getDay()];
    var hr = d.getHours();
    var min = d.getMinutes();
    if (min < 10) {
        min = '0' + min;
    }
    var ampm = 'am';
    if (hr > 12) {
        hr -= 12;
        ampm = 'pm';
    }
    var date = d.getDate();
    var month = months[d.getMonth()];
    var year = d.getFullYear();
    var x = document.getElementById('time');

    return (
        day +
        ' ' +
        hr +
        ':' +
        min +
        ampm +
        ' ' +
        date +
        ' ' +
        month +
        ' ' +
        year
    );
};

/**
 * Get ifram content
 */
export const getIframeContent = (textareaIndex) => {
    let textareaId = document
        .getElementsByTagName('textarea')
        [textareaIndex].getAttribute('id');
    let iframeContent = document.getElementById(textareaId + '_ifr')
        .contentWindow.document.body.innerHTML;

    return iframeContent;
};

export function decideTotalSlides() {
    let srWidth = window.screen.width;
    let slideWidth = 100;
    let slideInARow = 1;
    if (srWidth < 575) {
        slideWidth = parseInt(srWidth / 1);
        slideInARow = 1;
    } else if (srWidth >= 575 && srWidth < 768) {
        slideWidth = Math.ceil(srWidth / 3);
        slideInARow = 3;
    } else if (srWidth >= 768 && srWidth < 992) {
        slideWidth = Math.ceil(srWidth / 4);
        slideInARow = 4;
    } else {
        slideWidth = Math.ceil(srWidth / 5);
        slideInARow = 5;
    }
    return {
        perSlideWidth: slideWidth + 'px',
        itemsInSingleSlide: fillArray(slideInARow),
    };
}

export function fillArray(length) {
    let data = [];
    for (let i = 0; i < length; i++) {
        data.push(i);
    }
    return data;
}

///////////////////////////////////////////////////////////////////////////////////////////
//																						 //
// START DOM RELATED WORK															     //
//																						 //
///////////////////////////////////////////////////////////////////////////////////////////

/**
 * Get all siblings of an element
 * @param element
 * @param parent
 * @returns {*[]}
 */
export function getAllSiblings(element, parent) {
    const children = [...parent.children];
    return children.filter((child) => child !== element);
}

/**
 * Toggle class name
 * @param element
 * @param parent
 * @param classes
 * @param activeClass
 */
export function toggleClassNames(element, parent, classes, activeClass = '') {
    let siblings = getAllSiblings(element, parent);
    removeClassNames(siblings, classes);
    if (activeClass) {
        element.classList.add('ctx-isActive');
    }
}

/**
 * Remove class name from an element
 * @param elements Array
 * @param classes Array
 */
export function removeClassNames(elements, classes) {
    if (elements.length) {
        elements.map((element, index) => {
            classes.map((className, i) => {
                if (element.classList.contains(className)) {
                    element.classList.remove(className);
                }
            });
        });
    }
}

/**
 * Add class name from an element
 * @param elements Array
 * @param classes Array
 */
export function addClassNames(elements, classes) {
    if (elements.length) {
        elements.map((element, index) => {
            classes.map((className, i) => {
                if (!element.classList.contains(className)) {
                    element.classList.add(className);
                }
            });
        });
    }
}

/**
 *
 * @param elem
 * @param toggleElementIndex
 * @return void
 */
export const buttonGroupClick = (elem, toggleElementIndex = 0) => {
    let sibling = elem.target.parentNode.parentNode;
    if (toggleElementIndex) {
        for (let i = 0; i < toggleElementIndex; i++) {
            sibling = sibling.nextSibling;
        }
        if ('pattern' === elem.target.value) {
            removeClassNames([sibling.lastChild], ['ctx-hidden']);
            addClassNames([sibling.firstChild], ['ctx-hidden']);
            if (
                sibling.lastChild.getAttribute('name') !==
                'default_value_pattern'
            ) {
                sibling.lastChild.setAttribute('required', true);
            }
            sibling.firstChild.removeAttribute('required');
        } else if ('attribute' === elem.target.value) {
            removeClassNames([sibling.firstChild], ['ctx-hidden']);
            addClassNames([sibling.lastChild], ['ctx-hidden']);
            sibling.firstChild.setAttribute('required', true);
            sibling.lastChild.removeAttribute('required');
        }
    }
    toggleClassNames(
        elem.target,
        elem.target.parentNode,
        ['ctx-isActive'],
        'ctx-isActive'
    );
};

/**
 * If any arguments is true then prefix will be added.
 * Else if any argument is Object then object type should be {prefix: ''} . for overriding current prefix
 * @returns {string|*}
 */
export function classNames() {
    let prefix = '';
    let isAddPrefix = true;
    let classes = [...arguments].filter((arg) => {
        if (arg === true) {
            isAddPrefix = arg;
        } else if (typeof arg === 'object') {
            prefix = arg.prefix;
        } else {
            return arg;
        }
    });

    if (isAddPrefix) {
        classes = classes.filter(Boolean).join(' ');
        return getPrefixedClassNames(classes, prefix);
    }

    return classes.filter(Boolean).join(' ');
}

/**
 * Get sm|md|lg|focus|hover classes prefix
 * @param className
 * @param prefix
 * @returns {string|*}
 */
export function getSpecialClass(className, prefix) {
    let arr2 = className.split(':');
    let regex = new RegExp(prefix, 'gm');
    if (arr2[1].match(regex)) {
        return arr2.join(':');
    } else {
        return arr2[0] + ':' + prefix + arr2[1];
    }
}

/**
 * Get prefixed class
 * @param classes
 * @param prefix
 * @returns {*}
 */
export function getPrefixedClassNames(classes, prefix) {
    return classes
        .split(' ')
        .filter((className) => className !== '')
        .map((className) => {
            let regex = new RegExp(prefix, 'g');
            if (className.match(regex)) {
                return className;
            } else if (className.match(/:/g)) {
                return getSpecialClass(className, prefix);
            } else {
                return prefix + className;
            }
        })
        .join(' ');
}

/**
 * Append new table row
 * @param tableId
 * @param component
 */
export const appendRow = (tableId, component = 'dynamicAttribute') => {
    let table = document.getElementById(tableId);
    let body = document
        .getElementById(tableId)
        .getElementsByTagName('tbody')[0];
    let rowCount = body.rows.length;
    let newRow = body.insertRow(rowCount);
    newRow.innerHTML = table.rows[1].innerHTML;
    switch (component) {
        case 'dynamicAttribute':
            appendDynamicAttributeConditionRow(tableId, newRow);
            break;
        default:
            appendDynamicAttributeConditionRow(tableId, newRow);
    }
};

/**
 * Add event to buttons for making new row functional
 * @param tableId
 * @param newRow
 */
function appendDynamicAttributeConditionRow(tableId, newRow) {
    Object.values(newRow.childNodes).map((node, index) => {
        index = parseInt(index);
        switch (index) {
            case 4:
                node.childNodes[0].onclick = (e) => {
                    buttonGroupClick(e, 2);
                };
                let outputType = '';
                Object.values(node.childNodes[0].childNodes).map(
                    (node, index) => {
                        let classes = node.getAttribute('class');
                        if (classes.includes('ctx-isActive')) {
                            outputType = node.getAttribute('value');
                        }
                    }
                );
                if ('pattern' === outputType) {
                    newRow.childNodes[6].childNodes[1].setAttribute(
                        'required',
                        true
                    );
                } else {
                    newRow.childNodes[6].childNodes[0].setAttribute(
                        'required',
                        true
                    );
                }
                break;
            case 8:
                node.childNodes[1].onclick = (e) => {
                    appendRow(tableId);
                };
                node.childNodes[0].onclick = (e) => {
                    deleteRow(e);
                };
                break;
            default:
                let inputFieldsArr = [3, 5, 6, 7];
                if (inputFieldsArr.includes(index)) {
                    if (6 !== index) {
                        node.childNodes[0].value = '';
                    } else {
                        node.childNodes[1].value = '';
                    }
                }
        }
    });
}

export function getDynamicAttributeFormValue(e, singleAttribute) {
    let data = {};
    let index =
        getTrRow(e).rowIndex === 0
            ? getTrRow(e).rowIndex
            : getTrRow(e).rowIndex - 1;
    data = JSON.parse(JSON.stringify(singleAttribute));
    let keyName = e.target.name;
    let value = e.target.value;
    if (keyName.includes('[]')) {
        keyName = e.target.name.replace('[]', '');
        if (data.hasOwnProperty(keyName)) {
            data[keyName][index] = value;
        } else {
            data[keyName] = [value];
        }
    } else {
        if ('wfDAttributeName' === keyName) {
            data[keyName] = value;
            data['wfDAttributeCode'] = value
                .split(' ')
                .map((word) => word.toLowerCase())
                .join('_');
        } else {
            data[keyName] = value;
        }
    }
    return data;
}

/**
 * Delete row. If callback config is passed then call the callback data from database.
 * @param e
 * @param deleteFirsItem
 * @param config
 * @returns {Promise<boolean>}
 */
export async function deleteRow(
    e,
    deleteFirsItem = true,
    config = {},
    isApiRequest = false
) {
    let row = getTrRow(e);
    let result = false;
    if (row.nodeName !== 'TR') {
        return;
    }
    if (row.parentNode.children.length === 1 && !deleteFirsItem) {
        return;
    }

    let options = getSwalOptions(config);

    let data = await ctxSwal.fire(options).then((res) => {
        if (res.isConfirmed) {
            result = true;
            // deleteConfirm()
        } else if (
            /* Read more about handling dismissals below */
            res.dismiss === ctxSwal.DismissReason.cancel
        ) {
            cancelConfirm();
        }
    });
    return result;
}

export function getTrRow(e) {
    let row = e.target;
    let index = 0;
    while (index < 10) {
        if (row.nodeName === 'TR') {
            break;
        }
        row = row.parentNode;
    }
    return row;
}

/**
 *
 * @param elem
 */
export const saveUpdate = (elem) => {
    let formData = new FormData(elem);
    let formName = elem.name;
    let formattedData = null;
    switch (formName) {
        case 'dynamicAttributeAddEdit':
            let FV = new FormValue();
            formattedData = FV.getFormattedDynamicAttribute(formData);
            break;
        default:
            console.log('ctx-feed-pro');
    }
    return formattedData;
};

/**
 *
 * @param buttonNames
 * @returns {{}}
 */
export const getGroupButtonsValue = (buttonNames = []) => {
    let data = {};
    buttonNames.forEach((buttonName) => {
        let buttons = document.querySelectorAll(
            'button[name="' + buttonName + '"]'
        );
        let buttonsLength = Object.values(buttons).length;
        buttons = Object.values(buttons);
        let chunkStart = 0;
        let arrIndex = 0;
        while (chunkStart < buttonsLength) {
            if (buttons[chunkStart].classList.contains('ctx-isActive')) {
                if (buttonName.includes('[]')) {
                    let keyName = buttonName.replace('[]', '');
                    if (data.hasOwnProperty(keyName)) {
                        data[keyName][arrIndex] =
                            buttons[chunkStart].getAttribute('value');
                    } else {
                        data[keyName] = [
                            buttons[chunkStart].getAttribute('value'),
                        ];
                    }
                    arrIndex++;
                } else {
                    data[buttonName] =
                        buttons[chunkStart].getAttribute('value');
                }
            }

            chunkStart++;
        }
    });

    return data;
};
/**
 *
 * @param formName
 */
export const isValidForm = (formName = 'dynamicAttributeAddEdit') => {
    var elements = document.forms[formName].elements;
    let emptyFields = {};
    for (let i = 0; i < elements.length; i++) {
        let formField = elements[i];
        if (null !== formField.getAttribute('required')) {
            let name = formField.getAttribute('name');
            name = name.includes('[]') ? name.replace('[]', '') : name;
            if (formField.nodeName === 'SELECT') {
                if (
                    parseInt(formField.selectedIndex) === 0 &&
                    'default_value_attribute' !== name
                ) {
                    emptyFields[name] = formField;
                }
            } else if (formField.nodeName === 'INPUT') {
                if (!formField.value && 'default_value_pattern' !== name) {
                    emptyFields[name] = formField;
                }
            }
        }
    }

    if (Object.keys(emptyFields).length) {
        let emptyField = Object.values(emptyFields)[0];
        let fieldId = Object.keys(emptyFields)[0] + '-notice';
        emptyField.focus();
        emptyField.style.outline = 'solid 1px black';
        // emptyField.insertAdjacentHTML('afterend', '<span  style="border-color: #464646 !important;box-shadow:3px 2px 2px 0 rgb(0 0 0 / 10%), 2px 3px 5px 0 rgb(0 0 0 / 20%);;border-width: 1px;padding:8px;" id="' + fieldId + '" class="  ctx-opacity-100 ctx-transition-all ctx-duration-200 ctx-bg-white ctx-px-2 ctx-py-1.5 ctx-text-sm ctx-text-black ctx-rounded-sm ctx-absolute ctx-translate-y-1/4 -ctx-translate-x-[15%]   ctx-z-50"> ' + getWarningIcon() + '  <p style="display: inline">Please select an item in the list.</p></span>');

        // setTimeout((fieldId) => {
        //     let notice = document.getElementById(fieldId);
        //     if (notice) {
        //         let parent = notice.parentNode;
        //         if (parent.lastChild.nodeName === 'SPAN') {
        //             parent.removeChild(parent.lastChild)
        //         } else {
        //             parent.removeChild(parent.children[1])
        //         }
        //     }
        //     clearTimeout(this)
        // }, 2500, fieldId);
        return false;
    }
    return true;
};

// function getWarningIcon() {
//     return '<img style="display: inline" src=" ' + WFV5.v5_url + 'src/assets/img/warning-icon.png" height="25" width="25">'
// }

const arrayMoveMutate = (array, from, to) => {
    array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
};

export const arrayMove = (array, from, to) => {
    array = array.slice();
    arrayMoveMutate(array, from, to);
    return array;
};

// Swap two nodes
export const swap = (nodeA, nodeB) => {
    if (nodeA && nodeB) {
        const parentA = nodeA.parentNode;
        const siblingA =
            nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;
        // Move `nodeA` to before the `nodeB`
        nodeB.parentNode.insertBefore(nodeA, nodeB);
        // Move `nodeB` to before the sibling of `nodeA`
        parentA.insertBefore(nodeB, siblingA);
    }
};

export function dragStart(e) {
    return getTrRow(e);
}

export function dragOver(e) {
    e.preventDefault();
    return getTrRow(e);
}

export function dragEnd(
    row,
    currentRow,
    singleAttribute,
    isRowAdded,
    groupButtonValue = ['type[]', 'default_type'],
    formNumber = document.forms[0]
) {
    if (row && currentRow) {
        swap(currentRow, row);
    }

    let dynamicAttribute = {};
    let groupButtonsValue;
    if (groupButtonValue.length) {
        groupButtonsValue = getGroupButtonsValue(groupButtonValue);
    }
    // if(isRowAdded) {
    // 	dynamicAttribute = singleAttribute
    // }else {
    // 	dynamicAttribute = saveUpdate(formNumber);
    // }
    dynamicAttribute = singleAttribute;

    if (groupButtonsValue) {
        dynamicAttribute = {
            ...dynamicAttribute,
            ...groupButtonsValue,
        };
    }

    if (isRowAdded && row && currentRow) {
        setTimeout(() => {
            swap(currentRow, row);
        }, 1);
    }

    return dynamicAttribute;
}

export const jsonParse = (data) => {
    return JSON.parse(JSON.stringify(data));
};

export const addToImutableObject = (key, value, obj = {}) => {
    let data = jsonParse(obj);

    if (key && value) {
        data[key] = value;
        return data;
    }

    return data;
};

///////////////////////////////////////////////////////////////////////////////////////////
//																						 //
// START DATABASE RELATED WORK															 //
//																						 //
///////////////////////////////////////////////////////////////////////////////////////////

/**
 * Fetch dropdown options
 * @param payload
 * @returns {Promise<*[]>}
 */
// export const fetchOptions = async (payload) => {
//     if (!payload.options.length) {
//         return [];
//     }
//     let currentPayload = {};
//     currentPayload.config = payload.config;
//     let optionsArr = [];
//     for (let i = 0; i < payload.options.length; i++) {
//         let optionName = payload.options[i];
//         currentPayload.endpoint =
//             endpoints.dropdownOptions + '/?type=' + optionName;
//         let result = await fetchData(currentPayload);
//         optionsArr[optionName] = result.data;
//     }

//     return optionsArr;
// };
/**
 * Method supports 	GET, POST, PUT, DELETE, UPDATE AND ALL METHODS
 * @param payload
 * @returns {Promise<any>}
 */
export const fetchData = async (payload) => {
    let url = getUrl(payload.endpoint);
    let config = payload.config || {};
    config = {
        ...config,
    };
    const data = await fetch(url, config);
    return await data.json();
};

/**
 * Get url based on endpoint
 * @param endpoint
 * @returns {string}
 */
export function getUrl(endpoint) {
    let url = process.env.REACT_APP_API_URL;
    if (endpoint) {
        url += endpoint;
    }

    return url;
}

export const redirectUser = (user) => {
    if (user) {
        if (user.hasOwnProperty('userRole') && user.userRole === 'ADMIN') {
            window.location.href = process.env.REACT_APP_URL + '/dashboard';
        } else {
            window.location.href = process.env.REACT_APP_URL + '/user-panel';
        }
    } else {
        window.location.href = process.env.REACT_APP_URL;
    }
};

// # The "addUserData" function below takes an array of objects and each of these objects will have user id. Sometimes we will need the details of that user. So we will use this function to retrieve user details from the backend and add them to every objects of that array we recieved.
// # Below are the arguments we will have to pass when we will invoke this function
// -> data : arrayOfObjectsIncludingUserIdEach, type - array of objects
// -> userIdKey : propNameUsedForUserId , type - string
// -> userDetailsKey :  newPropNameToBeAddedToRecieveUserDetailsData , type - string
export async function addUserData(data, userIdKey, userDetailsKey) {
    for (let i = 0; i < data.length; i++) {
        const userId = data[i][userIdKey];
        const user = await fetch(
            process.env.REACT_APP_API_URL + `/api/users/${userId}`
        );
        const userData = await user.json();
        console.log({ userData });
        data[i][userDetailsKey] = userData;
    }
}
