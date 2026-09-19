import React from 'react';
import { X, MapPin, Phone, Mail, Shield, Info, Send } from 'lucide-react';

interface InfoModalProps {
  type: 'about' | 'contact' | 'privacy' | null;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-neutral-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-neutral-900 text-white p-4 flex justify-between items-center border-b-4 border-red-600">
          <div className="flex items-center gap-2">
            {type === 'about' && <Info size={18} className="text-red-500" />}
            {type === 'contact' && <Phone size={18} className="text-red-500" />}
            {type === 'privacy' && <Shield size={18} className="text-red-500" />}
            <h3 className="font-bold text-base capitalize">
              {type === 'about' && 'About Shangla News Network (SNN)'}
              {type === 'contact' && 'Contact Newsroom & Bureau'}
              {type === 'privacy' && 'Privacy Policy & Terms'}
            </h3>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white p-1 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 text-sm text-neutral-700 leading-relaxed max-h-[75vh] overflow-y-auto">
          {type === 'about' && (
            <div className="space-y-4">
              <p>
                <strong>Shangla News Network (SNN)</strong> is an independent digital news and community reporting network founded to provide accurate, timely, and unbiased news across District Shangla, Khyber Pakhtunkhwa.
              </p>
              <h4 className="font-bold text-neutral-900 text-base">Our Core Mandate</h4>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-600">
                <li>Spotlighting grassroot welfare work by Shangla Welfare Development Organization (SWDO).</li>
                <li>Real-time disaster and flood relief reporting across Alpuri, Besham, Chakesar, and Puran.</li>
                <li>Documenting public education challenges, government school upgrades, and student achievements.</li>
                <li>Tracking road infrastructure, Karakoram Highway (KKH) connectivity, and Shangla Top pass safety.</li>
              </ul>
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs">
                <strong>Chief Correspondent:</strong> Junaid Khan &bull; Bureau Head: Alpuri, KPK.
              </div>
            </div>
          )}

          {type === 'contact' && (
            <div className="space-y-4">
              <p className="text-xs text-neutral-600">
                Have a breaking news tip, welfare emergency, or editorial query? Reach out directly to our bureau.
              </p>
              <div className="space-y-3 bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Bureau Address:</strong>
                    <p className="text-neutral-600">Alpuri, District Shangla, Khyber Pakhtunkhwa (KPK), Pakistan</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-red-600 shrink-0" />
                  <div>
                    <strong>Newsdesk Hotline:</strong>
                    <p className="text-neutral-600">+92 (0996) 850000 / Emergency: 1122</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-red-600 shrink-0" />
                  <div>
                    <strong>Email:</strong>
                    <p className="text-neutral-600">editor@shanglanews.pk / info@snn.com</p>
                  </div>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for reaching out! Your message has been dispatched to the SNN Alpuri Bureau.');
                  onClose();
                }}
                className="space-y-3 pt-2"
              >
                <input
                  type="text"
                  placeholder="Your Name / Organization"
                  className="w-full border border-neutral-300 p-2.5 rounded-lg text-xs outline-none focus:border-red-600"
                  required
                />
                <input
                  type="email"
                  placeholder="Email or WhatsApp Number"
                  className="w-full border border-neutral-300 p-2.5 rounded-lg text-xs outline-none focus:border-red-600"
                  required
                />
                <textarea
                  rows={3}
                  placeholder="Message or News Tip..."
                  className="w-full border border-neutral-300 p-2.5 rounded-lg text-xs outline-none focus:border-red-600"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Send size={14} /> Send to Newsdesk
                </button>
              </form>
            </div>
          )}

          {type === 'privacy' && (
            <div className="space-y-3 text-xs text-neutral-600">
              <p>
                <strong>Privacy Policy — Shangla News Network:</strong> We respect the confidentiality of our sources, correspondents, and visitors.
              </p>
              <p>
                Information provided to our reporting desk remains protected under journalistic ethics and privacy safeguards. We do not sell or disclose subscriber data.
              </p>
              <p>
                All photographic archives and news stories authored by Junaid Khan and the SNN editorial team are copyrighted © 2026 Shangla News Network.
              </p>
            </div>
          )}
        </div>

        <div className="p-4 bg-neutral-100 border-t border-neutral-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
