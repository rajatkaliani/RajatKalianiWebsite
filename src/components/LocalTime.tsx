"use client";

import { useEffect, useState } from "react";

/** Live local time in Irvine — a small "this is a real person" signal. */
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "America/Los_Angeles",
      }).format(new Date());

    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with the wall clock (external system) on mount
    setTime(format());
    const id = setInterval(() => setTime(format()), 20_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tnum" suppressHydrationWarning>
      {time ?? "--:--"} PT
    </span>
  );
}
