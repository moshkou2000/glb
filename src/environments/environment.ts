// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


const base_url = 'http://192.168.1.102:3010/api/';

const default_api = {
    logout: base_url + "auths/logout",
    profile: base_url + "admin/profile",
    password: base_url + "admin/password",
    upload_single: base_url + "files/single",
    upload_multiple: base_url + "files/multiple",
    forgot_password: base_url + "admin/forgot-password",
};

const tokenless_api = {
    login: base_url + "auth/login",
};

export const environment = {
    app_prefix: "glb11396834_",
    production: false,
    app_key: "cbsdnbhd",
    base_url: base_url,
    default_api: default_api,
    tokenless_api: tokenless_api
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */

// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

export const keys = {
    USER: environment.app_prefix + "user"
};
