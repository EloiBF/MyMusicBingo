---
trigger: always_on
---

# Bingo Theme Creation Rules

Follow these rules when creating or modifying bingo themes to ensure consistency, printability, and automated detection.

## 1. File Location & Detection
- Store themes in: `frontend/src/components/bingo/themes/`
- Use the extension: `.jsx` (REQUIRED for JSX and decorative support)
- Detection: Automated via `import.meta.glob('./*.jsx', { eager: true })` in `index.js`.

## 2. Structure
Export a configuration object. You can import React icons/components for background decorations.

```javascript
import React from 'react';
import { Icon } from 'lucide-react';

export default {
    id: 'theme_id',      // Unique identifier
    label: 'Theme Name', // Display name in UI
    category: 'Celebrations', // Grouping category
    font: "'Montserrat', sans-serif", // Main font
    background: {
        color: '#ffffff',
        elements: [
            { content: <Icon size={40} />, style: { top: '5%', left: '5%' } }
        ]
    },
    title: {
        content: 'THEME BINGO', // Default title content for this theme
        size: '42pt',
        weight: '800',
        color: '#1a1a1a',
        emojis: { left: '', right: '' }
    },
    grid: {
        gap: '16px',
        padding: '30px 15px',
        background: 'transparent'
    },
    cell: {
        shape: '12px',
        border: '2px solid #94a3b8', // High contrast is mandatory
        background: '#ffffff',
        shadow: 'none',
        offset: '15px'
    },
    song: { size: '10pt', weight: '700' },
    artist: { size: '8pt', weight: '600' }
};
```

## 3. Design Principles
1. **Full Coverage**: Background color/image covers the entire A4 page area. It can't be larger than the A4.
2. **High Contrast**: Borders MUST be clearly visible (avoid light grays like #f1f5f9).
3. **Printability**: Maintain a white/light main area to be ink-friendly. 
4. **Modularity**: One theme per file. Just drop a new .jsx file in the folder to register it.
