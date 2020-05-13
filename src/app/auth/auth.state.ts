import { State, Action, StateContext, Select, Selector, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AuthStateModel } from './auth.models';
import { Login, Logout, RefreshToken, Register } from './auth.actions';
// import { MatSnackBar } from '@angular/material/snack-bar';

// export interface AuthStateModel {
//     username: string | null;
//     access: string | null;
//     refresh: string | null;
// }

const defaults: AuthStateModel = {
    access: null,
    username: null,
    refresh: null
};

@State<AuthStateModel>({
    name: 'auth',
    defaults
})
export class AuthState {

    @Selector()
    static token(state: AuthStateModel): string | null {
        return state.access;
    }

    @Selector()
    static isAuthenticated(state: AuthStateModel): boolean {
        return !!state.access;
    }

    constructor(private authService: AuthService) {}

    @Action(Login)
    login(ctx: StateContext<AuthStateModel>, action: Login) {
        return this.authService.login(action.payload).pipe(
        tap((result: { token: string }) => {
            ctx.patchState({
                access: result.token,
                refresh: result.token,
                username: action.payload.username
            });
        })
        );
    }

    @Action(Register)
    register(ctx: StateContext<AuthStateModel>, action: Register) {
        // return this.authService.login(action.payload).pipe(
        // tap((result: { token: string }) => {
        //     ctx.patchState({
        //         access: result.token,
        //         refresh: result.token,
        //         username: action.payload.username
        //     });
        // })
        // );
    }

    @Action(Logout)
    logout(ctx: StateContext<AuthStateModel>) {
        const state = ctx.getState();
        return this.authService.logout(state.access).pipe(
        tap(() => {
            ctx.setState({
                access: null,
                username: null,
                refresh: null
            });
        })
        );
    }

    @Action(RefreshToken)
    refreshToken(ctx: StateContext<AuthStateModel>, action: RefreshToken) {
        ctx.patchState({access: action.payload.access})
    }
}
