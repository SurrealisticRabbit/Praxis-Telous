export type TaskStatus = 'Idea' | 'To Research' | 'Ready to Start' | 'In Progress' | 'Blocked' | 'Done' | 'Archived';
export type TaskType = 'project' | 'task';

export class Task {
  id: number;
  text: string;
  description: string;
  color: string;
  icon: string;
  status: TaskStatus;
  subtasks: Task[];
  type: TaskType;

  constructor(text: string, description: string = '', color: string = '#424242', icon: string = 'task', status: TaskStatus = 'Idea', type: TaskType = 'task') {
    this.id = Date.now();
    this.text = text;
    this.description = description;
    this.color = color;
    this.icon = icon;
    this.status = status;
    this.subtasks = [];
    this.type = type;
  }
}
