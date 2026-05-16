import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import './index.css';

function Root() {
  useSmoothScroll();
  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
