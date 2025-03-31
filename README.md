# 🧩 Editor de Parrilla

**Editor visual para construir parrillas de productos**, desarrollado como solución al caso práctico Frontend Tools 2022 de ITX.

---

## 🔗 Demo en línea

👉 [Probar aplicación en vivo](https://startling-cobbler-37462b.netlify.app/)

---

## 🚀 Funcionalidades

✅ Agregar múltiples filas  
✅ Arrastrar y soltar productos en filas  
✅ Máximo 3 productos por fila  
✅ Alineación por fila (Izquierda / Centro / Derecha)  
✅ Eliminar productos de filas  
✅ Productos usados desaparecen del pool superior  
✅ Compartir el estado de la parrilla mediante la URL  
✅ Botones para guardar y reiniciar parrilla  
✅ Carga de productos dinámica desde `products.json`  
✅ Interfaz en español  
✅ Totalmente responsivo

---

## 🖥️ Tecnologías utilizadas

- React + TypeScript
- Vite
- SCSS
- Netlify (deploy)
- JSON como fuente de datos

---

## 📦 Instalación local

1. Clona el repositorio:

```bash
git clone https://github.com/tontini-dev/-parrilla-editor.git
cd -parrilla-editor
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el entorno de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 📁 Estructura de productos

Los productos se cargan desde el archivo `public/products.json`.  
Puedes añadir tantos productos como desees, con el siguiente formato:

```json
[
  {
    "id": "p1",
    "name": "Jeans azules",
    "image": "https://picsum.photos/200?random=1",
    "price": "36,87 EUR"
  }
]
```

---

## 🔗 Compartir estado vía URL

El estado de la parrilla se codifica automáticamente en la URL.  
Cualquier usuario que abra un enlace como este:

```
https://startling-cobbler-37462b.netlify.app/?state=eyJpZCI6InJvdy0xIiw...
```

Verá la parrilla tal como fue creada.

---

## 🧠 Notas técnicas

- Productos se cargan de forma asíncrona antes de inicializar el estado
- Renderización protegida por estado `loading`
- Al eliminar un producto de una fila, vuelve a estar disponible en el pool
- Código tipado 100% con TypeScript
- Se evitaron dependencias externas para drag & drop (nativo)

---

## 📸 Captura de pantalla

> _(Puedes agregar aquí una imagen si quiser mostrar visualmente el resultado)_

---

## 👨‍💻 Autor

Desarrollado por [Matheus Lara Tontini](https://tontini.dev)