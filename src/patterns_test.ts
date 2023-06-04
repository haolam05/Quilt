import * as assert from 'assert';
import { NW, SE, SW, GREEN, RED, ROUND, Square, Row, rnil, rcons, qnil, qcons, STRAIGHT, NE } from './quilt';
import { BadArgument, PatternA, PatternB, PatternC, PatternD, PatternE } from './patterns';

// 1g
describe('patterns_1g', function () {

  const nw_round_green: Square = { shape: ROUND, color: GREEN, corner: NW };
  const nw_round_red: Square = { shape: ROUND, color: RED, corner: NW };

  it('PatternA_1g', function () {
    const row_green: Row = rcons(nw_round_green, rcons(nw_round_green, rnil));
    const row_red: Row = rcons(nw_round_red, rcons(nw_round_red, rnil));
    assert.throws(() => PatternA(-1, GREEN), BadArgument);            // 1st test for valid input (rows < 0)
    assert.throws(() => PatternA(-9, RED), BadArgument);              // 2nd test for valid input (rows < 0)
    assert.deepEqual(PatternA(0), qnil);                              // 1st test for 0-1-many heuristic, base case
    assert.deepEqual(PatternA(0, RED), qnil);                         // 2nd test for 0-1-many heuristic, base case
    assert.deepEqual(PatternA(1), qcons(row_green, qnil));            // 0-1-many heuristic, 1st 1 case, single recursive call
    assert.deepEqual(PatternA(1, RED), qcons(row_red, qnil));         // 0-1-many heuristic, 2nd 1 case, single recursive call
    assert.deepEqual(PatternA(3, GREEN),                              // 0-1-many heuristic, 1st many case, >1 recursive call
      qcons(row_green, qcons(row_green, qcons(row_green, qnil))));
    assert.deepEqual(PatternA(4),                                     // 0-1-many heuristic, 2nd many case, >1 recursive call
      qcons(row_green, qcons(row_green, qcons(row_green, qcons(row_green, qnil)))));
  });

  const se_straight_green: Square = { shape: STRAIGHT, color: GREEN, corner: SE };
  const nw_straight_green: Square = { shape: STRAIGHT, color: GREEN, corner: NW };
  const se_straight_red: Square = { shape: STRAIGHT, color: RED, corner: SE };
  const nw_straight_red: Square = { shape: STRAIGHT, color: RED, corner: NW };

  it('PatternB_1g', function () {
    const row_green: Row = rcons(se_straight_green, rcons(nw_straight_green, rnil));
    const row_red: Row = rcons(se_straight_red, rcons(nw_straight_red, rnil));
    assert.throws(() => PatternB(-30, GREEN), BadArgument);           // 1st test for valid input (rows < 0)
    assert.throws(() => PatternB(-19, RED), BadArgument);             // 2nd test for valid input (rows < 0)
    assert.deepEqual(PatternB(0), qnil);                              // 1st test for 0-1-many heuristic, base case
    assert.deepEqual(PatternB(0, RED), qnil);                         // 2nd test for 0-1-many heuristic, base case
    assert.deepEqual(PatternB(1), qcons(row_green, qnil));            // 0-1-many heuristic, 1st 1 case, single recursive call
    assert.deepEqual(PatternB(1, RED), qcons(row_red, qnil));         // 0-1-many heuristic, 1st 1 case, single recursive call
    assert.deepEqual(PatternB(4),                                     // 0-1-many heuristic, 2nd many case, >1 recursive call
      qcons(row_green, qcons(row_green, qcons(row_green, qcons(row_green, qnil)))));
    assert.deepEqual(PatternB(5),                                     // 0-1-many heuristic, 2nd many case, >1 recursive call
      qcons(row_green, qcons(row_green, qcons(row_green, qcons(row_green, qcons(row_green, qnil))))));
  });

  const ne_round_green: Square = { shape: ROUND, color: GREEN, corner: NE };
  const se_round_green: Square = { shape: ROUND, color: GREEN, corner: SE };
  const sw_round_green: Square = { shape: ROUND, color: GREEN, corner: SW };
  const ne_round_red: Square = { shape: ROUND, color: RED, corner: NE };
  const se_round_red: Square = { shape: ROUND, color: RED, corner: SE };
  const sw_round_red: Square = { shape: ROUND, color: RED, corner: SW };

  const row_green_ne_nw: Row = rcons(ne_round_green, rcons(nw_round_green, rnil));
  const row_green_se_sw: Row = rcons(se_round_green, rcons(sw_round_green, rnil));
  const row_red_ne_nw: Row = rcons(ne_round_red, rcons(nw_round_red, rnil));
  const row_red_se_sw: Row = rcons(se_round_red, rcons(sw_round_red, rnil));

  it('PatternC_1g', function () {
    assert.throws(() => PatternC(-23, GREEN), BadArgument);           // 1st test for valid input (rows < 0)
    assert.throws(() => PatternC(-44, RED), BadArgument);             // 2nd test for valid input (rows < 0)
    assert.throws(() => PatternC(3, RED), BadArgument);               // 1st test for valid input (rows % 2 === 1)
    assert.throws(() => PatternC(5, RED), BadArgument);               // 2nd test for valid input (rows % 2 === 1)
    assert.deepEqual(PatternC(0), qnil);                              // 1st test for 0-1-many heuristic, base case
    assert.deepEqual(PatternC(0, RED), qnil);                         // 2nd test for 0-1-many heuristic, base case
    assert.deepEqual(PatternC(2, GREEN),                              // 0-1-many heuristic, 1st 1 case, single recursive call
      qcons(row_green_ne_nw, qcons(row_green_se_sw, qnil)));
    assert.deepEqual(PatternC(2, RED),                                // 0-1-many heuristic, 2nd 1 case, single recursive call
      qcons(row_red_ne_nw, qcons(row_red_se_sw, qnil)));
    assert.deepEqual(PatternC(4),                                     // 0-1-many heuristic, 1st many case, >1 recursive call
      qcons(row_green_ne_nw, qcons(row_green_se_sw, qcons(row_green_ne_nw, qcons(row_green_se_sw, qnil)))));
    assert.deepEqual(PatternC(4, RED),                                // 0-1-many heuristic, 2nd many case, >1 recursive call
      qcons(row_red_ne_nw, qcons(row_red_se_sw, qcons(row_red_ne_nw, qcons(row_red_se_sw, qnil)))));  
  });

  it('PatternD_1g', function () {
    assert.throws(() => PatternD(-3), BadArgument);                   // 1st test for valid input (rows < 0)
    assert.throws(() => PatternD(-4), BadArgument);                   // 2nd test for valid input (rows < 0)
    assert.throws(() => PatternD(77, RED), BadArgument);              // 1st test for valid input (rows % 2 === 1)
    assert.throws(() => PatternD(33, RED), BadArgument);              // 2nd test for valid input (rows % 2 === 1)
    assert.deepEqual(PatternD(0), qnil);                              // 1st test for 0-1-many heuristic, base case
    assert.deepEqual(PatternD(0, GREEN), qnil);                       // 2nd test for 0-1-many heuristic, base case
    assert.deepEqual(PatternD(2),                                     // 0-1-many heuristic, 1st 1 case, single recursive call
      qcons(row_green_se_sw, qcons(row_green_ne_nw, qnil)));
    assert.deepEqual(PatternD(2, RED),                                // 0-1-many heuristic, 2nd 1 case, single recursive call
      qcons(row_red_se_sw, qcons(row_red_ne_nw, qnil)));
    assert.deepEqual(PatternD(4),                                     // 0-1-many heuristic, 1st many case, >1 recursive call
      qcons(row_green_se_sw, qcons(row_green_ne_nw, qcons(row_green_se_sw, qcons(row_green_ne_nw, qnil)))));
    assert.deepEqual(PatternD(4, RED),                                // 0-1-many heuristic, 2nd many case, >1 recursive call
      qcons(row_red_se_sw, qcons(row_red_ne_nw, qcons(row_red_se_sw, qcons(row_red_ne_nw, qnil)))));
  });

  const row_green_nw_se: Row = rcons(nw_straight_green, rcons(se_straight_green, rnil));
  const row_green_se_nw: Row = rcons(se_straight_green, rcons(nw_straight_green, rnil));
  const row_red_nw_se: Row = rcons(nw_straight_red, rcons(se_straight_red, rnil));

  it('PatternE_1g', function () {
    assert.throws(() => PatternE(-1), BadArgument);                   // 1st test for valid input (rows < 0)
    assert.throws(() => PatternE(-2), BadArgument);                   // 2nd test for valid input (rows < 0)
    assert.deepEqual(PatternE(0), qnil);                              // 1st test for 0-1-many heuristic, base case #1 (rows === 0)
    assert.deepEqual(PatternE(0, RED), qnil);                         // 2nd test for 0-1-many heuristic, base case #1 (rows === 0)
    assert.deepEqual(PatternE(1), qcons(row_green_nw_se, qnil));      // 1st test for 0-1-many heuristic, base case #2 (rows === 1)
    assert.deepEqual(PatternE(1, RED), qcons(row_red_nw_se, qnil));   // 2nd test for 0-1-many heuristic, base case #2 (rows === 1)
    assert.deepEqual(PatternE(2),                                     // 0-1-many heuristic, 1st 1 case, single recursive call
      qcons(row_green_nw_se, qcons(row_green_se_nw, qnil)));
    assert.deepEqual(PatternE(3),                                     // 0-1-many heuristic, 2nd 1 case, single recursive call
      qcons(row_green_nw_se, qcons(row_green_se_nw, qcons(row_green_nw_se, qnil))));
    assert.deepEqual(PatternE(4),                                     // 0-1-many heuristic, 2nd many case, >1 recursive call
      qcons(row_green_nw_se, qcons(row_green_se_nw, qcons(row_green_nw_se, qcons(row_green_se_nw, qnil)))));
    assert.deepEqual(PatternE(5),                                     // 0-1-many heuristic, 2nd many case, >1 recursive call
      qcons(row_green_nw_se, qcons(row_green_se_nw, qcons(row_green_nw_se, qcons(row_green_se_nw, qcons(row_green_nw_se, qnil))))));
  });
});

