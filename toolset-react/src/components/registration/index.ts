import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { ThunkDispatch } from 'redux-thunk';
import { Store } from '../../store';
import { RegistrationRequest } from '../../types';
import { registration, UserAction } from './../../actions/userActions';
import { RegistrationDispatchProps, RegistrationForm, RegistrationProps, RegistrationStateProps } from './propTypes';
import Registration, { validate, warn } from './registration';

const mapDispatchToProps = (dispatch: ThunkDispatch<Store, undefined, UserAction>): RegistrationDispatchProps => {
    return {
        registration(user: RegistrationRequest) {
            dispatch(registration(user));
        },
    };
};

export default connect<RegistrationStateProps, RegistrationDispatchProps, {}, Store>(null, mapDispatchToProps)(
    reduxForm<RegistrationForm, RegistrationProps>({
        form: 'registration',
        validate,
        warn,
    })(Registration));
