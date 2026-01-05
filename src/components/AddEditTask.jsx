
// AddEditTask.jsx
import { useState, useRef, useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import {
  Paper,
  Stack,
  TextField,
  IconButton,
  Tooltip,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClearIcon from "@mui/icons-material/Clear";

const AddTaskCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius * 2,
  transition: "box-shadow 160ms ease, transform 160ms ease",
  "&:hover": {
    boxShadow: theme.shadows[4],
    transform: "translateY(-1px)",
  },
}));

const AddEditTask = () => {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  // Autofocus on mount for quick entry
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleAdd = () => {
    const trimmed = title.trim();
    if (!trimmed) {
      setError("Please enter a task title");
      return;
    }
    // Optional: prevent very short tasks
    if (trimmed.length < 3) {
      setError("Task title should be at least 3 characters");
      return;
    }
    addTask(trimmed);
    setTitle("");
    setError("");
    // Refocus for fast multiple additions
    if (inputRef.current) inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setTitle("");
      setError("");
    }
  };

  const canAdd = title.trim().length >= 3;

  return (
    <AddTaskCard elevation={1}>
      <Stack direction="row" spacing={1} alignItems="center">
        <TextField
          fullWidth
          size="small"
          inputRef={inputRef}
          placeholder="Add new task"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError("");
          }}
          onKeyDown={handleKeyDown}
          error={!!error}
          helperText={error || "Press Enter to add • Esc to clear"}
          aria-label="New task title"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AddCircleIcon color={canAdd ? "primary" : "disabled"} />
              </InputAdornment>
            ),
            endAdornment: title ? (
              <InputAdornment position="end">
                <Tooltip title="Clear (Esc)">
                  <IconButton
                    aria-label="Clear"
                    onClick={() => {
                      setTitle("");
                      setError("");
                      inputRef.current?.focus();
                    }}
                    size="small"
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ) : null,
          }}
        />

        <Tooltip title={canAdd ? "Add task" : "Enter at least 3 characters"}>
          <span>
            {/* span wrapper keeps Tooltip working on disabled buttons */}
            <IconButton
              color="primary"
              aria-label="Add task"
              onClick={handleAdd}
              disabled={!canAdd}
              size="medium"
            >
              <AddCircleIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>
    </AddTaskCard>
  );
};

export default AddEditTask;
