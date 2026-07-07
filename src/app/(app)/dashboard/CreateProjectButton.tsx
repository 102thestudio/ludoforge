'use client';

import { useState, useTransition } from 'react';
import { createProjectAction } from './actions';
import { usePostHog } from 'posthog-js/react';
import { UpgradeModal } from '@/components/UpgradeModal';
import { TemplatePicker } from './TemplatePicker';

export function CreateProjectButton() {
  const [isPending, startTransition] = useTransition();
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const posthog = usePostHog();

  const handleCreate = (templateId: string) => {
    setIsPickerOpen(false);
    startTransition(async () => {
      try {
        const res = await createProjectAction(templateId);
        if (res && res.error === 'LIMIT_REACHED') {
          setIsUpgradeOpen(true);
        } else {
          posthog.capture('project_created', { template: templateId });
        }
      } catch (err) {
        console.error('Project creation failed:', err);
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setIsPickerOpen(true)}
        disabled={isPending}
        className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-md shadow-indigo-500/20 disabled:opacity-50 cursor-pointer"
      >
        {isPending ? (
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        )}
        <span>Nuevo Proyecto</span>
      </button>

      {isPickerOpen && <TemplatePicker onSelect={handleCreate} onCancel={() => setIsPickerOpen(false)} />}
      <UpgradeModal isOpen={isUpgradeOpen} onClose={() => setIsUpgradeOpen(false)} />
    </>
  );
}
