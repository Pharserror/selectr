export function hideOptionsList(event) {
  this.setState({
    isListHidden: true
  });
}

export function filterOptions(event, filter) {
  var filterExp = !!event ? new RegExp(event.target.value) : new RegExp(filter);
  var selectedOptionsValues = this.state.selectedOptions.map(function(option, index, options) {
    return option.value;
  });

  var availableOptions = [];

  for (var group in this.props.groups) {
    this.state.availableOptions[group].nodes.forEach(function(option) {
      availableOptions.push(option);
    });
  }

  var newState = {
    currentlySelectedListOption: 0,
    currentUserInput: !!event ? event.target.value : filter,
    filteredOptions: availableOptions.filter(function(option) {
      return (
        !!option.label.match(filterExp) &&
          !option.isNew &&
          selectedOptionsValues.indexOf(option.value) === -1
      );
    }),
    isAJAXing: false
  };

  //this.setState(newState);
  return newState;
}

export function removeSelectedOption(option) {
  var selectedOptionIndex;
  var selectedOptionsValues;
  var removedOptionIndex;
  var newState = {
    canLoadMoreOptions: true,
    filteredOptions: Array.from(this.state.filteredOptions),
    selectedOptions: Array.from(this.state.selectedOptions)
  };

  selectedOptionsValues = newState.selectedOptions.map(function(option) {
    return option.value;
  });

  selectedOptionIndex = selectedOptionsValues.indexOf(option.value);
  newState.selectedOptions.splice(selectedOptionIndex, 1);

  if (!option.isNew) {
    newState.filteredOptions = newState.filteredOptions.concat(option);
    // If this is a pre-existing option we want it to go back into the right place
    newState.filteredOptions = newState.filteredOptions.sort(function(a, b) {
      if (a.label < b.label) return -1;
      if (a.label > b.label) return 1;
      return 0;
    });
  } else {
    newState.availableOptions = new Object(this.state.availableOptions);
    var availableOptionIndex;
    var optionGroup = option.group || this.props.defaultGroupKey;
    var availableOptionsValues = (
      newState
      .availableOptions[optionGroup]
      .nodes
      .map(function(option) { return option.value; })
    );

    availableOptionIndex = availableOptionsValues.indexOf(option.value);
    // New options get deleted
    newState.availableOptions[optionGroup].nodes.splice(availableOptionIndex, 1);
  }

  this.setState(newState);
}

export function selectFromList(selection) {
  var selectedOption = this.state.currentlySelectedListOption;

  switch (selection) {
  case 'next':
    this.setState({
      currentlySelectedListOption: (
        selectedOption === (this.state.filteredOptions.length - 1)
          ? selectedOption
          : (selectedOption + 1)
      )
    }, this.scrollActiveListItemIntoView);

    break;
  case 'prev':
    this.setState({
      currentlySelectedListOption: (
        selectedOption === -1
          ? selectedOption
          : (selectedOption - 1)
      )
    }, this.scrollActiveListItemIntoView);

    break;
  }
}

export function selectOption(option) {
  var newState = { currentUserInput: '' };

  if (this.props.multiple) {
    newState.selectedOptions = Array.from(this.state.selectedOptions);
    newState.selectedOptions = newState.selectedOptions.concat(option);
    newState.currentlySelectedInputOption = this.state.selectedOptions.length;
  } else if (!!this.state.selectedOptions[0]) {
    this.removeSelectedOption(this.state.selectedOptions[0]);
    newState.selectedOptions = [option];
    newState.currentlySelectedInputOption = 0;
  }

  this.setState(newState, function() {
    this.refs.input.focus();
    this.setState(filterOptions(undefined, this.state.currentUserInput));
  });
}

export function toggleOptionsList(isHidden, event) {
  this.setState({
    invisibleScreenClass: 'active',
    isListHidden: isHidden
  }, () => (
    !this.state.isListHidden
    ? { optionsListWidth: this.computeOptionsListWidth() }
    : {}
  ));
}
