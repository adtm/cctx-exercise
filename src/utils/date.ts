function getFormattedDate(): Date {
  const today = new Date();
  today.toLocaleDateString("en-US");

  return today;
}

export { getFormattedDate };
