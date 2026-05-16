import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Scrollbar from './components/Scrollbar';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import './index.css';

function Root() {
  useSmoothScroll();
  return (
    <>
      <App />
      <Scrollbar />
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
