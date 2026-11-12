import React from 'react';
import { 
  Moon, 
  Sun, 
  Scroll, 
  Bookmark, 
  Menu, 
  X 
} from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { ThemeMode } from '../types';

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  onToggleSidebar,
  isSidebarOpen
}) => {
  const { 
    theme, 
    setTheme, 
    favorites, 
    activeCategory, 
    setActiveCategory 
  } = useLibrary();

  const cycleTheme = () => {
    const nextTheme: Record<ThemeMode, ThemeMode> = {
      light: 'sepia',
      sepia: 'dark',
      dark: 'light',
    };
    setTheme(nextTheme[theme]);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'dark':
        return <Moon className="w-4 h-4 text-emerald-400" />;
      case 'sepia':
        return <Scroll className="w-4 h-4 text-amber-700" />;
      default:
        return <Sun className="w-4 h-4 text-amber-500" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'dark':
        return 'ليلي';
      case 'sepia':
        return 'ورق عتيق';
      default:
        return 'نهاري';
    }
  };

  const getCategoryTitle = () => {
    switch (activeCategory) {
      case 'terms': return 'المصطلحات والتقسيمات';
      case 'pillars_matrix': return 'مصفوفة الأركان والشروط';
      case 'essentials': return 'مهمات الدين';
      case 'biographies': return 'تراجم العلماء';
      case 'seerah': return 'السيرة النبوية';
      case 'books': return 'فهرس الكتب والمتون';
      case 'media': return 'الدروس والشروحات';
      case 'favorites': return 'المفضلة والملاحظات';
      default: return 'المكتبة الجامعة';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md border-b-2 border-emerald-900/10 dark:border-emerald-500/20 bg-[#FAF8F5]/95 dark:bg-[#0E1614]/95 transition-colors shadow-2xs">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Zone 1: Right Side (RTL Start) - Mobile toggle & Title */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Mobile toggle button */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl bg-white dark:bg-stone-800 border-2 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 transition-colors shadow-2xs"
            title="تبديل إظهار القائمة الجانبية"
            aria-label="تبديل إظهار القائمة الجانبية"
          >
            {isSidebarOpen ? <X className="w-5 h-5 text-emerald-800 dark:text-emerald-400" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Text Title: مرجع طالب العلم بدلاً من الشعار والبادج */}
          <button
            onClick={() => setActiveCategory('all')}
            className="text-right group cursor-pointer focus:outline-none flex items-center gap-2"
            title="مرجع طالب العلم - الصفحة الرئيسية"
          >
            <div className="px-3 py-1.5 rounded-xl bg-emerald-900/5 dark:bg-emerald-500/10 border border-emerald-800/15 dark:border-emerald-400/20 group-hover:border-emerald-600 transition-colors">
              <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-emerald-950 dark:text-emerald-100 group-hover:text-emerald-800 dark:group-hover:text-amber-300 transition-colors block leading-tight">
                مرجع طالب العلم
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Current Active Section Breadcrumb */}
        <div className="hidden md:flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
          <span className="text-stone-400 dark:text-stone-500">القسم المختار:</span>
          <span className="font-bold text-emerald-900 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/80 px-3 py-1 rounded-lg border border-emerald-300/80 dark:border-emerald-800/80 shadow-2xs">
            {getCategoryTitle()}
          </span>
        </div>

        {/* Zone 3: Left Side (RTL End) - Favorites & Theme Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Quick Favorites link */}
          <button
            onClick={() => setActiveCategory('favorites')}
            className={`px-3 py-2 rounded-xl border-2 transition-all flex items-center gap-1.5 text-xs shadow-2xs ${
              activeCategory === 'favorites'
                ? 'bg-amber-100/80 border-amber-400 text-amber-950 dark:bg-amber-950/80 dark:border-amber-700 dark:text-amber-200 font-bold ring-1 ring-amber-400/30'
                : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-amber-400/60 text-stone-700 dark:text-stone-300'
            }`}
            title="المفضلة والملاحظات"
          >
            <Bookmark className="w-4 h-4 fill-current text-amber-600" />
            {favorites.length > 0 && (
              <span className="font-mono text-[11px] tabular-nums font-bold px-1.5 py-0.2 rounded-full bg-amber-200/80 dark:bg-amber-900 text-amber-900 dark:text-amber-200">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Theme switcher */}
          <button
            onClick={cycleTheme}
            title={`تغيير المظهر: حالياً (${getThemeLabel()})`}
            aria-label={`تغيير المظهر: حالياً (${getThemeLabel()})`}
            className="px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 hover:border-emerald-500/50 text-stone-700 dark:text-stone-300 transition-colors flex items-center gap-1.5 text-xs whitespace-nowrap shadow-2xs"
          >
            {getThemeIcon()}
            <span className="hidden sm:inline text-xs font-medium">{getThemeLabel()}</span>
          </button>

        </div>
      </div>
    </header>
  );
};
