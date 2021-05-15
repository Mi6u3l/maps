import "./App.css";
import React from "react";

class App extends React.Component {
  state = {
    markers: [
      { lat: 38.7129146, lng: -9.1286218 },
      { lat: 38.7117206, lng: -9.1264315 },
      { lat: 38.7123872, lng: -9.1287935 },
    ],
    map: null
  };
  componentDidMount() {
    setTimeout(() => {
      let map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 38.7117164, lng: -9.1264315 },
        zoom: 15,
      });
      this.setState({
        map
      })

    }, 100);
  }

  createMarker = (position) => {
    const google = window.google;
    new google.maps.Marker({
      position: position,
      map: this.state.map,
    });
  };

  findRestaurants = () => {
    const google = window.google;
    const service = new google.maps.places.PlacesService(this.state.map);
    service.nearbySearch(
      {
        location: { lat: 38.7117164, lng: -9.1264315 },
        radius: 5500,
        type: ["restaurant"],
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            let lat = results[i].geometry.location.lat();
            let lng = results[i].geometry.location.lng();
            this.createMarker({ lat, lng }, this.state.map);
          }
        }
      }
    );
  };

  findATMs = () => {
    const google = window.google;
    const service = new google.maps.places.PlacesService(this.state.map);
    service.nearbySearch(
      {
        location: { lat: 38.7117164, lng: -9.1264315 },
        radius: 5500,
        type: ["atm"],
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            let lat = results[i].geometry.location.lat();
            let lng = results[i].geometry.location.lng();
            this.createMarker({ lat, lng }, this.state.map);
          }
        }
      }
    );
  };

  drawMarkers = () => {
    this.state.markers.forEach((marker) => {
      this.createMarker(marker);
    });
  };

  route = () => {
    const google = window.google;
    let directionsService = new google.maps.DirectionsService();
    let directionsRenderer = new google.maps.DirectionsRenderer();
    let start = "Santa Apólonia, Lisboa";
    let end = "Rato, Lisboa";

    let request = {
      origin: start,
      destination: end,
      travelMode: "DRIVING",
    };

    directionsService.route(request, (result, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(result);
        directionsRenderer.setMap(this.state.map);
      }
    });
  };

  render() {
    return (
      <>
        <button onClick={this.route}>Route</button>
        <button onClick={this.findRestaurants}>Find Restaurants</button>
        <button onClick={this.findATMs}>Find ATMs</button>
        <button onClick={this.drawMarkers}>Draw Markers</button>
        <div style={{ width: 500, height: 500 }} id="map" />
      </>
    );
  }
}

export default App;
