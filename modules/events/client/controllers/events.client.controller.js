'use strict';

// Events controller
angular.module('events').controller('EventsController', ['$scope', '$stateParams', '$filter','$location', '$anchorScroll', 'Authentication', 'Events',
  function ($scope, $stateParams, $filter, $location, $anchorScroll, Authentication, Events) {
    $scope.authentication = Authentication;

    $scope.categories = ['New Category'];

    $scope.valiDates = function(date1, date2) {

      if (isNaN(date1.valueOf())) {
        return 'Start date must be of form "MM-dd-yyyy" ';
      }
      if (isNaN(date2.valueOf())) {
        return 'End date must be of form "MM-dd-yyyy"';
      }
      if (date1.valueOf()>=date2.valueOf()) {
        return 'End date must come after start date';
      }
      return null;
    };

    // Create new Event
    $scope.create = function (isValid) {
      $scope.error = null;
      $scope.processing = true;

      $scope.error = $scope.valiDates($scope.startDate,$scope.endDate);

      if (!isValid || $scope.error) {
        $scope.$broadcast('show-errors-check-validity', 'eventForm');
        $scope.processing = false;
        return false;
      }
    
      // Create new Event object
      var event = new Events({
        title: this.title,
        description: this.description,
        created: this.created,
        updated: this.updated,
        startDate: this.startDate,
        endDate: this.endDate,
        category: this.category,
        featured: this.featured,
        poster: this.user,
        updater: this.user
      });

      // Redirect after save
      event.$save(function (response) {
        //$location.path('events/' + response._id);
        $scope.savedTitle = $scope.title;

        // Clear form fields
        $scope.title = '';
        $scope.description = '';
        $scope.startDate = '';
        $scope.endDate = '';
        $scope.featured = '';
        $scope.category = '';

        $scope.processing = false;
        $scope.successfulSave = true;
        $scope.error = null;

        $anchorScroll('#top');

      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
        $scope.processing = false;
        $scope.successfulSave = false;
      });
    };

    // Remove existing Event
    $scope.remove = function (event) {
      if (event) {
        event.$remove();

        for (var i in $scope.events) {
          if ($scope.events[i] === event) {
            $scope.events.splice(i, 1);
          }
        }
      } else {
        $scope.event.$remove(function () {
          $location.path('events');
        });
      }
    };

    // Update existing Event
    $scope.update = function (isValid) {
      $scope.error = null;
      $scope.processing = true;
      $scope.error = $scope.valiDates($scope.event.startDate,$scope.event.endDate);

      if (!isValid || $scope.error) {
        $scope.processing = false;
        $scope.$broadcast('show-errors-check-validity', 'eventForm');
        return false;
      }

      var event = $scope.event;

      event.$update(function () {
        $scope.processing = false;
        $location.path('events/' + event._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Events
    $scope.find = function () {
      $scope.events = Events.query();
    };

    // Find existing Event
    $scope.findOne = function () {
      Events.get({
        eventId: $stateParams.eventId
      }, function(event) {
        $scope.event = event;
        $scope.fixDates();
      });
    };

    $scope.fixDates = function() {
      $scope.event.startDate = new Date($scope.event.startDate);
      $scope.event.endDate = new Date($scope.event.endDate);
    };
  }
]);
