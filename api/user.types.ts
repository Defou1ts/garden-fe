export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type UserProfile = {
  email: string;
  fullName: string;
  profilePhotoUrl: string;
  role: UserRole;
};

export type UpdateUserProfileRequest = {
  fullName?: string;
  profilePhoto?: {
    uri: string;
    name: string;
    type: string;
  };
};
