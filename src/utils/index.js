import { Map } from 'immutable';

export function indexById(list) {
  return list.reduce((table, value) => (
    table.set(value.get('id'), value)
  ), Map());
}
