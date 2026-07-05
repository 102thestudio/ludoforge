'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createProjectAction() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  // Fetch plan
  const { data: profile } = await supabase
    .from('users')
    .select('plan')
    .eq('id', user.id)
    .single();

  const userPlan = profile?.plan || 'FREE';

  // Fetch current project count
  const { count, error: countError } = await supabase
    .from('projects')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id);

  if (countError) {
    console.error('Count query error:', countError);
    throw new Error('Database error');
  }

  if (userPlan === 'FREE' && count !== null && count >= 3) {
    return { error: 'LIMIT_REACHED' };
  }

  const { data, error } = await supabase
    .from('projects')
    .insert([
      { 
        user_id: user.id, 
        name: 'Nuevo Proyecto LudoForge',
        game_state: {}
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating project:', error);
    throw new Error('Could not create project');
  }

  redirect(`/editor/${data.id}`);
}

export async function deleteProjectAction(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id); // Double check RLS

  if (error) {
    console.error('Error deleting project:', error);
    throw new Error('Could not delete project');
  }

  revalidatePath('/dashboard');
}
