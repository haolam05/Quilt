import { Square, ROUND, GREEN, NW, NE, SW, SE, rcons, qcons, rnil, Row, Quilt, qnil, STRAIGHT, Color } from './quilt';


/** Thrown when a bad argument value is passed in. */
export class BadArgument extends Error {
  constructor(name: string, problem: string) {
    super(`bad argument "${name}": ${problem}`);

    Object.setPrototypeOf(this, BadArgument.prototype); // Ignore this
  }
}

/** Returns a quilt in pattern "A". */
export function PatternA(rows:number, color?:Color): Quilt {
  const sc: Square = { shape: ROUND, color: (color === undefined ? GREEN : color), corner: NW };
  const sc_sc: Row = rcons(sc, rcons(sc, rnil));
  if (rows < 0) {
    throw new BadArgument("rows", "number of rows can not be negative");
  } else if (rows === 0) {
    return qnil;
  } else {
    return qcons(sc_sc, PatternA(rows-1, color));
  }
}

/** Returns a quilt in pattern "B". */
export function PatternB(rows:number, color?: Color): Quilt {
  const sc: Square = { shape: STRAIGHT, color: (color === undefined ? GREEN : color), corner: SE };
  const tc: Square = { shape: STRAIGHT, color: (color === undefined ? GREEN : color), corner: NW };
  const sc_tc: Row = rcons(sc, rcons(tc, rnil));
  if (rows < 0) {
    throw new BadArgument("rows", "number of rows can not be negative");
  } else if (rows === 0) {
    return qnil;
  } else {
    return qcons(sc_tc, PatternB(rows-1, color));
  }
}

/** Returns a quilt in pattern "C". */
export function PatternC(rows:number, color?: Color): Quilt {
  const sc: Square = { shape: ROUND, color: (color === undefined ? GREEN : color), corner: NE };
  const tc: Square = { shape: ROUND, color: (color === undefined ? GREEN : color), corner: NW };
  const uc: Square = { shape: ROUND, color: (color === undefined ? GREEN : color), corner: SE };
  const vc: Square = { shape: ROUND, color: (color === undefined ? GREEN : color), corner: SW };
  const sc_tc: Row = rcons(sc, rcons(tc, rnil));
  const uc_vc: Row = rcons(uc, rcons(vc, rnil));
  if (rows < 0) {
    throw new BadArgument("rows", "number of rows can not be negative");
  } else if (rows % 2 === 1) {
    throw new BadArgument("rows", "number of rows can not be odd");
  } else if (rows === 0) {
    return qnil;
  } else {
    return qcons(sc_tc, qcons(uc_vc, PatternC(rows-2, color)));
  }
}

/** Returns a quilt in pattern "D". */
export function PatternD(rows:number, color?: Color): Quilt {
  const sc: Square = { shape: ROUND, color: (color === undefined ? GREEN : color), corner: SE };
  const tc: Square = { shape: ROUND, color: (color === undefined ? GREEN : color), corner: SW };
  const uc: Square = { shape: ROUND, color: (color === undefined ? GREEN : color), corner: NE };
  const vc: Square = { shape: ROUND, color: (color === undefined ? GREEN : color), corner: NW };
  const sc_tc: Row = rcons(sc, rcons(tc, rnil));
  const uc_vc: Row = rcons(uc, rcons(vc, rnil));
  if (rows < 0) {
    throw new BadArgument("rows", "number of rows can not be negative");
  } else if (rows % 2 === 1) {
    throw new BadArgument("rows", "number of rows can not be odd");
  } else if (rows === 0) {
    return qnil;
  } else {
    return qcons(sc_tc, qcons(uc_vc, PatternD(rows-2, color)));
  }
}

/** Returns a quilt in pattern "E". */
export function PatternE(rows:number, color?:Color): Quilt {
  const sc: Square = { shape: STRAIGHT, color: (color === undefined ? GREEN : color), corner: NW };
  const tc: Square = { shape: STRAIGHT, color: (color === undefined ? GREEN : color), corner: SE };
  const uc: Square = { shape: STRAIGHT, color: (color === undefined ? GREEN : color), corner: SE };
  const uv: Square = { shape: STRAIGHT, color: (color === undefined ? GREEN : color), corner: NW };
  const sc_tc: Row = rcons(sc, rcons(tc, rnil));
  const uc_uv: Row = rcons(uc, rcons(uv, rnil));
  if (rows < 0) {
    throw new BadArgument("rows", "number of rows can not be negative");
  } else if (rows === 0) {
    return qnil;
  } else if (rows === 1) {
    return qcons(sc_tc, qnil);
  } else {
    return qcons(sc_tc, qcons(uc_uv, PatternE(rows-2, color)));
  }
}
