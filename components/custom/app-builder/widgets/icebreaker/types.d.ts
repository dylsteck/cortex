export type IcebreakerChannel = {
    type: string;
    isVerified?: boolean;
    isLocked?: boolean;
    value?: string;
    url?: string;
  };
  
  export type IcebreakerCredential = {
    name: string;
    chain: string;
    source?: string;
    reference?: string;
  };
  
  export type IcebreakerHighlight = {
    title?: string;
    url?: string;
  };
  
  export type IcebreakerWorkExperience = {
    jobTitle?: string;
    orgWebsite?: string;
    employmentType?: string;
    startDate?: string;
    endDate?: string;
    location?: string;
    isVerified?: boolean;
  };
  
  export type IcebreakerEvent = {
    id: string;
    source: string;
    name: string;
    description?: string;
    eventUrl?: string;
    imageUrl?: string;
  };
  
  export type IcebreakerGuildMembership = {
    guildId: number;
    roleIds: number[];
    isAdmin: boolean;
    isOwner: boolean;
    joinedAt: Date;
  };
  
  export type IcebreakerProfile = {
    profileID?: string;
    walletAddress: string;
    avatarUrl?: string;
    displayName?: string;
    jobTitle?: string;
    bio?: string;
    location?: string;
    primarySkill?: string;
    networkingStatus?: string;
    channels?: IcebreakerChannel[];
    credentials?: IcebreakerCredential[];
    highlights?: IcebreakerHighlight[];
    workExperience?: IcebreakerWorkExperience[];
    events?: IcebreakerEvent[];
    guilds?: IcebreakerGuildMembership[];
  };  