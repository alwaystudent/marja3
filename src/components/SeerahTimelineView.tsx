import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  BookOpen, 
  ChevronRight, 
  ArrowLeft, 
  Bookmark,
  Quote,
  Plus,
  Edit3,
  Trash2,
  Share2
} from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { KnowledgeItem, MainCategory } from '../types';

interface SeerahTimelineViewProps {
  onOpenDetail: (item: KnowledgeItem) => void;
  onEdit: (item: KnowledgeItem) => void;
  onAddNew: (category: MainCategory, field?: string, title?: string) => void;
  onShare?: (item: KnowledgeItem) => void;
}

export const SeerahTimelineView: React.FC<SeerahTimelineViewProps> = ({ 
  onOpenDetail,
  onEdit,
  onAddNew,
  onShare
}) => {
  const { items, isFavorite, toggleFavorite, deleteItem } = useLibrary();

  const seerahItems = items
    .filter((i) => i.category === 'seerah' || i.field === 'السيرة النبوية')
    .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));

  const [selectedMilestone, setSelectedMilestone] = useState<KnowledgeItem | null>(
    seerahItems[0] || null
  );

  const activeMilestone = seerahItems.find(i => i.id === selectedMilestone?.id) || seerahItems[0] || null;

  const handleDeleteMilestone = (item: KnowledgeItem) => {
    if (window.confirm(`هل أنت متأكد من حذف محطة "${item.title}" من مسار السيرة النبوية؟`)) {
      deleteItem(item.id);
      if (selectedMilestone?.id === item.id) {
        setSelectedMilestone(seerahItems.find(i => i.id !== item.id) || null);
      }
    }
  };

  return (
    <div className="w-full text-right space-y-6">
      
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
            مسار السيرة النبوية العطرة والتوثيق
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm mt-1">
            تسلسل زمني موثق لمحطات السيرة النبوية الكبرى من المولد الشريف حتى الوفاة مع إمكانية التعديل والإضافة والحذف.
          </p>
        </div>

        <button
          onClick={() => onAddNew('seerah', 'السيرة النبوية', 'محطة جديدة في السيرة النبوية')}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة محطة جديدة في السيرة</span>
        </button>
      </div>

      {/* 2-Column Split: Timeline Navigation (Right/Start) + Deep Viewer (Left/Center) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Milestones Vertical Rail (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>محطات السيرة المرتبة زمنياً:</span>
            <span className="font-mono text-xs">{seerahItems.length} محطات</span>
          </div>
          
          <div className="space-y-2.5 max-h-[75vh] overflow-y-auto pr-1">
            {seerahItems.map((item, idx) => {
              const isSelected = activeMilestone?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedMilestone(item)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-white dark:bg-[#14201C] border-emerald-700 dark:border-emerald-500 shadow-md ring-1 ring-emerald-600/20'
                      : 'bg-white/60 dark:bg-stone-900/40 border-stone-200 dark:border-stone-800 hover:bg-white dark:hover:bg-stone-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      {item.timelineYear && (
                        <span className="font-mono text-emerald-800 dark:text-emerald-400 font-medium">
                          {item.timelineYear}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item.id);
                        }}
                        className="p-1 text-stone-400 hover:text-amber-600"
                        title="حفظ في المفضلة"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isFavorite(item.id) ? 'text-amber-600 fill-current' : ''}`} />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(item);
                        }}
                        className="p-1 text-stone-400 hover:text-emerald-700"
                        title="تعديل هذه المحطة"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMilestone(item);
                        }}
                        className="p-1 text-stone-400 hover:text-rose-600"
                        title="حذف هذه المحطة"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h4 className="font-heading font-bold text-base text-stone-900 dark:text-stone-100 leading-snug">
                    {item.title}
                  </h4>

                  {item.subTitle && (
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 line-clamp-1">
                      {item.subTitle}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestone Detail Inspector (7 cols on lg) */}
        {activeMilestone ? (
          <div className="lg:col-span-7 bg-white dark:bg-[#151F1C] border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm sticky top-20">
            
            {/* Header info with prominent Edit and Delete controls */}
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-2">
                <span className="font-mono text-emerald-800 dark:text-emerald-400 font-semibold text-sm">
                  {activeMilestone.timelineYear || 'السيرة النبوية'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(activeMilestone.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isFavorite(activeMilestone.id)
                        ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/60'
                        : 'text-stone-400 hover:text-stone-700'
                    }`}
                    title="حفظ في المفضلة"
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>

                  {onShare && (
                    <button
                      onClick={() => onShare(activeMilestone)}
                      className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-emerald-700 transition-colors flex items-center gap-1 text-xs"
                      title="مشاركة ونشر هذه المحطة في السيرة"
                    >
                      <Share2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>مشاركة</span>
                    </button>
                  )}

                  <button
                    onClick={() => onEdit(activeMilestone)}
                    className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-emerald-700 transition-colors flex items-center gap-1 text-xs"
                    title="تعديل محتوى المحطة"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>تعديل</span>
                  </button>

                  <button
                    onClick={() => handleDeleteMilestone(activeMilestone)}
                    className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-rose-600 transition-colors"
                    title="حذف المحطة"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
                {activeMilestone.title}
              </h3>

              {activeMilestone.subTitle && (
                <p className="text-stone-600 dark:text-stone-400 text-sm mt-1">
                  {activeMilestone.subTitle}
                </p>
              )}
            </div>

            {/* Narrative Content */}
            <div className="text-stone-800 dark:text-stone-200 text-sm sm:text-base leading-relaxed whitespace-pre-line border-t border-stone-100 dark:border-stone-800 pt-4">
              {activeMilestone.content}
            </div>

            {/* Quran / Hadith proofs */}
            {activeMilestone.proofs && activeMilestone.proofs.length > 0 && (
              <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 rounded-xl p-4 space-y-2">
                <h5 className="font-heading font-bold text-sm text-amber-950 dark:text-amber-200 flex items-center gap-2">
                  <Quote className="w-3.5 h-3.5 text-amber-700" />
                  <span>الشواهد القرآنية والنبوية:</span>
                </h5>
                {activeMilestone.proofs.map((proof, idx) => (
                  <p key={idx} className="font-serif text-xs sm:text-sm text-stone-800 dark:text-stone-200">
                    {proof}
                  </p>
                ))}
              </div>
            )}

            {/* Key Takeaways */}
            {activeMilestone.keyTakeaways && activeMilestone.keyTakeaways.length > 0 && (
              <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 rounded-xl p-4">
                <h5 className="font-bold text-xs text-emerald-950 dark:text-emerald-200 mb-2">
                  الدروس والعبر العقدية والتربوية:
                </h5>
                <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                  {activeMilestone.keyTakeaways.map((k, idx) => (
                    <li key={idx}>{k}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sources & Full View CTA */}
            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
              <div>
                <span className="font-bold text-stone-700 dark:text-stone-300">المصادر:</span>{' '}
                {activeMilestone.sources?.join(' · ') || 'كتب السيرة المعتمدة'}
              </div>
              <button
                onClick={() => onOpenDetail(activeMilestone)}
                className="text-emerald-800 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>مطالعة كاملة</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ) : (
          <div className="lg:col-span-7 p-12 text-center bg-white dark:bg-[#151F1C] border border-stone-200 dark:border-stone-800 rounded-2xl text-stone-500">
            لا توجد محطات في السيرة حالياً. يمكنك إضافة محطة جديدة الآن.
          </div>
        )}

      </div>
    </div>
  );
};
