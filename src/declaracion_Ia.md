# Registro de consultas del proceso de investigación

| N.º | Consulta o prompt utilizado | Objetivo | Información o palabras clave obtenidas | Relación con la siguiente consulta |
|---|---|---|---|---|
| 1 | ¿Cómo implementar las funcionalidades del sistema de pedidos con NestJS y Prisma? | Identificar cómo desarrollar los requisitos del proyecto. | NestJS, Prisma, pedidos, productos y validaciones. | Permitió organizar las funcionalidades que debía implementar. |
| 2 | ¿Cómo evitar que un cliente tenga más de un pedido pendiente? | Impedir que un cliente registre varios pedidos pendientes. | `findFirst`, `nameClient`, `PENDING`. | Se continuó con la validación de productos. |
| 3 | ¿Cómo comprobar que el producto exista antes de crear un pedido? | Evitar pedidos de productos inexistentes. | `findByName`, `findUnique`, `NotFoundException`. | Se continuó con la validación del stock. |
| 4 | ¿Cómo validar que exista suficiente stock para realizar un pedido? | Evitar solicitudes superiores a las unidades disponibles. | `stock`, `quantityProduct`, `UnprocessableEntityException`. | Se revisó cómo descontar el stock. |
| 5 | ¿Cómo descontar automáticamente el stock al crear un pedido? | Actualizar el inventario después de cada pedido. | `update`, `decrement`. | Se continuó con los estados del pedido. |
| 6 | ¿Cómo agregar los estados PENDING, SHIPPED y RECEIVED? | Definir las etapas de un pedido. | Enum `OrderStatus`, `PENDING`, `SHIPPED`, `RECEIVED`. | Se modificó el modelo de Prisma. |
| 7 | ¿Cómo agregar el estado al modelo sin afectar los pedidos existentes? | Incorporar el nuevo campo en la base de datos. | Prisma Schema, migraciones y valor predeterminado. | Se continuó con el código de verificación. |
| 8 | ¿Cómo agregar un código de verificación a cada pedido? | Generar un código para verificar la recepción. | `verificationCode`, `String`, código aleatorio. | Se presentó un problema con los registros existentes. |
| 9 | ¿Cómo solucionar el error al agregar un campo obligatorio si ya existen pedidos? | Corregir la migración de la base de datos. | Campo nullable, valores temporales, `UPDATE`, `SET NOT NULL`. | Se ajustó el archivo SQL de la migración. |
| 10 | ¿Cómo solucionar el error P3018 de Prisma? | Corregir la migración fallida. | `P3018`, `migrate resolve --rolled-back`, `migrate dev`. | La migración se ejecutó correctamente. |
| 11 | ¿Cómo solucionar el error de TypeScript que indicaba que faltaba `verificationCode`? | Corregir la creación de pedidos. | `randomInt`, `crypto`, `verificationCode`, `TS2322`. | Se agregó la generación automática del código. |
| 12 | ¿Cómo implementar la función para enviar un pedido? | Cambiar el estado de pendiente a enviado. | `shipOrder`, `SHIPPED`, `PATCH`. | Se creó y probó el endpoint de envío. |
| 13 | ¿Cómo implementar la función para recibir un pedido? | Permitir recibir únicamente pedidos enviados. | `receiveOrder`, `RECEIVED`, validación de `SHIPPED`. | Se pasó a comprobar los estados con Postman. |
| 14 | ¿Cómo probar las funcionalidades desde Postman? | Verificar el funcionamiento del sistema. | `POST`, `GET`, rutas `/product` y `/order`. | Se comenzó probando la creación de productos. |
| 15 | ¿Cómo comprobar que un producto se creó correctamente? | Verificar el registro del producto. | Respuesta `201`, nombre, descripción y stock. | Se continuó con la creación de pedidos. |
| 16 | ¿Cómo crear un pedido desde Postman? | Comprobar el registro de un pedido. | `nameClient`, `nameProduct`, `quantityProduct`, `PENDING`. | Se verificó la generación del código. |
| 17 | ¿Cómo comprobar que el stock disminuya después de crear un pedido? | Verificar la actualización del inventario. | Stock inicial de 10, cantidad solicitada de 2 y stock final de 8. | Se probaron los casos de error. |
| 18 | ¿Qué sucede si solicito más unidades de las disponibles? | Comprobar la validación de stock insuficiente. | Respuesta `422`, `UnprocessableEntityException`. | Se continuó con productos inexistentes. |
| 19 | ¿Qué sucede si intento pedir un producto que no existe? | Comprobar que se rechacen productos inexistentes. | Respuesta `404`, `NotFoundException`. | Se probó la restricción de pedidos pendientes. |
| 20 | ¿Cómo comprobar que un cliente no pueda crear otro pedido pendiente? | Verificar que solo tenga un pedido pendiente. | Respuesta `422`, cliente y estado `PENDING`. | Se continuó con el envío del pedido. |
| 21 | ¿Cómo cambiar el estado de un pedido a enviado desde Postman? | Comprobar el endpoint de envío. | `PATCH /order/:id/ship`, estado `SHIPPED`. | Se comprobó la posibilidad de crear otro pedido. |
| 22 | ¿Cómo crear otro pedido para el mismo cliente después de enviar el anterior? | Verificar que pueda realizar un nuevo pedido. | Nuevo pedido, estado `PENDING` y stock disponible. | Se continuó con la prueba de recepción. |
| 23 | ¿Cómo comprobar que un pedido pendiente no se pueda recibir? | Evitar que se omita el estado de envío. | `receiveOrder`, estado `PENDING`, respuesta esperada `422`. | La prueba mostró un cambio inesperado a `RECEIVED`. |
| 24 | ¿Por qué el pedido cambió a recibido si todavía estaba pendiente? | Investigar el comportamiento inesperado del endpoint. | Revisión de `receiveOrder`, identificador y estado del pedido. | Quedó pendiente revisar el código y agregar la validación del código de verificación. |