const blessed = require('blessed');

function createDashboard() {

  // Create a screen object.
  var screen = blessed.screen({
    smartCSR: true
  });

  // Create a box perfectly centered horizontally and vertically.
  const box = blessed.box({
    top: 'center',
    left: 'center',
    width: '50%',
    height: '100%',
    content: '{bold}leap-parrot{/bold}',
    tags: true,
    border: {
      type: 'line'
    },
    style: {
      fg: 'white',
      bg: 'black',
      border: {
        fg: '#f0f0f0'
      },
      hover: {
        bg: 'green'
      }
    }
  });

  const table = blessed.table({

  });

  box.append(table);

  // Append our box to the screen.
  screen.append(box);

  // Quit on Escape, q, or Control-C.
  screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
  });

  // Focus our element.
  box.focus();

  function update({
    pitch,
    yaw,
    roll,
    isFlying,
  }) {

    table.setData([
      ['Pitch:', `${Math.round(pitch)}°`],
      ['Yaw:', `${Math.round(yaw)}°`],
      ['Roll:', `${Math.round(roll)}°`],
      ['Is Flying:', `${isFlying}`],
    ]);
    screen.render();
  }

  function clear() {
    screen.realloc();
  }

  function start() {
    screen.render();
  }

  return {
    update,
    clear,
    start,
  }
}
// Render the screen.
module.exports = {
  createDashboard,
}