import React from 'react';
import { FormattedMessage, injectIntl } from "react-intl";

import {
    Field,
    reduxForm
} from "redux-form";

import Form from "react-bootstrap/lib/Form";
import Button from "react-bootstrap/lib/Button";
import messages from "../../../locale/messages";

import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";

import s from "./SearchHeader.css";

class MobileFilter extends React.Component {


    render() {
        const { formatMessage } = this.props.intl;
        const { renderPlacesSuggest, filterIcon, handleOpen, isActiveMoreFilter, isActiveFilter } = this.props;

        return (
            <div className={s.modileFilterSection}>
                <Form>
                    <Field
                        name="placeSuggest"
                        component={renderPlacesSuggest}
                        autoComplete="off"
                        label={formatMessage(messages.homeWhere)}
                    />
                </Form>
                <Button
                    className={cx(
                        "searchBtnDark",
                        isActiveMoreFilter ? s.btnSecondary : s.filterBtn
                    )}
                    onClick={handleOpen}
                >
                    <span className={cx(s.btnFlex, 'svgImg')}>
                        <span className="hidden-xs"><FormattedMessage {...messages.filters} /></span>
                        <img src={filterIcon} />
                    </span>
                </Button>
            </div>
        );
    }
}

MobileFilter = reduxForm({
    form: "LocationSearchForm", // a unique name for this form
    destroyOnUnmount: false,
})(MobileFilter);

export default injectIntl(withStyles(s)(MobileFilter));