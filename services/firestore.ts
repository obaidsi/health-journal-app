import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { firebaseConfig } from '../config/firebase';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function saveToFirebase(data: Record<string, unknown>) {
  try {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
    const path = `health_journal/${dateStr}/entries/${timeStr}`;
    console.log(`[Firestore] Saving to ${path}:`, data);

    const ref = doc(db, 'health_journal', dateStr, 'entries', timeStr);
    await setDoc(ref, data);

    console.log('[Firestore] Saved successfully');
  } catch (error) {
    console.error('[Firestore] Error saving data:', error);
    throw error;
  }
}
