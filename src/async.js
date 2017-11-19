export function appendFetchedOptions(options) {
  var availableOptionsValues = [];
  var callback =
    options.callback ||
    !!this.props.async
    ? this.setState.bind(
      this,
      { page: this.state.page + 1 }
    ) : (function() { return; });
  // We want to append any options to what we already have
  var newState = { availableOptions: new Object(this.state.availableOptions) };

  for (var group in this.props.groups) {
    // If the group doesn't exist we initialize it
    if (!newState.availableOptions[group]) {
      newState.availableOptions[group] = {
        label: this.props.groups[group].label || this.props.defaultGroupKey,
        nodes: []
      };
    }
    // Otherwise we add what we have to the list of available options
    newState.availableOptions[group].nodes.map(function(option) {
      return availableOptionsValues.push(option.value);
    });
  }
  // We discard whatever we've received that is already in the list of available
  // options so that we don't display the same thing twice
  options = options.filter(function(option) {
    return availableOptionsValues.indexOf(option.value) === -1;
  });

  options.forEach(function(option) {
    var optionGroup = option.group || this.props.defaultGroupKey;
    if (!!newState.availableOptions[optionGroup]) {
      newState.availableOptions[optionGroup].nodes.push(option);
    }
  }, this);

  newState.canLoadMoreOptions = options.length === this.props.pageSize;
  newState.isAJAXing = false;

  this.setState(newState, function() {
    this.filterOptions(null, this.state.currentUserInput);
  });
}
