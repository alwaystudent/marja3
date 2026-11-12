import React from 'react';
import { 
  Library, 
  Compass, 
  Award, 
  Users, 
  BookMarked, 
  Video, 
  Bookmark, 
  Plus, 
  Sparkles,
  Layers
} from 'lucide-react';
import { MainCategory, IslamicField } from '../types';

interface SectionHeaderBannerProps {
  category: MainCategory | 'all';
  itemCount: number;
  totalCount: number;
  selectedField?: string;
  onAddNew: (category: MainCategory, field?: IslamicField, defaultTitle?: string) => void;
}

export const SectionHeaderBanner: React.FC<SectionHeaderBannerProps> = ({
  category,
  itemCount,
  totalCount,
  selectedField,
  onAddNew,
}) => {
  // Config per section
  const getSectionConfig = () => {
    switch (category) {
      case 'terms':
        return {
          title: 'المصطلحات والتقسيمات الشرعية',
          description: 'تحرير وضبط مصطلحات العلوم الإسلامية، أركان العبادات، وشروط المعاملات مع الأدلة والشواهد المقررة.',
          buttonLabel: 'إضافة مصطلح أو تقسيم شرعي',
          buttonSubLabel: 'إضافة حد شرعي أو تقسيم فقهي',
          targetCategory: 'terms' as MainCategory,
          defaultField: (selectedField !== 'all' ? selectedField : 'العقيدة') as IslamicField,
          defaultTitle: 'مصطلح شرعي جديد',
          icon: Compass,
          theme: {
            bg: 'bg-emerald-50/70 dark:bg-emerald-950/20',
            border: 'border-2 border-emerald-500/50 dark:border-emerald-700/50',
            iconBg: 'bg-emerald-600 text-white',
            badgeBg: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800',
            btnBg: 'bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white ring-emerald-500/30',
          }
        };

      case 'essentials':
        return {
          title: 'مهمات الدين ومسائل الإيمان',
          description: 'الأصول العقدية الكبرى، نواقض الإسلام العشرة، شروط الشهادتين، وقضايا الإيمان والتوحيد على فهم السلف الصالح.',
          buttonLabel: 'إضافة مسألة في مهمات الدين',
          buttonSubLabel: 'أصل عقدي أو مسألة إيمانية كبرى',
          targetCategory: 'essentials' as MainCategory,
          defaultField: 'العقيدة' as IslamicField,
          defaultTitle: 'مسألة كبرى في مهمات الدين',
          icon: Award,
          theme: {
            bg: 'bg-amber-50/70 dark:bg-amber-950/20',
            border: 'border-2 border-amber-500/50 dark:border-amber-700/50',
            iconBg: 'bg-amber-600 text-white',
            badgeBg: 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800',
            btnBg: 'bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-500 text-white ring-amber-500/30',
          }
        };

      case 'biographies':
        return {
          title: 'تراجم وسير أئمة السلف والعلماء',
          description: 'سير أئمة السنة والحديث، فقهاء المذاهب الأربعة، والمحققين مع ذكر مصنفاتهم، شيوخهم، وتلاميذهم وأقوالهم.',
          buttonLabel: 'إضافة ترجمة عالم جديد',
          buttonSubLabel: 'ترجمة إمام أو عالم من السلف',
          targetCategory: 'biographies' as MainCategory,
          defaultField: 'التراجم والرجال' as IslamicField,
          defaultTitle: 'ترجمة الإمام...',
          icon: Users,
          theme: {
            bg: 'bg-violet-50/70 dark:bg-violet-950/20',
            border: 'border-2 border-violet-500/50 dark:border-violet-700/50',
            iconBg: 'bg-violet-600 text-white',
            badgeBg: 'bg-violet-100 dark:bg-violet-950 text-violet-900 dark:text-violet-200 border-violet-300 dark:border-violet-800',
            btnBg: 'bg-violet-800 hover:bg-violet-900 dark:bg-violet-700 dark:hover:bg-violet-600 text-white ring-violet-500/30',
          }
        };

      case 'books':
        return {
          title: 'فهرس الكتب والمتون المقررة',
          description: 'دليل شامل للمتون الشرعية المتدرجة في التحصيل العلمي، شروحها المعتمدة، وأهم طبعاتها ومخطوطاتها.',
          buttonLabel: 'إضافة كتاب أو متن شرعي',
          buttonSubLabel: 'إدراج متن أو شرح في الفهرس',
          targetCategory: 'books' as MainCategory,
          defaultField: (selectedField !== 'all' ? selectedField : 'الفقه') as IslamicField,
          defaultTitle: 'متن في علم...',
          icon: BookMarked,
          theme: {
            bg: 'bg-teal-50/70 dark:bg-teal-950/20',
            border: 'border-2 border-teal-500/50 dark:border-teal-700/50',
            iconBg: 'bg-teal-600 text-white',
            badgeBg: 'bg-teal-100 dark:bg-teal-950 text-teal-900 dark:text-teal-200 border-teal-300 dark:border-teal-800',
            btnBg: 'bg-teal-800 hover:bg-teal-900 dark:bg-teal-700 dark:hover:bg-teal-600 text-white ring-teal-500/30',
          }
        };

      case 'media':
        return {
          title: 'الدروس والشروحات والمقالات',
          description: 'دروس مسجلة، مجالس سماع، وشروحات صوتية ومرئية ومقالات تأصيلية لكبار العلماء وطلبة العلم الراسخين.',
          buttonLabel: 'إضافة درس أو شرح علمي',
          buttonSubLabel: 'إدراج درس مرئي أو صوتي جديد',
          targetCategory: 'media' as MainCategory,
          defaultField: (selectedField !== 'all' ? selectedField : 'العقيدة') as IslamicField,
          defaultTitle: 'شرح منظومة / متن...',
          icon: Video,
          theme: {
            bg: 'bg-blue-50/70 dark:bg-blue-950/20',
            border: 'border-2 border-blue-500/50 dark:border-blue-700/50',
            iconBg: 'bg-blue-600 text-white',
            badgeBg: 'bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-200 border-blue-300 dark:border-blue-800',
            btnBg: 'bg-blue-800 hover:bg-blue-900 dark:bg-blue-700 dark:hover:bg-blue-600 text-white ring-blue-500/30',
          }
        };

      case 'favorites':
        return {
          title: 'المفضلة والفوائد الشخصية',
          description: 'مجموعتك الشخصية من الفوائد المحفوظة، الشواهد القرآنية والنبوية، والتقييدات التي دونتها أثناء طلبك للعلم.',
          buttonLabel: 'إضافة مادة أو فائدة للمفضلة',
          buttonSubLabel: 'تقييد فائدة جديدة في مجموعتك',
          targetCategory: 'terms' as MainCategory,
          defaultField: 'العقيدة' as IslamicField,
          defaultTitle: 'فائدة علمية مستنبطة',
          icon: Bookmark,
          theme: {
            bg: 'bg-amber-50/70 dark:bg-amber-950/20',
            border: 'border-2 border-amber-500/50 dark:border-amber-700/50',
            iconBg: 'bg-amber-600 text-white',
            badgeBg: 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800',
            btnBg: 'bg-amber-800 hover:bg-amber-900 dark:bg-amber-700 dark:hover:bg-amber-600 text-white ring-amber-500/30',
          }
        };

      case 'all':
      default:
        return {
          title: 'المكتبة الجامعة للمراجع الشرعية',
          description: 'تصفح شامل ومصنف للمصطلحات، المسائل، المتون، التراجم، والسيرة النبوية المؤصلة على فهم سلف الأمة.',
          buttonLabel: 'إضافة مادة علمية جديدة',
          buttonSubLabel: 'إدراج مادة جديدة في المكتبة الجامعة',
          targetCategory: 'terms' as MainCategory,
          defaultField: (selectedField !== 'all' ? selectedField : 'العقيدة') as IslamicField,
          defaultTitle: '',
          icon: Library,
          theme: {
            bg: 'bg-stone-50/80 dark:bg-stone-900/60',
            border: 'border-2 border-emerald-600/40 dark:border-emerald-500/40',
            iconBg: 'bg-emerald-800 text-white',
            badgeBg: 'bg-stone-200/80 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border-stone-300 dark:border-stone-700',
            btnBg: 'bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white ring-emerald-500/30',
          }
        };
    }
  };

  const config = getSectionConfig();
  const IconComponent = config.icon;

  const handleAddClick = () => {
    onAddNew(config.targetCategory, config.defaultField, config.defaultTitle);
  };

  return (
    <div className={`w-full p-5 sm:p-6 rounded-2xl ${config.theme.bg} ${config.theme.border} shadow-xs mb-6 text-right transition-all`}>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        
        {/* Right Info: Icon, Title & Description */}
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${config.theme.iconBg} flex items-center justify-center shrink-0 shadow-xs mt-0.5`}>
            <IconComponent className="w-6 h-6" />
          </div>

          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                {config.title}
              </h2>
              
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-bold border ${config.theme.badgeBg}`}>
                {itemCount} مادة معروضة
              </span>

              {selectedField && selectedField !== 'all' && (
                <span className="text-xs px-2 py-0.5 rounded-md bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                  الفن: {selectedField}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-3xl">
              {config.description}
            </p>
          </div>
        </div>

        {/* Dedicated Section Action Button */}
        <div className="w-full lg:w-auto shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-stone-200/60 dark:border-stone-800/60">
          <button
            onClick={handleAddClick}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md ring-2 hover:scale-102 transition-all cursor-pointer ${config.theme.btnBg}`}
            title={`إضافة مادة جديدة في قسم: ${config.title}`}
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 shrink-0" />
            <div className="text-right">
              <span className="block leading-tight font-bold">{config.buttonLabel}</span>
            </div>
          </button>
        </div>

      </div>
    </div>
  );
};
