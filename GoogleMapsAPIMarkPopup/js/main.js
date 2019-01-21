function initMap() {
    var markers = [];
    var infowindow;
    infoWindows = [];
    var mapOptions = {
        center: {
            lat: 26.8206,
            lng: 30.8025
        },
        zoom: 6
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    google.maps.event.addListener(map, 'click', function () {
        if (infowindow) {
            infowindow.close();
        }
    });

    google.maps.event.addListener(map, "click", function (event) {
        closeInfoWindows();
    });


    //fixed nav
    const nav = document.querySelector('nav')
    const topOfNav = nav.offsetTop;
    var fiterData = function () {
        var categ = this.getAttribute("data-categ");
        if (categ != 'all') {
            filteredplaces = places.filter(place => place.type == categ);
        } else {
            filteredplaces = places;
        }
        document.getElementById("dataBox").innerHTML = '';
        clearMarkers(markers);
        buildGride(filteredplaces);
    };

    window.addEventListener('scroll', fixNav);

    function fixNav() {

        if (window.scrollY >= topOfNav) {
            document.body.classList.add('fixedNav');
        } else {
            document.body.classList.remove('fixedNav');

        }
    }
    //load all categoreis nav elements
    var fliterNavCards = document.getElementsByClassName("fliterNavCard");


    function buildGride(places) {
        places.forEach(place => {
            html = "";
            place.bio = place.bio.substring(0, 200) + '...';
            document.getElementById("dataBox").innerHTML += buildhtml(
                place.name,
                place.bio,
                place.type,
                place.url,
                place.hours,
                place.img,
                place.wikiLink,
                html
            );
            // return;
        });
        setMarkers(places)
    }

    function buildhtml(name, bio, type, url, hours, img, wikiLink, html) {
        html += '<div class="card" >';
        html +=
            '<img class="card-img-top" width="100%" src="img/' +
            img +
            '" alt="Card image cap">';
        html += '<div class="card-body">';
        html += '<h5 class="card-title">' + name + "</h5>";
        html += '<p class="card-text">' + bio + " </p>";
        html += '<a href="' + wikiLink + '" class="btn btn-primary">Read More...</a>';
        html += "</div>";
        html += "</div>";
        return html;
    }

    function setMarkers(places) {
        // add all mark for each place
        for (var i = 0; i < places.length; i++) {
            addMarkers(places[i]);
        }
    }

    buildGride(places)

    // https://developers.google.com/maps/documentation/javascript/markers

    function clearMarkers(markers) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
    }

    //adding the event Listener
    for (var i = 0; i < fliterNavCards.length; i++) {
        fliterNavCards[i].addEventListener("click", fiterData);
    }

    function addMarkers(mark) {
        var marker = new google.maps.Marker({
            position: mark.coords,
            map: map,
            animation: google.maps.Animation.DROP
        });

        markers.push(marker);
        // Check for customicon
        if (mark.iconImage) {
            // Set icon image
            var icon = {
                url: mark.iconImage, // url
                scaledSize: new google.maps.Size(30, 30), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            };
            marker.setIcon(icon);
        }
        // Check content
        if (mark.bio) {

            mark.bio = mark.bio.substring(0, 150) + '...';
            var contentString = '<div id="content">' +
                '<div id="siteNotice">' + '<img class="windoImg"  src="img/' + mark.img + '" alt="' + mark.name + '"></div>' +
                '<h3 id="firstHeading" class="firstHeading">' + mark.name + '</h3>' +
                '<div id="bodyContent">' +
                '<p>' + mark.bio + '</p><a href="' + mark.wikiLink + '" >' +
                'Read More wikipedia.org....</a>' +
                '</div>' +
                '</div>';

            var infoWindow = new google.maps.InfoWindow({
                content: contentString
            });
            infoWindows.push(infoWindow)
            marker.addListener('click', function () {
                closeInfoWindows();
                infoWindow.open(map, marker);
            });
        }

    }

    function closeInfoWindows() {
        for (var i = 0; i < infoWindows.length; i++) {
            infoWindows[i].close();
        }
    }

}