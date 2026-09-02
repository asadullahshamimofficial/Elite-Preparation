import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { logPageView } from '../services/firebase';

/**
 * usePageTracking — tracks how long the user spends on a page
 * and logs the visit to Firestore when they leave.
 *
 * @param {string} pageName - e.g. 'বালাগাত ও মানতিক', 'ফিকহ ১ম পত্র', 'হোমপেজ'
 */
export default function usePageTracking(pageName) {
  const { user } = useAuth();
  const startTime = useRef(Date.now());

  useEffect(() => {
    startTime.current = Date.now();

    return () => {
      if (!user?.uid) return;
      const duration = Math.round((Date.now() - startTime.current) / 1000);
      if (duration < 2) return; // ignore blink visits
      logPageView(
        user.uid,
        user.name || '',
        user.email || '',
        pageName,
        duration
      );
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid, pageName]);
}
