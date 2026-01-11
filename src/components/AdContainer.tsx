import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdContainerProps {
  slotId?: string; // For AdSense
  position: 'top' | 'bottom';
}

const AdContainer: React.FC<AdContainerProps> = ({ slotId, position }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'en';
  const isKorean = lang.startsWith('ko');

  useEffect(() => {
    // Logic to push adsense script if needed
    if (!isKorean && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error", e);
      }
    }
  }, [isKorean, lang]);

  return (
    <div className={`w-full my-6 flex justify-center items-center bg-gray-50 min-h-[100px] border border-gray-100 rounded-lg overflow-hidden`}>
      {isKorean ? (
        // Coupang Partners Dynamic Banner Logic
        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
          {/* 
            쿠팡 파트너스 배너 부분
            <iframe 
              src="https://ads-partners.coupang.com/widgets.html?id=[YOUR_ID]&template=carousel&trackingCode=[YOUR_CODE]&subId=&width=680&height=140" 
              width="100%" 
              height="140" 
              frameBorder="0" 
              scrolling="no" 
              referrerPolicy="unsafe-url">
            </iframe>
          */}
          <span className="p-4 bg-white border rounded shadow-sm">
             🛒 Coupang Dynamic Banner (Korean Users Only) <br/>
             <small className="text-gray-400">Placeholder: Insert Iframe Code Here</small>
          </span>
        </div>
      ) : (
        // Google AdSense Logic
        <div className="w-full max-w-[728px] text-center">
            {/* AdSense Unit */}
            <ins className="adsbygoogle block"
                 data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                 data-ad-slot={slotId || "1234567890"}
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
            <span className="block p-4 bg-white border rounded shadow-sm text-gray-400 text-sm">
                 📢 Google AdSense Area ({position}) <br/>
                 <small>Visible for Non-Korean Users</small>
            </span>
        </div>
      )}
    </div>
  );
};

export default AdContainer;