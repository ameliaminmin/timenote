'use client';

import { useState, useEffect } from 'react';
import { auth, getUserData, updateUserData } from '@/lib/firebase';
import { toast } from 'react-hot-toast';

export default function SettingPage() {
    const [birthDate, setBirthDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                const userData = await getUserData(user.uid);
                if (userData?.birthDate) {
                    setBirthDate(userData.birthDate);
                }
            }
        };
        loadUserData();
    }, []);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBirthDate(e.target.value);
    };

    const handleSave = async () => {
        try {
            setIsLoading(true);
            const user = auth.currentUser;
            if (!user) {
                toast.error('請先登入');
                return;
            }

            await updateUserData(user.uid, { birthDate });
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
