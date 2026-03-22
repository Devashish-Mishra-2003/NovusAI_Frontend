import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Box, Container, Text, Title, Group, Stack, ActionIcon,
  Textarea, Button, ScrollArea, Paper, Loader, rem, 
  useMantineTheme, useMantineColorScheme, Skeleton, Drawer
} from "@mantine/core";
import {
  IconSend, IconFileDownload, 
  IconRobot, IconUser,
  IconHistory, IconChartPie,
  IconX
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@mantine/hooks";

import { api } from "../api/client";
import HistoryPanel from "../components/HistoryPanel";
import VisualizationPanel from "../components/VisualizationPanel";

const HEADER_HEIGHT = rem(60);

const ChatPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [messages, setMessages] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  // Default to closed
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [activeViz, setActiveViz] = useState<any>(null);
  
  // Transition state to handle clear-screen
  const [isResetting, setIsResetting] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const conversationId = searchParams.get("c");

  const HISTORY_API = "/api/api/history/conversations";
  const SYNTHESIS_API = "/api/synthesize";
  const PDF_API = "/api/pdf";

  const fetchHistoryList = async () => {
    try {
      const res = await api.get(HISTORY_API);
      setHistory(res.data);
    } catch (err) { console.error("History fetch failed", err); }
  };

  const loadConversation = async (id: string) => {
    setLoading(true);
    try {
      const res = await api.get(`${HISTORY_API}/${id}`);
      const loaded = res.data.messages.map((m: any, i: number) => ({
        ...m, id: i,
        visualizations: typeof m.visualizations === 'string' ? JSON.parse(m.visualizations) : m.visualizations
      }));
      setMessages(loaded);
      const lastViz = [...loaded].reverse().find(m => m.visualizations);
      setActiveViz(lastViz?.visualizations || null);
    } catch (err) {
      notifications.show({ title: "Error", message: "Conversation not found", color: "red" });
    } finally { setLoading(false); }
  };

  useEffect(() => {
    fetchHistoryList();
    if (conversationId) {
        loadConversation(conversationId);
    } else {
        setMessages([{ id: "welcome", role: "assistant", content: "NovusAI Analysis Mode Ready. Please specify a drug candidate and target indication to begin evidence synthesis." }]);
        setActiveViz(null);
    }
  }, [conversationId]);

  // Clean Reset Logic: Reset URL first, then trigger clear
  const handleNewSynthesis = () => {
    if (isResetting) return;
    setIsResetting(true);
    
    // Smooth exit animation duration (matching exit transition)
    setTimeout(() => {
      setSearchParams({}, { replace: true });
      setMessages([{ id: "welcome", role: "assistant", content: "NovusAI Analysis Mode Ready. Please specify a drug candidate and target indication to begin evidence synthesis." }]);
      setActiveViz(null);
      setIsResetting(false);
    }, 300);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(p => [...p, { id: Date.now(), role: "user", content: userMsg }]);
    setLoading(true);

    const tempId = "loading-id";
    setMessages(p => [...p, { id: tempId, role: "assistant", content: "__LOADING__" }]);

    try {
      const res = await api.post(SYNTHESIS_API, { message: userMsg, conversation_id: conversationId || null });
      const { answer, visualizations, conversation_id } = res.data;

      if (!conversationId) {
        setSearchParams({ c: conversation_id });
        fetchHistoryList();
      }

      setMessages(p => p.map(m => m.id === tempId ? { id: Date.now() + 1, role: "assistant", content: answer, visualizations } : m));
      if (visualizations) setActiveViz(visualizations);
    } catch (err) {
      setMessages(p => p.map(m => m.id === tempId ? { ...m, content: "Synthesis error. Please verify engine connectivity." } : m));
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const res = await api.post(PDF_API, { conversation_id: conversationId }, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `NovusAI_Analysis_${conversationId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) { notifications.show({ title: "Export Error", message: "Could not generate PDF", color: "red" }); }
  };

  useEffect(() => { 
    if (!loading) {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); 
    }
  }, [messages, loading]);

  return (
    <Box style={{ 
      height: "100vh", 
      display: "flex", 
      overflow: "hidden", 
      backgroundColor: isDark ? theme.colors.dark[9] : theme.colors.gray[0] 
    }}>
      
      {isMobile ? (
        <Drawer 
          opened={leftOpen} 
          onClose={() => setLeftOpen(false)} 
          size="100%" 
          padding={0} 
          withCloseButton={false}
        >
          <Box h="100vh">
            <HistoryPanel 
              isOpen={true} 
              history={history} 
              activeId={conversationId} 
              onSelect={(id) => { setSearchParams({ c: id }); setLeftOpen(false); }}
              onNewChat={() => { handleNewSynthesis(); setLeftOpen(false); }}
              headerHeight={HEADER_HEIGHT}
              onCloseMobile={() => setLeftOpen(false)}
            />
          </Box>
        </Drawer>
      ) : (
        <HistoryPanel 
          isOpen={leftOpen} 
          history={history} 
          activeId={conversationId} 
          onSelect={(id) => setSearchParams({ c: id })}
          onNewChat={handleNewSynthesis}
          headerHeight={HEADER_HEIGHT}
        />
      )}

      <Stack style={{ 
        flex: 1, 
        backgroundColor: isDark ? theme.colors.dark[8] : "#FFFFFF",
        position: 'relative'
      }} gap={0}>
        
        {/* Main Header */}
        <Box px="md" style={{ 
          height: HEADER_HEIGHT, 
          display: 'flex', 
          alignItems: 'center',
          borderBottom: `1px solid ${isDark ? theme.colors.dark[4] : theme.colors.gray[3]}`, 
          backgroundColor: isDark ? "rgba(26, 27, 30, 0.8)" : "rgba(255, 255, 255, 0.8)",
          backdropFilter: 'blur(10px)',
          zIndex: 10
        }}>
          <Group justify="space-between" style={{ width: '100%' }}>
            <Group gap="sm">
              <ActionIcon variant="subtle" color="blue" radius="xl" onClick={() => setLeftOpen(!leftOpen)}>
                <IconHistory size={20} />
              </ActionIcon>
              <Title 
                order={5} 
                fw={900} 
                style={{ letterSpacing: -0.8, cursor: 'pointer' }}
                onClick={() => navigate("/")}
              >
                Novus<span style={{ color: theme.colors.blue[6] }}>AI</span>
              </Title>
            </Group>
            <Group gap="sm">
              <Button 
                variant="light" 
                size="xs" 
                radius="xl"
                leftSection={<IconFileDownload size={16} />} 
                onClick={handleDownloadPDF} 
                disabled={!conversationId}
              >
                Export PDF
              </Button>
              <ActionIcon variant="subtle" color="blue" radius="md" onClick={() => setRightOpen(!rightOpen)}>
                <IconChartPie size={20} />
              </ActionIcon>
            </Group>
          </Group>
        </Box>

        {/* Chat ScrollArea */}
        <ScrollArea style={{ flex: 1 }} p={{ base: "xs", sm: "xl" }} scrollbarSize={6}>
          <Container size="md">
            <AnimatePresence mode="wait">
              {!isResetting && (
                <motion.div
                  key={conversationId || "new-chat"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <Stack gap={20}>
                    {messages.map((m) => (
                      <motion.div
                        key={m.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ 
                          display: "flex", 
                          flexDirection: "column", 
                          alignItems: m.role === "user" ? "flex-end" : "flex-start" 
                        }}
                      >
                        <Group gap="xs" mb={4} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start" }}>
                          {m.role === "assistant" && <IconRobot size={14} color={theme.colors.blue[6]} />}
                          <Text size="10px" fw={800} c="dimmed" style={{ letterSpacing: 0.5 }}>
                            {m.role === "user" ? "RESEARCHER" : "NOVUS SYNTHESIS"}
                          </Text>
                          {m.role === "user" && <IconUser size={14} color={theme.colors.blue[6]} />}
                        </Group>

                        <Paper 
                          px="lg"
                          py="sm"
                          radius="xl" 
                          bg={m.role === "user" ? "blue.6" : (isDark ? theme.colors.dark[6] : theme.colors.gray[1])} 
                          shadow={m.role === "user" ? "md" : "none"}
                          style={{ 
                            maxWidth: "90%", 
                            color: m.role === "user" ? "white" : (isDark ? theme.white : theme.black),
                            border: m.role === "assistant" ? `1px solid ${isDark ? theme.colors.dark[4] : theme.colors.gray[3]}` : "none",
                            // SYMMETRIC BUBBLE LOGIC
                            borderTopRightRadius: m.role === "user" ? rem(4) : rem(24),
                            borderTopLeftRadius: m.role === "assistant" ? rem(4) : rem(24),
                            borderBottomRightRadius: rem(24),
                            borderBottomLeftRadius: rem(24),
                          }}
                        >
                          {m.content === "__LOADING__" ? (
                            <Stack gap="xs" py="xs" w="100%" maw={300}>
                              <Group gap="xs">
                                <Loader size="xs" color="blue" type="bars" />
                                <Text size="xs" fw={700} c="blue.6">SYNTHESIZING...</Text>
                              </Group>
                              <Skeleton height={8} radius="xl" />
                              <Skeleton height={8} radius="xl" width="80%" />
                            </Stack>
                          ) : (
                            <Box className="markdown-content" style={{ fontSize: '14px', lineHeight: '1.5' }}>
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                            </Box>
                          )}
                        </Paper>
                      </motion.div>
                    ))}
                    <div ref={chatEndRef} />
                  </Stack>
                </motion.div>
              )}
            </AnimatePresence>
          </Container>
        </ScrollArea>

        {/* Input Area */}
        <Box p={{ base: "xs", sm: "xl" }} style={{ 
          backgroundColor: isDark ? theme.colors.dark[8] : "#FFFFFF",
          borderTop: `1px solid ${isDark ? theme.colors.dark[4] : theme.colors.gray[2]}`
        }}>
          <Container size="md">
            <Paper 
              withBorder 
              radius="xl" 
              p={6} 
              shadow="xl" 
              style={{ 
                backgroundColor: isDark ? theme.colors.dark[6] : "white",
                borderColor: isDark ? theme.colors.dark[4] : theme.colors.gray[3]
              }}
            >
              <Group gap={0}>
                <Textarea 
                  variant="unstyled" 
                  placeholder="Enter drug name and condition..." 
                  autosize 
                  minRows={1} 
                  maxRows={5} 
                  style={{ flex: 1, paddingLeft: rem(20) }} 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend(e as any)} 
                />
                <ActionIcon 
                  size={42} 
                  radius="xl" 
                  color="blue" 
                  variant="filled" 
                  onClick={handleSend as any} 
                  disabled={loading || !input.trim()} 
                  mr={4}
                >
                  <IconSend size={20} />
                </ActionIcon>
              </Group>
            </Paper>
          </Container>
        </Box>
      </Stack>

      {/* 3. RIGHT PANEL */}
      {isMobile ? (
        <Drawer 
          opened={rightOpen} 
          onClose={() => setRightOpen(false)} 
          position="right" 
          size="100%" 
          padding={0} 
          withCloseButton={false}
        >
          <Box h="100vh" display="flex" style={{ flexDirection: 'column' }}>
            <Box px="md" style={{ 
              height: HEADER_HEIGHT, 
              minHeight: HEADER_HEIGHT,
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              borderBottom: `1px solid ${isDark ? theme.colors.dark[4] : theme.colors.gray[3]}`,
              backgroundColor: isDark ? "rgba(26, 27, 30, 0.5)" : "rgba(255, 255, 255, 0.5)"
            }}>
              <Text size="xs" fw={900} style={{ letterSpacing: 1.5 }}>LIVE INSIGHTS</Text>
              <ActionIcon variant="subtle" color="gray" radius="xl" onClick={() => setRightOpen(false)}>
                <IconX size={20} />
              </ActionIcon>
            </Box>
            <ScrollArea 
              style={{ flex: 1 }} 
              p="md" 
              scrollbarSize={6} 
            >
              <VisualizationPanel visualization={activeViz} />
            </ScrollArea>
          </Box>
        </Drawer>
      ) : (
        <Paper 
          withBorder 
          radius={0}
          style={{ 
            width: rightOpen ? 360 : 0, 
            transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1)", 
            backgroundColor: isDark ? theme.colors.dark[8] : theme.colors.gray[0],
            borderLeft: `1px solid ${isDark ? theme.colors.dark[4] : theme.colors.gray[3]}`,
            zIndex: 20,
            display: "flex", 
            flexDirection: "column" 
          }}
        >
          <Box px="md" style={{ 
            height: HEADER_HEIGHT, 
            minHeight: HEADER_HEIGHT,
            display: 'flex', 
            alignItems: 'center', 
            borderBottom: `1px solid ${isDark ? theme.colors.dark[4] : theme.colors.gray[3]}`,
            backgroundColor: isDark ? "rgba(26, 27, 30, 0.5)" : "rgba(255, 255, 255, 0.5)"
          }}>
            <Text size="xs" fw={900} style={{ letterSpacing: 1.5 }}>LIVE INSIGHTS</Text>
          </Box>
          <ScrollArea 
            style={{ flex: 1 }} 
            p="md" 
            scrollbarSize={6} 
            offsetScrollbars
          >
            <VisualizationPanel visualization={activeViz} />
          </ScrollArea>
        </Paper>
      )}

      <style>{`
        .markdown-content p { margin: 0 0 8px 0; }
        .markdown-content p:last-child { margin-bottom: 0; }
        .markdown-content strong { color: ${theme.colors.blue[6]}; }
        .markdown-content h2, .markdown-content h3 { margin: 12px 0 8px 0; font-size: 16px; font-weight: 800; }
      `}</style>
    </Box>
  );
};

export default ChatPage;