# Technology Stack & Build System

## Core Technologies

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **PDF Generation**: jsPDF library with image handling capabilities
- **Image Processing**: Canvas API for optimization and thumbnail generation
- **File System**: File API for local image folder access
- **Styling**: CSS Grid, Flexbox, CSS custom properties, CSS animations

## Key Libraries & APIs

- **jsPDF**: Primary library for PDF document generation
- **Canvas API**: Image processing, thumbnail generation, and optimization
- **File API**: Reading local image folders and file handling
- **Intersection Observer API**: Lazy loading implementation
- **CSS Custom Properties**: Theming and consistent styling

## Browser Compatibility

- Target modern browsers with ES6+ support
- Graceful degradation for older browsers
- Cross-browser testing required for Chrome, Firefox, Safari, Edge

## Development Approach

- **Vanilla JavaScript**: No frameworks - prioritize broad compatibility and fast loading
- **Progressive Enhancement**: Basic functionality first, enhanced features after
- **Component-based Architecture**: Modular classes for Gallery, PDF Generator, etc.
- **Performance First**: Lazy loading, image optimization, memory management

## Common Commands

Since this is a vanilla web application, no build system is required:

- **Development**: Open `index.html` in browser or use local server
- **Testing**: Manual testing across browsers and devices
- **Deployment**: Static file hosting (no compilation needed)

## Code Quality Standards

- Use ES6+ features (classes, async/await, arrow functions)
- Implement proper error handling and user feedback
- Follow semantic HTML5 structure
- Use CSS custom properties for maintainable theming
- Write clean, readable JavaScript with proper commenting
