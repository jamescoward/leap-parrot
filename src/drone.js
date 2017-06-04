const { createDashboard } = require('./dashboard');

function isLaunchGesture(velocity) {
  return velocity > 1300;
}

function isLandGesture(velocity) {
  return velocity < -1300;
}

class Drone {

  constructor() {
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

  updateFlightParams(params) {
    this.dashboard.update(Object.assign({isFlying: this.isFlying()}, params));
  }

  startDisplay() {
    this.dashboard.start();
  }

  clearDisplay() {
    this.dashboard.clear();
  }

  updateAltitude(height) {

  }

}

module.exports = Drone;