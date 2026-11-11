import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';
import {BookTracker} from './BookTracker';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
    <StrictMode>
        <BookTracker />
    </StrictMode>
);
