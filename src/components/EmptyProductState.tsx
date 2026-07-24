import React from 'react';
import { ShoppingBag, PlusCircle, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface EmptyProductStateProps {
  title?: string;
  categoryName?: string;
  description?: string;
  showAdminAction?: boolean;
}

export const EmptyProductState: React.FC<EmptyProductStateProps> = ({
  title = 'Collection Empty',
  categoryName,
  description = 'No products have been added to this section yet. Products uploaded via the Zapin Admin Portal will automatically appear here.',
  showAdminAction = true,
}) => {
  const { setCurrentPage, setIsAdmin } = useStore();

  const handleGoToAdmin = () => {
    setIsAdmin(true);
    setCurrentPage('admin');
  };

  return (
    <div className="py-20 px-6 max-w-2xl mx-auto text-center flex flex-col items-center justify-center min-h-[380px] bg-neutral-50 border border-neutral-200/80 rounded-xl my-8">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-lg">
          <ShoppingBag className="w-7 h-7 stroke-[1.5]" />
        </div>
        <div className="absolute -top-1 -right-1 bg-amber-400 text-neutral-950 p-1.5 rounded-full shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
      </div>

      <h3 className="text-xl md:text-2xl font-light tracking-tight text-neutral-900 uppercase">
        {categoryName ? `${categoryName} — ${title}` : title}
      </h3>

      <div className="w-12 h-px bg-neutral-300 my-4" />

      <p className="text-neutral-600 text-sm md:text-base leading-relaxed max-w-md font-normal mb-8">
        {description}
      </p>

      {showAdminAction && (
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <button
            onClick={handleGoToAdmin}
            className="inline-flex items-center gap-2 bg-neutral-950 text-white px-6 py-3 text-xs tracking-widest uppercase hover:bg-neutral-800 transition-colors rounded-sm shadow-md"
          >
            <PlusCircle className="w-4 h-4" />
            Add Products via Admin Panel
          </button>
        </div>
      )}
    </div>
  );
};
