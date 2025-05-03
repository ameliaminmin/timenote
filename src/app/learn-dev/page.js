'use client';
import { useState } from 'react';
import { auth, saveNote } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function LearnDev() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        tags: ''
    });

    const handleWeekClick = (weekNumber) => {
        setSelectedWeek(weekNumber);
        setIsModalOpen(true);
        setError(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error('請先登入');
            }

            const tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

            await saveNote(user.uid, {
                title: formData.title,
                content: formData.content,
                tags,
                weekNumber: selectedWeek
            });

            // 重置表單
            setFormData({
                title: '',
                content: '',
                tags: ''
            });
            setIsModalOpen(false);
            router.refresh(); // 刷新頁面以顯示新數據
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen flex-col">
            <div className="w-full px-6 pb-2">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">2025年</h2>
                    <div className="flex gap-3">
                        <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200 shadow-sm">
                            2 年
                        </button>
                        <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200 shadow-sm">
                            12 個月
                        </button>
                        <button className="px-3 py-1.5 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 shadow-sm">
                            52 週
                        </button>
                        <button className="px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200 shadow-sm">
                            1 週
                        </button>
                    </div>
                </div>
                <div className="w-full grid grid-cols-4">
                    {Array.from({ length: 4 }, (_, colIndex) => (
                        <div key={colIndex} className="bg-white">
                            <div className="grid grid-cols-1">
                                {Array.from({ length: 13 }, (_, rowIndex) => {
                                    const weekNumber = colIndex * 13 + rowIndex + 1;
                                    return (
                                        <button
                                            key={weekNumber}
                                            className="p-2 border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                                            onClick={() => handleWeekClick(weekNumber)}
                                        >
                                            {weekNumber}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 模態框 */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">第 {selectedWeek} 週筆記</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                                disabled={isLoading}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">標題</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="輸入標題"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">內容</label>
                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                                    placeholder="輸入內容"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">標籤</label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="輸入標籤，用逗號分隔"
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
                                    disabled={isLoading}
                                >
                                    {isLoading ? '保存中...' : '提交'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}
