// cookie get,set, remove 설정

import { Cookies } from "react-cookie";

const cookies = new Cookies();

// set cookie
export const setCookie = (name, value, options) => {
    return cookies.set(name, value, {...options});
};

// get cookie
export const getCookie = (name) => {
    return cookies.get(name);
};

// remove cookie
export const removeCookie = (name) => {
    return cookies.remove(name);
};

