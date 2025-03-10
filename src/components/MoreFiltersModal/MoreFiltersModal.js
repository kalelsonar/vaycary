import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Modal } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { change, reduxForm, submit as submitForm } from 'redux-form';

import MoreFilters from '../SearchListing/Filters/MoreFilters';

import messages from '../../locale/messages';
import { closeMoreFiltersModal } from '../../actions/modalActions';
import { setPersonalizedValues } from "../../actions/personalized";

import s from './MoreFiltersModal.css';

class MoreFiltersModal extends Component {
    static propTypes = {
        filtersModal: PropTypes.bool,
        closeMoreFiltersModal: PropTypes.func,
    };

    handleModalClose = async () => {
        const { closeMoreFiltersModal, change, submitForm } = this.props;
        await change("currentPage", 1);
        submitForm('SearchForm');
        closeMoreFiltersModal();
        window.scrollTo({
            top: 0,
            left: 0
        });
    };

    render() {
        const { handleTabToggle, isExpand, searchSettings, smallDevice, filtersModal } = this.props;
        const { tabletDevice, verySmallDevice, showFilter, showResults } = this.props;

        return (
            <div>
                <Modal
                    show={filtersModal}
                    animation={false}
                    onHide={this.handleModalClose}
                    dialogClassName={cx(s.logInModalContainer, 'moreFilterModal', 'moreFilter')}
                    backdrop="static"
                >
                    <Modal.Header closeButton className={s.panelHeader} >
                        <Modal.Title>
                            <span><FormattedMessage {...messages.filters} /></span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body bsClass={s.logInModalBody}>
                        <div>
                            <MoreFilters
                                handleTabToggle={handleTabToggle}
                                isExpand={isExpand}
                                searchSettings={searchSettings}
                                smallDevice={smallDevice}
                                tabletDevice={tabletDevice}
                                verySmallDevice={verySmallDevice}
                                showFilter={showFilter}
                                showResults={showResults}
                                handleReset={this.handleReset}
                            />
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

MoreFiltersModal = reduxForm({
    form: "SearchForm",
    destroyOnUnmount: false,
})(MoreFiltersModal);

const mapState = state => ({
    filtersModal: state?.modalStatus?.isMoreFiltersModal,
    userData: state?.account?.data,
    fieldsSettingsData: state?.listingFields?.data
});

const mapDispatch = {
    closeMoreFiltersModal,
    change,
    setPersonalizedValues,
    submitForm
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(MoreFiltersModal)));