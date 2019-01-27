import Register from './register';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { register } from './../../actions/userActions';

// const validate = values => {
//     const errors = {};

//     console.log(values);
//     if ((values.username || '').length < 4) {
//         errors.username = 'Username too short';
//     }

//     return errors;
// };

const mapDispatchToProps = dispatch => {
    return {
        register(user) {
            dispatch(register(user));
        }
    }
}

export default withRouter(reduxForm({
    form: 'register',
    // validate
})(connect(null, mapDispatchToProps)(Register)));
