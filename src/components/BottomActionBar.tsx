import React from 'react';
import { Home, Plus, Database, Sparkles } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

interface BottomActionBarProps {
  onOpenNewItemModal: () => void;
  onOpenDataModal: () => void;
}

export const BottomActionBar: React.FC<BottomActionBarProps> = ({
  onOpenNewItemModal,
  onOpenDataModal,
}) => {
  const { setActiveCategory, activeCategory } = useLibrary();

  const handleGoHome = () => {
    setActiveCategory('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHomeActive = activeCategory === 'all';

  return (
    <div 
      role="toolbar"
      aria-label="شريط الإجراءات والتحكم السفلي"
      className="fixed bottom-0 left-0 right-0 z-30 w-full backdrop-blur-md bg-[#FAF8F5]/95 dark:bg-[#0E1614]/95 border-t border-stone-200/90 dark:border-stone-800/90 shadow-2xl px-4 sm:px-8 py-2.5 transition-colors"
    >
      <div className="w-full flex items-center justify-between sm:justify-center gap-3 sm:gap-12 md:gap-20">
        
        {/* 1. رمز الرئيسية (Home) */}
        <button
          onClick={handleGoHome}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            isHomeActive
              ? 'bg-emerald-800/15 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-200 font-bold border border-emerald-700/30'
              : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800/60'
          }`}
          title="الرجوع إلى الصفحة الرئيسية وجميع المراجع"
        >
          <Home className={`w-5 h-5 ${isHomeActive ? 'text-emerald-800 dark:text-emerald-400' : 'text-stone-500 dark:text-stone-400'}`} />
          <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
            الرئيسية
          </span>
        </button>

        {/* 2. زر الإضافة (Add Item) - تم حذف كلمة علمية */}
        <button
          onClick={onOpenNewItemModal}
          className="flex items-center gap-2 px-5 sm:px-8 py-2.5 rounded-xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 hover:from-emerald-950 hover:to-emerald-850 text-white font-bold text-xs sm:text-sm shadow-md ring-2 ring-emerald-600/40 hover:scale-102 transition-all shrink-0"
          title="إضافة مادة جديدة إلى مكتبتك"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
          <span className="whitespace-nowrap">إضافة مادة</span>
        </button>

        {/* 3. رمز إدارة البيانات (أيقونة واضحة ومفهومة بدون كتابة) */}
        <button
          onClick={onOpenDataModal}
          className="p-2.5 sm:px-3 sm:py-2.5 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-200/70 dark:hover:bg-stone-800/70 transition-all border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 flex items-center justify-center group relative shadow-xs"
          title="إدارة بيانات المكتبة (تصدير، استيراد، ونسخ احتياطي)"
          aria-label="إدارة بيانات المكتبة"
        >
          <Database className="w-5 h-5 text-amber-700 dark:text-amber-400 group-hover:scale-110 transition-transform" />
          {/* Subtle indicator dot to enhance clarity */}
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 ring-2 ring-white dark:ring-stone-900" />
        </button>

      </div>
    </div>
  );
};
