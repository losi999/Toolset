import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { UserState } from '../../reducers/userReducer';
import { LoginRequest } from '../../types';
import { login } from './../../actions/userActions';
import Login, { validate } from './login';

const mapDispatchToProps = (dispatch: any) => {
    return {
        login(user: LoginRequest) {
            dispatch(login(user));
        },
    };
};

const mapStateToProps = (state: { user: UserState }) => {
    return {
        error: state.user.error,
        token: state.user.token,
    };
};

export default withRouter(reduxForm<any, any>({
    form: 'login',
    validate,
})(connect(mapStateToProps, mapDispatchToProps)(Login)));
