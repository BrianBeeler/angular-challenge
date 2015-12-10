'use strict';

// angular.module('events')
// .directive('blah',[function () {

//     console.log("DIRECCTIIVVEE!!!!")

//     return {
//         restrict: 'E',
//         scope: {
//             event: '='
//         },
//         templateUrl: 'detailView.html'
//     };
// }]);

// console.log('first!');

angular.module('events')
//.controller('EventsController')
.directive('eventView', function() {
  return {
    restrict : 'EA',
    templateUrl : 'modules/events/client/directives/eventView.html',
    scope: {
      event : '='
    },
  };
});