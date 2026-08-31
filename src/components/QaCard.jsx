import React from 'react';
import { Bookmark, BookOpen, Scale, CheckSquare, ShieldCheck, Info, AlertTriangle, HelpCircle, Target, Flame, Heart } from 'lucide-react';

export default function QaCard({ q, isBookmarked, toggleBookmark }) {
  return (
    <div className="qa-card" id={`q-${q.id}`}>
      <div className="qa-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="q-num-badge">{q.questionNum}</div>
          <div>
            <div className="q-title-bn">{q.questionBn}</div>
          </div>
        </div>
        <button
          className="btn-icon"
          onClick={() => toggleBookmark(q.id)}
          title={isBookmarked ? "সংরক্ষণ মুক্ত করুন" : "সংরক্ষণ করুন"}
          style={{ color: isBookmarked ? 'var(--accent-gold)' : 'var(--text-muted)' }}
        >
          <Bookmark size={20} fill={isBookmarked ? 'var(--accent-gold)' : 'none'} />
        </button>
      </div>

      {/* Arabic Question text */}
      {q.questionAr && (
        <div className="q-title-ar">
          {q.questionAr}
        </div>
      )}

      {/* Meaning / Definition */}
      {q.meaning && (
        <div className="section-block">
          <div className="section-title">
            <BookOpen size={18} />
            <span>পরিচয় ও সংজ্ঞা (التاريخ والتعريف)</span>
          </div>
          {typeof q.meaning === 'string' ? (
            <p>{q.meaning}</p>
          ) : (
            <>
              {q.meaning.linguistic && <p><strong>আভিধানিক অর্থ:</strong> {q.meaning.linguistic}</p>}
              {q.meaning.shari && <p style={{ marginTop: '0.4rem' }}><strong>শরয়ী সংজ্ঞা:</strong> {q.meaning.shari}</p>}
              {q.meaning.wali && <p style={{ marginTop: '0.4rem' }}><strong>ওলী (الولي)-র পরিচয়:</strong> {q.meaning.wali}</p>}
              {q.meaning.kufu && <p style={{ marginTop: '0.4rem' }}><strong>কুফু (الكفو)-র পরিচয়:</strong> {q.meaning.kufu}</p>}
            </>
          )}
        </div>
      )}

      {/* Zihar Rulings Detailed */}
      {q.ziharRulingsDetailed && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-ruby)' }}>
          <div className="section-title" style={{ color: 'var(--accent-ruby)' }}>
            <Scale size={18} />
            <span>যিহার (الظهار)-এর শরয়ী বিধান (ফকীহগণের ৪টি অভিমত)</span>
          </div>
          <div className="comparison-grid">
            {q.ziharRulingsDetailed.map((zr, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{zr.scholar}</div>
                <div className="scholar-verdict">{zr.detail}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Zihar Establishment Methods & Conditions */}
      {q.ziharEstablishmentMethods && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-cyan)' }}>
          <div className="section-title" style={{ color: 'var(--accent-cyan)' }}>
            <CheckSquare size={18} />
            <span>যিহার সাব্যস্ত হওয়ার ৩ শর্তাবলী ও ১১টি শরয়ী পদ্ধতি</span>
          </div>
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
        </div>
      )}

      {/* Kaffarah Detailed */}
      {q.kaffarahDetailed && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-gold)' }}>
          <div className="section-title" style={{ color: 'var(--accent-gold)' }}>
            <ShieldCheck size={18} />
            <span>যিহারের কাফফারা (كفارة الظهار) - কুরআন, হাদীস ও ফুকাহাদের মতভেদ</span>
          </div>
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
        </div>
      )}

      {/* Jihad 5 Rulings Detailed */}
      {q.jihadFiveRulingsDetailed && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-cyan)' }}>
          <div className="section-title" style={{ color: 'var(--accent-cyan)' }}>
            <Scale size={18} />
            <span>জিহাদের (الجهاد) ৫টি শরয়ী বিধান ও কুরআন-হাদীসের দলীল</span>
          </div>
          <div className="comparison-grid">
            {q.jihadFiveRulingsDetailed.map((j, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{j.scholar}</div>
                <div className="scholar-verdict">{j.detail}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Jihad On Whom Obligatory / Not Obligatory */}
      {q.jihadOnWhomObligatory && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-emerald)' }}>
          <div className="section-title">
            <CheckSquare size={18} />
            <span>যার ওপর জিহাদ ফরয ও যার ওপর ফরয নয়</span>
          </div>
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
        </div>
      )}

      {/* Jihad in Current Era Detailed & Hadith Explanation */}
      {q.jihadInCurrentEraDetailed && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-gold)' }}>
          <div className="section-title" style={{ color: 'var(--accent-gold)' }}>
            <Info size={18} />
            <span>বর্তমান যুগে জিহাদের বিধান ও 'الجهاد ماض إلى يوم القيامة' হাদীসের ৩টি মূল ব্যাখ্যা</span>
          </div>
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
        </div>
      )}

      {/* 5 Financial Terms Detailed */}
      {q.fiveTermsDetailed && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-gold)' }}>
          <div className="section-title" style={{ color: 'var(--accent-gold)' }}>
            <BookOpen size={18} />
            <span>ফায়, গনীমত, জিজিয়া, জুয়াল ও খরাজের শরয়ী সংজ্ঞা (مصطلحات مالية)</span>
          </div>
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
        </div>
      )}

      {/* Jizyah Obligatory Conditions & Exemptions */}
      {q.jizyahObligatoryConditions && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-cyan)' }}>
          <div className="section-title" style={{ color: 'var(--accent-cyan)' }}>
            <ShieldCheck size={18} />
            <span>জিজিয়া (الجزية) কার ওপর ওয়াজিব ও কার ওপর নয়</span>
          </div>
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
        </div>
      )}

      {/* Ghanimah One Fifth Four Opinions */}
      {q.ghanimahOneFifthFourOpinions && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-gold)' }}>
          <div className="section-title" style={{ color: 'var(--accent-gold)' }}>
            <Scale size={18} />
            <span>গনীমতের এক-পঞ্চমাংশ (খুমুস) বণ্টনে ইমামদের ৪টি মতামত</span>
          </div>
          <div className="comparison-grid">
            {q.ghanimahOneFifthFourOpinions.map((gOp, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{gOp.scholar}</div>
                <div className="scholar-verdict">{gOp.detail}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ghanimah Four Fifth Opinions & Abu Hanifah Rationale */}
      {q.ghanimahFourFifthOpinions && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-cyan)' }}>
          <div className="section-title" style={{ color: 'var(--accent-cyan)' }}>
            <Scale size={18} />
            <span>মুজাহিদদের মাঝে গনীমতের ৪/৫ ভাগ বণ্টন ও ইমামদের মতভেদ</span>
          </div>
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
        </div>
      )}

      {/* Cavalry vs Infantry Opinions & Radz'a */}
      {q.cavalryInfantryOpinions && (
        <div className="section-block">
          <div className="section-title">
            <Info size={18} />
            <span>পদাতিক ও অশ্বারোহী নির্ধারণের সময়কাল ও 'রযঅ' (رضع)-এর বিধান</span>
          </div>
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
        </div>
      )}

      {/* Hunting: Is Restricted To Dog */}
      {q.isRestrictedToDogExplanation && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-cyan)' }}>
          <div className="section-title" style={{ color: 'var(--accent-cyan)' }}>
            <Target size={18} />
            <span>শিকার কি কেবল কুকুরের মাঝেই সীমাবদ্ধ?</span>
          </div>
          <p>{q.isRestrictedToDogExplanation}</p>
        </div>
      )}

      {/* Trained Animal 14 Conditions */}
      {q.trainedAnimalFourteenConditions && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-emerald)' }}>
          <div className="section-title">
            <CheckSquare size={18} />
            <span>প্রশিক্ষিত প্রাণী দ্বারা শিকারের ১৪টি শরয়ী শর্তাবলী</span>
          </div>
          <ul className="bullet-list">
            {q.trainedAnimalFourteenConditions.map((cond, idx) => (
              <li key={idx}>{cond}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Trained Dog 12 Conditions */}
      {q.trainedDogTwelveConditions && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-gold)' }}>
          <div className="section-title" style={{ color: 'var(--accent-gold)' }}>
            <ShieldCheck size={18} />
            <span>প্রশিক্ষিত কুকুরের ১২টি শরয়ী শর্তাবলী (আল্লামা কিরমানী র. এর ৪টিসহ)</span>
          </div>
          <ul className="bullet-list">
            {q.trainedDogTwelveConditions.map((dCond, idx) => (
              <li key={idx}>{dCond}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Alive Game Ruling Detailed */}
      {q.aliveGameRulingDetailed && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-gold)' }}>
          <div className="section-title" style={{ color: 'var(--accent-gold)' }}>
            <Info size={18} />
            <span>শিকারকৃত প্রাণী জীবিত পেলে তার শরয়ী ৭টি বিধান (শরহে বেকায়াহ)</span>
          </div>
          <p>{q.aliveGameRulingDetailed}</p>
        </div>
      )}

      {/* Gunshot Rulings 6 Views */}
      {q.gunshotRulingsSixViews && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-gold)' }}>
          <div className="section-title" style={{ color: 'var(--accent-gold)' }}>
            <Scale size={18} />
            <span>বন্দুক ও আধুনিক অস্ত্রের শিকারের শরয়ী বিধান (আলেমদের ৬টি দৃষ্টিভঙ্গি)</span>
          </div>
          <ul className="bullet-list">
            {q.gunshotRulingsSixViews.map((gView, idx) => (
              <li key={idx}>{gView}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Three Categories Hunting Conditions */}
      {q.threeCategoriesHuntingConditions && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-cyan)' }}>
          <div className="section-title" style={{ color: 'var(--accent-cyan)' }}>
            <CheckSquare size={18} />
            <span>শিকার (صيد) হালাল হওয়ার ৩টি প্রধান ক্যাটাগরির শর্তাবলী</span>
          </div>
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
        </div>
      )}

      {/* Slaughter Two Types */}
      {q.slaughterTwoTypes && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-ruby)' }}>
          <div className="section-title" style={{ color: 'var(--accent-ruby)' }}>
            <Flame size={18} />
            <span>যবাইয়ের ২ প্রকার (الذبح الاضطراري ও الذبح الاختياري)</span>
          </div>
          <div className="comparison-grid">
            {q.slaughterTwoTypes.map((st, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{st.name}</div>
                <div className="scholar-verdict">{st.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Slaughter Permissible & Impermissible Tools */}
      {q.slaughterPermissibleTools && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-emerald)' }}>
          <div className="section-title">
            <CheckSquare size={18} />
            <span>যেসব বস্তু দ্বারা যবাই বৈধ এবং যেসব বস্তু দ্বারা বৈধ নয়</span>
          </div>
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
        </div>
      )}

      {/* Slaughter Mustahab & Makruh Rules */}
      {q.slaughterMustahabRules && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-gold)' }}>
          <div className="section-title" style={{ color: 'var(--accent-gold)' }}>
            <Info size={18} />
            <span>যবাইয়ের ৯টি মুস্তাহাব ও ১১টি মাকরূহ কার্যাাবলী</span>
          </div>
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
        </div>
      )}

      {/* Mad Person, Pagan, Magian Slaughter */}
      {q.madPersonSlaughter && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-cyan)' }}>
          <div className="section-title" style={{ color: 'var(--accent-cyan)' }}>
            <Scale size={18} />
            <span>পাগল, মূর্তিপূজক ও অগ্নিপূজক ব্যক্তির যবাইয়ের শরয়ী বিধান</span>
          </div>
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
        </div>
      )}

      {/* Bismillah Omission Rulings */}
      {q.bismillahOmissionDetailed && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-gold)' }}>
          <div className="section-title" style={{ color: 'var(--accent-gold)' }}>
            <HelpCircle size={18} />
            <span>বিসমিল্লাহ (تسمية) বর্জনকারীর যবাইয়ের শরয়ী বিধান (৩টি অবস্থা)</span>
          </div>
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
        </div>
      )}

      {/* Veins List & Opinions */}
      {q.veinsListDetailed && (
        <div className="section-block">
          <div className="section-title">
            <ShieldCheck size={18} />
            <span>যবাইয়ের ৪টি রগের পরিচয় ও ইমামদের মতভেদ</span>
          </div>
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
        </div>
      )}

      {/* Fetus in Slaughtered Mother */}
      {q.fetusInSlaughteredMother && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-ruby)' }}>
          <div className="section-title" style={{ color: 'var(--accent-ruby)' }}>
            <Scale size={18} />
            <span>যবাইকৃত পশুর গর্ভস্থ বাচ্চার (الجنين) বিধান ও দলীলের জবাব</span>
          </div>
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
        </div>
      )}

      {/* Qurbani Conditions & Obligatory Time */}
      {q.qurbaniConditions && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-emerald)' }}>
          <div className="section-title">
            <CheckSquare size={18} />
            <span>কোরবানি কার ওপর ও কখন ওয়াজিব</span>
          </div>
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
        </div>
      )}

      {/* Qurbani Ruling Opinions */}
      {q.qurbaniRulingOpinions && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-cyan)' }}>
          <div className="section-title" style={{ color: 'var(--accent-cyan)' }}>
            <Scale size={18} />
            <span>কোরবানির শরয়ী হুকুম সম্পর্কে ফকীহদের দৃষ্টিভঙ্গি</span>
          </div>
          <div className="comparison-grid">
            {q.qurbaniRulingOpinions.map((item, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{item.scholar}</div>
                <div className="scholar-verdict" style={{ color: 'var(--accent-gold)' }}>বিধান: {item.verdict}</div>
                <div className="scholar-proof" style={{ fontStyle: 'normal', marginTop: '0.3rem' }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 15 Meat Rules */}
      {q.fifteenMeatRules && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-gold)' }}>
          <div className="section-title" style={{ color: 'var(--accent-gold)' }}>
            <Heart size={18} />
            <span>কোরবানির গোশতের ১৫টি শরয়ী বিধান (حكم لحم الأضحية)</span>
          </div>
          <ul className="bullet-list">
            {q.fifteenMeatRules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 8 Skin Rules */}
      {q.eightSkinRules && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-gold)' }}>
          <div className="section-title" style={{ color: 'var(--accent-gold)' }}>
            <ShieldCheck size={18} />
            <span>কোরবানির চামড়ার ৮টি শরয়ী বিধান (حكم جلد الأضحية)</span>
          </div>
          <ul className="bullet-list">
            {q.eightSkinRules.map((sRule, idx) => (
              <li key={idx}>{sRule}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Defective Animals Detailed */}
      {q.defectiveAnimalsDetailed && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-ruby)' }}>
          <div className="section-title" style={{ color: 'var(--accent-ruby)' }}>
            <AlertTriangle size={18} />
            <span>ত্রুটিযুক্ত চতুষ্পদ পশুর কোরবানির শরয়ী বিধান</span>
          </div>
          <ul className="bullet-list">
            {q.defectiveAnimalsDetailed.map((def, idx) => (
              <li key={idx}>{def}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Stolen & Trust Animal Rulings */}
      {q.stolenAnimalRuling && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-ruby)' }}>
          <div className="section-title" style={{ color: 'var(--accent-ruby)' }}>
            <Scale size={18} />
            <span>আত্মসাৎকৃত ও আমানতকৃত পশুর কোরবানির শরয়ী মাসআলা</span>
          </div>
          <p><strong>১. আত্মসাৎকৃত পশুর কোরবানি:</strong> {q.stolenAnimalRuling}</p>
          {q.trustAnimalRuling && (
            <p style={{ marginTop: '0.6rem' }}><strong>২. আমানতকৃত পশুর কোরবানি:</strong> {q.trustAnimalRuling}</p>
          )}
        </div>
      )}

      {/* Mistaken Slaughter Ruling */}
      {q.mistakenSlaughterRuling && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-cyan)' }}>
          <div className="section-title" style={{ color: 'var(--accent-cyan)' }}>
            <HelpCircle size={18} />
            <span>ভুলক্রমে পরস্পরের পশুর যবাইকরণ (ইস্তিহসান বনাম কিয়াস)</span>
          </div>
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
        </div>
      )}

      {/* Hajj Akbar Opinions */}
      {q.hajjAkbar && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-gold)' }}>
          <div className="section-title" style={{ color: 'var(--accent-gold)' }}>
            <Info size={18} />
            <span>الحج الأكبر (হজ্জে আকবর)-এর উদ্দেশ্য সম্পর্কিত মতামত</span>
          </div>
          <div className="comparison-grid">
            {q.hajjAkbar.map((item, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{item.opinion}</div>
                <div className="scholar-verdict">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fard Conditions */}
      {q.fardConditions && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-emerald)' }}>
          <div className="section-title">
            <CheckSquare size={18} />
            <span>হজ্জ কার ওপর ফরয হওয়ার শর্তাবলি</span>
          </div>
          <ul className="bullet-list">
            {q.fardConditions.map((cond, idx) => (
              <li key={idx}>{cond}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Imams Difference Matrix */}
      {q.imamsDifference && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-cyan)' }}>
          <div className="section-title" style={{ color: 'var(--accent-cyan)' }}>
            <Scale size={18} />
            <span>আইম্মায়ে কিরামের মতভেদ: {q.imamsDifference.topic}</span>
          </div>
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
        </div>
      )}

      {/* Fard List */}
      {q.fardList && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-gold)' }}>
          <div className="section-title" style={{ color: 'var(--accent-gold)' }}>
            <ShieldCheck size={18} />
            <span>হজ্জের ফরযসমূহ (فرائض الحج)</span>
          </div>
          <div className="comparison-grid">
            {q.fardList.map((fard, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{fard.num}. {fard.name}</div>
                <div className="scholar-verdict">{fard.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Wajib List */}
      {q.wajibList && (
        <div className="section-block">
          <div className="section-title">
            <CheckSquare size={18} />
            <span>হজ্জের ওয়াজিবসমূহ (واجبات الحج)</span>
          </div>
          <ul className="bullet-list">
            {q.wajibList.map((wajib, idx) => (
              <li key={idx}>{wajib}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Miqat List */}
      {q.miqatList && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-cyan)' }}>
          <div className="section-title" style={{ color: 'var(--accent-cyan)' }}>
            <Info size={18} />
            <span>হজ্জ ও ওমরার মীকাতসমূহ (مواقيت الحج)</span>
          </div>
          <div className="comparison-grid">
            {q.miqatList.map((m, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name" style={{ fontFamily: 'var(--font-ar)' }}>{m.name}</div>
                <div className="scholar-verdict">{m.location}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hajj Types */}
      {q.hajjTypes && (
        <div className="section-block">
          <div className="section-title">
            <BookOpen size={18} />
            <span>হজ্জের প্রকারভেদ (أنواع الحج)</span>
          </div>
          <div className="comparison-grid">
            {q.hajjTypes.map((ht, idx) => (
              <div className="scholar-card" key={idx}>
                <div className="scholar-name">{ht.type}</div>
                <div className="scholar-verdict">{ht.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hajj Types / Best Comparison */}
      {q.bestHajjComparison && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-gold)' }}>
          <div className="section-title" style={{ color: 'var(--accent-gold)' }}>
            <Scale size={18} />
            <span>সর্বোত্তম হজ্জ সম্পর্কিত আইম্মায়ে ফুকাহাদের মতামত ও দলীল</span>
          </div>
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
        </div>
      )}

      {/* Qiran Superiority Reasons */}
      {q.qiranSuperiorityReasons && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-emerald)' }}>
          <div className="section-title">
            <ShieldCheck size={18} />
            <span>হজ্জে ক্বেরান (الحج القران) উত্তম হওয়ার মূল তত্ত্বসমূহ</span>
          </div>
          <ul className="bullet-list">
            {q.qiranSuperiorityReasons.map((reason, idx) => (
              <li key={idx}>{reason}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Ihsar Section */}
      {q.ihsar && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-ruby)' }}>
          <div className="section-title" style={{ color: 'var(--accent-ruby)' }}>
            <AlertTriangle size={18} />
            <span>ইহসার (الإحصار) - এর পরিচয় ও বিস্তারিত শরয়ী বিধান</span>
          </div>
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
        </div>
      )}

      {/* 19 Differences Table */}
      {q.nineteenDifferences && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-gold)' }}>
          <div className="section-title" style={{ color: 'var(--accent-gold)' }}>
            <Scale size={18} />
            <span>হজ্জ ও ওমরার মধ্যকার ১৯টি মৌলিক পার্থক্য (الفروق بين الحج والعمرة)</span>
          </div>
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
        </div>
      )}

      {/* Kaffarah */}
      {q.kaffarah && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-ruby)' }}>
          <div className="section-title" style={{ color: 'var(--accent-ruby)' }}>
            <ShieldCheck size={18} />
            <span>যিহারের কাফফারা (كفارة الظهار)</span>
          </div>
          <ul className="bullet-list">
            {q.kaffarah.map((k, idx) => (
              <li key={idx}>{k}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Defects Rulings */}
      {q.defectsRulings && (
        <div className="section-block" style={{ borderLeftColor: 'var(--accent-gold)' }}>
          <div className="section-title" style={{ color: 'var(--accent-gold)' }}>
            <Info size={18} />
            <span>ত্রুটিযুক্ত পশুর কোরবানির শরয়ী বিধান</span>
          </div>
          <ul className="bullet-list">
            {q.defectsRulings.map((def, idx) => (
              <li key={idx}>{def}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
