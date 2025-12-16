export type UserProfile = {
  email: string;
  fullName: string;
  profilePhotoUrl: string;
};

export type UpdateUserProfileRequest = {
  fullName?: string;
  profilePhoto?: {
    uri: string;
    name: string;
    type: string;
  };
};
