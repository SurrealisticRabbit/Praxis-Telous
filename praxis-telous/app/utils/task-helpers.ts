import { Task } from '../models/Task';

/**
 * Flattens a tree of tasks into a single-level array.
 * @param tasks The array of tasks to flatten.
 * @returns A flat array of all tasks and their subtasks.
 */
export const flattenTasks = (tasks: Task[]): Task[] => {
  const flat: Task[] = [];
  const recurse = (taskArray: Task[]) => {
    for (const task of taskArray) {
      flat.push(task);
      if (task.subtasks && task.subtasks.length > 0) {
        recurse(task.subtasks);
      }
    }
  };
  recurse(tasks);
  return flat;
};

/**
 * Adds a new task to the task tree, either at the root or as a subtask.
 * @param tasks The current array of tasks.
 * @param newTask The new task to add.
 * @param parentId The ID of the parent task. If null, adds to the root.
 * @returns A new array of tasks with the new task added.
 */
export const addTaskToTree = (tasks: Task[], newTask: Task, parentId: number | null): Task[] => {
  if (parentId === null) {
    return [...tasks, newTask];
  }

  return tasks.map(task => {
    if (task.id === parentId) {
      return {
        ...task,
        subtasks: [...task.subtasks, newTask],
      };
    }
    if (task.subtasks && task.subtasks.length > 0) {
      return {
        ...task,
        subtasks: addTaskToTree(task.subtasks, newTask, parentId),
      };
    }
    return task;
  });
};

/**
 * Deletes a task from the task tree.
 * @param tasks The current array of tasks.
 * @param taskId The ID of the task to delete.
 * @returns A new array of tasks with the specified task removed.
 */
export const deleteTaskFromTree = (tasks: Task[], taskId: number): Task[] => {
    return tasks.reduce((acc, task) => {
        if (task.id === taskId) {
            // Don't include this task in the new array
            return acc;
        }

        if (task.subtasks && task.subtasks.length > 0) {
            // Recursively process subtasks
            const newSubtasks = deleteTaskFromTree(task.subtasks, taskId);
            // If subtasks changed, create a new task object
            if (newSubtasks.length !== task.subtasks.length) {
                 acc.push({ ...task, subtasks: newSubtasks });
                 return acc;
            }
        }
        
        // If no change, push the original task
        acc.push(task);
        return acc;
    }, [] as Task[]);
};


/**
 * Updates an existing task within the task tree.
 * @param tasks The current array of tasks.
 * @param updatedTask The task object with updated properties.
 * @returns A new array of tasks with the specified task updated.
 */
export const updateTaskInTree = (tasks: Task[], updatedTask: Task): Task[] => {
  return tasks.map(task => {
    if (task.id === updatedTask.id) {
      return updatedTask;
    }
    if (task.subtasks && task.subtasks.length > 0) {
      return {
        ...task,
        subtasks: updateTaskInTree(task.subtasks, updatedTask),
      };
    }
    return task;
  });
};

/**
 * Recursively deserializes plain objects into Task instances.
 * @param plainTasks The array of plain objects to deserialize.
 * @returns An array of Task instances.
 */
export const deserializeTasks = (plainTasks: any[]): Task[] => {
  return plainTasks.map(plainTask => {
    const task = new Task(
      plainTask.text,
      plainTask.description,
      plainTask.color,
      plainTask.icon,
      plainTask.status,
      plainTask.type
    );
    // Restore the original ID, as the constructor creates a new one
    task.id = plainTask.id; 
    
    if (plainTask.subtasks && plainTask.subtasks.length > 0) {
      task.subtasks = deserializeTasks(plainTask.subtasks);
    } else {
      task.subtasks = [];
    }
    
    return task;
  });
};
