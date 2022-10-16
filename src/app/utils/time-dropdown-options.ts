const padWithLeadingZero = (n: number) => String(n).padStart(2, "0");

const getTimeLabel = (timeInMinute: number) => {
  const hour = Math.floor(timeInMinute / 60);
  const minute = timeInMinute % 60;

  const hour12HourFormat = hour === 0 ? 12 : hour >= 13 ? hour - 12 : hour;

  let timeString = padWithLeadingZero(hour12HourFormat);
  if (minute) {
    timeString += `:${padWithLeadingZero(minute)}`;
  }
  timeString += hour >= 12 ? ` pm` : ` am`;
  return timeString;
};

const dropdownOptions = Array.from(Array(48).keys())
  .map((k) => k * 30)
  .map((k) => ({
    value: `${padWithLeadingZero(Math.floor(k / 60))}:${padWithLeadingZero(
      k % 60
    )}`,
    label: getTimeLabel(k),
  }));

export default dropdownOptions;
