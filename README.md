# FormularioOpticaBootstrap

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding# Formulario Óptica Boops - Documentación

Aplicación de formulario para solicitud de información de productos ópticos desarrollada en Angular 21 con Bootstrap 5.

## 🎯 Características

### Campos del Formulario:

1. **Nombre*** (obligatorio)
   - Mínimo 2 caracteres, máximo 100
   - Validación en tiempo real

2. **Email*** (obligatorio)
   - Formato de email válido
   - Máximo 100 caracteres

3. **Teléfono** (opcional)
   - Debe empezar por 6, 7, 8 o 9
   - 9 dígitos en total
   - Validación solo si se completa

4. **Código Postal*** (obligatorio)
   - 5 dígitos numéricos
   - Calcula automáticamente la provincia

5. **Provincia** (calculado automáticamente)
   - Se completa al introducir los 2 primeros dígitos del CP
   - 52 provincias españolas

6. **Tipo de Producto*** (obligatorio)
   - Radio buttons: Gafas o Lentes de contacto
   - Por defecto: Gafas

7. **Dolencias*** (obligatorio)
   - Select múltiple
   - Opciones: Miopía, Astigmatismo, Ojos cansados, Hipermetropía

8. **Fecha deseada*** (obligatorio)
   - Formato de fecha
   - Debe ser a partir del día siguiente
   - Tooltip con indicación

9. **Comentarios** (opcional)
   - Área de texto
   - Máximo 250 caracteres
   - Contador de caracteres

10. **Aceptar condiciones*** (obligatorio)
    - Checkbox obligatorio
    - Link a modal con términos y condiciones

### ✨ Funcionalidades:

- **Validación inline**: Clases Bootstrap (is-valid/is-invalid) con feedback inmediato
- **Validación por campo**: Mensajes de error específicos bajo cada campo
- **Modal de errores**: Si el formulario tiene errores al enviar, se muestra un modal con todos los errores listados
- **Modal de condiciones**: Al hacer clic en "condiciones" se abre un modal con los términos
- **Modal de éxito**: Tras enviar correctamente, muestra todos los datos enviados
- **Botón Reset**: Limpia el formulario y restaura valores por defecto
- **Cálculo automático de provincia**: Basado en los 2 primeros dígitos del CP
- **Diseño responsive**: Adaptado a diferentes tamaños de pantalla

### 🎨 Diseño:

- Header negro con el título "Optica Boops" (similar a la imagen)
- Card con sombra para el formulario
- Sección "Información" como título del formulario
- Validación visual con colores Bootstrap
- Iconos de validación en los campos
- Modales con colores distintivos (rojo para errores, verde para éxito)

## 🚀 Ejecución

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

Abrir navegador en: `http://localhost:4200/`

## 📋 Validaciones Implementadas

### Validadores personalizados:

1. **validarTelefono**: Verifica formato español (6-9 seguido de 8 dígitos)
2. **validarCP**: Verifica 5 dígitos y que corresponda a una provincia válida
3. **validarFecha**: Verifica que sea a partir de mañana

### Validadores Angular:

- `Validators.required` - Campos obligatorios
- `Validators.email` - Formato email
- `Validators.minLength` - Longitud mínima
- `Validators.maxLength` - Longitud máxima
- `Validators.pattern` - Expresiones regulares
- `Validators.requiredTrue` - Checkbox obligatorio

## 🛠️ Tecnologías

- **Angular 21** - Framework principal
- **TypeScript** - Lenguaje de programación
- **Bootstrap 5.3.2** - Framework CSS
- **Reactive Forms** - Manejo de formularios
- **Bootstrap Modals** - Ventanas modales

## 📝 Estructura del Proyecto

```
src/
├── app/
│   ├── app.ts          # Lógica del componente
│   ├── app.html        # Template del formulario
│   ├── app.css         # Estilos personalizados
│   └── app.config.ts   # Configuración
├── index.html          # HTML principal con Bootstrap CDN
└── main.ts             # Punto de entrada
```

## 🎯 Características Técnicas

- **Formularios Reactivos**: Uso de FormBuilder y FormGroup
- **Validaciones Custom**: Funciones de validación personalizadas
- **Two-way Binding**: Para select múltiple
- **Event Handling**: Gestión de eventos del formulario
- **DOM Manipulation**: Para los modales de Bootstrap
- **Responsive Design**: Media queries y clases Bootstrap
- **TypeScript Strict**: Tipado fuerte en todo el código

## 📖 Guía de Uso

1. **Completar campos obligatorios** (marcados con *)
2. **El CP calcula automáticamente** la provincia
3. **Seleccionar tipo de producto** (Gafas o Lentes)
4. **Elegir dolencias** (mantener Ctrl para selección múltiple)
5. **Elegir fecha** a partir de mañana
6. **Aceptar condiciones** (ver modal con los términos)
7. **Enviar formulario**:
   - Si hay errores: Modal rojo con lista de errores
   - Si es correcto: Modal verde con datos enviados
8. **Reset** para limpiar el formulario

## 🔍 Detalles de Implementación

### Cálculo de Provincia
El array de provincias está mapeado con los códigos postales españoles (01-52). Al introducir el CP, se extraen los 2 primeros dígitos y se busca la provincia correspondiente.

### Fecha Mínima
Se calcula dinámicamente sumando 1 día a la fecha actual en el `ngOnInit`.

### Modales
Se utilizan los modales nativos de Bootstrap 5, controlados desde TypeScript mediante la API de Bootstrap.

### Validaciones en Tiempo Real
Los campos se validan mientras el usuario escribe (dirty/touched) mostrando feedback visual inmediato.

## 👨‍💻 Autor

Desarrollado como práctica de Angular para el módulo de Desarrollo de Interfaces Web.


Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
