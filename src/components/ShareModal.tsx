import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  MessageCircle, 
  Send, 
  Twitter, 
  Facebook, 
  Mail, 
  FileText, 
  Quote, 
  Sparkles,
  Link2
} from 'lucide-react';
import { KnowledgeItem } from '../types';

interface ShareModalProps {
  item: KnowledgeItem | null;
  onClose: () => void;
}

export type ShareFormat = 'full' | 'quote' | 'summary' | 'proofs_only';

export const ShareModal: React.FC<ShareModalProps> = ({ item, onClose }) => {
  const [selectedFormat, setSelectedFormat] = useState<ShareFormat>('full');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!item) return null;

  // Format the text according to the selected style
  const getFormattedContent = (format: ShareFormat): string => {
    const appUrl = window.location.origin;
    const sourcesText = item.sources?.length ? item.sources.join('، ') : 'أهل السنة والجماعة';
    const scholarText = item.scholar ? `المقرر: ${item.scholar}` : item.bookAuthor ? `المؤلف: ${item.bookAuthor}` : '';

    switch (format) {
      case 'quote':
        return `« ${item.title} »\n\n${item.content.slice(0, 320)}${item.content.length > 320 ? '...' : ''}\n\n${scholarText ? scholarText + '\n' : ''}المصدر: ${sourcesText}\nمن: مرجع طالب العلم`;

      case 'summary':
        return `📌 فائدة شرعية: [ ${item.title} ]\n\n${item.subTitle ? '▪ ' + item.subTitle + '\n' : ''}${item.keyTakeaways?.length ? '🔹 خلاصات منهجية:\n' + item.keyTakeaways.map(t => '• ' + t).join('\n') + '\n\n' : item.content.slice(0, 220) + '...\n\n'}المصدر: ${sourcesText}\nرابط: ${appUrl}`;

      case 'proofs_only':
        const proofsText = item.proofs?.length 
          ? item.proofs.map((p, idx) => `[${idx + 1}] ${p}`).join('\n\n')
          : 'نصوص الوحيين المعتمدة';
        return `📖 أدلة وشواهد مسألة: [ ${item.title} ]\n\n${proofsText}\n\nالمصدر والتوثيق: ${sourcesText}\nمرجع طالب العلم`;

      case 'full':
      default:
        let text = `📜 مَرْجِعٌ شَرْعِيّ: 【 ${item.title} 】\n`;
        if (item.subTitle) text += `(${item.subTitle})\n`;
        text += `القسم: ${item.field} · ${item.typeTag}\n\n`;
        text += `« ${item.content} »\n\n`;

        if (item.conditions && item.conditions.length > 0) {
          text += `▪ الشروط والضوابط والأركان:\n`;
          text += item.conditions.map((c, i) => `${i + 1}. ${c}`).join('\n') + '\n\n';
        }

        if (item.proofs && item.proofs.length > 0) {
          text += `▪ الأدلة من الكتاب والسنة:\n`;
          text += item.proofs.map(p => `• ${p}`).join('\n') + '\n\n';
        }

        if (scholarText) text += `${scholarText}\n`;
        text += `المصدر: ${sourcesText}\n`;
        text += `تأصيل شرعي على فهم السلف الصالح · مرجع طالب العلم`;
        return text;
    }
  };

  const currentText = getFormattedContent(selectedFormat);

  const handleCopyText = (type: string = 'text') => {
    navigator.clipboard.writeText(currentText);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2200);
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedType('link');
    setTimeout(() => setCopiedType(null), 2200);
  };

  // Web Share API for native mobile sharing
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `مرجع: ${item.title}`,
          text: currentText,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      handleCopyText('native');
    }
  };

  // Social URLs
  const encodedText = encodeURIComponent(currentText);
  const encodedTitle = encodeURIComponent(`مرجع: ${item.title}`);
  const encodedUrl = encodeURIComponent(window.location.origin);

  const shareLinks = [
    {
      name: 'واتساب',
      icon: MessageCircle,
      color: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      url: `https://api.whatsapp.com/send?text=${encodedText}`,
    },
    {
      name: 'تيليجرام',
      icon: Send,
      color: 'bg-sky-500 hover:bg-sky-600 text-white',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    },
    {
      name: 'منصة إكس (تويتر)',
      icon: Twitter,
      color: 'bg-stone-900 hover:bg-black text-white dark:bg-stone-700 dark:hover:bg-stone-600',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(getFormattedContent('quote').slice(0, 260))}&url=${encodedUrl}`,
    },
    {
      name: 'فيسبوك',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700 text-white',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    },
    {
      name: 'البريد الإلكتروني',
      icon: Mail,
      color: 'bg-stone-600 hover:bg-stone-700 text-white',
      url: `mailto:?subject=${encodedTitle}&body=${encodedText}`,
    },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-[#FCFAF6] dark:bg-[#141D1A] border border-stone-300 dark:border-stone-700 rounded-2xl shadow-2xl overflow-hidden my-4 text-right flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
                مشاركة ونشر المرجع
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {item.title} · {item.field}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* Format Selection (بطرق متنوعة) */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
              اختر صيغة النشر المناسبة:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setSelectedFormat('full')}
                className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all flex flex-col items-center gap-1.5 ${
                  selectedFormat === 'full'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-200 font-bold shadow-xs'
                    : 'border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                <FileText className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>المرجع كاملاً</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFormat('quote')}
                className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all flex flex-col items-center gap-1.5 ${
                  selectedFormat === 'quote'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-200 font-bold shadow-xs'
                    : 'border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                <Quote className="w-4 h-4 text-amber-600" />
                <span>اقتباس قصير</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFormat('summary')}
                className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all flex flex-col items-center gap-1.5 ${
                  selectedFormat === 'summary'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-200 font-bold shadow-xs'
                    : 'border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>فائدة وخلاصة</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFormat('proofs_only')}
                className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all flex flex-col items-center gap-1.5 ${
                  selectedFormat === 'proofs_only'
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-200 font-bold shadow-xs'
                    : 'border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                <Quote className="w-4 h-4 text-emerald-600" />
                <span>الأدلة والشواهد</span>
              </button>
            </div>
          </div>

          {/* Social Platforms Direct Share */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
              نشر فوري عبر تطبيقات التواصل:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {shareLinks.map((platform) => {
                const Icon = platform.icon;
                return (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-medium text-xs shadow-xs transition-transform active:scale-95 ${platform.color}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{platform.name}</span>
                  </a>
                );
              })}

              {/* Native Mobile Share if supported */}
              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-medium text-xs bg-emerald-900 hover:bg-emerald-950 text-white shadow-xs transition-transform active:scale-95"
                >
                  <Share2 className="w-4 h-4 text-amber-300" />
                  <span>مشاركة الجهاز...</span>
                </button>
              )}
            </div>
          </div>

          {/* Preview & Direct Copy Area */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                معاينة النص الجاهز للنسخ:
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="text-xs text-stone-600 dark:text-stone-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center gap-1 transition-colors"
                >
                  {copiedType === 'link' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Link2 className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'link' ? 'تم نسخ الرابط' : 'نسخ الرابط'}</span>
                </button>
              </div>
            </div>

            <div className="relative">
              <textarea
                readOnly
                value={currentText}
                rows={7}
                className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 font-serif leading-relaxed focus:outline-none resize-none shadow-inner"
              />
              <button
                type="button"
                onClick={() => handleCopyText('text')}
                className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-medium shadow-md transition-all active:scale-95"
              >
                {copiedType === 'text' ? (
                  <>
                    <Check className="w-4 h-4 text-amber-300" />
                    <span>تم النسخ بنجاح</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>نسخ النص المعدّ</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="text-[11px] text-stone-500 dark:text-stone-400 bg-stone-100/70 dark:bg-stone-900/60 p-3 rounded-xl border border-stone-200 dark:border-stone-800">
            💡 <span className="font-semibold text-stone-700 dark:text-stone-300">نصيحة لنشر العلم:</span> قال النبي ﷺ: «مَنْ دَلَّ عَلَى خَيْرٍ فَلَهُ مِثْلُ أَجْرِ فَاعِلِهِ» [رواه مسلم]. احرص على نقل النصوص مع التوثيق والمصدر لصيانة العلم الشرعي.
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 sm:px-6 py-3 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs transition-colors"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
