import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Music from './pages/Music';
import Film from './pages/Film';
import Documentaries from './pages/Documentaries';
import Shop from './pages/Shop';
import About from './pages/About';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/music', element: <Music /> },
      { path: '/film', element: <Film /> },
      { path: '/documentaries', element: <Documentaries /> },
      { path: '/shop', element: <Shop /> },
      { path: '/about', element: <About /> },
    ],
  },
]);