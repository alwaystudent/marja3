import React, { useState } from 'react';
import { 
  Bookmark, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  Check, 
  Copy, 
  StickyNote,
  BookOpen,
  Quote,
  Share2
} from 'lucide-react';
import { KnowledgeItem } from '../types';
import { useLibrary } from '../context/LibraryContext';

interface ItemCardProps {
  item: KnowledgeItem;
  onOpenDetail: (item: KnowledgeItem) => void;
  onEdit: (item: KnowledgeItem) => void;
  onShare?: (item: KnowledgeItem) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ 
  item, 
  onOpenDetail, 
  onEdit,
  onShare
}) => {
  const { 
    isFavorite, 
    toggleFavorite, 
    deleteItem, 
    fontSize,
    getItemNote,
    saveItemNote
  } = useLibrary();

  const [copied, setCopied] = useState(false);
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [noteText, setNoteText] = useState(getItemNote(item.id));
  const isFav = isFavorite(item.id);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `${item.title}\n${item.subTitle ? item.subTitle + '\n' : ''}\n${item.content}\n\n[المصدر: ${item.sources?.join('، ') || 'مرجع طالب العلم'}]`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.stopPropagation();
    saveItemNote(item.id, noteText);
    setShowNoteEditor(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`هل أنت متأكد من رغبتك في حذف "${item.title}" من مراجعك؟`)) {
      deleteItem(item.id);
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm':
        return 'text-xs leading-relaxed';
      case 'lg':
        return 'text-base leading-relaxed';
      case 'xl':
        return 'text-lg leading-loose';
      default:
        return 'text-sm leading-relaxed';
    }
  };

  // Visual categorization styling per Islamic Field for clear border accents
  const getFieldTheme = () => {
    switch (item.field) {
      case 'العقيدة':
        return {
          border: 'border-emerald-600/40 hover:border-emerald-600 dark:border-emerald-700/50 dark:hover:border-emerald-400',
          accent: 'bg-emerald-600',
          badgeBg: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800',
          tagBg: 'text-emerald-800 dark:text-emerald-300',
        };
      case 'الفقه':
        return {
          border: 'border-blue-500/40 hover:border-blue-600 dark:border-blue-700/50 dark:hover:border-blue-400',
          accent: 'bg-blue-600',
          badgeBg: 'bg-blue-50 dark:bg-blue-950/70 text-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800',
          tagBg: 'text-blue-800 dark:text-blue-300',
        };
      case 'أصول الفقه':
        return {
          border: 'border-indigo-500/40 hover:border-indigo-600 dark:border-indigo-700/50 dark:hover:border-indigo-400',
          accent: 'bg-indigo-600',
          badgeBg: 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-200 border-indigo-200 dark:border-indigo-800',
          tagBg: 'text-indigo-800 dark:text-indigo-300',
        };
      case 'مصطلح الحديث':
        return {
          border: 'border-amber-600/40 hover:border-amber-600 dark:border-amber-700/50 dark:hover:border-amber-400',
          accent: 'bg-amber-600',
          badgeBg: 'bg-amber-50 dark:bg-amber-950/70 text-amber-950 dark:text-amber-200 border-amber-200 dark:border-amber-800',
          tagBg: 'text-amber-800 dark:text-amber-300',
        };
      case 'القواعد الفقهية':
        return {
          border: 'border-teal-500/40 hover:border-teal-600 dark:border-teal-700/50 dark:hover:border-teal-400',
          accent: 'bg-teal-600',
          badgeBg: 'bg-teal-50 dark:bg-teal-950/70 text-teal-900 dark:text-teal-200 border-teal-200 dark:border-teal-800',
          tagBg: 'text-teal-800 dark:text-teal-300',
        };
      case 'السيرة النبوية':
        return {
          border: 'border-rose-500/40 hover:border-rose-600 dark:border-rose-700/50 dark:hover:border-rose-400',
          accent: 'bg-rose-600',
          badgeBg: 'bg-rose-50 dark:bg-rose-950/70 text-rose-900 dark:text-rose-200 border-rose-200 dark:border-rose-800',
          tagBg: 'text-rose-800 dark:text-rose-300',
        };
      case 'التراجم والرجال':
        return {
          border: 'border-violet-500/40 hover:border-violet-600 dark:border-violet-700/50 dark:hover:border-violet-400',
          accent: 'bg-violet-600',
          badgeBg: 'bg-violet-50 dark:bg-violet-950/70 text-violet-900 dark:text-violet-200 border-violet-200 dark:border-violet-800',
          tagBg: 'text-violet-800 dark:text-violet-300',
        };
      default:
        return {
          border: 'border-stone-300 hover:border-stone-500 dark:border-stone-700 dark:hover:border-stone-500',
          accent: 'bg-stone-500',
          badgeBg: 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-700',
          tagBg: 'text-stone-700 dark:text-stone-300',
        };
    }
  };

  const themeColors = getFieldTheme();

  return (
    <div 
      onClick={() => onOpenDetail(item)}
      className={`group relative flex flex-col justify-between bg-white dark:bg-[#151F1C] border-2 ${themeColors.border} rounded-2xl p-5 hover:shadow-lg transition-all duration-200 cursor-pointer text-right overflow-hidden shadow-xs`}
    >
      {/* Top Color Accent Strip */}
      <div className={`absolute top-0 right-0 left-0 h-1.5 ${themeColors.accent}`} />

      <div>
        {/* Header Metadata Bar: Clear, Distinct, Colored */}
        <div className="flex items-center justify-between text-xs mb-3 pt-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`px-2.5 py-0.5 rounded-md font-bold text-[11px] border ${themeColors.badgeBg}`}>
              {item.field}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 text-[11px] font-medium border border-stone-200 dark:border-stone-700">
              {item.typeTag}
            </span>
            {item.level && (
              <span className="text-stone-500 dark:text-stone-400 text-[11px] font-medium">
                · {item.level}
              </span>
            )}
            {item.timelineYear && (
              <span className="text-stone-500 dark:text-stone-400 text-[11px] font-mono">
                · {item.timelineYear}
              </span>
            )}
          </div>

          {/* Quick Actions Header */}
          <div className="flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(item.id);
              }}
              className={`p-1.5 rounded-lg border transition-all ${
                isFav 
                  ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/70 dark:text-amber-300 border-amber-300 dark:border-amber-800 shadow-2xs' 
                  : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 border-transparent'
              }`}
              title={isFav ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
            >
              <Bookmark className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="نسخ سريع للنص والمصدر"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600 font-bold" /> : <Copy className="w-4 h-4" />}
            </button>

            {onShare && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(item);
                }}
                className="p-1.5 rounded-lg text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                title="مشاركة ونشر المرجع (واتساب، تيليجرام، إكس، وبطرق متعددة)"
              >
                <Share2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-heading text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-50 mb-1.5 leading-snug group-hover:text-emerald-900 dark:group-hover:text-emerald-300 transition-colors">
          {item.title}
        </h3>

        {/* Subtitle if available */}
        {item.subTitle && (
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mb-3 font-normal line-clamp-1">
            {item.subTitle}
          </p>
        )}

        {/* Scholar Attribution */}
        {(item.scholar || item.bookAuthor) && (
          <div className="text-xs text-stone-700 dark:text-stone-300 font-medium mb-3 flex items-center gap-1.5 bg-stone-50 dark:bg-stone-900/60 p-2 rounded-lg border border-stone-200/70 dark:border-stone-800/80">
            <Quote className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">{item.bookAuthor ? `المؤلف: ${item.bookAuthor}` : `المقرر: ${item.scholar}`}</span>
          </div>
        )}

        {/* Content Excerpt with high legibility */}
        <div className={`text-stone-800 dark:text-stone-200 line-clamp-4 mb-4 whitespace-pre-line font-normal ${getFontSizeClass()}`}>
          {item.content}
        </div>

        {/* Proofs / Conditions Counter Snippet with Clear Callout Frame */}
        {(item.proofs && item.proofs.length > 0) && (
          <div className="text-xs text-amber-950 dark:text-amber-100 bg-amber-50/80 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-800/80 rounded-xl p-3 mb-3 line-clamp-2 font-serif leading-relaxed shadow-2xs">
            <span className="font-bold text-amber-900 dark:text-amber-300 ml-1.5 not-italic font-sans">📖 الشاهد:</span>
            «{item.proofs[0]}»
          </div>
        )}

        {/* Documented Source with Volume and Page - Distinctive Islamic Green/Gold styling */}
        {item.sources && item.sources.length > 0 && (
          <div className="text-[11px] mb-3 flex items-start gap-1.5 p-2 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/50 leading-snug">
            <BookOpen className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="truncate">
              <span className="font-bold text-emerald-950 dark:text-emerald-300 ml-1">المصدر والتوثيق:</span>
              <span className="text-stone-700 dark:text-stone-300 font-medium">
                {item.sources[0]}
                {item.sources.length > 1 && ` (+${item.sources.length - 1} مصادر أخرى)`}
              </span>
            </div>
          </div>
        )}

        {/* Personal Study Note Indicator if present */}
        {getItemNote(item.id) && (
          <div className="flex items-start gap-1.5 text-xs text-amber-800 dark:text-amber-300/90 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 rounded-lg p-2 mb-3">
            <StickyNote className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <span className="line-clamp-2">فائدتك المقيدة: {getItemNote(item.id)}</span>
          </div>
        )}

        {/* Inline Note Editor form */}
        {showNoteEditor && (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="mb-3 p-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg"
          >
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="اكتب فائدتك أو استنباطك من هذا المرجع..."
              className="w-full text-xs p-2 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-emerald-600 resize-none h-16"
            />
            <div className="flex items-center justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setShowNoteEditor(false)}
                className="text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 px-2 py-1"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={handleSaveNote}
                className="text-xs bg-emerald-800 text-white px-3 py-1 rounded hover:bg-emerald-900 transition-colors"
              >
                حفظ الفائدة
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer: Detail Link + Edit / Delete controls */}
      <div className="pt-3.5 border-t border-stone-200/90 dark:border-stone-800 flex items-center justify-between mt-auto">
        
        {/* Left Side: Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowNoteEditor(!showNoteEditor);
            }}
            className="p-1.5 rounded-lg text-stone-500 hover:text-amber-800 dark:hover:text-amber-300 hover:bg-amber-100/60 dark:hover:bg-amber-950/50 transition-colors"
            title="تقييد فائدة أو تعليق"
          >
            <StickyNote className="w-4 h-4" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(item);
            }}
            className="p-1.5 rounded-lg text-stone-500 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-100/60 dark:hover:bg-blue-950/50 transition-colors"
            title="تعديل هذا المرجع"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          <button
            onClick={handleDelete}
            className="p-1.5 rounded-lg text-stone-500 hover:text-rose-700 dark:hover:text-rose-400 hover:bg-rose-100/60 dark:hover:bg-rose-950/50 transition-colors"
            title="حذف هذا المرجع"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Right Side: Read Full Reference Button with Distinct Pill Framing */}
        <button
          onClick={() => onOpenDetail(item)}
          className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 dark:text-emerald-200 hover:text-emerald-950 dark:hover:text-white bg-emerald-100/70 hover:bg-emerald-200/80 dark:bg-emerald-950/80 dark:hover:bg-emerald-900 py-1.5 px-3 rounded-xl border border-emerald-300/80 dark:border-emerald-700/80 shadow-2xs transition-all group-hover:scale-102"
        >
          <span>مطالعة المرجع</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
};
