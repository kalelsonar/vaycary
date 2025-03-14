import React from 'react';
import PropTypes from 'prop-types';

import history from '../../core/history';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.any,
  };

  static defaultProps = {
    onClick: null,
  };

  componentDidMount() {
    let currentLocation = null;

    history.block((location, action) => {
      const nextLocation = location.pathname + location.search

      if (action === 'PUSH') {
        if (currentLocation === nextLocation) {
          return false
        }
      }

      currentLocation = nextLocation
    })
  }

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
    history.push(this.props.to);
  };

  render() {
    const { to, children, ...props } = this.props;
    return <a href={to} {...props} onClick={this.handleClick}>{children}</a>;
  }
}

export default Link;
