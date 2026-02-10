import React, { useEffect, useRef, useState } from "react";
import { Image } from "react-native";
import { Marker, AnimatedRegion } from "react-native-maps";
import { getHeading } from "../screens/getHeading";


const MovingDriverMarker = ({ routeCoords }) => {
  const indexRef = useRef(0);
  const intervalRef = useRef(null);
  const [heading, setHeading] = useState(0);

  const animatedCoord = useRef(
    new AnimatedRegion({
      latitude: routeCoords?.[0]?.latitude || 0,
      longitude: routeCoords?.[0]?.longitude || 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    })
  ).current;

  useEffect(() => {
    if (!routeCoords || routeCoords.length < 2) return;

    indexRef.current = 0;
    animatedCoord.setValue(routeCoords[0]);

    intervalRef.current = setInterval(() => {
      const i = indexRef.current;

      if (i >= routeCoords.length - 1) {
        clearInterval(intervalRef.current);
        return;
      }

      const from = routeCoords[i];
      const to = routeCoords[i + 1];

      setHeading((prev) => prev + (getHeading(from, to) - prev) * 0.3);

      animatedCoord.timing({
        latitude: to.latitude,
        longitude: to.longitude,
        duration: 700,
        useNativeDriver: false,
      }).start();

      indexRef.current += 1;
    }, 300);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [routeCoords]);

  if (!routeCoords?.length) return null;

  return (
    <Marker.Animated
      coordinate={animatedCoord}
      anchor={{ x: 0.5, y: 0.5 }}
    >
      <Image
        source={require("../assets/car.png")}
        style={{
          width: 30,
          height: 30,
          resizeMode: "contain",
          transform: [{ rotate: `${heading}deg` }],
        }}
      />
    </Marker.Animated>
  );
};

export default MovingDriverMarker;
