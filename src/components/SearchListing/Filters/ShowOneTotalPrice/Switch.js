import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
// Redux form
import { change } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!lyef-switch-button/css/main.css';

import * as SwitchButton from 'react-switch';
import { setPersonalizedValues } from '../../../../actions/personalized';
import { SECONDARYCOLOR, BORDERSECONDARY } from '../../../../constants';

export const uncheckedIcon = (
    <svg viewBox="0 0 52 52" fill="currentColor" fillOpacity="0"
        stroke="currentColor" strokeWidth="3"
        role="presentation" strokeLinecap="round" strokeLinejoin="round"
        style={{ position: "absolute", top: 1, left: '2px', height: '26px', width: '26px', display: 'block', transform: 'scale(1.5)' }}>
        <path d="m19.1 19.1 l14 14 m 0 -14 l -14 14"></path>
    </svg>
);

export const checkedIcon = (
    <svg viewBox="0 0 52 52" fill={SECONDARYCOLOR} fillOpacity="0"
        stroke="currentColor" strokeWidth="3"
        role="presentation" strokeLinecap="round" strokeLinejoin="round"
        style={{ position: "absolute", top: 1, left: '6px', height: '26px', width: '26px', display: 'block', transform: 'scale(1.5)' }}>
        <path d="m19.1 25.2 4.7 6.2 12.1-11.2"></path>
    </svg>
);

class Switch extends Component {
    static propTypes = {
        change: PropTypes.any.isRequired,
        formName: PropTypes.string,
        fieldName: PropTypes.string,
        checkedValue: PropTypes.any,
        unCheckedValue: PropTypes.any
    };

    static defaultProps = {
        checked: false,
        checkedValue: true,
        unCheckedValue: false,
        offColor: BORDERSECONDARY,
        onColor: SECONDARYCOLOR,
        checkedIcon: checkedIcon,
        uncheckedIcon: uncheckedIcon,
        height: 30,
        width: 44,
        boxShadow: 'none',
        isPersonalize: false
    };

    constructor(props) {
        super(props);
        this.state = {
            checked: false
        };
    }

    componentDidMount() {
        const { checked } = this.props;
        this.setState({
            checked
        });
    }

    handleCallback = async () => {
        const { change, formName, fieldName, checkedValue, unCheckedValue } = this.props;
        const { personalizedName, setPersonalizedValues } = this.props;
        let type;
        await this.setState({ checked: !this.state.checked });
        type = !this.state.checked ? unCheckedValue : checkedValue;
        await setPersonalizedValues({ name: personalizedName, value: type });
        await change(formName, fieldName, type);
    }

    render() {
        const { offColor, onColor, checkedIcon, uncheckedIcon, height, width, boxShadow } = this.props;
        const { checked } = this.state;

        return (
            <SwitchButton
                id="total-price"
                checked={checked}
                onChange={this.handleCallback}
                offColor={offColor}
                onColor={onColor}
                checkedIcon={checkedIcon}
                uncheckedIcon={uncheckedIcon}
                height={height}
                width={width}
                boxShadow={boxShadow}
                onClick={() => { }}
            />
        );
    }
}
const mapState = (state) => ({
});

const mapDispatch = {
    change,
    setPersonalizedValues
};

export default withStyles(s)(connect(mapState, mapDispatch)(Switch));

