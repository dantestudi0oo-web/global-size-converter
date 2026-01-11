import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const SeoContent: React.FC = () => {
  const { i18n } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // 언어 코드 앞 2자리만 추출 (예: 'ko-KR' -> 'ko', 'ja' -> 'ja')
  const currentLang = i18n.language.substring(0, 2);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // 1. 🇰🇷 한국어 (KR)
  const koFaqs = {
    title: "자주 묻는 질문 (FAQ)",
    items: [
      {
        q: "미국(US) 신발 사이즈 7은 한국 사이즈로 몇인가요?",
        a: "미국 남성 사이즈 7은 한국 사이즈로 약 250mm이며, 여성 사이즈 7은 약 240mm입니다. 나이키, 뉴발란스 등 브랜드마다 차이가 있을 수 있으니 위 변환기를 참고하세요."
      },
      {
        q: "유럽(EU) 옷 사이즈 36, 38은 한국 사이즈로?",
        a: "유럽(EU) 여성 의류 36은 한국 55(S), 38은 66(M) 사이즈와 비슷합니다. 자라(ZARA)나 H&M 직구 시 참고하세요."
      },
      {
        q: "아이들(키즈) 신발 사이즈 고르는 팁은?",
        a: "아이들은 발이 빨리 자라므로 0.5~1cm 정도 여유 있게 고르세요. 미국 사이즈 'C'는 유아(Child), 'Y'는 주니어(Youth)를 뜻합니다."
      },
      {
        q: "영국(UK)과 미국(US) 사이즈 차이는?",
        a: "보통 영국(UK) 사이즈가 미국(US)보다 숫자가 1 작습니다. (예: US 9 = UK 8)"
      }
    ]
  };

  // 2. 🇯🇵 일본어 (JA) - cm 단위 강조
  const jaFaqs = {
    title: "よくある質問 (FAQ)",
    items: [
      {
        q: "アメリカ(US)サイズ7は日本サイズで何cmですか？",
        a: "アメリカのメンズサイズ7は約25.0cm、レディースサイズ7は約24.0cmです。ブランドによって多少異なりますので、上記の変換表をご利用ください。"
      },
      {
        q: "靴のワイズ（足囲）について",
        a: "海外の靴は幅が狭いものが多いです。日本の「E」や「EEE」サイズの方は、海外サイズを選ぶ際にハーフサイズ（0.5）大きめを選ぶことをお勧めします。"
      },
      {
        q: "EUサイズ36、38は日本サイズでどれくらい？",
        a: "EUレディース36は約23.0cm、38は約24.0cmに相当します。ZARAなどのヨーロッパブランドを購入する際に参考にしてください。"
      },
      {
        q: "子供靴のサイズの選び方は？",
        a: "子供の足はすぐに成長するため、0.5〜1.0cmほど余裕を持って選ぶのが良いでしょう。"
      }
    ]
  };

  // 3. 🇨🇳 중국어 (ZH) - CN/EU 비교 및 직구(海淘) 팁
  const zhFaqs = {
    title: "常见问题 (FAQ)",
    items: [
      {
        q: "美国(US)鞋码7号对应中国码是多少？",
        a: "美国男鞋7号约对应中国码250(40码)，女鞋7号约对应240(38码)。耐克(Nike)、阿迪达斯(Adidas)等品牌略有不同，建议参考上方转换器。"
      },
      {
        q: "欧洲(EU)服装尺码36、38对应多大？",
        a: "欧洲女装36码约对应S号(160/84A)，38码约对应M号(165/88A)。海淘时请务必确认尺码表。"
      },
      {
        q: "如何挑选童鞋尺码？",
        a: "建议预留0.5~1厘米的空间。美国童鞋尺码中，'C'代表幼童(Child)，'Y'代表大童(Youth)。"
      },
      {
        q: "英国(UK)和美国(US)尺码有什么区别？",
        a: "通常英国码(UK)比美国码(US)小1号。例如：US 9 = UK 8。"
      }
    ]
  };

  // 4. 🇷🇺 러시아어 (RU) - RU/EU 비교
  const ruFaqs = {
    title: "Часто задаваемые вопросы (FAQ)",
    items: [
      {
        q: "Какой российский размер соответствует 7 размеру США?",
        a: "Мужской размер США 7 соответствует примерно 39-40 российскому размеру, женский 7 — 37-38 размеру. Используйте конвертер выше для точности."
      },
      {
        q: "Как перевести европейский размер (EU) в российский?",
        a: "Обычно европейские размеры (например, 38 EU) на 1 размер больше российских (37 RU), но это зависит от бренда."
      },
      {
        q: "Как выбрать размер детской обуви?",
        a: "Детская нога растет быстро, поэтому рекомендуется брать обувь с запасом 0.5-1 см."
      },
      {
        q: "Отличие размеров UK и US?",
        a: "Обычно размер UK на единицу меньше размера US. Например, мужской US 9 равен UK 8."
      }
    ]
  };

  // 5. 🇺🇸 영어/글로벌 (Default)
  const enFaqs = {
    title: "Frequently Asked Questions",
    items: [
      {
        q: "How to convert US shoe sizes to EU or UK sizes?",
        a: "Generally, a US Men's 9 is roughly a UK 8 and an EU 42. Use our real-time converter above for accurate measurements."
      },
      {
        q: "What is the difference between US and UK sizes?",
        a: "US sizes are generally larger number-wise than UK sizes. A US Women's 6 is roughly a UK 4. Always check the brand chart."
      },
      {
        q: "How do I measure my foot length?",
        a: "Trace your foot on paper and measure from heel to longest toe. Use this CM/Inch measurement in our converter."
      },
      {
        q: "Are kids' sizes standard globally?",
        a: "No. US uses 'C/Y' (Child/Youth), while EU uses height or sequential numbers. Our tool helps bridge these gaps."
      }
    ]
  };

  // 언어 선택 로직
  let content;
  switch (currentLang) {
    case 'ko': content = koFaqs; break;
    case 'ja': content = jaFaqs; break;
    case 'zh': content = zhFaqs; break;
    case 'ru': content = ruFaqs; break;
    default: content = enFaqs; break;
  }

  return (
    <section className="mt-12 w-full max-w-4xl mx-auto px-4 lg:px-0 text-slate-700 space-y-12 mb-20">
      <article className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
            <HelpCircle className="text-brand-600" size={28} />
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              {content.title}
            </h2>
        </div>
        
        <div className="space-y-4">
          {content.items.map((item, idx) => (
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
      
      {/* Hidden Keywords for Bots */}
      <div className="sr-only">
        Global Size Converter, Shoe Size Chart, US to EU, US to UK, Japanese Shoe Size, Chinese Size Chart, Russian Size Conversion.
      </div>
    </section>
  );
};

export default SeoContent;