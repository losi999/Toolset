import Login, { validate } from './login';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login } from './../../actions/userActions';

const mapDispatchToProps = (dispatch: any) => {
    return {
        login(user: any) {
            dispatch(login(user));
        }
    }
}

export default withRouter(reduxForm<any, any>({
    form: 'login',
    validate
})(connect(null, mapDispatchToProps)(Login)));
