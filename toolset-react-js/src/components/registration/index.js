import Registration, { validate, warn } from './registration';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { registration } from './../../actions/userActions';

const mapDispatchToProps = dispatch => {
    return {
        registration(user) {
            dispatch(registration(user));
        }
    }
}

export default withRouter(reduxForm({
    form: 'registration',
    validate,
    warn
})(connect(null, mapDispatchToProps)(Registration)));
