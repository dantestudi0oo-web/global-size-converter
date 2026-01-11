import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Footprints, Shirt, Ruler, AlertCircle, ChevronDown, ChevronUp, HelpCircle, Users, Baby, User } from 'lucide-react';
import { 
  Category, 
  Gender, 
  SizeData,
  ClothingMeasurement
} from '../types';
import { 
  getDataset,
  getMeasurementDataset,
  REGIONS 
} from '../constants';

type Mode = 'size' | 'measure';

const Converter: React.FC = () => {
  const { t } = useTranslation();
  
  // State
  const [category, setCategory] = useState<Category>(Category.SHOES);
  const [gender, setGender] = useState<Gender>(Gender.MEN);
  const [mode, setMode] = useState<Mode>('size');
  const [showGuide, setShowGuide] = useState<boolean>(false);
  
  // Inputs
  const [fromRegion, setFromRegion] = useState<string>('us');
  const [inputValue, setInputValue] = useState<string>(''); // Default empty to show placeholder
  
  // Clothing Measurement Inputs
  const [chestValue, setChestValue] = useState<string>(''); 
  const [lengthValue, setLengthValue] = useState<string>(''); 
  const [shoulderValue, setShoulderValue] = useState<string>('');
  const [sleeveValue, setSleeveValue] = useState<string>('');

  // Determine active dataset based on Category + Gender (Demographic)
  const currentData: SizeData[] = useMemo(() => {
    return getDataset(category, gender);
  }, [category, gender]);

  const currentMeasurements: ClothingMeasurement[] = useMemo(() => {
     return getMeasurementDataset(gender);
  }, [gender]);

  // Calculation Logic
  const { resultRow, isExact } = useMemo(() => {
    // Mode: Measurement (mm)
    if (mode === 'measure') {
        if (category === Category.SHOES) {
            // Foot MM Logic
            const mm = parseFloat(inputValue);
            if (isNaN(mm) || mm === 0) return { resultRow: null, isExact: false };
            
            // Comfort Buffer Logic:
            // Adults (Men/Women) generally need 15-20mm room.
            // Kids/Juniors often grow fast, but tight shoes are bad. 10-15mm is standard room.
            // We'll apply a standard +15mm for kids/juniors and +20mm for adults.
            const buffer = (gender === Gender.KIDS || gender === Gender.JUNIORS) ? 15 : 20;
            const targetMM = mm + buffer; 

            // Find first size that is >= targetMM
            // KR size in data is usually MM.
            const match = currentData.find(row => Number(row.kr) >= targetMM);
            
            // If measurement is larger than largest size, return largest
            const best = match || currentData[currentData.length - 1];
            return { resultRow: best, isExact: false }; 
        } else {
            // Clothing MM Logic
            const chest = parseFloat(chestValue);
            const len = parseFloat(lengthValue);
            const shoulder = parseFloat(shoulderValue);
            const sleeve = parseFloat(sleeveValue);
            
            const hasInput = !isNaN(chest) || !isNaN(len) || !isNaN(shoulder) || !isNaN(sleeve);
            
            if (!hasInput) {
                return { resultRow: null, isExact: false };
            }

            // Strategy: Filter for candidates that are "Big Enough" for ALL provided inputs.
            let candidates = currentMeasurements.filter(m => {
                let fits = true;
                if (!isNaN(chest) && chest > 0 && m.chestWidthMm < chest) fits = false;
                if (!isNaN(len) && len > 0 && m.totalLengthMm < len) fits = false;
                if (!isNaN(shoulder) && shoulder > 0 && m.shoulderWidthMm < shoulder) fits = false;
                if (!isNaN(sleeve) && sleeve > 0 && m.sleeveLengthMm < sleeve) fits = false;
                return fits;
            });

            const pool = candidates.length > 0 ? candidates : currentMeasurements;

            let bestFit: ClothingMeasurement | null = null;
            let minDiff = Infinity;

            for (const m of pool) {
                let totalDiff = 0;
                let count = 0;
                
                if (!isNaN(chest) && chest > 0) {
                    totalDiff += Math.abs(m.chestWidthMm - chest);
                    count++;
                }
                if (!isNaN(len) && len > 0) {
                    totalDiff += Math.abs(m.totalLengthMm - len);
                    count++;
                }
                if (!isNaN(shoulder) && shoulder > 0) {
                    totalDiff += Math.abs(m.shoulderWidthMm - shoulder);
                    count++;
                }
                if (!isNaN(sleeve) && sleeve > 0) {
                    totalDiff += Math.abs(m.sleeveLengthMm - sleeve);
                    count++;
                }
                
                const avgDiff = count > 0 ? totalDiff / count : Infinity;
                
                if (avgDiff < minDiff) {
                    minDiff = avgDiff;
                    bestFit = m;
                }
            }

            if (bestFit) {
                const sizeRow = currentData.find(d => String(d.us) === bestFit?.sizeKey);
                return { resultRow: sizeRow || null, isExact: false };
            }
            return { resultRow: null, isExact: false };
        }
    }

    // Mode: Standard Size Selection
    if (!inputValue) return { resultRow: null, isExact: false };

    // Try finding exact string match first (common for Clothing and some Shoe sizes)
    const match = currentData.find(row => 
        String(row[fromRegion as keyof SizeData]).toLowerCase() === inputValue.toLowerCase()
    );
    if (match) return { resultRow: match, isExact: true };

    // Fallback for numeric matching (mostly Shoes)
    const numInput = parseFloat(inputValue);
    if (!isNaN(numInput)) {
        let closest: SizeData | null = null;
        let minDiff = Infinity;
        
        for (const row of currentData) {
           const val = Number(row[fromRegion as keyof SizeData]);
           // Skip if value in data is not a number (e.g. "S", "M")
           if (isNaN(val)) continue;

           const diff = Math.abs(val - numInput);
           if (diff < 0.001) {
             return { resultRow: row, isExact: true };
           }
           if (diff < minDiff) {
             minDiff = diff;
             closest = row;
           }
        }
        return { resultRow: closest, isExact: false };
    }

    return { resultRow: null, isExact: false };

  }, [currentData, currentMeasurements, fromRegion, inputValue, chestValue, lengthValue, shoulderValue, sleeveValue, mode, category, gender]);

  // Handlers
  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
    // Reset inputs but keep gender if valid, or default?
    // We keep gender as it applies to both now
    setFromRegion('us');
    setInputValue('');
    setChestValue('');
    setLengthValue('');
    setShoulderValue('');
    setSleeveValue('');
    setMode('size'); 
    setShowGuide(false);
  };

  const handleModeChange = (m: Mode) => {
    setMode(m);
    setInputValue('');
    setChestValue('');
    setLengthValue('');
    setShoulderValue('');
    setSleeveValue('');
    setShowGuide(true);
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromRegion(e.target.value);
    setInputValue(''); 
  };

  const renderDemographicButton = (target: Gender, label: string, Icon: React.ElementType, subLabel?: string) => (
    <button
      onClick={() => setGender(target)}
      className={`flex-1 flex flex-col items-center justify-center py-3 px-1 rounded-lg text-sm font-medium transition-all duration-200 border ${
        gender === target 
        ? 'bg-brand-600 text-white border-brand-600 shadow-md transform scale-105' 
        : 'bg-white text-slate-500 border-slate-200 hover:border-brand-300 hover:text-brand-600 hover:bg-slate-50'
      }`}
    >
      <div className="flex items-center gap-1">
          <Icon size={16} />
          <span>{label}</span>
      </div>
      {subLabel && <span className={`text-[10px] mt-0.5 ${gender === target ? 'text-brand-100' : 'text-slate-400'}`}>{subLabel}</span>}
    </button>
  );

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="flex rounded-xl bg-slate-100 p-1 mb-6 shadow-inner">
        <button 
          onClick={() => handleCategoryChange(Category.SHOES)}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all duration-200 ${
            category === Category.SHOES 
            ? 'bg-white text-brand-600 shadow-sm' 
            : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Footprints size={18} />
          {t('converter.shoes')}
        </button>
        <button 
          onClick={() => handleCategoryChange(Category.CLOTHING)}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all duration-200 ${
            category === Category.CLOTHING 
            ? 'bg-white text-brand-600 shadow-sm' 
            : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Shirt size={18} />
          {t('converter.clothing')}
        </button>
      </div>

      {/* Demographic Selector (Men, Women, Kids, Juniors) */}
      <div className="grid grid-cols-4 gap-2 mb-8">
        {renderDemographicButton(Gender.MEN, t('converter.men'), User)}
        {renderDemographicButton(Gender.WOMEN, t('converter.women'), User)}
        {renderDemographicButton(Gender.KIDS, t('converter.kids'), Baby, '0-7y')}
        {renderDemographicButton(Gender.JUNIORS, t('converter.juniors'), Users, '8-14y')}
      </div>

      {/* Mode Switch */}
      <div className="flex justify-center mb-4 gap-4">
         <button 
           onClick={() => handleModeChange('size')}
           className={`text-sm font-semibold flex items-center gap-1 pb-1 border-b-2 transition-colors ${mode === 'size' ? 'text-brand-600 border-brand-600' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
         >
           <Ruler size={14} /> {t('converter.mode_size')}
         </button>
         <button 
           onClick={() => handleModeChange('measure')}
           className={`text-sm font-semibold flex items-center gap-1 pb-1 border-b-2 transition-colors ${mode === 'measure' ? 'text-brand-600 border-brand-600' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
         >
           {category === Category.SHOES ? <Footprints size={14} /> : <Shirt size={14} />} 
           {t('converter.mode_measure')}
         </button>
      </div>

      {/* Main Input Card */}
      <div className="bg-white rounded-2xl shadow-xl shadow-brand-900/5 overflow-hidden border border-slate-100">
        <div className="p-6 md:p-8 bg-gradient-to-br from-white to-slate-50">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Input Side */}
            {mode === 'size' ? (
              <>
                 <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider">
                      {t('converter.select_region')}
                    </label>
                    <select 
                      value={fromRegion}
                      onChange={handleRegionChange}
                      className="w-full p-4 bg-white border border-slate-200 rounded-xl text-lg font-semibold text-slate-800 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow appearance-none cursor-pointer"
                    >
                      {REGIONS.map(r => (
                        <option key={r.id} value={r.id}>
                          {t(`converter.region_${r.id}`)}
                        </option>
                      ))}
                    </select>
                 </div>
                 
                 <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider">
                      {t('converter.select_size')}
                    </label>
                    <div className="relative">
                      {/* Switched to input with datalist to allow typing */}
                      <input
                        type="text"
                        list="size-options"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={t('converter.select_size')}
                        className="w-full p-4 bg-white border border-slate-200 rounded-xl text-lg font-semibold text-brand-600 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow"
                      />
                      <datalist id="size-options">
                         {currentData.map((row, idx) => (
                           <option key={idx} value={String(row[fromRegion as keyof SizeData])} />
                         ))}
                      </datalist>
                    </div>
                 </div>
              </>
            ) : (
              /* Measurement Mode */
              <div className="col-span-1 md:col-span-2">
                  {category === Category.SHOES ? (
                    <div className="space-y-2">
                        <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider">
                            {t('converter.input_foot')}
                        </label>
                        <input 
                            type="number" 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={t('converter.ph_foot')}
                            className="w-full p-4 bg-white border border-slate-200 rounded-xl text-lg font-semibold text-brand-600 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow text-center"
                        />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider truncate">
                                {t('converter.input_chest')}
                            </label>
                            <input 
                                type="number" 
                                value={chestValue}
                                onChange={(e) => setChestValue(e.target.value)}
                                placeholder={t('converter.ph_chest')}
                                className="w-full p-4 bg-white border border-slate-200 rounded-xl text-lg font-semibold text-brand-600 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow text-center"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider truncate">
                                {t('converter.input_length')}
                            </label>
                            <input 
                                type="number" 
                                value={lengthValue}
                                onChange={(e) => setLengthValue(e.target.value)}
                                placeholder={t('converter.ph_length')}
                                className="w-full p-4 bg-white border border-slate-200 rounded-xl text-lg font-semibold text-brand-600 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow text-center"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider truncate">
                                {t('converter.input_shoulder')}
                            </label>
                            <input 
                                type="number" 
                                value={shoulderValue}
                                onChange={(e) => setShoulderValue(e.target.value)}
                                placeholder={t('converter.ph_shoulder')}
                                className="w-full p-4 bg-white border border-slate-200 rounded-xl text-lg font-semibold text-brand-600 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow text-center"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider truncate">
                                {t('converter.input_sleeve')}
                            </label>
                            <input 
                                type="number" 
                                value={sleeveValue}
                                onChange={(e) => setSleeveValue(e.target.value)}
                                placeholder={t('converter.ph_sleeve')}
                                className="w-full p-4 bg-white border border-slate-200 rounded-xl text-lg font-semibold text-brand-600 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow text-center"
                            />
                        </div>
                    </div>
                  )}
                  
                  <p className="text-xs text-slate-400 text-center mt-4">
                    {t('converter.enter_exact')}
                  </p>

                  {/* Collapsible How-to Guide inside UI */}
                  <div className="mt-4 border border-slate-100 rounded-lg overflow-hidden">
                      <button 
                        onClick={() => setShowGuide(!showGuide)}
                        className="w-full flex items-center justify-between p-3 bg-slate-50 text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                      >
                         <span className="flex items-center gap-2"><HelpCircle size={14}/> {t('converter.how_to_title')}</span>
                         {showGuide ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                      </button>
                      {showGuide && (
                          <div className="p-3 bg-white text-xs text-slate-600 leading-relaxed space-y-2">
                              {category === Category.SHOES ? (
                                  <p>{t('converter.how_to_foot')}</p>
                              ) : (
                                  <>
                                    <p><strong>{t('converter.input_chest')}:</strong> {t('converter.how_to_chest')}</p>
                                    <p><strong>{t('converter.input_length')}:</strong> {t('converter.how_to_length')}</p>
                                    <p><strong>{t('converter.input_shoulder')}:</strong> {t('converter.how_to_shoulder')}</p>
                                    <p><strong>{t('converter.input_sleeve')}:</strong> {t('converter.how_to_sleeve')}</p>
                                  </>
                              )}
                          </div>
                      )}
                  </div>
              </div>
            )}
          </div>

          {/* Result Grid */}
          <div className="relative">
             <div className="absolute inset-0 flex items-center mb-4" aria-hidden="true">
                <div className="w-full border-t border-slate-200"></div>
             </div>
             <div className="relative flex justify-center mb-6">
                <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                   isExact 
                   ? 'bg-green-50 text-green-600 border-green-200' 
                   : 'bg-brand-50 text-brand-600 border-brand-200'
                }`}>
                  {isExact ? t('converter.exact') : t('converter.recommended')}
                </span>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {REGIONS.filter(r => mode === 'measure' || r.id !== fromRegion).map((region) => {
                  const val = resultRow ? resultRow[region.id as keyof SizeData] : '-';
                  return (
                    <div key={region.id} className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 border border-slate-100 transition-colors hover:border-brand-200">
                      <span className="text-xs font-bold text-slate-400 uppercase mb-1">
                        {region.id.toUpperCase()}
                      </span>
                      <span className="text-2xl font-bold text-slate-800">
                        {val}
                      </span>
                    </div>
                  )
                })}
             </div>
          </div>

        </div>
        
        {/* Disclaimer Footer */}
        <div className="bg-amber-50 px-6 py-4 border-t border-amber-100 flex flex-col md:flex-row items-center justify-center text-amber-800 text-sm gap-2 text-center md:text-left">
          <AlertCircle size={18} className="flex-shrink-0 text-amber-600" />
          <span>
             {mode === 'measure' && category === Category.CLOTHING 
                ? t('converter.disclaimer_clothing') 
                : t('converter.disclaimer_general')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Converter;