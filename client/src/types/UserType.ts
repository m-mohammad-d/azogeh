interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  photo: string;
  createdAt?: string;
  updatedAt?: string;
  passwordChangedAt?: string;
  passwordResetExpires?: string;
  passwordResetToken?: string;
}

export interface GetAllUsersResponse {
  status: string;
  results: number;
  pagination: null | number;
  data: {
    users: UserProfile[];
  };
}

export interface GetMeResponse {
  status: string;
  data: {
    user: UserProfile;
  };
}
