import { initializeApp, getApps, App, cert, ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

function getServiceAccount(): ServiceAccount | undefined {
  const serviceAccountStr = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!serviceAccountStr) {
    // For local development, you can set this environment variable.
    // In Firebase App Hosting, this is configured for you.
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        'FIREBASE_SERVICE_ACCOUNT environment variable not set. ' +
        'Firebase Admin SDK initialization may fail if not in a managed environment.'
      );
    }
    return undefined;
  }
  try {
    return JSON.parse(serviceAccountStr);
  } catch (e) {
    console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT:', e);
    return undefined;
  }
}


function getAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }
  
  const serviceAccount = getServiceAccount();

  // In App Hosting, GOOGLE_CLOUD_PROJECT is set.
  if (process.env.GOOGLE_CLOUD_PROJECT) {
      return initializeApp({
        credential: serviceAccount ? cert(serviceAccount) : undefined,
      });
  }

  // Fallback for other environments.
  return initializeApp();
}

export function initializeAdmin() {
  const adminApp = getAdminApp();
  return {
    app: adminApp,
    auth: getAuth(adminApp),
    firestore: getFirestore(adminApp),
  };
}
