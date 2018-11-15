require('../../selectr.scss');
import React, { Component } from 'react';
import propTypes from '../propTypes';

export default class Selectr extends Component {
  constructor(props) {
    super(props);

    this.SYSTEM_DEFINED = {
      FUNCTIONS: [
        'computeOptionsListWidth',
        'debounceFunc',
        'dispatcher',
        'getAJAXSpinnerComponent',
        'isBottomOfListVisible',
        'handleSubmitResponse',
        'onBackspace',
        'onEnterTab',
        'onScroll',
        'onSubmit',
        'onWindowResize',
        'populateSelectGroups',
        'populateSelectGroupWithOptions',
        'removeSelectedOption',
        'renderInvisibleScreenNode',
        'renderLoadMoreOptionsOption',
        'renderOptionsForList',
        'renderOptionsList',
        'renderOptionsListContainer',
        'renderSelectedOptionTags',
        'scrollActiveListItemIntoView',
        'selectFromList',
        'selectOption'
      ]
    };

    this.USER_DEFINED = {
      FUNCTIONS: {
        appendFetchedOptions: null,
        filterOptions:        null,
        hideOptionsList:      null,
        loadMoreOptions:      null,
        onBlur:               null,
        onChange:             null,
        onKeyDown:            null,
        selectionFormatter:   null,
        submitSelection:      null,
        toggleOptionsList:    [false]
      }
    };

    for (let funcName in this.USER_DEFINED.FUNCTIONS) {
      this[funcName] = (
        !!this.props[funcName]
        ? (
          !!this.USER_DEFINED.FUNCTIONS[funcName]
          ? this.props[funcName].bind(this, ...this.USER_DEFINED.FUNCTIONS[funcName])
          : this.props[funcName].bind(this)
        ) : (!!this.USER_DEFINED.FUNCTIONS[funcName]
          ? this[funcName].bind(this, ...this.USER_DEFINED.FUNCTIONS[funcName])
          : this[funcName].bind(this)
        )
      );
    }

    this.SYSTEM_DEFINED.FUNCTIONS.forEach(func => {
      this[func] = this[func].bind(this);
    }, this);

    this.state = {
      availableOptions:             { default: { label: '', nodes: [] } },
      canLoadMoreOptions:           false,
      currentlySelectedInputOption: -1,
      currentlySelectedListOption:  0,
      currentUserInput:             "",
      filteredOptions:              [],
      invisibleScreenClass:         'hidden',
      isAJAXing:                    false,
      isListHidden:                 true,
      isPendingOptionsUpdate:       false,
      optionsListWidth:             '0px',
      page:                         1,
      selectedOptions:              []
    };
  }

