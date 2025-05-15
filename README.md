# ChatbotApp - Prueba tecnica

En este repositorio podrán encontrar una aplicacion FullStack de chatbot como parte de solución para la prueba técnica de desarrollador Node.js. La aplicación permite a los usuarios interactuar con un modelo de lenguaje a través de una interfaz de chat.

## Estructura del Proyecto

```
/backend      -> Código del servidor (Node.js + Express + MySQL)
/frontend     -> Código de la interfaz (React)
```

---

## Requisitos Técnicos

### Backend
- Node.js
- Express.js
- MySQL
- Axios (para consumir la API de IA)

### Frontend
- React.js
- Axios
- CSS
---

## Funcionalidades

- Enviar mensajes a un modelo de IA mediante API externa.
- Visualizar el historial de mensajes entre el usuario y la IA.
- Almacenar todos los mensajes en una base de datos MySQL.
- Eliminar mensajes de historia y base de datos.
- Interfaz web responsive y amigable.

---

## Base de Datos

### Tabla: `messages`

| Campo       | Tipo                 | Descripción                         |
|-------------|----------------------|-------------------------------------|
| id_message  | INT, Primary Key     | Identificador del mensaje           |
| content     | TEXT                 | Contenido del mensaje               |
| sender      | ENUM('bot', 'user') | Remitente                           |
| timestamps  | DATETIME             | Fecha y hora del mensaje            |

---

## Instalación y Ejecución

### 1. Clona el repositorio

```bash
git clone https://github.com/jperezalv23/chatbotApp
cd chatbotApp
```

### 2. Backend

```bash
cd backend
npm install
```

#### Configura variables de entorno (`.env`)
```
MYSQLHOST=localhost
PORT=3000
MYSQLPORT=3306
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
MYSQLDATABASE=chatbotapp
VITE_API_URL=URL_BACKEND
```

#### Ejecutar el servidor
```bash
npm run dev
```

### 3. Frontend

```bash
cd ../frontend
npm install
npm run dev
```

---

## Despliegue 
La aplicacion ha sido desplegada por completo haciendo uso de las siguientes plataformas:

- **Frontend**: Vercel [https://chatbot-app-jade.vercel.app/](https://chatbot-app-jade.vercel.app/)
- **Backend**: Railway [https://chatbotapp-production-926c.up.railway.app/](https://chatbotapp-production-926c.up.railway.app/)

---

## Puntos Adicionales Implementados

✅ TypeScript  
✅ Modularización del código  
✅ Despliegue funcional en Vercel + Render  

---

## Rutas API Backend

| Método | Ruta         | Descripción                    |
|--------|--------------|--------------------------------|
| GET    | /messages    | Obtiene todos los mensajes     |
| POST   | /messages    | Crea y guarda un nuevo mensaje |
| DELETE | /messages    | Elimina todos los mensajes de la base de datos |

---

## Decisiones Técnicas

- Se optó por Axios para manejar peticiones tanto en frontend como backend.
- El backend implementa validaciones básicas antes de enviar la solicitud al modelo de IA.
- La UI fue diseñada para enfocarse en simplicidad y usabilidad.

---

## Autor

Desarrollado por [Juan Pablo Perez Alvarez]  
Correo: [juanpabloperez029@gmail.com]

---

Gracias por la oportunidad :)
