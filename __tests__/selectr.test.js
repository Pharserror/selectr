// Tests for the options index component
'use strict';


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
    // Wait a little bit for the state to be set
    setTimeout(() => {
      expect(selectrComponent.refs.selectElement.value).toEqual('')
    }, 100);
  });
  it('can select multiple options', () => {
    let options = [{
      group: 'default',
      label: 'test',
      value: 'test'
    }, {
      group: 'default',
      label: 'test2',
      value: 'test2'
    }];
    let SelectR = require('../SelectR.jsx');
    let selectrComponent = TestUtils.renderIntoDocument(
      <SelectR
        multiple
        options={options}
      />
    );
    let inputNode = ReactDOM.findDOMNode(selectrComponent.refs.input);
    TestUtils.Simulate.focus(inputNode);
    TestUtils.Simulate.click(selectrComponent.refs.optionsList.childNodes[0]);
    TestUtils.Simulate.click(selectrComponent.refs.optionsList.childNodes[0]);
    setTimeout(() => {
      expect(selectrComponent.refs.selectElement.value).toEqual('test, test2');
    }, 100);
  });
  it('can select only one option', () => {
    let options = [{
      group: 'default',
      label: 'test',
      value: 'test'
    }, {
      group: 'default',
      label: 'test2',
      value: 'test2'
    }];
    let SelectR = require('../SelectR.jsx');
    let selectrComponent = TestUtils.renderIntoDocument(
      <SelectR
        multiple={false}
        options={options}
      />
    );
    let inputNode = ReactDOM.findDOMNode(selectrComponent.refs.input);
    TestUtils.Simulate.focus(inputNode);
    TestUtils.Simulate.click(selectrComponent.refs.optionsList.childNodes[0]);
    TestUtils.Simulate.click(selectrComponent.refs.optionsList.childNodes[0]);
    setTimeout(() => {
      expect(selectrComponent.refs.selectElement.value).toEqual('test2');
    }, 100);
  });
});
