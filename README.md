```mermaid
graph TD
    A[Usuario] -->|Accion (Agregar/Eliminar/Listar)| B[Frontend (JS)]
    B -->|Peticion HTTP| C[Backend (Express)]
    C -->|Procesar peticion| D[Controlador (ProductController)]
    D -->|Solicitar datos| E[Modelo (ProductModel)]
    E -->|Consulta SQL| F[(Base de Datos)]
    F -->|Devuelve datos| E
    E -->|Respuesta al controlador| D
    D -->|Envio de datos al frontend| C
    C -->|Respuesta JSON| B
    B -->|Renderizar en UI| A
```
