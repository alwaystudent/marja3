import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { KnowledgeItem, MainCategory, ThemeMode, FontSizeScale } from '../types';
import { INITIAL_KNOWLEDGE_BASE } from '../data/seedData';
import { matchArabic } from '../utils/arabicSearch';

interface LibraryContextType {
  items: KnowledgeItem[];
  filteredItems: KnowledgeItem[];
  favorites: string[];
  notes: Record<string, string>;
  theme: ThemeMode;
  fontSize: FontSizeScale;
  activeCategory: MainCategory | 'all';
  selectedField: string;
  selectedTypeTag: string;
  selectedScholar: string;
  selectedLevel: string;
  searchQuery: string;
  
  // Setters
  setTheme: (theme: ThemeMode) => void;
  setFontSize: (size: FontSizeScale) => void;
  setActiveCategory: (cat: MainCategory | 'all') => void;
  setSelectedField: (field: string) => void;
  setSelectedTypeTag: (typeTag: string) => void;
  setSelectedScholar: (scholar: string) => void;
  setSelectedLevel: (level: string) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
  
  // CRUD Actions
  addItem: (item: Omit<KnowledgeItem, 'id' | 'createdAt'>) => string;
  updateItem: (id: string, updatedFields: Partial<KnowledgeItem>) => void;
  deleteItem: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  saveItemNote: (id: string, note: string) => void;
  getItemNote: (id: string) => string;
  resetToDefaultData: () => void;
  exportDataAsJSON: () => void;
  importDataFromJSON: (jsonText: string) => { success: boolean; message: string };
}

