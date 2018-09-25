function getFormattedDate(): Date {
  const today = new Date(Date.now());
  today.toLocaleDateString("en-US");

  return today;
}

export { getFormattedDate };
