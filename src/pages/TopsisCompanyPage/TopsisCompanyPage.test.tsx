/* eslint-disable max-lines */
import React from 'react';
import nock from 'nock';
import { render, screen, waitFor, act } from '@testing-library/react';
import { TopsisCompanyPage } from './TopsisCompanyPage';
import { QueryClientProvider } from 'react-query';
import { QueryClient } from 'react-query';
import '@testing-library/jest-dom';
import { configuration } from '../../api/controllers';
import userEvent from '@testing-library/user-event';
import { OneCompanyPage } from '../OneCompanyPage';

function expectCompanyPageSkeletonToBePresent() {
  expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  expect(screen.getByText('Анализ одной компании')).toBeInTheDocument();
  expect(screen.getByLabelText('Тип отчетов')).toBeInTheDocument();
  expect(screen.getByText('Компания (выбор до 5 шт.)')).toBeInTheDocument();
  expect(screen.getByText('Тип индекса')).toBeInTheDocument();
  expect(screen.getByText('Первый год')).toBeInTheDocument();
  expect(screen.getByText('Последний год')).toBeInTheDocument();
}

describe('Topsis company page', () => {
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

  test('renders topsis company page on errors', async () => {
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
      .get('/api/topsis/topsis')
      .query(true)
      .reply(500)
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });

    render(
      <QueryClientProvider client={queryClient}>
        <TopsisCompanyPage />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(nock.isDone()).toBeTruthy();
      expectCompanyPageSkeletonToBePresent();
    });
  });

  test('renders topsis company page on empty response', async () => {
    const baseUrl: string = configuration.baseHostName;
    const apiMock = nock(baseUrl);
    apiMock
      .get('/api/topsis/companies')
      .query(true)
      .reply(200, { 'items': [] }, {
        'Content-Type': 'application/json',
      })
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });
    apiMock
      .get('/api/topsis/companies')
      .query(true)
      .reply(200, { 'items': [] }, {
        'Content-Type': 'application/json',
      })
      .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' });

    render(
      <QueryClientProvider client={queryClient}>
        <TopsisCompanyPage />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(nock.isDone()).toBeTruthy();
      expectCompanyPageSkeletonToBePresent();
    });
  });
});