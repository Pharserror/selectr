# SelectR
SelectR is a Select2-type widget but rewritten in React to provide more flexibility
and control through use of state and props.

## Goals
There are some goals behind this project that caused me to write it in the first place:

1. Self-reliance. This library shall not depend on any other libraries outside of React in order to operate correctly and efficiently (more on that later).
2. Everything that should be customizable shall be (within reason). One of the biggest problems that I had with Select2 is that its set of options limited its functionality in some very noticable and hindering ways with respect to how I wanted it to behave. The behavior and appearance of SelectR should be completely open-ended via props that the user can pass into the component and SASS/SCSS variables they can override.
3. IE9+ shall be the oldest browser supported and ECMA5 the oldest standard. Old tech is old and there are ways that we can not have to use it: so, I don't want to. The newerstandards are easier to write in/with and shims are available for those prototype methods that don't exist in older standards. That being said, ...
4. Support for old-school React shall exist. I plan to write this library twice essentially. Once in the old `var SelectR = React.createClass()` way and once in the `export defualt class SelectR extends React.Component {}` way.
5. Tests shall be abundant and exhaustive. This may or may not spawn another project I have brewing but, I can't say much now. Regardless, testing shall be complete and exhaust as many use-cases as possible and shall be done with Jest.
6. Docs shall be abundant and exhaustive. Since so much of this component will be open to the user for them to decide: docs should be the defacto way of using the component and they should exhaust all common situations and most uncommon ones.
7. Code shall be clean and pristine. I like an old-school C-style syntax for JS because that's what JS was written to look like and so it works well. Lots of old dudes (*ahem* the IEEE) smarter than me sat in rooms for many days and talked about how JS should look and be written. Plus, the style makes it very exceedingly easy to obey the 80 column rule. Anyways, I will include a style guide in the future.

## Version 0.0.1 Notes
NOTE: This version is for demo purposes only. Technically you could place the
SelectR.jsx file anywhere you wish to use it and, if its dependencies are met,
it would theoretically work (minus submission - see Caveats).
There are two ways to use this version:
First, from the console in the root of the project directory run:
`npm install && npm install -g webpack`
Then:
`webpack --config webpack.config.js`
This will generate app/assets/javascripts/selectr.js.
Now,

1. Way number one: just open index.html and you should have a demo of the control that will display dummy data. The data is randomly generated so, unless you modify the `generateRandomOptions` function in init.js, you won't see the `noMoreOptionsNotice`.
2. Way number two: start the Express server with `node server.js` and direct your browser to `localhost:9000`. This way is identical to way number one but, I have included it for those people who might want to play around with the Express server; also, I plan to expand on the Express demo server's capabilities for further demonstration purposes in the future.

