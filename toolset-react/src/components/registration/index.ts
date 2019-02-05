import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { registration } from './../../actions/userActions';
import Registration, { validate, warn } from './registration';

const mapDispatchToProps = (dispatch: any) => {
    return {
        registration(user: any) {
            dispatch(registration(user));
        },
    };
};

export default withRouter(reduxForm<any, any>({
    form: 'registration',
    validate,
    warn,
})(connect(null, mapDispatchToProps)(Registration)));
