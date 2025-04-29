// Firebase 配置文件
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

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

// 用戶資料介面
export interface UserData {
    email: string;
    displayName: string;
    createdAt: Date;
    birthDate?: string;
}

// 註冊新用戶
export const registerUser = async (email: string, password: string, displayName: string) => {
    try {
        // 創建用戶帳號
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 儲存用戶資料到 Firestore
        const userData: UserData = {
            email: user.email!,
            displayName,
            createdAt: new Date()
        };

        await setDoc(doc(db, 'users', user.uid), userData);

        return user;
    } catch (error) {
        throw error;
    }
};

// 登入用戶
export const loginUser = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

// 登出用戶
export const logoutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw error;
    }
};

// 獲取用戶資料
export const getUserData = async (userId: string) => {
    try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
            return userDoc.data() as UserData;
        }
        return null;
    } catch (error) {
        throw error;
    }
};

// 更新用戶資料
export const updateUserData = async (userId: string, data: Partial<UserData>) => {
    try {
        await setDoc(doc(db, 'users', userId), data, { merge: true });
    } catch (error) {
        throw error;
    }
};

export default app; 