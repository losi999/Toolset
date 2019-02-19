import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { ThunkDispatch } from 'redux-thunk';
import { registration, UserAction } from 'src/actions/userActions';
import { RegistrationDispatchProps, RegistrationForm, RegistrationProps, RegistrationStateProps } from 'src/components/auth/registration/propTypes';
import Registration, { validate, warn } from 'src/components/auth/registration/registration';
import { Store } from 'src/store';
import { RegistrationRequest } from 'src/types';

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
