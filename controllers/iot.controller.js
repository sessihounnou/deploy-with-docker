//const { default: next } = require('next/types')
const prisma = require("../prisma/index");
const { cookieToken } = require("../utils/cookieToken");

exports.CreateNewCaptor = async (req, res, next) => {
  const { name, description, batteryLevel } = req.body;
  try {
    const captor = await prisma.captor.create({
      data: {
        name,
        description,
        batteryLevel,
      },
    });
    const CaptorData = await prisma.captorData.create({
      data: {
        captorId: captor.id,
      },
    });
    res.status(200).json({
      response:
        " Your new captor has been create successfuly with data table for her !",
      data: CaptorData,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.GetAllCaptor = async (req, res, next) => {
  try {
    const allCaptor = await prisma.captor.findMany();

    res.status(200).json({
      message: "get all captor details",
      data: allCaptor,
    });
  } catch (error) {}
};
exports.GetOneCaptor = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const oneCaptor = await prisma.captor.findUnique({
      where: {
        id,
      },
    });
    console.log(oneCaptor);

    const captorData = await prisma.captor.findUnique({
      where: {
        captorId: oneCaptor.id,
      },
    });
    console.log(captorData);
    res.send(200).json({
      message: "Get all detail and data for this EHT",
      captor: captorDetail,
      captorData: captorData,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error: error,
    });
  }
};
exports.GetAllCaptorData = async (req, res, next) => {
  try {
    console.log("get all captor");
    const allCaptor = await prisma.captorData.findMany();
    res.status(200).json({
      message: "get all captor Data",
      data: allCaptor,
    });
  } catch (error) {}
};
exports.CreateCaptorData = async (req, res, next) => {
  const soilHumidity = req.query.soilHumidity;
  const captorId = req.query.captorId;
  const ambiantTemp = req.query.ambiantTemp;
  const SizePlant = req.query.SizePlant;
  console.log(soilHumidity);
  console.log(captorId);
  console.log(ambiantTemp);
  console.log(SizePlant);
  try {
    const ehtData = await prisma.captorData.create({
      data: {
        captorId,
        soilHumidity,
        ambiantTemp,
        SizePlant,
      },
    });
    res.status(200).json({
      message: "Data submited successfuly",
      data: ehtData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occured",
      data: error,
    });
  }
};

exports.PutCaptorData = async (req, res, next) => {
  const currentDate = new Date();
  const updateAt = currentDate.toISOString();
  const temperature = req.query.temperature;
  const distance = req.query.distance;
  const humidite = req.query.humidite;
  const captorId = req.query.id;
  // Utilisez les données comme requis
  console.log("Température :", temperature);
  console.log("Distance :", distance);
  console.log("Humidité :", humidite);

  try {
    const ehtData = await prisma.captorData.update({
      where: {
        captorId,
      },
      data: {
        soilHumidity,
        ambiantTemp,
        SizePlant,
        updateAt,
      },
    });
  } catch (error) {}
};
exports.GetLastCaptorData = async (req, res, next) => {
  const ids = req.body.ids;
  console.log(req.body);
  try {
    const lastData = await prisma.captorData.findFirst({
      where: {
        captorId: {
          in: ids,
        },
      },
      orderBy: {
        createAt: "desc",
      },
    });
    console.log(lastData);
    return res.status(200).json({
      message: "You get successfully data",
      data: lastData,
    });
  } catch (error) {
    console.error(error);
  }
};
