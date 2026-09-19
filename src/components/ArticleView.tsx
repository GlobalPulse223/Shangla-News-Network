import React, { useState } from 'react';
import { ArrowLeft, Calendar, User, Share2, Check, Facebook, MessageCircle, Twitter, Tag, Bookmark, Link2 } from 'lucide-react';
import { Article, getArticleSlug } from '../data';
import { NewsCard } from './NewsCard';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
  relatedArticles: Article[];
  onSelectArticle: (id: number) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onBack,
  relatedArticles,
  onSelectArticle,
}) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const getShareableUrl = () => {
    if (typeof window === 'undefined') return '';
    const customOrigin = import.meta.env.VITE_SITE_URL
      ? String(import.meta.env.VITE_SITE_URL).replace(/\/$/, '')
      : '';
    const baseOrigin = customOrigin || window.location.origin;
    const slug = getArticleSlug(article);
    return `${baseOrigin}/article/${slug}`;
  };

  const handleCopyLink = () => {
    const shareUrl = getShareableUrl();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
    } else {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareFacebook = () => {
    const shareUrl = encodeURIComponent(getShareableUrl());
    const title = encodeURIComponent(article.title);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${title}`, '_blank');
  };

  const handleShareWhatsApp = () => {
    const shareUrl = getShareableUrl();
    const text = encodeURIComponent(`${article.title}\n\nRead full report on Shangla News Network (SNN):\n${shareUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`${article.title} - Shangla News Network`);
    const shareUrl = encodeURIComponent(getShareableUrl());
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`, '_blank');
  };

  // Generate richer paragraph format if content is brief, or render exact paragraphs
  const rawParagraphs = article.content.split(/\n+/).map((p) => p.trim()).filter(Boolean);
  const paragraphs = rawParagraphs.length > 1
    ? rawParagraphs
    : [
        article.content,
        `District Shangla correspondent Junaid Khan reported that community stakeholders and local administration in Alpuri and Besham continue to monitor developing situations closely. Authorities emphasized the importance of timely public information and proactive civic response.`,
        `Speaking to Shangla News Network (SNN), local representatives stated that development initiatives and welfare interventions remain central to ensuring long-term resilience across all valleys and mountain settlements in Khyber Pakhtunkhwa.`,
      ];

  return (
    <div className="py-6 px-4 container mx-auto max-w-5xl">
      {/* Back Button & Navigation Path */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-red-700 transition-colors bg-neutral-100 hover:bg-neutral-200 px-3.5 py-1.5 rounded-lg"
        >
          <ArrowLeft size={16} />
          Back to Homepage
        </button>

        <div className="text-xs text-neutral-500 font-medium">
          Home &gt; <span className="text-red-600 font-semibold">{article.category}</span> &gt; Story #{article.id}
        </div>
      </div>

      <article className="bg-white rounded-xl">
        {/* Category & Title */}
        <div className="mb-4">
          <span className="inline-block bg-red-700 text-white text-xs font-bold uppercase px-3 py-1 rounded tracking-wider mb-3">
            {article.category}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 leading-tight tracking-tight">
            {article.title}
          </h1>
        </div>

        {/* Metadata & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-neutral-200 text-xs text-neutral-600 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5 font-medium text-neutral-900">
              <User size={14} className="text-red-600" />
              <span>Reported by: <strong>{article.author}</strong> (Alpuri Bureau)</span>
            </div>
            <span>&bull;</span>
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-red-600" />
              <span>Published on: {article.date}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSaved(!saved)}
              className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1 transition-colors ${
                saved ? 'bg-red-50 text-red-600 border-red-200' : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              <Bookmark size={14} className={saved ? 'fill-red-600' : ''} />
              <span>{saved ? 'Saved' : 'Bookmark'}</span>
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-video rounded-xl overflow-hidden mb-8 border border-neutral-200 shadow-md">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-neutral-900/80 backdrop-blur-sm text-white text-xs p-2.5 flex justify-between">
            <span>Photo: SNN News Archive &bull; Shangla District Bureau</span>
            <span>Category: {article.category}</span>
          </div>
        </div>

        {/* Share Buttons Bar */}
        <div className="flex flex-wrap items-center gap-2 p-3 bg-neutral-50 rounded-xl border border-neutral-200 mb-8">
          <span className="text-xs font-bold text-neutral-700 flex items-center gap-1 mr-2">
            <Share2 size={14} className="text-red-600" />
            Share Article:
          </span>

          <button
            onClick={handleShareFacebook}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors"
          >
            <Facebook size={14} />
            Facebook
          </button>

          <button
            onClick={handleShareWhatsApp}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors"
          >
            <MessageCircle size={14} />
            WhatsApp
          </button>

          <button
            onClick={handleShareTwitter}
            className="bg-neutral-900 hover:bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors"
          >
            <Twitter size={14} />
            X (Twitter)
          </button>

          <button
            onClick={handleCopyLink}
            className="bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-semibold px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors ml-auto"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Link2 size={14} />}
            {copied ? 'Link Copied!' : 'Copy Direct Link'}
          </button>
        </div>

        {/* Article Body */}
        <div className="space-y-4 text-base md:text-lg text-neutral-800 leading-relaxed max-w-4xl border-b border-neutral-200 pb-8">
          {paragraphs.map((p, idx) => (
            <p key={idx} className="font-serif">
              {p}
            </p>
          ))}
        </div>

        {/* Author Bio Box */}
        <div className="my-8 p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-700 text-white flex items-center justify-center font-bold text-lg shrink-0">
            JK
          </div>
          <div>
            <h4 className="font-bold text-sm text-neutral-900">Junaid Khan</h4>
            <p className="text-xs text-neutral-600 mt-0.5">
              Chief Correspondent for Shangla News Network (SNN). Reporting extensively on welfare development, civic infrastructure, and educational advancements across District Shangla, Khyber Pakhtunkhwa.
            </p>
          </div>
        </div>
      </article>

      {/* Related News Section */}
      <section className="mt-12 pt-6 border-t-2 border-red-600">
        <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-red-600 rounded-full inline-block"></span>
          Related Stories from {article.category}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.slice(0, 3).map((item) => (
            <NewsCard
              key={item.id}
              article={item}
              onClick={() => onSelectArticle(item.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
