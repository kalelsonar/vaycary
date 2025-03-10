import showToaster from "./showToaster";

export default function dropzoneErrors(file, maxSize) {
  let errorToastr;

  let fileFormates = [
    'image/svg+xml',
    'application/sql',
    'application/pdf',
    'application/vnd.oasis.opendocument.presentation',
    'text/csv',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/epub+zip',
    'application/zip',
    'text/plain',
    'application/rtf',
    'application/vnd.oasis.opendocument.text',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.oasis.opendocument.spreadsheet',
    'text/tab-separated-values',
    'text/calendar',
    'application/json'
  ];

  if (file && file.size > (1024 * 1024 * parseInt(maxSize))) {
    errorToastr = showToaster({ messageId: 'limitError', toasterType: 'error' });
    return;
  }

  if (file && (file.accepted === false || fileFormates.indexOf(file.type) >= 0)) {
    errorToastr = showToaster({ messageId: 'fileTypeError', toasterType: 'error' })
    return;
  }

  return errorToastr;
}