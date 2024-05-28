/* eslint-disable max-lines */
import React from 'react';
import nock from 'nock';
import { render, screen, waitFor, act } from '@testing-library/react';
import { ComparisonPage } from './ComparisonPage';
import { QueryClientProvider } from 'react-query';
import { QueryClient } from 'react-query';
import '@testing-library/jest-dom';
import { configuration } from '../../api/controllers';
import userEvent from '@testing-library/user-event';

function expectCompanyPageSkeletonToBePresent() {
  expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  expect(screen.getByText('Сравнение компаний')).toBeInTheDocument();
  expect(screen.getByText('Отрасль')).toBeInTheDocument();
  expect(screen.getByText('Компании (выбор до 5 шт.)')).toBeInTheDocument();
  expect(screen.getByText('Модель')).toBeInTheDocument();
  expect(screen.getByText('Источники')).toBeInTheDocument();
  expect(screen.getByText('Первый год')).toBeInTheDocument();
  expect(screen.getByText('Последний год')).toBeInTheDocument();
}

function expectProgressBar() {
  expect(screen.queryByTestId('loading')).toBeInTheDocument();
  expect(screen.queryByTestId('Сравнение компаний')).not.toBeInTheDocument();
}

describe('Comparison page', () => {
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

  test('renders company page on errors', async () => {
    // nock.recorder.rec({});
    const baseUrl: string = configuration.baseHostName;
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
    apiMock
      .get('/api/model/').reply(500)
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
    apiMock
      .get('/api/source/type/').reply(500)
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });

    render(
      <QueryClientProvider client={queryClient}>
        <ComparisonPage />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(nock.isDone()).toBeTruthy();
      expectCompanyPageSkeletonToBePresent();
    });
  });

  test('renders comparison page on empty response', async () => {
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
    apiMock
      .get('/api/model/')
      .reply(200, { 'items': [] }, {
        'Content-Type': 'application/json',
      })
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
    apiMock
      .get('/api/source/type/')
      .reply(200, { 'items': [] }, {
        'Content-Type': 'application/json',
      })
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });

    render(
      <QueryClientProvider client={queryClient}>
        <ComparisonPage />
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
    apiMock
      .get('/api/model/')
      .reply(200, { 'items': [] }, {
        'Content-Type': 'application/json',
      })
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
    apiMock
      .get('/api/source/type/')
      .reply(200, { 'items': [] }, {
        'Content-Type': 'application/json',
      })
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });

    render(
      <QueryClientProvider client={queryClient}>
        <ComparisonPage />
      </QueryClientProvider>,
    );

    userEvent.click(screen.getByLabelText('Отрасль'));
    userEvent.click(screen.getByText('Банки'));
    userEvent.click(screen.getByTestId('banks'));
    userEvent.click(screen.getByRole('combobox', { name: 'Компании (выбор до 5 шт.)' }));

    const bankOption = await screen.findByText('THIS_IS_BANK', {}, { timeout: 3000 });
    expect(bankOption).toBeInTheDocument();

    userEvent.click(screen.getByLabelText('Отрасль'));
    userEvent.click(screen.getByText('Брокеры'));
    userEvent.click(screen.getByTestId('brokers'));
    userEvent.click(screen.getByRole('combobox', { name: 'Компании (выбор до 5 шт.)' }));

    const brokerOption = await screen.findByText('THIS_IS_BROKER', {}, { timeout: 3000 });
    expect(brokerOption).toBeInTheDocument();

    userEvent.click(screen.getAllByLabelText('Отрасль')[0]);
    userEvent.click(screen.getByText('Страховые компании'));
    userEvent.click(screen.getByTestId('insurance'));
    userEvent.click(screen.getByRole('combobox', { name: 'Компании (выбор до 5 шт.)' }));

    const insuranceOption = await screen.findByText('THIS_IS_INSURANCE', {}, { timeout: 3000 });
    expect(insuranceOption).toBeInTheDocument();

    userEvent.click(screen.getAllByLabelText('Отрасль')[0]);
    userEvent.click(screen.getByText('Микрофинансовые организации'));
    userEvent.click(screen.getByTestId('mfo'));
    userEvent.click(screen.getByRole('combobox', { name: 'Компании (выбор до 5 шт.)' }));

    const mfoOption = await screen.findByText('THIS_IS_MFO', {}, { timeout: 3000 });
    expect(mfoOption).toBeInTheDocument();

    await waitFor(() => {
      expect(nock.isDone()).toBeTruthy();
      expectCompanyPageSkeletonToBePresent();
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
    apiMock
      .get('/api/model/')
      .delayConnection(infiniteDelay)
      .reply(500)
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
    apiMock
      .get('/api/source/type/')
      .delayConnection(infiniteDelay)
      .reply(500)
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });

    render(
      <QueryClientProvider client={queryClient}>
        <ComparisonPage />
      </QueryClientProvider>,
    );

    await act(async () => {
      return new Promise((r) => setTimeout(r, 500));
    });
    await waitFor(() => {
      expectProgressBar();
    });
  });

  test('renders all models and source types', async () => {
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
    apiMock
      .get('/api/model/')
      .reply(200, { 'items': [{'name': 'THIS_IS_MODEL'}] }, {
        'Content-Type': 'application/json',
      })
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
    apiMock
      .get('/api/source/type/')
      .reply(200, { 'items': [{'name': 'THIS_IS_SOURCE_TYPE'}] }, {
        'Content-Type': 'application/json',
      })
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });

    render(
      <QueryClientProvider client={queryClient}>
        <ComparisonPage />
      </QueryClientProvider>,
    );

    userEvent.click(screen.getByLabelText('Отрасль'));
    userEvent.click(screen.getByText('Банки'));
    userEvent.click(screen.getByTestId('banks'));
    userEvent.click(screen.getByRole('combobox', { name: 'Компании (выбор до 5 шт.)' }));

    const bankOption = await screen.findByText('THIS_IS_BANK', {}, { timeout: 3000 });
    expect(bankOption).toBeInTheDocument();
    userEvent.click(bankOption);

    userEvent.click(screen.getByLabelText('Модель'));
    const modelOption = await screen.findByText('THIS_IS_MODEL', {}, { timeout: 3000 });
    expect(modelOption).toBeInTheDocument();
    userEvent.click(modelOption);

    userEvent.click(screen.getByLabelText('Источники'));
    const sourceOption = await screen.findByText('THIS_IS_SOURCE_TYPE', {}, { timeout: 3000 });
    expect(sourceOption).toBeInTheDocument();
    userEvent.click(sourceOption);

    await waitFor(() => {
      expect(nock.isDone()).toBeTruthy();
      expectCompanyPageSkeletonToBePresent();
    });
  });
});