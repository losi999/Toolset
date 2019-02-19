import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { ThunkDispatch } from 'redux-thunk';
import { login, UserAction } from 'src/actions/userActions';
import Login, { validate } from 'src/components/auth/login/login';
import { LoginDispatchProps, LoginForm, LoginProps, LoginStateProps } from 'src/components/auth/login/propTypes';
import { Store } from 'src/store';
import { LoginRequest } from 'src/types';

const mapDispatchToProps = (dispatch: ThunkDispatch<Store, undefined, UserAction>): LoginDispatchProps => {
    return {
        login(user: LoginRequest) {
            dispatch(login(user));
        },
    };
};

const mapStateToProps = (state: Store): LoginStateProps => {
    return {
        token: state.user.token,
    };
};

export default connect<LoginStateProps, LoginDispatchProps, {}, Store>(mapStateToProps, mapDispatchToProps)(
    reduxForm<LoginForm, LoginProps>({
        form: 'login',
        validate,
    })(Login));
