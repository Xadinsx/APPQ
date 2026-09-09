import { themes, palette } from '../src/theme';
import { getBreakpoint } from '../src/hooks/useBreakpoint';

describe('theme tokens', () => {
  it('exposes dark-first arcade palette and matching light/dark themes', () => {
    expect(palette.charcoal).toBe('#0B0D10');
    expect(palette.lime).toBe('#B8FF3C');
    expect(themes.dark.colors.background).toBe(palette.charcoal);
    expect(themes.dark.colors.accent).toBe(palette.lime);
    expect(themes.light.colors.background).toBe(palette.lightBg);
    expect(themes.light.colors.accent).toBe(palette.limeMuted);
    expect(themes.dark.textVariants.points.fontFamily).toBe(
      'IBMPlexMono_600SemiBold',
    );
    expect(themes.dark.spacing.m).toBe(16);
    expect(themes.dark.borderRadii.l).toBe(16);
  });
});

describe('getBreakpoint', () => {
  it('maps widths to phone, phoneLarge, and tablet', () => {
    expect(getBreakpoint(320)).toBe('phone');
    expect(getBreakpoint(414)).toBe('phoneLarge');
    expect(getBreakpoint(834)).toBe('tablet');
  });
});
