import { useEffect, useState } from 'react';

const EMPTY_COUNTDOWN: Countdown = { days: 0, hours: 0, minutes: 0, seconds: 0, ended: false };

type Countdown = { days: number; hours: number; minutes: number; seconds: number; ended: boolean };

function getCountdown(target: string): Countdown {
  const difference = new Date(target).getTime() - Date.now();
  if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
  const totalSeconds = Math.floor(difference / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    ended: false,
  };
}

export function useCountdown(target: string): Countdown {
  const [countdown, setCountdown] = useState<Countdown>(EMPTY_COUNTDOWN);
  useEffect(() => {
    setCountdown(getCountdown(target));
    const timer = window.setInterval(() => setCountdown(getCountdown(target)), 1000);
    return () => window.clearInterval(timer);
  }, [target]);
  return countdown;
}
