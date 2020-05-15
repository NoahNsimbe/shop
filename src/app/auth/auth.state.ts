import { State, Action, StateContext, Select, Selector, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AuthStateModel, UserModel } from './auth.models';
import { Login, Logout, RefreshToken, Register, SetUser, ResetAuth } from './auth.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Injectable } from '@angular/core';

// export interface AuthStateModel {
//     username: string | null;
//     access: string | null;
//     refresh: string | null;
// }

const defaults: AuthStateModel = {
    access: null,
    refresh: null,
    user: null,
};

@State<AuthStateModel>({
    name: 'auth',
    defaults
})
@Injectable()
export class AuthState {

    @Selector()
    static token(state: AuthStateModel): string | null {
        return state.access;
    }

    @Selector()
    static isAuthenticated(state: AuthStateModel): boolean {
        return !!state.access;
    }

    constructor(private _router: Router, private authService: AuthService, private _snackBar: MatSnackBar) {}

    @Action(Login)
    login(ctx: StateContext<AuthStateModel>, action: Login) {
        return this.authService.login(action.payload).pipe(
        tap((response: {refresh: string, access: string}) => {        
            ctx.patchState({
                access: response.access,
                refresh: response.refresh,
            });
            this._router.navigate(['']);
            // ctx.dispatch(new SetUser());
        }, (error: any) => {
            this._snackBar.open(`${error}`);
        })
        );
    }
//3ANJUXJB5U
    @Action(Register)
    register(ctx: StateContext<AuthStateModel>, action: Register) {
        return this.authService.register(action.payload.user).pipe(
        tap((user: UserModel) => {
            ctx.patchState({user : user});
            this._router.navigate(['']);
        }, (error: any) => {
            this._snackBar.open(`${error}`);
        })
        );
    }

    @Action(ResetAuth)
    resetAuth(ctx: StateContext<AuthStateModel>){
        ctx.setState({        
            access: null,
            refresh: null,
            user: null
        });
    }

    @Action(SetUser)
    setUser(ctx: StateContext<AuthStateModel>) {
        return this.authService.getUser().pipe(
            tap((user: any) => {
                console.log(user)
            }, (error: any) => {
                this._snackBar.open(`${error}`);
            })
        );
    }

    @Action(Logout)
    logout(ctx: StateContext<AuthStateModel>) {
        const state = ctx.getState();
        return this.authService.logout(state.access).pipe(
        tap(() => {
            ctx.setState({
                access: null,
                user: null,
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
