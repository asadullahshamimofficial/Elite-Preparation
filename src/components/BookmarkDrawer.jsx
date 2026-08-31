import React from 'react';
import { X, Bookmark, ArrowRight } from 'lucide-react';

export default function BookmarkDrawer({ bookmarkedQuestions, onClose, onSelectQuestion }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      width: '380px',
      maxWidth: '90vw',
      background: 'var(--bg-secondary)',
      borderLeft: '1px solid var(--card-border)',
      boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
      zIndex: 900,
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', fontWeight: 700 }}>
          <Bookmark size={20} fill="var(--accent-gold)" />
          <span>সংরক্ষিত প্রশ্নসমূহ ({bookmarkedQuestions.length})</span>
        </div>
        <button className="btn-icon" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      {bookmarkedQuestions.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '3rem' }}>
          <p>এখনো কোনো প্রশ্ন বুকমার্ক বা সংরক্ষণ করা হয়নি।</p>
          <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>যেকোনো প্রশ্নের ডানদিকের বুকমার্ক আইকন চেপে সেটি পরবর্তীতে পড়ার জন্য সংরক্ষণ করুন।</p>
        </div>
      ) : (
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {bookmarkedQuestions.map(q => (
            <div
              key={q.id}
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => {
                onSelectQuestion(q.id);
                onClose();
              }}
            >
              <div style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 700 }}>
                প্রশ্ন {q.questionNum}
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                {q.questionBn}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: 'var(--accent-emerald)', marginTop: '0.5rem' }}>
                <span>প্রশ্নটি সরাসরি দেখুন</span>
                <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
