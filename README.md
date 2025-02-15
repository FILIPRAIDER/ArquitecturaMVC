```mermaid
graph TD;
    A[Usuario] -->|1. Envia accion (Agregar/Eliminar/Listar)| B[Frontend (JS)]
    B -->|2. Peticion HTTP| C[Backend (Express)]
    C -->|3. Controlador procesa peticion| D[ProductController]
    D -->|4. Solicita datos| E[ProductModel]
    E -->|5. Ejecuta consulta en BD| F[(Base de Datos)]
    F -->|6. Devuelve datos| E
    E -->|7. Responde al controlador| D
    D -->|8. Devuelve respuesta al frontend| C
    C -->|9. Envia datos JSON al frontend| B
    B -->|10. Renderiza productos en la UI| A
```
