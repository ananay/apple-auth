// https://developer.apple.com/documentation/signinwithapplerestapi/tokenresponse
export declare interface AppleAuthAccessToken {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  token_type: "bearer";
}

// https://developer.apple.com/documentation/signinwithapplerestapi/errorresponse
export declare interface AppleAuthError {
  error: "invalid_request" | "invalid_client" | "invalid_grant" | "unauthorized_client" | "unsupported_grant_type" | "invalid_scope";
}

export declare interface AppleAuthConfig {
  client_id: string;
  team_id: string;
  redirect_uri: string;
  key_id: string;
  scope: string;
}

export declare type KeyMethod = 'file' | 'text';