// 1b, when these tests are written, there is no parameter rows, "4" is passed in for tests to run later on.
describe('patterns_1b', function() {

  const nw_round_green: Square = {shape: ROUND, color: GREEN, corner: NW};

  it('PatternA_1b', function() {
    const row_green: Row = rcons(nw_round_green, rcons(nw_round_green, rnil));
    assert.deepEqual(PatternA(4),
         qcons(row_green, qcons(row_green, qcons(row_green, qcons(row_green, qnil)))));
  });

  const se_straight_green: Square = { shape: STRAIGHT, color: GREEN, corner: SE };
  const nw_straight_green: Square = { shape: STRAIGHT, color: GREEN, corner: NW };

  it('PatternB_1b', function () {
    const row_green: Row = rcons(se_straight_green, rcons(nw_straight_green, rnil));
    assert.deepEqual(PatternB(4),
      qcons(row_green, qcons(row_green, qcons(row_green, qcons(row_green, qnil)))));
  });

  const ne_round_green: Square = { shape: ROUND, color: GREEN, corner: NE };
  const se_round_green: Square = { shape: ROUND, color: GREEN, corner: SE };
  const sw_round_green: Square = { shape: ROUND, color: GREEN, corner: SW };

  const row_green_ne_nw: Row = rcons(ne_round_green, rcons(nw_round_green, rnil));
  const row_green_se_sw: Row = rcons(se_round_green, rcons(sw_round_green, rnil));

  it('PatternC_1b', function () {
    assert.deepEqual(PatternC(4),
      qcons(row_green_ne_nw, qcons(row_green_se_sw, qcons(row_green_ne_nw, qcons(row_green_se_sw, qnil)))));
  });

  it('PatternD_1b', function () {
    assert.deepEqual(PatternD(4),
      qcons(row_green_se_sw, qcons(row_green_ne_nw, qcons(row_green_se_sw, qcons(row_green_ne_nw, qnil)))));
  });

  const row_green_nw_se: Row = rcons(nw_straight_green, rcons(se_straight_green, rnil));
  const row_green_se_nw: Row = rcons(se_straight_green, rcons(nw_straight_green, rnil));

  it('PatternE_1b', function () {
    assert.deepEqual(PatternE(4),
      qcons(row_green_nw_se, qcons(row_green_se_nw, qcons(row_green_nw_se, qcons(row_green_se_nw, qnil)))));
  });
});


