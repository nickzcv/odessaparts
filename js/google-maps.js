// google maps

// 2014 snazzymaps, customized by ex-nihilo
//
// When the window has finished loading create our google map below
        google.maps.event.addDomListener(window, 'load', init);

        function init() {
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 4,
            disableDefaultUI: true,
            draggable: false,
            streetViewControl: false,
            scrollwheel: false,
            // The latitude and longitude to center the map (always required)
			
			// YOUR POSITION 1
            center: new google.maps.LatLng(48.858278, 2.294254), // EDIT THIS PART
			
            // How you would like to style the map. 
            // This is where you would paste any style found on Snazzy Maps.
            styles: [{
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "hue": "#ffffff"
                }, {
                    "saturation": -100
                }, {
                    "lightness": 100
                }]
            }, {
                "featureType": "water",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "lightness": -35
                }, {
                    "saturation": -100
                }]
            }, {
                "featureType": "administrative.province",
                "elementType": "geometry",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#000000"
                }, {
                    "lightness": 90
                }]
            }]
        };
        // Get the HTML DOM element that will contain your map 
        // We are using a div with id="map" seen below in the <body>
        var mapElement = document.getElementById('map');
        // Create the Google Map using our element and options defined above
        var map = new google.maps.Map(mapElement, mapOptions);
        // var image = 'map-location.png';
        var circle = {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#000000',
			fillOpacity: 1.0,
			scale: 12,
            strokeColor: '#000000',
			strokeOpacity: 1.0,
            strokeWeight: 1
        };
        // Let's also add a marker while we're at it
        var marker = new google.maps.Marker({
			
			// YOUR POSITION 1-1
            position: new google.maps.LatLng(48.858278, 2.294254), // EDIT THIS PART
			
            map: map,
            // icon: image,
            icon: circle,
            title: 'ex-nihilo'
        });
    }