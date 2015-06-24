var bounds = new google.maps.LatLngBounds();
var zoom = 6;
var myLatlng = new google.maps.LatLng(-9.903921416774965, -75.9814453125);
var marker = 0;
var map;
var panorama = null;
var pin;

infowindow = new google.maps.InfoWindow({
    content: '<article id="principal"></article>'
});
function initialize() {
    var mapOptions = {
        zoom: zoom,
        center: myLatlng,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    google.maps.event.addListener(map, 'click', addLatLng);
}



google.maps.event.addDomListener(window, 'load', initialize);
function addLatLng(event) {

   
   marker = new google.maps.Marker({
    position: event.latLng,
    map: map,
    draggable: false,
    title: 'ELEMENTO DE PRUEBA',
    html: '<div id="content" style="color:#333;">' +
    '<div id="streetView" style="width: 100%; min-width: 400px; height:300px; position: relative;">' +
    '<div id="bodyContent" style="position: relative; background: rgba(0,67,112,0.6); z-index:100; padding:5px; font-size:10px; color:#EEE;">' +
    '<span style="padding: 1px 5px; margin: 4px 0; background: #7E0047;color: #EEE;"><b>ELEMENTO '+event.latLng+'</b></span></br>' +
    '<span><b>Dirección:</b> Av. Javier Prado 2600</span></br>' +
    '<span><b>Más información:</b> <a href="http://www.google.com">' +
    'http://www.google.com</a> </span>' +
    '</div></div>' +
    '</div>',
    animation: google.maps.Animation.DROP
});
   google.maps.event.addListener(marker, "click", function() {
    pin = new google.maps.MVCObject();
    google.maps.event.addListenerOnce(infowindow, "domready", function() {
        panorama = new google.maps.StreetViewPanorama(document.getElementById("streetView"), {
            panControl: true,
            panControlOptions: {
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_BOTTOM
            },
            navigationControl: false,
            enableCloseButton: false,
            addressControl: false,
            linksControl: false,
            visible: true
        });
        panorama.bindTo("position", pin);
    });
    pin.set("position", this.getPosition());

    infowindow.setContent(this.html);

    infowindow.open(map, this);
});

   bounds.extend(marker.getPosition());
//    $("body").html("<div style='position:fixed; z-index:10000; bottom:0;'><input type='text' value='"+event.latLng+"'/></div>");
//    $("#coordenadas").val(event.latLng);
//    alert(event.latLng);
}


$(document).ready(function() {
    $(".button-collapse").sideNav({
        edge: 'left',
      closeOnClick: true 
    });
    $('.scrollspy').scrollSpy();
});