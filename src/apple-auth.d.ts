import { AppleAuthConfig, KeyMethod, AppleAuthAccessToken } from './interfaces';
import { AppleClientSecret } from './token';

declare class AppleAuth {
  protected _config: AppleAuthConfig;
  protected _state: string;
  protected _tokenGenerator: AppleClientSecret;
  public readonly state: string;

  constructor(config: AppleAuthConfig, privateKeyLocation: string, privateKeyMethod: KeyMethod)
  loginURL(): string;
  accessToken(code: string): Promise<AppleAuthAccessToken>;
  refreshToken(refreshToken: string): Promise<AppleAuthAccessToken>;
}

export default AppleAuth;
