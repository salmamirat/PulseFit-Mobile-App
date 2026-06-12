import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";

interface LocationData {
  distance: number;
  speed: number;
  startTracking: () => Promise<void>;
  stopTracking: () => void;
  resetTracker: () => void;
}

export default function useLocationTracker(): LocationData {
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(0);

  const watcher =
    useRef<Location.LocationSubscription | null>(null);

  const lastPosition = useRef<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    return R * c;
  };

  const startTracking = async () => {
    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Location permission denied");
      return;
    }

    watcher.current =
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 1,
          timeInterval: 1000,
        },
        (location) => {
          console.log(location.coords);

          const current = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };

          setSpeed(
            Math.max(
              0,
              (location.coords.speed || 0) * 3.6
            )
          );

          if (lastPosition.current) {
            const newDistance =
              calculateDistance(
                lastPosition.current.latitude,
                lastPosition.current.longitude,
                current.latitude,
                current.longitude
              );

            setDistance(
              (prev) => prev + newDistance
            );
          }

          lastPosition.current = current;
        }
      );
  };

  const stopTracking = () => {
    watcher.current?.remove();
    watcher.current = null;
  };

  const resetTracker = () => {
    setDistance(0);
    setSpeed(0);
    lastPosition.current = null;
  };

  useEffect(() => {
    return () => {
      watcher.current?.remove();
    };
  }, []);

  return {
    distance,
    speed,
    startTracking,
    stopTracking,
    resetTracker,
  };
}