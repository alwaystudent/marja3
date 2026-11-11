import React, { useState, useRef } from 'react';
import { X, Download, Upload, RotateCcw, AlertTriangle, Check, FileJson } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

interface DataManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataManagementModal: React.FC<DataManagementModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { 
    items, 
    favorites, 
    exportDataAsJSON, 
    importDataFromJSON, 
    resetToDefaultData 
  } = useLibrary();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const res = importDataFromJSON(content);
        setImportStatus(res);
        setTimeout(() => setImportStatus(null), 4000);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleConfirmReset = () => {
    resetToDefaultData();
    setShowResetConfirm(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-[#141E1B] border border-stone-300 dark:border-stone-700 rounded-2xl shadow-2xl overflow-hidden text-right p-6 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <FileJson className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
            <h3 className="font-heading font-bold text-lg text-stone-900 dark:text-stone-100">
              إدارة بيانات المكتبة والنسخ الاحتياطي
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status message */}
        {importStatus && (
          <div
            className={`p-3 rounded-lg text-xs font-medium flex items-center gap-2 ${
              importStatus.success
                ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                : 'bg-rose-50 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
            }`}
          >
            {importStatus.success ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            <span>{importStatus.message}</span>
          </div>
        )}

        {/* Current State Summary */}
        <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 text-xs space-y-1">
          <div className="text-stone-500 dark:text-stone-400">إحصاءات مكتبتك المحفوظة حالياً:</div>
          <div className="flex items-center gap-4 text-stone-800 dark:text-stone-200 font-bold">
            <span>• عدد المراجع: {items.length}</span>
            <span>• العناصر المفضلة: {favorites.length}</span>
          </div>
        </div>

        {/* Actions List */}
        <div className="space-y-3">
          
          {/* Export JSON */}
          <button
            onClick={exportDataAsJSON}
            className="w-full p-4 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-emerald-600 bg-white dark:bg-stone-900/60 transition-all flex items-center justify-between text-right group"
          >
            <div>
              <div className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-300">
                تصدير نسخة احتياطية (JSON)
              </div>
              <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                تنزيل جميع المراجع وملاحظاتك الشخصية كملف لحفظها بأمان على حاسوبك
              </div>
            </div>
            <Download className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mr-3" />
          </button>

          {/* Import JSON */}
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-4 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-emerald-600 bg-white dark:bg-stone-900/60 transition-all flex items-center justify-between text-right group"
            >
              <div>
                <div className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-300">
                  استيراد مراجع من ملف (JSON)
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  استعادة نسخة سابقة أو دمج مراجع جديدة تم تصديرها مسبقاً
                </div>
              </div>
              <Upload className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mr-3" />
            </button>
          </div>

          {/* Reset to Default Seed Data */}
          <div className="pt-2">
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-rose-700 hover:border-rose-300 dark:hover:border-rose-900 transition-colors flex items-center justify-center gap-2 text-xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إعادة ضبط المكتبة إلى المحتوى العلمي الأساسي</span>
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 space-y-2">
                <div className="text-xs font-bold text-rose-900 dark:text-rose-200">
                  هل أنت متأكد من إعادة الضبط؟
                </div>
                <div className="text-[11px] text-rose-700 dark:text-rose-300 leading-relaxed">
                  سيتم استعادة النماذج الأصلية المحررة لكبار العلماء. ننصحك بتصدير نسخة احتياطية أولاً إذا قمت بإضافة مواد خاصة.
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-3 py-1 rounded text-xs text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800"
                  >
                    تراجع
                  </button>
                  <button
                    onClick={handleConfirmReset}
                    className="px-3 py-1 rounded bg-rose-700 text-white text-xs font-bold hover:bg-rose-800"
                  >
                    نعم، أعد الضبط
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
