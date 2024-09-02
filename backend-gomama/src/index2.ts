import { Request, Response } from "express-serve-static-core";
import express, { application } from "express";
import sqlite3 from "sqlite3";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";

import Appli from "./data/data-sources/sequeelize/models/Appli.bd.model.js";
import {
  connectDb,
  createTableDb,
} from "./data/data-sources/sequeelize/index.js";

// const corsOptions = {
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200,
// };

const app = express();
// app.use(cors(corsOptions));
app.use(cors());
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get("/salut", (req: Request, res: Response) => {
  res.send("hell saslut");
});

app.post("/api", async (request: Request, response: Response) => {
  console.log("API");
  try {
    const createdApps = [];
    const data = request.body;
    console.log(data);
    // console.log(data);
    // const myAppli = new Appli(data);

    if (data.ios === "yes") {
      const newMobileIosApp = await Appli.create({
        name: "Nom Forcé",
        ios_android: "ios",
        plateform_name: data.plateform_name,
        language: data.language,
        app_karting: data.app_karting,
        privacy_link: data.privacy_link,
        color_main: data.color_main,
        color_secondary: data.color_secondary,
        app_short_presentation: "Short presentation text",
        app_long_presentation: "Long presentation text",
      });
      createdApps.push(newMobileIosApp);
    }
    if (data.android === "yes") {
      const newMobileAndroidApp = await Appli.create({
        name: data.name,
        ios_android: "android",
        plateform_name: data.plateform_name,
        language: data.language,
        app_karting: data.app_karting,
        privacy_link: data.privacy_link,
        color_main: data.color_main,
        color_secondary: data.color_secondary,
        app_short_presentation: "Short presentation text",
        app_long_presentation: "Long presentation text",
      });
      createdApps.push(newMobileAndroidApp);
    }

    response.status(200).json({
      message: "Votre commande à bien été enregistrée",
      apps: createdApps,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: error.message, error });
  }
});

async function insertMobileApp() {
  try {
    const newMobileApp = await Appli.create({
      name: "My Mobile App",
      ios_android: "iOS",
      plateform_name: "Platform XYZ",
      language: "English",
      app_karting: "Karting",
      privacy_link: "https://example.com/privacy",
      color_main: "#ffffff",
      color_secondary: "#000000",
      app_short_presentation: "Short presentation text",
      app_long_presentation: "Long presentation text",
      // Vous pouvez ajouter d'autres champs ici selon votre modèle
    });

    console.log("Nouvelle application mobile insérée :", newMobileApp.toJSON());
  } catch (error) {
    console.error(
      "Erreur lors de l'insertion de l'application mobile :",
      error
    );
  }
}

app.listen(port, async () => {
  await connectDb();
  await createTableDb();
  // await insertMobileApp();
  console.log("api-gomama is running");
});
