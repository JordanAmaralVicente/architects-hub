import { Controller, Headers, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  /**
   * This router update user information and verify token
   * @param authorization
   */
  @UseGuards(JwtAuthGuard)
  @Post('/verify')
  verifyToken(@Headers('Authorization') authorization: string) {
    const token = this.parseAuthorizationHead(authorization);

    return this.authService.validateToken(token);
  }

  private parseAuthorizationHead(authorization: string) {
    try {
      return authorization.split('Bearer ')[1];
    } catch {
      throw new Error('Invalid Authorization token received');
    }
  }
}
