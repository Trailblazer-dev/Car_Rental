/**
 * JSX Dev Runtime shim
 * This ensures proper import resolution for 'react/jsx-dev-runtime'
 */
import { jsx, jsxs, Fragment } from '../react-runtime-fix';

// jsxDEV is just an alias for jsx in production
export const jsxDEV = jsx;
export { jsxs, Fragment };
export default { jsxDEV, jsxs, Fragment };
