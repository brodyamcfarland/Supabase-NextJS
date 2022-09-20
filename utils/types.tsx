import { Dispatch, SetStateAction } from "react";

export interface Message {
    id: string;
    created_at: string;
    content: string;
    profile_id: string;
    profile?: Profile
}

export interface MessagesProps {
    roomId: string;
    profileCache: ProfileCache;
    setProfileCache: Dispatch<SetStateAction<ProfileCache>>;
}

export interface Profile {
    id: string;
    username: string;
}

export interface ProfileCache {
    [userId: string]: Profile
}