import React from 'react';
import { Facebook, Youtube, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { Article } from '../data';

interface HeaderProps {
  currentCategory: string;
  onSelectCategory: (category: string) => void;
  breakingNews: Article[];
  onArticleClick: (id: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  breakingNews,
  onArticleClick,
}) => {
  const currentDate = new Date().toLocaleDateString('en-PK', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const navItems = [
    { label: 'Home', value: 'All' },
    { label: 'Shangla', value: 'Shangla Local News' },
    { label: 'Khyber Pakhtunkhwa', value: 'KPK' },
    { label: 'Pakistan', value: 'Pakistan' },
    { label: 'Welfare', value: 'Welfare Activities' },
    { label: 'Education', value: 'Education' },
    { label: 'Emergency Aid', value: 'Emergency Relief' },
    { label: 'August 2026 (Pichla Mahina)', value: 'August 2026' },
    { label: 'Contact Us', value: 'Contact' },
  ];

  return (
    <header className="border-b-4 border-red-600 bg-white sticky top-0 z-40 shadow-sm">
      {/* Top Black Bar */}
      <div className="bg-neutral-900 text-neutral-300 py-1.5 px-4 text-xs">
        <div className="container mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="font-medium text-white">{currentDate}</span>
            <span className="hidden sm:inline-block text-neutral-500">|</span>
            <span className="hidden sm:inline-block text-red-400 font-semibold">Alpuri, District Shangla, KPK</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-neutral-400 text-xs hidden md:inline">Follow SNN:</span>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="hover:text-blue-400 transition-colors p-1"
                title="Facebook"
              >
                <Facebook size={15} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="hover:text-red-500 transition-colors p-1"
                title="YouTube"
              >
                <Youtube size={15} />
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="hover:text-green-400 transition-colors p-1"
                title="WhatsApp Channel"
              >
                <MessageCircle size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Logo & Brand Header */}
      <div className="container mx-auto py-3 px-4 flex flex-wrap justify-between items-center gap-4">
        <div 
          onClick={() => onSelectCategory('All')} 
          className="cursor-pointer group flex items-center gap-3 select-none"
        >
          <div className="bg-red-700 text-white font-black px-3 py-1.5 rounded tracking-tighter text-2xl shadow-sm group-hover:bg-red-800 transition-colors">
            SNN
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight leading-none group-hover:text-red-700 transition-colors">
              Shangla News Network
            </h1>
            <p className="text-xs text-neutral-500 tracking-widest uppercase mt-0.5 font-semibold">
              Voice of Shangla &bull; Authentic Local &bull; Regional &bull; National Journalism
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6 text-xs text-neutral-600 bg-neutral-50 border border-neutral-200 px-4 py-2 rounded-lg">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-red-600" />
            <span>Alpuri Bureau</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail size={14} className="text-red-600" />
            <span>news@snn.pk</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone size={14} className="text-red-600" />
            <span>+92 996 850000</span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-neutral-900 text-white border-t border-neutral-800">
        <div className="container mx-auto px-4 flex gap-1 overflow-x-auto scrollbar-none py-1 text-sm font-semibold">
          {navItems.map((item) => {
            const isActive = currentCategory === item.value;
            return (
              <button
                key={item.value}
                onClick={() => onSelectCategory(item.value)}
                className={`px-3.5 py-2 rounded transition-colors whitespace-nowrap text-xs md:text-sm font-medium ${
                  isActive
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-neutral-200 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Breaking News Ticker */}
      <div className="bg-red-700 text-white text-xs md:text-sm flex items-center overflow-hidden border-t border-red-800">
        <div className="bg-black text-white px-3 md:px-4 py-1.5 font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0 z-10 shadow-md">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          Breaking News
        </div>
        <div className="overflow-hidden whitespace-nowrap w-full py-1.5 px-3">
          <div className="inline-flex gap-8 animate-marquee">
            {breakingNews.map((article) => (
              <span
                key={article.id}
                onClick={() => onArticleClick(article.id)}
                className="cursor-pointer hover:underline text-white font-medium mr-8"
              >
                🔴 <strong className="text-yellow-200">[{article.category}]</strong> {article.title} &bull; <span className="opacity-80 text-xs">({article.date})</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
