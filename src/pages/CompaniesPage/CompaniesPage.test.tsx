import React from 'react';
import { render, screen } from '@testing-library/react';
import { CompaniesPage } from './CompaniesPage';
import { QueryClientProvider } from 'react-query';
import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 10 * 60 * 1000,
    },
  },
});

describe('Companies page', () => {
  test('renders correctly', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CompaniesPage />
      </QueryClientProvider>
      );

    const elem = screen.getByText('Список компаний');
    expect(elem).toBeInTheDocument();
  });
});