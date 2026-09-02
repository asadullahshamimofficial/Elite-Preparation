import React, { useState, useEffect } from 'react';
import { X, Award, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';
import { evaluateShortAnswer } from '../services/gemini';

export default function QuizModal({ quizData, onClose }) {
  // Shuffle quiz data once on mount, limit to 10 questions
  const [shuffled, setShuffled] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [shortAnswer, setShortAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [feedback, setFeedback] = useState('');

  // Initialise shuffled list
  useEffect(() => {
    const shuffledList = [...quizData]
      .map(q => ({ ...q, _rand: Math.random() }))
      .sort((a, b) => a._rand - b._rand)
      .slice(0, Math.min(quizData.length, 10));
    setShuffled(shuffledList);
  }, [quizData]);

  if (shuffled.length === 0) return null;
  const currentQuiz = shuffled[currentIndex];
  const isShort = currentQuiz.type === 'short';

  const handleSelectOption = idx => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = async () => {
    if (isShort) {
      setIsSubmitted(true);
      const result = await evaluateShortAnswer(shortAnswer, currentQuiz);
      const earned = result.isCorrect ? 1 : 0;
      setScore(prev => prev + earned);
      setFeedback(result.feedback);
    } else {
      if (selectedOption === null) return;
      setIsSubmitted(true);
      if (selectedOption === currentQuiz.correctIndex) {
        setScore(prev => prev + 1);
        setFeedback('✅ সঠিক উত্তর!');
      } else {
        setFeedback(
          `❌ ভুল উত্তর। সঠিক উত্তর: ${currentQuiz.options[currentQuiz.correctIndex]}`
        );
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < shuffled.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShortAnswer('');
      setIsSubmitted(false);
      setFeedback('');
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShortAnswer('');
    setScore(0);
    setIsSubmitted(false);
    setQuizFinished(false);
    setFeedback('');
    // reshuffle again
    const shuffledList = [...quizData]
      .map(q => ({ ...q, _rand: Math.random() }))
      .sort((a, b) => a._rand - b._rand)
      .slice(0, Math.min(quizData.length, 10));
    setShuffled(shuffledList);
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
      <div className="quiz-container" style={{
        width: '100%',
        maxWidth: '600px',
        background: 'var(--bg-primary)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        color: 'var(--text-primary)',
        position: 'relative'
      }}>
        <button className="btn-icon" onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
          <X size={20} />
        </button>
        {!quizFinished ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: '700' }}>
                প্রশ্ন {currentIndex + 1} / {shuffled.length}
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--accent-emerald)', fontWeight: '700' }}>
                স্কোর: {score}
              </span>
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{currentQuiz.question}</h3>
            {isShort ? (
              <textarea
                rows={4}
                value={shortAnswer}
                onChange={e => setShortAnswer(e.target.value)}
                placeholder="আপনার উত্তর লিখুন..."
                disabled={isSubmitted}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid var(--bg-tertiary)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)'
                }}
              />
            ) : (
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
                        border: selectedOption === idx && !isSubmitted ? '2px solid var(--accent-gold)' : undefined,
                        padding: '0.5rem 0.75rem',
                        marginBottom: '0.5rem',
                        borderRadius: '4px',
                        cursor: isSubmitted ? 'default' : 'pointer',
                        background: isSubmitted && idx === currentQuiz.correctIndex ? 'var(--bg-success)' : 'var(--bg-secondary)',
                        color: 'var(--text-primary)'
                      }}
                    >
                      <span style={{ marginRight: '0.75rem', fontWeight: 'bold' }}>{String.fromCharCode(65 + idx)}.</span>
                      <span>{opt}</span>
                    </div>
                  );
                })}
              </div>
            )}
            {isSubmitted && (
              <div style={{ marginTop: '1rem', background: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: '4px' }}>
                <strong style={{ color: 'var(--accent-gold)' }}>ফিডব্যাক: </strong>{feedback}
              </div>
            )}
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              {!isSubmitted ? (
                <button className="btn-pill" onClick={handleSubmit} disabled={isShort ? shortAnswer.trim() === '' : selectedOption === null} style={{ opacity: (isShort ? shortAnswer.trim() === '' : selectedOption === null) ? 0.5 : 1 }}>
                  উত্তর জমা দিন
                </button>
              ) : (
                <button className="btn-pill" onClick={handleNext}>
                  {currentIndex < shuffled.length - 1 ? 'পরবর্তী প্রশ্ন' : 'ফলাফল দেখুন'}
                </button>
              )}
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <Award size={64} color="var(--accent-gold)" style={{ margin: '0 auto 1rem' }} />
            <h2 style={{ fontSize: '1.8rem', color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>কুইজ সম্পন্ন হয়েছে!</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              আপনার মোট নম্বর: <strong style={{ color: 'var(--accent-emerald)', fontSize: '1.4rem' }}>{score}</strong> / {shuffled.length}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button className="btn-pill" onClick={handleRestart}>
                <RotateCcw size={18} /> পুনরায় পরীক্ষা দিন
              </button>
              <button className="btn-icon" style={{ width: 'auto', padding: '0 1rem' }} onClick={onClose}>বন্ধ করুন</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
