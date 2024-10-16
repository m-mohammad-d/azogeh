interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface GetMeResponse {
  status: string;
  data: {
    user: UserProfile;
  };
}
