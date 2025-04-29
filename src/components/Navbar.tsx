'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { auth, getUserData, UserData } from '@/lib/firebase';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setIsLoggedIn(!!user);
            if (user) {
                const data = await getUserData(user.uid);
                setUserData(data);
            } else {
                setUserData(null);
            }
        });

        return () => unsubscribe();
    }, []);

    // 如果用戶未登入，不顯示導覽列
    if (!isLoggedIn) {
        return null;
    }

    return (
        <nav className="w-48 bg-gray-50 border-r border-gray-200 flex flex-col h-screen sticky top-0">
            {/* 上方內容區域 */}
            <div className="p-4 flex-1">
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <svg
                                className="w-5 h-5 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-base font-medium text-gray-900">TimeNote</span>
                            <span className="text-xs text-gray-500 truncate max-w-[120px]">
                                {userData?.displayName || '載入中...'}
                            </span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Link
                            href="/"
                            className={`flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors ${pathname === '/' ? 'bg-gray-100 text-gray-900' : ''
                                }`}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            <span>首頁</span>
                        </Link>
                        <Link
                            href="/notes"
                            className={`flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors ${pathname === '/notes' ? 'bg-gray-100 text-gray-900' : ''
                                }`}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            <span>筆記</span>
                        </Link>
                        <Link
                            href="/calendar"
                            className={`flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors ${pathname === '/calendar' ? 'bg-gray-100 text-gray-900' : ''
                                }`}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <span>日曆</span>
                        </Link>
                    </div>
                </div>
            </div>
            {/* 底部登出按鈕 */}
            <div className="p-4 border-t border-gray-200">
                <div className="space-y-2">
                    <button
                        onClick={() => auth.signOut()}
                        className="flex items-center justify-center space-x-2 w-full bg-gray-100 text-sm text-gray-700 hover:bg-gray-200 rounded-lg px-3 py-2 transition-colors"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        <span>登出</span>
                    </button>
                </div>
            </div>
        </nav>
    );
} 