// Dependencias
const convert = require('xml-js');

/*
    => Convierte un cadena con formato XML a un archivo con formato JSON.
        data: cadena de datos en formato XML
    <= Retorna una estrutura con:
        success: true indica exito ó false indicando error
        data: el resultado en formato json en caso de tener exito
*/
const getDataJson = (data) => {
  try {
    const options = {
      compact: true,
      spaces: 4,
      attributesKey: 'attributes',
      textKey: 'text',
    };
    const result = convert.xml2js(data, options);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

/*
    =>  Analiza un cadena en formato JSON y con norma MTConnect y busca los dispositivos:
        MTConnectData: cadena de datos en formato json
    <=  Retorna una estructura de datos con:
        success: true indica exito ó false indicando error
        data: un array de dispositivos encontrados con sus nodos internos
*/
const getDevices = (data) => {
  let devices = [];
  if (data.Devices) {
    if (data.Devices.Device) {
      if (data.Devices.Device[0]) {
        devices = data.Devices.Device;
      } else {
        devices.push(data.Devices.Device);
      }
      return ({
        success: true,
        devices,
      });
    }
  }
  return ({
    success: false,
    devices: {},
  });
};

/*
    =>  Analiza un cadena en formato JSON y busca nombres de los dispositivos:
        devices: cadena de dispositos en formato json
    <=  Retorna una estructura de datos con:
        success: true indica exito ó false indicando error
        name: un array de nombres para los dispositivos
*/
const getDeviceNames = (devices) => {
  const names = [];
  try {
    devices.forEach((device, index) => {
      if (device.attributes) {
        if (device.attributes.name) {
          names.push(device.attributes.name);
        } else if (device.attributes.id) {
          names.push(device.attributes.id);
        } else {
          names.push(`no_identificado_${index}`);
        }
      } else {
        names.push(`Device_${index}`);
      }
    });
    return ({
      success: true,
      names,
    });
  } catch (error) {
    return {
      success: false,
      names: {},
    };
  }
};

exports.getDataJson = getDataJson;
exports.getDevices = getDevices;
exports.getDeviceNames = getDeviceNames;
