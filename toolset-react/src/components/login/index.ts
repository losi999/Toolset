import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { LoginRequest } from '../../types';
import { login, UserAction } from './../../actions/userActions';
import Login, { validate } from './login';
import { ThunkDispatch } from 'redux-thunk';
import { LoginDispatchProps, LoginStateProps, LoginForm, LoginProps } from './propTypes';
import { Store } from '../../store';

const mapDispatchToProps = (dispatch: ThunkDispatch<Store, undefined, UserAction>): LoginDispatchProps => {
    return {
        login(user: LoginRequest) {
            dispatch(login(user));
        },
    };
};

const mapStateToProps = (state: Store): LoginStateProps => {
    return {
        token: state.user.token
    };
};

export default connect<LoginStateProps, LoginDispatchProps, {}, Store>(mapStateToProps, mapDispatchToProps)(
    reduxForm<LoginForm, LoginProps>({
        form: 'login',
        validate
    })(Login));
