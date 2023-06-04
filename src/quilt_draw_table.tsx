import * as React from 'react';
import { RED, Square, Row, Quilt, rnil, qnil } from './quilt';
import { JsxList, jnil, jcompact, jcons } from './jsx_list';


/** Returns a TD that displays the square orientation as text. */
export function SquareTableElem(props: {square: Square, key: number}): JSX.Element {
  const cls = (props.square.color == RED) ? 'sq-red' : 'sq-green';
  return <td key={props.key} className={cls}>{props.square.corner}</td>;
}

export function RowTableElems(props: {row: Row, key: number}): JsxList {
  if (props.row === rnil) {
    return jnil;
  } else {
    return jcons(SquareTableElem({square: props.row.hd, key: props.key}), RowTableElems({row: props.row.tl, key: props.key + 1}));
  }
}

export function RowTableElem(props: {row: Row, key: number}): JSX.Element {
  return (<tr key={props.key}>
      {jcompact(RowTableElems({row: props.row, key: 0}))}
    </tr>);
};

export function QuiltTableElems(props: {quilt: Quilt, key: number}): JsxList {
  if (props.quilt === qnil) {
    return jnil;
  } else {
    return jcons(RowTableElem({row: props.quilt.hd, key: props.key}), QuiltTableElems({quilt: props.quilt.tl, key: props.key + 1}));
  }
}

export function QuiltTableElem(props: {quilt: Quilt}): JSX.Element {
  return (<tbody>
    {jcompact(QuiltTableElems({quilt: props.quilt, key: 0}))}
  </tbody>);
};
