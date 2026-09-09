import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { ThemeProvider } from '@shopify/restyle';
import { Button } from '../src/components/Button/Button';
import { themes } from '../src/theme/theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={themes.dark}>{ui}</ThemeProvider>);
}

describe('Button', () => {
  it('renders the label and calls onPress when pressed', async () => {
    const onPress = jest.fn();
    await renderWithTheme(<Button label="Start Quest" onPress={onPress} />);

    expect(screen.getByText('Start Quest')).toBeTruthy();
    fireEvent.press(screen.getByText('Start Quest'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders secondary variant label', async () => {
    await renderWithTheme(<Button label="Secondary" variant="secondary" />);
    expect(screen.getByText('Secondary')).toBeTruthy();
  });

  it('does not call onPress when disabled', async () => {
    const onPress = jest.fn();
    await renderWithTheme(
      <Button label="Disabled" disabled onPress={onPress} />,
    );

    fireEvent.press(screen.getByText('Disabled'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('hides the label while loading', async () => {
    await renderWithTheme(<Button label="Busy" loading />);
    expect(screen.queryByText('Busy')).toBeNull();
  });
});
