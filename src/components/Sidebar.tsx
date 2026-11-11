import React from 'react';
import { 
  Library, 
  Compass, 
  Grid3X3, 
  Award, 
  Users, 
  History, 
  BookMarked, 
  Video, 
  Bookmark, 
  Plus, 
  Download, 
  X,
  Filter, 
  Layers, 
  Sparkles 
} from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { MainCategory, IslamicField } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenNewItemModal: () => void;
  onOpenDataModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  onOpenNewItemModal,
  onOpenDataModal,
}) => {
  const { 
    activeCategory, 
    setActiveCategory, 
    favorites, 
    items,
    selectedField,
    setSelectedField
  } = useLibrary();

  const navItems: { id: MainCategory | 'all'; label: string; icon: React.ReactNode; count: number }[] = [
    { 
      id: 'all', 
      label: 'جميع المراجع العلمية', 
      icon: <Library className="w-4 h-4" />,
      count: items.length 
    },
    { 
      id: 'terms', 
      label: 'المصطلحات والتقسيمات', 
      icon: <Compass className="w-4 h-4" />,
      count: items.filter(i => i.category === 'terms').length 
    },
    { 
      id: 'pillars_matrix', 
      label: 'مصفوفة الأركان والشروط', 
      icon: <Grid3X3 className="w-4 h-4" />,
      count: items.filter(i => i.category === 'pillars_matrix').length 
    },
    { 
      id: 'essentials', 
      label: 'مهمات الدين ومسائل الإيمان', 
      icon: <Award className="w-4 h-4" />,
      count: items.filter(i => i.category === 'essentials').length 
    },
    { 
      id: 'biographies', 
      label: 'تراجم وسير أئمة الأمة', 
      icon: <Users className="w-4 h-4" />,
      count: items.filter(i => i.category === 'biographies').length 
    },
    { 
      id: 'seerah', 
      label: 'السيرة النبوية والتوثيق', 
      icon: <History className="w-4 h-4" />,
      count: items.filter(i => i.category === 'seerah' || i.field === 'السيرة النبوية').length 
    },
    { 
      id: 'books', 
      label: 'فهرس الكتب والمتون المقررة', 
      icon: <BookMarked className="w-4 h-4" />,
      count: items.filter(i => i.category === 'books').length 
    },
    { 
      id: 'media', 
      label: 'الدروس والشروحات والمقالات', 
      icon: <Video className="w-4 h-4" />,
      count: items.filter(i => i.category === 'media').length 
    },
    { 
      id: 'favorites', 
      label: 'المفضلة والفوائد الشخصية', 
      icon: <Bookmark className="w-4 h-4" />,
      count: favorites.length 
    },
  ];

  const quickFields: { id: IslamicField | 'all'; label: string }[] = [
    { id: 'all', label: 'كافة الفنون' },
    { id: 'العقيدة', label: 'العقيدة والتوحيد' },
    { id: 'الفقه', label: 'الفقه وأحكام العبادات' },
    { id: 'أصول الفقه', label: 'أصول الفقه' },
    { id: 'مصطلح الحديث', label: 'الحديث ومصطلحه' },
    { id: 'القواعد الفقهية', label: 'القواعد الفقهية' },
  ];

  const handleSelectNav = (id: MainCategory | 'all') => {
    setActiveCategory(id);
    onClose();
  };

  const handleSelectField = (field: IslamicField | 'all') => {
    setSelectedField(field);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay (only on mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Persistent Sidebar Docked Under Logo on Desktop (lg:sticky top-16), Drawer on Mobile */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-16 right-0 z-40 lg:z-10 h-screen lg:h-[calc(100vh-4rem)] w-72 sm:w-80 shrink-0 bg-[#FAF8F5] dark:bg-[#0E1614] border-l border-stone-200 dark:border-stone-800 flex flex-col justify-between transition-transform duration-300 ease-in-out text-right ${
          isOpen ? 'translate-x-0 shadow-2xl lg:shadow-none' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        
        {/* Top Section inside Sidebar */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          
          {/* Header with Title & Close button */}
          <div className="flex items-center justify-between pb-3.5 border-b border-stone-200 dark:border-stone-800">
            <div>
              <div className="font-heading font-bold text-base text-stone-900 dark:text-stone-100">
                فهرس المراجع والأقسام
              </div>
              <div className="text-[11px] text-stone-500 dark:text-stone-400">
                مرجع طالب العلم الشامل
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
              title="إغلاق الفهرس"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Primary Action Button: Add Reference */}
          <div>
            <button
              onClick={() => {
                onOpenNewItemModal();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all group"
            >
              <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
              <span>إضافة مادة علمية جديدة</span>
            </button>
          </div>

          {/* Group 1: Main Category Sections */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold text-stone-400 dark:text-stone-500 px-2 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>أقسام المراجع العلمية</span>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeCategory === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectNav(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-emerald-800/15 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-200 font-bold border-r-4 border-emerald-700 dark:border-emerald-400 shadow-xs'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-stone-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-stone-400'}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>

                    <span
                      className={`text-[11px] font-mono px-2 py-0.5 rounded-full tabular-nums ${
                        isActive
                          ? 'bg-emerald-800 text-white dark:bg-emerald-700'
                          : 'bg-stone-200/80 text-stone-600 dark:bg-stone-800 dark:text-stone-400'
                      }`}
                    >
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Group 2: Quick Field Filter */}
          <div className="pt-4 border-t border-stone-200/80 dark:border-stone-800/80 space-y-2">
            <div className="text-[11px] font-bold text-stone-400 dark:text-stone-500 px-2 uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              <span>تصفية الفنون الشرعية</span>
            </div>

            <div className="flex flex-wrap gap-1.5 px-1">
              {quickFields.map((f) => {
                const isFieldActive = selectedField === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => handleSelectField(f.id)}
                    className={`text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
                      isFieldActive
                        ? 'bg-amber-100 text-amber-950 dark:bg-amber-950/60 dark:text-amber-200 font-bold border border-amber-300 dark:border-amber-800'
                        : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Sidebar Footer: Backup & Database Utility */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-[#F5F1E8] dark:bg-[#0A100E] space-y-2">
          <button
            onClick={() => {
              onOpenDataModal();
              onClose();
            }}
            className="w-full flex items-center justify-between py-2 px-3 rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-white dark:hover:bg-stone-800 text-xs text-stone-700 dark:text-stone-300 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Download className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>النسخ الاحتياطي وإدارة البيانات</span>
            </div>
            <span className="font-mono text-[10px] text-stone-400">JSON</span>
          </button>

          <div className="text-[10px] text-center text-stone-500 dark:text-stone-400">
            مرجع طالب العلم · إصدار 2.0 مؤصل
          </div>
        </div>

      </aside>
    </>
  );
};
