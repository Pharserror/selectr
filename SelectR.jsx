BuyerApp.Components.GmailSelect = React.createClass({
  propTypes: {
    async: React.PropTypes.func,
    initialValue: React.PropTypes.array,
    multiple: React.PropTypes.bool,
    options: React.PropTypes.array,
    onChange: React.PropTypes.func,
    selectElementClass: React.PropTypes.string,
    selectElementName: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    wrapperClass: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      AJAXSpinnerComponentClass: undefined,
      async: undefined,
      closeIcon: 'x',
      closeIconClass: '',
      infiniteScrolling: false,
      initialValue: [],
      inputWrapperClass: '',
      manualAJAXPrompt: 'Load more optons...',
      multiple: false,
      options: [],
      optionsListItemClass: 'list-item',
      onChange: function() { this.onChange(); },
      pageSize: 10,
      selectElementClass: '', // 'hidden',
      selectElementName: '',
      selectOptionsListWrapperClass: '',
      spinnerImgPath: '/assets/select2-spinner.gif',
      placeholder: 'Please select from the dropdown or type to filter',
      wrapperClass: ''
    };
  },
  getInitialState: function() {
    return {
      availableOptions: [],
      canLoadMoreOptions: false,
      currentlySelectedInputOption: -1,
      currentlySelectedListOption: 0,
      currentUserInput: "",
      cursorPosition: -1, // If a user just hits backspace it will remove from the end of the array
      filteredOptions: [],
      isAJAXing: false,
      isListHidden: true,
      isPendingOptionsUpdate: false,
      optionsListWidth: '0px',
      selectedOptions: []
    };
  },
  componentDidMount: function() {
    if (!!this.props.throttleFunc && this.props.isSearchThrottled) {
      this.filterOptions = this.props.throttleFunc(this.filterOptions);
    }
    if (!!this.props.async) {
      this.loadMoreOptions();
    } else {
      var newState = {};
      newState.availableOptions = this.props.options;
      newState.filteredOptions = this.props.options;
      this.setState(newState);
    }
  },
  appendFetchedOptions: function(options) {
    var availableOptionsValues = this.state.availableOptions.map(function(option) {
      return option.value;
    });
    var newState = { availableOptions: this.state.availableOptions };
    options = options.filter(function(option) {
      return availableOptionsValues.indexOf(option.value) === -1;
    });
    newState.availableOptions = newState.availableOptions.concat(options);
    newState.canLoadMoreOptions = options.length === this.props.pageSize;
    newState.isAJAXing = false;
    this.setState(newState, function() {
      this.filterOptions(null, this.state.currentUserInput);
    });
  },
  getAJAXSpinnerComponent: function() {
    if (!!this.props.AJAXSpinnerComponentClass) {
      return (
        <this.props.AJAXSpinnerComponentClass />
      );
    } else {
      return (
        <img src='/assets/select2-spinner.gif' />
      );
    }
  },
  loadMoreOptions: function() {
    this.setState({
      isAJAXing: true
    }, function() {
      this.props.async(this.appendFetchedOptions);
    });
  },
  onWindowResize: function(event) {
    this.setState({
      optionsListWidth: this.refs.componentWrapper.getDOMNode().clientWidth + 'px'
    });
  },
  isBottomOfListVisible: function() {
    var optionsList = this.refs.optionsList.getDOMNode();
    var optionsListHeight = optionsList.clientHeight;
    var optionsListScrollY = optionsList.scrollTop;
    var isVisible = (optionsListHeight >= 0) &&
                    (optionsListHeight <= optionsListScrollY);
    if (isVisible) {
      this.loadMoreOptions();
    }
  },
  onBackspace: function(event) {
    var selectedOption = this.state.selectedOptions[this.state.cursorPosition];
    if (!!selectedOption) {
      var newState = {
        selectedOptions: Array.from(this.state.selectedOptions)
      };
      newState.selectedOptions.splice(this.state.cursorPosition, 1);
      if (!!selectedOption.isNew) {
        newState.currentUserInput = selectedOption.value.slice(0, -1);
      }
      this.setState(newState);
    }
  },
  onEnterTab: function(event) {
    this.refs.input.getDOMNode().value = '';
    if (!!this.state.filteredOptions[this.state.currentlySelectedListOption]) {
      this.selectOption(this.state.filteredOptions[this.state.currentlySelectedListOption]);
    } else {
      debugger;
      var newOption = {
        isNew: true,
        label: this.state.currentUserInput,
        value: this.state.currentUserInput
      };
      var newState = {
        availableOptions: Array.from(this.state.availableOptions),
        currentUserInput: '',
        selectedOptions: Array.from(this.state.selectedOptions)
      };
      newState.availableOptions.push(newOption);
      newState.selectedOptions.push(newOption);
      this.setState(newState, function() {
        this.filterOptions(null, '');
      });
    }
  },
  filterOptions: function(event, filter) {
    var filterExp = !!event ? new RegExp(event.target.value) : new RegExp(filter);
    newState = {
      currentlySelectedListOption: 0,
      currentUserInput: !!event ? event.target.value : filter,
      filteredOptions: this.state.availableOptions.filter(function(option) {
        return !!option.label.match(filterExp) && !option.isNew;
      }),
      isAJAXing: false
    };
    this.setState(newState);
  },
  onChange: function(event) {
    this.filterOptions(event);
    //if (!!this.props.onChange) {
    //  this.props.onChange();
    //}
  },
  onKeyDown: function(event) {
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
  },
  populateSelectWithOptions: function() {
    var nodes = [];
    var selectedOptionsValues = [];
    if (!!this.state.availableOptions[0] && !!this.state.selectedOptions[0]) {
      selectedOptionsValues = this.state.selectedOptions.map(function(option) {
        return option.value;
      });
    }
    this.state.availableOptions.forEach(function(option, index, options) {
      nodes.push(
        <option
          key={option.label + '-' + index}
          selected={selectedOptionsValues.indexOf(option.value) > -1}
          value={option.value}
        >
          {option.label}
        </option>
      );
    });
    return nodes;
  },
  removeSelectedOption: function(option) {
    // TODO: Don't add back options that exist
    var selectedOptionsValues;
    var removedOptionIndex;
    newState = {
      availableOptions: Array.from(this.state.availableOptions),
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
    }
    this.setState(newState);
  },
  renderLoadMoreOptionsOption: function() {
    if (!this.props.infiniteScrolling &&
        !!this.props.async &&
        !this.state.isAJAXing &&
        this.state.canLoadMoreOptions
       ) {

      return (
        <li onClick={this.loadMoreOptions}>
          {this.props.manualAJAXPrompt}
        </li>
      );
    } else if (this.state.isAJAXing) {
      return (
        <li className='ajax-spinner'>
          {this.getAJAXSpinnerComponent()}
        </li>
      );
    }
  },
  renderOptionsList: function() {
    return (
      <ul
        className={
          this.state.isListHidden ? 'hidden' : 'active'
        }
        style={{ width: this.state.optionsListWidth }}
        ref='optionsList'
      >
        {this.renderOptionsForList()}
        {this.renderLoadMoreOptionsOption()}
      </ul>
    );
  },
  renderOptionsForList: function() {
    var nodes = [];
    this.state.filteredOptions.forEach(function(option, index, options) {
      var isActive = this.state.currentlySelectedListOption === index;
      nodes.push(
        <li
          className={
            this.props.optionsListItemClass +
            (isActive ? ' active': '')
          }
          key={option.label + '-' + index}
          onClick={this.selectOption.bind(this, option)}
          ref={isActive ? 'activeListItem': ''}
        >
          {option.label}
        </li>
      );
    }, this);
    return nodes;
  },
  renderOptionsListContainer: function() {
    var props = {
      className: this.props.selectOptionsListWrapperClass +
                 ' options-list-container'
    };
    if (this.props.infiniteScrolling) {
      props.onScroll = this.isBottomOfListVisible;
    }
    return (
      React.createElement('div', props, this.renderOptionsList())
    );
  },
  renderSelectedOptionTags: function() {
    var nodes = [];
    this.state.selectedOptions.forEach(function(option, index, options) {
      nodes.push(
        <li>
          <a
            className={this.props.closeIconClass + ' close-icon'}
            href='javascript:void(0)'
            onClick={this.removeSelectedOption.bind(this, option)}
          >
            {this.props.closeIcon}
          </a>
          {option.label}
        </li>
      );
    }, this);
    return nodes;
  },
  scrollActiveListItemIntoView: function() {
    this.refs.optionsList.getDOMNode().scrollTop = this.refs.activeListItem.getDOMNode().offsetTop;
  },
  selectOption: function(option) {
    var filteredOptionsValues;
    var selectedOptionIndex;
    if (option.value === 'AJAX_LOAD') {
      this.loadMoreOptions();
    } else {
      newState = {
        filteredOptions: this.state.filteredOptions,
        selectedOptions: this.state.selectedOptions
      };
      filteredOptionsValues = newState.filteredOptions.map(function(option) {
        return option.value;
      });
      selectedOptionIndex = filteredOptionsValues.indexOf(option.value);
      newState.filteredOptions.splice(selectedOptionIndex, 1);
      newState.selectedOptions = newState.selectedOptions.concat(option);
      this.setState(newState, function() {
        this.refs.input.getDOMNode().focus();
      });
    }
  },
  selectFromList: function(selection) {
    var selectedOption = this.state.currentlySelectedListOption;
    switch (selection) {
      case 'next':
        this.setState({
          currentlySelectedListOption: (
            selectedOption === (this.state.filteredOptions.length - 1)
            ? selectedOption
            : ++selectedOption
          )
        }, this.scrollActiveListItemIntoView);
        break;
      case 'prev':
        this.setState({
          currentlySelectedListOption: (
            selectedOption === -1
            ? selectedOption
            : --selectedOption
          )
        }, this.scrollActiveListItemIntoView);
        break;
    }
  },
  toggleOptionsList: function(isHidden, event) {
    this.setState({
      isListHidden: isHidden,
      optionsListWidth: this.refs.componentWrapper.getDOMNode().clientWidth + 'px'
    });
  },
  render: function() {
    return (
      <div
        className={this.props.wrapperClass + ' gmail-select'}
        ref='componentWrapper'
      >
        <select
          className={this.props.selectElementClass}
          multiple={!!this.props.multiple}
          name={this.props.selectElementName}
        >
          {this.populateSelectWithOptions()}
        </select>
        <div
          className={
            this.props.inputWrapperClass +
            (this.state.isListHidden ? '' : 'active') +
            ' input-container'
          }
        >
          <ul>
            {this.renderSelectedOptionTags()}
            <li>
              <input
                onChange={this.onChange}
                onFocus={this.toggleOptionsList.bind(this, false)}
                onKeyDown={this.onKeyDown}
                ref='input'
              />
            </li>
          </ul>
        </div>
        {this.renderOptionsListContainer()}
      </div>
    );
  }
});
