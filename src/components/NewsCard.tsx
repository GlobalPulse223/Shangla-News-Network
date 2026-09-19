import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Article } from '../data';

interface NewsCardProps {
  article: Article;
  onClick: () => void;
  variant?: 'default' | 'compact' | 'horizontal';
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, onClick, variant = 'default' }) => {
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Welfare Activities':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Emergency Relief':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'Education':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Shangla Local News':
        return 'bg-amber-100 text-amber-900 border-amber-200';
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };

  const isAugustArchive = article.date.startsWith('2026-08');

  if (variant === 'horizontal') {
    return (
      <div 
        onClick={onClick}
        className="group flex gap-3 p-3 bg-white border border-neutral-200 rounded-lg hover:border-red-500 hover:shadow-md transition-all cursor-pointer"
      >
        <div className="w-28 h-20 shrink-0 overflow-hidden rounded relative">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {isAugustArchive && (
            <span className="absolute top-1 left-1 bg-neutral-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded opacity-90">
              Aug 2026
            </span>
          )}
        </div>
        <div className="flex flex-col justify-between flex-grow min-w-0">
          <div>
            <span className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase mb-1 ${getCategoryBadgeClass(article.category)}`}>
              {article.category}
            </span>
            <h4 className="font-semibold text-xs text-neutral-900 leading-snug line-clamp-2 group-hover:text-red-700 transition-colors">
              {article.title}
            </h4>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-1">
            <span>{article.date}</span>
            <span>&bull;</span>
            <span>{article.author}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="group bg-white border border-neutral-200 rounded-lg overflow-hidden hover:border-red-500 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      <div className="relative aspect-video overflow-hidden bg-neutral-100">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-2 left-2 flex gap-1.5">
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded shadow-sm border backdrop-blur-sm ${getCategoryBadgeClass(
              article.category
            )}`}
          >
            {article.category}
          </span>
          {isAugustArchive && (
            <span className="bg-neutral-900 text-white text-xs font-bold px-2 py-0.5 rounded shadow-sm border border-neutral-700">
              Archive (Aug 2026)
            </span>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center gap-3 text-xs text-neutral-500 mb-2">
            <span className="flex items-center gap-1">
              <Calendar size={12} className="text-red-600" />
              {article.date}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <User size={12} className="text-red-600" />
              {article.author}
            </span>
          </div>

          <h3 className="font-bold text-base md:text-lg text-neutral-900 leading-tight mb-2 group-hover:text-red-700 transition-colors line-clamp-2">
            {article.title}
          </h3>

          <p className="text-xs md:text-sm text-neutral-600 line-clamp-3 leading-relaxed">
            {article.content}
          </p>
        </div>

        <div className="pt-3 mt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-medium text-red-700 group-hover:text-red-800">
          <span>Read Full Story</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
