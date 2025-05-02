'use client';

export default function LearnDev() {
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
                                        <div key={weekNumber} className="p-2 border border-gray-200 text-sm text-gray-600">
                                            {weekNumber}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
