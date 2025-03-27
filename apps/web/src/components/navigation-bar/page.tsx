import Image from 'next/image';
import * as React from 'react';
import Logo from './components/logo';
import Menu from './components/menu';
import Sidebar from './components/sidebar';
import { Button } from '../shadcn-ui/button';
import Login from './components/login';

export default async function NavigationBar() {
  return (
    <div className="sticky left-0 right-0 top-0 bg-white">
      <div className="flex h-[52px] justify-between border-b border-gray-200 md:mx-2 md:h-[68px]">
        <div className="flex">
          {' '}
          <Logo />
          <Menu />
        </div>
        <div className="mx-1 flex h-[52px] items-center gap-1 md:h-[68px] md:w-[280px] md:items-stretch md:justify-center">
          {' '}
          <Login />
          <Button className="bg-primary-blue mx-0 md:hidden">Login</Button>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
