angular.module("App.createMap", ['ngMessages']) //Placeholder name
.controller("MapController", MapController)

function MapController($scope, $document, MapFactory){
  angular.extend($scope, MapFactory);
  $scope.markers = [];
  $scope.selectedLocations = [];
  $scope.mapInfo = {}
  // $scope.mapInfo = {
  //   "user": 1 //Hardcoded until backend is fixed
  // };
  // $scope.map = new GMaps({
  //   div: '#map',
  //   lat: 34.0192316,
  //   lng: -118.4943091,
  //   zoom: 15
  // });
  var mapOptions = {
    center: new google.maps.LatLng(34.0192118, -118.4942816),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
  navigator.geolocation.getCurrentPosition(function(position) {
    var currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    $scope.map.panTo(currentLocation);
    // $scope.map.setCenter(position.coords.latitude, position.coords.longitude);
    var yourMarker = new google.maps.Marker({
      position: currentLocation,
      icon: {
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        fillColor: "blue",
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 5
      },
      title: "You are here!",
      infoWindow: {
        content : "You are here!"
      },
      zIndex: 999,
      map: $scope.map
    });
  });

  $scope.createMap = function(){
    if($scope.selectedLocations.length !== 0){
      MapFactory.createMap($scope.mapInfo, $scope.selectedLocations)
      .then(function (success) {
        $scope.selectedLocations = [];
        //Need to fix
        // MapFactory.refreshMap($scope.selectedLocations, null, $scope.map)
      })
    }
  };
  $scope.renameLocation = function (selectedLocations, markers, index, newName) {
    MapFactory.renameLocation(selectedLocations, markers, index, newName)
    // MapFactory.refreshMap(selectedLocations, null, $scope.map)
  };

}
