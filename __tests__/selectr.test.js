// Tests for the options index component
'use strict';

//jest.unmock('../SelectR.jsx');

import React              from 'react';
import ReactDOM           from 'react-dom';
import TestUtils          from 'react-addons-test-utils';
import testUtilsAdditions from 'react-testutils-additions';


describe('SelectR', () => {
  it('renders', () => {
    let SelectR = require('../SelectR.jsx');
    let selectrComponent = TestUtils.renderIntoDocument(<SelectR />);
    let selectrNode = ReactDOM.findDOMNode(selectrComponent);
    // check that it rendered
    expect(selectrNode.textContent).toContain('No more options available');
  });
  it('displays options', () => {
    let SelectR = require('../SelectR.jsx');
    let selectrComponent = TestUtils.renderIntoDocument(
      <SelectR
        options={[{
          group: 'default',
          label: 'test',
          value: 'test'
        }]}
      />
    );
    let selectrNode = ReactDOM.findDOMNode(selectrComponent);
    expect(selectrNode.textContent).toContain('test');
  });
  it('has a menu that opens', () => {
    // NOTE: for some reason setting document.documentElement.innerHtml still
    // doesn't make document.getElementById work...
    let SelectR = require('../SelectR.jsx');
    let selectrComponent = TestUtils.renderIntoDocument(
      <SelectR
        options={[{
          group: 'default',
          label: 'test',
          value: 'test'
        }]}
      />
    );
    let inputNode = ReactDOM.findDOMNode(selectrComponent.refs.input);
    TestUtils.Simulate.focus(inputNode);
    expect(selectrComponent.state.isListHidden).toEqual(false);
  });
  it('has options you can pick', () => {
    let SelectR = require('../SelectR.jsx');
    let selectrComponent = TestUtils.renderIntoDocument(
      <SelectR
        options={[{
          group: 'default',
          label: 'test',
          value: 'test'
        }]}
      />
    );
    let inputNode = ReactDOM.findDOMNode(selectrComponent.refs.input);
    TestUtils.Simulate.focus(inputNode);
    TestUtils.Simulate.click(selectrComponent.refs.optionsList.childNodes[0]);
    expect(selectrComponent.refs.selectElement.value).toEqual('test');
  });
  it('has options you can unselect', () => {
    let options = [{
      group: 'default',
      label: 'test',
      value: 'test'
    }];
    let SelectR = require('../SelectR.jsx');
    let selectrComponent = TestUtils.renderIntoDocument(
      <SelectR
        options={options}
        initialValue={options}
      />
    );
    TestUtils
    .Simulate
    .click(selectrComponent.refs.selectedOptionsList.children[0].children[0]);
    // Wait 1 second for the state to be set
    setTimeout(() => {
      expect(selectrComponent.refs.selectElement.value).toEqual('')
    }, 1000);
  });
});
