(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("prop-types"));
	else if(typeof define === 'function' && define.amd)
		define("selectr", ["react", "prop-types"], factory);
	else if(typeof exports === 'object')
		exports["selectr"] = factory(require("react"), require("prop-types"));
	else
		root["selectr"] = factory(root["react"], root["prop-types"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__7__, __WEBPACK_EXTERNAL_MODULE__9__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Selectr; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _propTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

__webpack_require__(2);




var Selectr =
/*#__PURE__*/
function (_Component) {
  _inherits(Selectr, _Component);

  function Selectr(props) {
    var _this;

    _classCallCheck(this, Selectr);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Selectr).call(this, props));
    _this.SYSTEM_DEFINED = {
      FUNCTIONS: ['computeOptionsListWidth', 'debounceFunc', 'dispatcher', 'getAJAXSpinnerComponent', 'isBottomOfListVisible', 'handleSubmitResponse', 'onBackspace', 'onEnterTab', 'onScroll', 'onSubmit', 'onWindowResize', 'populateSelectGroups', 'populateSelectGroupWithOptions', 'removeSelectedOption', 'renderInvisibleScreenNode', 'renderLoadMoreOptionsOption', 'renderOptionsForList', 'renderOptionsList', 'renderOptionsListContainer', 'renderSelectedOptionTags', 'scrollActiveListItemIntoView', 'selectFromList', 'selectOption']
    };
    _this.USER_DEFINED = {
      FUNCTIONS: {
        appendFetchedOptions: null,
        filterOptions: null,
        hideOptionsList: null,
        loadMoreOptions: null,
        onBlur: null,
        onChange: null,
        onKeyDown: null,
        selectionFormatter: null,
        submitSelection: null,
        toggleOptionsList: [false]
      }
    };

    for (var funcName in _this.USER_DEFINED.FUNCTIONS) {
      var _this$props$funcName, _this$funcName;

      _this[funcName] = !!_this.props[funcName] ? !!_this.USER_DEFINED.FUNCTIONS[funcName] ? (_this$props$funcName = _this.props[funcName]).bind.apply(_this$props$funcName, [_assertThisInitialized(_assertThisInitialized(_this))].concat(_toConsumableArray(_this.USER_DEFINED.FUNCTIONS[funcName]))) : _this.props[funcName].bind(_assertThisInitialized(_assertThisInitialized(_this))) : !!_this.USER_DEFINED.FUNCTIONS[funcName] ? (_this$funcName = _this[funcName]).bind.apply(_this$funcName, [_assertThisInitialized(_assertThisInitialized(_this))].concat(_toConsumableArray(_this.USER_DEFINED.FUNCTIONS[funcName]))) : _this[funcName].bind(_assertThisInitialized(_assertThisInitialized(_this)));
    }

    _this.SYSTEM_DEFINED.FUNCTIONS.forEach(function (func) {
      _this[func] = _this[func].bind(_assertThisInitialized(_assertThisInitialized(_this)));
    }, _assertThisInitialized(_assertThisInitialized(_this)));

    _this.state = {
      availableOptions: {
        default: {
          label: '',
          nodes: []
        }
      },
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
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var newState = {}; // We want to debounce the window resize, allowing users to pass in a debounce
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

      if (!!this.props.options && this.props.options.length > 0) {
        this.appendFetchedOptions(this.props.options);
      }

      this.setState(newState, function () {
        if (!!_this2.props.async && _this2.props.options.length === 0) {
          _this2.loadMoreOptions();
        }
      });
    }
  }, {
    key: "shouldComponentUpdate",
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
    key: "appendFetchedOptions",
    value: function appendFetchedOptions(options) {
      var _this3 = this;

      var availableOptionsValues = []; // TODO: Not sure what this is for
      // , callback =
      //   options.callback ||
      //   !!this.props.async
      //   ? this.setState.bind(
      //     this,
      //     { page: this.state.page + 1 }
      //   ) : (() => { return; })
      // We want to append any options to what we already have

      var newState = {
        availableOptions: new Object(this.state.availableOptions)
      };

      for (var group in this.props.groups) {
        // If the group doesn't exist we initialize it
        if (!newState.availableOptions[group]) {
          newState.availableOptions[group] = {
            label: this.props.groups[group].label || this.props.defaultGroupKey,
            nodes: []
          };
        } // Otherwise we add what we have to the list of available options


        newState.availableOptions[group].nodes.map(function (option) {
          return availableOptionsValues.push(option.value);
        });
      } // We discard whatever we've received that is already in the list of available
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
      /* TODO: If this was working right then loadMoreOptions would not trigger
       * again from onScroll after calling scrollIntoView from loadMoreOptions
       */

      this.setState(newState, function () {
        _this3.filterOptions(null, _this3.state.currentUserInput);
      });
    }
  }, {
    key: "computeOptionsListWidth",
    value: function computeOptionsListWidth() {
      // We need to account for any border on the options list
      var optionsListStyle = window.getComputedStyle(this.refs.optionsList);
      return this.refs.componentWrapper.clientWidth - parseInt(optionsListStyle.borderLeftWidth) - parseInt(optionsListStyle.borderRightWidth) + 'px';
    }
  }, {
    key: "debounceFunc",
    value: function debounceFunc(func, time) {
      var timeout;
      time = time || this.props.debounceTimeout;
      return function () {
        clearTimeout(timeout);
        timeout = setTimeout(func, time);
      };
    }
  }, {
    key: "dispatcher",
    value: function dispatcher(chain) {
      var toExecute = chain.pop();

      if (!!toExecute) {
        toExecute();
        this.dispatcher.call(this.dispatcher(chain), func);
      }
    }
  }, {
    key: "filterOptions",
    value: function filterOptions(event, filter) {
      var filterExp = !!event ? new RegExp(this.state.currentUserInput) : new RegExp(filter);
      var selectedOptionsValues = this.state.selectedOptions.map(function (option) {
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
    }
  }, {
    key: "getAJAXSpinnerComponent",
    value: function getAJAXSpinnerComponent() {
      // The user can pass in their own React factory for something like React-Loader
      // if they don't want to use the packaged static image
      if (!!this.props.AJAXSpinnerComponentFactory) {
        return this.props.AJAXSpinnerComponentFactory(this.props.AJAXSpinnerComponentProps);
      } else {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          src: this.props.spinnerImgPath,
          className: this.props.AJAXSpinnerClasses
        });
      }
    }
  }, {
    key: "handleSubmitResponse",
    value: function handleSubmitResponse() {
      var response = this.responseText;
      this.setState({
        messages: 'success'
      });
    }
  }, {
    key: "hideOptionsList",
    value: function hideOptionsList(event) {
      this.setState({
        isListHidden: true
      });
    }
  }, {
    key: "isBottomOfListVisible",
    value: function isBottomOfListVisible() {
      var optionsList = this.refs.optionsList; // Should be equal to $options-list-max-height

      var optionsListHeight = optionsList.clientHeight;
      var isVisible = optionsListHeight > 0 && optionsList.scrollHeight - optionsList.clientHeight === optionsList.scrollTop;
      return isVisible;
    }
  }, {
    key: "loadMoreOptions",
    value: function loadMoreOptions() {
      var _this4 = this;

      if (!this.state.isAJAXing) {
        this.setState({
          isAJAXing: true,
          page: this.state.page
        }, function () {
          _this4.props.async(_this4.appendFetchedOptions, _this4.state.page, _this4.state.currentUserInput); // The spinner should be showing now so we want the user to see it
          // TODO: scrolling causes the onScroll to trigger; need to
          // this.refs.AJAXSpinner.scrollIntoView();

        });
      }
    }
  }, {
    key: "onBackspace",
    value: function onBackspace(event) {
      if (!event.target.value || event.target.value === '') {
        var selectedOption = this.state.selectedOptions[this.state.currentlySelectedInputOption];

        if (!!selectedOption) {
          var newState = {
            currentlySelectedInputOption: this.state.currentlySelectedInputOption - 1
          };

          if (!!selectedOption.isNew) {
            newState.currentUserInput = selectedOption.value;
            this.refs.selectrInput.value = newState.currentUserInput;
          }

          this.setState(newState, this.removeSelectedOption.bind(this, selectedOption));
        }
      }
    }
  }, {
    key: "onBlur",
    value: function onBlur(event) {// TODO: store window.keyDown and bind this.keyDown
    }
  }, {
    key: "onChange",
    value: function onChange(event) {
      this.setState({
        currentUserInput: event.target.value,
        page: 1
      }, this.filterOptions.bind(this, event)); //if (!!this.props.onChange) {
      //  this.props.onChange();
      //}
    }
  }, {
    key: "onEnterTab",
    value: function onEnterTab(event) {
      event.preventDefault();
      this.refs.selectrInput.value = '';

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
          selectedOptions: this.props.multiple ? Array.from(this.state.selectedOptions).concat(newOption) : [newOption]
        }; // TODO: potentially need to remove this option from the availableOptions
        // list if a user deletes it

        newState.availableOptions[this.props.defaultGroupKey].nodes.push(newOption);
        this.setState(newState, this.filterOptions.bind(this, null, ''));
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      switch (event.keyCode) {
        case 8:
          {
            // backspace
            this.onBackspace(event);
            break;
          }

        case 13: // enter

        case 9:
          {
            // tab
            this.onEnterTab(event);
            break;
          }

        case 37:
          {
            // arrow left
            this.moveCursor('left');
            break;
          }

        case 38:
          {
            // arrow up
            this.selectFromList('prev');
            break;
          }

        case 39:
          {
            // arrow right
            this.moveCursor('right');
            break;
          }

        case 40:
          {
            // arrow down
            this.selectFromList('next');
            break;
          }
      }

      this.props.onKeyDown(event);
    }
  }, {
    key: "onScroll",
    value: function onScroll() {
      if (this.props.infiniteScrolling && this.isBottomOfListVisible()) {
        this.loadMoreOptions();
      }
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(event) {
      var results = selectionFormatter(event);
      this.props.submitSelection(results);
    }
  }, {
    key: "onWindowResize",
    value: function onWindowResize(event) {
      this.setState({
        optionsListWidth: this.computeOptionsListWidth()
      });
    }
  }, {
    key: "populateSelectGroups",
    value: function populateSelectGroups() {
      var groups;
      var nodes = [];

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
        nodes.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("optgroup", {
          key: groups[group].label.toLowerCase().split(' ').join('-'),
          label: groups[group].label
        }, this.populateSelectGroupWithOptions(group)));
      }

      return nodes;
    }
  }, {
    key: "populateSelectGroupWithOptions",
    value: function populateSelectGroupWithOptions(groupKey) {
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
          nodes.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
            key: option.label.toLowerCase().split(' ').join('-') + '-' + index,
            selected: selectedOptionsValues.indexOf(option.value) > -1,
            value: option.value
          }, option.label));
        });
      }

      return nodes;
    }
  }, {
    key: "removeSelectedOption",
    value: function removeSelectedOption(option) {
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
        newState.filteredOptions = newState.filteredOptions.concat(option); // If this is a pre-existing option we want it to go back into the right place

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
        availableOptionIndex = availableOptionsValues.indexOf(option.value); // New options get deleted

        newState.availableOptions[optionGroup].nodes.splice(availableOptionIndex, 1);
      }

      this.setState(newState);
    }
  }, {
    key: "renderInvisibleScreenNode",
    value: function renderInvisibleScreenNode() {
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

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: this.state.invisibleScreenClass + ' invisible-screen',
        onClick: this.hideOptionsList,
        style: invisibleScreenStyle
      });
    }
  }, {
    key: "renderLoadMoreOptionsOption",
    value: function renderLoadMoreOptionsOption() {
      if ((!this.props.infiniteScrolling || this.props.smartScroll) && !!this.props.async && !this.state.isAJAXing && this.state.canLoadMoreOptions) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          onClick: this.loadMoreOptions
        }, this.props.manualAJAXPrompt);
      } else if (this.state.isAJAXing) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          className: 'ajax-spinner-list-item ' + this.props.AJAXSpinnerListItemClasses,
          ref: "AJAXSpinner"
        }, this.getAJAXSpinnerComponent());
      } else if (this.state.filteredOptions.length === 0) {
        // TODO: (hybrid) If user has removed an option and AJAX'd again then display the
        // notice, but not all the time
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          className: 'no-more-options-list-item' + this.props.noMoreOptionsListItemClasses
        }, this.props.noMoreOptionsNotice);
      }
    }
  }, {
    key: "renderOptionsForList",
    value: function renderOptionsForList() {
      var _this5 = this;

      var i = 1;
      var groupedNodes = {};
      var nodes = [];

      for (var group in this.props.groups) {
        groupedNodes[group] = [];
      }

      this.state.filteredOptions.forEach(function (option, index, options) {
        var isActive = _this5.state.currentlySelectedListOption === index;
        var optionGroup = option.group || _this5.props.defaultGroupKey;

        if (!groupedNodes[optionGroup]) {
          throw new Error("renderOptionsForList: data mismatch! An option has a group not passed to this.props.groups!");
        }

        groupedNodes[optionGroup].push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          className: _this5.props.optionsListItemClass + (isActive ? ' active' : ''),
          key: option.label.toLowerCase().split(' ').join('-') + '-' + index,
          onClick: _this5.selectOption.bind(_this5, option),
          ref: isActive ? 'activeListItem' : ''
        }, option.label));
      }, this);

      for (var _group in this.props.groups) {
        nodes.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          className: "list-item-option-group",
          key: this.props.groups[_group].label.toLowerCase().split(' ').join('-')
        }, this.props.groups[_group].label));
        nodes = nodes.concat(groupedNodes[_group]);
      }

      return nodes;
    }
  }, {
    key: "renderOptionsList",
    value: function renderOptionsList() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: this.state.isListHidden ? 'hidden' : 'active',
        style: {
          width: this.state.optionsListWidth
        },
        ref: "optionsList"
      }, this.renderOptionsForList(), this.renderLoadMoreOptionsOption());
    }
  }, {
    key: "renderOptionsListContainer",
    value: function renderOptionsListContainer() {
      var props = {
        className: this.props.selectOptionsListWrapperClass + ' options-list-container'
      };

      if (this.props.infiniteScrolling) {
        props.onScroll = this.debounceFunc(this.onScroll);
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('div', props, this.renderOptionsList());
    }
  }, {
    key: "renderSelectedOptionTags",
    value: function renderSelectedOptionTags() {
      var _this6 = this;

      var nodes = [];
      this.state.selectedOptions.forEach(function (option, index, options) {
        nodes.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          className: _this6.props.closeIconClass + ' close-icon',
          href: "javascript:void(0)",
          key: option.label.toLowerCase().split(' ').join('-'),
          onClick: _this6.removeSelectedOption.bind(_this6, option)
        }, _this6.props.closeIconFactory({}, 'x')), option.label));
      }, this);
      return nodes;
    }
  }, {
    key: "scrollActiveListItemIntoView",
    value: function scrollActiveListItemIntoView() {
      if (!!this.refs.activeListItem) {
        this.refs.optionsList.scrollTop = this.refs.activeListItem.offsetTop;
      }
    }
  }, {
    key: "selectFromList",
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
    key: "selectionFormatter",
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
    key: "selectOption",
    value: function selectOption(option) {
      var _this8 = this;

      var newState = {
        currentlySelectedInputOption: this.state.selectedOptions.length,
        currentUserInput: '',
        selectedOptions: this.props.multiple ? Array.from(this.state.selectedOptions).concat(option) : [option]
      };
      this.setState(newState, function () {
        _this8.refs.selectrInput.focus();

        _this8.filterOptions(undefined, _this8.state.currentUserInput);
      });
      this.props.onSelectOption(option);
    }
  }, {
    key: "submitSelection",
    value: function submitSelection(selection) {
      var request = new XMLHttpRequest();
      request.addEventListener('load', this.props.handleSubmitReponse);
      request.open(this.props.submitMethod, this.props.submitUrl, this.props.isSubmitAsync, this.props.submitUser, this.props.submitPassword);
      request.send(selection);
    }
  }, {
    key: "toggleOptionsList",
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
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: this.props.wrapperClass + ' gmail-select',
        ref: "componentWrapper"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        className: this.props.selectElementClass,
        multiple: !!this.props.multiple,
        name: this.props.selectElementName,
        ref: "selectElement"
      }, this.populateSelectGroups()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: this.props.inputWrapperClass + (this.state.isListHidden ? '' : 'active') + ' input-container'
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        ref: "selectedOptionsList"
      }, this.renderSelectedOptionTags(), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        className: this.props.inputClasses,
        name: this.props.inputName,
        onBlur: this.onBlur,
        onChange: this.onChange,
        onFocus: this.toggleOptionsList,
        onKeyDown: this.onKeyDown,
        placeholder: this.props.placeholder,
        ref: this.props.inputRef,
        type: "text"
      })))), this.renderOptionsListContainer(), this.renderInvisibleScreenNode());
    }
  }]);

  return Selectr;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);


