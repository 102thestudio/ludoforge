import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CreateProjectButton } from './CreateProjectButton';
import { DeleteProjectButton } from './DeleteProjectButton';

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch user projects
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('updated_at', { ascending: false });

  return (
    <div className="min-h-screen bg-[#070709] text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black tracking-wider text-zinc-100 uppercase">LudoForge</h1>
            <p className="text-sm text-zinc-400 mt-1">Tus proyectos de diseño</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-[#18181f] px-4 py-2 rounded-full border border-[#222228]">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium">{user.email}</span>
            </div>
          </div>
        </header>

        <main>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-xl font-bold">Proyectos Recientes</h2>
            <CreateProjectButton />
          </div>

          {projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="group bg-[#111115] border border-[#222228] rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all shadow-lg hover:shadow-indigo-500/10 flex flex-col">
                  <div className="h-40 bg-zinc-900 relative">
                    {/* Placeholder for project preview */}
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-800">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg mb-1 truncate">{project.name}</h3>
                    <p className="text-xs text-zinc-500 mb-4">Actualizado {new Date(project.updated_at).toLocaleDateString()}</p>
                    
                    <div className="mt-auto flex gap-2">
                      <Link 
                        href={`/editor/${project.id}`}
                        className="flex-1 text-center py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-semibold transition-colors"
                      >
                        Abrir
                      </Link>
                      <DeleteProjectButton id={project.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#111115] rounded-3xl border border-[#222228] border-dashed">
              <div className="w-16 h-16 mx-auto bg-zinc-900 rounded-2xl flex items-center justify-center mb-4 text-zinc-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              </div>
              <h3 className="text-lg font-bold mb-2">No tienes proyectos</h3>
              <p className="text-zinc-500 mb-6 max-w-sm mx-auto">Empieza tu primer juego de mesa Print & Play con nuestras plantillas predefinidas.</p>
              <CreateProjectButton />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
