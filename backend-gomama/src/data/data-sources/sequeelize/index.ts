import { Sequelize } from "sequelize";
import SQLite from "sqlite3";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  dialectOptions: {
    mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
  },
});

export async function connectDb() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export async function createTableDb() {
  try {
    await sequelize.sync();
    console.log("Base de données SQLite synchronisée");
  } catch (err) {
    console.error(
      "Erreur lors de la synchronisation de la base de données :",
      err
    );
  }
}
