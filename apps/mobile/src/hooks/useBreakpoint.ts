import { useWindowDimensions } from 'react-native';

export type Breakpoint = 'phone' | 'phoneLarge' | 'tablet';

export function getBreakpoint(width: number): Breakpoint {
  if (width >= 768) {
    return 'tablet';
  }
  if (width >= 390) {
    return 'phoneLarge';
  }
  return 'phone';
}

export function useBreakpoint(): Breakpoint {
  const { width } = useWindowDimensions();
  return getBreakpoint(width);
}

export function useResponsiveColumns(): number {
  const breakpoint = useBreakpoint();
  return breakpoint === 'tablet' ? 2 : 1;
}
