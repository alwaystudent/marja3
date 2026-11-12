import React, { useState } from 'react';
import { LibraryProvider, useLibrary } from './context/LibraryContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { Sidebar } from './components/Sidebar';
import { BottomActionBar } from './components/BottomActionBar';
import { FiltersBar } from './components/FiltersBar';
import { ItemCard } from './components/ItemCard';
import { ItemDetailModal } from './components/ItemDetailModal';
import { ItemEditorModal } from './components/ItemEditorModal';
import { DataManagementModal } from './components/DataManagementModal';
import { PillarsMatrixView } from './components/PillarsMatrixView';
import { SeerahTimelineView } from './components/SeerahTimelineView';
import { ShareModal } from './components/ShareModal';
import { SectionHeaderBanner } from './components/SectionHeaderBanner';
import { KnowledgeItem, MainCategory, IslamicField } from './types';
import { SearchX, ArrowUp, Plus } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { 
    filteredItems, 
    activeCategory, 
    clearFilters, 
    searchQuery,
    selectedField,
    items 
  } = useLibrary();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<KnowledgeItem | null>(null);
  const [itemToEdit, setItemToEdit] = useState<KnowledgeItem | null>(null);
  const [itemToShare, setItemToShare] = useState<KnowledgeItem | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);

  // New item creation defaults
  const [editorInitialCategory, setEditorInitialCategory] = useState<MainCategory | undefined>(undefined);
  const [editorInitialField, setEditorInitialField] = useState<IslamicField | undefined>(undefined);
  const [editorInitialTitle, setEditorInitialTitle] = useState<string | undefined>(undefined);

  const handleOpenNewItem = (category?: MainCategory, field?: string, title?: string) => {
    setItemToEdit(null);
    setEditorInitialCategory(category || (activeCategory !== 'all' && activeCategory !== 'favorites' ? activeCategory : 'terms'));
    setEditorInitialField(field as IslamicField | undefined);
    setEditorInitialTitle(title);
    setIsEditorOpen(true);
  };

  const handleEditItem = (item: KnowledgeItem) => {
    setItemToEdit(item);
    setIsEditorOpen(true);
  };

  const handleSavedItem = (savedItem: KnowledgeItem) => {
    if (selectedItemForDetail?.id === savedItem.id) {
      setSelectedItemForDetail(savedItem);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#FAF8F5] dark:bg-[#0D1513] text-[#1F2724] dark:text-[#E4EAE6] transition-colors duration-200">
      
      {/* Top Bar Header with Elegant Emblem Logo */}
      <Header 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Main Full-Width Body Layout: Sidebar placed directly under Logo on the right */}
      <div className="w-full flex flex-row-reverse items-start flex-1">
        
        {/* Right Sidebar: Docked directly underneath the Logo */}
        <Sidebar 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onOpenNewItemModal={() => handleOpenNewItem()}
          onOpenDataModal={() => setIsDataModalOpen(true)}
        />

        {/* Left Side: Central Full-Width Reading & Exploration Canvas */}
        <div className="flex-1 min-w-0 w-full flex flex-col">
          
          {/* Hero Banner with Search & Live Stats */}
          <HeroSection />

          {/* Filters Bar (shown when browsing standard lists) */}
          {activeCategory !== 'pillars_matrix' && activeCategory !== 'seerah' && (
            <FiltersBar />
          )}

          {/* Main Full-Width Content Container */}
          <main className="w-full px-4 sm:px-6 lg:px-8 py-6 pb-28 flex-1">
            
            {/* View 1: Pillars & Conditions Matrix */}
            {activeCategory === 'pillars_matrix' && (
              <div className="w-full">
                <PillarsMatrixView 
                  onOpenDetail={(item) => setSelectedItemForDetail(item)}
                  onEdit={(item) => handleEditItem(item)}
                  onAddNew={(cat, field, title) => handleOpenNewItem(cat, field, title)}
                  onShare={(item) => setItemToShare(item)}
                />
              </div>
            )}

            {/* View 2: Prophetic Seerah Timeline */}
            {activeCategory === 'seerah' && (
              <div className="w-full">
                <SeerahTimelineView 
                  onOpenDetail={(item) => setSelectedItemForDetail(item)}
                  onEdit={(item) => handleEditItem(item)}
                  onAddNew={(cat, field, title) => handleOpenNewItem(cat, field, title)}
                  onShare={(item) => setItemToShare(item)}
                />
              </div>
            )}

            {/* View 3: Full-Width Cards Grid for Terms, Essentials, Books, Biographies, Favorites, All */}
            {activeCategory !== 'pillars_matrix' && activeCategory !== 'seerah' && (
              <div className="w-full">
                
                {/* Dedicated Section Header Banner with Custom Addition Button */}
                <SectionHeaderBanner
                  category={activeCategory}
                  itemCount={filteredItems.length}
                  totalCount={items.length}
                  selectedField={selectedField}
                  onAddNew={(cat, field, title) => handleOpenNewItem(cat, field, title)}
                />

                {/* Results Header Count & Action */}
                <div className="w-full flex items-center justify-between text-xs sm:text-sm text-stone-500 dark:text-stone-400 mb-6 pb-2 border-b border-stone-200/60 dark:border-stone-800/60">
                  <div className="flex items-center gap-2">
                    <span>المراجع المعروضة:</span>
                    <span className="font-mono font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                      {filteredItems.length}
                    </span>
                    <span>من إجمالي {items.length} مادة علمية</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {searchQuery && (
                      <div className="text-emerald-800 dark:text-emerald-400 font-medium">
                        نتائج البحث عن: "{searchQuery}"
                      </div>
                    )}
                    <button
                      onClick={() => handleOpenNewItem(activeCategory !== 'all' && activeCategory !== 'favorites' ? activeCategory : 'terms')}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
                      title="إضافة مادة جديدة في هذا القسم"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-300" />
                      <span>إضافة مادة في هذا القسم</span>
                    </button>
                  </div>
                </div>

                {/* Empty State */}
                {filteredItems.length === 0 ? (
                  <div className="text-center py-16 px-4 bg-white/50 dark:bg-stone-900/30 rounded-2xl border border-stone-200 dark:border-stone-800 max-w-lg mx-auto my-8">
                    <SearchX className="w-12 h-12 text-stone-400 mx-auto mb-3" />
                    <h3 className="font-heading font-bold text-lg text-stone-800 dark:text-stone-200 mb-1">
                      لم يتم العثور على مراجع مطابقة
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mb-4">
                      جرب تغيير كلمات البحث، أو إزالة بعض المرشحات، أو إضافة مادة جديدة إلى مكتبتك.
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={clearFilters}
                        className="px-4 py-2 text-xs font-medium bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-lg hover:bg-stone-300 transition-colors"
                      >
                        إعادة ضبط جميع المرشحات
                      </button>
                      <button
                        onClick={() => handleOpenNewItem()}
                        className="px-4 py-2 text-xs font-bold bg-emerald-800 text-white rounded-lg hover:bg-emerald-900 transition-colors"
                      >
                        + إضافة مادة جديدة
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Full-Width Responsive Scholarly Cards Grid */
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
                    {filteredItems.map((item) => (
                      <ItemCard
                        key={item.id}
                        item={item}
                        onOpenDetail={(i) => setSelectedItemForDetail(i)}
                        onEdit={(i) => handleEditItem(i)}
                        onShare={(i) => setItemToShare(i)}
                      />
                    ))}
                  </div>
                )}

              </div>
            )}

          </main>

          {/* Institutional Editorial Footer */}
          <footer className="w-full border-t border-stone-200 dark:border-stone-800 bg-[#F4EFE6] dark:bg-[#0B1210] py-10 transition-colors mt-auto">
            <div className="w-full px-4 sm:px-6 lg:px-8 text-center space-y-4">
              
              <div className="font-heading text-lg font-bold text-emerald-950 dark:text-emerald-200">
                مَرْجِعُ طَالِبِ العِلْمِ
              </div>

              <p className="font-serif italic text-sm text-stone-700 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
                «من سلك طريقاً يلتمس فيه علماً سهل الله له به طريقاً إلى الجنة، وإن الملائكة لتضع أجنحتها رضاً لطالب العلم»
              </p>

              <div className="text-xs text-stone-500 dark:text-stone-400 pt-3 border-t border-stone-200/80 dark:border-stone-800/80 flex flex-wrap items-center justify-between gap-3">
                <div>
                  مكتبة علمية مؤصلة وفق منهج أهل السنة والجماعة · سلف الأمة الصالح
                </div>
                <div>
                  جميع المراجع قابلة للتعديل والإضافة والحفظ والنسخ الاحتياطي
                </div>
              </div>

            </div>
          </footer>

        </div>

      </div>

      {/* Floating Scroll to Top button (docked above bottom bar) */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-20 left-6 z-30 p-2.5 rounded-full bg-emerald-800 dark:bg-emerald-700 text-white shadow-lg hover:bg-emerald-900 dark:hover:bg-emerald-600 transition-all opacity-85 hover:opacity-100"
        title="الصعود لأعلى الصفحة"
        aria-label="الصعود لأعلى الصفحة"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

      {/* Bottom Horizontal Action Bar: Home + Add + Data Management */}
      <BottomActionBar 
        onOpenNewItemModal={() => handleOpenNewItem()} 
        onOpenDataModal={() => setIsDataModalOpen(true)} 
      />

      {/* Modals */}
      <ItemDetailModal
        item={selectedItemForDetail}
        onClose={() => setSelectedItemForDetail(null)}
        onEdit={(item) => handleEditItem(item)}
        onNavigateToRelated={(related) => setSelectedItemForDetail(related)}
        onShare={(item) => setItemToShare(item)}
      />

      {/* Share & Multi-Platform Publishing Modal */}
      <ShareModal
        item={itemToShare}
        onClose={() => setItemToShare(null)}
      />

      <ItemEditorModal
        isOpen={isEditorOpen}
        itemToEdit={itemToEdit}
        initialCategory={editorInitialCategory}
        initialField={editorInitialField}
        initialTitle={editorInitialTitle}
        onClose={() => setIsEditorOpen(false)}
        onSaved={handleSavedItem}
      />

      <DataManagementModal
        isOpen={isDataModalOpen}
        onClose={() => setIsDataModalOpen(false)}
      />

    </div>
  );
};

export default function App() {
  return (
    <LibraryProvider>
      <MainAppContent />
    </LibraryProvider>
  );
}
