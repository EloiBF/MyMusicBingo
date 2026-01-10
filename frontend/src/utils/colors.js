/**
 * Generates a unified 6-color palette for Bingo Themes.
 * 
 * 1. Text: Dark Grey/Black for main text.
 * 2. Background: White for the main card background.
 * 3. Base: A static neutral darker color (e.g. Slate/Dark Blue) that matches well.
 * 4. Accent: The dynamic color chosen by the user.
 * 5. Accent Light: A pastel version of the accent (for soft shadows/highlights).
 * 6. Accent Extra Light: A very faint/transparent version (for backgrounds/watermarks).
 */

export const generateThemePalette = (accentColor) => {

    // Helper to adjust hex brightness or alpha would be ideal, 
    // but for now we'll simulate opacity via RGB/RGBA if logical, 
    // or just assume the consumer handles opacity if they strictly need RGBA.
    // However, the user asked for calculated "derived" colors. 
    // Let's implement a simple Hex lightener.

    const lightenHex = (col, amt) => {
        let usePound = false;
        if (col[0] === "#") {
            col = col.slice(1);
            usePound = true;
        }
        let num = parseInt(col, 16);
        let r = (num >> 16) + amt;
        let b = ((num >> 8) & 0x00FF) + amt;
        let g = (num & 0x0000FF) + amt;

        if (r > 255) r = 255; else if (r < 0) r = 0;
        if (b > 255) b = 255; else if (b < 0) b = 0;
        if (g > 255) g = 255; else if (g < 0) g = 0;

        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
    };

    // Helper to get rgba string from hex
    const hexToRgba = (hex, alpha) => {
        let c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
        }
        return hex; // Fallback
    };

    // 1. Text (almost black)
    const text = '#1e293b'; // Slate 800

    // 2. Background
    const background = '#ffffff';

    // 3. Base (Static neutral - Slate 700)
    const base = '#334155';

    // 4. Accent (Primary)
    const accent = accentColor;

    // 5. Accent Light (Pastel - lighter calculation)
    // We can simulate "pastel" by mixing with white or just lowering opacity logic, 
    // but returning a HEX is safer for some CSS props. Let's lighten it significantly.
    // Actually, hexToRgba with 0.4 often looks like pastel on white.
    // User asked for "derived color... calculated automatically".
    // Let's use an opaque Hex if possible using the lighten function, or falls back to rgba string.
    // A pastel is basically high brightness.
    const accentLight = hexToRgba(accent, 0.4); // Used for shadows often

    // 6. Accent Very Light (Background decor)
    const accentExtraLight = hexToRgba(accent, 0.1);

    return {
        text,
        background,
        base,
        accent,
        accentLight,
        accentExtraLight,
        // Helper accessors if needed
        hexToRgba
    };
};
