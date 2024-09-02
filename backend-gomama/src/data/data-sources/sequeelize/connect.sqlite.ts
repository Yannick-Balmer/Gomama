import { Sequelize } from "sequelize";
import MobileApp from "./sequeelize/mobileApp";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

async function connect(): Promise<void> {
  try {
    await sequelize.sync({ force: true });
    console.log("La table 'mobile_apps' a été créée avec succès !");
  } catch (err) {
    console.error(
      "Une erreur est survenue lors de la synchronisation avec la base de données :",
      err
    );
  } finally {
    await sequelize.close();
  }
}

export default connect;
