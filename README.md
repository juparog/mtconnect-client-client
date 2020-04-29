# MTCONNECT CLIENT-CLIENT
---
Este proyecto trata la parte del cliente para una aplicacion web que permite una conexión a un agente mtconnect y la visualización de sus datos.

## Comenzando 🚀
---
Estas instrucciones le permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### Pre-requisitos 📋
  * ![test](https://git-scm.com/favicon.ico) **Git**. Para utilizar el control de versiones mediante linea de comandos con `$ git`, [Descargar Git](https://git-scm.com/downloads).
  
  * ![test](https://nodejs.org/favicon.ico) **Node JS**. Para descargar las dependencias del proyecto y ejecutar comandos con `$ npm`. [Descargar Node js](https://nodejs.org/es/download/).
  
  * ![test](https://github.com/favicon.ico) **MTconnect-client-server**. La api para solicitar y guardar algunos datos. [Instalar MTconnect-client-server](https://github.com/engineer-jrg/mtconnect-client-server).

### Instalación 🔧
Ejecute las siguientes instrucciones en order mediante la cli de su sitema operativo para poder obtener una copia del proyecto funcional.
  * Clonar el proyecto:
  ```sh
  git clone https://github.com/engineer-jrg/mtconnect-client-client.git
  ```
  * Moverse a la carpeta del proyecto:
  ```sh
  cd ./mtconnect-client-client
  ```
  * Instalar las dependencias necesarias:
  ```sh
  npm install
  ```

Si ejecuto todos estos comandos y no obtuvo ningun error usted ya tieneninstalado el proyecto en su máquina local correctamente.

## Configuración ⚙️
---
Configuración de las variables de entorno:
  * Se deben crear dos archivo en la ruta `config/environment/` con los siguientes nombres:
  para desarrollo: `.env.development.json
  para producción: ".env.production.json"

  * En cada archivo se debe crear la configuración de cada ambiente, se puede usar como guía el archivo de esquema ubicado en la ruta `config/environment/schema.js`. La configuración de ambientes se hace en formto JSON, a continuación se muestra una ejemplo de como se veria un archivo de estos:

  ```javascript
  // .env.development.json
  {
      "env": "development",
      "port": 3000,
      "reactApp": {
        "apiUri": "http://la/url/de/la/api/MTconnect/client/server"
      }
  }
  ```

## Despliegue 📦
---
Puede desplegar la aplicacion en dos modos: producción y desarrollo,ejecutando los siguientes comandos:

**Para desarrollo** ☔
  * Lanzar la aplicación:
  `npm run start:dev`
  * Construir la aplicación:
  `npm run build:dev`

**Para producción** ☕
  * Lanzar la aplicación:
  `npm run start:prod`
  * Construir la aplicación:
  `npm run build`

**Desplegar con el servidor express** 🕋
La aplicación puede desplegarce con un servidor express el cual esta configurado en el archivo `server.js` ubicado en la raiz del proyecto siguiendo estos pasos:
  * Contruir la aplicacion en cualquiera de los modos anteriores:
  `npm run build`
  ó
  `npm run build:dev`
  * Lanzar el servidor
  `npm start`

## Construido con 🛠
---
  * [**React**](https://es.reactjs.org/) - Biblioteca de JavaScript para construir la interfaz
  * [**Webpack**](https://webpack.js.org/) - Componente para construir la aplicación javascript.
  *  [**Eslint**](https://eslint.org/) - Dependencia para estandarizar y regular el código.

## Wiki 📖
---
Podra encontrar más detalles de como usar la aplicación aquí [Wiki](https://eslint.org/) (proximamente...)

## Versionado 📌
---
Se usa [Git](https://github.com/) para el versionado y Github como alojamiento remoto para el proyecto. Para mirar todas las versiones disponibles desde aquí [Tags](https://github.com/engineer-jrg/mtconnect-client-client/tags)

## Autores ✒️
---
  * ![](https://avatars3.githubusercontent.com/u/20565331?s=50&u=a2ff3ce90ae29ad6515ab7415993f86b7588f9b9&v=4) **Efrain Rodriguez** - _Sponsor_ - [EfrainRodriguez](https://github.com/EfrainRodriguez). ![test](https://git-scm.com/favicon.ico)
  
  * ![](https://avatars2.githubusercontent.com/u/58745412?s=50&u=6f39dce34dda3cec7ca7eedb6981225e34b46a0a&v=4) **Juan Rodriguez** - _Developer_ - [engineer-jrg](https://github.com/engineer-jrg).
  
## Licencia 📄
---
Este proyecto está bajo la Licencia (Por definir) - mira el archivo LICENSE.md para detalles

## Expresiones de Gratitud 🎁
---
  * Los desarrolladores de [cppagent](https://github.com/mtconnect/cppagent), el cual fue el agente mtconnect utilizado para desarrollar las pruebas 📦.
  * [**Efrain Rodriguez**](https://github.com/EfrainRodriguez) por el patrocinio y el apoyo durante su desarrollo 💪.
