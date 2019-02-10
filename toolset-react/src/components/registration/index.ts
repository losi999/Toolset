import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { registration, UserAction } from './../../actions/userActions';
import Registration, { validate, warn } from './registration';
import { RegistrationDispatchProps, RegistrationForm, RegistrationStateProps, RegistrationProps } from './propTypes';
import { ThunkDispatch } from 'redux-thunk';
import { RegistrationRequest } from '../../types';
import { Store } from '../../store';

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
