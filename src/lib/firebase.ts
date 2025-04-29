// Firebase 配置文件
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase 配置
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "timenote-alpha.firebaseapp.com",
    projectId: "timenote-alpha",
    storageBucket: "timenote-alpha.firebasestorage.app",
    messagingSenderId: "1087992241818",
    appId: "1:1087992241818:web:22da125ef9b9f205810923"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);

// 導出 Firebase 服務
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app; 