const STORAGE_KEYS = {
  ITEMS: 'talib_ilm_items_v3',
  FAVORITES: 'talib_ilm_favorites_v3',
  NOTES: 'talib_ilm_notes_v3',
  THEME: 'talib_ilm_theme_v3',
  FONT_SIZE: 'talib_ilm_font_size_v3',
};

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Items state
  const [items, setItems] = useState<KnowledgeItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ITEMS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed reading items from localStorage', e);
    }
    return INITIAL_KNOWLEDGE_BASE;
  });

  // 2. Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed reading favorites', e);
    }
    return [];
  });

  // 3. User study notes
  const [notes, setNotes] = useState<Record<string, string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.NOTES);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed reading notes', e);
    }
    return {};
  });

  // 4. Visual theme: 'light' | 'sepia' | 'dark'
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.THEME) as ThemeMode;
      if (stored === 'light' || stored === 'sepia' || stored === 'dark') return stored;
    } catch (e) {
      console.error(e);
    }
    return 'light';
  });

  // 5. Font size scale: 'sm' | 'md' | 'lg' | 'xl'
  const [fontSize, setFontSize] = useState<FontSizeScale>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FONT_SIZE) as FontSizeScale;
      if (stored && ['sm', 'md', 'lg', 'xl'].includes(stored)) return stored;
    } catch (e) {
      console.error(e);
    }
    return 'md';
  });

  // Search & Navigation Filters
  const [activeCategory, setActiveCategory] = useState<MainCategory | 'all'>('all');
  const [selectedField, setSelectedField] = useState<string>('all');
  const [selectedTypeTag, setSelectedTypeTag] = useState<string>('all');
  const [selectedScholar, setSelectedScholar] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Save to localStorage effects
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving items to localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (e) {
      console.error('Error saving favorites', e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
    } catch (e) {
      console.error('Error saving notes', e);
    }
  }, [notes]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
      const root = document.documentElement;
      root.classList.remove('dark', 'sepia');
      if (theme === 'dark') {
        root.classList.add('dark');
      } else if (theme === 'sepia') {
        root.classList.add('sepia');
      }
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FONT_SIZE, fontSize);
    } catch (e) {
      console.error(e);
    }
  }, [fontSize]);

  // Filtering logic
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (activeCategory === 'favorites') {
        if (!favorites.includes(item.id)) return false;
      } else if (activeCategory !== 'all') {
        if (item.category !== activeCategory) return false;
      }

      // Field filter
      if (selectedField !== 'all' && item.field !== selectedField) {
        return false;
      }

      // Type tag filter
      if (selectedTypeTag !== 'all' && item.typeTag !== selectedTypeTag) {
        return false;
      }

      // Scholar filter
      if (selectedScholar !== 'all') {
        const scholarText = `${item.scholar || ''} ${item.bookAuthor || ''}`;
        if (!matchArabic(scholarText, selectedScholar)) {
          return false;
        }
      }

      // Level filter
      if (selectedLevel !== 'all' && item.level !== selectedLevel) {
        return false;
      }

      // Search query (Arabic normalized search across all relevant fields)
      if (searchQuery.trim()) {
        const q = searchQuery.trim();
        const inTitle = matchArabic(item.title, q);
        const inSubTitle = matchArabic(item.subTitle, q);
        const inContent = matchArabic(item.content, q);
        const inScholar = matchArabic(item.scholar, q);
        const inField = matchArabic(item.field, q);
        const inAuthor = matchArabic(item.bookAuthor, q);
        const inProofs = item.proofs?.some((p) => matchArabic(p, q));
        const inConditions = item.conditions?.some((c) => matchArabic(c, q));
        const inSources = item.sources?.some((s) => matchArabic(s, q));
        const inNote = matchArabic(notes[item.id], q);

        if (
          !inTitle &&
          !inSubTitle &&
          !inContent &&
          !inScholar &&
          !inField &&
          !inAuthor &&
          !inProofs &&
          !inConditions &&
          !inSources &&
          !inNote
        ) {
          return false;
        }
      }

      return true;
    });
  }, [
    items,
    activeCategory,
    favorites,
    selectedField,
    selectedTypeTag,
    selectedScholar,
    selectedLevel,
    searchQuery,
    notes,
  ]);

  const clearFilters = () => {
    setSelectedField('all');
    setSelectedTypeTag('all');
    setSelectedScholar('all');
    setSelectedLevel('all');
    setSearchQuery('');
  };

  // CRUD actions
  const addItem = (item: Omit<KnowledgeItem, 'id' | 'createdAt'>): string => {
    const newId = `custom-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newItem: KnowledgeItem = {
      ...item,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0],
      isCustom: true,
    };
    setItems((prev) => [newItem, ...prev]);
    return newId;
  };

  const updateItem = (id: string, updatedFields: Partial<KnowledgeItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setFavorites((prev) => prev.filter((favId) => favId !== id));
    setNotes((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: string): boolean => {
    return favorites.includes(id);
  };

  const saveItemNote = (id: string, noteText: string) => {
    setNotes((prev) => ({
      ...prev,
      [id]: noteText,
    }));
  };

  const getItemNote = (id: string): string => {
    return notes[id] || '';
  };

  const resetToDefaultData = () => {
    setItems(INITIAL_KNOWLEDGE_BASE);
    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(INITIAL_KNOWLEDGE_BASE));
  };

  const exportDataAsJSON = () => {
    const backupData = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      itemsCount: items.length,
      items,
      favorites,
      notes,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `marja-talib-ilm-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importDataFromJSON = (jsonText: string): { success: boolean; message: string } => {
    try {
      const parsed = JSON.parse(jsonText);
      if (!parsed || !Array.isArray(parsed.items)) {
        return { success: false, message: 'ملف غير صالح، لم يتم العثور على مصفوفة المراجع.' };
      }
      setItems(parsed.items);
      if (Array.isArray(parsed.favorites)) {
        setFavorites(parsed.favorites);
      }
      if (parsed.notes && typeof parsed.notes === 'object') {
        setNotes(parsed.notes);
      }
      return { success: true, message: `تم استيراد ${parsed.items.length} مرجعاً علمياً بنجاح!` };
    } catch (e) {
      console.error(e);
      return { success: false, message: 'خطأ في قراءة ملف JSON أو تلف في البيانات.' };
    }
  };

  return (
    <LibraryContext.Provider
      value={{
        items,
        filteredItems,
        favorites,
        notes,
        theme,
        fontSize,
        activeCategory,
        selectedField,
        selectedTypeTag,
        selectedScholar,
        selectedLevel,
        searchQuery,
        setTheme,
        setFontSize,
        setActiveCategory,
        setSelectedField,
        setSelectedTypeTag,
        setSelectedScholar,
        setSelectedLevel,
        setSearchQuery,
        clearFilters,
        addItem,
        updateItem,
        deleteItem,
        toggleFavorite,
        isFavorite,
        saveItemNote,
        getItemNote,
        resetToDefaultData,
        exportDataAsJSON,
        importDataFromJSON,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = (): LibraryContextType => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};
