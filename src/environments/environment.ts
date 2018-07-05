// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBGlGb-yYAw0HvTl6ZyHkkVFZBN9sd1u04",
    authDomain: "rutamapas.firebaseapp.com",
    databaseURL: "https://rutamapas.firebaseio.com",
    projectId: "rutamapas",
    storageBucket: "rutamapas.appspot.com",
    messagingSenderId: "5086686516"
  },
  url: "http://localhost:4200/",
  api: "",
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
