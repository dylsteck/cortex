import { cookies } from 'next/headers';

import { AppSidebar } from '@/components/custom/app-sidebar';
import FrameProvider from '@/components/custom/frame-provider';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { DEFAULT_MODEL_NAME, models } from '@/lib/model';

import { auth } from '../(auth)/auth';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, cookieStore] = await Promise.all([auth(), cookies()]);
  const isCollapsed = cookieStore.get('sidebar:state')?.value !== 'true';
  const modelValue = cookieStore.get('model')?.value;
  const selectedModelName = models.find((m) => m.name === modelValue)?.name || DEFAULT_MODEL_NAME;

  return (
    <SidebarProvider defaultOpen={!isCollapsed}>
      <AppSidebar user={session?.user} selectedModelName={selectedModelName} />
      <SidebarInset>
        <FrameProvider>
          {children}
        </FrameProvider>
      </SidebarInset>
    </SidebarProvider>
  );
}
