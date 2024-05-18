import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { CompaniesTable, companyNameTestId, companyTypeTestId, searchPromptLabel } from './CompaniesTable';
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

    console.log('prompt', searchPrompt);
    userEvent.type(searchPrompt, 'ExactPattern');

    screen.debug();
    expect(getTableContent()).toEqual([
      { name: 'ExactPattern', type: 'type1' },
      { name: 'exactpattern', type: 'type2' },
      { name: 'PrefixExactPatternSuffix', type: 'type1' },
      { name: 'PrefixexactPatternSuffix', type: 'type2' },
    ]);
  });

  test('search respects ordering by name', async () => {
    const companies: { name: string, type: string }[] = [];
    const allTypes: string[] = [];

    render(
      <CompaniesTable companies={companies} allTypes={allTypes} />,
    );

    // TODO
    expect(getTableContent()).toEqual([]);
  });

  test('search respects ordering by type', async () => {
    const companies: { name: string, type: string }[] = [];
    const allTypes: string[] = [];

    render(
      <CompaniesTable companies={companies} allTypes={allTypes} />,
    );

    // TODO
    expect(getTableContent()).toEqual([]);
  });

  test('filter works', async () => {
    const companies: { name: string, type: string }[] = [];
    const allTypes: string[] = [];

    render(
      <CompaniesTable companies={companies} allTypes={allTypes} />,
    );

    // TODO
    expect(getTableContent()).toEqual([]);
  });

  test('filter respects ordering by name', async () => {
    const companies: { name: string, type: string }[] = [];
    const allTypes: string[] = [];

    render(
      <CompaniesTable companies={companies} allTypes={allTypes} />,
    );

    // TODO
    expect(getTableContent()).toEqual([]);
  });

  test('filter respects ordering by type', async () => {
    const companies: { name: string, type: string }[] = [];
    const allTypes: string[] = [];

    render(
      <CompaniesTable companies={companies} allTypes={allTypes} />,
    );

    // TODO
    expect(getTableContent()).toEqual([]);
  });

  test('search respect filtering', async () => {
    const companies: { name: string, type: string }[] = [];
    const allTypes: string[] = [];

    render(
      <CompaniesTable companies={companies} allTypes={allTypes} />,
    );

    // TODO
    expect(getTableContent()).toEqual([]);
  });

  test('ordering by type also orders by name', async () => {
    const companies: { name: string, type: string }[] = [];
    const allTypes: string[] = [];

    render(
      <CompaniesTable companies={companies} allTypes={allTypes} />,
    );

    // TODO
    expect(getTableContent()).toEqual([]);
  });

  test('support pagination', async () => {
    const companies: { name: string, type: string }[] = [];
    const allTypes: string[] = [];

    render(
      <CompaniesTable companies={companies} allTypes={allTypes} />,
    );

    // TODO
    expect(getTableContent()).toEqual([]);
  });
});
