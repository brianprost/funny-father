// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  RANDOM_JOKE_LAMBDA_ENDPOINT:
    'https://u9h7fay121.execute-api.us-east-1.amazonaws.com/default/get_random_dad_joke',
  NODEJS_JOKE_ENDPOINT: 'https://izwfmviie3.execute-api.us-east-1.amazonaws.com/default/getRandomDadJoke',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
