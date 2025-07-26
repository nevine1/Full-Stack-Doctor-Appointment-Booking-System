'use client';

import { Provider, useSelector } from 'react-redux';
import { store } from '@/store/store';

export default function Providers({ children }) {
   const { adminToken } = useSelector((state) => state.admin)
  return
      <Provider store={store}>
        {children}
      </Provider>;
}
