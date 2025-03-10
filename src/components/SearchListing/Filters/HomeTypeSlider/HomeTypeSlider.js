import React, { Component } from "react";
import {
  reduxForm,
  change,
  submit as submitForm,
  formValueSelector,
} from "redux-form";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from 'classnames';

import SliderCommonComponent from "../../../Common/SliderCommonComponent/SliderCommonComponent";
import Loader from '../../../Loader';
import submit from "../../SearchForm/submit";
import { url } from "../../../../config";
import { isRTL } from '../../../../helpers/formatLocale';

import DefaultIcon from "/public/SiteIcons/defaultIcon.png";

import s from "./HomeTypeSlider.css";

class HomeTypeSlider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    setTimeout(() => { this.setState({ loaded: true }) }, 1)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { locale } = this.props.intl;
    const { locale: prevLocale } = nextProps.intl;
    if (locale !== prevLocale) {
      this.setState({
        loaded: false
      }, () => {
        setTimeout(() => {
          this.setState({
            loaded: true
          })
        }, 1);
      });
    }
  }

  handleSubmitButton = async (e) => {
    const { handleSubmit } = this.props;
    const { change } = this.props;
    let roomType = [];
    roomType?.push(e);

    await change('isActiveRoomType', e)
    await change("roomType", roomType);
    await change("currentPage", 1);
    await handleSubmit();
    window.scrollTo({
      top: 0,
      left: 0
    });
  }

  render() {
    const { roomType, isActiveRoomType, intl: { locale }, updatedLocale } = this.props;
    const { loaded } = this.state;

    let breakPoints = {
      991: {
        slidesPerGroup: 5,
      },
      767: {
        slidesPerGroup: 3,
      }
    };

    return (
      <div className={'homeTypeSwiper'}>
        {
          !updatedLocale && loaded ? <SliderCommonComponent spaceBetween={30} slidesPerGroup={6} slidesPerView={'auto'} breakpoints={breakPoints} rtl={isRTL(locale)}>
            {
              roomType?.length > 0 && roomType?.filter((enableItem) => enableItem.isEnable == '1')
                .map((item, key) => {
                  return (
                    <div style={{ width: 'auto' }}>
                      {
                        <div
                          onClick={() => this.handleSubmitButton(item?.id)}
                          className={cx('homeTypeSliderItems', s.activeBorderColorHover, 'darkModeActiveBorderHover', { [s.activeBorderColor]: item?.id == isActiveRoomType }, { ['darkModeActiveBorder']: item?.id == isActiveRoomType })}
                        >
                          <div className={s.homeTypeSlider}>
                            {
                              item?.image ? (
                                <div className={cx(s.homeTypeImage, 'homeTypeImageDarkMode', 'homeTypeImageRTL')}>
                                  <img src={url + "/images/amenities/" + item?.image} className={cx(s.homeTypeImageShadow, { [s.activeColor]: item?.id == isActiveRoomType }, { ['darkModeActiveColor']: item?.id == isActiveRoomType })} />
                                </div>
                              ) : (
                                <div className={cx(s.homeTypeImage, 'homeTypeImageDarkMode', 'homeTypeImageRTL')}>
                                  <img src={DefaultIcon} className={cx({ [s.activeColor]: item?.id == isActiveRoomType }, { ['darkModeActiveColor']: item?.id == isActiveRoomType })} />
                                </div>
                              )
                            }
                            <div className={cx(s.typeName, 'darkModeTypeName', 'typeNamedarkMode', { [s.typeNameColor]: item?.id == isActiveRoomType }, { ['typeNameColorDarkMode']: item?.id == isActiveRoomType })}>{item?.itemName}</div>
                          </div>
                        </div>
                      }
                    </div>
                  )
                })
            }
          </SliderCommonComponent> : <Loader type={"text"} />
        }

      </div >
    );
  }
}

HomeTypeSlider = reduxForm({
  form: "SearchForm",
  onSubmit: submit,
  destroyOnUnmount: false,
})(HomeTypeSlider);

const selector = formValueSelector('SearchForm')

const mapState = (state) => ({
  isActiveRoomType: selector(state, 'isActiveRoomType'),
  updatedLocale: state?.intl?.newLocale,
});

const mapDispatch = {
  change,
  submitForm,
};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(HomeTypeSlider))
);
