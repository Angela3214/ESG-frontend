import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CompanyPage } from '../../pages/CompanyPage';
import { ComparisonPage } from '../../pages/ComparisonPage';
import { StatisticsPage } from '../../pages/StatisticsPage';
import { MainTemplate } from '../page-templates';
// import { TopsisComparsionPage } from '../../pages/TopsisComparisonPage';
import { TopsisCompanyPage } from '../../pages/TopsisCompanyPage';
import { TopsisComparisonPage } from '../../pages/TopsisComparisonPage';

const routes = [
  { path: '/', name: 'Общая статистика', index: true, element: <StatisticsPage /> },
  { path: '/comparison', name: 'Сравнение компаний', element: <ComparisonPage /> },
  { path: '/company', name: 'Анализ компании', element: <CompanyPage /> },
  { path: '/topsis_company', name: 'Сравнение компаний по методу ТОПСИС', element: <TopsisCompanyPage /> },
  { path: '/topsis_comparison', name: 'Анализ компании по методу ТОПСИС', element: <TopsisComparisonPage /> },
];

export const Router = () => {
  return (
    <Routes>
      {routes.map(({ element, ...rest }) => {
        return <Route key={rest.path} element={<MainTemplate>{element}</MainTemplate>} {...rest} />;
      })}
    </Routes>
  );
};
