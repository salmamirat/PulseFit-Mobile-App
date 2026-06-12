import { useEffect } from "react";
import { Pedometer } from "expo-sensors";
import { useStore } from "@/store/useStore";

export default function usePedometer() {
  const { setSteps } = useStore();

  useEffect(() => {
    let subscription: Pedometer.Subscription | null = null;

    const startPedometer = async () => {
      const isAvailable =
        await Pedometer.isAvailableAsync();

      if (!isAvailable) {
        console.log("Pedometer not available");
        return;
      }

      subscription =
        Pedometer.watchStepCount((result) => {
          setSteps(result.steps);
        });
    };

    startPedometer();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return null;
}