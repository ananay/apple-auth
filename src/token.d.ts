import { AppleAuthConfig, KeyMethod } from './interfaces';

export declare class AppleClientSecret{
  protected _config: AppleAuthConfig;
  protected _privateKeyLocation: string;
  protected _privateKeyMethod: KeyMethod;

  protected _generateToken(clientId: string, teamId: string, privateKey: string, exp: number): Promise<string>;
  public generate(): Promise<string>;
}
