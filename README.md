# BomboplatsAdminPanel

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.3.

## Como ejecutarlo

Teneis que tener Angular instalado para ejecutar la aplicacion, y [Node.js](https://nodejs.org/es/download) para instalar Angular.
Este proyecto se ha creado con la version 21.2.3 del Angular CLI, recomendable tener la misma
Una vez este instalado, os clonais este repositorio en local y como dice abajo, ejecutais 'ng serve' para ejecutar en modo developer.

**IMPORTANTE** para ejecutarlo en modo developer tienes que tener tambien el proyecto de SpringBoot en ejecucion, ya que todas las peticiones las busca en localhost:8080. (Si por alguna razon quieres cambiarlo, en enviroments/enviroment.delevopment.ts esta la direccion, cambiala segun a lo que necesites).

Si quieres ejecutarlo accediendo directamente al servidor de produccion (cuando lo tengamos xd) entonces ejecuta 'ng build' y ahi mirará la direccion en enviroments/enviroment.ts (aunque actualmente apunta a un sitio que no existe lol)

Una vez ejectuada, la aplicacion se abrira en [localhost:4200](http://localhost:4200/)

La finalidad de esto es tener una forma facil de probar los endpoints junto a visualizar, añadir y editar los datos. Mejor esto que Swagger o abrir una conexcion con la BBDD.

Siempre que la aplicacion diga que ha habido un error, se mostrara en la consola del navegador, si no sabeis que pasa pasen captura.

Que os cunda

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
