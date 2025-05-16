/**
 * React DOM shim for Azure Static Web Apps
 * Provides direct exports of React DOM functionality
 */
import * as ReactDOM from 'react-dom';

// Re-export all ReactDOM methods
export const {
  render,
  hydrate,
  unmountComponentAtNode,
  findDOMNode,
  createPortal,
  flushSync
} = ReactDOM;

// Polyfill for React 18 functionality if using older React
export const createRoot = (container) => {
  return {
    render(element) {
      ReactDOM.render(element, container);
    },
    unmount() {
      ReactDOM.unmountComponentAtNode(container);
    }
  };
};

export const hydrateRoot = (container, element) => {
  ReactDOM.hydrate(element, container);
  return {
    unmount() {
      ReactDOM.unmountComponentAtNode(container);
    }
  };
};

// Default export
export default ReactDOM;
