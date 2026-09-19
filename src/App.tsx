import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { initialArticles, Article } from './data';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { NewsCard } from './components/NewsCard';
import { ArticleView } from './components/ArticleView';
import { Sidebar } from './components/Sidebar';
import { AdminPanel } from './components/AdminPanel';
import { InfoModal } from './components/InfoModal';
import { PlusCircle, Filter, Calendar, FolderArchive, ArrowRight } from 'lucide-react';

// Helper to extract article ID from URL path, query param, or hash
const getArticleIdFromUrl = (): number | null => {
  if (typeof window === 'undefined') return null;
  try {
    // 1. Primary: Check URL pathname (e.g. /article/101 or /101)
    const path = window.location.pathname;
    const pathMatch = path.match(/\/article\/(\d+)/i) || path.match(/^\/(\d+)\/?$/);
    if (pathMatch) {
      const parsed = parseInt(pathMatch[1], 10);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }

    // 2. Fallbacks for query params or hash if shared that way
    const params = new URLSearchParams(window.location.search);
    const paramId = params.get('article') || params.get('id');
    if (paramId) {
      const parsed = parseInt(paramId, 10);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
    const hash = window.location.hash;
    const hashMatch = hash.match(/(?:article[=\/-]?|\/)(\d+)/i);
    if (hashMatch) {
      const parsed = parseInt(hashMatch[1], 10);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
  } catch (e) {
    console.error('Error reading article from URL:', e);
  }
  return null;
};

export default function App() {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(() => getArticleIdFromUrl());
  const [currentCategory, setCurrentCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMonthFilter, setSelectedMonthFilter] = useState<string>('all');
  const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);
  const [infoModalType, setInfoModalType] = useState<'about' | 'contact' | 'privacy' | null>(null);

  // Active single article
  const selectedArticle = useMemo(() => {
    return articles.find((a) => a.id === selectedArticleId) || null;
  }, [articles, selectedArticleId]);

  // Open an article and set URL: ?article=:id (compatible everywhere without 404)
  const handleOpenArticle = useCallback((id: number) => {
    setSelectedArticleId(id);
    try {
      const targetPath = `/?article=${id}`;
      window.history.pushState({ articleId: id }, '', targetPath);
    } catch (e) {
      console.error('Error pushing URL state:', e);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Return to homepage and reset URL
  const handleBackToHome = useCallback(() => {
    setSelectedArticleId(null);
    try {
      window.history.pushState({}, '', '/');
    } catch (e) {
      console.error('Error resetting URL state:', e);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Listen for browser back/forward and hash changes
  useEffect(() => {
    const handlePopState = () => {
      const id = getArticleIdFromUrl();
      setSelectedArticleId(id);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Sync document title with current view
  useEffect(() => {
    if (selectedArticle) {
      document.title = `${selectedArticle.title} - Shangla News Network (SNN)`;
    } else {
      document.title = 'Shangla News Network (SNN) - Alpuri, District Shangla';
    }
  }, [selectedArticle]);

  // Related articles for the detail page
  const relatedArticles = useMemo(() => {
    if (!selectedArticle) return [];
    return articles
      .filter((a) => a.id !== selectedArticle.id && a.category === selectedArticle.category)
      .concat(articles.filter((a) => a.id !== selectedArticle.id))
      .slice(0, 3);
  }, [articles, selectedArticle]);

  // Add new article from Admin
  const handleAddArticle = (newArticle: Article) => {
    setArticles([newArticle, ...articles]);
    handleOpenArticle(newArticle.id); // Open it immediately so the user can verify
  };

  // Filtered articles list based on Category, Month, or Search
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = article.title.toLowerCase().includes(query);
        const matchesContent = article.content.toLowerCase().includes(query);
        const matchesCategory = article.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesContent && !matchesCategory) {
          return false;
        }
      }

      // Month filter
      if (selectedMonthFilter !== 'all') {
        if (!article.date.startsWith(selectedMonthFilter)) {
          return false;
        }
      }

      // Category filter
      if (currentCategory === 'All') {
        return true;
      }
      if (currentCategory === 'August 2026') {
        return article.date.startsWith('2026-08');
      }
      if (currentCategory === 'KPK') {
        return (
          article.category === 'Shangla Local News' ||
          article.category === 'Pakistan' ||
          article.title.toLowerCase().includes('kpk')
        );
      }
      if (currentCategory === 'Contact') {
        return true;
      }

      return article.category === currentCategory;
    });
  }, [articles, searchQuery, selectedMonthFilter, currentCategory]);

  // Specific Category sets for homepage rows
  const shanglaLocalNews = useMemo(() => {
    return articles.filter((a) => a.category === 'Shangla Local News');
  }, [articles]);

  const welfareNews = useMemo(() => {
    return articles.filter((a) => a.category === 'Welfare Activities');
  }, [articles]);

  const emergencyNews = useMemo(() => {
    return articles.filter((a) => a.category === 'Emergency Relief');
  }, [articles]);

  const augustArchiveArticles = useMemo(() => {
    return articles.filter((a) => a.date.startsWith('2026-08'));
  }, [articles]);

  const handleSelectCategory = (cat: string) => {
    if (cat === 'Contact') {
      setInfoModalType('contact');
      return;
    }
    setCurrentCategory(cat);
    handleBackToHome();
  };

  const isFilteredView = currentCategory !== 'All' || searchQuery.trim() !== '' || selectedMonthFilter !== 'all';

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 font-sans">
      {/* Header */}
      <Header
        currentCategory={currentCategory}
        onSelectCategory={handleSelectCategory}
        breakingNews={articles.slice(0, 6)}
        onArticleClick={handleOpenArticle}
      />

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {selectedArticle ? (
          /* Full Article View */
          <ArticleView
            article={selectedArticle}
            onBack={handleBackToHome}
            relatedArticles={relatedArticles}
            onSelectArticle={handleOpenArticle}
          />
        ) : (
          /* Homepage Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Content (8 cols on desktop) */}
            <div className="lg:col-span-8 space-y-10">
              {isFilteredView ? (
                /* Filtered or Category Specific Grid View */
                <section className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                  <div className="flex flex-wrap justify-between items-center pb-4 mb-6 border-b border-neutral-200 gap-3">
                    <div>
                      <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Filter size={14} />
                        Filtered Coverage
                      </div>
                      <h2 className="text-2xl font-extrabold text-neutral-900">
                        {currentCategory === 'August 2026'
                          ? 'Archive: August 2026 News (Pechlay Month Ki Khabrein)'
                          : currentCategory !== 'All'
                          ? currentCategory
                          : searchQuery
                          ? `Search: "${searchQuery}"`
                          : 'Monthly News Filter'}
                      </h2>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs bg-neutral-100 text-neutral-700 font-semibold px-2.5 py-1 rounded-full border">
                        {filteredArticles.length} Stories Found
                      </span>
                      <button
                        onClick={() => {
                          setCurrentCategory('All');
                          setSearchQuery('');
                          setSelectedMonthFilter('all');
                        }}
                        className="text-xs text-red-700 hover:text-red-900 font-bold underline"
                      >
                        Reset Filters
                      </button>
                    </div>
                  </div>

                  {filteredArticles.length === 0 ? (
                    <div className="text-center py-12 text-neutral-500">
                      <p className="text-base font-semibold mb-2">No articles found matching your criteria.</p>
                      <p className="text-xs">Try selecting another category or clearing your search keywords.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {filteredArticles.map((article) => (
                        <NewsCard
                          key={article.id}
                          article={article}
                          onClick={() => handleOpenArticle(article.id)}
                        />
                      ))}
                    </div>
                  )}
                </section>
              ) : (
                /* Default Rich Homepage Layout */
                <>
                  {/* Hero Section: 1 big featured article on left with large image, 4 small articles on right */}
                  <Hero
                    mainArticle={articles[0]}
                    sideArticles={articles.slice(1, 5)}
                    onArticleClick={handleOpenArticle}
                  />

                  {/* Latest News Section: 6 articles in grid (3 columns) */}
                  <section className="bg-white p-5 md:p-6 rounded-xl border border-neutral-200 shadow-sm">
                    <div className="border-b-2 border-red-600 pb-2 mb-6 flex justify-between items-center">
                      <div>
                        <span className="text-xs font-bold text-red-600 uppercase tracking-widest block">
                          Current Edition
                        </span>
                        <h3 className="text-xl md:text-2xl font-black text-neutral-900 tracking-tight">
                          Latest News & Field Dispatches
                        </h3>
                      </div>
                      <span className="text-xs font-semibold text-neutral-500">
                        September 2026
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                      {articles.slice(5, 11).map((article) => (
                        <NewsCard
                          key={article.id}
                          article={article}
                          onClick={() => handleOpenArticle(article.id)}
                        />
                      ))}
                    </div>
                  </section>

                  {/* Category Section 1: Shangla Local News */}
                  <section className="bg-white p-5 md:p-6 rounded-xl border border-neutral-200 shadow-sm">
                    <div className="border-b-2 border-amber-500 pb-2 mb-6 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                        <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
                          Shangla Local News & Community Affairs
                        </h3>
                      </div>
                      <button
                        onClick={() => handleSelectCategory('Shangla Local News')}
                        className="text-xs font-bold text-red-700 hover:underline flex items-center gap-1"
                      >
                        View All ({shanglaLocalNews.length}) <ArrowRight size={12} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                      {shanglaLocalNews.slice(0, 3).map((article) => (
                        <NewsCard
                          key={article.id}
                          article={article}
                          onClick={() => handleOpenArticle(article.id)}
                        />
                      ))}
                    </div>
                  </section>

                  {/* Category Section 2: Welfare Activities */}
                  <section className="bg-white p-5 md:p-6 rounded-xl border border-neutral-200 shadow-sm">
                    <div className="border-b-2 border-emerald-600 pb-2 mb-6 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                        <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
                          Welfare Activities & SWDO Projects
                        </h3>
                      </div>
                      <button
                        onClick={() => handleSelectCategory('Welfare Activities')}
                        className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                      >
                        View All ({welfareNews.length}) <ArrowRight size={12} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                      {welfareNews.slice(0, 3).map((article) => (
                        <NewsCard
                          key={article.id}
                          article={article}
                          onClick={() => handleOpenArticle(article.id)}
                        />
                      ))}
                    </div>
                  </section>

                  {/* Category Section 3: Emergency Relief */}
                  <section className="bg-white p-5 md:p-6 rounded-xl border border-neutral-200 shadow-sm">
                    <div className="border-b-2 border-rose-600 pb-2 mb-6 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-rose-600 rounded-full"></div>
                        <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
                          Emergency Relief & Flood Rehabilitation
                        </h3>
                      </div>
                      <button
                        onClick={() => handleSelectCategory('Emergency Relief')}
                        className="text-xs font-bold text-rose-700 hover:underline flex items-center gap-1"
                      >
                        View All ({emergencyNews.length}) <ArrowRight size={12} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                      {emergencyNews.slice(0, 3).map((article) => (
                        <NewsCard
                          key={article.id}
                          article={article}
                          onClick={() => handleOpenArticle(article.id)}
                        />
                      ))}
                    </div>
                  </section>

                  {/* Dedicated Prominent Section: Last Month's News Archive (August 2026 - 10 Articles) */}
                  <section className="bg-gradient-to-b from-neutral-900 to-black text-white p-5 md:p-7 rounded-2xl shadow-xl border border-neutral-800">
                    <div className="flex flex-wrap justify-between items-center pb-4 mb-6 border-b border-neutral-800 gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-wider mb-1">
                          <FolderArchive size={16} />
                          Archive Collection &bull; Pechlay Month Ki Khabrein
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                          August 2026 Edition Archive
                          <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                            10 Articles
                          </span>
                        </h3>
                        <p className="text-xs text-neutral-400 mt-1">
                          Special historical reports, August welfare drives, summer camps, flood damage assessments, and school reopenings.
                        </p>
                      </div>

                      <button
                        onClick={() => handleSelectCategory('August 2026')}
                        className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 shadow"
                      >
                        Filter August Only <ArrowRight size={13} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {augustArchiveArticles.map((article) => (
                        <div
                          key={article.id}
                          onClick={() => handleOpenArticle(article.id)}
                          className="group bg-neutral-800/90 hover:bg-neutral-800 border border-neutral-700 hover:border-red-500 p-3.5 rounded-xl transition-all cursor-pointer flex gap-3.5 items-center"
                        >
                          <div className="w-24 h-20 rounded-lg overflow-hidden shrink-0 bg-neutral-900 relative">
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              loading="lazy"
                            />
                            <span className="absolute bottom-1 right-1 bg-black/80 text-[10px] text-white px-1 rounded font-mono">
                              Aug '26
                            </span>
                          </div>

                          <div className="min-w-0 flex-grow">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 block mb-1">
                              {article.category}
                            </span>
                            <h4 className="font-bold text-xs md:text-sm text-white group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                              {article.title}
                            </h4>
                            <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-2">
                              <span className="flex items-center gap-1">
                                <Calendar size={11} className="text-red-400" />
                                {article.date}
                              </span>
                              <span>&bull;</span>
                              <span className="truncate">{article.author}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              )}
            </div>

            {/* Right Sidebar (4 cols on desktop) */}
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <Sidebar
                  searchQuery={searchQuery}
                  onSearchChange={(q) => {
                    setSearchQuery(q);
                    handleBackToHome();
                  }}
                  popularArticles={articles}
                  onArticleClick={handleOpenArticle}
                  selectedMonthFilter={selectedMonthFilter}
                  onMonthFilterChange={(m) => {
                    setSelectedMonthFilter(m);
                    handleBackToHome();
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Admin Panel Modal (optional) */}
      {showAdminPanel && (
        <AdminPanel
          onAddArticle={handleAddArticle}
          onClose={() => setShowAdminPanel(false)}
        />
      )}

      {/* Info Modals (About, Contact, Privacy) */}
      <InfoModal
        type={infoModalType}
        onClose={() => setInfoModalType(null)}
      />

      {/* Footer */}
      <Footer
        onOpenModal={(type) => setInfoModalType(type)}
        onSelectCategory={handleSelectCategory}
      />
    </div>
  );
}
