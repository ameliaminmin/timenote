'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function LifeCalendar() {
    const [lifeExpectancy, setLifeExpectancy] = useState<number>(80);
    const [currentAge, setCurrentAge] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);
    const [userName, setUserName] = useState<string>('');

    // 計算年齡的函數
    const calculateAge = (birthDate: string) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        if (userData.expectedLifespan) {
                            setLifeExpectancy(userData.expectedLifespan);
                        }
                        if (userData.birthDate) {
                            const age = calculateAge(userData.birthDate);
                            setCurrentAge(age);
                        }
                        if (userData.displayName) {
                            setUserName(userData.displayName);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // 計算總行數（每行10年）
    const totalRows = Math.ceil(lifeExpectancy / 10);

    // 生成格子
    const generateGrid = () => {
        const grid = [];
        for (let row = 0; row < totalRows; row++) {
            const rowStart = row * 10;
            const rowEnd = Math.min((row + 1) * 10, lifeExpectancy);
            const cells = [];

            for (let year = rowStart; year < rowEnd; year++) {
                const isPast = year < currentAge;
                cells.push(
                    <div
                        key={year}
                        className={`w-8 h-8 transition-colors duration-300 ${isPast ? 'bg-yellow-300' : 'bg-gray-100'
                            }`}
                        title={`${year}歲`}
                    />
                );
            }

            grid.push(
                <div key={row} className="flex gap-1 mb-1">
                    {cells}
                </div>
            );
        }
        return grid;
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white p-8 flex items-center justify-center">
                <div className="text-gray-600">載入中...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-sm text-gray-600 mb-4">
                    {userName}，你現在 {currentAge} 歲
                </div>
                {generateGrid()}
            </div>
        </div>
    );
}
