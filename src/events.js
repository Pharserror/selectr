export function onBackspace(event) {
  if (!event.target.value || event.target.value === '') {
    var selectedOption = this.state.selectedOptions[this.state.currentlySelectedInputOption];
    if (!!selectedOption) {
      var newState = {
        currentlySelectedInputOption: this.state.currentlySelectedInputOption - 1
      };
      if (!!selectedOption.isNew) {
        newState.currentUserInput = selectedOption.value;
        this.refs.input.value = newState.currentUserInput;
      }
      this.setState(
        newState,
        this.removeSelectedOption.bind(this, selectedOption)
      );
    }
  }
}

export function onBlur(event) {
  // TODO: store window.keyDown and bind this.keyDown
}

export function onChange(event) {
  this.setState({
    page: 1
  }, this.filterOptions.bind(this, event));
  //if (!!this.props.onChange) {
  //  this.props.onChange();
  //}
}

export function onEnterTab(event) {
  event.preventDefault();
  this.refs.input.value = '';
  if (!!this.state.filteredOptions[this.state.currentlySelectedListOption]) {
    this.selectOption(this.state.filteredOptions[this.state.currentlySelectedListOption]);
  } else {
    var newOption = {
      isNew: true,
      label: this.state.currentUserInput,
      value: this.state.currentUserInput,
      group: this.props.defaultGroupKey
    };
    var newState = {
      availableOptions: new Object(this.state.availableOptions),
      currentlySelectedInputOption: this.state.selectedOptions.length,
      currentUserInput: '',
      selectedOptions: Array.from(this.state.selectedOptions)
    };
    newState.availableOptions[this.props.defaultGroupKey].nodes.push(newOption);
    newState.selectedOptions.push(newOption);
    this.setState(newState, this.filterOptions.bind(this, null, ''));
  }
}

export function onKeyDown(event) {
  switch (event.keyCode) {
    case 8: // backspace
      this.onBackspace(event);
      break;
    case 13: // enter
    case 9: // tab
      this.onEnterTab(event);
      break;
    case 37: // arrow left
      this.moveCursor('left');
      break;
    case 38: // arrow up
      this.selectFromList('prev');
      break;
    case 39: // arrow right
      this.moveCursor('right');
      break;
    case 40: // arrow down
      this.selectFromList('next');
      break;
  }
}

export function onScroll() {
  if (this.props.infiniteScrolling && this.isBottomOfListVisible()) {
    this.loadMoreOptions();
  }
}

export function onSubmit(event) {
  var results = selectionFormatter(event);
  this.props.submitSelection(results);
}

export function onWindowResize(event) {
  this.setState({
    optionsListWidth: this.computeOptionsListWidth()
  });
}

/* export default {
 *   onBackspace,
 *   onBlur,
 *   onChange,
 *   onEnterTab,
 *   onKeyDown,
 *   onScroll,
 *   onSubmit,
 *   onWindowResize
}*/
