import React, { FC, ReactNode } from 'react';
import { Header } from './Header';

type MainTemplateProps = {
  children: ReactNode;
};

export const MainTemplate: FC<MainTemplateProps> = ({ children }) => {
  return (
    <main className="w-full h-full flex">
      <Header />
      <div className="py-5 px-2">{children}</div>
    </main>
  );
};
