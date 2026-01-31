import React from 'react';

const BingoCard = ({
    cardData,
    cardNumber,
    orientation = 'portrait',
    accentColor = '#3b82f6',
    title = 'MUSIC BINGO',
    eventTitle = 'My Party',
    columns = 3,
    rows = 3,
    isMini = false,
    transparentPage = false,
    gridSize = 'medium', // 'large', 'medium', 'small'
    themeConfig = {},
    // Layout options (defaults handled inside component)
    layoutConfig = {},
    titleConfig = {},
    gridConfig = {}
}) => {
    console.log('--- BingoCard Render ---');
    console.log('Props - rows:', rows, 'columns:', columns);
    console.log('cardData length:', cardData?.length);

    const isLandscape = orientation === 'landscape';

    // Grid size configurations with expanded multipliers
    // Grid size configurations
    const gridSizeConfig = {
        // Large: Standard layout (Reference)
        large: { multiplier: 1, gapMultiplier: 1, fontMultiplier: 1, paddingMultiplier: 1, shadowMultiplier: 1 },
        // Medium: Recalibrated for balance (Smaller cells, more padding)
        medium: { multiplier: 0.8, gapMultiplier: 0.8, fontMultiplier: 0.9, paddingMultiplier: 2.0, shadowMultiplier: 0.8 },
        // Small: Very compact (Much smaller cells, significant padding)
        small: { multiplier: 0.6, gapMultiplier: 0.6, fontMultiplier: 0.7, paddingMultiplier: 3.0, shadowMultiplier: 0.6 }
    };

    const sizeConfig = gridSizeConfig[gridSize] || gridSizeConfig.medium;

    // Merge layout configurations (Prop overrides Theme, Theme overrides Component Default)
    const effectiveLayout = {
        showMargin: layoutConfig.showMargin ?? themeConfig.layout?.showMargin ?? (themeConfig.card?.offset !== undefined && themeConfig.card?.offset !== '0' && themeConfig.card?.offset !== '0mm' ? true : (themeConfig.card?.offset === undefined ? true : false)),
        showBorder: layoutConfig.showBorder ?? themeConfig.layout?.showBorder ?? (!!themeConfig.card?.border),
        borderWidth: layoutConfig.borderWidth || themeConfig.card?.border?.split(' ')[0] || themeConfig.layout?.borderWidth || '1px',
        borderColor: layoutConfig.borderColor || themeConfig.card?.border?.split(' ').pop() || themeConfig.layout?.borderColor || themeConfig.defaultAccentColor || '#ddd'
    };

    const effectiveTitleConfig = {
        alignment: titleConfig.alignment || themeConfig.title?.textAlign || 'center',
        size: titleConfig.size || themeConfig.title?.size || 'medium',
        space: titleConfig.space || themeConfig.defaultTitleSpace || 'medium'
    };

    const effectiveGridConfig = {
        thickness: gridConfig.thickness || themeConfig.cell?.border?.split(' ')[0] || themeConfig.grid?.thickness || '1px',
        color: gridConfig.color || themeConfig.cell?.border?.split(' ').pop() || themeConfig.grid?.color || themeConfig.defaultAccentColor || '#ddd'
    };

    // Title Space Mapping
    // Controls the vertical proportion of the header vs grid in portrait mode.
    const titleSpaceMap = {
        small: { percent: '18%', baseSize: '54pt' },
        medium: { percent: '25%', baseSize: '78pt' },
        large: { percent: '33%', baseSize: '100pt' }
    };
    const activeTitleSpace = titleSpaceMap[effectiveTitleConfig.space] || titleSpaceMap.medium;

    // Title scale factors (User preference multiplier)
    const titleScaleMap = { small: 0.7, medium: 1, large: 1.3 };
    const titleScale = titleScaleMap[effectiveTitleConfig.size] || 1;

    // Helper to scale absolute values in strings (e.g. "10px", "12pt")
    const scaleVal = (val, multiplier, defaultVal = '0px') => {
        const str = val || defaultVal;
        return str.replace(/(-?\d+\.?\d*)(px|pt|rem|em|mm|cm)?/g, (match, num, unit) => {
            const scaled = parseFloat(num) * multiplier;
            return unit ? `${scaled}${unit}` : scaled;
        });
    };

    // Helper to scale complex CSS shadows
    const scaleShadow = (shadow, multiplier) => {
        if (!shadow || shadow === 'none') return shadow;
        return shadow.replace(/(-?\d+\.?\d*)px/g, (match, num) => {
            return `${parseFloat(num) * multiplier}px`;
        });
    };

    // Base scaling helpers bound to current sizeConfig
    const s = (v, defaultV) => scaleVal(v, sizeConfig.multiplier, defaultV);
    const sg = (v, defaultV) => scaleVal(v, sizeConfig.gapMultiplier, defaultV);
    const sp = (v, defaultV) => scaleVal(v, sizeConfig.paddingMultiplier, defaultV);
    const sf = (v, defaultV) => scaleVal(v, sizeConfig.fontMultiplier, defaultV);
    const ssh = (v) => scaleShadow(v, sizeConfig.shadowMultiplier);

    // Element Size Defaults (Base values before scaling)
    const elementSizes = {
        title: { small: '60pt', medium: '70pt', large: '80pt' },
        subtitle: { small: '20pt', medium: '25pt', large: '30pt' },
        song: { small: '12pt', medium: '14pt', large: '16pt' },
        artist: { small: '10pt', medium: '12pt', large: '14pt' },
        cardNumber: { small: '12pt', medium: '14pt', large: '16pt' },
        footer: { small: '10pt', medium: '12pt', large: '14pt' }
    };

    const resolveSize = (userSize, type) => {
        const map = elementSizes[type];
        // If userSize is 'small', 'medium', 'large', use map. Otherwise assume it's a direct value (e.g. '12pt') or null.
        return map[userSize] || userSize || map.medium;
    };

    // Helper function for decoration styling
    const getSvgDecorationStyle = (el) => {
        const baseOpacity = el.content?.props?.style?.opacity || 0.12;
        const decorationLevel = el.decorationLevel || 'subtle'; // 'subtle' or 'prominent'

        const opacityMap = {
            subtle: baseOpacity,
            prominent: baseOpacity * 1.5 // More visible for prominent decorations
        };

        return {
            opacity: opacityMap[decorationLevel],
            filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))',
            transition: 'opacity 0.3s ease'
        };
    };

    const config = {
        font: themeConfig.font || "'Montserrat', sans-serif",
        background: {
            color: themeConfig.background?.color || '#ffffff',
            image: themeConfig.background?.image || null,
            elements: themeConfig.background?.elements || []
        },
        title: {
            content: themeConfig.title?.content || null,
            font: themeConfig.title?.font || null,
            size: scaleVal(resolveSize(themeConfig.title?.size, 'title') || activeTitleSpace.baseSize, titleScale),
            weight: themeConfig.title?.weight || '800',
            color: themeConfig.title?.color || '#1a1a1a',
            shadow: ssh(themeConfig.title?.shadow || 'none'),
            overline: themeConfig.title?.overline || 'none',
            letterSpacing: s(themeConfig.title?.letterSpacing, '1pt'),
            textAlign: effectiveTitleConfig.alignment,
            textTransform: themeConfig.title?.textTransform || 'uppercase',
            emojis: {
                left: themeConfig.title?.emojis?.left || '',
                right: themeConfig.title?.emojis?.right || ''
            }
        },
        subtitle: {
            font: themeConfig.subtitle?.font || null,
            size: sf(resolveSize(themeConfig.subtitle?.size, 'subtitle')),
            weight: themeConfig.subtitle?.weight || '500',
            color: themeConfig.subtitle?.color || '#666',
            shadow: ssh(themeConfig.subtitle?.shadow || 'none'),
            overline: themeConfig.subtitle?.overline || 'none',
            letterSpacing: s(themeConfig.subtitle?.letterSpacing, '1pt'),
            textAlign: effectiveTitleConfig.alignment,
            background: themeConfig.subtitle?.background || 'transparent',
            padding: s(themeConfig.subtitle?.padding, '0'),
            borderRadius: s(themeConfig.subtitle?.borderRadius, '0')
        },
        grid: {
            gap: sg(themeConfig.grid?.gap, '16px'),
            padding: sp(themeConfig.grid?.padding, '30px 15px'),
            background: themeConfig.grid?.background || 'transparent'
        },
        cell: {
            shape: s(themeConfig.cell?.shape, '0px'),
            border: `${effectiveGridConfig.thickness} solid ${effectiveGridConfig.color}`,
            thickness: effectiveGridConfig.thickness,
            shadow: ssh(themeConfig.cell?.shadow || 'none'),
            offset: s(themeConfig.cell?.offset, '0px'),
            background: themeConfig.cell?.background || '#ffffff',
            textAlign: themeConfig.cell?.textAlign || 'center'
        },
        card: {
            border: effectiveLayout.showBorder ? `${effectiveLayout.borderWidth} solid ${effectiveLayout.borderColor}` : 'none',
            shadow: ssh(themeConfig.card?.shadow || 'none'),
            borderRadius: s(themeConfig.card?.borderRadius, '0px'),
            background: themeConfig.card?.background || 'transparent',
            offset: effectiveLayout.showMargin ? s(themeConfig.card?.offset, '10mm') : '0'
        },
        song: {
            font: themeConfig.song?.font || null,
            size: sf(resolveSize(themeConfig.song?.size, 'song')),
            weight: themeConfig.song?.weight || '700',
            color: themeConfig.song?.color || '#1a1a1a',
            shadow: ssh(themeConfig.song?.shadow || 'none'),
            background: themeConfig.song?.background || 'transparent',
            padding: s(themeConfig.song?.padding, '0'),
            borderRadius: s(themeConfig.song?.borderRadius, '0')
        },
        artist: {
            font: themeConfig.artist?.font || null,
            size: sf(resolveSize(themeConfig.artist?.size, 'artist')),
            weight: themeConfig.artist?.weight || '600',
            color: themeConfig.artist?.color || themeConfig.defaultAccentColor || '#3b82f6',
            shadow: ssh(themeConfig.artist?.shadow || 'none'),
            background: themeConfig.artist?.background || 'transparent',
            padding: isLandscape && themeConfig.artist?.background && themeConfig.artist?.background !== 'transparent' 
                ? s('2px 6px', '0')  // Padding más estrecho para horizontal
                : s(themeConfig.artist?.padding, '0'),
            borderRadius: s(themeConfig.artist?.borderRadius, '0')
        },
        cardNumber: {
            font: themeConfig.cardNumber?.font || null,
            size: sf(resolveSize(themeConfig.cardNumber?.size, 'cardNumber')),
            weight: themeConfig.cardNumber?.weight || '500',
            color: themeConfig.cardNumber?.color || '#888',
            textAlign: themeConfig.cardNumber?.textAlign || 'center',
            background: themeConfig.cardNumber?.background || 'transparent',
            padding: s(themeConfig.cardNumber?.padding, '5pt 0'),
            borderRadius: s(themeConfig.cardNumber?.borderRadius, '0')
        },
        footer: {
            text: themeConfig.footer?.text || 'BingoMusicMaker.com',
            font: themeConfig.footer?.font || null,
            size: sf(resolveSize(themeConfig.footer?.size, 'footer')),
            weight: themeConfig.footer?.weight || '500',
            color: themeConfig.footer?.color || '#999',
            textAlign: themeConfig.footer?.textAlign || 'center',
            letterSpacing: s(themeConfig.footer?.letterSpacing, '1pt'),
            background: themeConfig.footer?.background || 'transparent',
            padding: s(themeConfig.footer?.padding, '0'),
            borderRadius: s(themeConfig.footer?.borderRadius, '0'),
            margin: themeConfig.footer?.margin || 'auto 0 0 0'
        }
    };

    const getHorizontalPadding = (paddingStr) => {
        if (!paddingStr) return '15px';
        const parts = paddingStr.split(' ');
        return parts.length > 2 ? parts[3] : (parts.length > 1 ? parts[1] : parts[0]);
    };
    const hPadding = getHorizontalPadding(config.grid.padding);

    const styles = {
        page: {
            width: isLandscape ? '297mm' : '210mm',
            height: isLandscape ? '210mm' : '297mm',
            backgroundColor: transparentPage ? 'transparent' : config.background.color,
            backgroundImage: config.background.image ? `url(${config.background.image})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            fontFamily: config.font,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'visible', // Changed from hidden to visible
            margin: '0 auto',
            printColorAdjust: 'exact',
            WebkitPrintColorAdjust: 'exact',
            ...(isMini && { width: '100%', height: '100%' })
        },
        cardFrame: {
            width: effectiveLayout.showMargin ? `calc(100% - (${config.card.offset} * 2))` : '100%',
            height: effectiveLayout.showMargin ? `calc(100% - (${config.card.offset} * 2))` : '100%',
            background: config.card.background,
            border: config.card.border,
            borderRadius: config.card.borderRadius,
            boxShadow: config.card.shadow,
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: config.card.offset,
            left: config.card.offset,
            maxWidth: effectiveLayout.showMargin ? `calc(100% - (${config.card.offset} * 2))` : '100%',
            maxHeight: effectiveLayout.showMargin ? `calc(100% - (${config.card.offset} * 2))` : '100%',
            boxSizing: 'border-box',
            overflow: 'visible' // Changed from hidden to visible
        },
        header: {
            // Layout Split: In portrait, Header takes configured space, Grid takes the rest.
            flex: isLandscape ? '0 0 auto' : `0 0 ${activeTitleSpace.percent}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', // Vertically center the title in its 1/3 space

            padding: `20pt ${hPadding}`, // Added top padding for more space above title
            textAlign: config.title.textAlign,
            marginBottom: isLandscape ? scaleVal('15pt', sizeConfig.multiplier) : 0,
            position: 'relative',
            zIndex: 2,
        },
        title: {
            fontSize: config.title.size,
            fontWeight: config.title.weight,
            color: config.title.color,
            margin: '0 0 4pt 0',
            textTransform: config.title.textTransform,
            letterSpacing: config.title.letterSpacing,
            lineHeight: 1,
            fontFamily: config.title.font || config.font,
            textShadow: config.title.shadow,
            textDecoration: config.title.overline === 'overline' ? 'overline' : 'none',
            textAlign: config.title.textAlign,
            width: '100%'
        },
        subtitle: {
            fontSize: config.subtitle.size,
            color: config.subtitle.color,
            margin: '0',
            fontWeight: config.subtitle.weight,
            textTransform: 'uppercase',
            letterSpacing: config.subtitle.letterSpacing,
            fontFamily: config.subtitle.font || config.font,
            textShadow: config.subtitle.shadow,
            textDecoration: config.subtitle.overline === 'overline' ? 'overline' : 'none',
            textAlign: config.subtitle.textAlign,
            width: '100%',
            background: config.subtitle.background,
            padding: config.subtitle.padding,
            borderRadius: config.subtitle.borderRadius,
            display: config.subtitle.background !== 'transparent' ? 'inline-block' : 'block'
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gap: config.grid.gap,
            width: '100%',
            flexGrow: 1,
            zIndex: 2,
            padding: config.grid.padding,
            background: config.grid.background,
            boxSizing: 'border-box'
        },
        gridCell: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: config.cell.offset,
            boxSizing: 'border-box',
            background: config.cell.background,
            position: 'relative',
            textAlign: config.cell.textAlign,
            borderRadius: config.cell.shape,
            border: config.cell.border,
            boxShadow: config.cell.shadow,
            overflow: 'hidden'
        },
        song: {
            fontSize: config.song.size,
            fontWeight: config.song.weight,
            color: config.song.color,
            lineHeight: 1.1,
            marginBottom: '1pt',
            zIndex: 2,
            position: 'relative',
            fontFamily: config.song.font || config.font,
            textShadow: config.song.shadow,
            background: config.song.background,
            padding: config.song.padding,
            borderRadius: config.song.borderRadius,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
            maxWidth: '100%',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            textAlign: 'center'
        },
        artist: {
            fontSize: config.artist.size,
            color: config.artist.color,
            marginTop: '1pt',
            fontWeight: config.artist.weight,
            zIndex: 2,
            position: 'relative',
            fontFamily: config.artist.font || config.font,
            textShadow: config.artist.shadow,
            background: config.artist.background,
            padding: config.artist.padding,
            borderRadius: config.artist.borderRadius,
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
            maxWidth: '100%',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            textAlign: 'center'
        },
        cardNumber: {
            textAlign: config.cardNumber.textAlign,
            padding: config.cardNumber.padding,
            zIndex: 2,
            fontSize: config.cardNumber.size,
            fontWeight: config.cardNumber.weight,
            color: config.cardNumber.color,
            fontFamily: config.cardNumber.font || config.font,
            background: config.cardNumber.background,
            borderRadius: config.cardNumber.borderRadius,
            display: config.cardNumber.background !== 'transparent' ? 'inline-block' : 'block',
            margin: config.cardNumber.background !== 'transparent' ? '5pt auto' : '0'
        },
        footer: {
            fontSize: config.footer.size,
            fontWeight: config.footer.weight,
            color: config.footer.color,
            margin: config.footer.margin,
            textAlign: config.footer.textAlign,
            textTransform: 'uppercase',
            letterSpacing: config.footer.letterSpacing,
            zIndex: 1,
            fontFamily: config.footer.font || config.font,
            background: config.footer.background,
            padding: '0',
            borderRadius: config.footer.borderRadius,
            boxSizing: 'border-box',
            width: '100%'
        },
    };

    return (
        <div style={styles.page}>
            <div style={styles.cardFrame}>
                {/* Decorative elements */}
                {config.background.elements && config.background.elements.map((el, i) => {
                    const isDecorative = el.isDecorative === true;

                    // Extract opacity from various possible locations
                    const contentOpacity = el.content?.props?.style?.opacity ?? el.content?.props?.opacity;
                    const styleOpacity = el.style?.opacity;

                    // Priority: 
                    // 1. If isDecorative, use 1 or whatever is in el.style or content
                    // 2. If content or style has an explicit opacity, use that (no double-dipping)
                    // 3. Otherwise use default 0.12 or adjusted for decorationLevel

                    let finalOpacity = 1;
                    if (!isDecorative) {
                        const baseOpacity = contentOpacity ?? styleOpacity ?? 0.12;
                        const decorationMultiplier = el.decorationLevel === 'prominent' ? 1.5 : 1;
                        finalOpacity = baseOpacity * decorationMultiplier;
                    }

                    const containerStyle = {
                        position: 'absolute',
                        zIndex: 1, // Above background, below grid/header (which are zIndex: 2)
                        pointerEvents: 'none', // Decorations shouldn't block clicks
                        filter: isDecorative ? 'none' : 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))',
                        transition: 'opacity 0.3s ease',
                        ...el.style,
                        opacity: finalOpacity
                    };

                    // If we applied opacity to the container, and the content ALREADY has the same opacity,
                    // we might want to strip it from the content to avoid multiplication if it's a simple div/svg.
                    // However, for Lucide icons it's harder to strip.
                    // Better approach: if we found contentOpacity, we should probably set container opacity to 1 
                    // and let the content handle it, OR set content to opacity 1 and let container handle it.

                    // Strategy: If contentOpacity is present, we use it for the container and try to pass 
                    // opacity 1 to the content if it's a cloneable element.
                    let content = typeof el.content === 'function' ? el.content(config.artist.color) : el.content;

                    if (contentOpacity !== undefined && React.isValidElement(content)) {
                        // Ensure the inner element doesn't multiply the opacity if we already applied it to the container
                        try {
                            content = React.cloneElement(content, {
                                style: { ...(content.props.style || {}), opacity: 1 },
                                opacity: 1
                            });
                        } catch (e) {
                            // If clone fails, just keep original
                        }
                    }

                    return (
                        <div key={i} style={containerStyle}>
                            {content}
                        </div>
                    );
                })}

                <div style={styles.header}>
                    <h1 style={styles.title}>
                        {config.title.emojis.left && <span style={{ marginRight: '10px' }}>{config.title.emojis.left}</span>}
                        {config.title.content || title}
                        {config.title.emojis.right && <span style={{ marginLeft: '10px' }}>{config.title.emojis.right}</span>}
                    </h1>
                    <h2 style={styles.subtitle}>{eventTitle}</h2>
                </div>

                <div style={{
                    ...styles.grid,
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gridTemplateRows: `repeat(${rows}, 1fr)`
                }}>
                    {cardData && cardData.map((item, index) => (
                        <div key={index} style={styles.gridCell}>
                            <div style={styles.song}>{item.nom || item.name}</div>
                            <div style={styles.artist}>{item.artista || item.artist}</div>
                        </div>
                    ))}
                </div>

                {cardNumber && (
                    <div style={{ textAlign: 'center' }}>
                        <div style={styles.cardNumber}>
                            Card #{cardNumber}
                        </div>
                    </div>
                )}

                <div style={styles.footer}>
                    {config.footer.text}
                </div>
            </div>
        </div>
    );
};

export default BingoCard;