Selectr.propTypes = _propTypes__WEBPACK_IMPORTED_MODULE_1__["default"];
Selectr.defaultProps = {
  AJAXSpinnerClasses: 'ajax-spinner',
  AJAXSpinnerComponentFactory: undefined,
  AJAXSpinnerComponentProps: {},
  AJAXSpinnerListItemClasses: '',
  async: undefined,
  closeIconFactory: react__WEBPACK_IMPORTED_MODULE_0___default.a.createFactory('em'),
  closeIconClass: '',
  debounceTimeout: 500,
  defaultGroupKey: 'default',
  groups: {
    default: {
      label: '',
      nodes: []
    }
  },
  infiniteScrolling: false,
  initialValue: [],
  inputRef: 'selectrInput',
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(3);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(5)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".gmail-select .invisible-screen {\n  display: none; }\n  .gmail-select .invisible-screen.active {\n    background: transparent;\n    display: block;\n    position: absolute;\n    z-index: 9997; }\n\n.gmail-select .options-list-container ul {\n  background-attachment: initial;\n  background-color: #FFF;\n  background-image: none;\n  background-position: initial;\n  background-repeat: initial;\n  display: none;\n  margin: 0 0 0 0;\n  max-height: 300px;\n  overflow-y: scroll;\n  padding: 0 0 0 0;\n  position: absolute;\n  z-index: 9998; }\n  .gmail-select .options-list-container ul.active {\n    border-bottom: 1px solid #CCC;\n    border-bottom-left-radius: 4px;\n    border-bottom-right-radius: 4px;\n    border-left: 1px solid #CCC;\n    border-right: 1px solid #CCC;\n    border-top: none;\n    display: block; }\n  .gmail-select .options-list-container ul li {\n    padding: 10px 0 10px 10px; }\n    .gmail-select .options-list-container ul li.active, .gmail-select .options-list-container ul li:hover {\n      background-color: LightBlue; }\n    .gmail-select .options-list-container ul li.ajax-spinner-list-item, .gmail-select .options-list-container ul li.list-item-option-group, .gmail-select .options-list-container ul li.no-more-options-list-item {\n      text-align: left; }\n      .gmail-select .options-list-container ul li.ajax-spinner-list-item:hover, .gmail-select .options-list-container ul li.list-item-option-group:hover, .gmail-select .options-list-container ul li.no-more-options-list-item:hover {\n        background-color: transparent; }\n    .gmail-select .options-list-container ul li .ajax-spinner {\n      height: 20px;\n      width: 20px; }\n\n.gmail-select .input-container ul, .gmail-select .options-list-container ul {\n  list-style: none;\n  padding-left: 0; }\n\n.gmail-select .input-container {\n  background-color: #FFF;\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 4px;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n  border-color: #CCC;\n  border-style: solid;\n  border-width: 1px; }\n  .gmail-select .input-container.active {\n    border-bottom-left-radius: 0px;\n    border-bottom-right-radius: 0px;\n    position: relative;\n    z-index: 9999; }\n  .gmail-select .input-container input {\n    border: none;\n    outline: none;\n    width: 333px; }\n  .gmail-select .input-container ul {\n    margin: 0 0 5px 10px; }\n    .gmail-select .input-container ul li {\n      background-attachment: initial;\n      background-color: #CCC;\n      background-image: none;\n      background-position: initial;\n      background-repeat: initial;\n      border-bottom-left-radius: 4px;\n      border-bottom-right-radius: 4px;\n      border-top-left-radius: 4px;\n      border-top-right-radius: 4px;\n      border-color: #AAA;\n      border-style: solid;\n      border-width: 1px;\n      display: inline-block;\n      margin-right: 10px;\n      margin-top: 5px;\n      padding-right: 10px; }\n      .gmail-select .input-container ul li:last-child {\n        background-color: transparent;\n        border: none;\n        padding-right: 0px; }\n      .gmail-select .input-container ul li .close-icon {\n        border-right: 1px solid #AAA;\n        color: #AAA;\n        display: inline-block;\n        height: 20px;\n        margin-right: 10px;\n        text-align: center;\n        text-decoration: none;\n        width: 20px; }\n        .gmail-select .input-container ul li .close-icon:hover {\n          background-color: #999; }\n      .gmail-select .input-container ul li span {\n        padding-left: 5px; }\n\n.hidden {\n  display: none; }\n", ""]);

// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media " + item[2] + "{" + content + "}";
      } else {
        return content;
      }
    }).join("");
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === "string") modules = [[null, modules, ""]];
    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];
      if (typeof id === "number") alreadyImportedModules[id] = true;
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      //  when a module is imported multiple times with different media queries.
      //  I hope this will never occur (Hey this way we have smaller bundles)

      if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(6);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
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

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

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

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */
module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  } // blank or null?


  if (!css || typeof css !== "string") {
    return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/"); // convert each url(...)

  /*
  This regular expression is just a way to recursively match brackets within
  a string.
  	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
     (  = Start a capturing group
       (?:  = Start a non-capturing group
           [^)(]  = Match anything that isn't a parentheses
           |  = OR
           \(  = Match a start parentheses
               (?:  = Start another non-capturing groups
                   [^)(]+  = Match anything that isn't a parentheses
                   |  = OR
                   \(  = Match a start parentheses
                       [^)(]*  = Match anything that isn't a parentheses
                   \)  = Match a end parentheses
               )  = End Group
               *\) = Match anything and then a close parens
           )  = Close non-capturing group
           *  = Match anything
        )  = Close capturing group
   \)  = Match a close parens
  	 /gi  = Get all matches, not the first.  Be case insensitive.
   */

  var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
    // strip quotes (if they exist)
    var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
      return $1;
    }).replace(/^'(.*)'$/, function (o, $1) {
      return $1;
    }); // already a full url? no change

    if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
      return fullMatch;
    } // convert the url to a full url


    var newUrl;

    if (unquotedOrigUrl.indexOf("//") === 0) {
      //TODO: should we add protocol?
      newUrl = unquotedOrigUrl;
    } else if (unquotedOrigUrl.indexOf("/") === 0) {
      // path should be relative to the base url
      newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
    } else {
      // path should be relative to current directory
      newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
    } // send back the fixed url(...)


    return "url(" + JSON.stringify(newUrl) + ")";
  }); // send back the fixed css

  return fixedCss;
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7__;

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);

