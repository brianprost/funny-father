// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  NODEJS_JOKE_ENDPOINT:
    'https://izwfmviie3.execute-api.us-east-1.amazonaws.com/default/getRandomDadJoke',
  firebase: {
    projectId: 'funny-father',
    appId: '1:425225953407:web:443c8e5c67ebbff2689f4a',
    storageBucket: 'funny-father.appspot.com',
    apiKey: 'AIzaSyAgZN8A11V-L1uKZYp8I6acdG5umy8vkRA',
    authDomain: 'funny-father.firebaseapp.com',
    messagingSenderId: '425225953407',
    measurementId: 'G-77NHGYNQTS',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.