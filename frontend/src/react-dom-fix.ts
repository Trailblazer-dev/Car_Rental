// This file ensures proper React DOM resolution
// It's a workaround for "Could not resolve ./cjs/react-dom.production.min.js" error

import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';

// Re-export all React DOM APIs
export const createRoot = ReactDOMClient.createRoot;
export const hydrateRoot = ReactDOMClient.hydrateRoot;
export const render = ReactDOM.render;
export const hydrate = ReactDOM.hydrate;
export const findDOMNode = ReactDOM.findDOMNode;
export const createPortal = ReactDOM.createPortal;
export const unmountComponentAtNode = ReactDOM.unmountComponentAtNode;
export const flushSync = ReactDOM.flushSync;

// Re-export all of ReactDOM to ensure compatibility
const ReactDOMShim = { ...ReactDOM, ...ReactDOMClient };

// Export default ReactDOM for components that need it
export default ReactDOMShim;
