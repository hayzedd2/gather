export const getRelativeTime = (date: string):string => {
  const now = new Date();
  const recievedDate = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - recievedDate.getTime()) / 1000);
  const units: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
    { unit: "year", seconds: 31536000 },
    { unit: "month", seconds: 2592000 },
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
    { unit: "second", seconds: 1 },
  ];
  for (const { unit, seconds } of units) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return `Last edited ${new Intl.RelativeTimeFormat("en", {
        numeric: "auto",
      }).format(-interval, unit)}`;
    }
  }
  return "Just now";

};
