import Register, { validate, warn } from './register';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { register } from './../../actions/userActions';

const mapDispatchToProps = dispatch => {
    return {
        register(user) {
            dispatch(register(user));
        }
    }
}

export default withRouter(reduxForm({
    form: 'register',
    validate,
    warn
})(connect(null, mapDispatchToProps)(Register)));
