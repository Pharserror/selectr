export function componentDidMount() {
  var newState = {};
  /* We want to debounce the window resize, allowing users to pass in a debounce
   * function in-case they have a 3rd party library they would rather use
   */
  this.debounceFunc = this.props.debounceFunc || this.debounceFunc;
  this.onWindowResize = this.debounceFunc(this.onWindowResize);

  window.addEventListener('resize', this.onWindowResize);

  if (!!this.props.throttleFunc && this.props.isSearchThrottled) {
    this.filterOptions = this.props.throttleFunc(this.filterOptions);
  }

  if (!!this.props.initialValue) {
    newState.selectedOptions = Array.from(this.props.initialValue);
  }

  if (!!this.props.options) {
    this.appendFetchedOptions(this.props.options);
  }

  this.setState(newState, function() {
    if (!!this.props.async && this.props.options.length === 0) {
      this.loadMoreOptions();
    }
  });
}

export function shouldComponentUpdate(nextProps, nextState) {
  // TODO: The component should update if:
  // - the user input has changed
  // - the [available/selected]Options are different than the previous
  /*if ((nextState.availableOptions.length !== this.state.availableOptions.length) ||
    (nextProps.options.length > this.props.length)) {*/
  return true;
  /*} else {
    return false;
    }*/
}

export function render() {
  return (
    <div
      className={this.props.wrapperClass + ' gmail-select'}
      ref='componentWrapper'
    >
      <select
        className={this.props.selectElementClass}
        multiple={!!this.props.multiple}
        name={this.props.selectElementName}
        ref='selectElement'
      >
        {this.populateSelectGroups()}
      </select>
      <div
        className={
          this.props.inputWrapperClass +
          (this.state.isListHidden ? '' : 'active') +
          ' input-container'
        }
      >
        <ul ref='selectedOptionsList'>
          {this.renderSelectedOptionTags()}
          <li>
            <input
              onChange={this.onChange}
              onBlur={this.onBlur}
              onFocus={this.toggleOptionsList.bind(this, false)}
              onKeyDown={this.onKeyDown}
              placeholder={this.props.placeholder}
              ref='input'
              type='text'
            />
          </li>
        </ul>
      </div>
      {this.renderOptionsListContainer()}
      {this.renderInvisibleScreenNode()}
    </div>
  );
}

// export default { componentDidMount, shouldComponentUpdate, render };
