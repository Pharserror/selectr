/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);

	var SelectR = React.createClass({
	  displayName: 'SelectR',

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
	  getDefaultProps: function getDefaultProps() {
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
	      manualAJAXPrompt: 'Load more options',
	      multiple: false,
	      noMoreOptionsNotice: 'No more options available',
	      noMoreOptionsListItemClasses: '',
	      onChange: function onChange() {
	        this.onChange();
	      },
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
	      smartScroll: false,
	      spinnerImgPath: '/images/loader.gif',
	      submitMethod: 'POST',
	      submitPassword: undefined,
	      submitSelection: this.submitSelection,
	      submitUrl: 'http://localhost:3000',
	      submitUser: undefined,
	      wrapperClass: ''
	    };
	  },
	  getInitialState: function getInitialState() {
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
	  componentDidMount: function componentDidMount() {
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
	    this.setState(newState, function () {
	      if (!!this.props.async && this.props.options.length === 0) {
	        this.loadMoreOptions();
	      }
	    });
	  },
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    // TODO: The component should update if:
	    // - the user input has changed
	    // - the [available/selected]Options are different than the previous
	    /*if ((nextState.availableOptions.length !== this.state.availableOptions.length) ||
	        (nextProps.options.length > this.props.length)) {*/
	    return true;
	    /*} else {
	      return false;
	    }*/
	  },
	  appendFetchedOptions: function appendFetchedOptions(options) {
	    var availableOptionsValues = [];
	    var callback = options.callback || !!this.props.async ? this.setState.bind(this, { page: this.state.page + 1 }) : function () {
	      return;
	    };
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
	      newState.availableOptions[group].nodes.map(function (option) {
	        return availableOptionsValues.push(option.value);
	      });
	    }
	    // We discard whatever we've received that is already in the list of available
	    // options so that we don't display the same thing twice
	    options = options.filter(function (option) {
	      return availableOptionsValues.indexOf(option.value) === -1;
	    });
	    options.forEach(function (option) {
	      var optionGroup = option.group || this.props.defaultGroupKey;
	      if (!!newState.availableOptions[optionGroup]) {
	        newState.availableOptions[optionGroup].nodes.push(option);
	      }
	    }, this);
	    newState.canLoadMoreOptions = options.length === this.props.pageSize;
	    newState.isAJAXing = false;
	    this.setState(newState, function () {
	      this.filterOptions(null, this.state.currentUserInput);
	    });
	  },
	  computeOptionsListWidth: function computeOptionsListWidth() {
	    // We need to account for any border on the options list
	    var optionsListStyle = window.getComputedStyle(this.refs.optionsList);
	    return this.refs.componentWrapper.clientWidth - parseInt(optionsListStyle.borderLeftWidth) - parseInt(optionsListStyle.borderRightWidth) + 'px';
	  },
	  debounceFunc: function debounceFunc(func, time) {
	    time = time || this.props.debounceTimeout;
	    var timeout;
	    return function () {
	      clearTimeout(timeout);
	      timeout = setTimeout(func, time);
	    };
	  },
	  dispatcher: function dispatcher(chain) {
	    var toExecute = chain.pop();
	    if (!!toExecute) {
	      toExecute();
	      this.dispatcher.call(this.dispatcher(chain), func);
	    }
	  },
	  filterOptions: function filterOptions(event, filter) {
	    var filterExp = !!event ? new RegExp(this.state.currentUserInput) : new RegExp(filter);
	    var selectedOptionsValues = this.state.selectedOptions.map(function (option, index, options) {
	      return option.value;
	    });
	    var availableOptions = [];
	    for (var group in this.props.groups) {
	      this.state.availableOptions[group].nodes.forEach(function (option) {
	        availableOptions.push(option);
	      });
	    }
	    var newState = {
	      currentlySelectedListOption: 0,
	      filteredOptions: availableOptions.filter(function (option) {
	        return !!option.label.match(filterExp) && !option.isNew && selectedOptionsValues.indexOf(option.value) === -1;
	      }),
	      isAJAXing: false
	    };
	    this.setState(newState);
	  },
	  getAJAXSpinnerComponent: function getAJAXSpinnerComponent() {
	    // The user can pass in their own React factory for something like React-Loader
	    // if they don't want to use the packaged static image
	    if (!!this.props.AJAXSpinnerComponentFactory) {
	      return this.props.AJAXSpinnerComponentFactory(this.props.AJAXSpinnerComponentProps);
	    } else {
	      return React.createElement('img', {
	        src: this.props.spinnerImgPath,
	        className: this.props.AJAXSpinnerClasses
	      });
	    }
	  },
	  handleSubmitResponse: function handleSubmitResponse() {
	    var response = this.responseText;
	    this.setState({ messages: 'success' });
	  },
	  hideOptionsList: function hideOptionsList(event) {
	    this.setState({
	      isListHidden: true
	    });
	  },
	  isBottomOfListVisible: function isBottomOfListVisible() {
	    var optionsList = this.refs.optionsList;
	    // Should be equal to $options-list-max-height
	    var optionsListHeight = optionsList.clientHeight;
	    var isVisible = optionsListHeight > 0 && optionsList.scrollHeight - optionsList.clientHeight === optionsList.scrollTop;
	    return isVisible;
	  },
	  loadMoreOptions: function loadMoreOptions() {
	    if (!this.state.isAJAXing) {
	      this.setState({
	        isAJAXing: true,
	        page: this.state.page
	      }, function () {
	        this.props.async(this.appendFetchedOptions, this.state.page, this.state.currentUserInput);
	        // The spinner should be showing now so we want the user to see it
	        this.refs.AJAXSpinner.scrollIntoView();
	      });
	    }
	  },
	  onBackspace: function onBackspace(event) {
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
	        this.setState(newState, this.removeSelectedOption.bind(this, selectedOption));
	      }
	    }
	  },
	  onBlur: function onBlur(event) {
	    // TODO: store window.keyDown and bind this.keyDown
	  },
	  onChange: function onChange(event) {
	    this.setState({
	      currentUserInput: event.target.value,
	      page: 1
	    }, this.filterOptions.bind(this, event));
	    //if (!!this.props.onChange) {
	    //  this.props.onChange();
	    //}
	  },
	  onEnterTab: function onEnterTab(event) {
	    event.preventDefault();
	    this.refs.input.value = '';
	    if (!!this.state.filteredOptions[this.state.currentlySelectedListOption] && this.state.currentUserInput === '') {
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
	  onKeyDown: function onKeyDown(event) {
	    switch (event.keyCode) {
	      case 8:
	        // backspace
	        this.onBackspace(event);
	        break;
	      case 13: // enter
	      case 9:
	        // tab
	        this.onEnterTab(event);
	        break;
	      case 37:
	        // arrow left
	        this.moveCursor('left');
	        break;
	      case 38:
	        // arrow up
	        this.selectFromList('prev');
	        break;
	      case 39:
	        // arrow right
	        this.moveCursor('right');
	        break;
	      case 40:
	        // arrow down
	        this.selectFromList('next');
	        break;
	    }
	  },
	  onScroll: function onScroll() {
	    if (this.props.infiniteScrolling && this.isBottomOfListVisible()) {
	      this.loadMoreOptions();
	    }
	  },
	  onSubmit: function onSubmit(event) {
	    var results = selectionFormatter(event);
	    this.props.submitSelection(results);
	  },
	  onWindowResize: function onWindowResize(event) {
	    this.setState({
	      optionsListWidth: this.computeOptionsListWidth()
	    });
	  },
	  populateSelectGroups: function populateSelectGroups() {
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
	      nodes.push(React.createElement(
	        'optgroup',
	        {
	          key: groups[group].label.toLowerCase().split(' ').join('-'),
	          label: groups[group].label
	        },
	        this.populateSelectGroupWithOptions(group)
	      ));
	    }
	    return nodes;
	  },
	  populateSelectGroupWithOptions: function populateSelectGroupWithOptions(groupKey) {
	    var availableOptionsGroup = this.state.availableOptions[groupKey];
	    var nodes = [];
	    var selectedOptionsValues = [];
	    if (!!availableOptionsGroup) {
	      if (!!this.state.selectedOptions[0]) {
	        selectedOptionsValues = this.state.selectedOptions.map(function (option) {
	          return option.value;
	        });
	      }
	      availableOptionsGroup.nodes.forEach(function (option, index, options) {
	        nodes.push(React.createElement(
	          'option',
	          {
	            key: option.label.toLowerCase().split(' ').join('-') + '-' + index,
	            selected: selectedOptionsValues.indexOf(option.value) > -1,
	            value: option.value
	          },
	          option.label
	        ));
	      });
	    }
	    return nodes;
	  },
	  removeSelectedOption: function removeSelectedOption(option) {
	    var selectedOptionIndex;
	    var selectedOptionsValues;
	    var removedOptionIndex;
	    var newState = {
	      canLoadMoreOptions: true,
	      filteredOptions: Array.from(this.state.filteredOptions),
	      selectedOptions: Array.from(this.state.selectedOptions)
	    };
	    selectedOptionsValues = newState.selectedOptions.map(function (option) {
	      return option.value;
	    });
	    selectedOptionIndex = selectedOptionsValues.indexOf(option.value);
	    newState.selectedOptions.splice(selectedOptionIndex, 1);
	    if (!option.isNew) {
	      newState.filteredOptions = newState.filteredOptions.concat(option);
	      // If this is a pre-existing option we want it to go back into the right place
	      newState.filteredOptions = newState.filteredOptions.sort(function (a, b) {
	        if (a.label < b.label) return -1;
	        if (a.label > b.label) return 1;
	        return 0;
	      });
	    } else {
	      newState.availableOptions = new Object(this.state.availableOptions);
	      var availableOptionIndex;
	      var optionGroup = option.group || this.props.defaultGroupKey;
	      var availableOptionsValues = newState.availableOptions[optionGroup].nodes.map(function (option) {
	        return option.value;
	      });
	      availableOptionIndex = availableOptionsValues.indexOf(option.value);
	      // New options get deleted
	      newState.availableOptions[optionGroup].nodes.splice(availableOptionIndex, 1);
	    }
	    this.setState(newState);
	  },
	  renderInvisibleScreenNode: function renderInvisibleScreenNode() {
	    var documentRect;
	    var invisibleScreenStyle = {};
	    var rootParentRect;
	    if (!this.state.isListHidden) {
	      documentRect = document.documentElement.getBoundingClientRect();
	      try {
	        rootParentRect = document.getElementById(this.props.rootParentId).getBoundingClientRect();
	      } catch (e) {}
	      invisibleScreenStyle.height = documentRect.height + 'px';
	      invisibleScreenStyle.width = documentRect.width + 'px';
	      try {
	        invisibleScreenStyle.left = 0 - rootParentRect.left + 'px';
	      } catch (e) {
	        invisibleScreenStyle.left = 0;
	      }
	      try {
	        invisibleScreenStyle.top = 0 - rootParentRect.top + 'px';
	      } catch (e) {
	        invisibleScreenStyle.top = 0;
	      }
	    }
	    return React.createElement('div', {
	      className: this.state.invisibleScreenClass + ' invisible-screen',
	      onClick: this.hideOptionsList,
	      style: invisibleScreenStyle
	    });
	  },
	  renderLoadMoreOptionsOption: function renderLoadMoreOptionsOption() {
	    if ((!this.props.infiniteScrolling || this.props.smartScroll) && !!this.props.async && !this.state.isAJAXing && this.state.canLoadMoreOptions) {

	      return React.createElement(
	        'li',
	        { onClick: this.loadMoreOptions },
	        this.props.manualAJAXPrompt
	      );
	    } else if (this.state.isAJAXing) {
	      return React.createElement(
	        'li',
	        {
	          className: 'ajax-spinner-list-item ' + this.props.AJAXSpinnerListItemClasses,
	          ref: 'AJAXSpinner'
	        },
	        this.getAJAXSpinnerComponent()
	      );
	    } else if (this.state.filteredOptions.length === 0) {
	      // TODO: (hybrid) If user has removed an option and AJAX'd again then display the
	      // notice, but not all the time
	      return React.createElement(
	        'li',
	        { className: 'no-more-options-list-item' + this.props.noMoreOptionsListItemClasses },
	        this.props.noMoreOptionsNotice
	      );
	    }
	  },
	  renderOptionsForList: function renderOptionsForList() {
	    var i = 1;
	    var groupedNodes = {};
	    var nodes = [];
	    for (var group in this.props.groups) {
	      groupedNodes[group] = [];
	    }
	    this.state.filteredOptions.forEach(function (option, index, options) {
	      var isActive = this.state.currentlySelectedListOption === index;
	      var optionGroup = option.group || this.props.defaultGroupKey;
	      if (!groupedNodes[optionGroup]) {
	        throw new Error("renderOptionsForList: data mismatch! An option has a group not passed to this.props.groups!");
	      }
	      groupedNodes[optionGroup].push(React.createElement(
	        'li',
	        {
	          className: this.props.optionsListItemClass + (isActive ? ' active' : ''),
	          key: option.label.toLowerCase().split(' ').join('-') + '-' + index,
	          onClick: this.selectOption.bind(this, option),
	          ref: isActive ? 'activeListItem' : ''
	        },
	        option.label
	      ));
	    }, this);
	    for (var group in this.props.groups) {
	      nodes.push(React.createElement(
	        'li',
	        {
	          className: 'list-item-option-group',
	          key: this.props.groups[group].label.toLowerCase().split(' ').join('-')
	        },
	        this.props.groups[group].label
	      ));
	      nodes = nodes.concat(groupedNodes[group]);
	    }
	    return nodes;
	  },
	  renderOptionsList: function renderOptionsList() {
	    return React.createElement(
	      'ul',
	      {
	        className: this.state.isListHidden ? 'hidden' : 'active',
	        style: { width: this.state.optionsListWidth },
	        ref: 'optionsList'
	      },
	      this.renderOptionsForList(),
	      this.renderLoadMoreOptionsOption()
	    );
	  },
	  renderOptionsListContainer: function renderOptionsListContainer() {
	    var props = {
	      className: this.props.selectOptionsListWrapperClass + ' options-list-container'
	    };
	    if (this.props.infiniteScrolling) {
	      props.onScroll = this.debounceFunc(this.onScroll);
	    }
	    return React.createElement('div', props, this.renderOptionsList());
	  },
	  renderSelectedOptionTags: function renderSelectedOptionTags() {
	    var nodes = [];
	    this.state.selectedOptions.forEach(function (option, index, options) {
	      nodes.push(React.createElement(
	        'li',
	        null,
	        React.createElement(
	          'a',
	          {
	            className: this.props.closeIconClass + ' close-icon',
	            href: 'javascript:void(0)',
	            key: option.label.toLowerCase().split(' ').join('-'),
	            onClick: this.removeSelectedOption.bind(this, option)
	          },
	          this.props.closeIconFactory({}, 'x')
	        ),
	        option.label
	      ));
	    }, this);
	    return nodes;
	  },
	  scrollActiveListItemIntoView: function scrollActiveListItemIntoView() {
	    if (!!this.refs.activeListItem) {
	      this.refs.optionsList.scrollTop = this.refs.activeListItem.offsetTop;
	    }
	  },
	  selectFromList: function selectFromList(selection) {
	    var selectedOption = this.state.currentlySelectedListOption;
	    switch (selection) {
	      case 'next':
	        this.setState({
	          currentlySelectedListOption: selectedOption === this.state.filteredOptions.length - 1 ? selectedOption : selectedOption + 1
	        }, this.scrollActiveListItemIntoView);
	        break;
	      case 'prev':
	        this.setState({
	          currentlySelectedListOption: selectedOption === -1 ? selectedOption : selectedOption - 1
	        }, this.scrollActiveListItemIntoView);
	        break;
	    }
	  },
	  selectionFormatter: function selectionFormatter(event) {
	    var selectedOptions = [];
	    try {
	      event.target.value.split(',').reduce(function (items, item, index, values) {
	        this.state.options.forEach(function (option) {
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
	  selectOption: function selectOption(option) {
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
	    this.setState(newState, function () {
	      this.refs.input.focus();
	      this.filterOptions(undefined, this.state.currentUserInput);
	    });
	  },
	  submitSelection: function submitSelection(selection) {
	    var request = new XMLHttpRequest();
	    request.addEventListener('load', this.props.handleSubmitReponse);
	    request.open(this.props.submitMethod, this.props.submitUrl, this.props.isSubmitAsync, this.props.submitUser, this.props.submitPassword);
	    request.send(selection);
	  },
	  toggleOptionsList: function toggleOptionsList(isHidden, event) {
	    this.setState({
	      invisibleScreenClass: 'active',
	      isListHidden: isHidden
	    }, function () {
	      if (!this.state.isListHidden) {
	        this.setState({
	          optionsListWidth: this.computeOptionsListWidth()
	        });
	      }
	    });
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      {
	        className: this.props.wrapperClass + ' gmail-select',
	        ref: 'componentWrapper'
	      },
	      React.createElement(
	        'select',
	        {
	          className: this.props.selectElementClass,
	          multiple: !!this.props.multiple,
	          name: this.props.selectElementName,
	          ref: 'selectElement'
	        },
	        this.populateSelectGroups()
	      ),
	      React.createElement(
	        'div',
	        {
	          className: this.props.inputWrapperClass + (this.state.isListHidden ? '' : 'active') + ' input-container'
	        },
	        React.createElement(
	          'ul',
	          { ref: 'selectedOptionsList' },
	          this.renderSelectedOptionTags(),
	          React.createElement(
	            'li',
	            null,
	            React.createElement('input', {
	              onChange: this.onChange,
	              onBlur: this.onBlur,
	              onFocus: this.toggleOptionsList.bind(this, false),
	              onKeyDown: this.onKeyDown,
	              placeholder: this.props.placeholder,
	              ref: 'input',
	              type: 'text'
	            })
	          )
	        )
	      ),
	      this.renderOptionsListContainer(),
	      this.renderInvisibleScreenNode()
	    );
	  }
	});

	module.exports = SelectR;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = react;

/***/ }
/******/ ]);