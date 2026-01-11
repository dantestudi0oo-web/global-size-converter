import React from 'react';
import { useTranslation } from 'react-i18next';

interface CoupangBannerProps {
  className?: string;
}

const CoupangBanner: React.FC<CoupangBannerProps> = ({ className = '' }) => {
  const { i18n } = useTranslation();
  
  // Only render if language is Korean
  if (!i18n.language.startsWith('ko')) {
    return null;
  }

  return (
    <div className={`w-full flex justify-center items-center my-4 ${className}`}>
        {/* Placeholder for Coupang Partners Iframe */}
        <div className="w-full max-w-[680px] h-[140px] bg-slate-50 border border-slate-200 rounded-lg flex flex-col items-center justify-center shadow-sm">
            <span className="text-sm font-bold text-slate-400">🛍️ Coupang Partners Banner</span>
            <span className="text-xs text-slate-300">(Visible only to KR Users)</span>
            
            {/* 
            실제 사용 시 아래 주석을 해제하고 ID/TrackingCode를 입력하세요.
            <iframe 
                src="https://ads-partners.coupang.com/widgets.html?id=[YOUR_ID]&template=carousel&trackingCode=[YOUR_CODE]&subId=&width=680&height=140" 
                width="100%" 
                height="140" 
                frameBorder="0" 
                scrolling="no" 
                referrerPolicy="unsafe-url"
                title="Coupang"
            ></iframe>
            */}
        </div>
    </div>
  );
};

export default CoupangBanner;