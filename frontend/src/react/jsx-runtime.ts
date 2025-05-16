/**
 * JSX Runtime shim
 * This ensures proper import resolution for 'react/jsx-runtime'
 */
import { jsx, jsxs, Fragment } from '../react-runtime-fix';

export { jsx, jsxs, Fragment };
export default { jsx, jsxs, Fragment };
