const { createDashboard } = require('./dashboard');
const { getHandHeight } = require('./leapHand');

function isLaunchGesture(velocity) {
  return velocity > 1300;
}

function isLandGesture(velocity) {
  return velocity < -1300;
}

class Drone {

  constructor() {
    this.baseHeight = null;
    this.lastLandEvent = Date.now();
    this.hasTakenOff = false;
    this.dashboard = createDashboard();
  }

  isFlying() {
    return true;
  }

  canChangeLaunchState() {
    return Date.now() - this.lastLandEvent > 2000;
  }

  launch(velocity) {
    if (!this.isFlying()
      && this.canChangeLaunchState()
      && this.isLaunchGesture(Gesturevelocity)
    ) {
      this.lastLandEvent = Date.now();

      // LAUNCH

      return true
    }
    return false;
  }

  land(velocity) {
    if (!this.isFlying()
      && this.canChangeLaunchState()
      && this.isLandGesture(velocity)
    ) {
      this.lastLandEvent = Date.now();

      // LAND      

      return true
    }
    return false;
  }

  doVelocityAction(vel) {
    // only one of these can happen at once
    this.launch(vel);
    this.land(vel);
  }

  setBaseHeight(frame) {
    if(frame.hands.length && !this.baseHeight) {
      this.baseHeight = getHandHeight(frame);
    } else if (!frame.hands.length) {
      this.baseHeight = null;
    }
  }

  updateFlightParams(params) {
    const paramsClone = Object.assign({}, params);

    if(Math.abs(this.baseHeight - params.height) > 10) {
      const adjusted = params.height - this.baseHeight;
      paramsClone.altitude = adjusted;
      this.baseHeight = params.height;
    } else {
      paramsClone.altitude = 0;
    }

    this.dashboard.update(Object.assign({
      isFlying: this.isFlying(),
      baseHeight: this.baseHeight,
    }, paramsClone));
  }

  startDisplay() {
    this.dashboard.start();
  }

  clearDisplay() {
    this.dashboard.clear();
  }
}

module.exports = Drone;