'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import AssignmentIcon from '@mui/icons-material/Assignment';

import { Task, TaskType } from './models/Task';
import ProjectItem from './components/ProjectItem';
import TaskFormDialog from './components/TaskFormDialog';
import { addTaskToTree, deleteTaskFromTree, flattenTasks, updateTaskInTree, deserializeTasks } from './utils/task-helpers';

/**
 * Recursively searches for a task with a specific ID within a nested task tree.
 */
const findTaskById = (tasks: Task[], id: number): Task | null => {
  for (const task of tasks) {
    if (task.id === id) return task;
    if (task.subtasks && task.subtasks.length > 0) {
      const found = findTaskById(task.subtasks, id);
      if (found) return found;
    }
  }
  return null;
};

/**
 * Custom hook to manage task state and synchronization with LocalStorage.
 */
function useTaskPersistence() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem('praxis-telous-tasks');
      if (savedTasks) {
        const plainTasks = JSON.parse(savedTasks);
        setTasks(deserializeTasks(plainTasks));
      }
    } catch (error) {
      console.error("Failed to load tasks from local storage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      try {
        const tasksJson = JSON.stringify(tasks);
        localStorage.setItem('praxis-telous-tasks', tasksJson);
      } catch (error) {
        console.error("Failed to save tasks to local storage", error);
      }
    }
  }, [tasks, isLoading]);

  return { tasks, setTasks, isLoading };
}

interface DialogState {
  open: boolean;
  taskToEdit?: Task;
  parentId?: number | null;
  type?: TaskType;
}

export default function Home() {
  const { tasks, setTasks, isLoading } = useTaskPersistence();
  const [dialogState, setDialogState] = useState<DialogState>({ open: false });

  const flatTasks = useMemo(() => flattenTasks(tasks), [tasks]);

  const handleOpenDialog = useCallback((taskToEdit?: Task, parentId: number | null = null, type: TaskType = 'task') => {
    setDialogState({ open: true, taskToEdit, parentId, type });
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogState({ open: false });
  }, []);

  const handleSaveTask = useCallback((taskData: Partial<Task> & { parentId?: number | null; type?: TaskType }) => {
    if (taskData.text?.trim() === '') return;
    
    setTasks(currentTasks => {
      if (taskData.id) {
        // Update existing task
        const existingTask = findTaskById(currentTasks, taskData.id);
        if (!existingTask) return currentTasks;

        const updatedTask = {
          ...existingTask,
          ...taskData,
        } as Task;
        return updateTaskInTree(currentTasks, updatedTask);
      } else {
        // Create new task
        const newTask = new Task(
          taskData.text!, 
          taskData.description, 
          taskData.color, 
          taskData.icon, 
          taskData.status, 
          taskData.type
        );
        return addTaskToTree(currentTasks, newTask, taskData.parentId ?? null);
      }
    });

    handleCloseDialog();
  }, [handleCloseDialog, setTasks]);

  const handleDeleteTask = useCallback((taskId: number) => {
    setTasks(currentTasks => deleteTaskFromTree(currentTasks, taskId));
  }, [setTasks]);

  if (isLoading) {
    return null;
  }

  return (
    <Box sx={{ 
      flexGrow: 1, 
      background: 'linear-gradient(to bottom right, #0f1214, #1a1f24)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <AppBar 
        position="sticky" 
        elevation={0} 
        sx={{ 
          bgcolor: 'rgba(15, 18, 20, 0.8)', 
          backdropFilter: 'blur(12px)', 
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '-0.5px' }}>
            Praxis Telous ∆
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ my: 6, flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {tasks.length === 0 ? (
            <Fade in={true} timeout={800}>
              <Box sx={{ 
                mt: 10, 
                textAlign: 'center', 
                color: 'text.secondary',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                opacity: 0.7
              }}>
                <AssignmentIcon sx={{ fontSize: 64, color: 'rgba(255,255,255,0.1)' }} />
                <Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, color: 'text.primary' }}>
                    No projects yet
                  </Typography>
                  <Typography variant="body1" sx={{ maxWidth: 400 }}>
                    Create your first project to start organizing your tasks and goals.
                  </Typography>
                </Box>
              </Box>
            </Fade>
          ) : (
            <Stack spacing={3} sx={{ width: '100%' }}>
              {tasks.map((rootTask) => (
                <ProjectItem 
                  key={rootTask.id} 
                  project={rootTask}
                  allTasks={flatTasks}
                  onEdit={handleOpenDialog}
                  onAddSubtask={handleOpenDialog}
                  onDelete={handleDeleteTask}
                />
              ))}
            </Stack>
          )}

          <Tooltip title="Create New Project" placement="left">
            <Fab
              color="secondary"
              aria-label="add-project"
              sx={{ 
                position: 'fixed', 
                bottom: 32, 
                right: 32,
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
              }}
              onClick={() => handleOpenDialog(undefined, null, 'project')}
            >
              <AddIcon />
            </Fab>
          </Tooltip>

          <TaskFormDialog 
            open={dialogState.open} 
            onClose={handleCloseDialog} 
            onSave={handleSaveTask} 
            initialTask={dialogState.taskToEdit || null}
            parentId={dialogState.parentId}
            allTasks={flatTasks}
            type={dialogState.type}
          />
        </Box>
      </Container>
    </Box>
  );
}
