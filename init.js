require('./selectr.scss');
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var SelectR = require('./SelectR.jsx');


function generateRandomOptions(callback, page, currentUserInput) {
  var options = [];
  var max = 999;
  var min = 0;
  var seed = Math.floor(Math.random() * (max - min + 1)) + min;
  for (var i = 0; i <= 9; i++) {
    options.push({
      group: 'default',
      label: 'test-' + seed + '-' + i,
      value: 'test-' + seed + '-' + i
    });
  }
  if (!!callback) {
    // Fake a wait time so it seems more realistic and you can see the spinner
    setTimeout(callback.bind(null, options), 4000);
  } else {
    return options;
  }
}
$(document).on('ready', function() {
  var options = generateRandomOptions();
  ReactDOM.render(
    React.createElement(
      SelectR,
      {
        async: generateRandomOptions,
        groups: { default: { label: 'TEST', nodes: [] } },
        infiniteScrolling: true,
        options: options,
        rootParentId: 'root',
        initialValue: [options[0]]
      }
    ),
    document.getElementById('root')
  );
});
