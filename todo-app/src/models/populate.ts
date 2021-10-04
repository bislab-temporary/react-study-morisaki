import { db } from "./db";

export const populate = async () => {
  db.tasksTable.bulkAdd([
    {
      createdAt: 0,
      isDone: false,
      text: "Task1",
    },
    {
      createdAt: 1,
      isDone: false,
      text: "Task2",
    },
    {
      createdAt: 2,
      isDone: false,
      text: "Task3",
    },
  ]);
};
