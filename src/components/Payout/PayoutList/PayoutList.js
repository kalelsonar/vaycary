import React, { Component } from "react"
import { FormattedMessage, injectIntl } from "react-intl"
import { connect } from "react-redux"
import { Button, Label, OverlayTrigger, Tooltip } from "react-bootstrap"
import cx from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"

import CommonTable from "../../CommonTable/CommonTable"

import history from "../../../core/history"
import messages from "../../../locale/messages"
import { removePayout } from "../../../actions/Payout/removePayoutAction"
import { setDefaultPayout } from "../../../actions/Payout/setDefaultPayout"

import tootipIcon from "/public/SiteIcons/editInfoTipIcon.svg"
import delteIcon from "/public/SiteIcons/deleteIcon.svg"
import addIcon from "/public/SiteIcons/addListIcon.svg"

import s from "../Payout.css"
import bt from "../../../components/commonStyle.css"

class PayoutList extends Component {
  static defaultProps = {
    payoutRemoveLoader: false,
    payoutDefaultLoader: false,
    payoutVerifyLoader: false,
    data: [],
  }

  handleClick() {
    history.push("/user/addpayout")
  }

  thead = () => {
    const { formatMessage } = this.props.intl
    return [
      { data: formatMessage(messages.payoutTitle) },
      { data: formatMessage(messages.payoutTitle4) },
      { data: formatMessage(messages.status) },
      { data: formatMessage(messages.options) },
      { data: formatMessage(messages.remove) },
    ]
  }

  tbody = (props) => {
    const { data, removePayout, setDefaultPayout, currentAccountId, userId } =
      props
    const { payoutRemoveLoader, payoutDefaultLoader, payoutVerifyLoader } =
      props

    return data?.map((value, key) => {
      return {
        id: key,
        data: [
          {
            data: (
              <div className={s.methodsFlex}>
                {value?.paymentMethod?.name}
                {value?.default && (
                  <Label bsStyle="success">
                    <FormattedMessage {...messages.default} />
                  </Label>
                )}
              </div>
            ),
          },
          {
            data: (
              <span>
                {value.methodId == 1 && <span>{value.payEmail}</span>}
                {(value.methodId == 3 || value.methodId === 2) && (
                  <span className={"rtlPayoutEmail"}>
                    ******{value.last4Digits}
                  </span>
                )}
                <span className={"rtlPayoutEmail"}> ({value.currency})</span>
              </span>
            ),
          },
          {
            data: (
              <span>
                {value?.isVerified === true && (
                  <FormattedMessage {...messages.ready} />
                )}
                {value?.isVerified !== true && (
                  <FormattedMessage {...messages.notReady} />
                )}
              </span>
            ),
          },
          {
            data: (
              <span>
                {!value?.default && value?.isVerified === true && (
                  <a
                    href="javascript:void(0)"
                    className={cx(
                      { [s.transparentText]: payoutDefaultLoader },
                      s.linkText,
                      "textWhite"
                    )}
                    onClick={() => {
                      if (!payoutDefaultLoader && !payoutRemoveLoader) {
                        setDefaultPayout(value?.id)
                      }
                    }}
                  >
                    <FormattedMessage {...messages.setDefault} />
                  </a>
                )}
                {!value?.default && value?.isVerified !== true && (
                  <a
                    href="javascript:void(0)"
                    onClick={() => {
                      if (!payoutVerifyLoader && !payoutRemoveLoader) {
                      }
                    }}
                    className={cx(s.linkText, "textWhite", "svgImg")}
                  >
                    <FormattedMessage {...messages.payoutVerify} />
                    <OverlayTrigger
                      overlay={
                        <Tooltip id={"tooltip" + key}>
                          <FormattedMessage
                            {...messages.payoutVerifyStripeInfo}
                          />
                        </Tooltip>
                      }
                      placement="top"
                    >
                      <img
                        src={tootipIcon}
                        className={cx(s.toolTipIcon, "payoutToolRTL")}
                      />
                    </OverlayTrigger>
                  </a>
                )}
              </span>
            ),
          },
          {
            data: (
              <span>
                {!value.default && (
                  <a
                    className={cx(s.textSpace, "payOutSpace", {
                      [s.transparentText]: payoutRemoveLoader,
                    })}
                    href="javascript:void(0)"
                    onClick={() => {
                      if (!payoutRemoveLoader && !payoutDefaultLoader) {
                        removePayout(value.id)
                      }
                    }}
                  >
                    <img src={delteIcon} />
                  </a>
                )}
              </span>
            ),
          },
        ],
      }
    })
  }

  render() {
    const { formatMessage } = this.props.intl

    return (
      <div
        className={cx(
          "commonListingBg",
          "payoutStepBg",
          "bgBlack",
          "noMarginBottom"
        )}
      >
        <h3 className={s.titleText}>{formatMessage(messages.payoutMethod)}</h3>
        <p className={cx(s.textMuted, "textWhite")}>
          <FormattedMessage {...messages.payoutTitleBlock1} />
        </p>
        <CommonTable thead={this.thead} tbody={() => this.tbody(this.props)} />
        <div className={bt.textAlignRight}>
          <span
            className={cx(
              s.textMuted,
              s.marginLeft,
              "textWhite",
              "transactionTextRTL"
            )}
          >
            &nbsp;
            <FormattedMessage {...messages.directDeposit} />
          </span>
          <Button
            className={cx(bt.btnLarge, bt.btnPrimary, s.addBtn)}
            onClick={this.handleClick}
          >
            <img src={addIcon} className={cx(s.plusIcon, "addPlusIcon")} />
            <FormattedMessage {...messages.addListing} />
          </Button>
        </div>
      </div>
    )
  }
}

const mapState = (state) => ({
  payoutRemoveLoader: state.loader.payoutRemove,
  payoutDefaultLoader: state.loader.payoutDefault,
  payoutVerifyLoader: state.loader.payoutVerify,
  userId: state.account.data.userId,
})

const mapDispatch = {
  removePayout,
  setDefaultPayout,
}

export default injectIntl(
  withStyles(s, bt)(connect(mapState, mapDispatch)(PayoutList))
)
