import axios from 'axios';
import { customError } from '../../utils/errorHandler';

export interface HttpHeader {
  'Content-Type': string;
  Authorization: string;
}
export const post = async(url: string, headers: HttpHeader, data: URLSearchParams | string) => {
  try {
    const resp = await axios({
      method: 'post',
      url: url,
      headers,
      data
    });
    if (resp.data) {
      return `[${resp.status}] resp.data.message`;
    }
    return `[${resp.status}]Sent success`;
  } catch (err) {
    if (err.response) {
      throw customError(
        err.response.data.errors && err.response.data.errors.length > 0
        ? err.response.data.errors[0].message
        : err.response.data.message,
        err.response.status
      );
    }
    throw customError(err.message, 'Post Error');
  }
}