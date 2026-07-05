import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { EditorWrapper } from '@/components/editor/EditorWrapper';

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  // Fetch project
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('game_state')
    .eq('id', id)
    .single();

  if (projectError || !project) {
    redirect('/dashboard');
  }

  // Fetch profile plan
  const { data: profile } = await supabase
    .from('users')
    .select('plan')
    .eq('id', user.id)
    .single();

  const userPlan = profile?.plan || 'FREE';

  return <EditorWrapper projectId={id} initialState={project.game_state} userPlan={userPlan} />;
}