// 1d, when these tests are written, there is no parameter rows, "4" is passed in for tests to run later on.
describe('patterns_1d', function () {

  const nw_round_green: Square = { shape: ROUND, color: GREEN, corner: NW };
  const nw_round_red: Square = { shape: ROUND, color: RED, corner: NW };

  it('PatternA_1d', function () {
    const row_green: Row = rcons(nw_round_green, rcons(nw_round_green, rnil));
    const row_red: Row = rcons(nw_round_red, rcons(nw_round_red, rnil));

    assert.deepEqual(PatternA(4),
      qcons(row_green, qcons(row_green, qcons(row_green, qcons(row_green, qnil)))));
    assert.deepEqual(PatternA(4, GREEN),
      qcons(row_green, qcons(row_green, qcons(row_green, qcons(row_green, qnil)))));
    assert.deepEqual(PatternA(4, RED),
      qcons(row_red, qcons(row_red, qcons(row_red, qcons(row_red, qnil)))));
  });

  const se_straight_green: Square = { shape: STRAIGHT, color: GREEN, corner: SE };
  const nw_straight_green: Square = { shape: STRAIGHT, color: GREEN, corner: NW };
  const se_straight_red: Square = { shape: STRAIGHT, color: RED, corner: SE };
  const nw_straight_red: Square = { shape: STRAIGHT, color: RED, corner: NW };

  it('PatternB_1d', function () {
    const row_green: Row = rcons(se_straight_green, rcons(nw_straight_green, rnil));
    const row_red: Row = rcons(se_straight_red, rcons(nw_straight_red, rnil));

    assert.deepEqual(PatternB(4),
      qcons(row_green, qcons(row_green, qcons(row_green, qcons(row_green, qnil)))));
    assert.deepEqual(PatternB(4, GREEN),
      qcons(row_green, qcons(row_green, qcons(row_green, qcons(row_green, qnil)))));
    assert.deepEqual(PatternB(4, RED),
      qcons(row_red, qcons(row_red, qcons(row_red, qcons(row_red, qnil)))));
  });

  const ne_round_green: Square = { shape: ROUND, color: GREEN, corner: NE };
  const se_round_green: Square = { shape: ROUND, color: GREEN, corner: SE };
  const sw_round_green: Square = { shape: ROUND, color: GREEN, corner: SW };
  const ne_round_red: Square = { shape: ROUND, color: RED, corner: NE };
  const se_round_red: Square = { shape: ROUND, color: RED, corner: SE };
  const sw_round_red: Square = { shape: ROUND, color: RED, corner: SW };

  const row_green_ne_nw: Row = rcons(ne_round_green, rcons(nw_round_green, rnil));
  const row_green_se_sw: Row = rcons(se_round_green, rcons(sw_round_green, rnil));
  const row_red_ne_nw: Row = rcons(ne_round_red, rcons(nw_round_red, rnil));
  const row_red_se_sw: Row = rcons(se_round_red, rcons(sw_round_red, rnil));

  it('PatternC_1d', function () {
    assert.deepEqual(PatternC(4),
      qcons(row_green_ne_nw, qcons(row_green_se_sw, qcons(row_green_ne_nw, qcons(row_green_se_sw, qnil)))));
    assert.deepEqual(PatternC(4, GREEN),
      qcons(row_green_ne_nw, qcons(row_green_se_sw, qcons(row_green_ne_nw, qcons(row_green_se_sw, qnil)))));
    assert.deepEqual(PatternC(4, RED),
      qcons(row_red_ne_nw, qcons(row_red_se_sw, qcons(row_red_ne_nw, qcons(row_red_se_sw, qnil)))));
  });

  it('PatternD_1d', function () {
    assert.deepEqual(PatternD(4),
      qcons(row_green_se_sw, qcons(row_green_ne_nw, qcons(row_green_se_sw, qcons(row_green_ne_nw, qnil)))));
    assert.deepEqual(PatternD(4, GREEN),
      qcons(row_green_se_sw, qcons(row_green_ne_nw, qcons(row_green_se_sw, qcons(row_green_ne_nw, qnil)))));  
    assert.deepEqual(PatternD(4, RED),
      qcons(row_red_se_sw, qcons(row_red_ne_nw, qcons(row_red_se_sw, qcons(row_red_ne_nw, qnil)))));
  });

  const row_green_nw_se: Row = rcons(nw_straight_green, rcons(se_straight_green, rnil));
  const row_green_se_nw: Row = rcons(se_straight_green, rcons(nw_straight_green, rnil));
  const row_red_nw_se: Row = rcons(nw_straight_red, rcons(se_straight_red, rnil));
  const row_red_se_nw: Row = rcons(se_straight_red, rcons(nw_straight_red, rnil));

  it('PatternE_1d', function () {
    assert.deepEqual(PatternE(4),
      qcons(row_green_nw_se, qcons(row_green_se_nw, qcons(row_green_nw_se, qcons(row_green_se_nw, qnil)))));
    assert.deepEqual(PatternE(4, GREEN),
      qcons(row_green_nw_se, qcons(row_green_se_nw, qcons(row_green_nw_se, qcons(row_green_se_nw, qnil)))));
    assert.deepEqual(PatternE(4, RED),
      qcons(row_red_nw_se, qcons(row_red_se_nw, qcons(row_red_nw_se, qcons(row_red_se_nw, qnil)))));
  });
});
