export function getInitialState() {
  return {
    availableOptions:             { default: { label: '', nodes: [] } },
    canLoadMoreOptions:           false,
    currentlySelectedInputOption: -1,
    currentlySelectedListOption:  0,
    currentUserInput:             '',
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
