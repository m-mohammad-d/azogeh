export interface Token {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export default interface Auth {
  userInfo?: Token;
}
