import React from 'react';
import { Mail, Phone, MapPin, Facebook, Youtube, MessageCircle, Heart, Shield, Info } from 'lucide-react';

interface FooterProps {
  onOpenModal: (type: 'about' | 'contact' | 'privacy') => void;
  onSelectCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal, onSelectCategory }) => {
  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t-4 border-red-600 mt-16 text-xs">
      {/* Top Banner */}
      <div className="bg-neutral-900 border-b border-neutral-800 py-6 px-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="bg-red-700 text-white font-black text-xl px-2.5 py-1 rounded">SNN</span>
            <div>
              <h3 className="text-white font-bold text-base">Shangla News Network</h3>
              <p className="text-neutral-400 text-xs">Serving the communities of Alpuri, Besham, Chakesar & beyond</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-neutral-400">Connect with our newsroom:</span>
            <div className="flex gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="bg-neutral-800 hover:bg-blue-600 text-white p-2 rounded-full transition-colors"
                title="Facebook"
              >
                <Facebook size={15} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="bg-neutral-800 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                title="YouTube"
              >
                <Youtube size={15} />
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="bg-neutral-800 hover:bg-emerald-600 text-white p-2 rounded-full transition-colors"
                title="WhatsApp Channel"
              >
                <MessageCircle size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: About */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-2">
            About SNN
          </h4>
          <p className="text-neutral-400 leading-relaxed mb-4">
            Shangla News Network (SNN) is the premier independent digital news organization dedicated to highlighting the voices, development initiatives, welfare work, and emergency challenges facing District Shangla, Khyber Pakhtunkhwa.
          </p>
          <button
            onClick={() => onOpenModal('about')}
            className="text-red-400 hover:text-red-300 font-semibold flex items-center gap-1"
          >
            <Info size={13} /> Learn more about our mission
          </button>
        </div>

        {/* Column 2: Categories */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-2">
            Coverage Sectors
          </h4>
          <ul className="space-y-2 text-neutral-400">
            <li>
              <button onClick={() => onSelectCategory('Shangla Local News')} className="hover:text-white transition-colors">
                &bull; Shangla Local News
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('Welfare Activities')} className="hover:text-white transition-colors">
                &bull; Welfare Activities (SWDO)
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('Emergency Relief')} className="hover:text-white transition-colors">
                &bull; Emergency & Flood Relief
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('Education')} className="hover:text-white transition-colors">
                &bull; Education in Alpuri & Besham
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('August 2026')} className="hover:text-white text-red-400 font-semibold transition-colors">
                &bull; August 2026 Archive (Pechlay Month)
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('Pakistan')} className="hover:text-white transition-colors">
                &bull; Pakistan National News
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Quick Links & Policies */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-2">
            Legal & Support
          </h4>
          <ul className="space-y-2 text-neutral-400">
            <li>
              <button onClick={() => onOpenModal('contact')} className="hover:text-white transition-colors flex items-center gap-1.5">
                <Phone size={13} className="text-red-500" /> Contact Newsroom & Bureau
              </button>
            </li>
            <li>
              <button onClick={() => onOpenModal('about')} className="hover:text-white transition-colors flex items-center gap-1.5">
                <Info size={13} className="text-red-500" /> Editorial Guidelines
              </button>
            </li>
            <li>
              <button onClick={() => onOpenModal('privacy')} className="hover:text-white transition-colors flex items-center gap-1.5">
                <Shield size={13} className="text-red-500" /> Privacy Policy & Terms
              </button>
            </li>
            <li>
              <button onClick={() => onSelectCategory('Emergency Relief')} className="hover:text-white transition-colors flex items-center gap-1.5">
                <Heart size={13} className="text-red-500" /> Disaster Aid Reporting
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-2">
            Shangla Bureau Office
          </h4>
          <div className="space-y-3 text-neutral-400">
            <div className="flex items-start gap-2.5">
              <MapPin size={16} className="text-red-500 shrink-0 mt-0.5" />
              <span>Main Bazaar Alpuri, Near DC Office, District Shangla, Khyber Pakhtunkhwa, Pakistan</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={16} className="text-red-500 shrink-0" />
              <span>+92 (0996) 850000 / 850112</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={16} className="text-red-500 shrink-0" />
              <span>newsdesk@shanglanews.pk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-neutral-900 bg-black py-4 px-4 text-center text-neutral-500 text-[11px]">
        <div className="container mx-auto flex flex-wrap justify-between items-center gap-2">
          <span>&copy; 2026 Shangla News Network (SNN). All rights reserved.</span>
          <span>Lead Reporter & Editor: Junaid Khan &bull; Alpuri, Shangla</span>
        </div>
      </div>
    </footer>
  );
};
