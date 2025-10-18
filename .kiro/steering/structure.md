# Project Structure & Organization

## Directory Structure

```
/
├── index.html              # Main landing page entry point
├── css/
│   ├── styles.css         # Main stylesheet with custom properties
│   ├── gallery.css        # Gallery-specific styles and grid layouts
│   └── responsive.css     # Media queries and responsive design
├── js/
│   ├── main.js           # Main application logic and initialization
│   ├── gallery.js        # ImageGallery class and gallery functionality
│   ├── pdf-generator.js  # PDFGenerator class and PDF creation logic
│   └── utils.js          # Utility functions and helpers
├── images/               # Sample images and static assets
├── lib/                  # Third-party libraries (jsPDF)
└── .kiro/               # Kiro configuration and specs
    ├── specs/           # Feature specifications
    └── steering/        # Project steering rules
```

## File Organization Principles

### HTML Structure

- **Single Page Application**: All content in `index.html` with semantic sections
- **Semantic HTML5**: Use proper section, article, header, nav elements
- **Landing Page Sections**: Hero, Gallery Preview, PDF Generation, Footer

### CSS Architecture

- **Modular Stylesheets**: Separate concerns across multiple CSS files
- **Custom Properties**: Use CSS variables for theming and consistency
- **Mobile-First**: Responsive design starting from mobile breakpoints
- **Component-Based**: Styles organized by component/section

### JavaScript Architecture

- **Class-Based Components**: Use ES6 classes for major functionality
- **Single Responsibility**: Each file handles one primary concern
- **Utility Functions**: Common helpers in dedicated utils file
- **Event-Driven**: Component communication through custom events

## Key Components

### Core Classes

- **ImageGallery**: Handles image loading, thumbnail generation, lightbox
- **PDFGenerator**: Manages PDF creation, layout calculation, download
- **ImageItem**: Represents individual images with metadata
- **GalleryState**: Application state management

### File Responsibilities

- **main.js**: Application initialization, component coordination, page interactions
- **gallery.js**: All gallery-related functionality and image handling
- **pdf-generator.js**: PDF creation logic and layout algorithms
- **utils.js**: File validation, image processing helpers, error handling

## Naming Conventions

- **Files**: kebab-case (e.g., `pdf-generator.js`, `responsive.css`)
- **Classes**: PascalCase (e.g., `ImageGallery`, `PDFGenerator`)
- **Functions/Variables**: camelCase (e.g., `generateThumbnail`, `currentIndex`)
- **CSS Classes**: kebab-case with BEM methodology where appropriate
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_IMAGE_SIZE`)

## Asset Management

- **Images**: Store sample/demo images in `/images/` folder
- **Libraries**: Third-party dependencies in `/lib/` folder
- **No Build Process**: Direct file references, no bundling required
