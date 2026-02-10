import MapView, { Marker, Polyline } from "react-native-maps";
import { View, Text } from "react-native";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import {
  selectOrigin,
  selectDestination,
  setTravelTimeInformation,
  selectTravelTimeInformation,
  selectRideConfirmed,
} from "../slices/navSlice";
import MovingDriverMarker from "../components/MovingDriverMarker";

const DEFAULT_REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const travelInfo = useSelector(selectTravelTimeInformation);
  const rideConfirmed = useSelector(selectRideConfirmed);
  const dispatch = useDispatch();

  const mapRef = useRef(null);
  const [routeCoords, setRouteCoords] = useState([]);

  // GET ROUTE
  useEffect(() => {
    if (!origin || !destination) return;

    const getRoute = async () => {
      try {
        const url =
          `https://router.project-osrm.org/route/v1/driving/` +
          `${origin.location.lng},${origin.location.lat};` +
          `${destination.location.lng},${destination.location.lat}` +
          `?overview=full&geometries=geojson`;

        const res = await fetch(url);
        const data = await res.json();

        if (!data.routes?.length) return;

        const coords = data.routes[0].geometry.coordinates.map(
          ([lng, lat]) => ({
            latitude: lat,
            longitude: lng,
          }),
        );

        setRouteCoords(coords);

        dispatch(
          setTravelTimeInformation({
            distance: data.routes[0].distance,
            duration: data.routes[0].duration,
          }),
        );
      } catch (err) {
        console.log("Route error:", err);
      }
    };

    getRoute();
  }, [origin, destination]);

  // FIT MAP
  useEffect(() => {
    if (!mapRef.current || !origin || !destination) return;

    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 150, right: 50, bottom: 50, left: 50 },
      animated: true,
    });
  }, [origin, destination]);

  const initialRegion = {
    latitude: origin?.location?.lat || DEFAULT_REGION.latitude,
    longitude: origin?.location?.lng || DEFAULT_REGION.longitude,
    latitudeDelta: DEFAULT_REGION.latitudeDelta,
    longitudeDelta: DEFAULT_REGION.longitudeDelta,
  };

  return (
    <View style={tw`flex-1 mb-4`}>
      {/* MAP */}
      <MapView ref={mapRef} style={tw`flex-1`} initialRegion={initialRegion}>
        {origin?.location && (
          <Marker
          pinColor="blue"
            identifier="origin"
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
            title="From"
          />
        )}

        {destination?.location && (
          <Marker
          // pointerEvents="test"
          pinColor="green"
            identifier="destination"
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}
            title="To"
          />
        )}

        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeWidth={4}
            strokeColor="black"
            lineCap="round"
          />
        )}

        {/* MOVING DRIVER MARKER */}
        {routeCoords.length > 0 && rideConfirmed && (
          <MovingDriverMarker routeCoords={routeCoords} />
        )}
      </MapView>

      {/* ETA OVERLAY (MAP USTIDA) */}
      {travelInfo && (
        <View
          style={tw`absolute top-5 left-5 right-5 bg-white p-4 rounded-xl shadow-lg`}
        >
          <Text style={tw`text-center text-lg font-bold`}>
            {Math.ceil(travelInfo.duration / 60)} min •{" "}
            {(travelInfo.distance / 1000).toFixed(1)} km
          </Text>
        </View>
      )}
    </View>
  );
};

export default Map;
