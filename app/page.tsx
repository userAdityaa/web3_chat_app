import {ChatAppProvider} from '../context/ChatAppContext';
import {Navbar} from './components/index'

export default function Home() {
  return (
    <ChatAppProvider>
      <Navbar/>
    </ChatAppProvider>
  );
}
