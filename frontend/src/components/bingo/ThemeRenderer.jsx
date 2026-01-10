import React, { lazy, Suspense } from 'react';
import './themes/bingo-themes.css'; // Import theme-specific styles and fonts

// Lazy load themes to keep bundle size small
const BirthdayClassic = lazy(() => import('./themes/BirthdayClassic'));
const BirthdayPremium = lazy(() => import('./themes/BirthdayPremium'));
const WeddingClassic = lazy(() => import('./themes/WeddingClassic'));
const WeddingPremium = lazy(() => import('./themes/WeddingPremium'));
const PartyClassic = lazy(() => import('./themes/PartyClassic'));
const PartyPremium = lazy(() => import('./themes/PartyPremium'));
const CorporateClassic = lazy(() => import('./themes/CorporateClassic'));
const CorporatePremium = lazy(() => import('./themes/CorporatePremium'));

const themes = {
    // New mappings
    birthday_classic: BirthdayClassic,
    birthday_premium: BirthdayPremium,
    wedding_classic: WeddingClassic,
    wedding_premium: WeddingPremium,
    party_classic: PartyClassic,
    party_premium: PartyPremium,
    corporate_classic: CorporateClassic,
    corporate_premium: CorporatePremium,
};

const ThemeRenderer = ({
    themeId = 'birthday_classic',
    primaryColor,
    ...props
}) => {
    const SelectedTheme = themes[themeId] || BirthdayClassic;

    // Only pass accentColor if primaryColor is explicitly provided
    const themeProps = {
        ...props,
        themeId,
        primaryColor
    };

    // Add accentColor only if primaryColor is not null/undefined
    if (primaryColor) {
        themeProps.accentColor = primaryColor;
    }

    return (
        <Suspense fallback={
            <div style={{ width: '100%', height: '100%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="spin-m" />
            </div>
        }>
            <SelectedTheme {...themeProps} />
        </Suspense>
    );
};

export default ThemeRenderer;
export { themes };
