```mermaid
graph TD;
    A[Usuario] -->|1. Envía acción (Agregar/Eliminar/Listar)| B[Frontend (JS)]
    B -->|2. Petición HTTP| C[Backend (Express)]
    C -->|3. Controlador procesa petición| D[ProductController]
    D -->|4. Solicita datos| E[ProductModel]
    E -->|5. Ejecuta consulta en BD| F[(Base de Datos)]
    F -->|6. Devuelve datos| E
    E -->|7. Responde al controlador| D
    D -->|8. Devuelve respuesta al frontend| C
    C -->|9. Envía datos JSON al frontend| B
    B -->|10. Renderiza productos en la UI| A
```
