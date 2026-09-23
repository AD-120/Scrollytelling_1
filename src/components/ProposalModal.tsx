import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldAlert, Award, FileCheck } from 'lucide-react';
import { CallForProposal } from '../types';

interface ProposalModalProps {
  proposal: CallForProposal | null;
  onClose: () => void;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({ proposal, onClose }) => {
  if (!proposal) return null;

  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [pilotAbstract, setPilotAbstract] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactEmail) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAFAFA] border-2 border-[#111111] neo-shadow-lg max-w-2xl w-full flex flex-col overflow-hidden text-right">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#111111] bg-white p-4">
          <button
            onClick={onClose}
            className="p-1 border border-[#111111] bg-[#FAFAFA] hover:bg-neutral-200 transition-colors"
          >
            <X className="w-4 h-4 text-[#111111]" />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-data font-bold bg-[#2ECC71] text-black px-2 py-0.5 border border-[#111111]">
              {proposal.stage}
            </span>
            <span className="text-sm font-bold font-display text-[#111111]">
              קול קורא עירוני · רובע החדשנות
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 bg-white">
          <div>
            <span className="text-xs font-mono-data text-[#0055FF] font-semibold">
              תחום: {proposal.domain} · מועד הגשה: {proposal.deadline}
            </span>
            <h3 className="text-xl font-bold font-display text-[#111111] mt-1">
              {proposal.title}
            </h3>
            <p className="text-xs text-neutral-500 font-mono-data mt-0.5">
              גוף מוביל: {proposal.leadInstitution}
            </p>
          </div>

          <div className="p-4 border border-[#111111] bg-[#FAF8F2]">
            <span className="text-xs font-mono-data font-bold text-neutral-700 block mb-1">
              היקף התמיכה והתשתית המוענקת:
            </span>
            <div className="text-sm font-bold font-mono-data text-emerald-700">
              {proposal.budgetMatch}
            </div>
          </div>

          <div className="space-y-2 text-xs text-neutral-800 leading-relaxed font-sans">
            <h4 className="font-bold font-mono-data text-neutral-900">תיאור אתגר השטח:</h4>
            <p>{proposal.description}</p>
            <p>
              פיילוטים מאושרים ייהנו מפטור מלא מאגרות שילוט ובניה קלה, ליווי סטטוטורי צמוד של מהנדס העיר, וחיבור לתשתית המדידה והניטור של מעבדות אוניברסיטת בן-גוריון וסורוקה.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 border-2 border-[#2ECC71] bg-emerald-50 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#2ECC71] mx-auto" />
              <h4 className="text-base font-bold text-emerald-900">
                בקשת הבטא נרשמה בהצלחה!
              </h4>
              <p className="text-xs text-emerald-800 font-mono-data">
                מספר מעקב פיילוט: <strong>B7-BETA-{Math.floor(1000 + Math.random() * 9000)}</strong>
              </p>
              <p className="text-xs text-neutral-600">
                צוות המדע והרגולציה של מנהלת הרובע יחזור לכתובת {contactEmail} בתוך 3 ימי עסקים.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-4 py-1.5 bg-[#111111] text-white text-xs font-mono-data border border-[#111111]"
              >
                סיום וחזרה לפרזנטציה
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="border-t border-neutral-200 pt-4 space-y-3">
              <h4 className="text-xs font-bold font-mono-data text-[#111111]">
                טופס פנייה מוקדם למסלול הבטא המהיר (Fast-Track Beta Entry):
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono-data text-neutral-600 block mb-1">
                    שם החברה / מעבדת המחקר:
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="לדוגמה: SolShield Ltd."
                    className="w-full p-2 border border-[#111111] text-xs font-mono-data bg-neutral-50"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono-data text-neutral-600 block mb-1">
                    אימייל איש קשר טכנולוגי:
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="founder@startup.com"
                    className="w-full p-2 border border-[#111111] text-xs font-mono-data bg-neutral-50"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono-data text-neutral-600 block mb-1">
                  תקציר הטכנולוגיה והדרישה התשתיתית ברובע (גג, מדרכה, אבק, קרינה):
                </label>
                <textarea
                  rows={3}
                  value={pilotAbstract}
                  onChange={(e) => setPilotAbstract(e.target.value)}
                  placeholder="תארו בקצרה את המוצר ואיזה תנאי שטח אתם מבקשים לבחון בבאר שבע..."
                  className="w-full p-2 border border-[#111111] text-xs font-sans bg-neutral-50"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-[10px] font-mono-data text-neutral-500">
                  מענה רשמי תוך 21 יום במסלול הירוק
                </span>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#111111] text-white hover:bg-[#F39C12] hover:text-black border border-[#111111] text-xs font-mono-data font-bold flex items-center gap-1.5 transition-colors neo-shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>שליחת מועמדות לפיילוט</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
