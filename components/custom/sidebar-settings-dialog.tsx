'use client';
import { useState } from 'react';
import { toast } from 'sonner';

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
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function SidebarSettingsDialog({
  username,
  isOpen,
  onClose,
}: {
  username: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch('/api/history', { method: 'DELETE' });
      if (response.ok) {
        toast.success('Chat history deleted successfully');
      } else {
        toast.error('Failed to delete chat history');
      }
    } catch (error) {
      console.error('Error deleting chat history:', error);
      toast.error('An error occurred while deleting chat history');
    }
    setShowDeleteDialog(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="p-6 max-w-lg bg-white dark:bg-black text-black dark:text-white rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white">Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Username</Label>
              <p className="text-md text-black dark:text-white mt-1">
                {username}
              </p>
            </div>
            <div className="flex flex-col gap-2 items-start">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">History</Label>
              <Button 
                variant="destructive"
                onClick={() => setShowDeleteDialog(true)}
                className="rounded-xl"
              >
                Clear History
              </Button>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" className="text-gray-700 dark:text-gray-300 bg-white dark:bg-black rounded-xl" onClick={onClose}>Cancel</Button>
              <Button 
                variant="default" 
                className="text-white bg-gray-900 dark:bg-gray-600 rounded-xl" 
                onClick={onClose}
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              chat history and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
