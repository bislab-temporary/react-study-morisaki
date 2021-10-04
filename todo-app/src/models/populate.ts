import { db } from "./db";

export const populate = async () => {
  db.tasksTable.bulkAdd([
    {
      createdAt: new Date(2021, 9, 30, 1, 0, 0).getTime(),
      isDone: false,
      text: "Task1",
    },
    {
      createdAt: new Date(2021, 9, 30, 2, 0, 0).getTime(),
      isDone: false,
      text: "Task2",
    },
    {
      createdAt: new Date(2021, 9, 30, 3, 0, 0).getTime(),
      isDone: false,
      text: "Task3",
    },
  ]);
};
