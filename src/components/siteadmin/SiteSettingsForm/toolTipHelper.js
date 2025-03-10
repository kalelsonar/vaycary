import React from 'react'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import tooltipIcon from '/public/SiteIcons/tooltipIcon.svg'

const renderToolTip = (label, tooltipIconClass) => {
    return (
        <>
            <OverlayTrigger placement="top" overlay={<Popover id="popover-positioned-top" className='imageUploadTooltipContainer'>{label}</Popover>}>
                <img src={tooltipIcon} className={tooltipIconClass} />
            </OverlayTrigger>
        </>
    )
}

export default renderToolTip;