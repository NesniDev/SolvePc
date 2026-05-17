# Backend Notes - SolvePc

## Endpoints Sugeridos para el Backend

### 1. Búsqueda y Filtrado

```http
GET /api/solutions              # Listar todas las soluciones
GET /api/solutions?search=      # Buscar soluciones por texto
GET /api/solutions?category=    # Filtrar por categoría (OS, Red, Hardware, etc.)
GET /api/solutions?difficulty=  # Filtrar por dificultad
GET /api/solutions/:slug        # Obtener solución específica
```

### 2. Diagnóstico Inteligente

```http
POST /api/diagnose
Body: { symptoms: string[], category?: string }
Response: { solutions: Solutions[], confidence: number }
```

### 3. Estadísticas y Métricas

```http
GET /api/stats              # Estadísticas generales
GET /api/stats/popular      # Soluciones más vistas
GET /api/stats/trending     # Búsquedas trending
GET /api/stats/category/:category  # Stats por categoría
```

### 4. Feedback de Usuarios

```http
POST /api/solutions/:slug/feedback  # Enviar feedback de solución
Body: { helpful: boolean, comment?: string }

GET /api/solutions/:slug/views  # Incrementar contador de vistas
```

### 5. Categorías y Filtros

```http
GET /api/categories             # Listar categorías disponibles
GET /api/categories/:name/solutions  # Soluciones por categoría
GET /api/difficulties           # Listar niveles de dificultad
```

### 6. Errores Comunes

```http
GET /api/errors           # Listar errores comunes
GET /api/errors/:code     # Buscar error por código
POST /api/errors/report   # Reportar nuevo error
```

### 7. Usuario (si implementas auth)

```http
GET /api/user/history         # Historial de búsquedas
POST /api/user/bookmarks      # Guardar solución favorita
GET /api/user/bookmarks       # Ver guardadas
DELETE /api/user/bookmarks/:id # Eliminar bookmark
```

---

## Estructura Sugerida para `backend/index.js`

```javascript
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/api/solutions', getSolutions);
app.get('/api/solutions/:slug', getSolutionBySlug);
app.post('/api/diagnose', diagnose);
app.get('/api/stats', getStats);
app.get('/api/categories', getCategories);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
```

---

## Endpoints Prioritarios (MVP)

Para comenzar con el proyecto, se recomienda implementar en este orden:

1. **`GET /api/solutions`** - Para servir las soluciones desde el backend en lugar de archivos mock
2. **`GET /api/solutions/:slug`** - Para páginas individuales de soluciones
3. **`GET /api/categories`** - Para el filtro de categorías
4. **`POST /api/diagnose`** - Para funcionalidad estrella de diagnóstico

---

## Modelo de Datos Sugerido

```typescript
interface Solution {
  title: string;
  slug: string;
  description: string;
  category: "OS" | "Red" | "Rendimiento" | "Virus" | "Hardware" | "Software";
  difficulty: "Fácil" | "Intermedio" | "Avanzado";
  image: string;
  explain: {
    title: string;
    description: string;
    photo: string;
    commonErrors: CommonErrors[];
    prerequisites: string[];
    steps: string[];
    terminal: string;
  };
}

interface CommonErrors {
  code: string;
  label: string;
  percentage: number;
}
```

---

## Consideraciones

- Usar Express 5.2.1 (ya instalado en dependencias)
- El backend es un proyecto separado del frontend
- Puerto sugerido: `3000`
- CORS debe estar habilitado para conectar con el frontend en `localhost:4321`
