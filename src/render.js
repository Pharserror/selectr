export function populateSelectGroupWithOptions(groupKey) {
  var availableOptionsGroup = this.state.availableOptions[groupKey];
  var nodes = [];
  var selectedOptionsValues = [];

  if (!!availableOptionsGroup) {
    if (!!this.state.selectedOptions[0]) {
      selectedOptionsValues = this.state.selectedOptions.map(option => option.value);
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

export function renderAJAXSpinnerComponent() {
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

export function renderInvisibleScreenNode() {
  var documentRect;
  var invisibleScreenStyle = {};
  var rootParentRect;

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
    invisibleScreenStyle.width  = documentRect.width + 'px';

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

export function renderLoadMoreOptionsOption() {
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

export function renderOptionsForList() {
  var i = 1;
  var groupedNodes = {};
  var nodes = [];

  for (var group in this.props.groups) {
    groupedNodes[group] = [];
  }

  this.state.filteredOptions.forEach((option, index, options) => {
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
}

export function renderOptionsList() {
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

export function renderOptionsListContainer() {
  var props = {
    className: this.props.selectOptionsListWrapperClass +
               ' options-list-container'
  };
  if (this.props.infiniteScrolling) {
    props.onScroll = this.debounceFunc(this.onScroll);
  }
  return (
    React.createElement('div', props, this.renderOptionsList())
  );
}

export function renderSelectedOptionTags() {
  var nodes = [];

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

/* export default {
 *   renderInvisibleScreenNode,
 *   renderLoadMoreOptionsOption,
 *   renderOptionsForList,
 *   renderOptionsList,
 *   renderOptionsListContainer,
 *   renderSelectedOptionTags
}*/
