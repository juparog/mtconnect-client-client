import convert from 'xml-js';

const dataParser = {
  /**
   * Convierte un string en formato xml a json.
   *
   * @param {Object} data Datos en formato xml
   * @return {Object} El resultado de la operacion, null si la operacion falla
   */
  getDataJson: (data) => {
    try {
      // Opciones para la conversion
      const options = {
        compact: true,
        spaces: 4,
        attributesKey: 'attributes',
        textKey: 'text',
      };
      const json = convert.xml2js(data, options);
      return json;
    } catch (error) {
      return null;
    }
  },

  /**
   * Analiza un cadena en formato JSON y busca los dispositivos.
   *
   * @param {Object} data Datos en fomato json
   * @return {Array} El resultado de la operacion
   */
  getDevices: (data) => dataParser.arrayFormat(data.Devices.Device),

  /**
   * Analiza un cadena en formato JSON y busca los stream.
   *
   * @param {Object} data Datos en fomato json
   * @return {Array} El resultado de la operacion
   */
  getStream: (data) => dataParser.arrayFormat(data.Streams.DeviceStream),

  /**
   * Esta funcion recibe y un datos verifica si es un array, si lo es entonces
   * devulve el mismo dato, sino lo devuelve como la primera posición de un array
   *
   * @param {Object} possibleArray Posible dato de tipo array
   * @return {Array} Resultado de la operación
   */
  arrayFormat: (possibleArray) => {
    if (possibleArray.length) {
      return possibleArray;
    }
    return [possibleArray];
  },
};

export default dataParser;
