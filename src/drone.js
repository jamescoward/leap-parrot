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

  }

  updateAltitude(height) {
    
  }

}


module.exports = Drone;