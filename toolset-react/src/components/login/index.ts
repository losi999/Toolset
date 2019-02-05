import Login, { validate } from './login';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login } from './../../actions/userActions';
import { LoginRequest } from '../../types';
import { UserState } from '../../reducers/userReducer';

const mapDispatchToProps = (dispatch: any) => {
    return {
        login(user: LoginRequest) {
            dispatch(login(user));
        }
    };
};

const mapStateToProps = (state: { user: UserState }) => {
    return {
        error: state.user.error,
        token: state.user.token
    }
}

export default withRouter(reduxForm<any, any>({
    form: 'login',
    validate
})(connect(mapStateToProps, mapDispatchToProps)(Login)));
