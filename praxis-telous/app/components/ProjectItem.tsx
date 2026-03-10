'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FolderIcon from '@mui/icons-material/Folder';

import { Task, TaskStatus, TaskType } from '../models/Task';
import TaskItem from './TaskItem';
import { iconMap } from '../constants';
import { statusColors } from '../constants/status';

interface ProjectItemProps {
  project: Task;
  allTasks: Task[];
  onEdit: (task: Task, parentId: number | null, type: TaskType) => void;
  onAddSubtask: (taskToEdit: undefined, parentId: number, type: TaskType) => void;
  onDelete: (taskId: number) => void;
}

export default function ProjectItem({ project, allTasks, onEdit, onAddSubtask, onDelete }: ProjectItemProps) {
  const IconComponent = iconMap[project.icon] || FolderIcon;
  
  const hasSubtasks = project.subtasks && project.subtasks.length > 0;

  return (
    <Box>
      <Card 
        variant="outlined" 
        sx={{ 
          minWidth: 275, 
          borderColor: 'rgba(255,255,255,0.12)',
          bgcolor: 'rgba(20, 25, 30, 0.5)', // Darker, more grounded color
          backdropFilter: 'blur(8px)',
          transition: 'border-color 0.2s ease-in-out',
          '&:hover': { borderColor: 'primary.main' },
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: project.color }} aria-label="project-icon">
              <IconComponent />
            </Avatar>
          }
          title={project.text}
          titleTypographyProps={{ variant: 'h5', fontWeight: 600 }}
          subheader={project.description}
          sx={{
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            py: 2,
            '& .MuiCardHeader-subheader': {
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
              overflow: 'hidden', textOverflow: 'ellipsis', mt: 0.5, color: 'text.secondary'
            }
          }}
        />

        {hasSubtasks && (
          <Box sx={{ px: 2, py: 2 }}>
            <Stack spacing={1}>
              {project.subtasks.map((sub) => (
                <TaskItem
                  key={sub.id}
                  task={sub}
                  allTasks={allTasks}
                  onEdit={onEdit}
                  onAddSubtask={onAddSubtask}
                  onDelete={onDelete}
                  level={1} // Start at level 1 for project subtasks
                />
              ))}
            </Stack>
          </Box>
        )}
        
        <CardActions sx={{ borderTop: '1px solid rgba(255,255,255,0.05)', justifyContent: 'space-between', px: 2, py: 1.5 }}>
          <Chip
            label={project.status}
            color={statusColors[project.status] || 'default'}
            variant={project.status === 'Archived' ? 'filled' : 'outlined'}
            size="small"
            sx={{ fontWeight: 500, height: 24, opacity: project.status === 'Archived' ? 0.7 : 1 }}
          />
          <Box>
            <Button size="small" startIcon={<AddIcon />} onClick={() => onAddSubtask(undefined, project.id, 'task')} sx={{ color: 'text.secondary', mr: 1 }}>
              Add Task
            </Button>
            <Button size="small" startIcon={<EditIcon />} onClick={() => onEdit(project, null, 'project')} sx={{ color: 'text.secondary', mr: 1 }}>
              Edit
            </Button>
            <Button size="small" startIcon={<DeleteIcon />} color="error" onClick={() => onDelete(project.id)}>
              Delete
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
}
