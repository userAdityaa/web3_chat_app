'use client'
import { AppProps } from 'next/app';
import {ChatAppProvider} from '../context/ChatAppContext';
import {Navbar} from './components/index';

export default function Home({Component, pageProps}: AppProps) {
  return (
    <ChatAppProvider>
      <Navbar/>
    </ChatAppProvider>
  );
}