  componentDidMount() {
    let newState = {};
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
    if (!!this.props.options && this.props.options.length > 0) {
      this.appendFetchedOptions(this.props.options);
    }

    this.setState(newState, () => {
      if (!!this.props.async && this.props.options.length === 0) {
        this.loadMoreOptions();
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
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

  appendFetchedOptions(options) {
    let availableOptionsValues = [];
      // TODO: Not sure what this is for
      // , callback =
      //   options.callback ||
      //   !!this.props.async
      //   ? this.setState.bind(
      //     this,
      //     { page: this.state.page + 1 }
      //   ) : (() => { return; })
        // We want to append any options to what we already have
    let newState = { availableOptions: new Object(this.state.availableOptions) };

    for (let group in this.props.groups) {
      // If the group doesn't exist we initialize it
      if (!newState.availableOptions[group]) {
        newState.availableOptions[group] = {
          label: this.props.groups[group].label || this.props.defaultGroupKey,
          nodes: []
        };
      }
      // Otherwise we add what we have to the list of available options
      newState.availableOptions[group].nodes.map(option => {
        return availableOptionsValues.push(option.value);
      });
    }
    // We discard whatever we've received that is already in the list of available
    // options so that we don't display the same thing twice
    options = options.filter(option => {
      return availableOptionsValues.indexOf(option.value) === -1;
    });
    options.forEach(option => {
      let optionGroup = option.group || this.props.defaultGroupKey;

      if (!!newState.availableOptions[optionGroup]) {
        newState.availableOptions[optionGroup].nodes.push(option);
      }
    }, this);
    newState.canLoadMoreOptions = options.length === this.props.pageSize;
    newState.isAJAXing = false;
    this.setState(newState, () => {
      this.filterOptions(null, this.state.currentUserInput);
    });
  }

  computeOptionsListWidth() {
    // We need to account for any border on the options list
    let optionsListStyle = window.getComputedStyle(this.refs.optionsList);

    return (
      (this.refs.componentWrapper.clientWidth
      - parseInt(optionsListStyle.borderLeftWidth)
      - parseInt(optionsListStyle.borderRightWidth))
      + 'px'
    );
  }

  debounceFunc(func, time) {
    let timeout;
    time = time || this.props.debounceTimeout;

    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(func, time);
    }
  }

  dispatcher(chain) {
    let toExecute = chain.pop();

    if (!!toExecute) {
      toExecute();
      this.dispatcher.call(this.dispatcher(chain), func);
    }
  }

  filterOptions(event, filter) {
    let filterExp = (
      !!event
      ? new RegExp(this.state.currentUserInput)
      : new RegExp(filter)
    );

    let selectedOptionsValues = this.state.selectedOptions.map(option => option.value);
    let availableOptions = [];

    for (let group in this.props.groups) {
      this.state.availableOptions[group].nodes.forEach(option => {
        availableOptions.push(option);
      });
    }

    let newState = {
      currentlySelectedListOption: 0,
      filteredOptions: availableOptions.filter(option => {
        return (
          !!option.label.match(filterExp) &&
          !option.isNew &&
          selectedOptionsValues.indexOf(option.value) === -1
        );
      }),
      isAJAXing: false
    };

    this.setState(newState);
  }

  getAJAXSpinnerComponent() {
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
  }

  handleSubmitResponse() {
    let response = this.responseText;

    this.setState({ messages: 'success' });
  }

  hideOptionsList(event) {
    this.setState({
      isListHidden: true
    });
  }

  isBottomOfListVisible() {
    let optionsList = this.refs.optionsList;
    // Should be equal to $options-list-max-height
    let optionsListHeight = optionsList.clientHeight;
    let isVisible = (
      (optionsListHeight > 0) &&
        ((optionsList.scrollHeight
          - optionsList.clientHeight)
         === optionsList.scrollTop)
    );

    return isVisible;
  }

  loadMoreOptions() {
    if (!this.state.isAJAXing) {
      this.setState({
        isAJAXing: true,
        page: this.state.page
      }, () => {
        this.props.async(
          this.appendFetchedOptions,
          this.state.page,
          this.state.currentUserInput
        );
        // The spinner should be showing now so we want the user to see it
        this.refs.AJAXSpinner.scrollIntoView();
      });
    }
  }

  onBackspace(event) {
    if (!event.target.value || event.target.value === '') {
      let selectedOption = this.state.selectedOptions[this.state.currentlySelectedInputOption];

      if (!!selectedOption) {
        let newState = {
          currentlySelectedInputOption: this.state.currentlySelectedInputOption - 1
        };

        if (!!selectedOption.isNew) {
          newState.currentUserInput = selectedOption.value;
          this.refs.selectrInput.value = newState.currentUserInput;
        }

        this.setState(
          newState,
          this.removeSelectedOption.bind(this, selectedOption)
        );
      }
    }
  }

  onBlur(event) {
    // TODO: store window.keyDown and bind this.keyDown
  }

  onChange(event) {
    this.setState({
      currentUserInput: event.target.value,
      page: 1
    }, this.filterOptions.bind(this, event));
    //if (!!this.props.onChange) {
    //  this.props.onChange();
    //}
  }

  onEnterTab(event) {
    event.preventDefault();
    this.refs.selectrInput.value = '';

    if (
      !!this.state.filteredOptions[this.state.currentlySelectedListOption] &&
      this.state.currentUserInput === ''
    ) {
      this.selectOption(this.state.filteredOptions[this.state.currentlySelectedListOption]);
    } else {
      let newOption = {
        isNew: true,
        label: this.state.currentUserInput,
        value: this.state.currentUserInput,
        group: this.props.defaultGroupKey
      };

      let newState = {
        availableOptions: new Object(this.state.availableOptions),
        currentlySelectedInputOption: this.state.selectedOptions.length,
        currentUserInput: '',
        selectedOptions: (
          this.props.multiple
          ? Array.from(this.state.selectedOptions).concat(newOption)
          : [newOption]
        )
      };

      // TODO: potentially need to remove this option from the availableOptions
      // list if a user deletes it
      newState.availableOptions[this.props.defaultGroupKey].nodes.push(newOption);
      this.setState(newState, this.filterOptions.bind(this, null, ''));
    }
  }

  onKeyDown(event) {
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

  onScroll() {
    if (this.props.infiniteScrolling && this.isBottomOfListVisible()) {
      this.loadMoreOptions();
    }
  }

  onSubmit(event) {
    let results = selectionFormatter(event);

    this.props.submitSelection(results);
  }

  onWindowResize(event) {
    this.setState({
      optionsListWidth: this.computeOptionsListWidth()
    });
  }

  populateSelectGroups() {
    let groups;
    let nodes = [];

    if (!!this.props.groups) {
      groups = new Object(this.props.groups);
    } else {
      groups = {};

      groups[this.props.defaultGroupKey] = {
        label: '',
        nodes: Array.from(this.state.availableOptions)
      };
    }

    for (let group in groups) {
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
  }

  populateSelectGroupWithOptions(groupKey) {
    let availableOptionsGroup = this.state.availableOptions[groupKey];
    let nodes = [];
    let selectedOptionsValues = [];

    if (!!availableOptionsGroup) {
      if (!!this.state.selectedOptions[0]) {
        selectedOptionsValues = this.state.selectedOptions.map(option => {
          return option.value;
        });
      }

      availableOptionsGroup.nodes.forEach((option, index, options) => {
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
  }

  removeSelectedOption(option) {
    let selectedOptionIndex;
    let selectedOptionsValues;
    let removedOptionIndex;
    let newState = {
      canLoadMoreOptions: true,
      filteredOptions: Array.from(this.state.filteredOptions),
      selectedOptions: Array.from(this.state.selectedOptions)
    };

    selectedOptionsValues = newState.selectedOptions.map(option => {
      return option.value;
    });

    selectedOptionIndex = selectedOptionsValues.indexOf(option.value);
    newState.selectedOptions.splice(selectedOptionIndex, 1);

    if (!option.isNew) {
      newState.filteredOptions = newState.filteredOptions.concat(option);
      // If this is a pre-existing option we want it to go back into the right place
      newState.filteredOptions = newState.filteredOptions.sort((a, b) => {
        if (a.label < b.label) return -1;
        if (a.label > b.label) return 1;
        return 0;
      });
    } else {
      newState.availableOptions = new Object(this.state.availableOptions);
      let availableOptionIndex;
      let optionGroup = option.group || this.props.defaultGroupKey;
      let availableOptionsValues = (
        newState
        .availableOptions[optionGroup]
        .nodes
        .map(option => option.value)
      );

      availableOptionIndex = availableOptionsValues.indexOf(option.value);
      // New options get deleted
      newState.availableOptions[optionGroup].nodes.splice(availableOptionIndex, 1);
    }
    this.setState(newState);
  }

  renderInvisibleScreenNode() {
    let documentRect;
    let invisibleScreenStyle = {};
    let rootParentRect;

    if (!this.state.isListHidden) {
      documentRect = document.documentElement.getBoundingClientRect();

      try {
        rootParentRect = (
          document
          .getElementById(this.props.rootParentId)
          .getBoundingClientRect()
        );
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
  }

  renderLoadMoreOptionsOption() {
    if ((!this.props.infiniteScrolling || this.props.smartScroll) &&
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
  }

  renderOptionsForList() {
    let i = 1;
    let groupedNodes = {};
    let nodes = [];

    for (let group in this.props.groups) {
      groupedNodes[group] = [];
    }

    this.state.filteredOptions.forEach((option, index, options) => {
      let isActive = this.state.currentlySelectedListOption === index;
      let optionGroup = option.group || this.props.defaultGroupKey;

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

    for (let group in this.props.groups) {
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
  }

  renderOptionsList() {
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
  }

  renderOptionsListContainer() {
    let props = {
      className: (
        this.props.selectOptionsListWrapperClass
        + ' options-list-container'
      )
    };

    if (this.props.infiniteScrolling) {
      props.onScroll = this.debounceFunc(this.onScroll);
    }

    return (
      React.createElement('div', props, this.renderOptionsList())
    );
  }

  renderSelectedOptionTags() {
    let nodes = [];

    this.state.selectedOptions.forEach((option, index, options) => {
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
  }

  scrollActiveListItemIntoView() {
    if (!!this.refs.activeListItem) {
      this.refs.optionsList.scrollTop = this.refs.activeListItem.offsetTop;
    }
  }

  selectFromList(selection) {
    let selectedOption = this.state.currentlySelectedListOption;

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

  selectionFormatter(event) {
    let selectedOptions = [];

    try {
      event.target.value.split(',').reduce((items, item, index, values) => {
        this.state.options.forEach(option => {
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

  selectOption(option) {
    const newState = {
      currentlySelectedInputOption: this.state.selectedOptions.length,
      currentUserInput: '',
      selectedOptions: (
        this.props.multiple
        ? Array.from(this.state.selectedOptions).concat(option)
        : [option]
      )
    };

    this.setState(newState, () => {
      this.refs.selectrInput.focus();
      this.filterOptions(undefined, this.state.currentUserInput);
    });

    this.props.onSelectOption(option);
  }

  submitSelection(selection) {
    let request = new XMLHttpRequest();

    request.addEventListener('load', this.props.handleSubmitReponse);
    request.open(
      this.props.submitMethod,
      this.props.submitUrl,
      this.props.isSubmitAsync,
      this.props.submitUser,
      this.props.submitPassword
    );
    request.send(selection);
  }

  toggleOptionsList(isHidden, event) {
    this.setState({
      invisibleScreenClass: 'active',
      isListHidden: isHidden
    }, () => {
      if (!this.state.isListHidden) {
        this.setState({
          optionsListWidth: this.computeOptionsListWidth()
        });
      }
    });
  }

  render() {
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
                className={this.props.inputClasses}
                name={this.props.inputName}
                onChange={this.onChange}
                onBlur={this.onBlur}
                onFocus={this.toggleOptionsList}
                onKeyDown={this.onKeyDown}
                placeholder={this.props.placeholder}
                ref={this.props.inputRef}
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
}

Selectr.propTypes = propTypes;

Selectr.defaultProps = {
  AJAXSpinnerClasses:            'ajax-spinner',
  AJAXSpinnerComponentFactory:   undefined,
  AJAXSpinnerComponentProps:     {},
  AJAXSpinnerListItemClasses:    '',
  async:                         undefined,
  closeIconFactory:              React.createFactory('em'),
  closeIconClass:                '',
  debounceTimeout:               500,
  defaultGroupKey:               'default',
  groups:                        { default: { label: '', nodes: [] } },
  infiniteScrolling:             false,
  initialValue:                  [],
  inputRef:                      'selectrInput',
  inputWrapperClass:             '',
  isSubmitAsync:                 true,
  manualAJAXPrompt:              'Load more options',
  multiple:                      false,
  noMoreOptionsNotice:           'No more options available',
  noMoreOptionsListItemClasses:  '',
  onChange:                      () => false,
  onSelectOption:                () => false,
  options:                       [],
  optionsListItemClass:          'list-item',
  pageSize:                      10,
  placeholder:                   'Please select from the dropdown or type to filter',
  rootParentId:                  'root',
  selectElementClass:            'hidden',
  selectElementName:             '',
  selectOptionsListWrapperClass: '',
  shouldLogErrors:               false,
  smartScroll:                   false,
  spinnerImgPath:                '/images/loader.gif',
  submitMethod:                  'POST',
  submitPassword:                undefined,
  submitUrl:                     'http://localhost:3000',
  submitUser:                    undefined,
  wrapperClass:                  ''
};
