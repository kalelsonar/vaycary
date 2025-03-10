import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Col } from 'react-bootstrap';
import cx from 'classnames';
import messages from '../../locale/messages';
import s from './ListPlaceTips.css';

class ListPlaceTips extends React.Component {

  render() {
    const { sideMenuData } = this.props;
    
    return (
      <Col xs={12} sm={5} md={5} lg={5} xsHidden>
        <div className={s.helpPanelContainer}>
          <div className={cx(s.helpPanel, 'bgBlack')}>
            <div className={cx(s.helpPanelText, 'textWhite')}>
              {
                sideMenuData && sideMenuData.length > 0 && sideMenuData.map((item,key)=>{
                  return(
                  <p key={key}>
                    <span className={cx(s.helpPanelTextTitle, 'textWhite')}>
                      {item.title}
                    </span>
                    <span>
                    {item.description}
                    </span>
                  </p>
                  )
                })
              }
            </div>
          </div>
        </div>
      </Col>
    );
  }
}

const mapState = (state) => ({
  sideMenuData: state.sideMenu.data
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ListPlaceTips)));
