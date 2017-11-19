import { PropTypes } from 'react';

const { array, bool, func, number, object, string } = PropTypes;
const propTypes = {
  AJAXSpinnerClasses:            string,
  AJAXSpinnerComponentFactory:   func,
  AJAXSpinnerComponentProps:     object,
  AJAXSpinnerListItemClasses:    string,
  async:                         func,
  closeIconFactory:              func,
  closeIconClass:                string,
  debounceFunc:                  func,
  debounceTimeout:               number,
  defaultGroupKey:               string,
  groups:                        object,
  infiniteScrolling:             bool,
  initialValue:                  array,
  inputWrapperClass:             string,
  isSubmitAsync:                 bool,
  manualAJAXPrompt:              string,
  multiple:                      bool,
  noMoreOptionsNotice:           string,
  noMoreOptionsListItemClasses:  string,
  onChange:                      func,
  options:                       array,
  optionsListItemClass:          string,
  pageSize:                      number,
  placeholder:                   string,
  rootParentId:                  string,
  selectElementClass:            string,
  selectElementName:             string,
  selectionFormatter:            func,
  selectOptionsListWrapperClass: string,
  shouldLogErrors:               bool,
  spinnerImgPath:                string,
  submitMethod:                  string,
  submitPassword:                string,
  submitSelection:               func,
  submitUrl:                     string,
  submitUser:                    string,
  wrapperClass:                  string
};

export default propTypes;
