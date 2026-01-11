import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Globe, Ruler } from 'lucide-react';
import Converter from './components/Converter';
import SeoContent from './components/SeoContent';
import AdSense from './components/AdSense';
import CoupangBanner from './components/CoupangBanner';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isKorean = i18n.language.startsWith('ko');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const getLangLabel = (code: string) => {
    if (code.startsWith('ko')) return 'KR';
    if (code.startsWith('ja')) return 'JP';
    if (code.startsWith('zh')) return 'CN';
    if (code.startsWith('ru')) return 'RU';
    return 'EN';
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
        
        {/* Dynamic SEO Head */}
        <Helmet>
          <html lang={i18n.language} />
          <title>{t('meta.title')}</title>
          <meta name="description" content={t('meta.description')} />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
          <link rel="canonical" href={window.location.href} />
        </Helmet>

        {/* Header */}
        <header className="bg-white sticky top-0 z-50 border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 text-brand-700">
              <div className="bg-brand-600 text-white p-1.5 rounded-lg">
                <Ruler size={20} />
              </div>
              <h1 className="font-bold text-lg md:text-xl tracking-tight">
                {t('header.title')}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {/* Language Dropdown Container */}
              <div className="relative group h-full flex items-center">
                <button className="flex items-center gap-1.5 text-slate-600 group-hover:text-brand-600 transition-colors py-2">
                  <Globe size={18} />
                  <span className="text-sm font-medium uppercase">{getLangLabel(i18n.language)}</span>
                </button>
                
                {/* 
                   Dropdown Content 
                   Using pt-2 instead of mt-1 to create a safe hover bridge so the menu doesn't disappear 
                   when moving cursor from button to menu.
                */}
                <div className="absolute right-0 top-full pt-2 w-32 hidden group-hover:block z-50">
                  <div className="bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden animate-fade-in">
                    <button onClick={() => changeLanguage('en')} className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-50 text-slate-700 hover:text-brand-600">English</button>
                    <button onClick={() => changeLanguage('ko')} className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-50 text-slate-700 hover:text-brand-600">한국어</button>
                    <button onClick={() => changeLanguage('ja')} className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-50 text-slate-700 hover:text-brand-600">日本語</button>
                    <button onClick={() => changeLanguage('zh')} className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-50 text-slate-700 hover:text-brand-600">中文</button>
                    <button onClick={() => changeLanguage('ru')} className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-50 text-slate-700 hover:text-brand-600">Русский</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Top Banner Ad (Common) */}
        <div className="w-full bg-gray-50 border-b border-gray-100 py-2">
            <div className="max-w-7xl mx-auto px-4 flex justify-center">
                 <AdSense slotId="TOP_BANNER_SLOT_ID" className="w-full max-w-[728px] h-[90px]" />
            </div>
        </div>

        {/* Main Layout: 3-Column Grid for Desktop, Single Column for Mobile */}
        <div className="flex-1 w-full max-w-[1400px] mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[250px_1fr_250px] gap-8">
            
            {/* Left Sidebar (Desktop Only) */}
            <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-6">
                    <AdSense slotId="LEFT_SIDEBAR_1" className="min-h-[600px] w-full" format="vertical" />
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="min-w-0"> {/* min-w-0 ensures flex child doesn't overflow */}
                
                <div className="text-center mb-8">
                   <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-brand-900 to-brand-600">
                     {t('meta.title')}
                   </h2>
                   <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                     {t('meta.description')}
                   </p>
                </div>

                {/* The Tool */}
                <Converter />

                {/* In-Article Mid Ads (High Revenue Spot) */}
                <div className="my-10 space-y-4">
                    {/* Primary AdSense */}
                    <AdSense slotId="MIDDLE_CONTENT_SLOT" layout="in-article" className="min-h-[250px]" />
                    
                    {/* Secondary Coupang Banner (Only if Korean) - Stacked for max visibility */}
                    {isKorean && <CoupangBanner />}
                </div>

                {/* SEO Content */}
                <SeoContent />

                {/* Bottom Ad (Mobile Only visible at end of flow, Desktop has sidebars) */}
                <div className="mt-12 lg:hidden">
                    <AdSense slotId="BOTTOM_MOBILE_SLOT" className="min-h-[250px]" />
                </div>
            </main>

            {/* Right Sidebar (Desktop Only) */}
            <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-6">
                    <AdSense slotId="RIGHT_SIDEBAR_1" className="min-h-[600px] w-full" format="vertical" />
                    
                    {/* Bonus: Small sticky unit for KR users */}
                    {isKorean && (
                         <div className="mt-4">
                            <CoupangBanner />
                         </div>
                    )}
                </div>
            </aside>

        </div>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm mt-auto z-10 relative">
          <div className="max-w-4xl mx-auto px-4">
            <p>&copy; {new Date().getFullYear()} Global Size Converter. All rights reserved.</p>
          </div>
          <div className="flex justify-center gap-4 text-xs text-slate-500">
                <a href="/privacy.html" target="_blank" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
                <span>|</span>
                <a href="mailto:dante.studi0oo@gmail.com" className="hover:text-slate-300 transition-colors">Contact</a>
            </div>
        </footer>

      </div>
    </HelmetProvider>
  );
};

export default App;