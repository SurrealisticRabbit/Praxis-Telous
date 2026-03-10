'use client';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { Task, TaskStatus, TaskType } from '../models/Task';
import { colors, iconMap } from '../constants';

interface TaskFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (taskData: any) => void;
  initialTask: Task | null;
  parentId?: number | null;
  allTasks?: Task[];
  type?: TaskType;
}

export default function TaskFormDialog({ open, onClose, onSave, initialTask, parentId, allTasks = [], type = 'task' }: TaskFormDialogProps) {
  const [formData, setFormData] = useState({
    text: '',
    description: '',
    color: '#424242',
    icon: 'task',
    status: 'Idea' as TaskStatus,
  });

  useEffect(() => {
    if (open) {
      if (initialTask) {
        setFormData({
          text: initialTask.text,
          description: initialTask.description,
          color: initialTask.color,
          icon: initialTask.icon,
          status: initialTask.status,
        });
      } else {
        setFormData({
          text: '',
          description: '',
          color: '#424242',
          icon: type === 'project' ? 'folder' : 'task',
          status: 'Idea',
        });
      }
    }
  }, [open, initialTask, type]);

  const handleSave = () => {
    onSave({
      ...formData,
      id: initialTask?.id,
      parentId,
      type: initialTask?.type || type,
    });
  };

  const dialogTitle = initialTask
    ? `Edit ${initialTask.type === 'project' ? 'Project' : 'Task'}`
    : `New ${type === 'project' ? 'Project' : (parentId !== null ? 'Subtask' : 'Task')}`;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="What needs to be done?"
          fullWidth
          variant="outlined"
          value={formData.text}
          onChange={(e) => setFormData({ ...formData, text: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Description (optional)"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        <FormControl fullWidth margin="dense">
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            value={formData.status}
            label="Status"
            onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskStatus })}
          >
            <MenuItem value="Idea">Idea</MenuItem>
            <MenuItem value="To Research">To Research</MenuItem>
            <MenuItem value="Ready to Start">Ready to Start</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Blocked">Blocked</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
            <MenuItem value="Archived">Archived</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>Color Code</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {colors.map((color) => (
              <Box key={color}>
                <Box
                  onClick={() => setFormData({ ...formData, color })}
                  sx={{
                    width: 24, height: 24, borderRadius: '50%', bgcolor: color, cursor: 'pointer',
                    border: formData.color === color ? '2px solid white' : 'none',
                    outline: formData.color === color ? `2px solid ${color}` : 'none',
                    transition: 'transform 0.1s', '&:hover': { transform: 'scale(1.1)' }
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>Icon</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {Object.keys(iconMap).map((iconKey) => {
              const IconComponent = iconMap[iconKey];
              return (
                <Box key={iconKey}>
                  <IconButton onClick={() => setFormData({ ...formData, icon: iconKey })} color={formData.icon === iconKey ? 'primary' : 'default'} sx={{ border: formData.icon === iconKey ? `1px solid` : '1px solid transparent', borderColor: 'primary.main' }}><IconComponent /></IconButton>
                </Box>
              );
            })}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions><Button onClick={onClose}>Cancel</Button><Button onClick={handleSave} variant="contained">{initialTask ? 'Save' : 'Add'}</Button></DialogActions>
    </Dialog>
  );
}