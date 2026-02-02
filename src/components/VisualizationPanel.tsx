import React, { useState } from "react";
import {
  Paper, Text, Stack, Group, Box, Divider, 
  Progress, Badge, Modal, ActionIcon, rem, useMantineTheme, useMantineColorScheme
} from "@mantine/core";
import {
  IconTrendingUp, IconActivity, IconMaximize, IconActivityHeartbeat
} from "@tabler/icons-react";
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from "recharts";
import { motion, type Variants } from "framer-motion";

type Props = { visualization: any };

const VisualizationPanel: React.FC<Props> = ({ visualization }) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const [zoomedChart, setZoomedChart] = useState<{ type: string; data: any; title: string } | null>(null);

  if (!visualization) return null;

  const { market, clinical } = visualization;
  
  const VIZ_COLORS = [
    theme.colors.blue[6], 
    theme.colors.cyan[5], 
    theme.colors.indigo[4], 
    theme.colors.violet[3],
    theme.colors.gray[4]
  ];

  const clinicalPieData = clinical?.by_phase ? Object.entries(clinical.by_phase)
    .filter(([_, value]) => (value as number) > 0)
    .map(([name, value]) => ({ name: name.replace('PHASE', 'Phase '), value })) 
    : [];

  const patientPieData = market?.patient_split ? [
    { name: 'Treated', value: market.patient_split.treated_population_m },
    { name: 'Untreated', value: market.patient_split.untreated_population_m },
  ] : [];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <Stack gap="lg">
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        
        {/* Indication Badge only - Removed Header Titles */}
        {visualization.condition && (
          <motion.div variants={itemVariants}>
            <Badge variant="dot" color="blue" size="xs" mb="md" radius="sm">
              Indication: {Array.isArray(visualization.condition) ? visualization.condition[0] : String(visualization.condition)}
            </Badge>
            <Divider mb="lg" />
          </motion.div>
        )}

        {market && (
          <motion.div variants={itemVariants}>
            <Paper 
              p="md" 
              radius="xl" 
              withBorder 
              bg={isDark ? "rgba(26, 27, 30, 0.4)" : "rgba(248, 249, 250, 0.8)"}
              style={{ backdropFilter: "blur(8px)" }}
            >
              <Group mb="sm" justify="space-between">
                <Group gap="xs">
                  <IconTrendingUp size={16} color={theme.colors.blue[6]} stroke={2.5} />
                  <Text size="xs" fw={800}>Market Projection</Text>
                </Group>
                <ActionIcon 
                  variant="subtle" 
                  color="gray" 
                  size="sm" 
                  onClick={() => setZoomedChart({ type: 'market', data: market.timeline, title: 'Commercial Opportunity' })}
                >
                  <IconMaximize size={14} />
                </ActionIcon>
              </Group>
              
              {/* Added minHeight and key to force re-render on data change */}
              <Box style={{ height: 100, width: '100%', minHeight: 100 }}>
                <ResponsiveContainer key={`market-${visualization.drug}`}>
                  <AreaChart data={market.timeline}>
                    <defs>
                      <linearGradient id="colorNovus" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={theme.colors.blue[6]} stopOpacity={0.4}/>
                        <stop offset="95%" stopColor={theme.colors.blue[6]} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke={theme.colors.blue[6]} strokeWidth={3} fill="url(#colorNovus)" />
                    <Tooltip contentStyle={{ backgroundColor: isDark ? theme.colors.dark[7] : "white", borderRadius: rem(12), fontSize: rem(10) }} />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>

              <Group grow mt="sm" pt="xs" style={{ borderTop: `1px solid ${isDark ? theme.colors.dark[5] : theme.colors.gray[2]}` }}>
                <Box>
                  <Text size="9px" fw={800} c="dimmed">ENTRY SIZE</Text>
                  <Text fw={900} size="sm" c="blue.6">${market.current_usd_bn}B</Text>
                </Box>
                <Box ta="right">
                  <Text size="9px" fw={800} c="dimmed">2030 VALUATION</Text>
                  <Text fw={900} size="sm" c="cyan.6">${market.forecast_2030_usd_bn}B</Text>
                </Box>
              </Group>
            </Paper>
          </motion.div>
        )}

        {clinical && clinicalPieData.length > 0 && (
          <motion.div variants={itemVariants} style={{ marginTop: rem(20) }}>
            <Paper p="md" radius="xl" withBorder>
              <Group mb="md" gap="xs">
                <IconActivityHeartbeat size={16} color={theme.colors.indigo[6]} stroke={2.5} />
                <Text size="xs" fw={800}>Clinical Trial Pipeline</Text>
              </Group>
              <Group gap="xl" wrap="nowrap">
                <Box style={{ height: 100, width: 100, minHeight: 100 }}>
                  <ResponsiveContainer key={`clinical-${visualization.drug}`}>
                    <PieChart>
                      <Pie data={clinicalPieData} innerRadius={28} outerRadius={42} paddingAngle={4} dataKey="value" stroke="none">
                        {clinicalPieData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={VIZ_COLORS[index % VIZ_COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                <Stack gap={6} style={{ flex: 1 }}>
                  {clinicalPieData.slice(0, 3).map((entry, idx) => (
                    <Box key={entry.name}>
                      <Group justify="space-between" mb={2}>
                        <Text size="9px" fw={800} c="dimmed">{String(entry.name).toUpperCase()}</Text>
                        <Text size="10px" fw={900}>{Number(entry.value)}</Text>
                      </Group>
                      <Progress value={(Number(entry.value) / Number(clinical.total_trials)) * 100} size="xs" color={VIZ_COLORS[idx]} radius="xl" />
                    </Box>
                  ))}
                </Stack>
              </Group>
            </Paper>
          </motion.div>
        )}

        {market?.patient_split && (
          <motion.div variants={itemVariants} style={{ marginTop: rem(20) }}>
            <Paper p="md" radius="xl" withBorder bg={isDark ? theme.colors.dark[7] : "white"}>
              <Group mb="md" gap="xs">
                <IconActivity size={16} color={theme.colors.teal[6]} stroke={2.5} />
                <Text size="xs" fw={800}>Patient Distribution</Text>
              </Group>
              <Group gap="xl" wrap="nowrap">
                <Box style={{ height: 90, width: 90, minHeight: 90 }}>
                  <ResponsiveContainer key={`patient-${visualization.drug}`}>
                    <PieChart>
                      <Pie data={patientPieData} innerRadius={30} outerRadius={45} dataKey="value" stroke="none" startAngle={90} endAngle={-270}>
                        <Cell fill={theme.colors.blue[6]} />
                        <Cell fill={isDark ? theme.colors.dark[4] : theme.colors.gray[2]} />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                <Stack gap={8} style={{ flex: 1 }}>
                  <Box>
                    <Group justify="space-between" mb={2}>
                      <Text size="9px" fw={800}>TREATED POPULATION</Text>
                      <Text size="10px" fw={900} c="blue.6">{market.patient_split.treated_population_m}M</Text>
                    </Group>
                    <Progress value={(market.patient_split.treated_population_m / market.patient_split.total_population_m) * 100} size="sm" color="blue.6" radius="xl" />
                  </Box>
                  <Box>
                    <Group justify="space-between" mb={2}>
                      <Text size="9px" fw={800}>UNMET NEED (UNTREATED)</Text>
                      <Text size="10px" fw={900}>{market.patient_split.untreated_population_m}M</Text>
                    </Group>
                    <Progress value={(market.patient_split.untreated_population_m / market.patient_split.total_population_m) * 100} size="sm" color="gray.5" radius="xl" />
                  </Box>
                </Stack>
              </Group>
            </Paper>
          </motion.div>
        )}
      </motion.div>

      <Modal opened={!!zoomedChart} onClose={() => setZoomedChart(null)} size="lg" centered radius="xl">
        <Box style={{ height: 400, padding: rem(20) }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={zoomedChart?.data}>
              <XAxis dataKey="year" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} unit="B" />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke={theme.colors.blue[6]} strokeWidth={4} fill={theme.colors.blue[1]} />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Modal>
    </Stack>
  );
};

export default VisualizationPanel;