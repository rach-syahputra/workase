import Container from '@/components/layout/container';
import * as React from 'react';
import { SearchBar } from './components/searchbar';
import CardExample from '../example/_components/card-example';
export default function Home() {
  return (
    <Container className="">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="font-geist flex h-fit w-full flex-col items-center justify-center">
          <SearchBar />
        </div>
        <div className="mt-5">
          <CardExample></CardExample>
        </div>
      </div>
    </Container>
  );
}
