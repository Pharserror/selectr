var React = require('react');


var SelectR = React.createClass({
  propTypes: {
    AJAXSpinnerClasses: React.PropTypes.string,
    AJAXSpinnerComponentFactory: React.PropTypes.func,
    AJAXSpinnerComponentProps: React.PropTypes.object,
    AJAXSpinnerListItemClasses: React.PropTypes.string,
    async: React.PropTypes.func,
    closeIconFactory: React.PropTypes.func,
    closeIconClass: React.PropTypes.string,
    debounceFunc: React.PropTypes.func,
    debounceTimeout: React.PropTypes.number,
    defaultGroupKey: React.PropTypes.string,
    groups: React.PropTypes.object,
    infiniteScrolling: React.PropTypes.bool,
    initialValue: React.PropTypes.array,
    inputWrapperClass: React.PropTypes.string,
    isSubmitAsync: React.PropTypes.bool,
    manualAJAXPrompt: React.PropTypes.string,
    multiple: React.PropTypes.bool,
    noMoreOptionsNotice: React.PropTypes.string,
    noMoreOptionsListItemClasses: React.PropTypes.string,
    onChange: React.PropTypes.func,
    options: React.PropTypes.array,
    optionsListItemClass: React.PropTypes.string,
    pageSize: React.PropTypes.number,
    placeholder: React.PropTypes.string,
    rootParentId: React.PropTypes.string,
    selectElementClass: React.PropTypes.string,
    selectElementName: React.PropTypes.string,
    selectionFormatter: React.PropTypes.func,
    selectOptionsListWrapperClass: React.PropTypes.string,
    shouldLogErrors: React.PropTypes.bool,
    spinnerImgPath: React.PropTypes.string,
    submitMethod: React.PropTypes.string,
    submitPassword: React.PropTypes.string,
    submitSelection: React.PropTypes.func,
    submitUrl: React.PropTypes.string,
    submitUser: React.PropTypes.string,
    wrapperClass: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      AJAXSpinnerClasses: 'ajax-spinner',
      AJAXSpinnerComponentFactory: undefined,
      AJAXSpinnerComponentProps: {},
      AJAXSpinnerListItemClasses: '',
      async: undefined,
      closeIconFactory: React.createFactory('em'),
      closeIconClass: '',
      debounceTimeout: 500,
      defaultGroupKey: 'default',
      groups: { default: { label: '', nodes: [] } },
      infiniteScrolling: false,
      initialValue: [],
      inputWrapperClass: '',
      isSubmitAsync: true,
      manualAJAXPrompt: 'Load more optons',
      multiple: false,
      noMoreOptionsNotice: 'No more options available',
      noMoreOptionsListItemClasses: '',
      onChange: function() { this.onChange(); },
      options: [],
      optionsListItemClass: 'list-item',
      pageSize: 10,
      placeholder: 'Please select from the dropdown or type to filter',
      rootParentId: 'root',
      selectElementClass: 'hidden',
      selectElementName: '',
      selectionFormatter: this.selectionFormatter,
      selectOptionsListWrapperClass: '',
      shouldLogErrors: false,
      spinnerImgPath: '/images/loader.gif',
      submitMethod: 'POST',
      submitPassword: undefined,
      submitSelection: this.submitSelection,
      submitUrl: 'http://localhost:3000',
      submitUser: undefined,
      wrapperClass: ''
    };
  },
  getInitialState: function() {
    return {
      availableOptions: { default: { label: '', nodes: [] } },
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
      page: 1,
      selectedOptions: []
    };
  },
  componentDidMount: function() {
    var newState = {};
    // We want to debounce the window resize, allowing users to pass in a debounce
    // function in-case they have a 3rd party library they would rather use
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
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    /*if ((nextState.availableOptions.length > this.state.availableOptions.length) ||
        (nextProps.options.length > this.props.length)) {*/
    return true;
    /*} else {
      return false;
    }*/
  },
  appendFetchedOptions: function(options) {
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
  },
  computeOptionsListWidth: function() {
    // We need to account for any border on the options list
    var optionsListStyle = window.getComputedStyle(this.refs.optionsList);
    return (
      (this.refs.componentWrapper.clientWidth
      - parseInt(optionsListStyle.borderLeftWidth)
      - parseInt(optionsListStyle.borderRightWidth))
      + 'px'
    );
  },
  debounceFunc: function(func, time) {
    time = time || this.props.debounceTimeout;
    var timeout;
    return function() {
      clearTimeout(timeout);
      timeout = setTimeout(func, time);
    }
  },
  getAJAXSpinnerComponent: function() {
    // The user can pass in their own React factory for something like React-Loader
    // if they don't want to use the packaged static image
    if (!!this.props.AJAXSpinnerComponentFactory) {
      return this.props.AJAXSpinnerComponentFactory(this.props.AJAXSpinnerComponentProps);
    } else {
      return (
        <img
          src={this.props.spinnerImgPath}
          className={this.props.AJAXSpinnerClasses}
        />
      );
    }
  },
  dispatcher: function(chain) {
    var toExecute = chain.pop();
    if (!!toExecute) {
      toExecute();
      this.dispatcher.call(this.dispatcher(chain), func);
    }
  },
  hideOptionsList: function(event) {
    this.setState({
      isListHidden: true
    });
  },
  loadMoreOptions: function() {
    if (!this.state.isAJAXing) {
      this.setState({
        isAJAXing: true,
        page: this.state.page
      }, function() {
        this.props.async(
          this.appendFetchedOptions,
          this.state.page,
          this.state.currentUserInput
        );
        // The spinner should be showing now so we want the user to see it
        this.refs.AJAXSpinner.scrollIntoView();
      });
    }
  },
  onBlur: function(event) {
    // TODO: store window.keyDown and bind this.keyDown
  },
  onWindowResize: function(event) {
    this.setState({
      optionsListWidth: this.computeOptionsListWidth()
    });
  },
  handleSubmitResponse: function() {
    var response = this.responseText;
    this.setState({ messages: 'success' });
  },
  isBottomOfListVisible: function() {
    var optionsList = this.refs.optionsList;
    // Should be equal to $options-list-max-height
    var optionsListHeight = optionsList.clientHeight;
    var isVisible = (optionsListHeight > 0) &&
                    ((optionsList.scrollHeight
                    - optionsList.clientHeight)
                    === optionsList.scrollTop);
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
          this.refs.input.value = newState.currentUserInput;
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
  },
  filterOptions: function(event, filter) {
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
    this.setState(newState);
  },
  onChange: function(event) {
    this.setState({
      page: 1
    }, this.filterOptions.bind(this, event));
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
  onSubmit: function(event) {
    var results = selectionFormatter(event);
    this.props.submitSelection(results);
  },
  populateSelectGroups: function() {
    var nodes = [];
    if (!!this.props.groups) {
      var groups = new Object(this.props.groups);
    } else {
      var groups = {};
      groups[this.props.defaultGroupKey] = {
        label: '',
        nodes: Array.from(this.state.availableOptions)
      };
    }
    for (var group in groups) {
      nodes.push(
        <optgroup
          key={groups[group].label.toLowerCase().split(' ').join('-')}
          label={groups[group].label}
        >
          {this.populateSelectGroupWithOptions(group)}
        </optgroup>
      );
    }
    return nodes;
  },
  populateSelectGroupWithOptions: function(groupKey) {
    var availableOptionsGroup = this.state.availableOptions[groupKey];
    var nodes = [];
    var selectedOptionsValues = [];
    if (!!availableOptionsGroup) {
      if (!!this.state.selectedOptions[0]) {
        selectedOptionsValues = this.state.selectedOptions.map(function(option) {
          return option.value;
        });
      }
      availableOptionsGroup.nodes.forEach(function(option, index, options) {
        nodes.push(
          <option
            key={option.label.toLowerCase().split(' ').join('-') + '-' + index}
            selected={selectedOptionsValues.indexOf(option.value) > -1}
            value={option.value}
          >
            {option.label}
          </option>
        );
      });
    }
    return nodes;
  },
  removeSelectedOption: function(option) {
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
      var availableOptionsValues =
        newState
        .availableOptions[optionGroup]
        .nodes
        .map(function(option) { return option.value; });
      availableOptionIndex = availableOptionsValues.indexOf(option.value);
      // New options get deleted
      newState.availableOptions[optionGroup].nodes.splice(availableOptionIndex, 1);
    }
    this.setState(newState);
  },
  renderInvisibleScreenNode: function() {
    var documentRect;
    var invisibleScreenStyle = {};
    var rootParentRect;
    if (!this.state.isListHidden) {
      documentRect = document.documentElement.getBoundingClientRect();
      try {
        rootParentRect = document
                         .getElementById(this.props.rootParentId)
                         .getBoundingClientRect();
      } catch (e) {}
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
        <li
          className={'ajax-spinner-list-item ' + this.props.AJAXSpinnerListItemClasses}
          ref='AJAXSpinner'
        >
          {this.getAJAXSpinnerComponent()}
        </li>
      );
    } else if (this.state.filteredOptions.length === 0) {
      // TODO: (hybrid) If user has removed an option and AJAX'd again then display the
      // notice, but not all the time
      return (
        <li className={'no-more-options-list-item' + this.props.noMoreOptionsListItemClasses}>
          {this.props.noMoreOptionsNotice}
        </li>
      );
    }
  },
  renderOptionsList: function() {
    return (
      <ul
        className={this.state.isListHidden ? 'hidden' : 'active'}
        style={{ width: this.state.optionsListWidth }}
        ref='optionsList'
      >
        {this.renderOptionsForList()}
        {this.renderLoadMoreOptionsOption()}
      </ul>
    );
  },
  renderOptionsForList: function() {
    var i = 1;
    var groupedNodes = {};
    var nodes = [];
    for (var group in this.props.groups) {
      groupedNodes[group] = [];
    }
    this.state.filteredOptions.forEach(function(option, index, options) {
      var isActive = this.state.currentlySelectedListOption === index;
      var optionGroup = option.group || this.props.defaultGroupKey;
      if (!groupedNodes[optionGroup]) {
        throw new Error("renderOptionsForList: data mismatch! An option has a group not passed to this.props.groups!");
      }
      groupedNodes[optionGroup].push(
        <li
          className={
            this.props.optionsListItemClass +
            (isActive ? ' active': '')
          }
          key={option.label.toLowerCase().split(' ').join('-') + '-' + index}
          onClick={this.selectOption.bind(this, option)}
          ref={isActive ? 'activeListItem': ''}
        >
          {option.label}
        </li>
      );
    }, this);
    for (var group in this.props.groups) {
      nodes.push(
        <li
          className='list-item-option-group'
          key={this.props.groups[group].label.toLowerCase().split(' ').join('-')}
        >
          {this.props.groups[group].label}
        </li>
      );
      nodes = nodes.concat(groupedNodes[group]);
    }
    return nodes;
  },
  renderOptionsListContainer: function() {
    var props = {
      className: this.props.selectOptionsListWrapperClass +
                 ' options-list-container'
    };
    if (this.props.infiniteScrolling) {
      props.onScroll = this.debounceFunc(this.isBottomOfListVisible);
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
            key={option.label.toLowerCase().split(' ').join('-')}
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
      this.refs.optionsList.scrollTop = this.refs.activeListItem.offsetTop;
    }
  },
  selectOption: function(option) {
    var newState = {
      currentlySelectedInputOption: this.state.selectedOptions.length,
      currentUserInput: '',
      selectedOptions: Array.from(this.state.selectedOptions)
    };
    newState.selectedOptions = newState.selectedOptions.concat(option);
    this.setState(newState, function() {
      this.refs.input.focus();
      this.filterOptions(undefined, this.state.currentUserInput);
    });
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
  selectionFormatter: function(event) {
    var selectedOptions = [];
    try {
      event.target.value.split(',').reduce(function(items, item, index, values) {
        this.state.options.forEach(function(option) {
          if (option.id === item) {
            items.push(option);
          }
        });
        return items;
      }, []);
    } catch (e) {
      if (!!this.props.shouldLogErrors) {
        console.log(e);
      }
    }
    return selectedOptions;
  },
  submitSelection: function(selection) {
    var request = new XMLHttpRequest();
    request.addEventListener('load', this.props.handleSubmitReponse);
    request.open(
      this.props.submitMethod,
      this.props.submitUrl,
      this.props.isSubmitAsync,
      this.props.submitUser,
      this.props.submitPassword
    );
    request.send(selection);
  },
  toggleOptionsList: function(isHidden, event) {
    this.setState({
      invisibleScreenClass: 'active',
      isListHidden: isHidden
    }, function() {
      if (!this.state.isListHidden) {
        this.setState({
          optionsListWidth: this.computeOptionsListWidth()
        });
      }
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
});

module.exports = SelectR;
