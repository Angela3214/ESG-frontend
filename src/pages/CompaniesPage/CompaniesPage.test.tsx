/* eslint-disable max-lines */
import React from 'react';
import nock from 'nock';
import { render, screen, waitFor, act, Matcher } from '@testing-library/react';
import { CompaniesPage, allCompanyTypes } from './CompaniesPage';
import { QueryClientProvider } from 'react-query';
import { QueryClient } from 'react-query';
import '@testing-library/jest-dom';
import { configuration } from '../../api/controllers';

function expectTableSkeletonToBePresent() {
  expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  expect(screen.getByText('Список компаний')).toBeInTheDocument();

  expect(screen.getAllByText('Поиск по названию компании')[0]).toBeInTheDocument();

  expect(screen.getByText('Название компании')).toBeInTheDocument();
  expect(screen.getByText('Отрасль')).toBeInTheDocument();

  allCompanyTypes.forEach((companyType) => {
    expect(screen.getAllByText(companyType as Matcher)[0]).toBeInTheDocument();
  });
}

function expectProgressBar() {
  expect(screen.queryByTestId('loading')).toBeInTheDocument();
  expect(screen.queryByText('Список компаний')).not.toBeInTheDocument();

  expect(screen.queryByText('Поиск по названию компании')).not.toBeInTheDocument();

  expect(screen.queryByText('Название компании')).not.toBeInTheDocument();
  expect(screen.queryByText('Отрасль')).not.toBeInTheDocument();

  allCompanyTypes.forEach((companyType) => {
    expect(screen.queryByText(companyType as Matcher)).not.toBeInTheDocument();
  });
}

describe('Companies page', () => {
  const infiniteDelay = 2147483647;
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

  test('renders table on errors', async () => {
    const baseUrl: string = configuration.baseHostName; // Ensure baseHostName is of type string
    const apiMock = nock(baseUrl);
    apiMock
      .get('/api/bank/').reply(500)
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
    apiMock
      .get('/api/bank/broker').reply(500)
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
    apiMock
      .get('/api/bank/insurance').reply(500)
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
    apiMock
      .get('/api/bank/mfo').reply(500)
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });

    render(
      <QueryClientProvider client={queryClient}>
        <CompaniesPage />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(nock.isDone()).toBeTruthy();
      expectTableSkeletonToBePresent();
    });
  });

  test('renders table on empty response', async () => {
    const baseUrl: string = configuration.baseHostName; // Ensure baseHostName is of type string
    const apiMock = nock(baseUrl);
    apiMock
      .get('/api/bank/')
      .reply(200, { 'items': [] }, {
        'Content-Type': 'application/json',
      })
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
    apiMock
      .get('/api/bank/broker')
      .reply(200, { 'items': [] }, {
        'Content-Type': 'application/json',
      })
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
    apiMock
      .get('/api/bank/insurance')
      .reply(200, { 'items': [] }, {
        'Content-Type': 'application/json',
      })
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
    apiMock
      .get('/api/bank/mfo')
      .reply(200, { 'items': [] }, {
        'Content-Type': 'application/json',
      })
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });

    render(
      <QueryClientProvider client={queryClient}>
        <CompaniesPage />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(nock.isDone()).toBeTruthy();
      expectTableSkeletonToBePresent();
    });
  });

  test('renders all types of banks', async () => {
    const baseUrl: string = configuration.baseHostName; // Ensure baseHostName is of type string
    const apiMock = nock(baseUrl);
    apiMock
      .get('/api/bank/')
      .reply(200, { 'items': [{ 'bank_name': 'THIS_IS_BANK' }] }, {
        'Content-Type': 'application/json',
      })
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
    apiMock
      .get('/api/bank/broker')
      .reply(200, { 'items': [{ 'bank_name': 'THIS_IS_BROKER' }] }, {
        'Content-Type': 'application/json',
      })
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
    apiMock
      .get('/api/bank/insurance')
      .reply(200, { 'items': [{ 'bank_name': 'THIS_IS_INSURANCE' }] }, {
        'Content-Type': 'application/json',
      })
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
    apiMock
      .get('/api/bank/mfo')
      .reply(200, { 'items': [{ 'bank_name': 'THIS_IS_MFO' }] }, {
        'Content-Type': 'application/json',
      })
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });

    render(
      <QueryClientProvider client={queryClient}>
        <CompaniesPage />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(nock.isDone()).toBeTruthy();
      expectTableSkeletonToBePresent();

      for (const bankName of ['THIS_IS_BANK', 'THIS_IS_BROKER', 'THIS_IS_INSURANCE', 'THIS_IS_MFO']) {
        expect(screen.getByText(bankName)).toBeInTheDocument();
      }
    });
  });

  test('renders progress bar when on waiting', async () => {
    const baseUrl: string = configuration.baseHostName; // Ensure baseHostName is of type string
    const apiMock = nock(baseUrl);
    apiMock
      .get('/api/bank/')
      .delayConnection(infiniteDelay)
      .reply(500)
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
    apiMock
      .get('/api/bank/broker')
      .delayConnection(infiniteDelay)
      .reply(500)
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
    apiMock
      .get('/api/bank/insurance')
      .delayConnection(infiniteDelay)
      .reply(500)
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
    apiMock
      .get('/api/bank/mfo')
      .delayConnection(infiniteDelay)
      .reply(500)
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });

    render(
      <QueryClientProvider client={queryClient}>
        <CompaniesPage />
      </QueryClientProvider>,
    );

    await act(async () => {
      return new Promise((r) => setTimeout(r, 500));
    });
    await waitFor(() => {
      expectProgressBar();
    });
  });

  test('renders table if at least one loads', async () => {
    const baseUrl: string = configuration.baseHostName; // Ensure baseHostName is of type string
    const apiMock = nock(baseUrl);
    apiMock
      .get('/api/bank/')
      .delayConnection(infiniteDelay)
      .reply(500)
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
    apiMock
      .get('/api/bank/broker')
      .delayConnection(infiniteDelay)
      .reply(500)
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
    apiMock
      .get('/api/bank/insurance')
      .delayConnection(50)
      .reply(200, { 'items': [] }, {
        'Content-Type': 'application/json',
      })
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
    apiMock
      .get('/api/bank/mfo')
      .delayConnection(infiniteDelay)
      .reply(500)
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });

    render(
      <QueryClientProvider client={queryClient}>
        <CompaniesPage />
      </QueryClientProvider>,
    );
    await waitFor(() => {
      expectTableSkeletonToBePresent();
    });
  });
});