(function () {
    'use strict'

    angular.module('client.site')
        .controller('mapController', MapControllerFunction)

    MapControllerFunction.$inject = ['uiGmapGoogleMapApi', 'uiGmapIsReady', '$rootScope']

    function MapControllerFunction(uiGmapGoogleMapApi, uiGmapIsReady, $rootScope) {
        var vm = this
        vm.markers = []
        vm.map = {}
        vm.results = []

        init()

        function init() {
            console.log(vm.markers)
            $rootScope.$on('addFriend', (e, friend) => {
                addFriend(friend)
            })

            $rootScope.$on('addParking', (e, parkingArray) => {
                parkingArray.forEach(function (item, i) {
                    vm.markers.push({
                        id: Date.now() + i,
                        coords: {
                            latitude: item.Latitude,
                            longitude: item.Longitude
                        },
                        CityName: item.CityName,
                        options: {
                            labelClass: 'marker_labels',
                            labelAnchor: '12 30',
                            labelContent: item.CityName,
                            icon: {
                                path: google.maps.SymbolPath.CIRCLE,
                                fillColor: 'black',
                                fillOpacity: 0.8,
                                scale: 8,
                                strokeColor: 'white',
                                strokeWeight: 3
                            }
                        }
                    })
                })
            })

            $rootScope.$on('deleteFriend', (e, friend) => {
                console.log(friend)
                console.log(vm.markers)
                var index = vm.markers.indexOf(friend)
                vm.markers.splice(index, 1)    
            })

            vm.results = [
                { "LMD_MP_Latitude": "34.0224", "LMD_MP_Longitude": "-118.2851", "name": "pam" },
                { "LMD_MP_Latitude": "34.0718", "LMD_MP_Longitude": "-118.3608", "name": "sisi" },
                { "LMD_MP_Latitude": "34.0839", "LMD_MP_Longitude": "-118.2000", "name": "lou" },
            ]
            var styleArrays = [
                {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 13
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#000000"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#144b53"
                        },
                        {
                            "lightness": 14
                        },
                        {
                            "weight": 1.4
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#08304b"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#0c4152"
                        },
                        {
                            "lightness": 5
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#000000"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#0b434f"
                        },
                        {
                            "lightness": 25
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#000000"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#0b3d51"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#146474"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#021019"
                        }
                    ]
                }
            ]

            vm.map = {
                center: {
                    latitude: 34.0413606,
                    longitude: -118.2697771
                },
                zoom: 10,
                options: {
                    scrollwheel: false,
                    streetViewControl: false,
                    draggable: true,
                    styles: styleArrays
                }
            }
           
            uiGmapIsReady.promise()
                .then(instances => {
                    console.log(instances[0].map);
                })
                .then(() => {
                    vm.results.forEach(function (item, i) {
                        vm.markers.push({
                            id: Date.now() + i,
                            coords: {
                                latitude: item['LMD_MP_Latitude'],
                                longitude: item['LMD_MP_Longitude']
                            },
                            name: item['name'],
                            options: {
                                labelClass: 'marker_labels',
                                labelAnchor: '12 30',
                                labelContent: item.name,
                                icon: {
                                    path: google.maps.SymbolPath.CIRCLE,
                                    fillColor: '#2AF6FF',
                                    fillOpacity: 0.8,                                    
                                    scale: 8,
                                    strokeColor: 'white',
                                    strokeWeight: 3
                                }
                            }
                        })
                    })
                })
        }

        function addFriend(friend) {
            friend.options.icon = {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: '#2AF6FF',
                fillOpacity: 0.8,                                    
                scale: 8,
                strokeColor: 'white',
                strokeWeight: 3
            }
            vm.markers.push(friend)
            console.log(vm.markers)
        }


    }
})();