import fetch from '../core/fetch'

export async function getAddress(address) {

    let latAndLngQuery = `
          query ($address: String) {
            GetAddressComponents (address:$address) {
              addressComponents
              lat
              lng
              geoType
              sw_lat 
              sw_lng 
              ne_lat 
              ne_lng
            }
          }
        `;
    try {
        const locationResp = await fetch('/graphql', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: latAndLngQuery,
                variables: { address }
            }),
            credentials: 'include',
        });

        const { data } = await locationResp.json();

        return { data };
    } catch (error) {
        return error
    }

}