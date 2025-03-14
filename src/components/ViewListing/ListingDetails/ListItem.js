import React from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingDetails.css';
import {
  Row,
  Col,
  Collapse,
  Button
} from 'react-bootstrap';
import cx from 'classnames';

//Images
import IconDefault from '/public/SiteIcons/defaultIcon.png';
import rulesIcon from '/public/SiteIcons/houseRulesArrow.svg';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
import * as FontAwesome from 'react-icons/lib/fa';

import { url } from '../../../config';

class ListItem extends React.Component {
  static propTypes = {
    itemList: PropTypes.arrayOf(PropTypes.shape({
      listsettings: PropTypes.shape({
        itemName: PropTypes.string,
        settingsType: PropTypes.shape({
          typeName: PropTypes.string
        }),
      }),
      spacesId: PropTypes.string,
    })).isRequired,
    label: PropTypes.string.isRequired,
  };

  static defaultProps = {
    itemList: [],
    showLabel: 'Show More Description',
    hideLabel: 'Hide Description',
    icon: false
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick() {
    this.setState({ open: !this.state.open })
  }

  render() {
    const { itemList, label, showLabel, hideLabel, icon, houseRulesIcon } = this.props;
    const { open } = this.state;

    let count = 4, firstArray, restArray, dotString = false;

    let itemListData = itemList && itemList.length > 0 ? itemList.filter(o => o.listsettings.isEnable == "1") : [];


    if (itemListData) {
      firstArray = itemListData.slice(0, count);
      restArray = itemListData.slice(count, itemListData.length);
    }
    if (restArray && restArray.length > 0) {
      dotString = true;
    }

    return (
      <div className={cx(s.horizontalLineThrough)}>
        <div className={cx(s.space1)}>
          <p className={cx(s.sectionTitleText)}> {label} </p>
        </div>
        <div className={cx(s.spaceTop1, "listItemFlexContainer")}>
          {
            firstArray.map((item, key) => {
              if (item.listsettings.isEnable === "1") {
                return (
                  <div
                    key={key}
                    className={cx(s.splitList, s.vtrTop, s.space2, "listItemFlexWrapper")}
                  >
                    {icon && <span className={cx(s.listIcon, 'listIconRtl')}>
                      {
                        item.listsettings.image ?
                          <img src={url + '/images/amenities/' + item.listsettings.image} className={cx(s.imgSection, 'darkModeFilterNone')} /> :
                          <img src={IconDefault} className={cx(s.imgSection)} />
                      }

                    </span>}
                    {houseRulesIcon && <span className='svgImg'>
                      <img src={rulesIcon} className={cx(s.rulesIconCss, 'rulesIconCssRTL')} />
                    </span>}
                    <span className={cx(s.text, s.overflowText, s.listContent)}>
                      {item.listsettings && item.listsettings.itemName}
                    </span>
                  </div>
                )
              }
            })
          }
          <Collapse className={cx(s.collapseContainer)} in={open}>
            <div>
              <div className='listCollapseContainer'>
                {
                  restArray && restArray.length > 0 && restArray.map((item, key) => {
                    if (item.listsettings.isEnable === "1") {
                      return (
                        <p
                          key={key}
                          className={cx(s.splitList, s.vtrTop, "listItemFlexWrapper")}
                        >
                          {icon && <span className={cx(s.listIcon, 'listIconRtl')}>
                            {
                              item.listsettings.image ?
                                <img src={url + '/images/amenities/' + item.listsettings.image} className={cx(s.imgSection, 'darkModeFilterNone')} /> :
                                <img src={IconDefault} className={cx(s.imgSection)} />
                            }
                          </span>}
                          {houseRulesIcon && <span className='svgImg'>
                            <img src={rulesIcon} className={cx(s.rulesIconCss, 'rulesIconCssRTL')} />
                          </span>}
                          <span className={cx(s.text, s.overflowText, s.listContent)}>
                            {item.listsettings && item.listsettings.itemName}
                          </span>
                        </p>
                      )
                    }
                  })
                }
              </div>
            </div>
          </Collapse>
          {
            dotString && <div className={cx(s.showHideMargin, 'listShowBtn')}>
              <Button
                bsStyle="link"
                type="button"
                className={cx(s.btn, s.btnLink, s.btnLinkSecondary, s.toggleLink, s.showHideBtn, s.noPadding)}
                onClick={() => this.handleClick()}
              >
                {this.state.open ? hideLabel : showLabel}
                {
                  this.state.open && <FontAwesome.FaAngleUp className={s.toggleIcon} />
                }
                {
                  !this.state.open && <FontAwesome.FaAngleDown className={s.toggleIcon} />
                }
              </Button>
            </div>
          }
        </div>
      </div>
    );
  }

}

export default injectIntl(withStyles(s)(ListItem));