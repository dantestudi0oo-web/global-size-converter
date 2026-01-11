import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const SeoContent: React.FC = () => {
  const { i18n } = useTranslation(); // 언어 감지용
  const [openIndex, setOpenIndex] = useState<number | null>(0); // 첫 번째 질문은 열어둠

  // 현재 언어가 한국어인지 확인
  const isKorean = i18n.language.startsWith('ko');

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // 🇰🇷 한국어 데이터 (네이버/구글 코리아 타겟 - 직구 키워드 집중)
  const koFaqs = [
    {
      q: "미국(US) 신발 사이즈 7은 한국 사이즈로 몇인가요?",
      a: (
        <>
          <p className="mb-2">
            미국 남성 신발 사이즈 <strong>7은 한국 사이즈로 약 250mm</strong>이며, 여성 사이즈 7은 약 <strong>240mm</strong>입니다.
          </p>
          <p>
            나이키, 아디다스, 뉴발란스 등 브랜드와 발볼 넓이(W/M)에 따라 약간의 차이가 있을 수 있습니다. 
            특히 <strong>해외 직구</strong> 시에는 반 치수(0.5) 정도 여유 있게 선택하는 것이 실패를 줄이는 팁입니다.
          </p>
        </>
      )
    },
    {
      q: "유럽(EU) 옷 사이즈 36, 38은 한국 사이즈로 어떻게 되나요?",
      a: (
        <>
          <p className="mb-2">
            유럽(EU) 여성 의류 사이즈 <strong>36은 한국의 55 사이즈(S)</strong>, <strong>38은 66 사이즈(M)</strong>에 해당합니다.
          </p>
          <p>
            자라(ZARA)나 H&M 같은 글로벌 브랜드나 명품 의류 구매 시 이 기준을 참고하세요. 
            독일(DE)과 프랑스(FR)/이탈리아(IT)는 같은 유럽이라도 표기가 다를 수 있으니 주의가 필요합니다.
          </p>
        </>
      )
    },
    {
      q: "아이들(키즈/주니어) 신발 사이즈는 어떻게 고르나요?",
      a: "아이들은 발이 빠르게 자라므로 딱 맞는 사이즈보다 0.5~1cm 정도 여유 있게 구매하는 것이 좋습니다. 미국 사이즈 표기에서 'C'는 Child(유아), 'Y'는 Youth(주니어)를 의미하니 혼동하지 않도록 주의하세요."
    },
    {
      q: "영국(UK) 신발 사이즈와 미국(US) 사이즈 차이점은?",
      a: "보통 영국(UK) 사이즈는 미국(US) 사이즈보다 숫자가 1 정도 작습니다. 예를 들어 미국 남성 9 사이즈는 영국 8 사이즈와 비슷합니다. 변환기를 통해 정확한 수치를 확인해보세요."
    }
  ];

  // 🇺🇸 영어/글로벌 데이터 (구글 글로벌 타겟)
  const enFaqs = [
    {
      q: "How to convert US shoe sizes to EU or UK sizes?",
      a: (
        <>
          <p className="mb-2">
            Converting sizes can be tricky. Generally, a <strong>US Men's 9</strong> is roughly a <strong>UK 8</strong> and an <strong>EU 42</strong>.
          </p>
          <p>
            Use our real-time converter above to get accurate measurements for Men, Women, and Kids across all major regions including Japan (cm) and Korea (mm).
          </p>
        </>
      )
    },
    {
      q: "What is the difference between US and UK clothing sizes?",
      a: "US clothing sizes are generally larger than UK sizes. For example, a US Women's size 6 is roughly equivalent to a UK size 10. Always check the specific brand's size chart before purchasing."
    },
    {
      q: "How do I measure my foot length for online shopping?",
      a: "Place your foot on a piece of paper and trace the outline. Measure the length from the heel to the longest toe. This measurement (in cm or inches) is the most accurate way to find your size in any country."
    },
    {
      q: "Are kids' sizes the same globally?",
      a: "No, children's sizes vary significantly. US uses age-based or 'C/Y' sizing, while Europe uses height (cm) or age. Our converter helps you navigate these differences easily."
    }
  ];

  // 현재 언어에 따라 데이터 선택
  const faqs = isKorean ? koFaqs : enFaqs;

  return (
    <section className="mt-12 w-full max-w-4xl mx-auto px-4 lg:px-0 text-slate-700 space-y-12 mb-20">
      
      {/* FAQ Article Layout */}
      <article className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
            <HelpCircle className="text-brand-600" size={28} />
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            {isKorean ? "자주 묻는 질문 (FAQ)" : "Frequently Asked Questions"}
            </h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-brand-300 hover:shadow-md">
              <button 
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between p-5 bg-white hover:bg-slate-50 transition-colors text-left"
                aria-expanded={openIndex === idx}
              >
                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-3 pr-4">
                  <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-brand-100 text-brand-700 text-sm font-extrabold">Q</span> 
                  {item.q}
                </h3>
                {openIndex === idx ? (
                    <ChevronUp className="text-brand-500 flex-shrink-0" /> 
                ) : (
                    <ChevronDown className="text-slate-400 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === idx && (
                <div className="p-5 pt-2 bg-slate-50/50 text-slate-700 leading-relaxed border-t border-slate-100 animate-fade-in">
                   <div className="pl-10 text-base md:text-lg text-slate-600">
                      {item.a}
                   </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </article>
      
      {/* SEO Keywords Hidden Block (Optional for Bots) */}
      <div className="sr-only">
        Global Size Converter, Shoe Size Chart, Clothing Size Conversion, US to KR, EU to US, Nike Size, Adidas Size, Kids Shoe Size.
      </div>
    </section>
  );
};

export default SeoContent;