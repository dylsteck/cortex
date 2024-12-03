'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Model } from '@/lib/model';

import { ModelSelector } from './model-selector';

export function SidebarSettingsDialog({
  username,
  isOpen,
  selectedModelName,
  onClose,
}: {
  username: string;
  isOpen: boolean;
  selectedModelName: Model['name'];
  onClose: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6 max-w-lg bg-white dark:bg-black text-black dark:text-white">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white">Settings</DialogTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your account settings</p>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Username</Label>
            <Input
              type="text"
              value={username ?? "username"}
              disabled
              className="mt-1 w-full cursor-not-allowed bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-300 dark:placeholder:text-gray-500"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Username cannot be edited at this time</p>
          </div>
          <div className="flex flex-col gap-2 items-start">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Model</Label>
            <ModelSelector
              selectedModelName={selectedModelName}
              className="mt-1 w-auto bg-white dark:bg-gray-800 text-black dark:text-gray-300"
            />
          </div>
          {/* TODO: Add delete chat history functionality */}
          {/* <div className="flex flex-col gap-2 items-start">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">History</Label>
            <Button variant="default" className="text-white bg-red-600 dark:bg-red-500">Delete Chat History</Button>
          </div> */}
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" className="text-gray-700 dark:text-gray-300 bg-white dark:bg-black" onClick={onClose}>Cancel</Button>
            <Button variant="default" className="text-white bg-gray-900 dark:bg-gray-600">Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
