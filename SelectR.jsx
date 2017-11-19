import getDefaultProps from './src/defaultProps';
import getInitialState from './src/getInitialState';
import * as events from './src/events';
import * as lifecycles from './src/lifecycle';
import propTypes from './src/propTypes';
import React, { Component } from 'react';
import * as renders from './src/render';

const externals = [events, lifecycle, renders];

export default class SelectR extends Component {
  constructor(props) {
    super(props);

    this.state = getInitialState();

    externals.forEach(external => {
      for (let funcName in external) {
        this[funcName] = external[funcName].bind(this);
      }
    }, this);
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
    time = time || this.props.debounceTimeout;

    let timeout;

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

  handleSubmitResponse() {
    let response = this.responseText;

    this.setState({ messages: 'success' });
  }

  isBottomOfListVisible() {
    let optionsList = this.refs.optionsList;
    // Should be equal to $options-list-max-height
    let optionsListHeight = optionsList.clientHeight;
    let isVisible = (optionsListHeight > 0) &&
                    ((optionsList.scrollHeight
                    - optionsList.clientHeight)
                    === optionsList.scrollTop);
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

  populateSelectGroups() {
    let nodes = [];

    if (!!this.props.groups) {
      let groups = new Object(this.props.groups);
    } else {
      let groups = {};
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

  scrollActiveListItemIntoView() {
    if (!!this.refs.activeListItem) {
      this.refs.optionsList.scrollTop = this.refs.activeListItem.offsetTop;
    }
  }

  selectionFormatter(event) {
    let selectedOptions = [];

    try {
      event.target.value.split(',').reduce((items, item, index, values) => {
        this.state.options.forEach((option) => {
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
}

SelectR.defaultProps = {
  ...getDefaultProps()
};

SelectR.propTypes = {
  ...propTypes
};

export default SelectR
