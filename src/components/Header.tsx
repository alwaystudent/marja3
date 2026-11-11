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
    <header className="sticky top-0 z-40 w-full backdrop-blur-md border-b border-stone-200/90 dark:border-stone-800/90 bg-[#FAF8F5]/95 dark:bg-[#0E1614]/95 transition-colors">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Zone 1: Right Side (RTL Start) - Mobile toggle & Elegant Emblem Logo */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Mobile toggle button */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
            title="تبديل إظهار القائمة الجانبية"
            aria-label="تبديل إظهار القائمة الجانبية"
          >
            {isSidebarOpen ? <X className="w-5 h-5 text-emerald-800 dark:text-emerald-400" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Text Title: مرجع طالب العلم بدلاً من الشعار والبادج */}
          <button
            onClick={() => setActiveCategory('all')}
            className="text-right group cursor-pointer focus:outline-none"
            title="مرجع طالب العلم - الصفحة الرئيسية"
          >
            <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-emerald-950 dark:text-emerald-100 group-hover:text-emerald-800 dark:group-hover:text-amber-300 transition-colors block leading-tight">
              مرجع طالب العلم
            </span>
          </button>
        </div>

        {/* Zone 2: Current Active Section Breadcrumb */}
        <div className="hidden md:flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
          <span className="text-stone-400 dark:text-stone-600">القسم المختار:</span>
          <span className="font-bold text-emerald-900 dark:text-emerald-300 bg-stone-200/60 dark:bg-stone-800/80 px-2.5 py-1 rounded-md">
            {getCategoryTitle()}
          </span>
        </div>

        {/* Zone 3: Left Side (RTL End) - Favorites & Theme Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Quick Favorites link */}
          <button
            onClick={() => setActiveCategory('favorites')}
            className={`p-2 rounded-lg border transition-colors flex items-center gap-1.5 text-xs ${
              activeCategory === 'favorites'
                ? 'bg-amber-100 border-amber-300 text-amber-900 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-200 font-bold'
                : 'border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
            }`}
            title="المفضلة والملاحظات"
          >
            <Bookmark className="w-4 h-4 fill-current text-amber-600" />
            {favorites.length > 0 && (
              <span className="font-mono text-[11px] tabular-nums font-bold">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Theme switcher */}
          <button
            onClick={cycleTheme}
            title={`تغيير المظهر: حالياً (${getThemeLabel()})`}
            aria-label={`تغيير المظهر: حالياً (${getThemeLabel()})`}
            className="px-2.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition-colors flex items-center gap-1.5 text-xs whitespace-nowrap"
          >
            {getThemeIcon()}
            <span className="hidden sm:inline text-xs">{getThemeLabel()}</span>
          </button>

        </div>
      </div>
    </header>
  );
};
