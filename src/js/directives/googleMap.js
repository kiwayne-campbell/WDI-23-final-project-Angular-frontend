angular.module('finalProject')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window', 'Festival'];
function googleMap($window) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map">Google map here</div>',
    scope: {
      center: '='
    },
    link: function($scope, element) {
      console.log($window.google);
      console.log(element);
      new $window.google.maps.Map(element[0], {
        center: $scope.center,
        zoom: 14
      });
    }
  };
}
