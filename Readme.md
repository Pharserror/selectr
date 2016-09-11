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
