import React, { FC } from 'react';
import { Logo } from '../../components/Logo';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <aside className="sticky top-0 h-screen bg-main py-5 px-2 w-64">
      <div className="gap-4 mb-10 w-64">
        <Logo version="minimized" size={60} />
      </div>
      <div className="items-start gap-4">
        <div className="text-white w-full">
          <ul className="w-full">
            <li><StyledLink to="../companies/" text="Компании" /></li>
          </ul>
          <ul>
            <li><StyledLink to="../one_company" text="Таблица" /></li>
          </ul>
          Индекс этичности по отзывам
          <ul className="w-full">
            <li><StyledLink to="../" text="Общая статистика" /></li>
            <li><StyledLink to="../comparison/" text="Сравнение компаний" /></li>
            <li><StyledLink to="../company/" text="Анализ компании" /></li>
          </ul>
        </div>
        <div className="text-white">
          Рейтинг ESG по отчетам
          <ul className="w-full">
            <li><StyledLink to='../' text='Общая статистика' /></li>
            <li><StyledLink to='../topsis_company/' text='Сравнение компаний' /></li>
            <li><StyledLink to='../topsis_comparison/' text='Анализ компании' /></li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

type StyledLinkProps = {
  to: string;
  text: string;
};

const StyledLink: FC<StyledLinkProps> = ({ to, text }) => {
  return (
    <NavLink to={to} className="text-white p-2 border border-white rounded hover:bg-gray-200 hover:text-black block w-full text-left">
      {text}
    </NavLink>
  );
};
