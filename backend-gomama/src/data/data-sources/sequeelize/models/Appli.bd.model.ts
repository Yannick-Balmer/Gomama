// MobileApp.ts

import { DataTypes } from "sequelize";
import { IAppli } from "../../../../models/interfaces/Appli.interface";
import { sequelize } from "../index";

const Appli: IAppli = sequelize.define("MobileApp", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ios_android: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  plateform_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  app_karting: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  privacy_link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color_main: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color_secondary: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  app_short_presentation: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  app_long_presentation: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  firebase_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  version: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  publication_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_app: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  firebase_key: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  certificate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_client: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_mobile_app_config: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  firebase_file: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  requested_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  id_apple_team: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_key_auth_apns: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  key_apns: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Appli;
