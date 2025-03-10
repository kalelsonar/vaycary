import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { change, formValueSelector } from 'redux-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import messages from '../../locale/messages';
import { removeListPhotos } from '../../actions/manageListPhotos';
import { fileuploadDir } from '../../config';
import { photosShow } from '../../helpers/photosShow';

import TickIcon from '/public/SiteIcons/correct.svg';

import s from './PhotosList.css';
class PhotosList extends Component {

  static propTypes = {
    removeListPhotos: PropTypes.any.isRequired,
    listId: PropTypes.number.isRequired,
    listPhotos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      listId: PropTypes.number.isRequired
    }))
  };

  static defaultProps = {
    listPhotos: []
  };

  changeCoverPhoto = (id) => {
    const { change } = this.props;
    change("ListPlaceStep2", 'coverPhoto', id);
  }

  render() {
    const { removeListPhotos, listPhotos, coverPhoto } = this.props;

    let path = photosShow(fileuploadDir);

    return (
      <div className={s.displayGrid}>
        {
          listPhotos?.map((item, key) => {
            return (
              <div key={key} className={s.positionRelative}>
                <div className={s.photoListBgImage} style={{ backgroundImage: `url(${path}x_medium_${item?.name})` }} />
                <div className='photoListDropDown'>
                  <DropdownButton
                    bsSize="small"
                    title=''
                    id="dropdown-size-small"
                  >
                    {(coverPhoto ? (coverPhoto != item?.id) : (listPhotos[0]?.id != item?.id)) && <MenuItem eventKey="1" onClick={() => this.changeCoverPhoto(item?.id, item?.name, true)}>
                      <FormattedMessage {...messages.setAsCoverPhoto} />
                    </MenuItem>}
                    <MenuItem eventKey="2" onClick={() => removeListPhotos(item?.listId, item?.name, true)}>
                      <FormattedMessage {...messages.delete} />
                    </MenuItem>
                  </DropdownButton>
                </div>
                {(coverPhoto ? (coverPhoto == item?.id) : (listPhotos[0]?.id == item?.id)) && <div className={cx(s.coverPhotoSection, 'bgBlackTwo', 'textWhite', 'svgImg')}>
                  <img src={TickIcon} className={cx(s.tickIcon, 'photoTickIcon')} />
                  <FormattedMessage {...messages.setCover} />
                </div>}
              </div>
            );
          })
        }
      </div>
    );
  }
}

const selector = formValueSelector('ListPlaceStep2');

const mapState = (state) => ({
  listPhotos: state?.location?.listPhotos,
  coverPhoto: selector(state, 'coverPhoto'),
});

const mapDispatch = {
  removeListPhotos,
  change
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(PhotosList)));