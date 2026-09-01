declare module 'next-auth/providers/steam' {
  import { OAuthConfig } from 'next-auth/providers';
  
  export default function SteamProvider(
    options: any
  ): OAuthConfig<any>;
}