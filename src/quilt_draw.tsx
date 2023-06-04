import * as React from 'react';
import { RED, ROUND, NW, NE, SW, SE, Square, Row, rnil, Quilt, qnil, rlen } from './quilt';
import { BadArgument } from './patterns';
import StraightRed from './img/straight-red.png';
import StraightGreen from './img/straight-green.png';
import RoundRed from './img/round-red.png';
import RoundGreen from './img/round-green.png';
import './quilt_draw.css';


/** Returns an element that draws the given square. */
export function SquareElem(props: {square: Square}): JSX.Element {
  let cls;
  switch (props.square.corner) {
    case NW:  cls = "square rotate-nw"; break;
    case SW:  cls = "square rotate-sw"; break;
    case SE:  cls = "square rotate-se"; break;
    case NE:  cls = "square rotate-ne"; break;
  }

  if (props.square.color === RED ) {
    if (props.square.shape === ROUND) {
      return <img src={RoundRed} className={cls}/>
    } else {
      return <img src={StraightRed} className={cls}/>
    }
  } else {
    if (props.square.shape === ROUND) {
      return <img src={RoundGreen} className={cls}/>
    } else {
      return <img src={StraightGreen} className={cls}/>
    }
  }
}


/** Returns an element that draws the given quilt. */
export function QuiltElem(props: {quilt: Quilt}): JSX.Element {
  if (props.quilt === qnil) {
    throw new BadArgument("quilt", "cannot have 0 rows");
  }

  const exp_len = rlen(props.quilt.hd);
  const rows = [];
  let i = 0; 
  let cur_quilt: Quilt = props.quilt;
  while (cur_quilt !== qnil) {
    const row_len = rlen(cur_quilt.hd);
    if (row_len !== exp_len) {
      throw new BadArgument("quilt",
          `rows have different lengths: ${row_len} vs ${exp_len}`);
    }

    const row = [];
    let j = 0;
    let cur_row: Row = cur_quilt.hd;
    while (cur_row !== rnil) {
      row.push(<SquareElem key={j} square={cur_row.hd}/>);
      cur_row = cur_row.tl;
      j += 1;
    }

    rows.push(<div key={i} className="row">{row}</div>);
    cur_quilt = cur_quilt.tl;
    i += 1;
  }

  return <div>{rows}</div>;
}
