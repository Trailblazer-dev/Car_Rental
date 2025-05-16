/**
 * ReactDOM shim for Azure Static Web Apps
 */
import * as ReactDOM from 'react-dom';

// Export standard ReactDOM APIs
export const {
  render, hydrate, unmountComponentAtNode, findDOMNode, createPortal
} = ReactDOM;

// Create React 18 compatible APIs for older React versions
export const createRoot = (container: Element | DocumentFragment) => {
  return {
    render(element: React.ReactNode) {
      ReactDOM.render(element, container);
    },
    unmount() {
      ReactDOM.unmountComponentAtNode(container);
    }
  };
};

export const hydrateRoot = (container: Element | DocumentFragment, element: React.ReactNode) => {
  ReactDOM.hydrate(element, container);
  return {
    unmount() {
      ReactDOM.unmountComponentAtNode(container);
    }
  };
};

// Default export
export default ReactDOM;
