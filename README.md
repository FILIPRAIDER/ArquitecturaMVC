```mermaid
graph TD;
    A[Usuario] -->|Accion: Agregar/Eliminar/Listar| B[Frontend JS]
    B -->|Peticion HTTP| C[Backend Express]
    C -->|Procesar solicitud| D[Controlador ProductController]
    D -->|Solicitar datos| E[Modelo ProductModel]
    E -->|Consulta SQL| F[Base de Datos]
    F -->|Devuelve datos| E
    E -->|Envio de datos al controlador| D
    D -->|Respuesta JSON| C
    C -->|Enviar datos al frontend| B
    B -->|Actualizar interfaz| A
