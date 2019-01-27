import Login from './login';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login } from './../../actions/userActions';

const mapDispatchToProps = dispatch => {
    return {
        login(user) {
            dispatch(login(user));
        }
    }
}

export default withRouter(reduxForm({
    form: 'login'
})(connect(null, mapDispatchToProps)(Login)));
