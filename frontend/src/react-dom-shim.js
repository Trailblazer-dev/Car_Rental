// ReactDOM shim for proper module resolution in production builds
import ReactDOM from 'react-dom';
export * from 'react-dom';

// Polyfill for React 18 APIs in case they're needed
export const createRoot = (container) => ({
  render(element) { ReactDOM.render(element, container); },
  unmount() { ReactDOM.unmountComponentAtNode(container); }
});

export const hydrateRoot = (container, element) => {
  ReactDOM.hydrate(element, container);
  return { unmount() { ReactDOM.unmountComponentAtNode(container); } };
};

export default ReactDOM;
