
// TaskItem.jsx
import { useTasks } from "../context/TaskContext";
import { useState, useRef, useEffect } from "react";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemText,
  Tooltip,
  TextField,
  Stack,
  Paper,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// Container with subtle elevation and hover
const TaskCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius * 2,
  transition: "box-shadow 160ms ease, transform 160ms ease",
  "&:hover": {
    boxShadow: theme.shadows[4],
    transform: "translateY(-1px)",
  },
}));

// Strikethrough style for completed tasks
const CompletedText = styled("span")(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: "line-through",
}));

const TaskItem = ({ task }) => {
  const { toggleTask, editTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  // Autofocus the input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = title.trim();
    if (!trimmed) {
      setError("Title cannot be empty");
      return;
    }
    if (trimmed === task.title) {
      // No changes—just exit edit mode
      setIsEditing(false);
      return;
    }
    editTask(task.id, trimmed);
    setIsEditing(false);
    setError("");
  };

  const handleCancel = () => {
    setTitle(task.title);
    setError("");
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  };

  return (
    <TaskCard elevation={isEditing ? 3 : 1}>
      <ListItem
        disableGutters
        secondaryAction={
          <Stack direction="row" spacing={0.5} alignItems="center">
            {isEditing ? (
              <>
                <Tooltip title="Save (Enter)">
                  <IconButton
                    color="primary"
                    aria-label="Save"
                    onClick={handleSave}
                    size="small"
                  >
                    <SaveIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Cancel (Esc)">
                  <IconButton
                    aria-label="Cancel"
                    onClick={handleCancel}
                    size="small"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <Tooltip title="Edit">
                <IconButton
                  aria-label="Edit task"
                  onClick={() => setIsEditing(true)}
                  size="small"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        }
        sx={{ py: 0.5 }}
      >
        <Stack direction="row" alignItems="center" spacing={1.25} sx={{ flex: 1 }}>
          <Checkbox
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
            icon={<CheckCircleIcon color="disabled" />}
            checkedIcon={<CheckCircleIcon color="success" />}
            inputProps={{ "aria-label": task.title }}
          />

          {!isEditing ? (
            <Stack direction="row" alignItems="center" spacing={1} sx={{ flex: 1 }}>
              <ListItemText
                primary={
                  task.completed ? (
                    <CompletedText>{task.title}</CompletedText>
                  ) : (
                    task.title
                  )
                }
                secondary={
                  task.completed ? (
                    <Chip
                      label="Completed"
                      size="small"
                      color="success"
                      variant="outlined"
                      sx={{ mt: 0.25 }}
                    />
                  ) : null
                }
                primaryTypographyProps={{
                  variant: "body1",
                  sx: { fontWeight: 500 },
                }}
              />
            </Stack>
          ) : (
            <TextField
              fullWidth
              size="small"
              inputRef={inputRef}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError("");
              }}
              onKeyDown={handleKeyDown}
              placeholder="Edit task title"
              error={!!error}
              helperText={error || "Press Enter to save, Esc to cancel"}
              aria-label="Task title"
            />
          )}
        </Stack>
      </ListItem>
    </TaskCard>
  );
};

export default TaskItem;