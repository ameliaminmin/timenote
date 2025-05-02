'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { auth, getUserData, UserData } from '@/lib/firebase';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isCollapsed, setIsCollapsed] = useState(false);

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
        <>
            <nav className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${isCollapsed ? '-translate-x-full' : 'translate-x-0'} z-50`}>
                {/* 收合按鈕 */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-4 bg-white border border-gray-200 rounded-full p-1.5 shadow-sm hover:bg-gray-50 transition-colors"
                >
                    <svg
                        className={`w-4 h-4 text-gray-600 transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>

                {/* 導覽列內容 */}
                <div className="w-48 p-4 flex flex-col h-full">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
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
                                className={`flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors ${pathname === '/' ? 'bg-gray-50 text-gray-900' : ''
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
                                href="/life-calendar"
                                className={`flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors ${pathname === '/life-calendar' ? 'bg-gray-50 text-gray-900' : ''
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
                                <span>人生年曆</span>
                            </Link>
                            <Link
                                href="/learn-dev"
                                className={`flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors ${pathname === '/learn-dev' ? 'bg-gray-50 text-gray-900' : ''
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
                                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                    />
                                </svg>
                                <span>軟體開發進度</span>
                            </Link>
                            <Link
                                href="/settings"
                                className={`flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors ${pathname === '/setting' ? 'bg-gray-50 text-gray-900' : ''
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
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span>設定</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            {/* 內容區域的容器 */}
            <div className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'ml-0' : 'ml-48'}`}>
                {/* 這裡放置頁面內容 */}
            </div>
        </>
    );
} 