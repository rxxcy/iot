import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TOKEN_SECRET, TOKEN_REFRESH_EXPIRE } from '../constant';

@Injectable()
export class UserAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(id: number) {
    const payload = { id };

    const accessToken = this.jwtService.sign(payload, {
      secret: TOKEN_SECRET,
      expiresIn: TOKEN_REFRESH_EXPIRE,
    });

    // const refreshToken = this.jwtService.sign(payload, {
    //   secret: TOKEN_SECRET,
    //   expiresIn: TOKEN_REFRESH_EXPIRE,
    // });
    return accessToken;
  }

  verifyAccessToken(accessToken: string) {
    try {
      const payload = this.jwtService.verify(accessToken, {
        secret: TOKEN_SECRET,
      });
      return payload;
    } catch (err) {
      return null;
    }
  }
}
