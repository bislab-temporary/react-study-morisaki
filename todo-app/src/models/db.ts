import Dexie, { Table } from "dexie";
import { OrderedTaskType } from "./OrderedTaskType";
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
}

export const db = new TasksDB();

db.on("populate", populate);

export const getOrderedTasks = async (): Promise<OrderedTaskType[]> => {
  const tasks = await db.tasksTable.toArray();
  const orders = await db.ordersTable.orderBy("order").toArray();
  const orderedTasks = orders.map((order: OrderType): OrderedTaskType => {
    const task = tasks.find(
      (task: TaskType) => task.createdAt === order.createdAt
    )!;
    return { order: order.order, ...task };
  });
  return orderedTasks;
};

export const addTask = (text: string) => {
  const createdAt = Date.now();
  db.transaction("rw", db.tasksTable, db.ordersTable, async () => {
    await db.tasksTable.add({
      createdAt: createdAt,
      isDone: false,
      text: text,
    });
    await db.ordersTable.add({ createdAt: createdAt });
  });
};

export const updateOrders = async (newTasks: OrderType[]) => {
  db.transaction("rw", db.tasksTable, db.ordersTable, async () => {
    await db.ordersTable.clear();
    newTasks.map(
      async (newTask: OrderType) =>
        await db.ordersTable.add({ createdAt: newTask.createdAt })
    );
  });
};
