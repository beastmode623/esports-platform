declare module 'passport-steam' {
  import { Strategy } from 'passport';
  
  export class Strategy extends Strategy {
    constructor(options: any, verify: any);
  }
}