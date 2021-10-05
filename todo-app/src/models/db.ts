import Dexie, { Table } from "dexie";
import { OrderType } from "./OrderType";
import { populate } from "./populate";
import { TaskType } from "./TaskType";

export class TasksDB extends Dexie {
  tasksTable!: Table<TaskType, number>;
  ordersTable!: Table<OrderType, number>;

  constructor() {
    super("TasksDB");
    this.version(1).stores({
      tasksTable: "&createdAt",
      ordersTable: "++order,createdAt",
    });
  }

  fetchTasks = async (): Promise<TaskType[]> => {
    const [tasks, orders] = await Promise.all([
      db.tasksTable.toArray(),
      db.ordersTable.orderBy("order").toArray(),
    ]);
    const orderedTasks = orders.map(
      (order: OrderType): TaskType =>
        tasks.find((task: TaskType) => task.createdAt === order.createdAt)!
    );
    return orderedTasks;
  };

  addTask = async (task: TaskType): Promise<void> => {
    await db.transaction("rw", db.tasksTable, db.ordersTable, async () => {
      await Promise.all([
        db.tasksTable.add(task),
        db.ordersTable.add({ createdAt: task.createdAt }),
      ]);
    });
  };

  updateTask = async (task: TaskType): Promise<void> => {
    await db.tasksTable.update(task.createdAt, task);
  };

  deleteTask = async (createdAt: number): Promise<void> => {
    await db.transaction("rw", db.tasksTable, db.ordersTable, async () => {
      await Promise.all([
        db.tasksTable.delete(createdAt),
        db.ordersTable.where("createdAt").anyOf(createdAt).delete(),
      ]);
    });
  };

  updateOrders = async (createdAtList: number[]): Promise<void> => {
    await db.transaction("rw", db.ordersTable, async () => {
      await db.ordersTable.clear();
      await createdAtList.map(
        async (createdAt: number) =>
          await db.ordersTable.add({ createdAt: createdAt })
      );
    });
  };
}

export const db = new TasksDB();

db.on("populate", populate);
