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
      return {
        status: resp.status,
        message: resp.data.message
      };
    }
    return {
      status: resp.status,
      message: 'Sent successfully'
    }
  } catch (err) {
    if (err.response) {
      throw customError(
        err.response.data.errors && err.response.data.errors.length > 0
        ? err.response.data.errors[0].message
        : err.response.data.message,
        err.response.status
      );
    }
    console.log('err.message = ', err.message);
    throw customError(err.message, 'Post Error');
  }
}