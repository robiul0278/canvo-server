import { registerAs } from '@nestjs/config';

export default registerAs('nextauth', () => ({
  secret: process.env.NEXTAUTH_SECRET || '',
}));
