// This file ensures proper React DOM resolution
// It's a workaround for "Could not resolve ./cjs/react-dom.production.min.js" error

import * as ReactDOM from 'react-dom';

// Define client APIs manually
const createRoot = (container: Element | DocumentFragment) => {
  return {
    render(element: React.ReactNode) {
      ReactDOM.render(element, container);
    },
    unmount() {
      ReactDOM.unmountComponentAtNode(container);
    }
  };
};

const hydrateRoot = (container: Element | DocumentFragment, element: React.ReactNode) => {
  ReactDOM.hydrate(element, container);
  return {
    unmount() {
      ReactDOM.unmountComponentAtNode(container);
    }
  };
};

// Re-export all React DOM APIs
export { createRoot, hydrateRoot };

// Re-export legacy APIs
export const render = ReactDOM.render;
export const hydrate = ReactDOM.hydrate;
export const findDOMNode = ReactDOM.findDOMNode;
export const createPortal = ReactDOM.createPortal;
export const unmountComponentAtNode = ReactDOM.unmountComponentAtNode;
export const flushSync = ReactDOM.flushSync;

// Export default ReactDOM for components that need it
export default ReactDOM;
