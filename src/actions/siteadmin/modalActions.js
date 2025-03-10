import {
  OPEN_LIST_SETTINGS_MODAL,
  CLOSE_LIST_SETTINGS_MODAL,
  OPEN_ADMIN_ROLES_MODAL,
  CLOSE_ADMIN_ROLES_MODAL,
  OPEN_ADMIN_USER_MODAL,
  CLOSE_ADMIN_USER_MODAL,
  OPEN_CANCEL_MODAL,
  CLOSE_CANCEL_MODAL,
} from '../../constants';

import { initialize } from 'redux-form';

export function openListSettingsModal(initialData, formName) {

  return (dispatch, getState) => {

    // Reinitialize the form values
    dispatch(initialize(formName, initialData, true));

    dispatch({
      type: OPEN_LIST_SETTINGS_MODAL,
      listSettingsModal: true,
    });
  };

}

export function openEditListSettingsModal(initialData) {

  return (dispatch, getState) => {

    // Reinitialize the form values
    dispatch(initialize("EditListSettingsForm", initialData, true));

    dispatch({
      type: OPEN_LIST_SETTINGS_MODAL,
      listSettingsModal: true,
    });
  };

}

export function closeListSettingsModal() {

  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_LIST_SETTINGS_MODAL,
      listSettingsModal: false
    });
  };
}

export function openAdminRolesModal(type, formData) {
  return (dispatch, getState) => {
    if (type === 'edit') {
      dispatch(initialize("AdminRolesForm", formData, true));
    }

    dispatch({
      type: OPEN_ADMIN_ROLES_MODAL,
      payload: {
        adminRolesModal: true,
        adminRolesModalType: type
      }
    });
  }
}

export function closeAdminRolesModal() {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_ADMIN_ROLES_MODAL,
      payload: {
        adminRolesModal: false
      }
    });
  }
}

export function openAdminUserModal(type, formData) {
  return (dispatch, getState) => {
    if (type === 'edit') {
      dispatch(initialize("AdminUserForm", formData, true));
    }

    dispatch({
      type: OPEN_ADMIN_USER_MODAL,
      payload: {
        adminUserModal: true,
        adminUserModalType: type
      }
    });
  }
}

export function closeAdminUserModal() {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_ADMIN_USER_MODAL,
      payload: {
        adminUserModal: false
      }
    });
  }
}

export function openCancelModal(formData) {
  return (dispatch, getState) => {
    dispatch({
      type: OPEN_CANCEL_MODAL,
      payload: {
        cancelModal: true,
      }
    });
  }
}

export function closeCancelModal() {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_CANCEL_MODAL,
      payload: {
        cancelModal: false
      }
    });
  }
}
