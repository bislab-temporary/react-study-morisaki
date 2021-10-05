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
    const tasks = await db.tasksTable.toArray();
    const orders = await db.ordersTable.orderBy("order").toArray();
    const orderedTasks = orders.map(
      (order: OrderType): TaskType =>
        tasks.find((task: TaskType) => task.createdAt === order.createdAt)!
    );
    console.table(orderedTasks);
    return orderedTasks;
  };

  addTask = (task: TaskType) => {
    db.transaction("rw", db.tasksTable, db.ordersTable, async () => {
      await db.tasksTable.add(task);
      await db.ordersTable.add({ createdAt: task.createdAt });
    });
  };

  updateTask = (task: TaskType) => {
    db.tasksTable.update(task.createdAt, task);
  };

  deleteTask = (createdAt: number) => {
    db.transaction("rw", db.tasksTable, db.ordersTable, async () => {
      db.tasksTable.delete(createdAt);
      db.ordersTable.where("createdAt").anyOf(createdAt).delete();
    });
  };

  updateOrders = async (createdAtList: number[]) => {
    db.transaction("rw", db.ordersTable, async () => {
      await db.ordersTable.clear();
      createdAtList.map(
        async (createdAt: number) =>
          await db.ordersTable.add({ createdAt: createdAt })
      );
    });
  };
}

export const db = new TasksDB();

db.on("populate", populate);
