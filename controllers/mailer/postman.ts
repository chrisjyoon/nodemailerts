import axios from 'axios';

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
    console.log(resp.status);
    console.log(resp.data);
    if (resp.data) {
      return `[${resp.status}] resp.data.message`;
    }
    return `[${resp.status}]Sent success`;
  } catch (err) {
    if (err.response) {
      console.log('postman got Error!!!');
      console.log('postman got Error!!!');
      console.log('postman got Error!!!');
      console.log(err.response.status);
      console.log(err.response.data);
      throw new Error(err.response.data.message);
    } else if (err.request) {
      console.log(err.request);
    } else {
      console.log('Error', err.message);
    }
    throw new Error(err.message);
  }
}