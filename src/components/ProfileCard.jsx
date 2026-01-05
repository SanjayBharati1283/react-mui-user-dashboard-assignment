
// ProfileCard.jsx
import myPic from "../assets/MyProfilePic.png";
import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  Stack,
  Avatar,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MailIcon from "@mui/icons-material/Mail";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const ProfileCardRoot = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  transition: "box-shadow 160ms ease, transform 160ms ease",
  "&:hover": {
    boxShadow: theme.shadows[4],
    transform: "translateY(-1px)",
  },
}));

const OnlineDot = styled("span")(({ theme, color = theme.palette.success.main }) => ({
  position: "absolute",
  right: -2,
  bottom: -2,
  width: 12,
  height: 12,
  borderRadius: "50%",
  backgroundColor: color,
  border: `2px solid ${theme.palette.background.paper}`,
}));

/**
 * Props (optional):
 * - name: string
 * - email: string
 * - status: 'Active' | 'Away' | 'Offline'
 * - photoUrl: string
 * - onEdit?: () => void
 */
const ProfileCard = ({
  name = "Sanjay Bharati",
  email = "sanjay.bharati@capgemini.com",
  status = "Active",
  photoUrl = myPic,
  onEdit,
}) => {
  const [copied, setCopied] = useState(false);

  const initials = useMemo(() => {
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] || "";
    const last = parts[1]?.[0] || "";
    return (first + last).toUpperCase();
  }, [name]);

  const statusMeta = useMemo(() => {
    switch (status) {
      case "Active":
        return { color: "success", icon: <CheckCircleIcon fontSize="small" />, dot: "success.main" };
      case "Away":
        return { color: "warning", icon: <PauseCircleIcon fontSize="small" />, dot: "warning.main" };
      case "Offline":
      default:
        return { color: "default", icon: <CancelIcon fontSize="small" />, dot: "text.disabled" };
    }
  }, [status]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // silently fail or show a toast if you have one
    }
  };

  return (
    <ProfileCardRoot elevation={1}>
      <CardContent sx={{ p: 2 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "flex-start", sm: "center" }}
        >
          {/* Avatar with online indicator */}
          <Stack position="relative">
            <Avatar
              alt={name}
              src={photoUrl}
              sx={{ width: 64, height: 64, fontSize: 24 }}
              imgProps={{ referrerPolicy: "no-referrer" }}
            >
              {initials}
            </Avatar>
            <OnlineDot color={(theme) => theme.palette[statusMeta.color]?.main} />
          </Stack>

          {/* Name, email and status */}
          <Stack sx={{ flex: 1, minWidth: 0 }} spacing={0.5}>
            <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
              <Typography
                variant="h6"
                noWrap
                sx={{ fontWeight: 700, lineHeight: 1.2, mr: 0.5 }}
              >
                {name}
              </Typography>
              <Chip
                size="small"
                color={statusMeta.color}
                variant="outlined"
                label={status}
                icon={statusMeta.icon}
                sx={{ height: 24 }}
              />
            </Stack>
            <Typography
              variant="body2"
              color="text.secondary"
              noWrap
              title={email}
            >
              {email}
            </Typography>
          </Stack>

          {/* Actions */}
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Tooltip title={copied ? "Copied!" : "Copy email"}>
              <IconButton aria-label="Copy email" onClick={copyEmail} size="small">
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Send email">
              <IconButton
                aria-label="Send email"
                href={`mailto:${email}`}
                size="small"
              >
                <MailIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Divider flexItem orientation="vertical" sx={{ mx: 0.5 }} />

            <Tooltip title="Edit profile">
              <span>
                <IconButton
                  aria-label="Edit profile"
                  onClick={onEdit}
                  size="small"
                  disabled={!onEdit}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
          </Stack>
        </Stack>
      </CardContent>
    </ProfileCardRoot>
  );
};

export default ProfileCard;
