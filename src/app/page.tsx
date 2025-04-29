'use client';

import Link from "next/link";
import { auth } from '@/lib/firebase';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  // 如果用戶已登入，顯示主頁內容
  if (isLoggedIn) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">歡迎回來！</h1>
        <p className="text-gray-600">開始記錄你的時間吧！</p>
      </div>
    );
  }

  // 如果用戶未登入，顯示介紹頁
  return (
    <div className="h-screen flex flex-col items-center justify-center p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white dark:bg-gray-900">
      <main className="flex flex-col gap-[32px] items-center justify-center w-full max-w-3xl mx-auto text-center">
        {/* 筆記本圖標 */}
        <div className="w-24 h-24 sm:w-32 sm:h-32">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto"
          >
            {/* 筆記本背景 */}
            <rect
              x="20"
              y="10"
              width="80"
              height="100"
              rx="8"
              fill="#FEF3C7"
              stroke="#FBBF24"
              strokeWidth="2"
            />
            {/* 筆記本線條 */}
            <line
              x1="30"
              y1="30"
              x2="90"
              y2="30"
              stroke="#FBBF24"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="30"
              y1="45"
              x2="90"
              y2="45"
              stroke="#FBBF24"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="30"
              y1="60"
              x2="90"
              y2="60"
              stroke="#FBBF24"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="30"
              y1="75"
              x2="90"
              y2="75"
              stroke="#FBBF24"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* 時鐘圖標 */}
            <circle
              cx="60"
              cy="90"
              r="6"
              fill="#FBBF24"
            />
            <path
              d="M60 86L60 90"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M60 90L63 90"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent animate-gradient">
            記錄每一刻，創造無限可能
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            讓時間管理變得簡單而優雅
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/register"
              className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors"
            >
              註冊/登入
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              了解更多
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
