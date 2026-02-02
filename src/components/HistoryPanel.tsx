import React from "react";
import { 
  Paper, Box, Button, ScrollArea, Stack, Text, 
  NavLink, rem, useMantineTheme, useMantineColorScheme, 
  Transition, Group
} from "@mantine/core";
import { IconPlus, IconMessageDots, IconHistory } from "@tabler/icons-react";

type HistoryItem = {
  conversation_id: string;
  last_question: string;
  last_updated: any;
};

type Props = {
  history: HistoryItem[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  isOpen: boolean;
  headerHeight: string | number;
};

const HistoryPanel: React.FC<Props> = ({ 
  history, 
  activeId, 
  onSelect, 
  onNewChat, 
  isOpen, 
  headerHeight 
}) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Paper
      withBorder
      radius={0}
      style={{
        width: isOpen ? 300 : 0,
        transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
        display: "flex", // Fixed overflow
        flexDirection: "column", // Fixed overflow
        height: "100vh", // Force container height
        backgroundColor: isDark ? "rgba(20, 21, 23, 0.95)" : "rgba(248, 249, 250, 0.95)", 
        backdropFilter: "blur(16px)",
        borderRight: `1px solid ${isDark ? theme.colors.dark[4] : theme.colors.gray[2]}`,
        borderTop: 0, 
        borderBottom: 0, 
        borderLeft: 0,
        zIndex: 20,
      }}
    >
      {/* Header Segment: Action Center */}
      <Box 
        px="md" 
        style={{ 
          height: headerHeight, 
          minHeight: headerHeight,
          display: 'flex', 
          alignItems: 'center', 
          borderBottom: `1px solid ${isDark ? theme.colors.dark[5] : theme.colors.gray[3]}`,
          backgroundColor: isDark ? "rgba(26, 27, 30, 0.5)" : "rgba(255, 255, 255, 0.5)"
        }}
      >
        <Button 
          leftSection={<IconPlus size={16} stroke={2.5} />} 
          fullWidth 
          variant="filled" 
          color="blue"
          size="sm"
          radius="xl"
          onClick={onNewChat}
          style={{
            fontWeight: 800,
            letterSpacing: -0.5,
            transition: "all 0.2s ease",
            boxShadow: isDark ? "0 4px 12px rgba(34, 139, 230, 0.25)" : "0 4px 12px rgba(34, 139, 230, 0.15)",
          }}
          className="new-synthesis-btn"
        >
          New Synthesis
        </Button>
      </Box>

      {/* Content Area: The Replay Vault */}
      <ScrollArea 
        style={{ flex: 1 }} // Fixed: Grow to fill available space
        p="xs" 
        scrollbarSize={4} 
        offsetScrollbars
      >
        <Stack gap={6} mt="xs">
          <Group px="xs" justify="space-between" mb={4}>
            <Text 
              size="10px" 
              fw={900} 
              c="dimmed" 
              style={{ letterSpacing: rem(1.5), textTransform: 'uppercase' }}
            >
              Analysis History
            </Text>
            <IconHistory size={12} style={{ opacity: 0.5 }} />
          </Group>

          {history.length === 0 ? (
            <Stack align="center" py={40} gap="xs" style={{ opacity: 0.5 }}>
              <IconMessageDots size={24} stroke={1.5} />
              <Text size="xs" fw={500}>No past sessions</Text>
            </Stack>
          ) : (
            history.map((item) => {
              const isActive = activeId === item.conversation_id;
              
              return (
                <Transition 
                  key={item.conversation_id} 
                  mounted={isOpen} 
                  transition="fade" 
                  duration={200}
                >
                  {(styles) => (
                    <NavLink
                      label={item.last_question}
                      active={isActive}
                      onClick={() => onSelect(item.conversation_id)}
                      leftSection={
                        <IconMessageDots 
                          size={16} 
                          stroke={isActive ? 2.5 : 1.5} 
                          color={isActive ? "white" : theme.colors.blue[6]} 
                        />
                      }
                      variant="filled"
                      color="blue"
                      style={{ 
                        ...styles,
                        marginBottom: rem(2),
                        borderRadius: rem(12),
                        padding: `${rem(10)} ${rem(12)}`,
                        transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        transform: isActive ? "translateX(4px)" : "translateX(0)",
                        backgroundColor: isActive 
                          ? theme.colors.blue[6] 
                          : 'transparent',
                      }}
                      styles={{
                        label: { 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis', 
                          whiteSpace: 'nowrap', 
                          fontWeight: isActive ? 800 : 600,
                          fontSize: rem(13),
                          color: isActive ? 'white' : (isDark ? theme.colors.dark[0] : theme.colors.gray[8]),
                        },
                        section: {
                          marginRight: rem(12)
                        }
                      }}
                      className="history-nav-link"
                    />
                  )}
                </Transition>
              );
            })
          )}
        </Stack>
      </ScrollArea>

      <style>{`
        .new-synthesis-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px -5px rgba(34, 139, 230, 0.4);
        }
        .history-nav-link:hover:not(.mantine-NavLink-active) {
          background-color: ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'} !important;
          transform: translateX(4px);
        }
      `}</style>
    </Paper>
  );
};

export default HistoryPanel;