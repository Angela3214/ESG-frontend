import React, { FC } from 'react';
import { Logo } from '../../components/Logo';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="z-10 sticky top-0 flex justify-between gap-12 bg-main py-5 px-24 select-none w-full">
      <div className="flex justify-center items-center gap-4">
        <Logo version="minimized" size={44} />
        <div className="text-white text-xl">
          Индекс этичности на основе искусственного интеллекта
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div style={{ maxWidth: 300, display: 'inline-block' }} className="text-white">
          Индекс этичности по отзывам
          <ul>
            <li><StyledLink to="../" text="Общая статистика" /></li>
            <li><StyledLink to="../comparison/" text="Сравнение компаний" /></li>
            <li><StyledLink to="../company/" text="Анализ компании" /></li>
          </ul>
        </div>
        <div style={{ maxWidth: 300, display: 'inline-block' }} className="text-white">
          Рейтинг ESG по отчетам
          <ul>
            <li><StyledLink to='../' text='Общая статистика' /></li>
            <li><StyledLink to='../topsis_company/' text='Сравнение компаний' /></li>
            <li><StyledLink to='../topsis_comparison/' text='Анализ компании' /></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

type StyledLinkProps = {
  to: string;
  text: string;
};

const StyledLink: FC<StyledLinkProps> = ({ to, text }) => {
  return (
    <NavLink to={to} className="text-white">
      {text}
    </NavLink>
  );
};
