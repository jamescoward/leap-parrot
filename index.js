const leap = require('leapjs');

const {
  getHandVelocityInZ,
  getHandParams,
  getHandHeight,
} = require('./src/leapHand');

const Drone = require('./src/drone');

const controller = new leap.Controller();
const drone = new Drone();

controller.on('connect', function () {
  console.log("Successfully connected.");
});

controller.on('streamingStarted', () => {
  console.log('Started recieving data');  
})

controller.on('frame', frame => {
  const vel = getHandVelocityInZ(frame);
  const flightParams = getHandParams(frame);
  const height = getHandHeight(frame);

  drone.setBaseHeight(frame);
  flightParams.height = height;
  drone.doVelocityAction(vel);
  drone.updateFlightParams(Object.assign({height}, flightParams));
});

controller.connect();