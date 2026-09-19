import React, { useState } from 'react';
import { X, PlusCircle, Image as ImageIcon, Calendar, Tag, FileText } from 'lucide-react';
import { Article } from '../data';

interface AdminPanelProps {
  onAddArticle: (article: Article) => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onAddArticle, onClose }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Shangla Local News');
  const [date, setDate] = useState('2026-08-20'); // Pre-set to last month or custom
  const [author, setAuthor] = useState('Junaid Khan');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('https://picsum.photos/600/400?random=' + Math.floor(Math.random() * 100));

  const categories = [
    'Shangla Local News',
    'Welfare Activities',
    'Emergency Relief',
    'Education',
    'Pakistan',
  ];

  const presetImages = [
    { label: 'Shangla Mountains & Valleys', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80' },
    { label: 'Relief & Humanitarian Aid', url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80' },
    { label: 'School & Education', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80' },
    { label: 'Roads & Infrastructure', url: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&auto=format&fit=crop&q=80' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newArticle: Article = {
      id: Date.now(),
      title: title.trim(),
      category,
      author: author.trim() || 'Junaid Khan',
      date: date || new Date().toISOString().split('T')[0],
      content: content.trim(),
      image: image.trim() || 'https://picsum.photos/600/400?random=30',
    };

    onAddArticle(newArticle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-neutral-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-neutral-900 text-white p-4 flex justify-between items-center border-b-4 border-red-600">
          <div className="flex items-center gap-2">
            <PlusCircle size={20} className="text-red-500" />
            <h2 className="text-lg font-bold">SNN Newsroom &bull; Publish Article</h2>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="font-bold text-neutral-800 block mb-1 flex items-center gap-1.5">
              <FileText size={14} className="text-red-600" />
              Article Headline / Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. SWDO Distributes Winter Kits in Alpuri Valleys"
              className="w-full border border-neutral-300 p-2.5 rounded-lg text-sm focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-neutral-800 block mb-1 flex items-center gap-1.5">
                <Tag size={14} className="text-red-600" />
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-neutral-300 p-2.5 rounded-lg text-xs focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none bg-white"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-neutral-800 block mb-1 flex items-center gap-1.5">
                <Calendar size={14} className="text-red-600" />
                Publish Date (Archive/Current)
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-neutral-300 p-2 rounded-lg text-xs focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none"
              />
              <span className="text-[10px] text-neutral-500 mt-0.5 block">
                Select August 2026 for last month archive.
              </span>
            </div>
          </div>

          <div>
            <label className="font-bold text-neutral-800 block mb-1">Author Byline</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Junaid Khan"
              className="w-full border border-neutral-300 p-2.5 rounded-lg text-xs focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-neutral-800 block mb-1 flex items-center gap-1.5">
              <ImageIcon size={14} className="text-red-600" />
              Featured Image URL
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full border border-neutral-300 p-2.5 rounded-lg text-xs focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none mb-1.5"
            />
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[10px] text-neutral-500 font-semibold self-center mr-1">Presets:</span>
              {presetImages.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImage(p.url)}
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[10px] px-2 py-0.5 rounded border"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-bold text-neutral-800 block mb-1">Full Article Content *</label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write the comprehensive report here..."
              className="w-full border border-neutral-300 p-2.5 rounded-lg text-xs focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none leading-relaxed"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-neutral-200 flex gap-3">
            <button
              type="submit"
              className="flex-grow bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-lg shadow transition-colors flex items-center justify-center gap-1.5 text-xs"
            >
              <PlusCircle size={15} />
              Publish to Website
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium py-2.5 px-4 rounded-lg transition-colors text-xs"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
