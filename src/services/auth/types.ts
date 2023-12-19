export interface AuthDto {
  email: string;
  id: number;
  imageUrl: string;
  name: string;
  token: AuthTokenDto;
}

export interface AuthTokenDto {
  accessToken: string;
  expiration: string;
  refreshToken: string;
}