var array = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.array,
    bool = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
    func = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
    number = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
    object = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object,
    string = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string;
var propTypes = {
  AJAXSpinnerClasses: string,
  AJAXSpinnerComponentFactory: func,
  AJAXSpinnerComponentProps: object,
  AJAXSpinnerListItemClasses: string,
  async: func,
  closeIconFactory: func,
  closeIconClass: string,
  debounceFunc: func,
  debounceTimeout: number,
  defaultGroupKey: string,
  groups: object,
  infiniteScrolling: bool,
  initialValue: array,
  inputWrapperClass: string,
  isSubmitAsync: bool,
  manualAJAXPrompt: string,
  multiple: bool,
  noMoreOptionsNotice: string,
  noMoreOptionsListItemClasses: string,
  onChange: func,
  onSelectOption: func,
  options: array,
  optionsListItemClass: string,
  pageSize: number,
  placeholder: string,
  rootParentId: string,
  selectElementClass: string,
  selectElementName: string,
  selectionFormatter: func,
  selectOptionsListWrapperClass: string,
  shouldLogErrors: bool,
  spinnerImgPath: string,
  submitMethod: string,
  submitPassword: string,
  submitSelection: func,
  submitUrl: string,
  submitUser: string,
  wrapperClass: string
};
/* harmony default export */ __webpack_exports__["default"] = (propTypes);

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__9__;

/***/ })
/******/ ]);
});