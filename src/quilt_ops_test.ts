import * as assert from 'assert';
import { NW, NE, SW, SE, GREEN, ROUND, Square, rnil, rcons, qnil, qcons, STRAIGHT, Row, Quilt } from './quilt';
import { qflip_horz, qflip_vert, rflip_horz, rflip_vert, sew, sflip_horz, sflip_vert, symmetrize } from './quilt_ops';


describe('quilt_ops', function() {
  const nw_sq_round: Square = { corner: NW, color: GREEN, shape: ROUND };
  const ne_sq_round: Square = { corner: NE, color: GREEN, shape: ROUND };
  const sw_sq_round: Square = { corner: SW, color: GREEN, shape: ROUND };
  const se_sq_round: Square = { corner: SE, color: GREEN, shape: ROUND };

  const nw_sq_straight: Square = { corner: NW, color: GREEN, shape: STRAIGHT };
  const ne_sq_straight: Square = { corner: NE, color: GREEN, shape: STRAIGHT };
  const sw_sq_straight: Square = { corner: SW, color: GREEN, shape: STRAIGHT };
  const se_sq_straight: Square = { corner: SE, color: GREEN, shape: STRAIGHT };

  it('sflip_vert', function() {
    assert.deepEqual(sflip_vert(nw_sq_round), sw_sq_round);         // 1st test for (corner === NW)
    assert.deepEqual(sflip_vert(nw_sq_straight), sw_sq_straight);   // 2nd test for (corner === NW)
    assert.deepEqual(sflip_vert(ne_sq_round), se_sq_round);         // 1st test for (corner === NE)
    assert.deepEqual(sflip_vert(ne_sq_straight), se_sq_straight);   // 2nd test for (corner === NE)
    assert.deepEqual(sflip_vert(sw_sq_round), nw_sq_round);         // 1st test for (corner === SW)
    assert.deepEqual(sflip_vert(sw_sq_straight), nw_sq_straight);   // 2nd test for (corner === SW)
    assert.deepEqual(sflip_vert(se_sq_round), ne_sq_round);         // 1st test for (corner === SE)
    assert.deepEqual(sflip_vert(se_sq_straight), ne_sq_straight);   // 2nd test for (corner === SE)
  });

  const row_sw: Row = rcons(sw_sq_round, rnil);
  const row_nw: Row = rcons(nw_sq_round, rnil);
  const row_nw_ne: Row = rcons(nw_sq_round, rcons(ne_sq_round, rnil));
  const row_sw_se: Row = rcons(sw_sq_round, rcons(se_sq_round, rnil));

  it('rflip_vert', function() {
    assert.deepEqual(rflip_vert(rnil), rnil);               // 0-1-many heuristic, 1st test for base case
    assert.deepEqual(rflip_vert(row_sw), row_nw);           // 0-1-many heuristic, 1st 1 case, single recursive call
    assert.deepEqual(rflip_vert(row_nw), row_sw);           // 0-1-many heuristic, 2nd 1 case, single recursive call
    assert.deepEqual(rflip_vert(row_nw_ne), row_sw_se);     // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(rflip_vert(row_sw_se), row_nw_ne);     // 0-1-many heuristic, 2nd many case, >1 recursive call
  });

  it('qflip_vert', function() {
    const q_one_row_1: Quilt = qcons(row_sw_se, qnil);
    const q_one_row_2: Quilt = qcons(row_nw_ne, qnil);
    const q_two_row_1: Quilt = qcons(row_nw, qcons(row_sw_se, qcons(row_nw_ne, qnil)));
    const q_two_row_2: Quilt = qcons(row_sw_se, qcons(row_nw_ne, qcons(row_sw, qnil)));

    assert.deepEqual(qflip_vert(qnil), qnil);                 // 0-1-many heuristic, 1st test for base case
    assert.deepEqual(qflip_vert(q_one_row_1), q_one_row_2);   // 0-1-many heuristic, 1st 1 case, single recursive call
    assert.deepEqual(qflip_vert(q_one_row_2), q_one_row_1);   // 0-1-many heuristic, 2nd 1 case, single recursive call
    assert.deepEqual(qflip_vert(q_two_row_1), q_two_row_2);   // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(qflip_vert(q_two_row_2), q_two_row_1);   // 0-1-many heuristic, 2nd many case, >1 recursive call
  });

  it('sflip_horz', function() {
    assert.deepEqual(sflip_horz(nw_sq_round), ne_sq_round);         // 1st test for (corner === NW)
    assert.deepEqual(sflip_horz(nw_sq_straight), ne_sq_straight);   // 2nd test for (corner === NW)
    assert.deepEqual(sflip_horz(ne_sq_round), nw_sq_round);         // 1st test for (corner === NE)
    assert.deepEqual(sflip_horz(ne_sq_straight), nw_sq_straight);   // 2nd test for (corner === NE)
    assert.deepEqual(sflip_horz(sw_sq_round), se_sq_round);         // 1st test for (corner === SW)
    assert.deepEqual(sflip_horz(sw_sq_straight), se_sq_straight);   // 2nd test for (corner === SW)
    assert.deepEqual(sflip_horz(se_sq_round), sw_sq_round);         // 1st test for (corner === SE)
    assert.deepEqual(sflip_horz(se_sq_straight), sw_sq_straight);   // 2nd test for (corner === SE)
  });

  const row_se: Row = rcons(se_sq_round, rnil);
  const row_ne: Row = rcons(ne_sq_round, rnil);
  it('rflip_horz', function() {
    assert.deepEqual(rflip_horz(rnil), rnil);               // 0-1-many heuristic, 1st test for base case
    assert.deepEqual(rflip_horz(row_sw), row_se);           // 0-1-many heuristic, 1st 1 case, single recursive call
    assert.deepEqual(rflip_horz(row_nw), row_ne);           // 0-1-many heuristic, 2nd 1 case, single recursive call
    assert.deepEqual(rflip_horz(row_nw_ne), row_nw_ne);     // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(rflip_horz(row_sw_se), row_sw_se);     // 0-1-many heuristic, 2nd many case, >1 recursive call
  });

  it('qflip_horz', function() {
    const row_se_sw: Row = rcons(se_sq_round, rcons(sw_sq_round, rnil));
    const q_one_row_1: Quilt = qcons(row_sw_se, qnil);
    const q_one_row_2: Quilt = qcons(row_se_sw, qnil);
    const q_two_row_1: Quilt = qcons(row_sw_se, qcons(row_nw_ne, qcons(row_sw, qnil)));
    const q_two_row_2: Quilt = qcons(row_sw_se, qcons(row_nw_ne, qcons(row_se, qnil)));

    assert.deepEqual(qflip_horz(qnil), qnil);                 // 0-1-many heuristic, 1st test for base case
    assert.deepEqual(qflip_horz(q_one_row_1), q_one_row_1);   // 0-1-many heuristic, 1st 1 case, single recursive call
    assert.deepEqual(qflip_horz(q_one_row_2), q_one_row_2);   // 0-1-many heuristic, 2nd 1 case, single recursive call
    assert.deepEqual(qflip_horz(q_two_row_1), q_two_row_2);   // 0-1-many heuristic, 1st many case, >1 recursive call
    assert.deepEqual(qflip_horz(q_two_row_2), q_two_row_1);   // 0-1-many heuristic, 2nd many case, >1 recursive call
  });

  const nw_sq: Square = {corner: NW, color: GREEN, shape: ROUND};
  const ne_sq: Square = {corner: NE, color: GREEN, shape: ROUND};
  const se_sq: Square = {corner: SE, color: GREEN, shape: ROUND};
  const sw_sq: Square = {corner: SW, color: GREEN, shape: ROUND};

  it('sew', function() {
    const r1 = rcons(nw_sq, rcons(ne_sq, rnil));
    const r2 = rcons(nw_sq, rcons(ne_sq, rcons(nw_sq, rcons(ne_sq, rnil))));
    assert.deepEqual(sew(qnil, qnil), qnil);
    assert.deepEqual(sew(qcons(r1, qnil), qcons(r1, qnil)), qcons(r2, qnil));
    assert.deepEqual(
        sew(qcons(r1, qcons(r1, qnil)), qcons(r1, qcons(r1, qnil))),
        qcons(r2, qcons(r2, qnil)));
  });

  it('symmetrize', function() {
    assert.deepEqual(symmetrize(qnil), qnil);
    assert.deepEqual(symmetrize(qcons(rcons(nw_sq, rnil), qnil)),
        qcons(rcons(nw_sq, rcons(ne_sq, rnil)),
            qcons(rcons(sw_sq, rcons(se_sq, rnil)), qnil)));

    const r1 = rcons(nw_sq, rcons(ne_sq, rnil));
    assert.deepEqual(symmetrize(qcons(r1, qnil)),
        qcons(
            rcons(nw_sq, rcons(ne_sq, rcons(nw_sq, rcons(ne_sq, rnil)))),
            qcons(
                rcons(sw_sq, rcons(se_sq, rcons(sw_sq, rcons(se_sq, rnil)))),
                qnil)));

    const r2 = rcons(sw_sq, rcons(se_sq, rnil));
    assert.deepEqual(symmetrize(qcons(r1, qcons(r2, qnil))),
        qcons(
            rcons(nw_sq, rcons(ne_sq, rcons(nw_sq, rcons(ne_sq, rnil)))),
            qcons(
                rcons(sw_sq, rcons(se_sq, rcons(sw_sq, rcons(se_sq, rnil)))),
                qcons(
                    rcons(nw_sq, rcons(ne_sq, rcons(nw_sq, rcons(ne_sq, rnil)))),
                    qcons(
                        rcons(sw_sq, rcons(se_sq, rcons(sw_sq, rcons(se_sq, rnil)))),
                        qnil)))));
  });

});
