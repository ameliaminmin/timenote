'use client';

import { useState, useEffect } from 'react';
import { auth, getUserData, updateUserData } from '@/lib/firebase';
import { toast } from 'react-hot-toast';

export default function SettingPage() {
    const [birthDate, setBirthDate] = useState('');
    const [expectedLifespan, setExpectedLifespan] = useState('80'); // 預設值設為80歲
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                const userData = await getUserData(user.uid);
                if (userData?.birthDate) {
                    setBirthDate(userData.birthDate);
                }
                if (userData?.expectedLifespan) {
                    setExpectedLifespan(userData.expectedLifespan);
                }
            }
        };
        loadUserData();
    }, []);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBirthDate(e.target.value);
    };

    const handleLifespanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // 只允許輸入數字，且範圍在1-150之間
        if (/^\d*$/.test(value) && (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 150))) {
            setExpectedLifespan(value);
        }
    };

    const handleSave = async () => {
        try {
            setIsLoading(true);
            const user = auth.currentUser;
            if (!user) {
                toast.error('請先登入');
                return;
            }

            await updateUserData(user.uid, {
                birthDate,
                expectedLifespan
            });
            toast.success('設定已保存');
        } catch (error) {
            console.error('保存設定時發生錯誤:', error);
            toast.error('保存設定失敗');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">設定</h1>

                <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">個人資料</h2>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
                                    出生年月日
                                </label>
                                <input
                                    type="date"
                                    id="birthDate"
                                    value={birthDate}
                                    onChange={handleDateChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label htmlFor="expectedLifespan" className="block text-sm font-medium text-gray-700 mb-1">
                                    期望壽命（歲）
                                </label>
                                <input
                                    type="text"
                                    id="expectedLifespan"
                                    value={expectedLifespan}
                                    onChange={handleLifespanChange}
                                    placeholder="請輸入期望壽命（1-150歲）"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                                <p className="mt-1 text-sm text-gray-500">請輸入1-150之間的數字</p>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    onClick={handleSave}
                                    disabled={isLoading}
                                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? '保存中...' : '保存'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
