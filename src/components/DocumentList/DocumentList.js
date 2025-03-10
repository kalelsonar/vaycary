import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import ShowDocumentListQuery from './ShowListDocument.graphql';
import RemoveDocumentList from './RemoveDocumentList.graphql';
import messages from '../../locale/messages';
import showToaster from '../../helpers/showToaster';
import { photosShow } from '../../helpers/photosShow';
import { documentuploadDir } from '../../config';

import pdfIcon from '/public/SiteIcons/pdf_image.png';

import s from './DocumentList.css';

class DocumentList extends Component {

  static defaultProps = {
    data: {
      loading: true,
      showDocumentList: []
    },
  };

  constructor(props) {
    super(props);
  }

  handleClick = async (id, fileName) => {
    const { mutate } = this.props;

    const { data } = await mutate({
      RemoveDocumentList,
      variables: { id },
      refetchQueries: [{ query: ShowDocumentListQuery }]
    });


    if (data?.RemoveDocumentList?.status == "success") {
      const resp = await fetch('/deleteDocuments', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName }),
        credentials: 'include',
      });
      const { status } = await resp.json();
      showToaster({ messageId: 'removeDocList', toasterType: 'success' })
    }
  }

  render() {
    const { data: { ShowDocumentList }, data } = this.props;
    let path = photosShow(documentuploadDir);

    return (
      <div className={cx('row', s.space2)}>
        {
          ShowDocumentList && ShowDocumentList?.map((item, key) => {
            let icon = item.fileType == 'application/pdf' ? pdfIcon : (path + item?.fileName);
            return (
              <div key={key} className={cx('col-lg-4 col-md-4 col-sm-6 col-xs-12 text-center')}>
                <a href={path + item.fileName} target="_blank">
                  <div className={s.listPhotoCover}>
                    <div className={s.listPhotoMedia}>
                      <img className={s.imgResponsive} src={icon} />
                    </div>
                  </div>
                </a>
                <a className={s.linkColor} href="javascript:void(0);" onClick={() => this.handleClick(item?.id, item?.fileName)}>
                  <FormattedMessage {...messages.removeFile} />
                </a>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default compose(
  injectIntl,
  withStyles(s),
  graphql(ShowDocumentListQuery, {
    options: {
      fetchPolicy: 'network-only'
    }
  }),
  graphql(RemoveDocumentList, {
    options: {
      fetchPolicy: 'network-only'
    }
  }),
)(DocumentList);





