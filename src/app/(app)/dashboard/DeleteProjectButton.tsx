'use client';

import { useTransition } from 'react';
import { deleteProjectAction } from './actions';

export function DeleteProjectButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm('¿Estás seguro de que quieres borrar este proyecto? No se puede deshacer.')) {
      startTransition(() => {
        deleteProjectAction(id);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 bg-[#222228] hover:bg-red-500/20 text-zinc-400 hover:text-red-400 rounded-lg transition-colors disabled:opacity-50"
      title="Borrar proyecto"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
    </button>
  );
}
