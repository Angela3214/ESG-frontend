/* eslint-disable max-lines */
import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import {
  CompaniesTable,
  companyNameTestId,
  companyTypeTestId,
  searchPromptLabel,
  sortTypePromptLabel,
} from './CompaniesTable';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

function getTableContent() {
  const names = screen.queryAllByTestId(companyNameTestId);
  const types = screen.queryAllByTestId(companyTypeTestId);
  return names.map((nameElement, index) => {
    const name = nameElement.textContent;
    const type = types[index]?.textContent;
    return { name, type };
  });
}

describe('Companies table', () => {
  test('by default sorts by company name', async () => {
    const companies = [
      { name: 'A', type: 'type1' },
      { name: 'C', type: 'type2' },
      { name: 'B', type: 'type1' },
      { name: 'D', type: 'type2' },
    ];
    const allTypes = ['type1', 'type2'];

    render(
      <CompaniesTable companies={companies} allTypes={allTypes} />,
    );

    expect(getTableContent()).toEqual([
      { name: 'A', type: 'type1' },
      { name: 'B', type: 'type1' },
      { name: 'C', type: 'type2' },
      { name: 'D', type: 'type2' },
    ]);
  });

  test('searches by company name', async () => {
    const companies = [
      { name: 'PrefixExactPatternSuffix', type: 'type1' },
      { name: 'PrefixexactPatternSuffix', type: 'type2' },
      { name: 'ExactPattern', type: 'type1' },
      { name: 'exactpattern', type: 'type2' }, // case insensitive
      { name: 'PrefixexactOopsPatternSuffix', type: 'type1' },
      { name: 'Oops', type: 'type2' },
    ];
    const allTypes = ['type1', 'type2'];

    render(
      <CompaniesTable companies={companies} allTypes={allTypes} />,
    );

    const searchPrompt = screen.getByLabelText(searchPromptLabel);

    userEvent.type(searchPrompt, 'ExactPattern');

    expect(getTableContent()).toEqual([
      { name: 'ExactPattern', type: 'type1' },
      { name: 'exactpattern', type: 'type2' },
      { name: 'PrefixExactPatternSuffix', type: 'type1' },
      { name: 'PrefixexactPatternSuffix', type: 'type2' },
    ]);
  });

  test('search respects ordering by name', async () => {
    const companies = [
      { name: 'b1', type: 'type1' },
      { name: 'a1', type: 'type2' },
      { name: 'c1', type: 'type1' },
      { name: 'c2', type: 'type2' }, // case insensitive
      { name: 'a2', type: 'type1' },
      { name: 'b2', type: 'type2' },
    ];
    const allTypes = ['type1', 'type2'];

    render(
      <CompaniesTable companies={companies} allTypes={allTypes} />,
    );

    const searchPrompt = screen.getByLabelText(searchPromptLabel);

    userEvent.type(searchPrompt, '1');

    expect(getTableContent()).toEqual([
      { name: 'a1', type: 'type2' },
      { name: 'b1', type: 'type1' },
      { name: 'c1', type: 'type1' }
    ]);
  });

  test('search respects ordering by type', async () => {
    const companies = [
      { name: 'b1', type: 'typeA' },
      { name: 'a1', type: 'typeB' },
      { name: 'c1', type: 'typeA' },
      { name: 'c2', type: 'typeB' }, // case insensitive
      { name: 'a2', type: 'typeA' },
      { name: 'b2', type: 'typeB' },
    ];
    const allTypes = ['typeA', 'typeB'];

    render(
      <CompaniesTable companies={companies} allTypes={allTypes} />,
    );

    const sortTypePrompt = screen.getByLabelText(sortTypePromptLabel);
    userEvent.click(sortTypePrompt);

    const searchPrompt = screen.getByLabelText(searchPromptLabel);
    userEvent.type(searchPrompt, '1');

    expect(getTableContent()).toEqual([
      { name: 'b1', type: 'typeA' },
      { name: 'c1', type: 'typeA' },
      { name: 'a1', type: 'typeB' }
    ]);
  });

  test('filter works', async () => {
    const companies = [
      { name: 'b1', type: 'typeA' },
      { name: 'a1', type: 'typeB' },
      { name: 'c1', type: 'typeA' },
      { name: 'c2', type: 'typeB' }, // case insensitive
      { name: 'a2', type: 'typeA' },
      { name: 'b2', type: 'typeB' },
    ];
    const allTypes = ['typeA', 'typeB'];

    render(
      <CompaniesTable companies={companies} allTypes={allTypes} />,
    );

    userEvent.click(screen.getByTestId("chip-typeB"));

    expect(getTableContent()).toEqual([
      { name: 'a2', type: 'typeA' },
      { name: 'b1', type: 'typeA' },
      { name: 'c1', type: 'typeA' }
    ]);
  });

  test('filter respects ordering by name', async () => {
    const companies = [
      { name: 'b1', type: 'typeA' },
      { name: 'a1', type: 'typeB' },
      { name: 'c1', type: 'typeA' },
      { name: 'c2', type: 'typeB' }, // case insensitive
      { name: 'a2', type: 'typeA' },
      { name: 'b2', type: 'typeB' }
    ];
    const allTypes = ['typeA', 'typeB'];

    render(
      <CompaniesTable companies={companies} allTypes={allTypes} />,
    );

    userEvent.click(screen.getByTestId("chip-typeA"));

    expect(getTableContent()).toEqual([
      { name: 'a1', type: 'typeB' },
      { name: 'b2', type: 'typeB' },
      { name: 'c2', type: 'typeB' }
    ]);
  });

  test('filter respects ordering by type', async () => {
    const companies = [
      { name: 'b1', type: 'typeA' },
      { name: 'a1', type: 'typeB' },
      { name: 'c1', type: 'typeA' },
      { name: 'c2', type: 'typeB' }, // case insensitive
      { name: 'a2', type: 'typeA' },
      { name: 'b2', type: 'typeB' },
      { name: 'e1', type: 'typeC' },
      { name: 'f1', type: 'typeC' },
      { name: 'd1', type: 'typeC' },
    ];
    const allTypes = ['typeA', 'typeB', 'typeC'];

    render(
      <CompaniesTable companies={companies} allTypes={allTypes} />,
    );

    const sortTypePrompt = screen.getByLabelText(sortTypePromptLabel);
    userEvent.click(sortTypePrompt);

    userEvent.click(screen.getByTestId("chip-typeA"));

    expect(getTableContent()).toEqual([
      { name: 'a1', type: 'typeB' },
      { name: 'b2', type: 'typeB' },
      { name: 'c2', type: 'typeB' },
      { name: 'd1', type: 'typeC' },
      { name: 'e1', type: 'typeC' },
      { name: 'f1', type: 'typeC' },
    ]);
  });

  test('search respect filtering', async () => {
    const companies = [
      { name: 'b1', type: 'typeA' },
      { name: 'a1', type: 'typeB' },
      { name: 'c1', type: 'typeA' },
      { name: 'c2', type: 'typeB' }, // case insensitive
      { name: 'a2', type: 'typeA' },
      { name: 'b2', type: 'typeB' },
      { name: 'e1', type: 'typeC' },
      { name: 'f1', type: 'typeC' },
      { name: 'd1', type: 'typeC' },
    ];
    const allTypes = ['typeA', 'typeB', 'typeC'];

    render(
      <CompaniesTable companies={companies} allTypes={allTypes} />,
    );

    userEvent.click(screen.getByTestId("chip-typeA"));

    const searchPrompt = screen.getByLabelText(searchPromptLabel);
    userEvent.type(searchPrompt, '2');

    expect(getTableContent()).toEqual([
      { name: 'b2', type: 'typeB' },
      { name: 'c2', type: 'typeB' },
    ]);
  });

  test('ordering by type also orders by name', async () => {
    const companies = [
      { name: 'b1', type: 'typeA' },
      { name: 'a1', type: 'typeB' },
      { name: 'c1', type: 'typeA' },
      { name: 'c2', type: 'typeB' },
      { name: 'a2', type: 'typeA' },
      { name: 'b2', type: 'typeB' },
      { name: 'e1', type: 'typeC' },
      { name: 'f1', type: 'typeC' },
      { name: 'd1', type: 'typeC' },
    ];
    const allTypes = ['typeA', 'typeB', 'typeC'];

    render(
      <CompaniesTable companies={companies} allTypes={allTypes} />,
    );

    const sortTypePrompt = screen.getByLabelText(sortTypePromptLabel);
    userEvent.click(sortTypePrompt);

    expect(getTableContent()).toEqual([
      { name: 'a2', type: 'typeA' },
      { name: 'b1', type: 'typeA' },
      { name: 'c1', type: 'typeA' },
      { name: 'a1', type: 'typeB' },
      { name: 'b2', type: 'typeB' },
      { name: 'c2', type: 'typeB' },
      { name: 'd1', type: 'typeC' },
      { name: 'e1', type: 'typeC' },
      { name: 'f1', type: 'typeC' },
    ]);
  });
});
