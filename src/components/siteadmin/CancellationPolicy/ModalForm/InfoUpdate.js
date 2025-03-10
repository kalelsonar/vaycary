import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ModalForm.css';
import cs from '../../../../components/commonStyle.css';
import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';

// Style
import {
	Button,
	Row,
	FormGroup,
	Col,
	FormControl,
} from 'react-bootstrap';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../../locale/messages';
import InputFieldComponent from '../../../Common/FormField/InputFieldComponent';


class InfoUpdate extends React.Component {

	static propTypes = {
		title: PropTypes.string.isRequired,
		initialValues: PropTypes.object,
	};

	static defaultProps = {
		data: []
	};

	render() {
		const { error, handleSubmit, submitting } = this.props;
		const { formatMessage } = this.props.intl;

		return (
			<div>
				<form onSubmit={handleSubmit(submit)}>
					{error && <strong>{formatMessage(error)}</strong>}
					<Field name="cancellationInfo" type="text" component={InputFieldComponent} componentClass={'textarea'} inputClass={cx(cs.requiedBorder, 'requiedBorderRTL')} />
					<FormGroup className={s.noMargin}>
						<Row>
							<Col xs={12} sm={12} md={12} lg={12} className={cx(cs.textAlignRight, 'textAlignLeft')}>
								<Button bsSize="small" className={cx(cs.btnPrimary, cs.btnlarge)} type="submit" disabled={submitting} >
									<FormattedMessage {...messages.save} />
								</Button>
							</Col>
						</Row>
					</FormGroup>
				</form>
			</div>
		);
	}

}

InfoUpdate = reduxForm({
	form: 'InfoUpdateForm', // a unique name for this form
	validate
})(InfoUpdate);

const mapState = (state) => ({});

const mapDispatch = {};

export default injectIntl(withStyles(s, cs)(connect(mapState, mapDispatch)(InfoUpdate)));