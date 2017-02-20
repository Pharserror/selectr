(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define("selectr", ["react"], factory);
	else if(typeof exports === 'object')
		exports["selectr"] = factory(require("react"));
	else
		root["selectr"] = factory(root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	__webpack_require__(3);

	var Selectr = function (_Component) {
	  _inherits(Selectr, _Component);

	  function Selectr(props) {
	    _classCallCheck(this, Selectr);

	    var _this = _possibleConstructorReturn(this, (Selectr.__proto__ || Object.getPrototypeOf(Selectr)).call(this, props));

	    _this.USER_DEFINED = {
	      FUNCTIONS: {
	        onBlur: null,
	        onChange: null,
	        onFocus: null,
	        onKeyDown: null,
	        selectionFormatter: null,
	        submitSelection: null,
	        toggleOptionsList: [false]
	      }
	    };

	    for (var funcName in _this.USER_DEFINED.FUNCTIONS) {
	      _this[funcName] = !!_this.props[funcName] ? !!_this.USER_DEFINED.FUNCTIONS[funcName] ? _this.props[funcName].apply(_this, _this.USER_DEFINED.FUNCTIONS[funcName]) : _this.props[funcName].bind(_this) : !!_this.USER_DEFINED.FUNCTIONS[funcName] ? _this[funcName].apply(_this, _this.USER_DEFINED.FUNCTIONS[funcName]) : _this[funcName].bind(_this);
	    }

	    _this.state = {
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
	    return _this;
	  }

	  _createClass(Selectr, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

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
	        if (!!_this2.props.async && _this2.props.options.length === 0) {
	          _this2.loadMoreOptions();
	        }
	      });
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
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
	  }, {
	    key: 'appendFetchedOptions',
	    value: function appendFetchedOptions(options) {
	      var _this3 = this;

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
	        var optionGroup = option.group || _this3.props.defaultGroupKey;
	        if (!!newState.availableOptions[optionGroup]) {
	          newState.availableOptions[optionGroup].nodes.push(option);
	        }
	      }, this);
	      newState.canLoadMoreOptions = options.length === this.props.pageSize;
	      newState.isAJAXing = false;
	      this.setState(newState, function () {
	        _this3.filterOptions(null, _this3.state.currentUserInput);
	      });
	    }
	  }, {
	    key: 'computeOptionsListWidth',
	    value: function computeOptionsListWidth() {
	      // We need to account for any border on the options list
	      var optionsListStyle = window.getComputedStyle(this.refs.optionsList);
	      return this.refs.componentWrapper.clientWidth - parseInt(optionsListStyle.borderLeftWidth) - parseInt(optionsListStyle.borderRightWidth) + 'px';
	    }
	  }, {
	    key: 'debounceFunc',
	    value: function debounceFunc(func, time) {
	      time = time || this.props.debounceTimeout;
	      var timeout = void 0;

	      return function () {
	        clearTimeout(timeout);
	        timeout = setTimeout(func, time);
	      };
	    }
	  }, {
	    key: 'dispatcher',
	    value: function dispatcher(chain) {
	      var toExecute = chain.pop();

	      if (!!toExecute) {
	        toExecute();
	        this.dispatcher.call(this.dispatcher(chain), func);
	      }
	    }
	  }, {
	    key: 'filterOptions',
	    value: function filterOptions(event, filter) {
	      var filterExp = !!event ? new RegExp(this.state.currentUserInput) : new RegExp(filter),
	          selectedOptionsValues = this.state.selectedOptions.map(function (option, index, options) {
	        return option.value;
	      }),
	          availableOptions = [];

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
	    }
	  }, {
	    key: 'getAJAXSpinnerComponent',
	    value: function getAJAXSpinnerComponent() {
	      // The user can pass in their own React factory for something like React-Loader
	      // if they don't want to use the packaged static image
	      if (!!this.props.AJAXSpinnerComponentFactory) {
	        return this.props.AJAXSpinnerComponentFactory(this.props.AJAXSpinnerComponentProps);
	      } else {
	        return _react2.default.createElement('img', {
	          src: this.props.spinnerImgPath,
	          className: this.props.AJAXSpinnerClasses
	        });
	      }
	    }
	  }, {
	    key: 'handleSubmitResponse',
	    value: function handleSubmitResponse() {
	      var response = this.responseText;

	      this.setState({ messages: 'success' });
	    }
	  }, {
	    key: 'hideOptionsList',
	    value: function hideOptionsList(event) {
	      this.setState({
	        isListHidden: true
	      });
	    }
	  }, {
	    key: 'isBottomOfListVisible',
	    value: function isBottomOfListVisible() {
	      var optionsList = this.refs.optionsList
	      // Should be equal to $options-list-max-height
	      ,
	          optionsListHeight = optionsList.clientHeight,
	          isVisible = optionsListHeight > 0 && optionsList.scrollHeight - optionsList.clientHeight === optionsList.scrollTop;

	      return isVisible;
	    }
	  }, {
	    key: 'loadMoreOptions',
	    value: function loadMoreOptions() {
	      var _this4 = this;

	      if (!this.state.isAJAXing) {
	        this.setState({
	          isAJAXing: true,
	          page: this.state.page
	        }, function () {
	          _this4.props.async(_this4.appendFetchedOptions, _this4.state.page, _this4.state.currentUserInput);
	          // The spinner should be showing now so we want the user to see it
	          _this4.refs.AJAXSpinner.scrollIntoView();
	        });
	      }
	    }
	  }, {
	    key: 'onBackspace',
	    value: function onBackspace(event) {
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
	    }
	  }, {
	    key: 'onBlur',
	    value: function onBlur(event) {
	      // TODO: store window.keyDown and bind this.keyDown
	    }
	  }, {
	    key: 'onChange',
	    value: function onChange(event) {
	      this.setState({
	        currentUserInput: event.target.value,
	        page: 1
	      }, this.filterOptions.bind(this, event));
	      //if (!!this.props.onChange) {
	      //  this.props.onChange();
	      //}
	    }
	  }, {
	    key: 'onEnterTab',
	    value: function onEnterTab(event) {
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
	        },
	            newState = {
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
	  }, {
	    key: 'onKeyDown',
	    value: function onKeyDown(event) {
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
	    }
	  }, {
	    key: 'onScroll',
	    value: function onScroll() {
	      if (this.props.infiniteScrolling && this.isBottomOfListVisible()) {
	        this.loadMoreOptions();
	      }
	    }
	  }, {
	    key: 'onSubmit',
	    value: function onSubmit(event) {
	      var results = selectionFormatter(event);

	      this.props.submitSelection(results);
	    }
	  }, {
	    key: 'onWindowResize',
	    value: function onWindowResize(event) {
	      this.setState({
	        optionsListWidth: this.computeOptionsListWidth()
	      });
	    }
	  }, {
	    key: 'populateSelectGroups',
	    value: function populateSelectGroups() {
	      var groups = void 0,
	          nodes = [];

	      if (!!this.props.groups) {
	        groups = new Object(this.props.groups);
	      } else {
	        groups = {};

	        groups[this.props.defaultGroupKey] = {
	          label: '',
	          nodes: Array.from(this.state.availableOptions)
	        };
	      }

	      for (var group in groups) {
	        nodes.push(_react2.default.createElement(
	          'optgroup',
	          {
	            key: groups[group].label.toLowerCase().split(' ').join('-'),
	            label: groups[group].label
	          },
	          this.populateSelectGroupWithOptions(group)
	        ));
	      }

	      return nodes;
	    }
	  }, {
	    key: 'populateSelectGroupWithOptions',
	    value: function populateSelectGroupWithOptions(groupKey) {
	      var availableOptionsGroup = this.state.availableOptions[groupKey],
	          nodes = [],
	          selectedOptionsValues = [];

	      if (!!availableOptionsGroup) {
	        if (!!this.state.selectedOptions[0]) {
	          selectedOptionsValues = this.state.selectedOptions.map(function (option) {
	            return option.value;
	          });
	        }

	        availableOptionsGroup.nodes.forEach(function (option, index, options) {
	          nodes.push(_react2.default.createElement(
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
	    }
	  }, {
	    key: 'removeSelectedOption',
	    value: function removeSelectedOption(option) {
	      var selectedOptionIndex = void 0,
	          selectedOptionsValues = void 0,
	          removedOptionIndex = void 0,
	          newState = {
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
	        var availableOptionIndex = void 0,
	            optionGroup = option.group || this.props.defaultGroupKey,
	            availableOptionsValues = newState.availableOptions[optionGroup].nodes.map(function (option) {
	          return option.value;
	        });

	        availableOptionIndex = availableOptionsValues.indexOf(option.value);
	        // New options get deleted
	        newState.availableOptions[optionGroup].nodes.splice(availableOptionIndex, 1);
	      }
	      this.setState(newState);
	    }
	  }, {
	    key: 'renderInvisibleScreenNode',
	    value: function renderInvisibleScreenNode() {
	      var documentRect = void 0,
	          invisibleScreenStyle = {},
	          rootParentRect = void 0;

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

	      return _react2.default.createElement('div', {
	        className: this.state.invisibleScreenClass + ' invisible-screen',
	        onClick: this.hideOptionsList,
	        style: invisibleScreenStyle
	      });
	    }
	  }, {
	    key: 'renderLoadMoreOptionsOption',
	    value: function renderLoadMoreOptionsOption() {
	      if ((!this.props.infiniteScrolling || this.props.smartScroll) && !!this.props.async && !this.state.isAJAXing && this.state.canLoadMoreOptions) {

	        return _react2.default.createElement(
	          'li',
	          { onClick: this.loadMoreOptions },
	          this.props.manualAJAXPrompt
	        );
	      } else if (this.state.isAJAXing) {
	        return _react2.default.createElement(
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
	        return _react2.default.createElement(
	          'li',
	          { className: 'no-more-options-list-item' + this.props.noMoreOptionsListItemClasses },
	          this.props.noMoreOptionsNotice
	        );
	      }
	    }
	  }, {
	    key: 'renderOptionsForList',
	    value: function renderOptionsForList() {
	      var _this5 = this;

	      var i = 1,
	          groupedNodes = {},
	          nodes = [];

	      for (var group in this.props.groups) {
	        groupedNodes[group] = [];
	      }

	      this.state.filteredOptions.forEach(function (option, index, options) {
	        var isActive = _this5.state.currentlySelectedListOption === index,
	            optionGroup = option.group || _this5.props.defaultGroupKey;

	        if (!groupedNodes[optionGroup]) {
	          throw new Error("renderOptionsForList: data mismatch! An option has a group not passed to this.props.groups!");
	        }

	        groupedNodes[optionGroup].push(_react2.default.createElement(
	          'li',
	          {
	            className: _this5.props.optionsListItemClass + (isActive ? ' active' : ''),
	            key: option.label.toLowerCase().split(' ').join('-') + '-' + index,
	            onClick: _this5.selectOption.bind(_this5, option),
	            ref: isActive ? 'activeListItem' : ''
	          },
	          option.label
	        ));
	      }, this);

	      for (var _group in this.props.groups) {
	        nodes.push(_react2.default.createElement(
	          'li',
	          {
	            className: 'list-item-option-group',
	            key: this.props.groups[_group].label.toLowerCase().split(' ').join('-')
	          },
	          this.props.groups[_group].label
	        ));
	        nodes = nodes.concat(groupedNodes[_group]);
	      }
	      return nodes;
	    }
	  }, {
	    key: 'renderOptionsList',
	    value: function renderOptionsList() {
	      return _react2.default.createElement(
	        'ul',
	        {
	          className: this.state.isListHidden ? 'hidden' : 'active',
	          style: { width: this.state.optionsListWidth },
	          ref: 'optionsList'
	        },
	        this.renderOptionsForList(),
	        this.renderLoadMoreOptionsOption()
	      );
	    }
	  }, {
	    key: 'renderOptionsListContainer',
	    value: function renderOptionsListContainer() {
	      var props = {
	        className: this.props.selectOptionsListWrapperClass + ' options-list-container'
	      };

	      if (this.props.infiniteScrolling) {
	        props.onScroll = this.debounceFunc(this.onScroll);
	      }

	      return _react2.default.createElement('div', props, this.renderOptionsList());
	    }
	  }, {
	    key: 'renderSelectedOptionTags',
	    value: function renderSelectedOptionTags() {
	      var _this6 = this;

	      var nodes = [];

	      this.state.selectedOptions.forEach(function (option, index, options) {
	        nodes.push(_react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            'a',
	            {
	              className: _this6.props.closeIconClass + ' close-icon',
	              href: 'javascript:void(0)',
	              key: option.label.toLowerCase().split(' ').join('-'),
	              onClick: _this6.removeSelectedOption.bind(_this6, option)
	            },
	            _this6.props.closeIconFactory({}, 'x')
	          ),
	          option.label
	        ));
	      }, this);
	      return nodes;
	    }
	  }, {
	    key: 'scrollActiveListItemIntoView',
	    value: function scrollActiveListItemIntoView() {
	      if (!!this.refs.activeListItem) {
	        this.refs.optionsList.scrollTop = this.refs.activeListItem.offsetTop;
	      }
	    }
	  }, {
	    key: 'selectFromList',
	    value: function selectFromList(selection) {
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
	    }
	  }, {
	    key: 'selectionFormatter',
	    value: function selectionFormatter(event) {
	      var _this7 = this;

	      var selectedOptions = [];

	      try {
	        event.target.value.split(',').reduce(function (items, item, index, values) {
	          _this7.state.options.forEach(function (option) {
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
	    }
	  }, {
	    key: 'selectOption',
	    value: function selectOption(option) {
	      var _this8 = this;

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
	        _this8.refs.input.focus();
	        _this8.filterOptions(undefined, _this8.state.currentUserInput);
	      });
	    }
	  }, {
	    key: 'submitSelection',
	    value: function submitSelection(selection) {
	      var request = new XMLHttpRequest();

	      request.addEventListener('load', this.props.handleSubmitReponse);
	      request.open(this.props.submitMethod, this.props.submitUrl, this.props.isSubmitAsync, this.props.submitUser, this.props.submitPassword);
	      request.send(selection);
	    }
	  }, {
	    key: 'toggleOptionsList',
	    value: function toggleOptionsList(isHidden, event) {
	      var _this9 = this;

	      this.setState({
	        invisibleScreenClass: 'active',
	        isListHidden: isHidden
	      }, function () {
	        if (!_this9.state.isListHidden) {
	          _this9.setState({
	            optionsListWidth: _this9.computeOptionsListWidth()
	          });
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        {
	          className: this.props.wrapperClass + ' gmail-select',
	          ref: 'componentWrapper'
	        },
	        _react2.default.createElement(
	          'select',
	          {
	            className: this.props.selectElementClass,
	            multiple: !!this.props.multiple,
	            name: this.props.selectElementName,
	            ref: 'selectElement'
	          },
	          this.populateSelectGroups()
	        ),
	        _react2.default.createElement(
	          'div',
	          {
	            className: this.props.inputWrapperClass + (this.state.isListHidden ? '' : 'active') + ' input-container'
	          },
	          _react2.default.createElement(
	            'ul',
	            { ref: 'selectedOptionsList' },
	            this.renderSelectedOptionTags(),
	            _react2.default.createElement(
	              'li',
	              null,
	              _react2.default.createElement('input', {
	                onChange: this.onChange,
	                onBlur: this.onBlur,
	                onFocus: this.toggleOptionsList,
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
	  }]);

	  return Selectr;
	}(_react.Component);

	exports.default = Selectr;


	Selectr.propTypes = {
	  AJAXSpinnerClasses: _react.PropTypes.string,
	  AJAXSpinnerComponentFactory: _react.PropTypes.func,
	  AJAXSpinnerComponentProps: _react.PropTypes.object,
	  AJAXSpinnerListItemClasses: _react.PropTypes.string,
	  async: _react.PropTypes.func,
	  closeIconFactory: _react.PropTypes.func,
	  closeIconClass: _react.PropTypes.string,
	  debounceFunc: _react.PropTypes.func,
	  debounceTimeout: _react.PropTypes.number,
	  defaultGroupKey: _react.PropTypes.string,
	  groups: _react.PropTypes.object,
	  infiniteScrolling: _react.PropTypes.bool,
	  initialValue: _react.PropTypes.array,
	  inputWrapperClass: _react.PropTypes.string,
	  isSubmitAsync: _react.PropTypes.bool,
	  manualAJAXPrompt: _react.PropTypes.string,
	  multiple: _react.PropTypes.bool,
	  noMoreOptionsNotice: _react.PropTypes.string,
	  noMoreOptionsListItemClasses: _react.PropTypes.string,
	  onChange: _react.PropTypes.func,
	  options: _react.PropTypes.array,
	  optionsListItemClass: _react.PropTypes.string,
	  pageSize: _react.PropTypes.number,
	  placeholder: _react.PropTypes.string,
	  rootParentId: _react.PropTypes.string,
	  selectElementClass: _react.PropTypes.string,
	  selectElementName: _react.PropTypes.string,
	  selectionFormatter: _react.PropTypes.func,
	  selectOptionsListWrapperClass: _react.PropTypes.string,
	  shouldLogErrors: _react.PropTypes.bool,
	  spinnerImgPath: _react.PropTypes.string,
	  submitMethod: _react.PropTypes.string,
	  submitPassword: _react.PropTypes.string,
	  submitSelection: _react.PropTypes.func,
	  submitUrl: _react.PropTypes.string,
	  submitUser: _react.PropTypes.string,
	  wrapperClass: _react.PropTypes.string
	};

	Selectr.defaultProps = {
	  AJAXSpinnerClasses: 'ajax-spinner',
	  AJAXSpinnerComponentFactory: undefined,
	  AJAXSpinnerComponentProps: {},
	  AJAXSpinnerListItemClasses: '',
	  async: undefined,
	  closeIconFactory: _react2.default.createFactory('em'),
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
	  options: [],
	  optionsListItemClass: 'list-item',
	  pageSize: 10,
	  placeholder: 'Please select from the dropdown or type to filter',
	  rootParentId: 'root',
	  selectElementClass: 'hidden',
	  selectElementName: '',
	  selectOptionsListWrapperClass: '',
	  shouldLogErrors: false,
	  smartScroll: false,
	  spinnerImgPath: '/images/loader.gif',
	  submitMethod: 'POST',
	  submitPassword: undefined,
	  submitUrl: 'http://localhost:3000',
	  submitUser: undefined,
	  wrapperClass: ''
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./node_modules/sass-loader/index.js!./selectr.scss", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./node_modules/sass-loader/index.js!./selectr.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, ".gmail-select .invisible-screen {\n  display: none; }\n  .gmail-select .invisible-screen.active {\n    background: transparent;\n    display: block;\n    position: absolute;\n    z-index: 9997; }\n\n.gmail-select .options-list-container ul {\n  background-attachment: initial;\n  background-color: #FFF;\n  background-image: none;\n  background-position: initial;\n  background-repeat: initial;\n  display: none;\n  margin: 0 0 0 0;\n  max-height: 300px;\n  overflow-y: scroll;\n  padding: 0 0 0 0;\n  position: absolute;\n  z-index: 9998; }\n  .gmail-select .options-list-container ul.active {\n    border-bottom: 1px solid #CCC;\n    border-bottom-left-radius: 4px;\n    border-bottom-right-radius: 4px;\n    border-left: 1px solid #CCC;\n    border-right: 1px solid #CCC;\n    border-top: none;\n    display: block; }\n  .gmail-select .options-list-container ul li {\n    padding: 10px 0 10px 10px; }\n    .gmail-select .options-list-container ul li.active, .gmail-select .options-list-container ul li:hover {\n      background-color: LightBlue; }\n    .gmail-select .options-list-container ul li.ajax-spinner-list-item, .gmail-select .options-list-container ul li.list-item-option-group, .gmail-select .options-list-container ul li.no-more-options-list-item {\n      text-align: left; }\n      .gmail-select .options-list-container ul li.ajax-spinner-list-item:hover, .gmail-select .options-list-container ul li.list-item-option-group:hover, .gmail-select .options-list-container ul li.no-more-options-list-item:hover {\n        background-color: transparent; }\n    .gmail-select .options-list-container ul li .ajax-spinner {\n      height: 20px;\n      width: 20px; }\n\n.gmail-select .input-container ul, .gmail-select .options-list-container ul {\n  list-style: none;\n  padding-left: 0; }\n\n.gmail-select .input-container {\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 4px;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n  border-color: #CCC;\n  border-style: solid;\n  border-width: 1px; }\n  .gmail-select .input-container.active {\n    border-bottom-left-radius: 0px;\n    border-bottom-right-radius: 0px;\n    position: relative;\n    z-index: 9999; }\n  .gmail-select .input-container input {\n    border: none;\n    outline: none;\n    width: 333px; }\n  .gmail-select .input-container ul {\n    margin: 0 0 5px 10px; }\n    .gmail-select .input-container ul li {\n      background-attachment: initial;\n      background-color: #CCC;\n      background-image: none;\n      background-position: initial;\n      background-repeat: initial;\n      border-bottom-left-radius: 4px;\n      border-bottom-right-radius: 4px;\n      border-top-left-radius: 4px;\n      border-top-right-radius: 4px;\n      border-color: #AAA;\n      border-style: solid;\n      border-width: 1px;\n      display: inline-block;\n      margin-right: 10px;\n      margin-top: 5px;\n      padding-right: 10px; }\n      .gmail-select .input-container ul li:last-child {\n        background-color: transparent;\n        border: none;\n        padding-right: 0px; }\n      .gmail-select .input-container ul li .close-icon {\n        border-right: 1px solid #AAA;\n        color: #AAA;\n        display: inline-block;\n        height: 20px;\n        margin-right: 10px;\n        text-align: center;\n        text-decoration: none;\n        width: 20px; }\n        .gmail-select .input-container ul li .close-icon:hover {\n          background-color: #999; }\n      .gmail-select .input-container ul li span {\n        padding-left: 5px; }\n\n.hidden {\n  display: none; }\n", ""]);

	// exports


/***/ },
/* 5 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ])
});
;