import React, { useState } from 'react';
import { 
  X, 
  Bookmark, 
  Copy, 
  Check, 
  Edit3, 
  Trash2, 
  BookOpen, 
  Quote, 
  StickyNote, 
  Share2, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { KnowledgeItem } from '../types';
import { useLibrary } from '../context/LibraryContext';

interface ItemDetailModalProps {
  item: KnowledgeItem | null;
  onClose: () => void;
  onEdit: (item: KnowledgeItem) => void;
  onNavigateToRelated: (relatedItem: KnowledgeItem) => void;
  onShare?: (item: KnowledgeItem) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onEdit,
  onNavigateToRelated,
  onShare,
}) => {
  const { 
    isFavorite, 
    toggleFavorite, 
    deleteItem, 
    fontSize, 
    items,
    getItemNote,
    saveItemNote
  } = useLibrary();

  const [copied, setCopied] = useState(false);
  const [noteText, setNoteText] = useState(item ? getItemNote(item.id) : '');
  const [isNoteSaved, setIsNoteSaved] = useState(false);

  if (!item) return null;

  const isFav = isFavorite(item.id);

  const handleCopy = () => {
    const textToCopy = `【 ${item.title} 】\n${item.subTitle ? item.subTitle + '\n' : ''}\n${item.content}\n\nالأدلة:\n${item.proofs?.join('\n') || 'نصوص الوحيين'}\n\nالمصادر: ${item.sources?.join('، ') || 'مرجع طالب العلم'}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveNote = () => {
    saveItemNote(item.id, noteText);
    setIsNoteSaved(true);
    setTimeout(() => setIsNoteSaved(false), 2500);
  };

  const handleDelete = () => {
    if (window.confirm(`هل أنت متأكد من حذف "${item.title}"؟`)) {
      deleteItem(item.id);
      onClose();
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm':
        return 'text-sm sm:text-base leading-relaxed';
      case 'lg':
        return 'text-lg sm:text-xl leading-loose';
      case 'xl':
        return 'text-xl sm:text-2xl leading-loose';
      default:
        return 'text-base sm:text-lg leading-relaxed';
    }
  };

  // Find related items by ID
  const relatedItems = (item.relatedIds || [])
    .map((id) => items.find((i) => i.id === id))
    .filter((i): i is KnowledgeItem => Boolean(i));

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FCFAF6] dark:bg-[#141D1A] border border-stone-300 dark:border-stone-700 rounded-2xl shadow-2xl overflow-hidden my-6 text-right max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-xs text-stone-500 dark:text-stone-400 font-mono hidden sm:inline">
              مرجع طالب العلم · {item.field}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite(item.id)}
              className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium ${
                isFav
                  ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title="حفظ في المفضلة"
            >
              <Bookmark className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isFav ? 'محفوظ' : 'حفظ'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="نسخ المرجع كاملاً"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'تم النسخ' : 'نسخ'}</span>
            </button>

            {onShare && (
              <button
                onClick={() => onShare(item)}
                className="p-2 rounded-lg text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors flex items-center gap-1.5 text-xs font-medium border border-emerald-300/40"
                title="مشاركة ونشر المرجع على وسائل التواصل (واتساب، تيليجرام، إكس، فيسبوك)"
              >
                <Share2 className="w-4 h-4" />
                <span>نشر ومشاركة</span>
              </button>
            )}

            <button
              onClick={() => {
                onClose();
                onEdit(item);
              }}
              className="p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="تعديل هذا المرجع"
            >
              <Edit3 className="w-4 h-4" />
              <span className="hidden sm:inline">تعديل</span>
            </button>

            <button
              onClick={handleDelete}
              className="p-2 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              title="حذف"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
          
          {/* Metadata Quiet Line (Zero-Pill Rule) */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-500 dark:text-stone-400 flex-wrap pb-2 border-b border-stone-200/60 dark:border-stone-800/60">
            <span className="text-emerald-800 dark:text-emerald-300 font-semibold">{item.field}</span>
            <span aria-hidden="true">·</span>
            <span>{item.typeTag}</span>
            {item.level && (
              <>
                <span aria-hidden="true">·</span>
                <span>المستوى: {item.level}</span>
              </>
            )}
            {item.scholar && (
              <>
                <span aria-hidden="true">·</span>
                <span>المقرر: {item.scholar}</span>
              </>
            )}
            {item.timelineYear && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{item.timelineYear}</span>
              </>
            )}
          </div>

          {/* Title Area */}
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-100 leading-tight">
              {item.title}
            </h2>
            {item.subTitle && (
              <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base mt-2 font-normal">
                {item.subTitle}
              </p>
            )}
          </div>

          {/* Embedded Video / Media Player if available */}
          {item.mediaUrl && (
            <div className="w-full aspect-video rounded-xl overflow-hidden bg-black shadow-md border border-stone-300 dark:border-stone-700">
              <iframe
                src={item.mediaUrl}
                title={item.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Main Scholarly Body Prose */}
          <div className={`text-stone-800 dark:text-stone-200 whitespace-pre-line font-normal ${getFontSizeClass()}`}>
            {item.content}
          </div>

          {/* Conditions / Steps Checklist if present */}
          {item.conditions && item.conditions.length > 0 && (
            <div className="bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-xl p-5">
              <h4 className="font-heading text-lg font-bold text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>الشروط والأركان والضوابط المقررة:</span>
              </h4>
              <ul className="space-y-2">
                {item.conditions.map((cond, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-stone-700 dark:text-stone-300">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{cond}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Proofs & Evidence from Quran & Sunnah */}
          {item.proofs && item.proofs.length > 0 && (
            <div className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/50 rounded-xl p-5">
              <h4 className="font-heading text-lg font-bold text-amber-950 dark:text-amber-200 mb-3 flex items-center gap-2">
                <Quote className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                <span>الشواهد والأدلة من الكتاب والسنة الصحيحة:</span>
              </h4>
              <div className="space-y-3">
                {item.proofs.map((proof, idx) => (
                  <div 
                    key={idx}
                    className="p-3 bg-white/70 dark:bg-stone-900/70 rounded-lg border border-amber-200/50 dark:border-amber-900/30 font-serif text-sm sm:text-base leading-relaxed text-stone-800 dark:text-stone-200"
                  >
                    {proof}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scholars' Quotes & Sayings */}
          {item.scholarsSayings && item.scholarsSayings.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-heading text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Quote className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>أقوال أئمة السلف والعلماء المحققين:</span>
              </h4>
              {item.scholarsSayings.map((saying, idx) => (
                <div 
                  key={idx}
                  className="p-4 bg-stone-100/70 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 rounded-xl"
                >
                  <p className="font-serif italic text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed mb-2">
                    «{saying.quote}»
                  </p>
                  <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center justify-between">
                    <span className="font-semibold text-emerald-800 dark:text-emerald-400">{saying.scholar}</span>
                    <span className="italic">{saying.source}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Key Takeaways */}
          {item.keyTakeaways && item.keyTakeaways.length > 0 && (
            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40">
              <h4 className="text-sm font-bold text-emerald-950 dark:text-emerald-200 mb-2">
                فوائد وخلاصات منهجية لطالب العلم:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                {item.keyTakeaways.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Documented Sources with Volume and Page (التوثيق المنهجي الدقيق برقم المجلد والصفحة) */}
          {item.sources && item.sources.length > 0 && (
            <div className="p-4 rounded-xl bg-stone-100/80 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 space-y-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
                <BookOpen className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>التوثيق المنهجي والمصادر المعتمدة (برقم المجلد والصفحة):</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                {item.sources.map((src, idx) => (
                  <li 
                    key={idx} 
                    className="p-2.5 rounded-lg bg-white dark:bg-stone-800/90 border border-stone-200/70 dark:border-stone-700 flex items-center justify-between gap-2 shadow-2xs"
                  >
                    <span className="font-medium text-emerald-950 dark:text-emerald-200 leading-snug">{src}</span>
                    <span className="text-[10px] text-stone-400 dark:text-stone-500 font-mono shrink-0">موثّق</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Student's Personal Study Notes Area */}
          <div className="p-4 rounded-xl bg-stone-100/60 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                <StickyNote className="w-3.5 h-3.5 text-amber-600" />
                <span>ملاحظاتك وفوائدك الشخصية على هذا المرجع (تُحفظ تلقائياً في جهازك):</span>
              </label>
              {isNoteSaved && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  تم حفظ الفائدة بنجاح
                </span>
              )}
            </div>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="قيّد هنا استنباطك، أسئلتك، أو شروحات سمعتها من شيخك..."
              className="w-full text-xs sm:text-sm p-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-emerald-600 h-24 resize-y"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSaveNote}
                className="px-4 py-1.5 rounded-lg bg-emerald-800 dark:bg-emerald-700 hover:bg-emerald-900 text-white text-xs font-medium transition-colors"
              >
                حفظ الفائدة
              </button>
            </div>
          </div>

          {/* Related References / Cross-Linking */}
          {relatedItems.length > 0 && (
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
              <h4 className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3">
                مراجع ومواضيع ذات صلة وثيقة:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {relatedItems.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => onNavigateToRelated(rel)}
                    className="p-3 text-right rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-emerald-600 transition-colors group flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-stone-800 dark:text-stone-200 group-hover:text-emerald-800 dark:group-hover:text-emerald-300">
                        {rel.title}
                      </div>
                      <div className="text-[11px] text-stone-500 dark:text-stone-400">
                        {rel.field} · {rel.typeTag}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-700 transition-transform group-hover:translate-x-[-2px]" />
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 flex items-center justify-between text-xs text-stone-500">
          <div>
            تاريخ التوثيق: {item.createdAt}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition-colors"
          >
            إغلاق المرجع
          </button>
        </div>

      </div>
    </div>
  );
};
