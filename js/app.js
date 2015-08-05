'use strict';

// Declare app level module which depends on filters, and services
angular.module('MDAndersonMobile', [
  'ngRoute',
  'MDAndersonMobile.filters',
   'MDAndersonMobile.controllers',
  'MDAndersonMobile.services',
  'MDAndersonMobile.directives',
    'MDAndersonMobile.configs'
]);
angular.module('MDAndersonMobile').
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/all-protocols', {templateUrl: 'partials/external-physicians/all-protocols.html', controller: 'allProtocols'});
  $routeProvider.when('/single-protocol/:id', {templateUrl: 'partials/external-physicians/singleProtocol.html', controller: 'singleProtocol'});
  $routeProvider.when('/trials-filter', {templateUrl: 'partials/external-physicians/trials-filter.html', controller: 'gynOncTrialsFilter'});
  $routeProvider.when('/trials-confirmation',{templateUrl:'partials/external-physicians/trials-confirmation.html',controller:'trialsConfirmation'});
  $routeProvider.when('/rapid-referral-form', {templateUrl: 'partials/external-physicians/rapidReferralForm.html', controller: 'rapidReferralForm'});
  $routeProvider.when('/referral-thankyou', {templateUrl: 'partials/external-physicians/referral-thankyou.html', controller: 'referralThankYou'});
  $routeProvider.when('/timeout', {templateUrl: 'partials/login/timeout.html', controller: 'timeOut'});
  $routeProvider.when('/error', {templateUrl: 'partials/messages/error.html', controller: 'errorHandler'});
  $routeProvider.otherwise({redirectTo: '/trials-filter'});
}]).
    config(['$tooltipProvider', function($tooltipProvider){
        $tooltipProvider.setTriggers({
            'mouseenter': 'mouseleave',
            'click': 'click',
            'focus': 'blur',
            //'foo':'bar',
            //'never': 'mouseleave' // <- This ensures the tooltip will go away on mouseleave
        });
    }])
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    }]);