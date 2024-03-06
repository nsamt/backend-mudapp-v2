# Mudapp 
### Los Ángeles de Raúl

## Introducción
Nuestra aplicación se basa en un sistema de mudanzas inspirado en el funcionamiento de plataformas como Uber o Cabify.

El desarrollo de la misma se ha llevado a cabo con el framework de NestJS, conectándola con nuestra base de datos MySQL a través de TypeORM.

Aseguramos su funcionalidad mediante testing con Jest, como también documentamos su funcionalidad con Swagger, que a su vez nos permite probar esta plataforma.

## Herramientas y plataformas utilizadas

- Visual Studio Code.
- MySQL Workbench.
- Aiven (Cloud MySQL).
- Render para despliegue online.
- NodeJS.
- NestJS.
- TypeScript.
- TypeORM.
- Jira.
- Canva.
- Slack.
- Discord/Zoom.

## Modelo lógico de la base de datos
![library-model](https://imgur.com/STMsrbz.jpg)


## Instalación de la plataforma
### Para instalar el proyecto en local
Es necesario disponer de PNPM.
En caso de que no se haya instalado puede hacerse con la siguiente línea de código en terminal en Windows:

`iwr https://get.pnpm.io/install.ps1 -useb | iex`

O con la siguiente en sistemas POSIX:

`wget -qO- https://get.pnpm.io/install.sh | sh -`

Utilizando Git podemos clonar este repositorio para tenerlo en nuestro ordenador con el siguiente comando:
```bash
git clone https://github.com/projects-assignments/backend-mudapp-los-angeles-de-raul
```

Una vez instalado, abrimos un terminal en la carpeta clonada e instalamos sus dependencias:
```bash
pnpm install
```

Podremos ejecutar éste código con PNPM:
```bash
pnpm start
```

Una vez en ejecución, podremos acceder a [Swagger](http://localhost:3000/api) para visualizar sus endpoints y probarlos, o bien ponerlos a prueba desde [Postman](https://www.postman.com/downloads/).

La base de datos en la que realizaremos el CRUD (Create, Read, Update, Delete) se encuentra alojada en la nube, por lo que no es necesario instalarla.

### Para acceder al despliegue online
Disponible [aquí](https://backend-mudapp.onrender.com/).
Recordar que aún así será necesario ejecutar las peticiones desde [Postman](https://www.postman.com/downloads/) o [Swagger](https://backend-mudapp.onrender.com/api) para comprobar su funcionamiento.

## Recursos
[Diagrama de MySQL Workbench](https://github.com/projects-assignments/backend-mudapp-los-angeles-de-raul/blob/main/diagramabbdd.mwb)

[Fichero dump de la base de datos](https://github.com/projects-assignments/backend-mudapp-los-angeles-de-raul/blob/main/dump.sql)

[Presentación](https://www.canva.com/design/DAF7jhLY-iE/c4Bc9Jow3FGs--cYQxJ_zw/edit?utm_content=DAF7jhLY-iE)