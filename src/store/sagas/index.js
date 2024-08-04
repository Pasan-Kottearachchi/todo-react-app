import { all, fork } from 'redux-saga/effects';
import taskSaga from './tasksSaga';

export default function* root() {
  yield all([
    fork(taskSaga),
  ]);
}
