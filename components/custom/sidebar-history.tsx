'use client';

import { HomeIcon, InfoIcon, MoreHorizontalIcon, TrashIcon, UserIcon, Plus } from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { type User } from 'next-auth';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import useSWR from 'swr';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Chat } from '@/db/schema';
import { fetcher, getTitleFromChat } from '@/lib/utils';

export function SidebarHistory({ user }: { user: User | undefined }) {
  const { setOpenMobile } = useSidebar();
  const { id } = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const { data: history = [], isLoading, mutate } = useSWR<Array<Chat>>(user ? '/api/history' : null, fetcher, {
    fallbackData: [],
  });

  useEffect(() => {
    mutate();
  }, [pathname, mutate]);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    const deletePromise = fetch(`/api/chat?id=${deleteId}`, {
      method: 'DELETE',
    });
    toast.promise(deletePromise, {
      loading: 'Deleting chat...',
      success: () => {
        mutate((currentHistory = []) => currentHistory.filter((h) => h.id !== deleteId));
        if (pathname !== '/') {
          router.push('/');
        }
        return 'Chat deleted successfully';
      },
      error: 'Failed to delete chat',
    });
    setShowDeleteDialog(false);
  };

  return (
    <>
      <SidebarGroup>
        <SidebarMenu className="mb-5">
          <SidebarMenuItem>
            <Link href="/">
              <SidebarMenuButton>
                <Plus size={10} />
                <span>New Chat</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarGroupLabel>Chat History</SidebarGroupLabel>
        <SidebarGroupContent>
          {!user ? (
            <div className="text-zinc-500 h-dvh w-full flex flex-row justify-center items-center text-sm gap-2">
              <InfoIcon />
              <div>Login to save and revisit previous chats!</div>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col">
              {[44, 32, 28, 64, 52].map((width) => (
                <div key={width} className="rounded-md h-8 flex gap-2 px-2 items-center">
                  <div
                    className="h-4 rounded-md flex-1 bg-sidebar-accent-foreground/10"
                    style={{ width: `${width}%` }}
                  />
                </div>
              ))}
            </div>
          ) : history.length === 0 ? (
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <InfoIcon />
                  <span>No chats found</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          ) : (
            <SidebarMenu>
              {history.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton asChild isActive={chat.id === id}>
                    <Link href={`/chat/${chat.id}`} onClick={() => setOpenMobile(false)}>
                      <span>{getTitleFromChat(chat)}</span>
                    </Link>
                  </SidebarMenuButton>
                  <DropdownMenu modal>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        showOnHover={chat.id !== id}
                      >
                        <MoreHorizontalIcon />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="end" className="rounded-xl">
                      <DropdownMenuItem
                        className="text-destructive focus:bg-destructive/15 focus:text-destructive cursor-pointer rounded-xl"
                        onSelect={() => {
                          setDeleteId(chat.id);
                          setShowDeleteDialog(true);
                        }}
                      >
                        <TrashIcon />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          )}
        </SidebarGroupContent>
      </SidebarGroup>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your chat and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}