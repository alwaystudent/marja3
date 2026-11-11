export type MainCategory = 
  | 'terms'           // المصطلحات والتقسيمات الشرعية
  | 'pillars_matrix'  // مصفوفة الأركان والواجبات والشروط
  | 'essentials'      // مهمات الدين التي لا يسع المسلم جهلها
  | 'biographies'     // تراجم العلماء قديما وحديثا
  | 'seerah'          // ملخص السيرة النبوية وتوثيقها
  | 'books'           // فهرس الكتب والمتون المعتمدة
  | 'media'           // المقالات والدروس والشروحات
  | 'favorites';      // المفضلة

export type IslamicField = 
  | 'العقيدة' 
  | 'الفقه' 
  | 'أصول الفقه' 
  | 'مصطلح الحديث' 
  | 'القواعد الفقهية' 
  | 'السيرة النبوية' 
  | 'التراجم والرجال' 
  | 'التفسير وعلوم القرآن' 
  | 'الآداب والرقائق'
  | 'عام';

export type TermTypeTag = 
  | 'تعريف' 
  | 'ركن' 
  | 'شرط' 
  | 'واجب' 
  | 'سنة' 
  | 'تقسيم' 
  | 'قاعدة' 
  | 'أصل' 
  | 'مانع' 
  | 'سبب' 
  | 'ترجمة' 
  | 'كتاب' 
  | 'درس' 
  | 'مهمة دينية';

export type ScholarEra = 
  | 'عصر الصحابة' 
  | 'التابعون وتابعوهم' 
  | 'الأئمة الأربعة' 
  | 'الأئمة المحققون' 
  | 'علماء العصر الحديث';

export type StudyLevel = 'مبتدئ' | 'متوسط' | 'متقدم';

export interface ScholarQuote {
  scholar: string;
  quote: string;
  source: string;
}

export interface KnowledgeItem {
  id: string;
  category: MainCategory;
  title: string;
  subTitle?: string;
  field: IslamicField;
  typeTag: TermTypeTag;
  scholar?: string;
  era?: ScholarEra;
  content: string;
  proofs?: string[];
  conditions?: string[];
  scholarsSayings?: ScholarQuote[];
  sources?: string[];
  level?: StudyLevel;
  relatedIds?: string[];
  mediaUrl?: string;
  mediaType?: 'video' | 'audio' | 'article';
  keyTakeaways?: string[];
  timelineYear?: string;
  bookAuthor?: string;
  notes?: string;
  isCustom?: boolean;
  createdAt: string;
}

export type ThemeMode = 'light' | 'sepia' | 'dark';
export type FontSizeScale = 'sm' | 'md' | 'lg' | 'xl';
