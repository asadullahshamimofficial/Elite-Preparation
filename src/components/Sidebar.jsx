import React from 'react';
import { List, CheckCircle2 } from 'lucide-react';

export default function Sidebar({ chapters, activeChapterId, setActiveChapterId }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        <List size={20} />
        <span>সূচিপত্র (فهرس الموضوعات)</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div
          className={`chapter-card ${activeChapterId === 'all' ? 'active' : ''}`}
          onClick={() => setActiveChapterId('all')}
        >
          <div className="chapter-card-header">
            <span className="chapter-badge">সকল</span>
            <span className="chapter-title-bn" style={{ margin: 0 }}>সকল প্রশ্ন ও পর্বসমূহ</span>
          </div>
        </div>

        {chapters.map((chap) => {
          const isActive = activeChapterId === chap.id;
          return (
            <div
              key={chap.id}
              className={`chapter-card ${isActive ? 'active' : ''}`}
              onClick={() => setActiveChapterId(chap.id)}
            >
              <div className="chapter-card-header">
                <span className="chapter-badge">পর্ব {chap.number}</span>
                <span className="chapter-title-ar">{chap.titleAr}</span>
              </div>
              <div className="chapter-title-bn">{chap.titleBn}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <CheckCircle2 size={12} color="var(--accent-emerald)" />
                <span>{chap.questionCount}টি বিষয়ভিত্তিক প্রশ্ন</span>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
