const { ResponseApi } = require("../models/ResponseApi.js");
const { createIdsFirebase } = require("../index.js");

const { foldersFirebase } = require("../folders-firebase.js")

const folderListDTO = foldersFirebase

exports.createIds = async (req, res, next) => {
    try {
        const data = req.body
        const responseApi = new ResponseApi(
            null,
            "Successfull ! You are a genious my guy ! Ids Firebase crée et fichiers de configuration chargés",
            "OK",
            null
        )

        await createIdsFirebase(folderListDTO, data.centerNumbertDTO, data.folderNameDTO);

        res.status(200).json(responseApi);
    } catch (e) {
        const responseApi = new ResponseApi();
        responseApi.error = {
            message: "Error in creating Ids Firebase",
            error: e.message
        };
        res.status(500).json(responseApi);
    }
};
