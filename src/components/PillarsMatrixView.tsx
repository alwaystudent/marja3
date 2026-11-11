import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Edit3, 
  Trash2, 
  Bookmark, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  BookOpen,
  Sparkles,
  Share2
} from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { KnowledgeItem, MainCategory } from '../types';

interface PillarsMatrixViewProps {
  onOpenDetail: (item: KnowledgeItem) => void;
  onEdit: (item: KnowledgeItem) => void;
  onAddNew: (category: MainCategory, field?: string, title?: string) => void;
  onShare?: (item: KnowledgeItem) => void;
}

export const PillarsMatrixView: React.FC<PillarsMatrixViewProps> = ({
  onOpenDetail,
  onEdit,
  onAddNew,
  onShare,
}) => {
  const { items, deleteItem, isFavorite, toggleFavorite } = useLibrary();
  const [activeTab, setActiveTab] = useState<'salah' | 'tawheed' | 'wudu' | 'hajj' | 'zakah'>('salah');
  const [expandedSection, setExpandedSection] = useState<string | null>('salah-arkan');

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  // Find relevant items from library
  const salahItem = items.find((i) => i.id === 'term-salah-arkan-wajibat');
  const tawheedItem = items.find((i) => i.id === 'term-shuroot-la-ilaha-illa-allah');
  const wuduItem = items.find((i) => i.id === 'term-wudu-arkan');
  
  // Custom matrix items added by the user in this category
  const customMatrixItems = items.filter(
    (i) => i.category === 'pillars_matrix' || (i.category === 'terms' && i.typeTag === 'ركن' || i.typeTag === 'شرط' || i.typeTag === 'واجب')
  );

  const handleDeleteItem = (item: KnowledgeItem) => {
    if (window.confirm(`هل أنت متأكد من حذف المرجع "${item.title}" نهائياً من مصفوفتك؟`)) {
      deleteItem(item.id);
    }
  };

  return (
    <div className="w-full text-right space-y-6">
      
      {/* Title & Introduction & Primary Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
            مصفوفة الأركان والواجبات والشروط
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm mt-1">
            مصفوفة تفاعلية قابلة للإضافة والتعديل والحذف الكامل للفروق الدقيقة بين شروط العبادة وأركانها وواجباتها وسننها.
          </p>
        </div>

        <button
          onClick={() => onAddNew('pillars_matrix', 'الفقه', 'مسألة فقهية جديدة في الأركان والشروط')}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة ركن / شرط / واجب جديد</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-stone-200/50 dark:bg-stone-900/60 rounded-xl">
        <button
          onClick={() => setActiveTab('salah')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
            activeTab === 'salah'
              ? 'bg-white dark:bg-stone-800 text-emerald-900 dark:text-emerald-100 shadow-sm font-bold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          أركان وواجبات وشروط الصلاة
        </button>

        <button
          onClick={() => setActiveTab('tawheed')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
            activeTab === 'tawheed'
              ? 'bg-white dark:bg-stone-800 text-emerald-900 dark:text-emerald-100 shadow-sm font-bold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          شروط لا إله إلا الله السبعة
        </button>

        <button
          onClick={() => setActiveTab('wudu')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
            activeTab === 'wudu'
              ? 'bg-white dark:bg-stone-800 text-emerald-900 dark:text-emerald-100 shadow-sm font-bold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          فروض الوضوء ونواقضه
        </button>

        <button
          onClick={() => setActiveTab('hajj')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
            activeTab === 'hajj'
              ? 'bg-white dark:bg-stone-800 text-emerald-900 dark:text-emerald-100 shadow-sm font-bold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          أركان الحج وواجباته
        </button>

        <button
          onClick={() => setActiveTab('zakah')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
            activeTab === 'zakah'
              ? 'bg-white dark:bg-stone-800 text-emerald-900 dark:text-emerald-100 shadow-sm font-bold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
          }`}
        >
          شروط الزكاة ومصارفها
        </button>
      </div>

      {/* Tab 1: Salah Matrix */}
      {activeTab === 'salah' && (
        <div className="space-y-4">
          
          {/* Rules Summary Card with Edit/Details link */}
          <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 flex items-start justify-between gap-3">
            <div className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
              <span className="font-bold text-emerald-900 dark:text-emerald-300 ml-1">ضابط الفرق الفقهي:</span>
              الركن ما كان جزءاً من ماهية الصلاة لا يسقط عمداً ولا سهواً ولا جهلاً ولا يجبره سجود السهو، والواجب ما أمر به الشارع في الصلاة ويسقط بالسهو ويجبره سجود السهو وتبطل بتركه عمداً، والشرط ما يتقدم الصلاة ويستمر فيها.
            </div>
            {salahItem && (
              <div className="flex items-center gap-1 shrink-0">
                {onShare && (
                  <button
                    onClick={() => onShare(salahItem)}
                    className="p-1.5 rounded-lg bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-emerald-700 shadow-xs"
                    title="مشاركة ونشر المرجع الفقهي"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => onEdit(salahItem)}
                  className="p-1.5 rounded-lg bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-emerald-700 shadow-xs"
                  title="تعديل هذا المرجع الفقهي"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenDetail(salahItem)}
                  className="p-1.5 rounded-lg bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-emerald-700 shadow-xs"
                  title="مطالعة تفاصيل المرجع"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Section: Shuroot (9) */}
          <div className="bg-white dark:bg-[#141E1B] border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection('salah-shuroot')}
              className="w-full p-4 flex items-center justify-between text-right bg-stone-50 dark:bg-stone-900/60 hover:bg-stone-100/70 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-mono font-bold text-xs flex items-center justify-center">
                  9
                </span>
                <span className="font-heading font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">
                  شروط صحة الصلاة (تسعة شروط تتقدم الصلاة وتستمر فيها)
                </span>
              </div>
              {expandedSection === 'salah-shuroot' ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
            </button>
            {expandedSection === 'salah-shuroot' && (
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 border-t border-stone-200 dark:border-stone-800">
                {[
                  { title: '1. الإسلام', desc: 'ضده الكفر، وعمل الكافر مردود بنص القرآن.' },
                  { title: '2. العقل', desc: 'ضده الجنون، فالقلم مرفوع عن المجنون حتى يعقل.' },
                  { title: '3. التمييز', desc: 'ضده الصغر، وحده سبع سنين لقوله: مروهم بالصلاة لسبع.' },
                  { title: '4. رفع الحدث', desc: 'وهو الوضوء من الحدث الأصغر والغسل من الأكبر.' },
                  { title: '5. إزالة النجاسة', desc: 'من ثلاث: من البدن، والثوب، ومكان الصلاة.' },
                  { title: '6. ستر العورة', desc: 'بثوب مباح لا يصف البشرة (عورة الرجل من السرة للركبة، والمرأة كلها عورة عدا الوجه في الصلاة).' },
                  { title: '7. دخول الوقت', desc: 'فلا تصح الصلاة قبل وقتها ولا بعده لغير عذر شرعي.' },
                  { title: '8. استقبال القبلة', desc: 'وهي الكعبة المشرفة لمن قدر عليها بحسب قربه وبعده.' },
                  { title: '9. النية', desc: 'محلها القلب ولا يجوز التلفظ بها لأن التلفظ بدعة.' },
                ].map((s, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800">
                    <div className="font-bold text-sm text-stone-900 dark:text-stone-100">{s.title}</div>
                    <div className="text-xs text-stone-600 dark:text-stone-400 mt-1">{s.desc}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section: Arkan (14) */}
          <div className="bg-white dark:bg-[#141E1B] border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection('salah-arkan')}
              className="w-full p-4 flex items-center justify-between text-right bg-stone-50 dark:bg-stone-900/60 hover:bg-stone-100/70 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-xs flex items-center justify-center">
                  14
                </span>
                <span className="font-heading font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">
                  أركان الصلاة (أربعة عشر ركناً لا تسقط عمداً ولا سهواً)
                </span>
              </div>
              {expandedSection === 'salah-arkan' ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
            </button>
            {expandedSection === 'salah-arkan' && (
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 border-t border-stone-200 dark:border-stone-800">
                {[
                  '1. القيام في الفرض مع القدرة',
                  '2. تكبيرة الإحرام (قول: الله أكبر)',
                  '3. قراءة الفاتحة في كل ركعة',
                  '4. الركوع في كل ركعة',
                  '5. الرفع من الركوع',
                  '6. الاعتدال قائماً بعد الرفع',
                  '7. السجود على الأعضاء السبعة',
                  '8. الرفع من السجود',
                  '9. الجلسة بين السجدتين',
                  '10. الطمأنينة في جميع الأركان',
                  '11. التشهد الأخير',
                  '12. الجلوس للتشهد الأخير وللتسليمتين',
                  '13. التسليمتان (السلام عليكم ورحمة الله)',
                  '14. الترتيب بين هذه الأركان',
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 text-xs sm:text-sm font-medium text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section: Wajibat (8) */}
          <div className="bg-white dark:bg-[#141E1B] border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection('salah-wajibat')}
              className="w-full p-4 flex items-center justify-between text-right bg-stone-50 dark:bg-stone-900/60 hover:bg-stone-100/70 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-mono font-bold text-xs flex items-center justify-center">
                  8
                </span>
                <span className="font-heading font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">
                  واجبات الصلاة (ثمانية واجبات تجبر بسجود السهو)
                </span>
              </div>
              {expandedSection === 'salah-wajibat' ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
            </button>
            {expandedSection === 'salah-wajibat' && (
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-stone-200 dark:border-stone-800">
                {[
                  '1. التكبيرات لغير الإحرام (تكبيرات الانتقال)',
                  '2. قول: «سمع الله لمن حمده» للإمام والمنفرد',
                  '3. قول: «ربنا ولك الحمد» للإمام والمأموم والمنفرد',
                  '4. قول: «سبحان ربي العظيم» مرة في الركوع (والأدنى كمالاً ثلاث)',
                  '5. قول: «سبحان ربي الأعلى» مرة في السجود (والأدنى كمالاً ثلاث)',
                  '6. قول: «رب اغفر لي» بين السجدتين',
                  '7. التشهد الأول',
                  '8. الجلوس للتشهد الأول',
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 text-xs sm:text-sm text-stone-800 dark:text-stone-200">
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* Tab 2: Tawheed Shuroot */}
      {activeTab === 'tawheed' && (
        <div className="space-y-4">
          {tawheedItem && (
            <div className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                المرجع الأساسي المسجل: {tawheedItem.title}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onEdit(tawheedItem)}
                  className="px-2.5 py-1 text-xs rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-emerald-700 flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>تعديل المرجع</span>
                </button>
                <button
                  onClick={() => onOpenDetail(tawheedItem)}
                  className="px-2.5 py-1 text-xs rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-emerald-700 flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>عرض كامل</span>
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: '1. العلم',
                opposite: 'المنافي للجهل',
                proof: '﴿فَاعْلَمْ أَنَّهُ لَا إِلَٰهَ إِلَّا اللَّهُ﴾',
                explanation: 'أن يعلم العبد معنى لا إله إلا الله، وهو نفي استحقاق العبادة عن كل ما سوى الله وإثباتها لله وحده.'
              },
              {
                title: '2. اليقين',
                opposite: 'المنافي للشك والريب',
                proof: '﴿إِنَّمَا الْمُؤْمِنُونَ الَّذِينَ آمَنُوا بِاللَّهِ وَرَسُولِهِ ثُمَّ لَمْ يَرْتَابُوا﴾',
                explanation: 'أن يكون قائلها مستيقناً بمدلولها يقيناً جازماً لا يتخلله شك ولا تردد.'
              },
              {
                title: '3. الإخلاص',
                opposite: 'المنافي للشرك والرياء',
                proof: '﴿أَلَا لِلَّهِ الدِّينُ الْخَالِصُ﴾',
                explanation: 'تصفية العمل بصالح النية عن جميع شوائب الشرك، ابتغاء وجه الله تعالى وحده.'
              },
              {
                title: '4. الصدق',
                opposite: 'المنافي للكذب والنفاق',
                proof: '«ما من أحد يشهد أن لا إله إلا الله... صدقاً من قلبه إلا حرمه الله على النار»',
                explanation: 'أن يقولها صادقاً من قلبه يواطئ لسانه قلبه، لا كالمنافقين الذين قالوا بألسنتهم ما ليس في قلوبهم.'
              },
              {
                title: '5. المحبة',
                opposite: 'المنافية للبغض والكراهية',
                proof: '﴿وَالَّذِينَ آمَنُوا أَشَدُّ حُبًّا لِّلَّهِ﴾',
                explanation: 'أن يحب هذه الكلمة العظيمة، ويحب ما دلت عليه واقتضته، ويحب أهلها العاملين بها، ويبغض ما خالفها.'
              },
              {
                title: '6. الانقياد',
                opposite: 'المنافي للترك والإعراض',
                proof: '﴿وَمَن يُسْلِمْ وَجْهَهُ إِلَى اللَّهِ وَهُوَ مُحْسِنٌ فَقَدِ اسْتَمْسَكَ بِالْعُرْوَةِ الْوُثْقَىٰ﴾',
                explanation: 'الاستسلام والانقياد لحكم الله وشرعه ظاهراً وباطناً بالعمل بالأوامر واجتناب النواهي.'
              },
              {
                title: '7. القبول',
                opposite: 'المنافي للرد والاستكبار',
                proof: '﴿إِنَّهُمْ كَانُوا إِذَا قِيلَ لَهُمْ لَا إِلَٰهَ إِلَّا اللَّهُ يَسْتَكْبِرُونَ﴾',
                explanation: 'قبول كل ما اقتضته هذه الكلمة بالقلب واللسان، وعدم رد شيء من نصوص الوحي استكباراً أو حسداً.'
              },
              {
                title: '8. الكفر بما يعبد من دون الله (الشرط المتمم)',
                opposite: 'المنافي للشك في بطلان الشرك',
                proof: '﴿فَمَن يَكْفُرْ بِالطَّاغُوتِ وَيُؤْمِن بِاللَّهِ فَقَدِ اسْتَمْسَكَ بِالْعُرْوَةِ الْوُثْقَىٰ﴾',
                explanation: 'البراءة الصريحة من عبادة كل ما سوى الله من الأصنام والقبور والطواغيت واعتقاد بطلانها.'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white dark:bg-[#141E1B] border border-stone-200 dark:border-stone-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-base sm:text-lg text-emerald-900 dark:text-emerald-200">
                    {item.title}
                  </h4>
                  <span className="text-xs text-rose-700 dark:text-rose-400 font-medium">
                    ضده: {item.opposite}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                  {item.explanation}
                </p>
                <div className="p-2 rounded bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-900/30 text-xs font-serif text-amber-950 dark:text-amber-200">
                  الدليل: {item.proof}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Wudu Matrix */}
      {activeTab === 'wudu' && (
        <div className="space-y-4">
          {wuduItem && (
            <div className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                المرجع المسجل: {wuduItem.title}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onEdit(wuduItem)}
                  className="px-2.5 py-1 text-xs rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-emerald-700 flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>تعديل المرجع</span>
                </button>
                <button
                  onClick={() => onOpenDetail(wuduItem)}
                  className="px-2.5 py-1 text-xs rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-emerald-700 flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>عرض كامل</span>
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-white dark:bg-[#141E1B] border border-stone-200 dark:border-stone-800 space-y-3">
              <h3 className="font-heading font-bold text-lg text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>فروض الوضوء الستة (المنصوصة في آية المائدة):</span>
              </h3>
              <ol className="space-y-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                <li className="p-2.5 rounded bg-stone-50 dark:bg-stone-900">1. غسل الوجه كله، ومنه المضمضة والاستنشاق.</li>
                <li className="p-2.5 rounded bg-stone-50 dark:bg-stone-900">2. غسل اليدين مع المرفقين.</li>
                <li className="p-2.5 rounded bg-stone-50 dark:bg-stone-900">3. مسح الرأس كله، ومنه الأذنان.</li>
                <li className="p-2.5 rounded bg-stone-50 dark:bg-stone-900">4. غسل الرجلين مع الكعبين.</li>
                <li className="p-2.5 rounded bg-stone-50 dark:bg-stone-900">5. الترتيب بين الأعضاء كما ورد في القرآن.</li>
                <li className="p-2.5 rounded bg-stone-50 dark:bg-stone-900">6. الموالاة (ألا يؤخر غسل عضو حتى يجف الذي قبله).</li>
              </ol>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-[#141E1B] border border-stone-200 dark:border-stone-800 space-y-3">
              <h3 className="font-heading font-bold text-lg text-rose-900 dark:text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600" />
                <span>نواقض الوضوء المعتبرة:</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                <li className="p-2.5 rounded bg-stone-50 dark:bg-stone-900">1. الخارج من السبيلين من بول أو غائط أو ريح أو مني أو مذي.</li>
                <li className="p-2.5 rounded bg-stone-50 dark:bg-stone-900">2. زوال العقل بإغماء أو سكر أو نوم مستغرق ثقيل لا يشعر معه بالحدث.</li>
                <li className="p-2.5 rounded bg-stone-50 dark:bg-stone-900">3. مس الفرج باليد بدون حائل لشهوة على الراجح.</li>
                <li className="p-2.5 rounded bg-stone-50 dark:bg-stone-900">4. أكل لحم الإبل (الإبل خاصة دون سائر الأنعام).</li>
                <li className="p-2.5 rounded bg-stone-50 dark:bg-stone-900">5. الردة عن الإسلام نسأل الله العافية (﴿لَئِنْ أَشْرَكْتَ لَيَحْبَطَنَّ عَمَلُكَ﴾).</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Hajj Matrix */}
      {activeTab === 'hajj' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-white dark:bg-[#141E1B] border border-stone-200 dark:border-stone-800 space-y-3">
            <h3 className="font-heading font-bold text-lg text-emerald-900 dark:text-emerald-200">
              أركان الحج الأربعة (لا يصح الحج إلا بها جميعاً):
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-900/30">
                <span className="font-bold">1. الإحرام:</span> نية الدخول في النسك من الميقات.
              </div>
              <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-900/30">
                <span className="font-bold">2. الوقوف بعرفة:</span> أعظم أركانه لقوله ﷺ: «الحج عرفة».
              </div>
              <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-900/30">
                <span className="font-bold">3. طواف الإفاضة:</span> لقوله تعالى: ﴿وَلْيَطَّوَّفُوا بِالْبَيْتِ الْعَتِيقِ﴾.
              </div>
              <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-900/30">
                <span className="font-bold">4. السعي بين الصفا والمروة:</span> لقوله ﷺ: «اسعوا فإن الله كتب عليكم السعي».
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-[#141E1B] border border-stone-200 dark:border-stone-800 space-y-3">
            <h3 className="font-heading font-bold text-lg text-amber-900 dark:text-amber-200">
              واجبات الحج السبعة (من ترك واجباً منها لزمه دم):
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              <li className="p-2 rounded bg-stone-50 dark:bg-stone-900">1. الإحرام من الميقات المعتبر شرعاً.</li>
              <li className="p-2 rounded bg-stone-50 dark:bg-stone-900">2. الوقوف بعرفة إلى غروب الشمس لمن وقف بها نهاراً.</li>
              <li className="p-2 rounded bg-stone-50 dark:bg-stone-900">3. المبيت بمزدلفة ليلة النحر إلى نصف الليل على الأقل.</li>
              <li className="p-2 rounded bg-stone-50 dark:bg-stone-900">4. المبيت بمنى ليالي أيام التشريق.</li>
              <li className="p-2 rounded bg-stone-50 dark:bg-stone-900">5. رمي الجمرات مرتبة (الصغرى ثم الوسطى ثم الكبرى).</li>
              <li className="p-2 rounded bg-stone-50 dark:bg-stone-900">6. الحلق أو التقصير للرجال، والتقصير للنساء قدر أنملة.</li>
              <li className="p-2 rounded bg-stone-50 dark:bg-stone-900">7. طواف الوداع (يسقط عن الحائض والنفساء).</li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 5: Zakah Matrix */}
      {activeTab === 'zakah' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white dark:bg-[#141E1B] border border-stone-200 dark:border-stone-800">
            <h3 className="font-heading font-bold text-lg text-stone-900 dark:text-stone-100 mb-2">
              شروط وجوب الزكاة:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs text-center">
              <div className="p-2 rounded bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">1. الإسلام</div>
              <div className="p-2 rounded bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">2. الحرية</div>
              <div className="p-2 rounded bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">3. ملك النصاب الشرعي</div>
              <div className="p-2 rounded bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">4. استقرار الملك التام</div>
              <div className="p-2 rounded bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 col-span-2 sm:col-span-1">5. مضي الحول الكامل</div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-[#141E1B] border border-stone-200 dark:border-stone-800 space-y-3">
            <h3 className="font-heading font-bold text-lg text-emerald-900 dark:text-emerald-200">
              مصارف الزكاة الثمانية بنص سورة التوبة (الآية 60):
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { title: '1. الفقراء', desc: 'الذين لا يجدون شيئاً أو يجدون أقل من نصف الكفاية.' },
                { title: '2. المساكين', desc: 'الذين يجدون نصف الكفاية أو أكثرها ولكن لا تكفيهم تماماً.' },
                { title: '3. العاملون عليها', desc: 'الجباة والحفظة والقائمون على جمعها وتوزيعها من ولي الأمر.' },
                { title: '4. المؤلفة قلوبهم', desc: 'سادات يرجى إسلامهم أو كف شرهم أو تثبيت إيمانهم.' },
                { title: '5. في الرقاب', desc: 'عتق الأرقاء وفداء الأسرى المسلمين.' },
                { title: '6. الغارمون', desc: 'أصحاب الديون لإصلاح ذات البين أو لعجزهم عن سداد ديونهم المباحة.' },
                { title: '7. في سبيل الله', desc: 'المجاهدون المتطوعون في سبيل الله وإعداد عدتهم.' },
                { title: '8. ابن السبيل', desc: 'المسافر المنقطع به الذي نفدت نفقته ليصل إلى بلده.' },
              ].map((m, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800">
                  <div className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">{m.title}</div>
                  <div className="text-[11px] text-stone-600 dark:text-stone-400 mt-1">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Custom items added by user in this category */}
      {customMatrixItems.filter(i => i.isCustom).length > 0 && (
        <div className="pt-6 border-t border-stone-200 dark:border-stone-800 space-y-3">
          <h3 className="font-heading font-bold text-lg text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>مسائل وأركان أضفتها أنت إلى مصفوفتك:</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customMatrixItems.filter(i => i.isCustom).map((custom) => (
              <div 
                key={custom.id}
                className="p-4 rounded-xl bg-white dark:bg-[#151F1C] border border-stone-200 dark:border-stone-800 space-y-2 text-right relative group"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-base text-stone-900 dark:text-stone-100">
                    {custom.title}
                  </h4>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEdit(custom)}
                      className="p-1 text-stone-400 hover:text-emerald-700"
                      title="تعديل"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(custom)}
                      className="p-1 text-stone-400 hover:text-rose-600"
                      title="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                  {custom.content}
                </p>
                <div className="text-[11px] text-emerald-800 dark:text-emerald-400 font-medium">
                  {custom.field} · {custom.typeTag}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
