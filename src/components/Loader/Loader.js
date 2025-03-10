import React, { Component } from 'react';
import { flowRight as compose } from 'lodash';
import { PropTypes } from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import TextLoader from './TextLoader';
import FullPageLoader from './FullPageLoader';
import ButtonLoader from './ButtonLoader';
import CircleLoader from './CircleLoader';

import s from './Loader.css';
class Loader extends Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    children: PropTypes.node,
    show: PropTypes.bool,
    loadingText: PropTypes.string,
    label: PropTypes.string,
    buttonType: PropTypes.string,
    handleClick: PropTypes.any,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    spinnerColor: PropTypes.string,
  };

  static defaultProps = {
    type: 'text',
    containerClass: null
  };

  render() {
    const { type, loadingText, children, show, label, arClassName } = this.props;
    const { buttonType, handleClick, className, disabled, loaderClass } = this.props;
    const { spinnerColor, containerClass } = this.props;

    return (
      <div className={cx(containerClass)}>
        {
          type === "text" && <TextLoader loadingText={loadingText} className={loaderClass} />
        }
        {
          type === "page" && <FullPageLoader children={children} show={show} />
        }
        {
          type === "button" && <ButtonLoader
            label={label}
            show={show}
            type={buttonType}
            handleClick={handleClick}
            className={className}
            disabled={disabled}
            spinnerColor={spinnerColor}
          />
        }
        {
          type === "circle" && <CircleLoader className={arClassName} show={show} />
        }
      </div>
    );
  }
}

export default compose(withStyles(s))(Loader);

