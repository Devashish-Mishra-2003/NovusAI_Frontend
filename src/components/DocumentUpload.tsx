import { useState } from "react";
import {
  Button,
  Group,
  Text,
  Stack,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconCloudUpload, IconFileCheck, IconAlertCircle } from "@tabler/icons-react";
import { uploadDocument } from "../api/documents";

export default function DocumentUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const theme = useMantineTheme();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const allowedTypes = ["application/pdf", "text/plain"];
    if (!allowedTypes.includes(selected.type)) {
      setStatus("error");
      setMessage("Only PDF and TXT files are allowed");
      return;
    }

    setFile(selected);
    setStatus("idle");
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const res = await uploadDocument(file);
      setStatus("success");
      setMessage(`Uploaded: ${res.filename}`);
      setFile(null);
    } catch (err: any) {
      setStatus("error");
      setMessage(err.response?.data?.detail || "Upload failed");
    }
  };

  return (
    <Stack align="center" gap="md">
      <ThemeIcon size={60} radius="xl" variant="light" color="blue">
        <IconCloudUpload size={30} />
      </ThemeIcon>

      <input
        type="file"
        accept=".pdf,.txt"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="doc-upload-input"
      />

      <Group>
        <label htmlFor="doc-upload-input">
          <Button
            component="span"
            variant="default"
            radius="xl"
            px="xl"
          >
            Select File
          </Button>
        </label>

        <Button
          variant="filled"
          color="blue"
          radius="xl"
          px="xl"
          disabled={!file}
          onClick={handleUpload}
        >
          Upload to Vault
        </Button>
      </Group>

      {status === "success" && (
        <Group gap={6}>
          <IconFileCheck color={theme.colors.green[6]} size={18} />
          <Text size="sm" c="green">
            {message}
          </Text>
        </Group>
      )}

      {status === "error" && (
        <Group gap={6}>
          <IconAlertCircle color={theme.colors.red[6]} size={18} />
          <Text size="sm" c="red">
            {message}
          </Text>
        </Group>
      )}

      <Text size="xs" c="dimmed">
        Supported formats: PDF, TXT
      </Text>
    </Stack>
  );
}
