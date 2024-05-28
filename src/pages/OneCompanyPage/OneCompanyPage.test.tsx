/* eslint-disable max-lines */
import React from 'react';
import nock from 'nock';
import { render, screen, waitFor, act } from '@testing-library/react';
import { OneCompanyPage } from './OneCompanyPage';
import { QueryClientProvider } from 'react-query';
import { QueryClient } from 'react-query';
import '@testing-library/jest-dom';
import { configuration } from '../../api/controllers';
import userEvent from '@testing-library/user-event';

function expectCompanyPageSkeletonToBePresent() {
  expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  expect(screen.getByText('Таблица')).toBeInTheDocument();
  expect(screen.getByText('Тип отчетов')).toBeInTheDocument();
  expect(screen.getByText('Компания (выбор одной)')).toBeInTheDocument();
  expect(screen.getByText('Год')).toBeInTheDocument();
  expect(screen.getByText('Среднее')).toBeInTheDocument();
  expect(screen.getByText('Критерий E')).toBeInTheDocument();
  expect(screen.getByText('Критерий S')).toBeInTheDocument();
  expect(screen.getByText('Критерий G')).toBeInTheDocument();
}

describe('One company page', () => {
  let queryClient: QueryClient;
  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: Infinity,
        },
      },
    });

    jest.resetAllMocks();
    nock.cleanAll();
    nock.disableNetConnect();
  });

  afterEach(() => {
    if (!nock.isDone()) {
      console.log('Pending mocks: ', nock.pendingMocks());
    }
    nock.cleanAll();
    nock.enableNetConnect();
  });

  test('renders company page on errors', async () => {
    // nock.recorder.rec({});
    const baseUrl: string = configuration.baseHostName;
    const apiMock = nock(baseUrl);
    apiMock
      .get('/api/topsis/companies')
      .query({ company_type_name: 'rspp' })
      .reply(500)
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
    apiMock
      .get('/api/topsis/companies')
      .query({ company_type_name: 'non_rspp' })
      .reply(500)
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
    apiMock
      .get('/api/topsis/topsis/esg')
      .query({ aggregate_types: 'average' })
      .reply(500)
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });

    render(
      <QueryClientProvider client={queryClient}>
        <OneCompanyPage />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(nock.isDone()).toBeTruthy();
      expectCompanyPageSkeletonToBePresent();
    });
  });

  test('renders one company page on empty response', async () => {
    const baseUrl: string = configuration.baseHostName; // Ensure baseHostName is of type string
    const apiMock = nock(baseUrl);
    apiMock
      .get('/api/topsis/companies')
      .query({ company_type_name: 'rspp' })
      .reply(200, { 'items': [] }, {
        'Content-Type': 'application/json',
      })
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
    apiMock
      .get('/api/topsis/companies')
      .query({ company_type_name: 'non_rspp' })
      .reply(200, { 'items': [] }, {
        'Content-Type': 'application/json',
      })
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
    apiMock
      .get('/api/topsis/topsis/esg')
      .query({ aggregate_types: 'average' })
      .reply(200, { 'items': [] }, {
        'Content-Type': 'application/json',
      })
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });

    render(
      <QueryClientProvider client={queryClient}>
        <OneCompanyPage />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(nock.isDone()).toBeTruthy();
      expectCompanyPageSkeletonToBePresent();
    });
  });

  test('renders all companies of selected type', async () => {
    const baseUrl: string = configuration.baseHostName; // Ensure baseHostName is of type string
    const apiMock = nock(baseUrl);
    apiMock
      .get('/api/topsis/companies')
      .query({ company_type_name: 'rspp' })
      .reply(200, { 'data': [{ 'id': 1, 'name': 'THIS_IS_RSPP' }] }, {
        'Content-Type': 'application/json',
      })
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
    apiMock
      .get('/api/topsis/companies')
      .query({ company_type_name: 'non_rspp' })
      .reply(200, { 'data': [{ 'id': 2, 'name': 'THIS_IS_NON_RSPP' }] }, {
        'Content-Type': 'application/json',
      })
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
    apiMock
      .get('/api/topsis/topsis/esg')
      .query({ aggregate_types: 'average' })
      .reply(200, { 'items': [] }, {
        'Content-Type': 'application/json',
      })
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });

    render(
      <QueryClientProvider client={queryClient}>
        <OneCompanyPage />
      </QueryClientProvider>,
    );

    userEvent.click(screen.getByLabelText('Тип отчетов'));
    userEvent.click(screen.getByText('Компании'));
    await waitFor(() => expect(screen.getByLabelText('Компания (выбор одной)')).toBeEnabled());
    userEvent.click(screen.getByRole('combobox', { name: 'Компания (выбор одной)' }));
    const rsppOption = await screen.findByText('THIS_IS_RSPP', {}, { timeout: 3000 });
    expect(rsppOption).toBeInTheDocument();

    userEvent.click(rsppOption);

    userEvent.click(screen.getByLabelText('Тип отчетов'));
    userEvent.click(screen.getByText('Банки'));
    await waitFor(() => expect(screen.getByLabelText('Компания (выбор одной)')).toBeEnabled());
    userEvent.click(screen.getByRole('combobox', { name: 'Компания (выбор одной)' }));
    const nonRsppOption = await screen.findByText('THIS_IS_NON_RSPP', {}, { timeout: 3000 });
    expect(nonRsppOption).toBeInTheDocument();

    userEvent.click(nonRsppOption);

    await waitFor(() => {
      expect(nock.isDone()).toBeTruthy();
      expectCompanyPageSkeletonToBePresent();
    });
  });
});