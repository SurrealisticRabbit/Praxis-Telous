'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';

import TaskIcon from '@mui/icons-material/Task';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { Task, TaskStatus, TaskType } from '../models/Task';
import { iconMap } from '../constants';
import { statusColors } from '../constants/status';

interface TaskItemProps {
  task: Task;
  allTasks: Task[];
  onEdit: (task: Task, parentId: number | null, type: TaskType) => void;
  onAddSubtask: (taskToEdit: undefined, parentId: number, type: TaskType) => void;
  onDelete: (taskId: number) => void;
  level?: number;
}

export default function TaskItem({ task, allTasks, onEdit, onAddSubtask, onDelete, level = 0 }: TaskItemProps) {
  const [expanded, setExpanded] = useState(false);
  const [actionsVisible, setActionsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Use subdirectory arrow for subtasks, otherwise use the task's chosen icon
  const getIcon = () => {
    // We always show the icon now, SubdirectoryArrow is less important
    return iconMap[task.icon] || TaskIcon;
  }
  const IconComponent = getIcon();
  
  const hasSubtasks = task.subtasks && task.subtasks.length > 0;

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop it from bubbling to parent TaskItems
    setActionsVisible(!actionsVisible);
    if (hasSubtasks) {
      setExpanded(!expanded);
    }
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop it from toggling actions
  };

  return (
    <Box 
      onClick={handleCardClick} 
      onMouseOver={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onMouseOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
    >
      <Card 
        variant="outlined" 
        sx={{ 
          minWidth: 275, 
          bgcolor: 'rgba(255, 255, 255, 0.03)',
          borderColor: isHovered ? 'primary.light' : 'rgba(255, 255, 255, 0.08)',
          transition: 'border-color 0.2s ease-in-out',
          cursor: 'pointer',
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: task.color, width: 32, height: 32 }} aria-label="task-icon">
              <IconComponent sx={{ fontSize: '1rem' }} />
            </Avatar>
          }
          action={
            // This Box is crucial for vertical alignment of the chip
            <Box sx={{ display: 'flex', alignItems: 'center', height: '40px' /* match header height */ }}>
              <Chip
                label={task.status}
                color={statusColors[task.status] || 'default'}
                variant={task.status === 'Archived' ? 'filled' : 'outlined'}
                size="small"
                sx={{ fontWeight: 500, height: 22 }}
              />
            </Box>
          }
          title={task.text}
          titleTypographyProps={{ 
            variant: 'h6', 
            fontWeight: 500, 
            fontSize: '1rem',
            color: 'text.primary'
          }}
          subheader={task.description}
          sx={{
            py: 1, 
            px: 2,
            '& .MuiCardHeader-subheader': {
              display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical',
              overflow: 'hidden', textOverflow: 'ellipsis', mt: 0.25, fontSize: '0.8rem'
            }
          }}
        />
        
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {hasSubtasks && (
            <Box 
              sx={{ pt: 2, px: 2 }}
              // Prevent parent hover when hovering in the subtask area
              onMouseOver={(e) => e.stopPropagation()}
              onMouseOut={(e) => e.stopPropagation()}
            >
              <Stack spacing={1.5}>
                {task.subtasks.map((sub) => (
                  <TaskItem
                    key={sub.id}
                    task={sub}
                    allTasks={allTasks}
                    onEdit={onEdit}
                    onAddSubtask={onAddSubtask}
                    onDelete={onDelete}
                    level={level + 1}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Collapse>

        <Collapse in={actionsVisible} timeout="auto" unmountOnExit>
          <CardActions sx={{ justifyContent: 'flex-end', px: 2, py: 0.5, borderTop: '1px solid rgba(255,255,255,0.05)' }} onClick={handleActionClick}>
              <Button size="small" startIcon={<AddIcon />} onClick={() => onAddSubtask(undefined, task.id, 'task')} sx={{ color: 'text.secondary', mr: 1, fontSize: '0.75rem' }}>
                Subtask
              </Button>
              <Button size="small" startIcon={<EditIcon />} onClick={() => onEdit(task, task.id, 'task')} sx={{ color: 'text.secondary', mr: 1, fontSize: '0.75rem' }}>
                Edit
              </Button>
              <Button size="small" startIcon={<DeleteIcon />} color="error" onClick={() => onDelete(task.id)} sx={{ fontSize: '0.75rem' }}>
                Delete
              </Button>
          </CardActions>
        </Collapse>
      </Card>
    </Box>
  );
}
