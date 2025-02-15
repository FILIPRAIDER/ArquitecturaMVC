```mermaid
graph TD;
    A[Usuario] -->|Envia accion| B[Frontend (JS)];
    B -->|Realiza peticion HTTP| C[Backend (Express)];
    C -->|Procesa peticion| D[ProductController];
    D -->|Solicita datos| E[ProductModel];
    E -->|Ejecuta consulta en BD| F[(Base de Datos)];
    F -->|Devuelve datos| E;
    E -->|Responde al controlador| D;
    D -->|Devuelve respuesta al frontend| C;
    C -->|Envia datos JSON al frontend| B;
    B -->|Renderiza productos en la UI| A;
```
