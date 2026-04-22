"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav({
  onOpenSearch,
}: {
  onOpenSearch?: () => void;
}) {
  const pathname = usePathname() || "";

  // Логіка активних вкладок (залежить виключно від URL)
  // Пошук світиться на головній сторінці, а також якщо шлях містить /category або /search
  const isSearchActive = pathname === "/" || pathname.startsWith("/category") || pathname.startsWith("/search");
  const isRemindersActive = pathname.startsWith("/reminders");
  const isFavoritesActive = pathname.startsWith("/favorites");
  const isAccountActive = pathname.startsWith("/profile");

  // Клас для анімації натискання (active:scale-90 створює ефект м'якого пружинення без стрибків макета)
  const itemClass = "flex flex-col items-center gap-1 transition-all duration-200 active:scale-90 text-gray-d";
  const activeItemClass = "flex flex-col items-center gap-1 transition-all duration-200 active:scale-90 text-orange";

  // Функція для кнопки пошуку: якщо ми вже на головній, просто відкриваємо модалку пошуку
  const handleSearchClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      onOpenSearch?.();
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-l z-50 md:hidden pb-safe">
      <div className="flex justify-around items-center px-2 py-3">
        
        {/* Пошук */}
        <Link
          href="/"
          onClick={handleSearchClick}
          className={isSearchActive ? activeItemClass : itemClass}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span className="text-[10px] font-medium mt-0.5">Пошук</span>
        </Link>

        {/* Сповіщення */}
        <Link
          href="/reminders"
          className={isRemindersActive ? activeItemClass : itemClass}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span className="text-[10px] font-medium mt-0.5">Сповіщення</span>
        </Link>

        {/* Вподобайки (Лапка) */}
        <Link
          href="/favorites"
          className={isFavoritesActive ? activeItemClass : itemClass}
        >
          <svg 
            width="26" 
            height="26" 
            viewBox="0 0 33 31" 
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            fill={isFavoritesActive ? "currentColor" : "transparent"}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15.0227 0.501124C15.0227 0.501124 18.7363 0.323343 18.5418 4.41241C18.5418 4.41241 17.1503 7.82536 17.9224 12.2538C17.9224 12.2538 19.0057 19.6454 22.0999 19.3437C22.0999 19.3437 23.4164 19.57 25.5801 15.5159C25.5801 15.5159 26.2384 13.3017 26.1606 11.0147C26.1606 11.0147 27.0883 7.71222 30.4936 9.17761C30.4936 9.17761 33.8988 10.3036 31.1519 14.1664C31.1519 14.1664 28.6771 15.0284 26.5884 18.1423C26.5884 18.1423 24.1775 20.8064 23.622 25.7575C23.622 25.7575 23.1442 29.5475 18.889 30.1105C18.889 30.1105 15.2532 31.2365 12.6229 26.509C12.6229 26.509 10.8814 24.0335 6.58732 23.3951C6.58732 23.3951 5.27077 22.7944 2.40991 23.1338C2.40991 23.1338 0.0101132 22.7594 0.590618 20.0198C0.590618 20.0198 1.75163 17.6925 4.42084 19.2683C4.42084 19.2683 6.62621 21.6307 8.79268 22.0832C8.79268 22.0832 9.99258 23.0584 12.0813 22.6839C12.0813 22.6839 12.5451 20.0576 8.52326 17.019C8.52326 17.019 7.74833 16.1193 5.89294 15.6318C5.89294 15.6318 2.75987 15.1442 3.57092 11.206C3.57092 11.206 5.89294 7.94119 8.98711 10.8693C8.98711 10.8693 9.68427 11.8067 9.79815 12.8572C9.79815 12.8572 11.4619 18.7861 14.8672 19.6858C14.8672 19.6858 16.8392 16.984 14.6727 10.643C14.6727 10.643 13.6519 8.61054 11.5 5.49999C11.5 5.49999 9.72038 0.67891 15.0199 0.503818L15.0227 0.501124Z" />
          </svg>
          <span className="text-[10px] font-medium mt-0.5">Вподобайки</span>
        </Link>

        {/* Акаунт */}
        <Link
          href="/profile"
          className={isAccountActive ? activeItemClass : itemClass}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span className="text-[10px] font-medium mt-0.5">Акаунт</span>
        </Link>

      </div>
    </nav>
  );
}