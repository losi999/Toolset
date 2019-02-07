import { connect, MapStateToPropsParam } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { UserState } from '../../reducers/userReducer';
import { LoginRequest } from '../../types';
import { login, UserAction } from './../../actions/userActions';
import Login, { validate } from './login';
import { ThunkDispatch } from 'redux-thunk';
import { LoginDispatchProps, LoginStateProps, LoginForm } from './propTypes';

const mapDispatchToProps = (dispatch: ThunkDispatch<UserState, undefined, UserAction>): LoginDispatchProps => {
    return {
        login(user: LoginRequest) {
            dispatch(login(user));
        },
    };
};

const mapStateToProps = (state: { user: UserState }): LoginStateProps => {
    return {
        token: state.user.token
    };
};

export default connect<LoginStateProps, LoginDispatchProps, {}, { user: UserState }>(mapStateToProps, mapDispatchToProps)(reduxForm<LoginForm, LoginStateProps & LoginDispatchProps>({
    form: 'login',
    validate
})(Login));
