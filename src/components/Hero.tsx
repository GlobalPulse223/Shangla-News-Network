import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Article } from '../data';

interface HeroProps {
  mainArticle: Article;
  sideArticles: Article[];
  onArticleClick: (id: number) => void;
}

export const Hero: React.FC<HeroProps> = ({ mainArticle, sideArticles, onArticleClick }) => {
  if (!mainArticle) return null;

  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Big Featured Article on Left (8 Cols) */}
        <div
          onClick={() => onArticleClick(mainArticle.id)}
          className="lg:col-span-8 group cursor-pointer bg-neutral-900 rounded-xl overflow-hidden shadow-lg border border-neutral-800 relative flex flex-col justify-end"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <img
              src={mainArticle.image}
              alt={mainArticle.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 text-white z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-red-600 text-white font-bold text-xs uppercase px-2.5 py-1 rounded">
                Featured Lead
              </span>
              <span className="bg-neutral-800/80 backdrop-blur-sm text-neutral-200 text-xs px-2.5 py-1 rounded border border-neutral-700">
                {mainArticle.category}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-3 group-hover:text-red-400 transition-colors">
              {mainArticle.title}
            </h2>

            <p className="text-sm md:text-base text-neutral-300 line-clamp-2 mb-4 leading-relaxed max-w-3xl">
              {mainArticle.content}
            </p>

            <div className="flex items-center gap-4 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-red-500" />
                {mainArticle.date}
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5">
                <User size={13} className="text-red-500" />
                {mainArticle.author}
              </span>
              <span>&bull;</span>
              <span className="text-red-400 font-semibold flex items-center gap-1 group-hover:underline">
                Read Complete Story <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </div>

        {/* 4 Small Articles on Right (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-3">
          <div className="border-b-2 border-red-600 pb-2 mb-1 flex justify-between items-center">
            <h3 className="text-base font-bold text-neutral-900 uppercase tracking-wide flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-red-600 rounded-full inline-block"></span>
              Top Stories
            </h3>
            <span className="text-xs text-neutral-500 font-medium">Updated Just Now</span>
          </div>

          <div className="flex flex-col gap-3 flex-grow justify-between">
            {sideArticles.map((article, index) => (
              <div
                key={article.id}
                onClick={() => onArticleClick(article.id)}
                className="group flex gap-3 p-2.5 rounded-lg border border-neutral-200 hover:border-red-500 hover:bg-red-50/20 transition-all cursor-pointer bg-white"
              >
                <div className="relative w-24 h-20 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-1 left-1 bg-black/75 text-white text-[10px] font-bold px-1 rounded">
                    0{index + 1}
                  </span>
                </div>

                <div className="flex flex-col justify-between min-w-0 flex-grow">
                  <div>
                    <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider block mb-0.5">
                      {article.category}
                    </span>
                    <h4 className="font-bold text-xs md:text-sm text-neutral-900 leading-snug line-clamp-2 group-hover:text-red-700 transition-colors">
                      {article.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-1">
                    <span>{article.date}</span>
                    <span>&bull;</span>
                    <span className="truncate">{article.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
