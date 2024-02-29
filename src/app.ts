import axios from 'axios';
import { throttle } from 'lodash-es';
async function main() {
  const t = throttle(() => {}, 1000);
  const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
  console.log(res.data);
}

main();
