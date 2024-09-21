import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AmIConnectedGuard implements CanActivate {
    constructor(@Inject(UsersService) private userService: UsersService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return new Promise(async (resolve, reject) => {
            const req = context.switchToHttp().getRequest();
            const owner = req?.headers['x-auth'] || '';
            const userExists = await this.userService.findOne(owner);
            if (userExists?.username) resolve(true);
            resolve(false);
        });
    }
}
