// This file ensures proper React DOM resolution in production builds
import * as ReactDOM from 'react-dom';

// Create polyfill for React 18 APIs if using older React
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

// Export standard ReactDOM APIs
export default ReactDOM;
export const {
  render, hydrate, findDOMNode, createPortal, unmountComponentAtNode
} = ReactDOM;

// Export React 18 API polyfills
export { createRoot, hydrateRoot };
