import React from "react";
import cx from 'classnames';
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Loader from "../../Loader/Loader";
import defaultPic from '/public/adminIcons/defaultAdmin.svg';
import DeleteIcon from '/public/adminIcons/dlt.png';
import bt from '../../../components/commonStyle.css';

class CommonImageDisplay extends React.Component {
    render() {
        const { loader, image, loading, isDefaultPic, isDelete, deleteImage } = this.props;
        return (
            <div>
                {loading && <div className={cx('positionRelative', bt.profileImageBg, 'darkModeProfileImageBg')} />}
                {!loading &&
                    <Loader show={loader} type={"page"}>
                        <div className={cx('positionRelative', bt.profileImageBg, 'darkModeProfileImageBg')}>
                            {
                                <div style={{ backgroundImage: `url(${!isDefaultPic ? image : defaultPic})` }} className={cx('commonDropZoneImgContainer', { [bt.defaultImg]: isDefaultPic })}></div>
                            }
                            {
                                !isDefaultPic && isDelete && <a href="javascript:void(0);" onClick={() => deleteImage()}
                                    className={cx(bt.trashIconNew, 'trashIconNewRTL')}>
                                    <img src={DeleteIcon} alt='Delete' />
                                </a>
                            }
                        </div>
                    </Loader>
                }
            </div>
        )
    }
}

export default withStyles(bt)(CommonImageDisplay);