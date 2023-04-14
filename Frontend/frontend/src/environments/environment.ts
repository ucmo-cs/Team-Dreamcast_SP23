// This file can be replaced during build by using the fileReplacements array.
// ng build replaces environment.ts with environment.prod.ts.
// The list of file replacements can be found in angular.json.

//TODO: Replace the xxxxx in the below url with the url created in API Gateway after deploying the backend via serverless.

//4/5/23 added the invoke url provided by harris, though it will need to be re-deployed since i changed the iam portion of the serverless.yml file

export const environment = {
    state: 'local',
    production: false,
    apiUrl: 'http://localhost:3000',

  }

  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as zone.run, zoneDelegate.invokeTask.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  import 'zone.js/plugins/zone-error'  // Included with Angular CLI.