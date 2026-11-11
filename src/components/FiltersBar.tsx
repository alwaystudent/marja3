import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { IslamicField } from '../types';

export const FiltersBar: React.FC = () => {
  const {
    selectedField,
    setSelectedField,
    selectedTypeTag,
    setSelectedTypeTag,
    selectedScholar,
    setSelectedScholar,
    selectedLevel,
    setSelectedLevel,
    clearFilters,
    searchQuery,
  } = useLibrary();

  const fields: { id: string; label: string }[] = [
    { id: 'all', label: 'جميع الفنون الشرعية' },
    { id: 'العقيدة', label: 'العقيدة والتوحيد' },
    { id: 'الفقه', label: 'الفقه وأحكام العبادات' },
    { id: 'أصول الفقه', label: 'أصول الفقه' },
    { id: 'مصطلح الحديث', label: 'مصطلح الحديث والسنن' },
    { id: 'القواعد الفقهية', label: 'القواعد الفقهية' },
    { id: 'السيرة النبوية', label: 'السيرة النبوية' },
    { id: 'التراجم والرجال', label: 'التراجم وسير الأعلام' },
  ];

  const typeTags: { id: string; label: string }[] = [
    { id: 'all', label: 'جميع الأنواع' },
    { id: 'تعريف', label: 'تعريف شرعي' },
    { id: 'تقسيم', label: 'تقسيم علمي' },
    { id: 'شرط', label: 'شروط' },
    { id: 'ركن', label: 'أركان' },
    { id: 'واجب', label: 'واجبات' },
    { id: 'قاعدة', label: 'قواعد فقهية' },
    { id: 'أصل', label: 'أصول' },
    { id: 'مهمة دينية', label: 'مهمات الدين' },
    { id: 'ترجمة', label: 'تراجم' },
    { id: 'كتاب', label: 'متون وكتب' },
    { id: 'درس', label: 'دروس ومقالات' },
  ];

  const scholars: { id: string; label: string }[] = [
    { id: 'all', label: 'جميع أئمة السنة' },
    { id: 'ابن تيمية', label: 'شيخ الإسلام ابن تيمية' },
    { id: 'ابن القيم', label: 'الإمام ابن قيم الجوزية' },
    { id: 'ابن باز', label: 'سماحة الشيخ ابن باز' },
    { id: 'ابن عثيمين', label: 'العلامة ابن عثيمين' },
    { id: 'الألباني', label: 'محدث العصر الألباني' },
    { id: 'الفوزان', label: 'الشيخ صالح الفوزان' },
    { id: 'عبد الرزاق البدر', label: 'الشيخ عبد الرزاق البدر' },
  ];

  const levels: { id: string; label: string }[] = [
    { id: 'all', label: 'جميع المستويات' },
    { id: 'مبتدئ', label: 'مستوى المبتدئين' },
    { id: 'متوسط', label: 'مستوى المتوسطين' },
    { id: 'متقدم', label: 'مستوى المتقدمين' },
  ];

  const hasActiveFilters =
    selectedField !== 'all' ||
    selectedTypeTag !== 'all' ||
    selectedScholar !== 'all' ||
    selectedLevel !== 'all' ||
    searchQuery.trim() !== '';

  return (
    <div className="w-full bg-white/70 dark:bg-[#121A18]/70 border-b border-stone-200/80 dark:border-stone-800/80 py-3 transition-colors">
      <div className="w-full px-4 sm:px-6 lg:px-10 flex flex-wrap items-center justify-between gap-3">
        
        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 font-medium pl-1">
            <Filter className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>تصفية المراجع:</span>
          </div>

          {/* Field Filter */}
          <select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            className="text-xs py-1.5 px-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-emerald-600 transition-colors"
          >
            {fields.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>

          {/* Type Tag Filter */}
          <select
            value={selectedTypeTag}
            onChange={(e) => setSelectedTypeTag(e.target.value)}
            className="text-xs py-1.5 px-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-emerald-600 transition-colors"
          >
            {typeTags.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>

          {/* Scholar Filter */}
          <select
            value={selectedScholar}
            onChange={(e) => setSelectedScholar(e.target.value)}
            className="text-xs py-1.5 px-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-emerald-600 transition-colors"
          >
            {scholars.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>

          {/* Level Filter */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="text-xs py-1.5 px-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-emerald-600 transition-colors"
          >
            {levels.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters CTA */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 font-medium transition-colors py-1 px-2.5 rounded-lg hover:bg-amber-100/50 dark:hover:bg-amber-950/40"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة ضبط المرشحات</span>
          </button>
        )}

      </div>
    </div>
  );
};
