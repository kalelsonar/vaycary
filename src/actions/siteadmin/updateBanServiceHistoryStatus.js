import { gql } from 'react-apollo';
import showToaster from '../../helpers/showToaster';
// import sendSocketNotification from '../../socket/sendSocketNotification';

const query = gql`
query userManagement($currentPage: Int, $searchList: String){
    userManagement(currentPage: $currentPage, searchList: $searchList) {
      count
      usersData{
        id,
        email,
          profile {
            profileId,
            firstName,
            lastName,
            gender,
            dateOfBirth,
            phoneNumber,
            preferredLanguage,
            preferredCurrency,
            location,
            info,
            createdAt
          },
          userBanStatus,
      }
     }
  }
`;
const mutation = gql`
  mutation($id: String, $banStatus: Int) {
    updateBanServiceHistoryStatus(id: $id ,banStatus: $banStatus){
      status
      }
    }
  `;
export function updateBanServiceHistoryStatus(id, banStatus, userMail, userName, currentPage, searchList) {

  return async (dispatch, getState, { client }) => {
    try {
      const { data } = await client.mutate({
        mutation,
        variables: { id, banStatus },
        fetchPolicy: 'network-only',
        refetchQueries: [{ query, variables: { currentPage, searchList } }]
      });
      if (data && data.updateBanServiceHistoryStatus && data.updateBanServiceHistoryStatus.status === "success") {
        showToaster({ messageId: 'updateBanStatus', toasterType: 'success' })
        // sendSocketNotification(`updateUserLogout-${id}`, '')
      } else {
        showToaster({ messageId: 'updateBanError', toasterType: 'error' })
      }
    } catch (error) {
      showToaster({ messageId: 'updateBanWarning', toasterType: 'warning' })
      return false;
    }
    return true;
  };
}
