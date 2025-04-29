import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
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
              stroke="#F59E0B"
              strokeWidth="2"
            />
            {/* 筆記本線條 */}
            <line
              x1="30"
              y1="30"
              x2="90"
              y2="30"
              stroke="#F59E0B"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="30"
              y1="45"
              x2="90"
              y2="45"
              stroke="#F59E0B"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="30"
              y1="60"
              x2="90"
              y2="60"
              stroke="#F59E0B"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="30"
              y1="75"
              x2="90"
              y2="75"
              stroke="#F59E0B"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* 筆記本裝飾 */}
            <circle
              cx="60"
              cy="90"
              r="5"
              fill="#F59E0B"
            />
            <path
              d="M55 90L65 90"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M60 85L60 95"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-emerald-500 bg-clip-text text-transparent">
            記錄每一刻，創造無限可能
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            讓時間管理變得簡單而優雅
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/register"
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-emerald-500 text-white rounded-lg hover:opacity-90 transition-opacity"
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
