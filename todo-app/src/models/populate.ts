import { db } from "@/models/db";

export const populate = async () => {
  db.transaction("rw", db.tasksTable, db.ordersTable, async () => {
    await db.tasksTable.bulkAdd([
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

    await db.ordersTable.bulkAdd([
      {
        createdAt: 0,
      },
      {
        createdAt: 1,
      },
      {
        createdAt: 2,
      },
    ]);
  });
};
