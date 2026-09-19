import React from 'react';
import { Search, TrendingUp, ThumbsUp, Share2, PhoneCall, CloudSun, ExternalLink, Calendar } from 'lucide-react';
import { Article } from '../data';

interface SidebarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  popularArticles: Article[];
  onArticleClick: (id: number) => void;
  selectedMonthFilter: string;
  onMonthFilterChange: (month: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  searchQuery,
  onSearchChange,
  popularArticles,
  onArticleClick,
  selectedMonthFilter,
  onMonthFilterChange,
}) => {
  return (
    <aside className="space-y-6">
      {/* Search Widget */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
        <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Search size={16} className="text-red-600" />
          Search News
        </h3>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Shangla, SWDO, floods, education..."
            className="w-full border border-neutral-300 pl-9 pr-8 py-2 text-sm rounded-lg focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 bg-neutral-50"
          />
          <Search className="absolute left-3 top-2.5 text-neutral-400" size={16} />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-2.5 text-xs text-neutral-400 hover:text-neutral-700"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Month Filter Widget (Highlighting Pechlay Month - August 2026) */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
        <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Calendar size={16} className="text-red-600" />
          Browse by Date / Month
        </h3>
        <div className="grid grid-cols-1 gap-2 text-xs">
          <button
            onClick={() => onMonthFilterChange('all')}
            className={`px-3 py-2 text-left rounded-md font-medium transition-colors flex justify-between items-center ${
              selectedMonthFilter === 'all'
                ? 'bg-red-600 text-white'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
            }`}
          >
            <span>All Articles (Sab Khabrein)</span>
            <span className="text-[10px] opacity-80">23 Stories</span>
          </button>
          <button
            onClick={() => onMonthFilterChange('2026-09')}
            className={`px-3 py-2 text-left rounded-md font-medium transition-colors flex justify-between items-center ${
              selectedMonthFilter === '2026-09'
                ? 'bg-red-600 text-white'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
            }`}
          >
            <span>This Month (September 2026)</span>
            <span className="text-[10px] opacity-80">13 Stories</span>
          </button>
          <button
            onClick={() => onMonthFilterChange('2026-08')}
            className={`px-3 py-2 text-left rounded-md font-medium transition-colors flex justify-between items-center ${
              selectedMonthFilter === '2026-08'
                ? 'bg-red-600 text-white'
                : 'bg-red-50 hover:bg-red-100 text-red-900 border border-red-200'
            }`}
          >
            <span className="font-bold">Last Month (August 2026 Archive)</span>
            <span className="bg-red-700 text-white text-[10px] px-1.5 py-0.5 rounded">10 Stories</span>
          </button>
        </div>
      </div>

      {/* Shangla Weather Widget */}
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white p-4 rounded-xl border border-neutral-700 shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="text-xs text-neutral-400 font-semibold uppercase">Weather Watch</div>
            <div className="text-lg font-bold">Alpuri, Shangla</div>
          </div>
          <CloudSun className="text-amber-400" size={28} />
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-black">21°C</span>
          <span className="text-xs text-neutral-300">Partly Cloudy &bull; Hum: 58%</span>
        </div>
        <div className="text-[11px] text-neutral-400 border-t border-neutral-700/70 pt-2">
          Shangla Top Pass: Road open & clear for regular transit.
        </div>
      </div>

      {/* Popular News Widget */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
        <div className="border-b-2 border-red-600 pb-2 mb-3 flex items-center justify-between">
          <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wide flex items-center gap-1.5">
            <TrendingUp size={16} className="text-red-600" />
            Most Popular
          </h3>
          <span className="text-[11px] text-neutral-400">Trending</span>
        </div>

        <div className="space-y-3">
          {popularArticles.slice(0, 5).map((article, index) => (
            <div
              key={article.id}
              onClick={() => onArticleClick(article.id)}
              className="group flex items-start gap-2.5 cursor-pointer pb-2.5 border-b border-neutral-100 last:border-b-0 last:pb-0"
            >
              <span className="text-base font-black text-red-600 w-5 shrink-0">
                {index + 1}
              </span>
              <div className="min-w-0">
                <span className="text-[10px] text-neutral-500 font-bold uppercase block mb-0.5">
                  {article.category}
                </span>
                <h4 className="text-xs font-semibold text-neutral-800 line-clamp-2 leading-snug group-hover:text-red-700 transition-colors">
                  {article.title}
                </h4>
                <span className="text-[10px] text-neutral-400 mt-1 block">
                  {article.date} &bull; {article.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Facebook Page Embed Widget */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
        <div className="border-b border-neutral-200 pb-2 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-1 rounded">
              <ThumbsUp size={14} />
            </div>
            <div>
              <h4 className="font-bold text-xs text-neutral-900">Shangla News Network</h4>
              <p className="text-[10px] text-neutral-500">Official Facebook Page</p>
            </div>
          </div>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="text-[11px] bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold px-2 py-1 rounded flex items-center gap-1"
          >
            Follow <ExternalLink size={10} />
          </a>
        </div>

        {/* Embed Frame Simulation */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 text-xs">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-red-700 text-white flex items-center justify-center font-bold text-xs">
              SNN
            </div>
            <div>
              <div className="font-semibold text-neutral-900">Shangla News Network (SNN)</div>
              <div className="text-[10px] text-neutral-500">124K Followers &bull; News & Media</div>
            </div>
          </div>
          <p className="text-[11px] text-neutral-700 mb-3 line-clamp-3">
            Stay connected with real-time reporting from Alpuri, Besham, Chakesar, Martung, and all tehsils of District Shangla.
          </p>
          <div className="bg-white border border-neutral-200 p-2 rounded text-[11px] text-neutral-600 flex justify-between items-center">
            <span>Recent post: Relief package dispatch from Alpuri</span>
            <span className="text-[10px] text-neutral-400">2h ago</span>
          </div>
        </div>
      </div>

      {/* District Shangla Emergency Relief Helpline */}
      <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-neutral-900">
        <h4 className="font-bold text-xs text-red-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <PhoneCall size={14} className="text-red-700" />
          SWDO & Emergency Aid Desk
        </h4>
        <p className="text-xs text-neutral-600 mb-3">
          For flood relief, urgent medical transport, and emergency welfare assistance in District Shangla:
        </p>
        <div className="bg-white p-2.5 rounded-lg border border-red-200 font-mono text-xs font-bold text-red-700 flex justify-between items-center">
          <span>Helpline:</span>
          <span>0996-850112 / 1122</span>
        </div>
      </div>
    </aside>
  );
};
