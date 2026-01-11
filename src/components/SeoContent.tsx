import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp } from 'lucide-react';

const SeoContent: React.FC = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [1, 2, 3, 4];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-16 w-full max-w-3xl mx-auto px-4 lg:px-0 text-slate-700 space-y-12 mb-20">
      
      {/* FAQ Section */}
      <article className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-8 pb-4 border-b border-slate-100">
          {t('seo_content.faq_title')}
        </h2>
        
        <div className="space-y-4">
          {faqs.map((num, idx) => (
            <div key={num} className="border border-slate-200 rounded-xl overflow-hidden">
              <button 
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between p-5 bg-white hover:bg-slate-50 transition-colors text-left"
              >
                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-brand-100 text-brand-600 text-xs">Q</span> 
                  {t(`seo_content.faq_${num}_q`)}
                </h3>
                {openIndex === idx ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
              </button>
              
              {openIndex === idx && (
                <div className="p-5 pt-0 bg-slate-50 text-slate-700 leading-relaxed border-t border-slate-100">
                   <div className="mt-4">
                      {t(`seo_content.faq_${num}_a`)}
                   </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </article>
    </section>
  );
};

export default SeoContent;