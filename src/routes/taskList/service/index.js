import $$ from 'cmn-utils';
import config from '@/config';

export async function getInitData() {
  return $$.post(config.serverUrl + '/deviceCheck/test', {});
}
