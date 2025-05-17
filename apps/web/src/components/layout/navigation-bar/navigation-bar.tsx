import * as React from 'react';
import Logo from './components/logo';
import Menu from './components/menu';
import Sidebar from './components/sidebar';

import Login from './components/login';

export default async function NavigationBar(session: any) {
  return (
    <div className="sticky top-0 left-0 right-0 z-40 bg-white border-b">
      <div className="flex h-[60px] justify-between border-gray-200 md:mx-2 md:h-[68px]">
        <div className="flex">
          {' '}
          <Logo />
          <Menu />
        </div>

        <div className="mx-1 flex h-[52px] items-center gap-1 md:mx-0 md:h-[68px] md:w-[280px] md:items-stretch md:justify-center">
          {' '}
          <Login />
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
