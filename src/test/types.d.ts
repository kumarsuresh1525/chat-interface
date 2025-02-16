import '@testing-library/jest-dom';
import { Theme } from '../theme';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveStyleRule(property: string, value: string): R;
    }
  }
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
} 