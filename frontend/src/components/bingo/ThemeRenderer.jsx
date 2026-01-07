import React, { lazy, Suspense } from 'react';

// Lazy load themes to keep bundle size small
const Classic = lazy(() => import('./themes/Classic'));
const Modern = lazy(() => import('./themes/Modern'));
const Retro = lazy(() => import('./themes/Retro'));
const PartyBasic = lazy(() => import('./themes/PartyBasic'));
const BirthdayBasic = lazy(() => import('./themes/BirthdayBasic'));
const WeddingBasic = lazy(() => import('./themes/WeddingBasic'));
const CorporateBasic = lazy(() => import('./themes/CorporateBasic'));
const Christmas = lazy(() => import('./themes/Christmas'));
const BabyShower = lazy(() => import('./themes/BabyShower'));
const Graduation = lazy(() => import('./themes/Graduation'));
const Dance = lazy(() => import('./themes/Dance'));
const PartyPremium1 = lazy(() => import('./themes/PartyPremium1'));
const PartyPremium2 = lazy(() => import('./themes/PartyPremium2'));
const BirthdayPremium1 = lazy(() => import('./themes/BirthdayPremium1'));
const BirthdayPremium2 = lazy(() => import('./themes/BirthdayPremium2'));
const WeddingPremium1 = lazy(() => import('./themes/WeddingPremium1'));
const WeddingPremium2 = lazy(() => import('./themes/WeddingPremium2'));
const CorporatePremium1 = lazy(() => import('./themes/CorporatePremium1'));
const CorporatePremium2 = lazy(() => import('./themes/CorporatePremium2'));

const themes = {
    classic: Classic,
    modern: Modern,
    retro: Retro,
    party_basic: PartyBasic,
    birthday_basic: BirthdayBasic,
    wedding_basic: WeddingBasic,
    corporate_basic: CorporateBasic,
    christmas: Christmas,
    baby_shower: BabyShower,
    graduation: Graduation,
    dance: Dance,
    party_premium_1: PartyPremium1,
    party_premium_2: PartyPremium2,
    birthday_premium_1: BirthdayPremium1,
    birthday_premium_2: BirthdayPremium2,
    wedding_premium_1: WeddingPremium1,
    wedding_premium_2: WeddingPremium2,
    corporate_premium_1: CorporatePremium1,
    corporate_premium_2: CorporatePremium2,
};

const ThemeRenderer = ({
    themeId = 'classic',
    ...props
}) => {
    const SelectedTheme = themes[themeId] || Classic;

    return (
        <Suspense fallback={
            <div style={{ width: '100%', height: '100%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="spin-m" />
            </div>
        }>
            <SelectedTheme {...props} themeId={themeId} />
        </Suspense>
    );
};

export default ThemeRenderer;
export { themes };
