
import * as assert from 'assert';
import * as React from 'react';
import { NW, NE, GREEN, RED, STRAIGHT, ROUND, Square, rnil, rcons, Row, qnil, Quilt, qcons } from './quilt';
import { SquareTableElem, RowTableElem, RowTableElems, QuiltTableElems, QuiltTableElem } from './quilt_draw_table';
import { JsxList, jcons, jnil } from './jsx_list';


describe('quilt_draw_table', function() {

  it('SquareTableElem', function() {
    const sq1: Square = { corner: NE, color: GREEN, shape: ROUND };
    const sq2: Square = { corner: NW, color: RED, shape: STRAIGHT };
    const sq3: Square = { corner: NW, color: GREEN, shape: ROUND };   
    const sq4: Square = { corner: NE, color: RED, shape: STRAIGHT };

    assert.deepEqual(SquareTableElem({square: sq1, key: 0}),            // 1st test for (square.color == RED)
        (<td key={0} className={"sq-green"}>NE</td>));
    assert.deepEqual(SquareTableElem({square: sq2, key: 1}),            // 1st test for (square.color == GREEN)
        (<td key={1} className={"sq-red"}>NW</td>));
    assert.deepEqual(SquareTableElem({ square: sq3, key: 2 }),          // 2nd test for (square.color == RED)
      (<td key={2} className={"sq-green"}>NW</td>));
    assert.deepEqual(SquareTableElem({ square: sq4, key: 3 }),          // 2nd test for (square.color == GREEN)
      (<td key={3} className={"sq-red"}>NE</td>));
  });

  const nw_sq: Square = {corner: NW, color: GREEN, shape: ROUND};
  const ne_sq: Square = {corner: NE, color: GREEN, shape: ROUND};
  const row_nw_ne: Row = rcons(nw_sq, rcons(ne_sq, rnil));
  const row_ne_nw: Row = rcons(ne_sq, rcons(nw_sq, rnil));
  const row_nw: Row = rcons(nw_sq, rnil);
  const row_ne: Row = rcons(ne_sq, rnil);

  it('RowTableElems', function() {
    assert.deepEqual(RowTableElems({row: rnil, key: 0}), jnil);         // 0-1-many heuristic, 1st test for base case
    assert.deepEqual(RowTableElems({row: rnil, key: 1}), jnil);         // 0-1-many heuristic, 2nd test for base case
    assert.deepEqual(RowTableElems({row: row_nw, key: 0}),              // 0-1-many heuristic, 1st 1 case, single recursive call
      jcons((<td key={0} className={"sq-green"}>NW</td>), jnil));
    assert.deepEqual(RowTableElems({ row: row_ne, key: 1 }),            // 0-1-many heuristic, 2nd 1 case, single recursive call
      jcons((<td key={1} className={"sq-green"}>NE</td>), jnil));
    assert.deepEqual(RowTableElems({row: row_nw_ne, key: 2}),           // 0-1-many heuristic, 1st many case, >1 recursive call
      jcons((<td key={2} className={"sq-green"}>NW</td>), jcons((<td key={3} className={"sq-green"}>NE</td>), jnil)));
    assert.deepEqual(RowTableElems({row: row_ne_nw, key: 9}),           // 0-1-many heuristic, 2nd many case, >1 recursive call
      jcons((<td key={9} className={"sq-green"}>NE</td>), jcons((<td key={10} className={"sq-green"}>NW</td>), jnil)));  
  });

  it('RowTableElem', function() {
    assert.deepEqual(RowTableElem({row: rcons(nw_sq, rnil), key: 0}),
        <tr key={0}>{[
            <td key={0} className={"sq-green"}>NW</td>,
        ]}</tr>);
    assert.deepEqual(RowTableElem({row: rcons(ne_sq, rnil), key: 0}),
        <tr key={0}>{[
            <td key={0} className={"sq-green"}>NE</td>,
        ]}</tr>);
    assert.deepEqual(RowTableElem({row: rcons(nw_sq, rcons(ne_sq, rnil)), key: 1}),
      <tr key={1}>{[
        <td key={0} className={"sq-green"}>NW</td>, <td key={1} className={"sq-green"}>NE</td>,
      ]}</tr>);
  });

  const q1: Quilt = qcons(row_nw_ne, qnil);
  const q2: Quilt = qcons(row_ne_nw, qnil);
  const q3: Quilt = qcons(row_ne_nw, qcons(row_ne, qnil));
  const q4: Quilt = qcons(row_nw_ne, qcons(row_nw, qnil));
  const l1: JsxList = jcons(<tr key={2}>{[
                              <td key={0} className={"sq-green"}>NW</td>, <td key={1} className={"sq-green"}>NE</td>
                            ]}</tr>, jnil);
  const l2: JsxList = jcons(<tr key={3}>{[
                              <td key={0} className={"sq-green"}>NE</td>, <td key={1} className={"sq-green"}>NW</td>
                            ]}</tr>, jnil);
  const l3: JsxList = jcons(<tr key={4}>{[
                              <td key={0} className={"sq-green"}>NE</td>, <td key={1} className={"sq-green"}>NW</td>
                            ]}</tr>,
                              jcons(<tr key={5}>{[
                                      <td key={0} className={"sq-green"}>NE</td>
                                    ]}</tr>, jnil));
  const l4: JsxList = jcons(<tr key={5}>{[
                              <td key={0} className={"sq-green"}>NW</td>, <td key={1} className={"sq-green"}>NE</td>
                            ]}</tr>,
                              jcons(<tr key={6}>{[
                                      <td key={0} className={"sq-green"}>NW</td>
                                    ]}</tr>, jnil));

  it('QuiltTableElems', function() {
    assert.deepEqual(QuiltTableElems({quilt: qnil, key: 0}), jnil);           // 0-1-many heuristic, 1st test for base case
    assert.deepEqual(QuiltTableElems({quilt: qnil, key: 1}), jnil);           // 0-1-many heuristic, 2nd test for base case
    assert.deepEqual(QuiltTableElems({ quilt: q1, key: 2 }), l1);             // 0-1-many heuristic, 1st 1 case, single recursive call
    assert.deepEqual(QuiltTableElems({ quilt: q2, key: 3 }), l2);             // 0-1-many heuristic, 2nd 1 case, single recursive call
    assert.deepEqual(QuiltTableElems({ quilt: q3, key: 4 }), l3);             // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(QuiltTableElems({ quilt: q4, key: 5 }), l4);             // 0-1-many heuristic, 2nd many case, >1 recursive call
  });

  it('QuiltTableElem', function() {
    assert.deepEqual(QuiltTableElem({quilt: qnil}), <tbody>{[]}</tbody>);     // 0-1-many heuristic, 1st test for base case
    assert.deepEqual(QuiltTableElem({quilt: q1}),                             // 0-1-many heuristic, 1st 1 case, single recursive call
      <tbody>{[
        <tr key={0}>{[
          <td key={0} className={"sq-green"}>NW</td>, <td key={1} className={"sq-green"}>NE</td>,
        ]}</tr>
      ]}</tbody>);
    assert.deepEqual(QuiltTableElem({quilt: q2}),                             // 0-1-many heuristic, 2nd 1 case, single recursive call
      <tbody>{[
        <tr key={0}>{[
          <td key={0} className={"sq-green"}>NE</td>, <td key={1} className={"sq-green"}>NW</td>,
        ]}</tr>
      ]}</tbody>);
    assert.deepEqual(QuiltTableElem({quilt: q3}),                             // 0-1-many heuristic, 1st many case, >1 recursive call
      <tbody>{[
        <tr key={0}>{[
          <td key={0} className={"sq-green"}>NE</td>, <td key={1} className={"sq-green"}>NW</td>,
        ]}</tr>,
        <tr key={1}>{[
          <td key={0} className={"sq-green"}>NE</td>
        ]}</tr>
      ]}</tbody>);
    assert.deepEqual(QuiltTableElem({quilt: q4}),                             // 0-1-many heuristic, 2nd many case, >1 recursive call
      <tbody>{[
        <tr key={0}>{[
          <td key={0} className={"sq-green"}>NW</td>, <td key={1} className={"sq-green"}>NE</td>,
        ]}</tr>,
        <tr key={1}>{[
          <td key={0} className={"sq-green"}>NW</td>
        ]}</tr>
      ]}</tbody>);
  });

});
