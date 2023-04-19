// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  signInUrl: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=\n" +
    "AIzaSyDy53zgqcOerQ-qZf8x8KpWYpixiMtjzOU",
  signUpUrl: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDy53zgqcOerQ-qZf8x8KpWYpixiMtjzOU",
  url: "https://forum-99ab8-default-rtdb.europe-west1.firebasedatabase.app/"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
