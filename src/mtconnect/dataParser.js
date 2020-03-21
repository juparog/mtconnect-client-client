import convert from 'xml-js';

const agentRequests = {

    /*
        => Convierte un cadena con formato XML a un archivo con formato JSON.
            data: cadena de datos en formato XML
        <= Retorna una estrutura con:
            success: true indica exito ó false indicando error
            data: el resultado en formato json en caso de tener exito
    */
    getDataJson: (data) => {
        try {
            const result = convert.xml2js(data, {compact: true, spaces: 4});
            return {
                success: true,
                data: result
            };
        } catch (error) {
            return {
                success: false
            };
        }
    },

    /*
        =>  Analiza un cadena en formato JSON y con norma MTConnect y busca los dispositivos:
            MTConnectData: cadena de datos en formato json
        <=  Retorna una estructura de datos con:
            success: true indica exito ó false indicando error
            data: un array de dispositivos encontrados con sus nodos internos
    */
    getDevices: (MTConnectData) => {
        let devices = [];
        if(MTConnectData.MTConnectDevices){
            if(MTConnectData.MTConnectDevices.Devices){
                if(MTConnectData.MTConnectDevices.Devices.Device){
                    if(MTConnectData.MTConnectDevices.Devices.Device[0]){
                        devices = MTConnectData.MTConnectDevices.Devices.Device;
                    }else{
                        devices.push(MTConnectData.MTConnectDevices.Devices.Device);
                    }
                    return ({
                        success: true,
                        devices
                    });
                }
            }
        }
        return ({
            success: false
        });
    },

    /*
        =>  Analiza un cadena en formato JSON y busca nombres de los dispositivos:
            devices: cadena de dispositos en formato json
        <=  Retorna una estructura de datos con:
            success: true indica exito ó false indicando error
            name: un array de nombres para los dispositivos
    */
    getDeviceNames: (devices) => {
        let names = [];
        try {
            devices.forEach((device, index) => {
                if(device._attributes){
                    if(device._attributes.name){
                        names.push(device._attributes.name);
                    }else{
                        if(device._attributes.id){
                            names.push(device._attributes.id);
                        }else{
                            names.push('no_identificado_'+index);
                        }
                    }
                }else{
                    names.push('Device_'+index);
                }
            });
            return ({
                success: true,
                names
            });
        } catch (error) {
            return {
                success: false
            };
        }
    }
}
export default agentRequests;