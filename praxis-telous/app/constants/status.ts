export type TaskStatus = 'Idea' | 'To Research' | 'Ready to Start' | 'In Progress' | 'Blocked' | 'Done' | 'Archived';

export const statusList: TaskStatus[] = ['Idea', 'To Research', 'Ready to Start', 'In Progress', 'Blocked', 'Done', 'Archived'];

export const statusColors: Record<TaskStatus, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  'Idea': 'default',
  'To Research': 'info',
  'Ready to Start': 'secondary',
  'In Progress': 'warning',
  'Blocked': 'error',
  'Done': 'success',
  'Archived': 'default',
};