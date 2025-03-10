export { default as StoreProvider } from '../app/StoreProvider';
export { store } from './store';
export type { RootState, AppDispatch } from './store';
export * from './actions';
export * from './reducers';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;