import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdSenseProps {
  slotId: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical';
  layout?: string; // e.g., "in-article"
  className?: string;
  style?: React.CSSProperties;
}

const AdSense: React.FC<AdSenseProps> = ({ 
  slotId, 
  format = 'auto', 
  layout,
  className = '',
  style = { display: 'block' }
}) => {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error('AdSense push error:', e);
    }
  }, []);

  return (
    <div className={`ad-container overflow-hidden bg-slate-50 border border-slate-100 rounded-lg text-center ${className}`}>
      <div className="text-[10px] text-slate-300 uppercase tracking-widest py-1">Advertisement</div>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with actual Client ID
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
        data-ad-layout={layout}
      ></ins>
    </div>
  );
};

export default AdSense;