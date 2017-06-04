function getFingers(frame) {
  return frame.hands.reduce(getOpenFingersFromHand, 0);
}

function getOpenFingersFromHand(acc, hand) {
  return acc + hand.fingers.reduce((curr, finger) => {
    return curr + (finger.extended > 0 ? 1 : 0);
  }, 0);
}

module.exports = {
  getFingers,
  getOpenFingersFromHand,
}