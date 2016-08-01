BuyerApp.Components.GmailSelect = React.createClass({
  propTypes: {
    AJAXSpinnerComponentFactory: React.PropTypes.func,
    AJAXSpinnerComponentProps: React.PropTypes.object,
    async: React.PropTypes.func,
    closeIconFactory: React.PropTypes.func,
    closeIconClass: React.PropTypes.string,
    infiniteScrolling: React.PropTypes.bool,
    initialValue: React.PropTypes.array,
    inputWrapperClass: React.PropTypes.string,
    manualAJAXPrompt: React.PropTypes.string,
    multiple: React.PropTypes.bool,
    noMoreOptionsNotice: React.PropTypes.string,
    onChange: React.PropTypes.func,
    options: React.PropTypes.array,
    optionsListItemClass: React.PropTypes.string,
    pageSize: React.PropTypes.number,
    placeholder: React.PropTypes.string,
    rootParentId: React.PropTypes.string,
    selectElementClass: React.PropTypes.string,
    selectElementName: React.PropTypes.string,
    selectOptionsListWrapperClass: React.PropTypes.string,
    spinnerImgPath: React.PropTypes.string,
    wrapperClass: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      AJAXSpinnerComponentFactory: undefined,
      AJAXSpinnerComponentProps: {},
      async: undefined,
      closeIconFactory: React.createFactory('em'),
      closeIconClass: '',
      infiniteScrolling: false,
      initialValue: [],
      inputWrapperClass: '',
      manualAJAXPrompt: 'Load more optons',
      multiple: false,
      noMoreOptionsNotice: 'No more options available',
      onChange: function() { this.onChange(); },
      options: [],
      optionsListItemClass: 'list-item',
      pageSize: 10,
      placeholder: 'Please select from the dropdown or type to filter',
      rootParentId: 'inner-content',
      selectElementClass: '', // 'hidden',
      selectElementName: '',
      selectOptionsListWrapperClass: '',
      spinnerImgPath: '/assets/select2-spinner.gif',
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
      filteredOptions: [],
      invisibleScreenClass: 'hidden',
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
    window.addEventListener('resize', this.onWindowResize);
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
    if (!!this.props.AJAXSpinnerComponentFactory) {
      return this.props.AJAXSpinnerComponentFactory(this.props.AJAXSpinnerComponentProps);
    } else {
      return (
        <img src='/assets/select2-spinner.gif' />
      );
    }
  },
  hideOptionsList: function(event) {
    this.setState({
      isListHidden: true
    });
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
    if (!event.target.value || event.target.value === '') {
      var selectedOption = this.state.selectedOptions[this.state.currentlySelectedInputOption];
      if (!!selectedOption) {
        var newState = {
          currentlySelectedInputOption: this.state.currentlySelectedInputOption - 1
        };
        if (!!selectedOption.isNew) {
          newState.currentUserInput = selectedOption.value;
          this.refs.input.getDOMNode().value = newState.currentUserInput;
        }
        this.setState(
          newState,
          this.removeSelectedOption.bind(this, selectedOption)
        );
      }
    }
  },
  onEnterTab: function(event) {
    event.preventDefault();
    this.refs.input.getDOMNode().value = '';
    if (!!this.state.filteredOptions[this.state.currentlySelectedListOption]) {
      this.selectOption(this.state.filteredOptions[this.state.currentlySelectedListOption]);
    } else {
      var newOption = {
        isNew: true,
        label: this.state.currentUserInput,
        value: this.state.currentUserInput
      };
      var newState = {
        availableOptions: Array.from(this.state.availableOptions),
        currentlySelectedInputOption: this.state.selectedOptions.length,
        currentUserInput: '',
        selectedOptions: Array.from(this.state.selectedOptions)
      };
      newState.availableOptions.push(newOption);
      newState.selectedOptions.push(newOption);
      this.setState(newState, this.filterOptions.bind(this, null, ''));
    }
  },
  filterOptions: function(event, filter) {
    var filterExp = !!event ? new RegExp(event.target.value) : new RegExp(filter);
    var selectedOptionsValues = this.state.selectedOptions.map(function(option, index, options) {
      return option.value;
    });
    newState = {
      currentlySelectedListOption: 0,
      currentUserInput: !!event ? event.target.value : filter,
      filteredOptions: this.state.availableOptions.filter(function(option) {
        return (
          !!option.label.match(filterExp) &&
          !option.isNew &&
          selectedOptionsValues.indexOf(option.value) === -1
        );
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
    } else {
      newState.availableOptions = Array.from(this.state.availableOptions);
      var availableOptionIndex;
      var availableOptionsValues = newState.availableOptions.map(function(option) {
        return option.value;
      });
      availableOptionIndex = availableOptionsValues.indexOf(option.value);
      newState.availableOptions.splice(availableOptionIndex, 1);
    }
    this.setState(newState);
  },
  renderInvisibleScreenNode: function() {
    var documentRect;
    var invisibleScreenStyle = {};
    var rootParentRect;
    if (!this.state.isListHidden) {
      documentRect = document.documentElement.getBoundingClientRect();
      rootParentRect = document
                       .getElementById(this.props.rootParentId)
                       .getBoundingClientRect();
      invisibleScreenStyle.height = documentRect.height + 'px';
      invisibleScreenStyle.width = documentRect.width + 'px';
      try {
        invisibleScreenStyle.left = (0 - rootParentRect.left) + 'px';
      } catch (e) {
        invisibleScreenStyle.left = 0;
      }
      try {
        invisibleScreenStyle.top = (0 - rootParentRect.top) + 'px';
      } catch (e) {
        invisibleScreenStyle.top = 0;
      }
    }
    return (
      <div
        className={this.state.invisibleScreenClass + ' invisible-screen'}
        onClick={this.hideOptionsList}
        style={invisibleScreenStyle}
      ></div>
    );
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
    } else if (this.state.filteredOptions.length === 0) {
      // TODO: If user has removed an option and AJAX'd again then display the
      // notice, but not all the time
      return (
        <li>
          {this.props.noMoreOptionsNotice}
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
            {this.props.closeIconFactory({}, 'x')}
          </a>
          {option.label}
        </li>
      );
    }, this);
    return nodes;
  },
  scrollActiveListItemIntoView: function() {
    if (!!this.refs.activeListItem) {
      this.refs.optionsList.getDOMNode().scrollTop = this.refs.activeListItem.getDOMNode().offsetTop;
    }
  },
  selectOption: function(option) {
    var filteredOptionsValues;
    var selectedOptionIndex;
    if (option.value === 'AJAX_LOAD') {
      this.loadMoreOptions();
    } else {
      newState = {
        currentlySelectedInputOption: this.state.selectedOptions.length,
        filteredOptions: Array.from(this.state.filteredOptions),
        selectedOptions: Array.from(this.state.selectedOptions)
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
  },
  toggleOptionsList: function(isHidden, event) {
    this.setState({
      invisibleScreenClass: 'active',
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
});
