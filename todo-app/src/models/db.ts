import Dexie, { Table } from "dexie";
import { populate } from "./populate";
import { TaskType } from "./TaskType";

export class TasksDB extends Dexie {
  tasksTable!: Table<TaskType, number>;

  constructor() {
    super("TasksDB");
    this.version(1).stores({ tasksTable: "&createdAt" });
  }
}

export const db = new TasksDB();

db.on("populate", populate);

export const setDatabase = (tasks: TaskType[]) => {
  return db.transaction("rw", db.tasksTable, async () => {
    await db.tasksTable.clear();
    await db.tasksTable.bulkAdd(tasks);
  });
};
