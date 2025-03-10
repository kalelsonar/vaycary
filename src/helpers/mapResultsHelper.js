export function mapResults(item, hover) {
    let data = {}
    data["lat"] = item?.lat,
        data["lng"] = item?.lng,
        data["position"] = new google.maps.LatLng(item?.lat, item?.lng);
    data["id"] = item?.id;
    data["basePrice"] = item?.listingData?.basePrice;
    data["currency"] = item?.listingData?.currency;
    data["title"] = item?.title;
    data["beds"] = item?.beds;
    data["personCapacity"] = item?.personCapacity;
    data["roomType"] = item?.settingsData && item?.settingsData[0] && item?.settingsData[0]?.listsettings && item?.settingsData[0]?.listsettings?.itemName;
    data["coverPhoto"] = item?.coverPhoto;
    data["listPhotos"] = item?.listPhotos;
    data['bookingType'] = item?.bookingType;
    data["reviewsCount"] = item?.reviewsCount;
    data['reviewsStarRating'] = item?.reviewsStarRating;
    data["wishListStatus"] = item?.wishListStatus;
    data['isListOwner'] = item?.isListOwner;
    data['hovered'] = hover;
    data['oneTotalPrice'] = item?.listingData?.oneTotalPrice;
    return data;
}


export function getMarkerIcon(marker) {
    const svg = generateIcon(marker);
    return 'data:image/svg+xml;base64,' + window.btoa(svg);
}

export function generateIcon(marker) {
    let opts = {
        fontSize: '10px',
        fontColor: 'transparent',
        strokeColor: 'transparent',
        strokeWeight: 0,
        path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
        fillColor: 'transparent',
    };

    return `
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="35" viewBox="-24 -48 48 48">
        <defs>
        </defs>
        <path class="marker-icon" stroke="${opts.strokeColor}" stroke-width="${opts.strokeColor}" fill="${opts.fillColor}" 
          d="${opts.path}" />
      </svg>
    `;
}

export const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height + 8),
});

export const containerStyle = {
    width: '100%',
    height: '100%'
};

export const refs = {};