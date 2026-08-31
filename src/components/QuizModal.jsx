import React, { useState } from 'react';
import { X, Award, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';

export default function QuizModal({ quizData, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuiz = quizData[currentIndex];

  const handleSelectOption = (index) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === currentQuiz.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsSubmitted(false);
    setQuizFinished(false);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="quiz-container" style={{ width: '100%', position: 'relative' }}>
        <button
          className="btn-icon"
          onClick={onClose}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}
        >
          <X size={20} />
        </button>

        {!quizFinished ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 700 }}>
                প্রশ্ন {currentIndex + 1} / {quizData.length}
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                স্কোর: {score}
              </span>
            </div>

            <div style={{
              height: '6px',
              background: 'var(--bg-tertiary)',
              borderRadius: '3px',
              marginBottom: '1.5rem',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${((currentIndex + 1) / quizData.length) * 100}%`,
                background: 'linear-gradient(90deg, var(--accent-gold), var(--accent-emerald))',
                transition: 'width 0.3s ease'
              }} />
            </div>

            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
              {currentQuiz.question}
            </h3>

            <div>
              {currentQuiz.options.map((opt, idx) => {
                let statusClass = '';
                if (isSubmitted) {
                  if (idx === currentQuiz.correctIndex) statusClass = 'correct';
                  else if (idx === selectedOption) statusClass = 'wrong';
                } else if (selectedOption === idx) {
                  statusClass = 'active';
                }

                return (
                  <div
                    key={idx}
                    className={`quiz-option ${statusClass}`}
                    onClick={() => handleSelectOption(idx)}
                    style={{
                      border: selectedOption === idx && !isSubmitted ? '2px solid var(--accent-gold)' : undefined
                    }}
                  >
                    <span style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'var(--bg-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.85rem'
                    }}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span style={{ flex: 1 }}>{opt}</span>
                    {isSubmitted && idx === currentQuiz.correctIndex && (
                      <CheckCircle size={20} color="var(--accent-emerald)" />
                    )}
                    {isSubmitted && idx === selectedOption && idx !== currentQuiz.correctIndex && (
                      <AlertCircle size={20} color="var(--accent-ruby)" />
                    )}
                  </div>
                );
              })}
            </div>

            {isSubmitted && (
              <div style={{
                background: 'var(--bg-tertiary)',
                padding: '1rem',
                borderRadius: 'var(--radius-sm)',
                marginTop: '1rem',
                borderLeft: '4px solid var(--accent-gold)'
              }}>
                <strong style={{ color: 'var(--accent-gold)' }}>ব্যাখ্যা: </strong>
                <span>{currentQuiz.explanation}</span>
              </div>
            )}

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              {!isSubmitted ? (
                <button
                  className="btn-pill"
                  onClick={handleSubmit}
                  disabled={selectedOption === null}
                  style={{ opacity: selectedOption === null ? 0.5 : 1 }}
                >
                  উত্তর নিশ্চিত করুন
                </button>
              ) : (
                <button className="btn-pill" onClick={handleNext}>
                  {currentIndex < quizData.length - 1 ? 'পরবর্তী প্রশ্ন' : 'ফলাফল দেখুন'}
                </button>
              )}
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <Award size={64} color="var(--accent-gold)" style={{ margin: '0 auto 1rem' }} />
            <h2 style={{ fontSize: '1.8rem', color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>
              কুইজ সম্পন্ন হয়েছে!
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              আপনার মোট নম্বর: <strong style={{ color: 'var(--accent-emerald)', fontSize: '1.4rem' }}>{score}</strong> / {quizData.length}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button className="btn-pill" onClick={handleRestart}>
                <RotateCcw size={18} />
                <span>পুনরায় পরীক্ষা দিন</span>
              </button>
              <button className="btn-icon" style={{ width: 'auto', padding: '0 1rem' }} onClick={onClose}>
                বন্ধ করুন
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
