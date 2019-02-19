import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { ThunkDispatch } from 'redux-thunk';
import { AuthAction, login } from 'src/actions/authActions';
import Login, { validate } from 'src/components/auth/login/login';
import { LoginDispatchProps, LoginForm, LoginProps, LoginStateProps } from 'src/components/auth/login/propTypes';
import { Store } from 'src/store';
import { LoginRequest } from 'src/types';

const mapDispatchToProps = (dispatch: ThunkDispatch<Store, undefined, AuthAction>): LoginDispatchProps => {
    return {
        login(user: LoginRequest) {
            dispatch(login(user));
        },
    };
};

const mapStateToProps = (state: Store): LoginStateProps => {
    return {
        token: state.auth.token,
    };
};

export default connect<LoginStateProps, LoginDispatchProps, {}, Store>(mapStateToProps, mapDispatchToProps)(
    reduxForm<LoginForm, LoginProps>({
        form: 'login',
        validate,
    })(Login));
