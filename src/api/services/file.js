// TODO: copy paster from gismetrics.
import BaseService from './base'

class FileService extends BaseService {
  relativeURL = 'files'

  create({
    filename, file, orientation, fileType,
  }) {
    return super.create({ filename, orientation, fileType }).then(({ id, uploadUrl, url }) => fetch(uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'x-amz-acl': 'public-read',
      },
    }).then(() => ({ id, url })))
  }
}

export default FileService
