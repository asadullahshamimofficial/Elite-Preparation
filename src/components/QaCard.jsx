import CollapsibleSection from './CollapsibleSection';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Bookmark, BookOpen, Scale, CheckSquare, ShieldCheck, Info, AlertTriangle, HelpCircle, Target, Flame, Heart } from 'lucide-react';

export default function QaCard({ q, isBookmarked, toggleBookmark, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className={`qa-card transition-all duration-300 ${isOpen ? 'shadow-xl ring-1 ring-amber-500/30' : 'hover:border-amber-500/40'}`} id={`q-${q.id}`}>
      {/* Clickable Header for Accordion Expand/Collapse */}
      <div
        className="qa-header cursor-pointer select-none pb-2"
        onClick={() => setIsOpen(!isOpen)}
        // title={isOpen ? "উত্তরপত্র লুকান" : "পূর্ণাঙ্গ উত্তরপত্র দেখতে ক্লিক করুন"}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
          <div className="flex justify-between items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="q-num-badge shrink-0">{q.questionNum}</div>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                ফিকহ প্রথম পত্র
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
            <div className="q-title q-title-bn font-bold text-base leading-relaxed text-slate-100">
              {q.questionBn}
            </div>
          )}
        </div>
      </div>

      {/* Accordion Expandable Answer Body */}
      {isOpen && (
        <div className="pt-4 border-t border-slate-800/80 space-y-4 animate-in fade-in duration-300">

      {/* Meaning / Definition */}
      {q.meaning && (
        <CollapsibleSection title="পরিচয় ও সংজ্ঞা (التاريخ والتعريف)" icon={BookOpen} borderColor="var(--accent-emerald)" defaultOpen={true}>
          {typeof q.meaning === 'string' ? (
            <p>{q.meaning}</p>
          ) : (
            <>
              {q.meaning.linguistic && <p><strong>আভিধানিক অর্থ:</strong> {q.meaning.linguistic}</p>}
              {q.meaning.shari && <p style={{ marginTop: '0.4rem' }}><strong>শরয়ী সংজ্ঞা: </strong> {q.meaning.author}  {q.meaning.shari}</p>}
              {q.meaning.author && <p><strong></strong></p>}
              {q.meaning.wali && <p style={{ marginTop: '0.4rem' }}><strong>ওলী (الولي)-র পরিচয়:</strong> {q.meaning.wali}</p>}
              {q.meaning.kufu && <p style={{ marginTop: '0.4rem' }}><strong>কুফু (الكفو)-র পরিচয়:</strong> {q.meaning.kufu}</p>}
            </>
          )}
        </CollapsibleSection>
      )}

      {/* Kufu Ruling */}
      {q.kufuRuling && (
        <CollapsibleSection title="বিবাহে কুফু (الكفو) এর শরয়ী হুকুম" icon={Scale} borderColor="var(--accent-cyan)" defaultOpen={true}>
          <p style={{ marginTop: '0.4rem' }}>{q.kufuRuling}</p>
        </CollapsibleSection>
      )}

      {/* Forced Marriage Opinions */}
      {q.forcedMarriageOpinions && (
        <CollapsibleSection title="অপ্রাপ্ত ও প্রাপ্তবয়স্ক নারীর বিবাহে ওলীর জবরদস্তির বিধান (৪ প্রকার)" icon={ShieldCheck} borderColor="var(--accent-ruby)" defaultOpen={true}>
          <div className="comparison-grid">
            {q.forcedMarriageOpinions.map((fm, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{fm.group}</div>
                <div className="scholar-verdict" style={{ marginTop: '0.4rem' }}>{fm.ruling}</div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      
      {/* Nikah Question 4 blocks */}
      {q.nikahRulingsDetailed && (
        <CollapsibleSection title="বিবাহের হুকুম (حكم النكاح) ও ইমামগণের মতভেদ" icon={Scale} borderColor="var(--accent-gold)" defaultOpen={true}>
          <div className="comparison-grid" style={{ marginTop: '0.4rem' }}>
            {q.nikahRulingsDetailed.map((r, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{r.scholar}: <span style={{color: 'var(--accent-ruby)'}}>{r.verdict}</span></div>
                <div className="scholar-verdict">{r.detail}</div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {q.nikahConditionsDetailed && (
        <CollapsibleSection title="বিবাহের শর্তাবলি (شروط النكاح)" icon={CheckSquare} borderColor="var(--accent-emerald)" defaultOpen={true}>
          <div style={{ marginTop: '0.5rem' }}>
            <strong>১. الشرط العام (সাধারণ শর্ত):</strong>
            <ul className="bullet-list" style={{ marginTop: '0.2rem', marginBottom: '1rem' }}>
              {q.nikahConditionsDetailed.general.map((cond, idx) => <li key={idx}>{cond}</li>)}
            </ul>
            <strong>২. الشرط الخاص (বিশেষ শর্ত):</strong>
            <ul className="bullet-list" style={{ marginTop: '0.2rem', marginBottom: '1rem' }}>
              <li>ক. সাক্ষীদ্বয়ের উপস্থিত থাকা। (ইমামদের মতভেদ নিচে)</li>
              {q.nikahConditionsDetailed.special.map((cond, idx) => <li key={idx}>{cond}</li>)}
            </ul>
            <strong>সাক্ষীর গুণ ও বৈশিষ্ট্য সম্পর্কে ইমামগণের মতভেদ:</strong>
            <div className="comparison-grid" style={{ marginTop: '0.4rem' }}>
              {q.nikahConditionsDetailed.witnessOpinions.map((w, idx) => (
                <div className="scholar-card" key={idx}>
                  <div className="scholar-name">{w.scholar}</div>
                  <div className="scholar-verdict">{w.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </CollapsibleSection>
      )}

      {q.nikahIllatDetailed && (
        <CollapsibleSection title="বিবাহের ইল্লত বা কারণ (علل النكاح)" icon={HelpCircle} borderColor="var(--accent-cyan)" defaultOpen={true}>
          <div className="comparison-grid" style={{ marginTop: '0.4rem' }}>
            {q.nikahIllatDetailed.map((i, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{i.name}</div>
                <div className="scholar-verdict">{i.desc}</div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {q.nikahPillarsDetailed && (
        <CollapsibleSection title="বিবাহের রোকন (أركان النكاح)" icon={Target} borderColor="var(--accent-gold)" defaultOpen={true}>
          <div className="comparison-grid" style={{ marginTop: '0.4rem' }}>
            {q.nikahPillarsDetailed.map((p, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{p.name}</div>
                <div className="scholar-verdict">{p.desc}</div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {q.nikahVsBayTwentyFourDetailed && (
        <CollapsibleSection title="নিকাহ ও বাই' (ক্রয়-বিক্রয়)-এর মাঝে পার্থক্য" icon={AlertTriangle} borderColor="var(--accent-ruby)" defaultOpen={true}>
          <div className="table-responsive" style={{ marginTop: '0.5rem' }}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>ক্রমিক</th>
                  <th>পার্থক্যের বিষয়</th>
                  <th>نِكَاح (বিবাহ)</th>
                  <th>بَيْع (ক্রয়-বিক্রয়)</th>
                </tr>
              </thead>
              <tbody>
                {q.nikahVsBayTwentyFourDetailed.map((diff, idx) => (
                  <tr key={idx}>
                    <td style={{ textAlign: 'center' }}>{diff.num}</td>
                    <td style={{ fontWeight: 'bold' }}>{diff.aspect}</td>
                    <td>{diff.nikah}</td>
                    <td>{diff.bay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CollapsibleSection>
      )}

      {q.validPhrasesDetailed && (
        <CollapsibleSection title="যে যে শব্দ দ্বারা নিকাশ বিশুদ্ধ হয় (অلفاظ يصح بها النكاح)" icon={CheckSquare} borderColor="var(--accent-emerald)" defaultOpen={true}>
          <div style={{ marginTop: '0.5rem' }}>
            <p style={{ marginBottom: '0.5rem' }}><strong>১. {q.validPhrasesDetailed.consensus}</strong></p>
            <p><strong>২. মতভেদপূর্ণ শব্দাবলি:</strong></p>
            <div className="comparison-grid" style={{ marginTop: '0.4rem', marginBottom: '0.4rem' }}>
              <div className="scholar-card">
                <div className="scholar-verdict">{q.validPhrasesDetailed.hanafi}</div>
              </div>
              <div className="scholar-card">
                <div className="scholar-verdict">{q.validPhrasesDetailed.shafi}</div>
                <div className="scholar-verdict" style={{ marginTop: '0.5rem', color: 'var(--accent-gold)' }}>{q.validPhrasesDetailed.ahnafReply}</div>
              </div>
            </div>
          </div>
        </CollapsibleSection>
      )}

      {q.invalidPhrasesDetailed && (
        <CollapsibleSection title="যে শব্দ দ্বারা নিকাশ বিশুদ্ধ হয় না (অلفاظ لا يصح بها النكاح)" icon={AlertTriangle} borderColor="var(--accent-ruby)" defaultOpen={true}>
          <p style={{ marginTop: '0.4rem' }}>{q.invalidPhrasesDetailed}</p>
        </CollapsibleSection>
      )}


      {/* Nikah Question 4 blocks */}
      {q.nikahRulingsDetailed && (
        <CollapsibleSection title="বিবাহের হুকুম (حكم النكاح) ও ইমামগণের মতভেদ" icon={Scale} borderColor="var(--accent-gold)" defaultOpen={true}>
          <div className="comparison-grid" style={{ marginTop: '0.4rem' }}>
            {q.nikahRulingsDetailed.map((r, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{r.scholar}: <span style={{color: 'var(--accent-ruby)'}}>{r.verdict}</span></div>
                <div className="scholar-verdict">{r.detail}</div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {q.nikahConditionsDetailed && (
        <CollapsibleSection title="বিবাহের শর্তাবলি (شروط النكاح)" icon={CheckSquare} borderColor="var(--accent-emerald)" defaultOpen={true}>
          <div style={{ marginTop: '0.5rem' }}>
            <strong>১. الشرط العام (সাধারণ শর্ত):</strong>
            <ul className="bullet-list" style={{ marginTop: '0.2rem', marginBottom: '1rem' }}>
              {q.nikahConditionsDetailed.general.map((cond, idx) => <li key={idx}>{cond}</li>)}
            </ul>
            <strong>২. الشرط الخاص (বিশেষ শর্ত):</strong>
            <ul className="bullet-list" style={{ marginTop: '0.2rem', marginBottom: '1rem' }}>
              <li>ক. সাক্ষীদ্বয়ের উপস্থিত থাকা। (ইমামদের মতভেদ নিচে)</li>
              {q.nikahConditionsDetailed.special.map((cond, idx) => <li key={idx}>{cond}</li>)}
            </ul>
            <strong>সাক্ষীর গুণ ও বৈশিষ্ট্য সম্পর্কে ইমামগণের মতভেদ:</strong>
            <div className="comparison-grid" style={{ marginTop: '0.4rem' }}>
              {q.nikahConditionsDetailed.witnessOpinions.map((w, idx) => (
                <div className="scholar-card" key={idx}>
                  <div className="scholar-name">{w.scholar}</div>
                  <div className="scholar-verdict">{w.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </CollapsibleSection>
      )}

      {q.nikahIllatDetailed && (
        <CollapsibleSection title="বিবাহের ইল্লত বা কারণ (علل النكاح)" icon={HelpCircle} borderColor="var(--accent-cyan)" defaultOpen={true}>
          <div className="comparison-grid" style={{ marginTop: '0.4rem' }}>
            {q.nikahIllatDetailed.map((i, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{i.name}</div>
                <div className="scholar-verdict">{i.desc}</div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {q.nikahPillarsDetailed && (
        <CollapsibleSection title="বিবাহের রোকন (أركان النكاح)" icon={Target} borderColor="var(--accent-gold)" defaultOpen={true}>
          <div className="comparison-grid" style={{ marginTop: '0.4rem' }}>
            {q.nikahPillarsDetailed.map((p, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{p.name}</div>
                <div className="scholar-verdict">{p.desc}</div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {q.nikahVsBayTwentyFourDetailed && (
        <CollapsibleSection title="নিকাহ ও বাই' (ক্রয়-বিক্রয়)-এর মাঝে পার্থক্য" icon={AlertTriangle} borderColor="var(--accent-ruby)" defaultOpen={true}>
          <div className="table-responsive" style={{ marginTop: '0.5rem' }}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>ক্রমিক</th>
                  <th>পার্থক্যের বিষয়</th>
                  <th>نِكَاح (বিবাহ)</th>
                  <th>بَيْع (ক্রয়-বিক্রয়)</th>
                </tr>
              </thead>
              <tbody>
                {q.nikahVsBayTwentyFourDetailed.map((diff, idx) => (
                  <tr key={idx}>
                    <td style={{ textAlign: 'center' }}>{diff.num}</td>
                    <td style={{ fontWeight: 'bold' }}>{diff.aspect}</td>
                    <td>{diff.nikah}</td>
                    <td>{diff.bay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CollapsibleSection>
      )}

      {q.validPhrasesDetailed && (
        <CollapsibleSection title="যে যে শব্দ দ্বারা নিকাশ বিশুদ্ধ হয় (অلفاظ يصح بها النكاح)" icon={CheckSquare} borderColor="var(--accent-emerald)" defaultOpen={true}>
          <div style={{ marginTop: '0.5rem' }}>
            <p style={{ marginBottom: '0.5rem' }}><strong>১. {q.validPhrasesDetailed.consensus}</strong></p>
            <p><strong>২. মতভেদপূর্ণ শব্দাবলি:</strong></p>
            <div className="comparison-grid" style={{ marginTop: '0.4rem', marginBottom: '0.4rem' }}>
              <div className="scholar-card">
                <div className="scholar-verdict">{q.validPhrasesDetailed.hanafi}</div>
              </div>
              <div className="scholar-card">
                <div className="scholar-verdict">{q.validPhrasesDetailed.shafi}</div>
                <div className="scholar-verdict" style={{ marginTop: '0.5rem', color: 'var(--accent-gold)' }}>{q.validPhrasesDetailed.ahnafReply}</div>
              </div>
            </div>
          </div>
        </CollapsibleSection>
      )}

      {q.invalidPhrasesDetailed && (
        <CollapsibleSection title="যে শব্দ দ্বারা নিকাশ বিশুদ্ধ হয় না (অلفاظ لا يصح بها النكاح)" icon={AlertTriangle} borderColor="var(--accent-ruby)" defaultOpen={true}>
          <p style={{ marginTop: '0.4rem' }}>{q.invalidPhrasesDetailed}</p>
        </CollapsibleSection>
      )}

{/* Talaq Categories */}
      {q.talaqCategories && (
        <CollapsibleSection title="তালাকের প্রকারভেদ (أنواع الطلاق)" icon={BookOpen} borderColor="var(--accent-cyan)" defaultOpen={true}>

          {q.talaqCategories.byAttribute && (
            <div style={{ marginBottom: '1rem' }}>
              <strong style={{ color: 'var(--accent-emerald)' }}>ক. সিফাত বা গুণের দিক থেকে (৩ প্রকার):</strong>
              <div className="comparison-grid" style={{ marginTop: '0.4rem' }}>
                {q.talaqCategories.byAttribute.map((type, idx) => (
                  <div className="scholar-card" key={idx}>
                    <div className="scholar-name">{type.name}</div>
                    <div className="scholar-verdict">{type.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {q.talaqCategories.byRuling && (
            <div style={{ marginBottom: '1rem' }}>
              <strong style={{ color: 'var(--accent-gold)' }}>খ. হুকুম বা বিধানের দিক থেকে (৩ প্রকার):</strong>
              <div className="comparison-grid" style={{ marginTop: '0.4rem' }}>
                {q.talaqCategories.byRuling.map((type, idx) => (
                  <div className="scholar-card" key={idx}>
                    <div className="scholar-name">{type.name}</div>
                    <div className="scholar-verdict">{type.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {q.talaqCategories.byWords && (
            <div>
              <strong style={{ color: 'var(--accent-ruby)' }}>গ. শব্দ প্রয়োগের দিক থেকে (২ প্রকার):</strong>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.4rem' }}>
                {q.talaqCategories.byWords.map((type, idx) => (
                  <div className="scholar-card" key={idx} style={{ borderLeft: idx === 0 ? '3px solid var(--accent-emerald)' : '3px solid var(--accent-gold)' }}>
                    <div className="scholar-name" style={{ fontSize: '1.05rem', color: idx === 0 ? 'var(--accent-emerald)' : 'var(--accent-gold)' }}>
                      {idx + 1}. {type.category}
                    </div>
                    <p style={{ marginTop: '0.3rem', marginBottom: '0.5rem' }}><strong>সংজ্ঞা:</strong> {type.definition}</p>
                    
                    {type.wordsAndRulings && (
                      <div className="comparison-grid">
                        {type.wordsAndRulings.map((wr, wIdx) => (
                          <div key={wIdx} style={{ background: 'var(--bg-secondary)', padding: '0.5rem', borderRadius: '4px' }}>
                            <div style={{ fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '0.2rem' }}>{wr.scholar || wr.category}:</div>
                            <div style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}><strong>শব্দ:</strong> {wr.words}</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--accent-gold)' }}><strong>বিধান:</strong> {wr.ruling}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {type.specialRule && (
                      <div style={{ marginTop: '0.5rem', background: 'rgba(212, 175, 55, 0.1)', padding: '0.4rem', borderRadius: '4px', borderLeft: '2px solid var(--accent-ruby)', fontSize: '0.9rem' }}>
                        {type.specialRule}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CollapsibleSection>
      )}

      {/* Zihar Rulings Detailed */}
      {q.ziharRulingsDetailed && (
        <CollapsibleSection title="যিহার (الظهار)-এর শরয়ী বিধান (ফকীহগণের ৪টি অভিমত)" icon={Scale} borderColor="var(--accent-ruby)" defaultOpen={true}>
          <div className="comparison-grid">
            {q.ziharRulingsDetailed.map((zr, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{zr.scholar}</div>
                <div className="scholar-verdict">{zr.detail}</div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Zihar Establishment Methods & Conditions */}
      {q.ziharEstablishmentMethods && (
        <CollapsibleSection title="যিহার সাব্যস্ত হওয়ার ৩ শর্তাবলী ও ১১টি শরয়ী পদ্ধতি" icon={CheckSquare} borderColor="var(--accent-cyan)" defaultOpen={true}>
          <strong>১. যিহার সাব্যস্ত হওয়ার ৩ শর্তাবলী:</strong>
          <ul className="bullet-list" style={{ marginTop: '0.3rem', marginBottom: '0.6rem' }}>
            {q.ziharEstablishmentMethods.conditions.map((c, idx) => (
              <li key={idx}>{c}</li>
            ))}
          </ul>
          <strong style={{ color: 'var(--accent-gold)' }}>২. ১১টি পদ্ধতিতে যিহার সাব্যস্ত হওয়া:</strong>
          <ul className="bullet-list" style={{ marginTop: '0.3rem' }}>
            {q.ziharEstablishmentMethods.methods.map((m, idx) => (
              <li key={idx}>{m}</li>
            ))}
          </ul>
        </CollapsibleSection>
      )}

      {/* Kaffarah Detailed */}
      {q.kaffarahDetailed && (
        <CollapsibleSection title="যিহারের কাফফারা (كفارة الظهار) - কুরআন, হাদীস ও ফুকাহাদের মতভেদ" icon={ShieldCheck} borderColor="var(--accent-gold)" defaultOpen={true}>
          <p style={{ background: 'var(--bg-secondary)', padding: '0.6rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.6rem' }}>
            <strong>দলীল (কুরআন ও হাদীস):</strong> {q.kaffarahDetailed.proof}
          </p>
          <div className="comparison-grid">
            {q.kaffarahDetailed.steps.map((st, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{st.step}</div>
                <div className="scholar-verdict">{st.detail}</div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Jihad 5 Rulings Detailed */}
      {q.jihadFiveRulingsDetailed && (
        <CollapsibleSection title="জিহাদের (الجهاد) ৫টি শরয়ী বিধান ও কুরআন-হাদীসের দলীল" icon={Scale} borderColor="var(--accent-cyan)" defaultOpen={true}>
          <div className="comparison-grid">
            {q.jihadFiveRulingsDetailed.map((j, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{j.scholar}</div>
                <div className="scholar-verdict">{j.detail}</div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Jihad On Whom Obligatory / Not Obligatory */}
      {q.jihadOnWhomObligatory && (
        <CollapsibleSection title="যার ওপর জিহাদ ফরয ও যার ওপর ফরয নয়" icon={CheckSquare} borderColor="var(--accent-emerald)" defaultOpen={true}>
          <div className="comparison-grid">
            <div className="scholar-card">
              <div className="scholar-name" style={{ color: 'var(--accent-emerald)' }}>যাদের ওপর ফরয (৮টি শর্ত):</div>
              <ul className="bullet-list" style={{ marginTop: '0.3rem' }}>
                {q.jihadOnWhomObligatory.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="scholar-card">
              <div className="scholar-name" style={{ color: 'var(--accent-ruby)' }}>যাদের ওপর ফরয নয় (৮ শ্রেণি):</div>
              <ul className="bullet-list" style={{ marginTop: '0.3rem' }}>
                {q.jihadOnWhomNotObligatory.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </CollapsibleSection>
      )}

      {/* Jihad in Current Era Detailed & Hadith Explanation */}
      {q.jihadInCurrentEraDetailed && (
        <CollapsibleSection title="বর্তমান যুগে জিহাদের বিধান ও 'الجهاد ماض إلى يوم القيامة' হাদীসের ৩টি মূল ব্যাখ্যা" icon={Info} borderColor="var(--accent-gold)" defaultOpen={true}>
          <p><strong>১. বর্তমান যুগের হুকুম:</strong> {q.jihadInCurrentEraDetailed}</p>
          {q.hadithMaadinDetailedExplanation && (
            <div style={{ marginTop: '0.66rem', background: 'var(--bg-secondary)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
              <strong style={{ color: 'var(--accent-gold)' }}>২. 'الجهاد ماض إلى يوم القيامة' হাদীসের ৩টি মূল তত্ত্ব:</strong>
              <ul className="bullet-list" style={{ marginTop: '0.3rem' }}>
                {q.hadithMaadinDetailedExplanation.map((exp, idx) => (
                  <li key={idx}>{exp}</li>
                ))}
              </ul>
            </div>
          )}
        </CollapsibleSection>
      )}

      {/* 5 Financial Terms Detailed */}
      {q.fiveTermsDetailed && (
        <CollapsibleSection title="ফায়, গনীমত, জিজিয়া, জুয়াল ও খরাজের শরয়ী সংজ্ঞা (مصطلحات مالية)" icon={BookOpen} borderColor="var(--accent-gold)" defaultOpen={true}>
          <div className="comparison-grid">
            {q.fiveTermsDetailed.map((term, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{term.name}</div>
                <div className="scholar-verdict" style={{ color: 'var(--accent-gold)' }}>আভিধানিক অর্থ: {term.ling}</div>
                <div className="scholar-proof" style={{ marginTop: '0.2rem', fontStyle: 'normal' }}><strong>শরয়ী সংজ্ঞা:</strong> {term.shari}</div>
              </div>
            ))}
          </div>
          {q.termsDifferenceExplanation && (
            <p style={{ marginTop: '0.66rem', background: 'var(--bg-secondary)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
              <strong>৫টি পরিভাষার মধ্যকার পার্থক্য:</strong> {q.termsDifferenceExplanation}
            </p>
          )}
        </CollapsibleSection>
      )}

      {/* Jizyah Obligatory Conditions & Exemptions */}
      {q.jizyahObligatoryConditions && (
        <CollapsibleSection title="জিজিয়া (الجزية) কার ওপর ওয়াজিব ও কার ওপর নয়" icon={ShieldCheck} borderColor="var(--accent-cyan)" defaultOpen={true}>
          <div className="comparison-grid">
            <div className="scholar-card">
              <div className="scholar-name" style={{ color: 'var(--accent-emerald)' }}>জিজিয়া ওয়াজিবের ৭টি শর্ত:</div>
              <ul className="bullet-list" style={{ marginTop: '0.3rem' }}>
                {q.jizyahObligatoryConditions.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="scholar-card">
              <div className="scholar-name" style={{ color: 'var(--accent-ruby)' }}>যাদের ওপর জিজিয়া ওয়াজিব নয় (১০ শ্রেণি):</div>
              <ul className="bullet-list" style={{ marginTop: '0.3rem' }}>
                {q.jizyahExemptions.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </CollapsibleSection>
      )}

      {/* Ghanimah One Fifth Four Opinions */}
      {q.ghanimahOneFifthFourOpinions && (
        <CollapsibleSection title="গনীমতের এক-পঞ্চমাংশ (খুমুস) বণ্টনে ইমামদের ৪টি মতামত" icon={Scale} borderColor="var(--accent-gold)" defaultOpen={true}>
          <div className="comparison-grid">
            {q.ghanimahOneFifthFourOpinions.map((gOp, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{gOp.scholar}</div>
                <div className="scholar-verdict">{gOp.detail}</div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Ghanimah Four Fifth Opinions & Abu Hanifah Rationale */}
      {q.ghanimahFourFifthOpinions && (
        <CollapsibleSection title="মুজাহিদদের মাঝে গনীমতের ৪/৫ ভাগ বণ্টন ও ইমামদের মতভেদ" icon={Scale} borderColor="var(--accent-cyan)" defaultOpen={true}>
          <div className="comparison-grid">
            {q.ghanimahFourFifthOpinions.map((ff, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{ff.scholar}</div>
                <div className="scholar-verdict" style={{ color: 'var(--accent-gold)' }}>বণ্টন: {ff.verdict}</div>
                <div className="scholar-proof" style={{ fontStyle: 'normal', marginTop: '0.2rem' }}>দলীল: {ff.proof}</div>
              </div>
            ))}
          </div>
          {q.abuHanifahPreferenceRationale && (
            <p style={{ marginTop: '0.66rem', background: 'rgba(212, 175, 55, 0.1)', padding: '0.6rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent-gold)' }}>
              <strong style={{ color: 'var(--accent-gold)' }}>হানাফী মাযহাবের গ্রহণযোগ্যতার কারণ:</strong> {q.abuHanifahPreferenceRationale}
            </p>
          )}
        </CollapsibleSection>
      )}

      {/* Cavalry vs Infantry Opinions & Radz'a */}
      {q.cavalryInfantryOpinions && (
        <CollapsibleSection title="পদাতিক ও অশ্বারোহী নির্ধারণের সময়কাল ও 'রযঅ' (رضع)-এর বিধান" icon={Info} borderColor="var(--accent-emerald)" defaultOpen={true}>
          <div className="comparison-grid" style={{ marginBottom: '0.6rem' }}>
            {q.cavalryInfantryOpinions.map((ci, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{ci.scholar}</div>
                <div className="scholar-verdict">{ci.detail}</div>
              </div>
            ))}
          </div>
          {q.radzaDefinition && (
            <p style={{ background: 'var(--bg-secondary)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
              <strong>রযঅ (رضع)-এর সংজ্ঞা:</strong> {q.radzaDefinition}
            </p>
          )}
        </CollapsibleSection>
      )}

      {/* Hunting: Is Restricted To Dog */}
      {q.isRestrictedToDogExplanation && (
        <CollapsibleSection title="শিকার কি কেবল কুকুরের মাঝেই সীমাবদ্ধ?" icon={Target} borderColor="var(--accent-cyan)" defaultOpen={true}>
          <p>{q.isRestrictedToDogExplanation}</p>
        </CollapsibleSection>
      )}

      {/* Trained Animal 14 Conditions */}
      {q.trainedAnimalFourteenConditions && (
        <CollapsibleSection title="প্রশিক্ষিত প্রাণী দ্বারা শিকারের ১৪টি শরয়ী শর্তাবলী" icon={CheckSquare} borderColor="var(--accent-emerald)" defaultOpen={true}>
          <ul className="bullet-list">
            {q.trainedAnimalFourteenConditions.map((cond, idx) => (
              <li key={idx}>{cond}</li>
            ))}
          </ul>
        </CollapsibleSection>
      )}

      {/* Trained Dog 12 Conditions */}
      {q.trainedDogTwelveConditions && (
        <CollapsibleSection title="প্রশিক্ষিত কুকুরের ১২টি শরয়ী শর্তাবলী (আল্লামা কিরমানী র. এর ৪টিসহ)" icon={ShieldCheck} borderColor="var(--accent-gold)" defaultOpen={true}>
          <ul className="bullet-list">
            {q.trainedDogTwelveConditions.map((dCond, idx) => (
              <li key={idx}>{dCond}</li>
            ))}
          </ul>
        </CollapsibleSection>
      )}

      {/* Alive Game Ruling Detailed */}
      {q.aliveGameRulingDetailed && (
        <CollapsibleSection title="শিকারকৃত প্রাণী জীবিত পেলে তার শরয়ী ৭টি বিধান (শরহে বেকায়াহ)" icon={Info} borderColor="var(--accent-gold)" defaultOpen={true}>
          <p>{q.aliveGameRulingDetailed}</p>
        </CollapsibleSection>
      )}

      {/* Gunshot Rulings 6 Views */}
      {q.gunshotRulingsSixViews && (
        <CollapsibleSection title="বন্দুক ও আধুনিক অস্ত্রের শিকারের শরয়ী বিধান (আলেমদের ৬টি দৃষ্টিভঙ্গি)" icon={Scale} borderColor="var(--accent-gold)" defaultOpen={true}>
          <ul className="bullet-list">
            {q.gunshotRulingsSixViews.map((gView, idx) => (
              <li key={idx}>{gView}</li>
            ))}
          </ul>
        </CollapsibleSection>
      )}

      {/* Three Categories Hunting Conditions */}
      {q.threeCategoriesHuntingConditions && (
        <CollapsibleSection title="শিকার (صيد) হালাল হওয়ার ৩টি প্রধান ক্যাটাগরির শর্তাবলী" icon={CheckSquare} borderColor="var(--accent-cyan)" defaultOpen={true}>
          <div className="comparison-grid">
            <div className="scholar-card">
              <div className="scholar-name" style={{ color: 'var(--accent-gold)' }}>১. প্রেরণকারীর শর্তাবলী (৬টি):</div>
              <ul className="bullet-list" style={{ marginTop: '0.3rem' }}>
                {q.threeCategoriesHuntingConditions.senderConditions.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="scholar-card">
              <div className="scholar-name" style={{ color: 'var(--accent-emerald)' }}>২. শিকারী প্রাণীর শর্তাবলী (৫টি):</div>
              <ul className="bullet-list" style={{ marginTop: '0.3rem' }}>
                {q.threeCategoriesHuntingConditions.animalConditions.map((a, idx) => (
                  <li key={idx}>{a}</li>
                ))}
              </ul>
            </div>
            <div className="scholar-card" style={{ gridColumn: '1 / -1' }}>
              <div className="scholar-name" style={{ color: 'var(--accent-cyan)' }}>৩. শিকার পশুর শর্তাবলী (৪টি):</div>
              <ul className="bullet-list" style={{ marginTop: '0.3rem' }}>
                {q.threeCategoriesHuntingConditions.gameConditions.map((g, idx) => (
                  <li key={idx}>{g}</li>
                ))}
              </ul>
            </div>
          </div>
        </CollapsibleSection>
      )}

      {/* Slaughter Two Types */}
      {q.slaughterTwoTypes && (
        <CollapsibleSection title="যবাইয়ের ২ প্রকার (الذبح الاضطراري ও الذبح الاختياري)" icon={Flame} borderColor="var(--accent-ruby)" defaultOpen={true}>
          <div className="comparison-grid">
            {q.slaughterTwoTypes.map((st, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{st.name}</div>
                <div className="scholar-verdict">{st.desc}</div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Slaughter Permissible & Impermissible Tools */}
      {q.slaughterPermissibleTools && (
        <CollapsibleSection title="যেসব বস্তু দ্বারা যবাই বৈধ এবং যেসব বস্তু দ্বারা বৈধ নয়" icon={CheckSquare} borderColor="var(--accent-emerald)" defaultOpen={true}>
          <strong>১. যা দ্বারা যবাই বৈধ:</strong>
          <ul className="bullet-list" style={{ marginTop: '0.3rem', marginBottom: '0.6rem' }}>
            {q.slaughterPermissibleTools.map((tool, idx) => (
              <li key={idx}>{tool}</li>
            ))}
          </ul>
          {q.slaughterImpermissibleTools && (
            <div>
              <strong style={{ color: 'var(--accent-ruby)' }}>২. যা দ্বারা যবাই বৈধ নয় (দাঁত ও নখের মতভেদ):</strong>
              <ul className="bullet-list" style={{ marginTop: '0.3rem' }}>
                {q.slaughterImpermissibleTools.map((itool, idx) => (
                  <li key={idx}>{itool}</li>
                ))}
              </ul>
            </div>
          )}
        </CollapsibleSection>
      )}

      {/* Slaughter Mustahab & Makruh Rules */}
      {q.slaughterMustahabRules && (
        <CollapsibleSection title="যবাইয়ের ৯টি মুস্তাহাব ও ১১টি মাকরূহ কার্যাাবলী" icon={Info} borderColor="var(--accent-gold)" defaultOpen={true}>
          <div className="comparison-grid">
            <div className="scholar-card">
              <div className="scholar-name" style={{ color: 'var(--accent-emerald)' }}>যবাইয়ের ৯টি মুস্তাহাব কাজ:</div>
              <ul className="bullet-list" style={{ marginTop: '0.3rem' }}>
                {q.slaughterMustahabRules.map((m, idx) => (
                  <li key={idx}>{m}</li>
                ))}
              </ul>
            </div>
            <div className="scholar-card">
              <div className="scholar-name" style={{ color: 'var(--accent-ruby)' }}>যবাইয়ের ১১টি মাকরূহ কাজ:</div>
              <ul className="bullet-list" style={{ marginTop: '0.3rem' }}>
                {q.slaughterMakruhRules.map((mk, idx) => (
                  <li key={idx}>{mk}</li>
                ))}
              </ul>
            </div>
          </div>
        </CollapsibleSection>
      )}

      {/* Mad Person, Pagan, Magian Slaughter */}
      {q.madPersonSlaughter && (
        <CollapsibleSection title="পাগল, মূর্তিপূজক ও অগ্নিপূজক ব্যক্তির যবাইয়ের শরয়ী বিধান" icon={Scale} borderColor="var(--accent-cyan)" defaultOpen={true}>
          <strong>১. পাগল ব্যক্তির (مجنون) যবাই:</strong>
          <div className="comparison-grid" style={{ marginTop: '0.3rem', marginBottom: '0.6rem' }}>
            {q.madPersonSlaughter.map((mp, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{mp.scholar}</div>
                <div className="scholar-verdict">{mp.detail}</div>
              </div>
            ))}
          </div>
          {q.paganAndMagianSlaughter && (
            <p style={{ background: 'var(--bg-secondary)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
              <strong>২. মূর্তিপূজক ও অগ্নিপূজকের যবাই:</strong> {q.paganAndMagianSlaughter}
            </p>
          )}
        </CollapsibleSection>
      )}

      {/* Bismillah Omission Rulings */}
      {q.bismillahOmissionDetailed && (
        <CollapsibleSection title="বিসমিল্লাহ (تسمية) বর্জনকারীর যবাইয়ের শরয়ী বিধান (৩টি অবস্থা)" icon={HelpCircle} borderColor="var(--accent-gold)" defaultOpen={true}>
          <div className="comparison-grid">
            {q.bismillahOmissionDetailed.map((b, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{b.category}</div>
                <div className="scholar-verdict">{b.detail}</div>
              </div>
            ))}
          </div>
          {q.bismillahShafiAnswer && (
            <p style={{ marginTop: '0.66rem', background: 'var(--bg-secondary)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
              <strong>ইমাম শাফেয়ীর দলীলের হানাফী জবাব:</strong> {q.bismillahShafiAnswer}
            </p>
          )}
        </CollapsibleSection>
      )}

      {/* Veins List & Opinions */}
      {q.veinsListDetailed && (
        <CollapsibleSection title="যবাইয়ের ৪টি রগের পরিচয় ও ইমামদের মতভেদ" icon={ShieldCheck} borderColor="var(--accent-emerald)" defaultOpen={true}>
          <ul className="bullet-list" style={{ marginBottom: '0.6rem' }}>
            {q.veinsListDetailed.map((v, idx) => (
              <li key={idx}>{v}</li>
            ))}
          </ul>
          {q.veinsOpinions && (
            <p style={{ background: 'var(--bg-secondary)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
              <strong>রগ কর্তনে ইমামদের মতভেদ:</strong> {q.veinsOpinions}
            </p>
          )}
        </CollapsibleSection>
      )}

      {/* Fetus in Slaughtered Mother */}
      {q.fetusInSlaughteredMother && (
        <CollapsibleSection title="যবাইকৃত পশুর গর্ভস্থ বাচ্চার (الجنين) বিধান ও দলীলের জবাব" icon={Scale} borderColor="var(--accent-ruby)" defaultOpen={true}>
          <p><strong>১. বাচ্চা জীবিত পাওয়া গেলে:</strong> {q.fetusInSlaughteredMother.alive}</p>
          <strong style={{ display: 'block', marginTop: '0.6rem' }}>২. বাচ্চা মৃত পাওয়া গেলে ইমামদের মতভেদ:</strong>
          <div className="comparison-grid" style={{ marginTop: '0.3rem', marginBottom: '0.6rem' }}>
            {q.fetusInSlaughteredMother.deadOpinions.map((dOp, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{dOp.scholar}</div>
                <div className="scholar-verdict" style={{ color: 'var(--accent-gold)' }}>বিধান: {dOp.verdict}</div>
                <div className="scholar-proof" style={{ fontStyle: 'normal', marginTop: '0.2rem' }}>{dOp.detail}</div>
              </div>
            ))}
          </div>
          {q.fetusInSlaughteredMother.shafiReplies && (
            <div style={{ background: 'var(--bg-secondary)', padding: '0.65rem', borderRadius: 'var(--radius-sm)' }}>
              <strong style={{ color: 'var(--accent-gold)' }}>ইমাম শাফেয়ীর ৫টি দলীলের হানাফী জবাব:</strong>
              <ul className="bullet-list" style={{ marginTop: '0.3rem' }}>
                {q.fetusInSlaughteredMother.shafiReplies.map((reply, idx) => (
                  <li key={idx}>{reply}</li>
                ))}
              </ul>
            </div>
          )}
        </CollapsibleSection>
      )}

      {/* Qurbani Conditions & Obligatory Time */}
      {q.qurbaniConditions && (
        <CollapsibleSection title="কোরবানি কার ওপর ও কখন ওয়াজিব" icon={CheckSquare} borderColor="var(--accent-emerald)" defaultOpen={true}>
          <strong>কোরবানি ওয়াজিব হওয়ার ৫টি শর্ত:</strong>
          <ul className="bullet-list" style={{ marginTop: '0.3rem', marginBottom: '0.6rem' }}>
            {q.qurbaniConditions.map((cond, idx) => (
              <li key={idx}>{cond}</li>
            ))}
          </ul>
          {q.qurbaniTimeObligatory && (
            <p style={{ background: 'var(--bg-secondary)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
              <strong>কোরবানি ওয়াজিব হওয়ার সময়:</strong> {q.qurbaniTimeObligatory}
            </p>
          )}
        </CollapsibleSection>
      )}

      {/* Qurbani Ruling Opinions */}
      {q.qurbaniRulingOpinions && (
        <CollapsibleSection title="কোরবানির শরয়ী হুকুম সম্পর্কে ফকীহদের দৃষ্টিভঙ্গি" icon={Scale} borderColor="var(--accent-cyan)" defaultOpen={true}>
          <div className="comparison-grid">
            {q.qurbaniRulingOpinions.map((item, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{item.scholar}</div>
                <div className="scholar-verdict" style={{ color: 'var(--accent-gold)' }}>বিধান: {item.verdict}</div>
                <div className="scholar-proof" style={{ fontStyle: 'normal', marginTop: '0.3rem' }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* 15 Meat Rules */}
      {q.fifteenMeatRules && (
        <CollapsibleSection title="কোরবানির গোশতের ১৫টি শরয়ী বিধান (حكم لحم الأضحية)" icon={Heart} borderColor="var(--accent-gold)" defaultOpen={true}>
          <ul className="bullet-list">
            {q.fifteenMeatRules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
        </CollapsibleSection>
      )}

      {/* 8 Skin Rules */}
      {q.eightSkinRules && (
        <CollapsibleSection title="কোরবানির চামড়ার ৮টি শরয়ী বিধান (حكم جلد الأضحية)" icon={ShieldCheck} borderColor="var(--accent-gold)" defaultOpen={true}>
          <ul className="bullet-list">
            {q.eightSkinRules.map((sRule, idx) => (
              <li key={idx}>{sRule}</li>
            ))}
          </ul>
        </CollapsibleSection>
      )}

      {/* Defective Animals Detailed */}
      {q.defectiveAnimalsDetailed && (
        <CollapsibleSection title="ত্রুটিযুক্ত চতুষ্পদ পশুর কোরবানির শরয়ী বিধান" icon={AlertTriangle} borderColor="var(--accent-ruby)" defaultOpen={true}>
          <ul className="bullet-list">
            {q.defectiveAnimalsDetailed.map((def, idx) => (
              <li key={idx}>{def}</li>
            ))}
          </ul>
        </CollapsibleSection>
      )}

      {/* Stolen & Trust Animal Rulings */}
      {q.stolenAnimalRuling && (
        <CollapsibleSection title="আত্মসাৎকৃত ও আমানতকৃত পশুর কোরবানির শরয়ী মাসআলা" icon={Scale} borderColor="var(--accent-ruby)" defaultOpen={true}>
          <p><strong>১. আত্মসাৎকৃত পশুর কোরবানি:</strong> {q.stolenAnimalRuling}</p>
          {q.trustAnimalRuling && (
            <p style={{ marginTop: '0.6rem' }}><strong>২. আমানতকৃত পশুর কোরবানি:</strong> {q.trustAnimalRuling}</p>
          )}
        </CollapsibleSection>
      )}

      {/* Mistaken Slaughter Ruling */}
      {q.mistakenSlaughterRuling && (
        <CollapsibleSection title="ভুলক্রমে পরস্পরের পশুর যবাইকরণ (ইস্তিহসান বনাম কিয়াস)" icon={HelpCircle} borderColor="var(--accent-cyan)" defaultOpen={true}>
          <p style={{ marginBottom: '0.5rem' }}><strong>বিষয়:</strong> {q.mistakenSlaughterRuling.topic}</p>
          <div className="comparison-grid">
            <div className="scholar-card">
              <div className="scholar-name" style={{ color: 'var(--accent-gold)' }}>ইমাম আবু হানীফা ও জমহুর (ইস্তিহসান):</div>
              <div className="scholar-verdict" style={{ marginTop: '0.3rem' }}>{q.mistakenSlaughterRuling.hannahAndJumhur}</div>
            </div>
            <div className="scholar-card">
              <div className="scholar-name" style={{ color: 'var(--accent-ruby)' }}>ইমাম যুফার (কিয়াস):</div>
              <div className="scholar-verdict" style={{ marginTop: '0.3rem' }}>{q.mistakenSlaughterRuling.zfarOpinion}</div>
            </div>
          </div>
          {q.mistakenSlaughterRuling.counterReply && (
            <p style={{ marginTop: '0.66rem', background: 'var(--bg-secondary)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
              <strong>জমহুরের সিদ্ধান্ত:</strong> {q.mistakenSlaughterRuling.counterReply}
            </p>
          )}
        </CollapsibleSection>
      )}

      {/* Hajj Akbar Opinions */}
      {q.hajjAkbar && (
        <CollapsibleSection title="الحج الأكبر (হজ্জে আকবর)-এর উদ্দেশ্য সম্পর্কিত মতামত" icon={Info} borderColor="var(--accent-gold)" defaultOpen={true}>
          <div className="comparison-grid">
            {q.hajjAkbar.map((item, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{item.opinion}</div>
                <div className="scholar-verdict">{item.detail}</div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Fard Conditions */}
      {q.fardConditions && (
        <CollapsibleSection title="হজ্জ কার ওপর ফরয হওয়ার শর্তাবলি" icon={CheckSquare} borderColor="var(--accent-emerald)" defaultOpen={true}>
          <ul className="bullet-list">
            {q.fardConditions.map((cond, idx) => (
              <li key={idx}>{cond}</li>
            ))}
          </ul>
        </CollapsibleSection>
      )}

      {/* Imams Difference Matrix */}
      {q.imamsDifference && (
        <CollapsibleSection title="আইম্মায়ে কিরামের মতভেদ: {q.imamsDifference.topic}" icon={Scale} borderColor="var(--accent-cyan)" defaultOpen={true}>
          <div className="comparison-grid">
            {q.imamsDifference.opinions.map((op, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{op.scholar}</div>
                <div className="scholar-verdict">{op.verdict}</div>
                <div className="scholar-proof">দলীল: {op.proof}</div>
              </div>
            ))}
          </div>

          {q.imamsDifference.counterReply && (
            <div style={{ marginTop: '0.85rem', padding: '0.75rem', background: 'rgba(212, 175, 55, 0.1)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent-gold)' }}>
              <strong style={{ color: 'var(--accent-gold)' }}>দলীলের প্রত্যুত্তর (হানাফী মাযহাব): </strong>
              <span style={{ fontSize: '0.95rem' }}>{q.imamsDifference.counterReply}</span>
            </div>
          )}

          {q.imamsDifference.madarExteleq && (
            <div style={{ marginTop: '0.65rem', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
              <strong style={{ color: 'var(--accent-cyan)' }}>মতভেদের ভিত্তি (শরহে বেকায়াহর ব্যাখ্যা): </strong>
              <p style={{ fontSize: '0.95rem', marginTop: '0.2rem' }}>{q.imamsDifference.madarExteleq}</p>
            </div>
          )}

          {q.imamsDifference.outcomes && (
            <div style={{ marginTop: '0.65rem' }}>
              <strong style={{ color: 'var(--accent-emerald)' }}>মতভেদের ফলাফল:</strong>
              <ul className="bullet-list" style={{ marginTop: '0.3rem' }}>
                {q.imamsDifference.outcomes.map((out, idx) => (
                  <li key={idx}>{out}</li>
                ))}
              </ul>
            </div>
          )}
        </CollapsibleSection>
      )}

      {/* Fard List */}
      {q.fardList && (
        <CollapsibleSection title="হজ্জের ফরযসমূহ (فرائض الحج)" icon={ShieldCheck} borderColor="var(--accent-gold)" defaultOpen={true}>
          <div className="comparison-grid">
            {q.fardList.map((fard, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{fard.num}. {fard.name}</div>
                <div className="scholar-verdict">{fard.desc}</div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Wajib List */}
      {q.wajibList && (
        <CollapsibleSection title="হজ্জের ওয়াজিবসমূহ (واجبات الحج)" icon={CheckSquare} borderColor="var(--accent-emerald)" defaultOpen={true}>
          <ul className="bullet-list">
            {q.wajibList.map((wajib, idx) => (
              <li key={idx}>{wajib}</li>
            ))}
          </ul>
        </CollapsibleSection>
      )}

      {/* Miqat List */}
      {q.miqatList && (
        <CollapsibleSection title="হজ্জ ও ওমরার মীকাতসমূহ (مواقيت الحج)" icon={Info} borderColor="var(--accent-cyan)" defaultOpen={true}>
          <div className="comparison-grid">
            {q.miqatList.map((m, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name" style={{ fontFamily: 'var(--font-ar)' }}>{m.name}</div>
                <div className="scholar-verdict">{m.location}</div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Hajj Types */}
      {q.hajjTypes && (
        <CollapsibleSection title="হজ্জের প্রকারভেদ (أنواع الحج)" icon={BookOpen} borderColor="var(--accent-emerald)" defaultOpen={true}>
          <div className="comparison-grid">
            {q.hajjTypes.map((ht, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{ht.type}</div>
                <div className="scholar-verdict">{ht.desc}</div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Hajj Types / Best Comparison */}
      {q.bestHajjComparison && (
        <CollapsibleSection title="সর্বোত্তম হজ্জ সম্পর্কিত আইম্মায়ে ফুকাহাদের মতামত ও দলীল" icon={Scale} borderColor="var(--accent-gold)" defaultOpen={true}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {q.bestHajjComparison.map((item, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{item.scholar}</div>
                <div className="scholar-verdict" style={{ color: 'var(--accent-gold)' }}>সর্বোত্তম মাযহাব: {item.best}</div>
                <div className="scholar-proof" style={{ marginTop: '0.3rem', fontStyle: 'normal' }}><strong>দলীল:</strong> {item.proof}</div>
                {item.counter && (
                  <div style={{ marginTop: '0.4rem', fontSize: '0.88rem', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '4px', borderLeft: '2px solid var(--accent-emerald)' }}>
                    <strong style={{ color: 'var(--accent-emerald)' }}>হানাফীদের জবাব: </strong>{item.counter}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Qiran Superiority Reasons */}
      {q.qiranSuperiorityReasons && (
        <CollapsibleSection title="হজ্জে ক্বেরান (الحج القران) উত্তম হওয়ার মূল তত্ত্বসমূহ" icon={ShieldCheck} borderColor="var(--accent-emerald)" defaultOpen={true}>
          <ul className="bullet-list">
            {q.qiranSuperiorityReasons.map((reason, idx) => (
              <li key={idx}>{reason}</li>
            ))}
          </ul>
        </CollapsibleSection>
      )}

      {/* Ihsar Section */}
      {q.ihsar && (
        <CollapsibleSection title="ইহসার (الإحصار) - এর পরিচয় ও বিস্তারিত শরয়ী বিধান" icon={AlertTriangle} borderColor="var(--accent-ruby)" defaultOpen={true}>
          <p><strong>সংজ্ঞা:</strong> {q.ihsar.definition}</p>

          {q.ihsar.rulings && (
            <div style={{ marginTop: '0.75rem' }}>
              <strong>ইহসারের শরয়ী বিধানসমূহ:</strong>
              <ul className="bullet-list" style={{ marginTop: '0.3rem' }}>
                {q.ihsar.rulings.map((r, idx) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </div>
          )}

          {q.ihsar.basisOfIhsar && (
            <p style={{ marginTop: '0.65rem', background: 'var(--bg-secondary)', padding: '0.6rem', borderRadius: 'var(--radius-sm)' }}>
              <strong>ইহসার বিবেচ্য হওয়ার ভিত্তি:</strong> {q.ihsar.basisOfIhsar}
            </p>
          )}
        </CollapsibleSection>
      )}

      {/* 19 Differences Table */}
      {q.nineteenDifferences && (
        <CollapsibleSection title="হজ্জ ও ওমরার মধ্যকার ১৯টি মৌলিক পার্থক্য (الفروق بين الحج والعمرة)" icon={Scale} borderColor="var(--accent-gold)" defaultOpen={true}>
          <div style={{ overflowX: 'auto', marginTop: '0.75rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary)', borderBottom: '2px solid var(--card-border)' }}>
                  <th style={{ padding: '0.7rem', textAlign: 'center', width: '50px' }}>নং</th>
                  <th style={{ padding: '0.7rem', textAlign: 'left', width: '160px' }}>পার্থক্য বিষয়</th>
                  <th style={{ padding: '0.7rem', textAlign: 'left', color: 'var(--accent-gold)' }}>হজ্জ (الحج)</th>
                  <th style={{ padding: '0.7rem', textAlign: 'left', color: 'var(--accent-emerald)' }}>ওমরা (العمرة)</th>
                </tr>
              </thead>
              <tbody>
                {q.nineteenDifferences.map((d, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--card-border)', background: idx % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.15)' }}>
                    <td style={{ padding: '0.6rem', textAlign: 'center', fontWeight: 700, color: 'var(--accent-gold)' }}>{d.num}</td>
                    <td style={{ padding: '0.6rem', fontWeight: 700 }}>{d.aspect}</td>
                    <td style={{ padding: '0.6rem' }}>{d.hajj}</td>
                    <td style={{ padding: '0.6rem' }}>{d.umrah}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CollapsibleSection>
      )}

      {/* Kaffarah */}
      {q.kaffarah && (
        <CollapsibleSection title="যিহারের কাফফারা (كفارة الظهار)" icon={ShieldCheck} borderColor="var(--accent-ruby)" defaultOpen={true}>
          <ul className="bullet-list">
            {q.kaffarah.map((k, idx) => (
              <li key={idx}>{k}</li>
            ))}
          </ul>
        </CollapsibleSection>
      )}

      {/* Defects Rulings */}
      {q.defectsRulings && (
        <CollapsibleSection title="ত্রুটিযুক্ত পশুর কোরবানির শরয়ী বিধান" icon={Info} borderColor="var(--accent-gold)" defaultOpen={true}>
          <ul className="bullet-list">
            {q.defectsRulings.map((def, idx) => (
              <li key={idx}>{def}</li>
            ))}
          </ul>
        </CollapsibleSection>
      )}
        </div>
      )}
    </div>
  );
}
