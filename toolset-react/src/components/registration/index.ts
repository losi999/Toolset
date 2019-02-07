import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { registration, UserAction } from './../../actions/userActions';
import Registration, { validate, warn } from './registration';
import { RegistrationDispatchProps, RegistrationForm } from './propTypes';
import { UserState } from '../../reducers/userReducer';
import { ThunkDispatch } from 'redux-thunk';
import { RegistrationRequest } from '../../types';

const mapDispatchToProps = (dispatch: ThunkDispatch<UserState, undefined, UserAction>): RegistrationDispatchProps => {
    return {
        registration(user: RegistrationRequest) {
            dispatch(registration(user));
        },
    };
};

export default connect<{}, RegistrationDispatchProps>(null, mapDispatchToProps)(
    reduxForm<RegistrationForm, RegistrationDispatchProps>({
    form: 'registration',
    validate,
    warn,
})(Registration));
