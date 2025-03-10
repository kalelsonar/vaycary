import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Photos.css';
import { Button } from 'react-bootstrap';
import cx from 'classnames';

// Component
import ListGridCoverPhoto from '../../ListGridCoverPhoto';
import ImageSlider from '../ImageSlider';

// Redux Action
import { openImageLightBox, closeImageLightBox } from '../../../actions/ImageLightBox';
import { setStickyTop } from '../../../actions/Sticky/StrickyActions';
import { openSocialShareModal } from '../../../actions/modalActions';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

import ListDefaultPhoto from '../../ListDefaultPhoto';
import SocialShareModal from '../SocialShareModal';

class Photos extends React.Component {
  static propTypes = {
    listPhotos: PropTypes.array,
    coverPhoto: PropTypes.number,
    openImageLightBox: PropTypes.any.isRequired,
    closeImageLightBox: PropTypes.any.isRequired,
    imageLightBox: PropTypes.bool.isRequired,
    formatMessage: PropTypes.any,
  };

  static defaultProps = {
    listPhotos: [],
    imageLightBox: false
  }

  constructor(props) {
    super(props);
    this.state = {
      sources: []
    }
  }

  componentDidMount() {
    const { data, setStickyTop } = this.props;
    let sources = [];
    let sourceObject = {};
    let coverPhoto;
    let sticky = document.querySelector('[data-sticky-top]'), stickyHeight = 412;

    if (data.listPhotos && data.listPhotos.length > 0) {
      coverPhoto = data.listPhotos[0].name;
      if (data.coverPhoto && data.coverPhoto) {
        data.listPhotos.map((item, key) => {
          if (item.id === data.coverPhoto) {
            sourceObject = {};
            sourceObject['src'] = '/images/upload/' + item.name;
            sources.push(sourceObject);
          }
        });

        data.listPhotos.map((item, key) => {
          if (item.id != data.coverPhoto) {
            sourceObject = {};
            sourceObject['src'] = '/images/upload/' + item.name;
            sources.push(sourceObject);
          }
        });
      } else {
        data.listPhotos.map((item, key) => {
          sourceObject = {};
          sourceObject['src'] = '/images/upload/' + item.name;
          sources.push(sourceObject);
        });
      }
      this.setState({ sources });
    }
    stickyHeight = (sticky.getBoundingClientRect().height + 10);
    setStickyTop(stickyHeight);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    let sources = [];
    let sourceObject = {};
    let coverPhoto;
    let sticky = document.querySelector('[data-sticky-top]'), stickyHeight = 412;
    if (data.listPhotos && data.listPhotos.length > 0) {
      coverPhoto = data.listPhotos[0].name;

      if (data.coverPhoto && data.coverPhoto) {
        data.listPhotos.map((item, key) => {
          if (item.id === data.coverPhoto) {
            sourceObject = {};
            sourceObject['src'] = '/images/upload/' + item.name;
            sources.push(sourceObject);
          }
        });
        data.listPhotos.map((item, key) => {
          if (item.id != data.coverPhoto) {
            sourceObject = {};
            sourceObject['src'] = '/images/upload/' + item.name;
            sources.push(sourceObject);
          }
        });
      } else {
        data.listPhotos.map((item, key) => {
          sourceObject = {};
          sourceObject['src'] = '/images/upload/' + item.name;
          sourceObject['src'] = '/images/upload/' + item.name;
          sources.push(sourceObject);
        });
      }
      this.setState({ sources });
    }
    stickyHeight = (sticky.getBoundingClientRect().height + 10);
    setStickyTop(stickyHeight);
  }

  render() {
    const { sources } = this.state;
    const { data, openImageLightBox, closeImageLightBox, imageLightBox } = this.props;
    let coverPhoto, listPhotos;
    coverPhoto = data.coverPhoto;
    listPhotos = data.listPhotos;
    return (
      <div className={s.bannerContainer} data-sticky-top>
        <SocialShareModal
          listId={data.id}
          title={data.title}
          city={data.city}
          state={data.state}
          country={data.country}
        />
        <ImageSlider
          imageLightBox={imageLightBox}
          closeImageLightBox={closeImageLightBox}
          sources={sources}
        />

        {
          listPhotos && listPhotos.length == 0 && <ListDefaultPhoto
            className={s.bannerImage}
            coverPhoto={coverPhoto}
            listPhotos={listPhotos}
            photoType={"xx_large"}
            bgImage
            openImageLightBox={openImageLightBox}
          >
          </ListDefaultPhoto>
        }
        <div className={s.positionRelative}>
          {
            sources && sources.length > 0 &&
            <ListGridCoverPhoto
              className={s.bannerImage}
              coverPhoto={coverPhoto}
              listPhotos={sources}
              photoType={"xx_large"}
              bgImage            >
            </ListGridCoverPhoto >
          }
          {
            sources && sources.length > 0 && <div className={cx(s.viewPhotosBtn, 'viewPhotosBtnRtl')}><Button
              className={cx(s.btn, 'bgBlack', 'textWhite', s.showBtn, 'viewPhotosBtnDark')}
              onClick={openImageLightBox}
            >
              <FormattedMessage {...messages.showAllPhotos} />
            </Button>
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  imageLightBox: state.viewListing.imageLightBox
});

const mapDispatch = {
  openImageLightBox,
  closeImageLightBox,
  setStickyTop,
  openSocialShareModal
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Photos)));