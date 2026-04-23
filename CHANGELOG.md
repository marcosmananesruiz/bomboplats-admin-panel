# Bomboplats v1.1

## Cambios:
- Todos los componentes que mostraban y manejaban Icon Urls ahora manejan imagenes como tal y no solo un string
- PedidoAdder ahora solo permite introducir las modificaciones que son aceptadas por el plato seleccionado
- Todos los formularios ya no descolocan toda la pantalla una vez se hacen demasiado grandes
- Se ha implementado un sistema de rutas (En la url vereis ahora que aparece /adder, /display o /editor segun donde esteis)

## Manejo de Imagenes
- Ahora a los **Platos** y a los **Restaurantes** puedes pasarle la imagen directamente en el formulario cuando los creas.
- Tambien puedes cambiar la foto de **Usuarios**, **Platos** y **Restaurantes** cuando los editas
- Siempre que haya una opcion de Icono en los formularios, van a tener un botón al lado para **mostrar** la imagen seleccionada
  -# Esto abre el enlace de esa foto en el S3. Si no existe, os dará un error :P
- Ahora tambien se asignan una foto a los **Platos** cuando los crean sin pasarle ninguna foto
- Ahora cuando estas editando un **Restaurante**, no puedes dejarlo sin fotos, tiene que tener minimo 1.
- **IMPORTANTE**: Todo lo relacionado con **añadir una imagen nueva** solo va a funcionar si estais ejecutando el panel en modo **PRODUCCION**. (Es decir, contra el servidor real, y no el de pruebas)

## PedidoAdder & PedidoEditor
- Ahora estos componentes consultan el plato que esta seleccionado para montar un selector de modificaciones, en vez de que el usuario metiera lo que quisiera.
- Una vez esta puesta una modificacion, intentar poner la misma da un error

## Rutas
- Ahora se puede acceder directamente a alguno de las 3 opciones del panel desde la URL tambien.
  - **/adder** -> Sección de "Añadir"
  - **/display** -> Sección de "Mostrar"
  - **/editor** -> Sección de "Editar"
