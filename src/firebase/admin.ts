import { initializeApp, getApps, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { firebaseConfig } from './config'; // Assuming this is safe to use server-side

function getAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }
  
  // This environment variable is available in App Hosting.
  if (process.env.GOOGLE_CLOUD_PROJECT) {
      return initializeApp();
  }

  // Fallback for local development or other environments.
  // Make sure to set up service account credentials.
  return initializeApp({
    projectId: firebaseConfig.projectId,
  });
}

export function initializeAdmin() {
  const adminApp = getAdminApp();
  return {
    firestore: getFirestore(adminApp),
  };
}
