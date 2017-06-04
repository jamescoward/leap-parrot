function getHandHeight(frame) {
  if (frame.hands.length) {
    return frame.hands[0].stabilizedPalmPosition[1];
  }

  return 0;
}

function getHandPitch(frame) {
  if (frame.hands.length) {
    return frame.hands[0].pitch();
  }
  return 0;
}

function getHandRoll(frame) {
  if (frame.hands.length) {
    return frame.hands[0].roll();
  }
  return 0;
}

function getHandYaw(frame) {
  if (frame.hands.length) {
    return frame.hands[0].yaw();
  }
  return 0;
}

function scaleRotation(rad) {
  const deg = toDegrees(rad);

  if(deg > 0) return deg > 10 ? deg : 0;
  
  return deg < -10 ? deg : 0;
}

function getHandVelocityInZ(frame) {
  if (frame.hands.length) {
    return frame.hands[0].palmVelocity[1];
  }
  return 0;
}

function toDegrees(rad) {
  return rad * 180 / Math.PI;
}

function getHandParams(frame) {
  if (frame.hands.length) {
    return {
      roll: scaleRotation(getHandRoll(frame)),
      pitch: scaleRotation(getHandPitch(frame)),
      yaw: scaleRotation(getHandYaw(frame)),
    }
  }

  return {
    roll: 0,
    pitch: 0,
    yaw: 0,
  };
}

module.exports = {
  getHandHeight,
  getHandPitch,
  getHandRoll,
  getHandYaw,
  getHandVelocityInZ,
  getHandParams,
}