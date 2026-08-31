import React, { useState } from 'react';
import { Bookmark, BookOpen, Layers, ChevronDown, Sparkles } from 'lucide-react';
import CollapsibleSection from './CollapsibleSection';

export default function BalaghatQaCard({ q, isBookmarked, toggleBookmark, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`qa-card transition-all duration-300 ${isOpen ? 'shadow-xl ring-1 ring-amber-500/30' : 'hover:border-amber-500/40'}`} id={`q-${q.id}`}>
      
      {/* Clickable Header for Main Card Accordion */}
      <div
        className="qa-header cursor-pointer select-none pb-2"
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "উত্তরপত্র লুকান" : "পূর্ণাঙ্গ উত্তরপত্র দেখতে ক্লিক করুন"}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
          <div className="flex justify-between items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="q-num-badge shrink-0">{q.id}</div>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
              {q.chapterId === 'balaghat' ? 'বালাগাত পর্ব (البلاغة)' : 'মানতিক পর্ব (المنطق)'}
            </span>
            </div>
            {/* Right Actions: Bookmark + Accordion Arrow */}
            <div className="flex items-center gap-2 shrink-0 ml-2" onClick={(e) => e.stopPropagation()}>
              <button
                className="btn-icon"
                onClick={() => toggleBookmark(q.id)}
                title={isBookmarked ? "সংরক্ষণ মুক্ত করুন" : "সংরক্ষণ করুন"}
                style={{ color: isBookmarked ? 'var(--accent-gold)' : 'var(--text-muted)' }}
              >
                <Bookmark size={20} fill={isBookmarked ? 'var(--accent-gold)' : 'none'} />
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                  isOpen ? 'bg-amber-500 text-black rotate-180' : 'bg-slate-800 text-amber-400 hover:bg-slate-700'
                }`}
                title={isOpen ? "বন্ধ করুন" : "খুলুন"}
              >
                <ChevronDown size={18} />
              </button>
            </div>
          </div>

          {q.questionAr && (
            <div className="q-title q-title-ar text-right font-serif text-lg leading-relaxed">
              {q.questionAr}
            </div>
          )}

          {q.questionBn && (
            <div className="q-title q-title-bn font-bold text-base leading-relaxed text-slate-100 flex items-start justify-between gap-2">
              <span>({q.id}) {q.questionBn}</span>
            </div>
          )}

          {/* Alternative Questions */}
          {q.alternativesBn && q.alternativesBn.length > 0 && (
            <div className="space-y-1.5 pt-1">
              {q.alternativesBn.map((alt, aIdx) => (
                <div key={aIdx} className="text-xs text-amber-300/90 font-medium bg-amber-500/5 p-2 rounded-lg border border-amber-500/15">
                  {alt}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Accordion Expandable Answer Body */}
      {isOpen && (
        <div className="pt-4 border-t border-slate-800/80 space-y-4 animate-in fade-in duration-300">
          
          {/* Main Definition / Meaning Collapsible Block */}
          {(q.meaningBn || q.definitionBn) && (
            <CollapsibleSection
              title="পরিচয় ও সংজ্ঞা (التعريف والمفهوم)"
              icon={BookOpen}
              borderColor="var(--accent-emerald)"
              defaultOpen={true}
            >
              <div className="text-sm leading-relaxed">
                {/* আভিধানিক অর্থ */}
                {q.meaningBn && (
                  <p>
                    <strong className="text-amber-400">আভিধানিক অর্থ:</strong>{' '}
                    {q.meaningBn}
                    {q.meaningAr && (
                      <span className="font-serif text-amber-300/80 mr-1"> ({q.meaningAr})</span>
                    )}
                  </p>
                )}

                {/* পারিভাষিক সংজ্ঞা — user's requested format */}
                {q.definitionBn && (
                  <div className="">
                    <p className="leading-7">
                      <strong className="text-emerald-400">পারিভাষিক সংজ্ঞা:</strong>{' '}
                      {q.bookRef && (
                        <span className="font-bold text-amber-300">{q.bookRef} প্রণেতা বলেন,</span>
                      )}{' '}
                      {q.definitionAr && (
                        <span
                          className="font-serif text-amber-200 text-[15px] leading-8 mx-1"
                          dir="rtl"
                        >
                          &ldquo;{q.definitionAr}&rdquo;
                        </span>
                      )}{' '}
                      {q.definitionBn && (
                        <span className="text-slate-200">
                          অর্থ্যাৎ, {q.definitionBn}
                        </span>
                      )}
                    </p>
                  </div>
                )}

                {/* উদাহরণ */}
                {q.example && (
                  <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700 text-xs">
                    <strong className="text-amber-400">উদাহরণ: </strong> {q.example}
                  </div>
                )}
              </div>
            </CollapsibleSection>
          )}

          {/* Structured Sections — Each as Collapsible Accordion Block */}
          {q.sections && q.sections.map((sec, sIdx) => (
            <CollapsibleSection
              key={sIdx}
              title={sec.title}
              titleAr={sec.titleAr}
              icon={Layers}
              borderColor={sIdx % 2 === 0 ? 'var(--accent-gold)' : 'var(--accent-cyan)'}
              defaultOpen={true}
            >
              {/* Direct Section Definitions */}
              {(sec.definitionBn || sec.definitionAr) && (
                <div className="text-sm space-y-2 mb-3 leading-7">
                  <p>
                    {sec.bookRef && (
                      <span className="font-bold text-amber-300">{sec.bookRef} প্রণেতা বলেন, </span>
                    )}
                    {sec.definitionAr && (
                      <span className="font-serif text-amber-200 text-[15px] leading-8 mx-1" dir="rtl">
                        &ldquo;{sec.definitionAr}&rdquo;
                      </span>
                    )}{' '}
                    {sec.definitionBn && (
                      <span className="text-slate-200">
                        {(sec.bookRef || sec.definitionAr) ? 'অর্থ্যাৎ, ' : ''}{sec.definitionBn}
                      </span>
                    )}
                  </p>
                  {sec.example && (
                    <p className="text-xs text-slate-300 bg-slate-800/60 p-2 rounded-lg border border-slate-700">
                      <strong className="text-amber-400">উদাহরণ:</strong> {sec.example}
                    </p>
                  )}
                  {sec.explanation && (
                    <p className="text-xs text-slate-400 italic">{sec.explanation}</p>
                  )}
                </div>
              )}

              {/* Points List */}
              {sec.points && sec.points.length > 0 && (
                <ul className="bullet-list text-sm space-y-1.5">
                  {sec.points.map((pt, pIdx) => (
                    <li key={pIdx} className="leading-relaxed">
                      {pt}
                    </li>
                  ))}
                </ul>
              )}

              {/* Subsections Cards */}
              {sec.subsections && sec.subsections.length > 0 && (
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  {sec.subsections.map((sub, subIdx) => {
                    // Extract title without parentheses and extract linguistic meaning if enclosed in (...)
                    let titleDisplay = sub.nameBn;
                    let linguisticMeaning = sub.meaningBn;

                    const match = sub.nameBn ? sub.nameBn.match(/^(.*?)\s*\((.*?)\)$/) : null;
                    if (match) {
                      titleDisplay = match[1].trim();
                      if (!linguisticMeaning) {
                        linguisticMeaning = match[2].trim();
                      }
                    }

                    return (
                      <div key={subIdx} className="scholar-card bg-slate-900/80 border border-slate-700/60 p-3.5 rounded-xl space-y-2.5">
                        {/* Name Row Header */}
                        <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                          <span className="scholar-name font-bold text-amber-400 text-sm">{titleDisplay}</span>
                          {sub.nameAr && <span className="font-serif text-xs text-amber-300/80" dir="rtl">{sub.nameAr}</span>}
                        </div>

                        {/* আভিধানিক অর্থ (যদি থাকে) */}
                        {linguisticMeaning && (
                          <p className="text-xs text-slate-300 leading-relaxed">
                            <strong className="text-amber-400">আভিধানিক অর্থ:</strong> {linguisticMeaning}
                          </p>
                        )}

                        {/* পারিভাষিক সংজ্ঞা */}
                        {(sub.definitionBn || sub.definitionAr) && (
                          <p className="text-xs leading-6 text-slate-200">
                            <strong className="text-emerald-400">পারিভাষিক সংজ্ঞা:</strong>{' '}
                            {sub.bookRef && (
                              <span className="font-bold text-amber-300">{sub.bookRef} প্রণেতা বলেন, </span>
                            )}
                            {sub.definitionAr && (
                              <span className="font-serif text-amber-200 text-[13px] leading-7" dir="rtl">
                                &ldquo;{sub.definitionAr}&rdquo;{' '}
                              </span>
                            )}
                            {sub.definitionBn && (
                              <span>অর্থ্যাৎ, {sub.definitionBn}</span>
                            )}
                          </p>
                        )}

                        {/* উদাহরণ */}
                        {sub.example && (
                          <div className="text-[11px] bg-slate-800 p-2 rounded text-slate-300 border border-slate-700/50">
                            <strong className="text-amber-400">উদাহরণ: </strong> {sub.example}
                          </div>
                        )}

                        {/* পয়েন্ট তালিকা (যদি থাকে) */}
                        {sub.points && (
                          <ul className="text-xs space-y-1 text-slate-300 pt-1">
                            {sub.points.map((p, i) => (
                              <li key={i}>• {p}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CollapsibleSection>
          ))}

        </div>
      )}

    </div>
  );
}
