import { app } from './app';
import { api } from '../../../config/api';

app.listen(api.port, () => {
  console.log(`[API] server started on port ${api.port}`);
});
