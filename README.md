# Tienda de Joyas API

La API de Tienda de Joyas es un servicio RESTful que permite a los clientes interactuar con una base de datos de joyas para realizar consultas, obtener información detallada, y navegar a través de un catálogo de productos.

## Rutas Disponibles

| Método | Ruta | Descripción | Ejemplo de uso |
| ------ | ---- | ----------- | -------------- |
| GET | `/joyas` | Retorna todas las joyas en la base de datos con estructura HATEOAS. | `http://localhost:3000/joyas` |
| GET | `/joyas/categoria/:categoria` | Retorna joyas filtradas por la categoría especificada. | `http://localhost:3000/joyas/categoria/collar` |
| GET | `/joyas/:id` | Retorna una joya específica por su ID. | `http://localhost:3000/joyas/1` |
| GET | `/joyas?sort=value_asc` | Retorna todas las joyas ordenadas por su valor de forma ascendente. | `http://localhost:3000/joyas?sort=value_asc` |
| GET | `/joyas?sort=value_desc` | Retorna todas las joyas ordenadas por su valor de forma descendente. | `http://localhost:3000/joyas?sort=value_desc` |
| GET | `/joyas?page=1&pageSize=10` | Retorna las joyas paginadas según los parámetros `page` y `pageSize`. | `http://localhost:3000/joyas?page=2&pageSize=6` |
| GET | `/joyas/search` | Retorna joyas que coinciden con los parámetros de búsqueda especificados en la consulta. | `http://localhost:3000/joyas/search?name=Collar&metal=oro` |


## Consideraciones Adicionales

- Asegúrate de tener la base de datos configurada y el servidor en ejecución antes de intentar realizar las solicitudes.
- Todas las rutas son relativas al host y puerto donde se esté ejecutando la API.


## Pruebas Automatizadas

Las pruebas automatizadas de este proyecto se han implementado utilizando Jest junto con Supertest para probar los endpoints de la API de Joyas. Estas pruebas verifican tanto la funcionalidad básica como los casos de uso más complejos y los posibles errores.

### Ejecutar Pruebas

Para ejecutar las pruebas, utiliza el siguiente comando:

```bash
npm test
```
Este comando ejecutará todas las pruebas definidas en los archivos de pruebas, asegurando que cada aspecto de la API funciona como se espera.


### 1. Prueba de Lista de Joyas:

Verifica que el endpoint /joyas retorne un estado HTTP 200 y una lista de objetos de joyas.

```
// Ejemplo de prueba para obtener joyas
test('GET /joyas - Debe retornar un status 200 y un array de joyas', async () => {
    const response = await request.get('/joyas');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
});
```
### 2. Prueba de Paginación: 

Confirma que el endpoint de joyas soporta la paginación adecuadamente, devolviendo el número esperado de joyas por página.

```
// Ejemplo de prueba para paginación
test('GET /joyas - Debe aplicar paginación correctamente', async () => {
    const response = await request.get('/joyas?page=1&pageSize=5');
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(5);
});

```

### 3. Prueba de Filtrado:

 Evalúa la capacidad de filtrar las joyas por categoría y metal, asegurando que el filtro funcione correctamente.

```
// Ejemplo de prueba para filtrar joyas por metal y categoría
test('GET /joyas/search - Debe filtrar correctamente por metal y category', async () => {
    const response = await request.get('/joyas/search?metal=oro&category=collar');
    expect(response.status).toBe(200);
    expect(response.body.every(j => j.metal === 'oro' && j.category === 'collar')).toBe(true);
});


```

### 4. Prueba de Joya Inexistente:

Verifica que el endpoint retorne un mensaje de error adecuado cuando se busca una joya que no existe.

```
// Ejemplo de prueba para una joya que no existe
test('GET /joyas/:id - Debe retornar un mensaje de error si la joya no existe', async () => {
    const response = await request.get('/joyas/9999'); // Suponiendo que 9999 no es un ID válido
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Joya no encontrada');
});


```



