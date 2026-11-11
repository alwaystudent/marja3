import React from 'react';
import { Search, X, BookOpen, Compass, Award, FileText } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

export const HeroSection: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    items, 
    favorites,
    setActiveCategory,
    setSelectedField
  } = useLibrary();

  const totalTerms = items.filter(i => i.category === 'terms').length;
  const totalBiographies = items.filter(i => i.category === 'biographies').length;
  const totalEssentials = items.filter(i => i.category === 'essentials').length;
  const totalBooks = items.filter(i => i.category === 'books').length;

  const quickSearches = [
    { label: 'شروط لا إله إلا الله', query: 'شروط لا اله الا الله' },
    { label: 'أركان الصلاة', query: 'اركان الصلاة' },
    { label: 'الأصول الثلاثة', query: 'الاصول الثلاثة' },
    { label: 'شيخ الإسلام ابن تيمية', query: 'ابن تيمية' },
    { label: 'نواقض الإسلام', query: 'نواقض الاسلام' },
    { label: 'شروط الحديث الصحيح', query: 'شروط الحديث الصحيح' },
  ];

  return (
    <div className="relative w-full overflow-hidden border-b border-stone-200 dark:border-stone-800 bg-[#F7F4EE] dark:bg-[#121B19] transition-colors">
      
      {/* Background Decorative Manuscript Visual Layer with Scrim */}
      <div className="absolute inset-0 z-0 opacity-15 dark:opacity-10 pointer-events-none overflow-hidden">
        <img
          src="/src/assets/images/islamic_manuscript_banner_1794423038059.jpg"
          alt="مخطوطة إسلامية مزخرفة"
          className="w-full h-full object-cover object-center filter saturate-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F7F4EE]/60 to-[#F7F4EE] dark:via-[#121B19]/70 dark:to-[#121B19]" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 py-8 lg:py-12 flex flex-col items-center text-center">
        
        {/* Basmala in classic calligraphy */}
        <div className="mb-3 font-heading text-xl sm:text-2xl text-emerald-900/80 dark:text-emerald-300/80 tracking-wide select-none">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>

        {/* Main Title */}
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-100 tracking-tight mb-3">
          مَرْجِعُ طَالِبِ العِلْمِ الشَّرْعِيِّ
        </h1>

        {/* Concise deck / mission description */}
        <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base max-w-3xl leading-relaxed mb-6">
          منظومة تأصيلية جامعة لترتيب التعاريف والمصطلحات الشرعية، الأركان والواجبات والشروط، مهمات الدين التي لا يسع المسلم جهلها، وتراجم أعلام السلف الصالح وعلماء السنة المحققين.
        </p>

        {/* Smart Search Bar */}
        <div className="w-full max-w-4xl lg:max-w-5xl relative mb-4">
          <div className="relative flex items-center shadow-sm rounded-xl overflow-hidden border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900/90 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/20 transition-all">
            <div className="pr-4 pl-2 text-stone-400">
              <Search className="w-5 h-5 text-emerald-800 dark:text-emerald-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في المتون، المصطلحات، الشروط، الأركان، أو أسماء العلماء..."
              className="w-full py-3.5 px-2 text-sm sm:text-base bg-transparent text-stone-900 dark:text-stone-100 focus:outline-none placeholder:text-stone-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="pl-3 pr-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                title="مسح البحث"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick search suggestions */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2.5 text-xs text-stone-500 dark:text-stone-400">
            <span className="text-[11px] text-stone-400 dark:text-stone-500 ml-1">مقترحات:</span>
            {quickSearches.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSearchQuery(item.query)}
                className="px-2 py-0.5 rounded bg-stone-200/60 dark:bg-stone-800/60 hover:bg-emerald-100 hover:text-emerald-900 dark:hover:bg-emerald-950/60 dark:hover:text-emerald-200 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scientific Index Counter Ribbon (Full Width) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mt-4 w-full pt-4 border-t border-stone-200/80 dark:border-stone-800/80">
          <div 
            onClick={() => setActiveCategory('terms')}
            className="flex items-center justify-center gap-3 p-2.5 rounded-lg bg-stone-100/60 dark:bg-stone-900/40 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 cursor-pointer transition-colors"
          >
            <Compass className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
            <div className="text-right">
              <div className="text-lg font-bold font-mono tabular-nums text-stone-900 dark:text-stone-100 leading-none">
                {totalTerms}
              </div>
              <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                مصطلحاً وتقسيماً
              </div>
            </div>
          </div>

          <div 
            onClick={() => setActiveCategory('essentials')}
            className="flex items-center justify-center gap-3 p-2.5 rounded-lg bg-stone-100/60 dark:bg-stone-900/40 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 cursor-pointer transition-colors"
          >
            <Award className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <div className="text-right">
              <div className="text-lg font-bold font-mono tabular-nums text-stone-900 dark:text-stone-100 leading-none">
                {totalEssentials}
              </div>
              <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                من مهمات الدين
              </div>
            </div>
          </div>

          <div 
            onClick={() => setActiveCategory('biographies')}
            className="flex items-center justify-center gap-3 p-2.5 rounded-lg bg-stone-100/60 dark:bg-stone-900/40 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 cursor-pointer transition-colors"
          >
            <FileText className="w-5 h-5 text-teal-700 dark:text-teal-400 shrink-0" />
            <div className="text-right">
              <div className="text-lg font-bold font-mono tabular-nums text-stone-900 dark:text-stone-100 leading-none">
                {totalBiographies}
              </div>
              <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                ترجمة وسيرة علمية
              </div>
            </div>
          </div>

          <div 
            onClick={() => setActiveCategory('books')}
            className="flex items-center justify-center gap-3 p-2.5 rounded-lg bg-stone-100/60 dark:bg-stone-900/40 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 cursor-pointer transition-colors"
          >
            <BookOpen className="w-5 h-5 text-stone-700 dark:text-stone-400 shrink-0" />
            <div className="text-right">
              <div className="text-lg font-bold font-mono tabular-nums text-stone-900 dark:text-stone-100 leading-none">
                {totalBooks}
              </div>
              <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                متناً وكتاباً محرراً
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
