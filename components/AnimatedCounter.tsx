import React, { useEffect, useState } from "react";
import { Text, TextStyle } from "react-native";

interface Props {
  value: number;
  duration: number;
  style: TextStyle;
}

export default function AnimatedCounter({
  value,
  duration = 1000,
  style,
}: Props) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;

    const increment =
      value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(
          Math.floor(start)
        );
      }
    }, 16);

    return () =>
      clearInterval(timer);
  }, [value]);

  return (
    <Text style={style}>
      {displayValue}
    </Text>
  );
}