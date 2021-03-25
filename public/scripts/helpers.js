const clearText = $area => {
  // If there's an 'input' handler on this element (for instance, to update a counter), trigger it manually when we clear the value.
  $area.val('').trigger('input');
}

// Helper function to generate the proper date and/or "submitted X minutes/hours/days ago" text
const millisecondsToString = ms => {
  const dateCreated = new Date(ms); 
  const dateString = dateCreated.toString();
  
  // How long ago was this tweet posted in ms/s/min/hours/days?
  const deltaMs = Date.now() - ms;
  const deltaS = Math.round(deltaMs / 1000);
  const deltaM = Math.round(deltaS / 60);
  const deltaH = Math.round(deltaM / 60);
  const deltaD = Math.round(deltaH / 24);

  let timeString = 'posted ';

  if (deltaD > 2) {
    timeString += `on ${dateString}`;
  } else if (deltaH >= 24) {
    timeString += `${deltaD}d ago`;
  } else if (deltaM >= 60) {
    timeString += `${deltaH}h ago`;
  } else if (deltaS >= 60) {
    timeString += `${deltaM}m ago`;
  } else if (deltaS >= 0) {
    timeString += `${deltaS}s ago`;
  }

  return timeString;
}