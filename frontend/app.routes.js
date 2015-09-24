/**
 * Created by Brycen on 2015-06-10.
 */

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '../pages/home/home.view.html',
      controller: 'HomeController'
    })
});