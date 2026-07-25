import React from 'react';
import { Home, ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-xs font-mono tracking-wide text-neutral-500 py-3 ${className}`}
    >
      <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5 sm:gap-2">
              {index === 0 && (
                <Home className="w-3.5 h-3.5 shrink-0 text-neutral-400 group-hover:text-black transition-colors" />
              )}

              {item.onClick && !isLast ? (
                <button
                  onClick={item.onClick}
                  className="hover:text-neutral-950 hover:underline transition-colors font-medium cursor-pointer inline-flex items-center gap-1 focus:outline-none"
                >
                  {item.label}
                </button>
              ) : (
                <span
                  className={`truncate max-w-[180px] sm:max-w-xs md:max-w-md ${
                    isLast || item.active
                      ? 'text-neutral-950 font-semibold'
                      : 'text-neutral-600 font-medium'
                  }`}
                  title={item.label}
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
