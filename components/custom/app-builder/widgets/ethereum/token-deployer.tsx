import Image from 'next/image';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TokenDeployerProps {
  contractAddress?: string;
  platform?: 'clanker' | 'wow';
}

export function TokenDeployerWidget({ 
  platform = 'clanker' 
}: TokenDeployerProps) {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<'clanker' | 'wow'>(platform);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleDeploy = () => {
   // todo: implement logic and finish the component/widget
  };

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label>Token Image</Label>
        <Input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          className="mt-2" 
        />
        {image && (
          <div className="mt-2">
            <Image 
              src={URL.createObjectURL(image)} 
              alt="Token Preview" 
              width={100} 
              height={100} 
              className="rounded-md" 
            />
          </div>
        )}
      </div>

      <div>
        <Label>Token Name</Label>
        <Input 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter token name"
          className="mt-2" 
        />
      </div>

      <div>
        <Label>Token Description</Label>
        <Input 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter token description"
          className="mt-2" 
        />
      </div>

      <div>
        <Label>Platform</Label>
        <Select 
          value={selectedPlatform}
          onValueChange={(value: 'clanker' | 'wow') => setSelectedPlatform(value)}
        >
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Select Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="clanker">Clanker</SelectItem>
            <SelectItem value="wow">WOW</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button 
        onClick={handleDeploy} 
        disabled={!name || !description || !image}
        className="w-full mt-4"
      >
        Deploy Token
      </Button>
    </div>
  );
}