### Caveats
- The prop spinnerImgPath is relative to the path of the file where the SelectR class lives
- Submission is still WIP (see Goals #1 & #3 then look at `submitSelection`). As of now, if you were to place the control within a form the invisible `<select>` tag would work (or provide your own `submitSelection`).

### Known bugs
- Selection at the end of the input with infiniteScrolling set to true will trigger another AJAX call to load more options. Solutions are to introduce a boolean prop to force the input to close after selection or scroll the list back to the top. A third, more state intensive option, would be to track if the bottom of the list had been reached and then an option had been selected and reset that onScroll.
- On tab and enter for non-multiple selectrs a blank tag is being allowed

## Usage

### General Concept

Looking at the initial state for the component there are 3 properties that should be taken into account:

- `availableOptions`: This is the most important of the three. This is an object in the format of:

```javascript
{
  groupKey: {
    label: 'group label text',
    nodes: [{
      label: 'Option text visible to user',
      group: 'groupKey',
      value: 'value inserted into value attribute of <option> tag'
    }, /* ... more nodes */ ]
  }, // ... more groups 
}
```

- The `availableOptions` object represents, in a JS way, the DOM structure of what is being created. Please see the following image.

- `filteredOptions`: This is an array in the format of:

```javascript
[{
    label: 'Option text visible to user',
    group: 'groupKey',
    value: 'value inserted into value attribute of <option> tag'
}, /* ... more nodes */ ]
```

- This array should contain nodes plucked from the available options based on the `currentUserInput`.

- `selectedOptions`: This is an array in the same format as `filteredOptions` except this array's objects have been plucked from the array of `filteredOptions`.

The general application flow is this:

### Initiation

1. Component loads with a prop `options` in the same format as `filteredOptions` or a prop `async` that is a function that will return an object in the form of `filteredOptions`.
2. If a `defaultGroupKey` prop is supplied then all of the `options` will be put into the `availableOptions`'s `nodes` under this key; otherwise, the key will default to `default`.
3. If the `multiple` prop is set to `true` then the `groupKey`'s of the `availableOptions` will be assigned to `<optgroup>`'s that will be rendered in a hidden-by-default `<select>` element which will hold the actually selected options: the options that a user sees as selected are just a facade.
4. The `nodes` inside each `groupKey`'s `nodes` array will be responsible for rendering `option` elements inside each `optgroup` (if `multiple` is set to `true`) with the matching `group` `groupKey` in the form of: `<option value={node.value}>{node.label}</option>` 

### User Interaction - Selection

1. The user clicks the `<input>`.
2. If there are groups the user will see each set of options under the group header; otherwise, they will just see the options.
3. The user potentially types something.
4. The option's `li` elements are removed from the list if they do not match the `currentUserInput`.
5. A user selects an option.
6. The `filteredOptions` are looked through until the option with the matching value is found, it is then plucked from the `filteredOptions` and placed into the `selectedOptions` which, upon component re-render, sets a `selected` attribute flag on the corresponding `<option>` in the invisible `<select>`.

### User Interaction - Deletion

1. A user clicks the close/dismissal icon for an option.
2. The `selectedOptions` are looked through until the one with the matching value is found: it is then plucked from the `selectedOptions` and placed back into the `availableOptions` - if it matches the `currentUserInput` then the user will see it reappear.

### User Interaction - Creation

1. The user clicks the `<input>` and enters some text.
2. The option they are looking for is not available so they hit enter, or click the `createOptionPrompt` (NYI) if no more options are available.
3. A new `<option>` will be inserted into the hidden `<select>` with the entered text set as the `value` attribute.

### User Interaction - Modification
1. Once a user has created an option they may edit the option if it is at the end of the list by pressing backspace; or, if it is in another position the user may select it by pressing the left or right arrows to select and then press backspace to edit.

### Props

| Property Name                 | Default Value                                       | Description                                                                                                                                                                         |
|-------------------------------|-----------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| AJAXSpinnerClasses            | 'ajax-spinner'                                      | Class applied to the `img` tag of the default spinner gif.                                                                                                                          |
| AJAXSpinnerComponentFactory   | undefined                                           | Pass in a React component factory to render the generated element instead of the default `img`.                                                                                     |
| AJAXSpinnerComponentProps     | {}                                                  | Props to be passed into the spinner component factory.                                                                                                                              |
| AJAXSpinnerListItemClasses    | ''                                                  | Class(es) applied to the `li` tag that holds the spinner.                                                                                                                           |
| async                         | undefined                                           | Function to fetch additional results to render in the list.                                                                                                                         |
| closeIconFactory              | React.createFactory('em')                           | React factory that renders the icon which, when clicked/pressed, will remove the element from the selection.                                                                        |
| closeIconClass                | ''                                                  | Class(es) applied to the default `a` tag for the close icon.                                                                                                                        |
| debounceTimeout               | 500                                                 | Default timeout for all debounced functions: onScroll and onWindowResize.                                                                                                           | 
| defaultGroupKey               | 'default'                                           | If the multiple prop is true then all options will at least be placed into this `OptGroup`.                                                                                         |
| groups                        | `{ default: { label: '', nodes: [] } }`             | Template for `OptGroup`'s and `Option`'s.                                                                                                                                           |
| infiniteScrolling             | false                                               | If a function is passed in via `async` and this is set to true then when the user scrolls to the bottom of the list the async function will be fired in order to load more results. |
| initialValue                  | []                                                  | An array of objects in the format of `{ group: '', label: '', value: '' }` to be preselected.                                                                                       |
| inputWrapperClass             | ''                                                  | Class(es) to be applied to the `div` that wraps the `ul` which renders the input.                                                                                                   |
| isSubmitAsync                 | true                                                | Boolean that dictates whether or not the default form should submit asynchronously.                                                                                                 |
| manualAJAXPrompt              | 'Load more options'                                 | If a function has been passed in via `async` and the last `async` call did not return less than the page size and the user is at the bottom of the list, this prompt will be shown. |
| multiple                      | false                                               | Boolean that dictates whether or not multiple options may be selected.                                                                                                              |
| noMoreOptionsNotice           | 'No more options available'                         | If a function has been passed in via `async` and the last `async` call returned less than the page size and the user is at the bottom of the list, this prompt will be shown.       |
| noMoreOptionsListItemClasses  | ''                                                  | Class(es) to be applied to the `li` that holds the `noMoreOptionsNotice`.                                                                                                           |
| onChange                      | `function() { this.onChange(); }`                   | Function to be run each time the value of the `input` changes.                                                                                                                      |
| options                       | []                                                  | Array of objects in the format of `{ label: '', group: '', value: '' }` to be rendered as `<option>`'s; under the `<optgroup>` (with text `group`), if `multiple` is `true`.        |
| optionsListItemClass          | 'list-item'                                         | Class(es) to be applied to the `li` that renders each option.                                                                                                                       |
| pageSize                      | 10                                                  | Param to be passed through `async` to the server for pagination mechanisms.                                                                                                         |
| placeholder                   | 'Please select from the dropdown or type to filter' | Placeholder for the `<input>`.                                                                                                                                                      |
| rootParentId                  | 'root'                                              | Id attribute of the root element SelectR is rendered in.                                                                                                                            |
| selectElementClass            | 'hidden'                                            | Class(es) to be applied to the (hidden) `select` tag that holds the available `<option>`'s.                                                                                         |
| selectElementName             | ''                                                  | Value of the `name` attribute for the `select` tag.                                                                                                                                 |
| selectionFormatter            | this.selectionFormatter                             | Function to be invoked on form submission that will format the `value` of all of the selected `<option>`'s.                                                                         |
| selectOptionsListWrapperClass | ''                                                  | Class(es) to be applied to the `<div>` that wraps the `<ul>` that holds all of the options visible to the user.                                                                     |
| shouldLogErrors               | false                                               | Boolean to be used in `catch` blocks to log errors if set to `true`.                                                                                                                |
| smartScroll                   | false                                               | Boolean that enables experimental hybrid behavior to determine "the right thing to do" in choice situations where the UX has the potential to break down due to code architecture.  |
| spinnerImgPath                | '/images/loader.gif'                                | Path for the `src` of the default `img` tag for the spinner.                                                                                                                        |
| submitMethod                  | 'POST'                                              | Default HTTP verb used when the default form is submitted.                                                                                                                          |
| submitPassword                | undefined                                           | Password to be provided to the XMLHttpRequest via the default form submission.                                                                                                      |
| submitSelection               | this.submitSelection                                | Method invoked when the default form is submitted.                                                                                                                                  |
| submitUrl                     | 'http://localhost:3000'                             | URL to submit the default form to.                                                                                                                                                  |
| submitUser                    | undefined                                           | Username to be provided to the XMLHttpRequest via the default form submission.                                                                                                      |
| wrapperClass                  | ''                                                  | Class(es) to be applied to the `<div>` that wraps the entire component.                                                                                                             |

### State

| Property Name                | Default Value                           | Description                                                                                                                                           |
|------------------------------|-----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| availableOptions             | `{ default: { label: '', nodes: [] } }` | Object with group keys of objects consisting of group labels and option nodes in the format of `{ label: '', group: '', value: '' }`.                 |
| canLoadMoreOptions           | false                                   | Boolean that keeps track of whether or not `this.props.async` can actually return more options.                                                       |
| currentlySelectedInputOption | -1                                      | Index of the visible option that is currently selected. Pressing left/right on the keyboard will focus a new option and decrease/increase this value. |
| currentlySelectedListOption  | 0                                       | Index of the visible option in the list that is currently "selected"/highlighted. Pressing up/down on the keyboard will decrease/increase this value. |
| currentUserInput             | ''                                      | Current value of the `value` attribute of the `<input>`.                                                                                              |
| filteredOptions              | []                                      | Options in the list that the user can see based off of the `currentUserInput`.                                                                        |
| invisibleScreenClass         | 'hidden'                                | String of either `'hidden'` or `''` to be applied as a class to the invisible screen `div` when the input is closed or open, respectively.            |
| isAJAXing                    | false                                   | Boolean to keep track of if a request for more options is currently being fired through `this.props.async`.                                           |
| isListHidden                 | true                                    | Boolean that dictates whether or not the list of options is visible to the user.                                                                      |
| isPendingOptionsUpdate       | false                                   | Boolean to be used in `componentShouldUpdate` that will determine the course of the lifecycle at said point.                                          |
| optionsListWidth             | '0px'                                   | Current width of the list of options visible to the user: is updated `onWindowResize`.                                                                |
| page                         | 1                                       | Current page of options related to the `currentUserInput`: is reset upon deletion of input.                                                           |
| selectedOptions              | []                                      | Array of objects in the format of `{ label: '', group: '', value: '' }` that determines which objects are selected.                                   |

### SCSS VARIABLES

Coming soon: I hope the variable names help at least a little (sorry).

## Improvements
- Add a prop to show the group label in the selected options; i.e., for a group 'clients' with node labels of emails a selected option would have the text "clients: anywaysjim@howyadoin.com". Could even allow the delimiter to be customizable from just a colon.
- Add a boolean prop to determine whether or not a group header stays sticky for as long as its elements are being scrolled.
- Add a boolean prop to enable/disable a prompt for option creation shown when there are no more options available.
