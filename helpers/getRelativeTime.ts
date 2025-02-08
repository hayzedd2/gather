export const getRelativeTime = (date: string): string => {
  const recievedDate = new Date(date);
  const now = new Date();

  const diffInMs = now.getTime() - recievedDate.getTime();

  const diffInSeconds = Math.floor(diffInMs / 1000);

  const units: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
    { unit: "year", seconds: 31536000 },
    { unit: "month", seconds: 2592000 },
    { unit: "week", seconds: 604800 },
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
    { unit: "second", seconds: 1 },
  ];

  const rtf = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
    style: "long",
  });

  for (const { unit, seconds } of units) {
    const value = Math.floor(diffInSeconds / seconds);

    if (value >= 1) {
      return `Last edited ${rtf.format(-value, unit)}`;
    }
  }

  return "Last edited just now";
};
