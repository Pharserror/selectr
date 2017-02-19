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

	var Selectr = function (_Component) {
	  _inherits(Selectr, _Component);

	  function Selectr(props) {
	    _classCallCheck(this, Selectr);

	    var _this = _possibleConstructorReturn(this, (Selectr.__proto__ || Object.getPrototypeOf(Selectr)).call(this, props));

	    _this.USER_DEFINED = {
	      FUNCTIONS: ['onChange', 'selectionFormatter', 'submitSelection']
	    };

	    _this.USER_DEFINED.FUNCTIONS.forEach(function (func) {
	      _this[func] = !!_this.props[func] ? _this.props[func].bind(_this) : _this[func].bind(_this);
	    }, _this);

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

/***/ }
/******/ ])
});
;