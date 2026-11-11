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

  return (
    <div 
      onClick={() => onOpenDetail(item)}
      className="group relative flex flex-col justify-between bg-white dark:bg-[#151F1C] border border-stone-200/90 dark:border-stone-800/90 rounded-xl p-5 hover:border-emerald-700/50 dark:hover:border-emerald-600/50 hover:shadow-md transition-all duration-200 cursor-pointer text-right"
    >
      <div>
        {/* Unboxed Metadata Line with Typographic Separator (Zero-Pill Rule) */}
        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-emerald-900 dark:text-emerald-300">{item.field}</span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <span>{item.typeTag}</span>
            {item.level && (
              <>
                <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                <span>{item.level}</span>
              </>
            )}
            {item.timelineYear && (
              <>
                <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                <span className="font-mono">{item.timelineYear}</span>
              </>
            )}
          </div>

          {/* Quick Actions Header */}
          <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(item.id);
              }}
              className={`p-1.5 rounded-lg transition-colors ${
                isFav 
                  ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-300' 
                  : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title={isFav ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="نسخ سريع للنص والمصدر"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
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
        <h3 className="font-heading text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 mb-1 leading-snug group-hover:text-emerald-950 dark:group-hover:text-emerald-200 transition-colors">
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
          <div className="text-xs text-emerald-800 dark:text-emerald-400 font-medium mb-3 flex items-center gap-1.5">
            <Quote className="w-3 h-3 text-emerald-600/70 shrink-0" />
            <span className="truncate">{item.bookAuthor ? `المؤلف: ${item.bookAuthor}` : `العالم المقرر: ${item.scholar}`}</span>
          </div>
        )}

        {/* Content Excerpt */}
        <div className={`text-stone-700 dark:text-stone-300 line-clamp-4 mb-4 whitespace-pre-line ${getFontSizeClass()}`}>
          {item.content}
        </div>

        {/* Proofs / Conditions Counter Snippet */}
        {(item.proofs && item.proofs.length > 0) && (
          <div className="text-xs text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-stone-900/40 border border-stone-200/60 dark:border-stone-800/60 rounded-lg p-2.5 mb-3 line-clamp-2 italic">
            <span className="font-semibold text-emerald-800 dark:text-emerald-400 not-italic ml-1">الدليل:</span>
            {item.proofs[0]}
          </div>
        )}

        {/* Documented Source with Volume and Page (التوثيق برقم المجلد والصفحة) */}
        {item.sources && item.sources.length > 0 && (
          <div className="text-[11px] text-stone-500 dark:text-stone-400 mb-3 flex items-start gap-1.5 leading-snug">
            <span className="font-bold text-stone-700 dark:text-stone-300 shrink-0">المصدر والتوثيق:</span>
            <span className="truncate text-emerald-900 dark:text-emerald-300 font-medium">
              {item.sources[0]}
              {item.sources.length > 1 && ` (+${item.sources.length - 1} مصادر)`}
            </span>
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
      <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between mt-auto">
        
        {/* Left Side: Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowNoteEditor(!showNoteEditor);
            }}
            className="p-1.5 rounded text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="تقييد فائدة أو تعليق"
          >
            <StickyNote className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(item);
            }}
            className="p-1.5 rounded text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="تعديل هذا المرجع"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleDelete}
            className="p-1.5 rounded text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            title="حذف هذا المرجع"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Side: Read Full Reference */}
        <button
          onClick={() => onOpenDetail(item)}
          className="flex items-center gap-1 text-xs font-medium text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-300 transition-colors group-hover:translate-x-[-2px]"
        >
          <span>مطالعة المرجع كاملاً</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
};
