import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save, BookOpen } from 'lucide-react';
import { KnowledgeItem, MainCategory, IslamicField, TermTypeTag, StudyLevel } from '../types';
import { useLibrary } from '../context/LibraryContext';

interface ItemEditorModalProps {
  isOpen: boolean;
  itemToEdit: KnowledgeItem | null;
  initialCategory?: MainCategory;
  initialField?: IslamicField;
  initialTitle?: string;
  onClose: () => void;
  onSaved: (item: KnowledgeItem) => void;
}

export const ItemEditorModal: React.FC<ItemEditorModalProps> = ({
  isOpen,
  itemToEdit,
  initialCategory,
  initialField,
  initialTitle,
  onClose,
  onSaved,
}) => {
  const { addItem, updateItem } = useLibrary();

  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState<MainCategory>('terms');
  const [field, setField] = useState<IslamicField>('العقيدة');
  const [typeTag, setTypeTag] = useState<TermTypeTag>('تعريف');
  const [scholar, setScholar] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [level, setLevel] = useState<StudyLevel>('مبتدئ');
  const [timelineYear, setTimelineYear] = useState('');
  const [content, setContent] = useState('');
  const [proofs, setProofs] = useState<string[]>(['']);
  const [sources, setSources] = useState<string>('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setTitle(itemToEdit.title);
      setSubTitle(itemToEdit.subTitle || '');
      setCategory(itemToEdit.category);
      setField(itemToEdit.field);
      setTypeTag(itemToEdit.typeTag);
      setScholar(itemToEdit.scholar || '');
      setBookAuthor(itemToEdit.bookAuthor || '');
      setLevel(itemToEdit.level || 'مبتدئ');
      setTimelineYear(itemToEdit.timelineYear || '');
      setContent(itemToEdit.content);
      setProofs(itemToEdit.proofs && itemToEdit.proofs.length > 0 ? itemToEdit.proofs : ['']);
      setSources(itemToEdit.sources ? itemToEdit.sources.join('، ') : '');
    } else {
      setTitle(initialTitle || '');
      setSubTitle('');
      setCategory(initialCategory || 'terms');
      setField(initialField || 'العقيدة');
      setTypeTag(initialCategory === 'pillars_matrix' ? 'ركن' : initialCategory === 'seerah' ? 'سنة' : 'تعريف');
      setScholar('');
      setBookAuthor('');
      setLevel('مبتدئ');
      setTimelineYear('');
      setContent('');
      setProofs(['']);
      setSources('');
    }
    setError('');
  }, [itemToEdit, isOpen, initialCategory, initialField, initialTitle]);

  if (!isOpen) return null;

  const handleAddProofField = () => {
    setProofs([...proofs, '']);
  };

  const handleProofChange = (index: number, val: string) => {
    const next = [...proofs];
    next[index] = val;
    setProofs(next);
  };

  const handleRemoveProof = (index: number) => {
    setProofs(proofs.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('يرجى إدخال عنوان المرجع العلمي.');
      return;
    }
    if (!content.trim()) {
      setError('يرجى إدخال نص المحتوى أو البيان العلمي.');
      return;
    }

    const cleanedProofs = proofs.map((p) => p.trim()).filter(Boolean);
    const cleanedSources = sources
      .split(/[،,]/)
      .map((s) => s.trim())
      .filter(Boolean);

    if (itemToEdit) {
      updateItem(itemToEdit.id, {
        title: title.trim(),
        subTitle: subTitle.trim() || undefined,
        category,
        field,
        typeTag,
        scholar: scholar.trim() || undefined,
        bookAuthor: bookAuthor.trim() || undefined,
        level,
        timelineYear: timelineYear.trim() || undefined,
        content: content.trim(),
        proofs: cleanedProofs.length > 0 ? cleanedProofs : undefined,
        sources: cleanedSources.length > 0 ? cleanedSources : undefined,
      });
      onSaved({
        ...itemToEdit,
        title: title.trim(),
        subTitle: subTitle.trim() || undefined,
        category,
        field,
        typeTag,
        scholar: scholar.trim() || undefined,
        bookAuthor: bookAuthor.trim() || undefined,
        level,
        timelineYear: timelineYear.trim() || undefined,
        content: content.trim(),
        proofs: cleanedProofs.length > 0 ? cleanedProofs : undefined,
        sources: cleanedSources.length > 0 ? cleanedSources : undefined,
      });
    } else {
      const newId = addItem({
        title: title.trim(),
        subTitle: subTitle.trim() || undefined,
        category,
        field,
        typeTag,
        scholar: scholar.trim() || undefined,
        bookAuthor: bookAuthor.trim() || undefined,
        level,
        timelineYear: timelineYear.trim() || undefined,
        content: content.trim(),
        proofs: cleanedProofs.length > 0 ? cleanedProofs : undefined,
        sources: cleanedSources.length > 0 ? cleanedSources : undefined,
      });
      onSaved({
        id: newId,
        title: title.trim(),
        subTitle: subTitle.trim() || undefined,
        category,
        field,
        typeTag,
        scholar: scholar.trim() || undefined,
        bookAuthor: bookAuthor.trim() || undefined,
        level,
        timelineYear: timelineYear.trim() || undefined,
        content: content.trim(),
        proofs: cleanedProofs.length > 0 ? cleanedProofs : undefined,
        sources: cleanedSources.length > 0 ? cleanedSources : undefined,
        createdAt: new Date().toISOString().split('T')[0],
      });
    }

    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-[#141E1B] border border-stone-300 dark:border-stone-700 rounded-2xl shadow-2xl overflow-hidden my-6 text-right max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
            <h3 className="font-heading font-bold text-lg text-stone-900 dark:text-stone-100">
              {itemToEdit ? 'تعديل المرجع العلمي' : 'إضافة مادة علمية جديدة إلى مكتبتك'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4 flex-1">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs">
              {error}
            </div>
          )}

          {/* Title & Subtitle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                عنوان المرجع / المصطلح *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثال: شروط لا إله إلا الله، أركان الحج..."
                className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                العنوان الفرعي / إيضاح موجز
              </label>
              <input
                type="text"
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
                placeholder="مثال: المستنبطة من نصوص الكتاب والسنة..."
                className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Category, Field, Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                القسم الرئيسي
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MainCategory)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-600"
              >
                <option value="terms">المصطلحات والتقسيمات</option>
                <option value="essentials">مهمات الدين</option>
                <option value="biographies">تراجم العلماء</option>
                <option value="seerah">السيرة النبوية</option>
                <option value="books">فهرس الكتب والمتون</option>
                <option value="media">الدروس والشروحات</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                الفن الشرعي
              </label>
              <select
                value={field}
                onChange={(e) => setField(e.target.value as IslamicField)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-600"
              >
                <option value="العقيدة">العقيدة والتوحيد</option>
                <option value="الفقه">الفقه وأحكام العبادات</option>
                <option value="أصول الفقه">أصول الفقه</option>
                <option value="مصطلح الحديث">مصطلح الحديث والسنن</option>
                <option value="القواعد الفقهية">القواعد الفقهية</option>
                <option value="السيرة النبوية">السيرة النبوية</option>
                <option value="التراجم والرجال">التراجم وسير الأعلام</option>
                <option value="عام">عام</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                نوع المادة
              </label>
              <select
                value={typeTag}
                onChange={(e) => setTypeTag(e.target.value as TermTypeTag)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-600"
              >
                <option value="تعريف">تعريف</option>
                <option value="تقسيم">تقسيم</option>
                <option value="شرط">شرط</option>
                <option value="ركن">ركن</option>
                <option value="واجب">واجب</option>
                <option value="سنة">سنة</option>
                <option value="قاعدة">قاعدة</option>
                <option value="أصل">أصل</option>
                <option value="مهمة دينية">مهمة دينية</option>
                <option value="ترجمة">ترجمة</option>
                <option value="كتاب">كتاب</option>
                <option value="درس">درس</option>
              </select>
            </div>
          </div>

          {/* Scholar, Level, Year */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                العالم / المحقق
              </label>
              <input
                type="text"
                value={scholar}
                onChange={(e) => setScholar(e.target.value)}
                placeholder="مثال: ابن عثيمين، ابن تيمية..."
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                المستوى الدراسي
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as StudyLevel)}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-600"
              >
                <option value="مبتدئ">مستوى المبتدئين</option>
                <option value="متوسط">مستوى المتوسطين</option>
                <option value="متقدم">مستوى المتقدمين</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                الحقبة / التاريخ (اختياري)
              </label>
              <input
                type="text"
                value={timelineYear}
                onChange={(e) => setTimelineYear(e.target.value)}
                placeholder="مثال: 610م، 10هـ..."
                className="w-full text-xs p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              نص المحتوى والشرح الشرعي والتأصيل *
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="اكتب البيان المؤصل والأقسام والشروح المستخلصة من دروس وكتب علماء أهل السنة..."
              className="w-full text-xs sm:text-sm p-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-600 h-32 resize-y"
              required
            />
          </div>

          {/* Proofs List */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                الشواهد والأدلة من الكتاب والسنة (اختياري)
              </label>
              <button
                type="button"
                onClick={handleAddProofField}
                className="text-xs text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1 hover:underline"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة شاهد</span>
              </button>
            </div>
            <div className="space-y-2">
              {proofs.map((proof, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={proof}
                    onChange={(e) => handleProofChange(idx, e.target.value)}
                    placeholder="مثال: ﴿وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ﴾ [الذاريات: 56]"
                    className="flex-1 text-xs p-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-600 font-serif"
                  />
                  {proofs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveProof(idx)}
                      className="p-1.5 text-stone-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sources with Volume and Page */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              المصادر والكتب المعتمدة موثقة برقم المجلد والصفحة (مفصولة بفواصل)
            </label>
            <input
              type="text"
              value={sources}
              onChange={(e) => setSources(e.target.value)}
              placeholder="مثال: مجموع الفتاوى (3/97)، زاد المعاد (1/134)، الشرح الممتع (2/145)"
              className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-emerald-600"
            />
            <p className="text-[10px] text-stone-400 mt-1">
              صيغة التوثيق المستحسنة: اسم الكتاب (المجلد/الصفحة)، مثل: مجموع الفتاوى (3/97) أو المغني (1/214).
            </p>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-end gap-3 sticky bottom-0 bg-white dark:bg-[#141E1B] py-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-medium hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-emerald-800 dark:bg-emerald-700 hover:bg-emerald-900 dark:hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>{itemToEdit ? 'حفظ التعديلات' : 'إضافة إلى المكتبة'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
