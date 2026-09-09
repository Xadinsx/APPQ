import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Box, useThemeMode } from '../../../theme';
import {
  AppModal,
  AppText,
  Avatar,
  Badge,
  Button,
  Card,
  EmptyState,
  ErrorState,
  Input,
  Loading,
} from '../../../components';
import { useBreakpoint } from '../../../hooks/useBreakpoint';

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <Card>
      <Box style={styles.stack}>
        <AppText variant="title">{title}</AppText>
        {children}
      </Box>
    </Card>
  );
}

export function GalleryScreen(): React.JSX.Element {
  const { mode, toggleMode } = useThemeMode();
  const breakpoint = useBreakpoint();
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <ScrollView>
      <Box backgroundColor="background" padding="l" style={styles.stack}>
        <Box style={styles.stack}>
          <AppText variant="header">Component Gallery</AppText>
          <AppText variant="bodyMuted">
            Theme: {mode} · Breakpoint: {breakpoint}
          </AppText>
          <Button
            label={mode === 'dark' ? 'Switch to light' : 'Switch to dark'}
            variant="secondary"
            onPress={toggleMode}
          />
        </Box>

        <Section title="Typography">
          <AppText variant="header">Header</AppText>
          <AppText variant="title">Title</AppText>
          <AppText variant="body">Body text</AppText>
          <AppText variant="bodyMuted">Muted body</AppText>
          <AppText variant="points">12,450 pts</AppText>
        </Section>

        <Section title="Buttons">
          <Button label="Primary" />
          <Button label="Secondary" variant="secondary" />
          <Button label="Ghost" variant="ghost" />
          <Button label="Danger" variant="danger" />
          <Button label="Loading" loading />
        </Section>

        <Section title="Input / Badge / Avatar">
          <Input
            label="Email"
            placeholder="you@appquest.dev"
            value={inputValue}
            onChangeText={setInputValue}
          />
          <Input label="Broken field" error="Required" />
          <Box flexDirection="row" alignItems="center" style={styles.row}>
            <Badge label="New" />
            <Badge label="Neutral" tone="neutral" />
            <Badge label="Hot" tone="danger" />
            <Avatar label="Filipe Leite" />
          </Box>
        </Section>

        <Section title="Modal">
          <Button label="Open modal" onPress={() => setModalVisible(true)} />
        </Section>

        <Card>
          <Loading label="Fetching offers…" />
        </Card>

        <Card>
          <EmptyState
            title="No offers yet"
            description="Check back soon for new quests."
            actionLabel="Refresh"
            onAction={() => undefined}
          />
        </Card>

        <Card>
          <ErrorState
            message="Could not load offers."
            onRetry={() => undefined}
          />
        </Card>
      </Box>

      <AppModal
        visible={modalVisible}
        title="Quest ready"
        message="Start this offer to earn points."
        onClose={() => setModalVisible(false)}
        onConfirm={() => setModalVisible(false)}
        confirmLabel="Start"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 16,
  },
  row: {
    gap: 8,
  },
});
