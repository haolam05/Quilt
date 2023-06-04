export type Shape = "STRAIGHT" | "ROUND";

export const STRAIGHT = "STRAIGHT";
export const ROUND = "ROUND";


export type Color = "GREEN" | "RED";

export const GREEN = "GREEN";
export const RED = "RED";


export type Corner = "NW" | "NE" | "SW" | "SE";

export const NW = "NW";
export const NE = "NE";
export const SW = "SW";
export const SE = "SE";


export type Square = {
  shape: Shape,
  color: Color,
  corner: Corner
};


export type Row = "rnil" | {kind: "rcons", hd: Square, tl: Row};

export const rnil = "rnil";

export function rcons(hd: Square, tl: Row): Row {
  return {kind: "rcons", hd: hd, tl: tl};
}


export type Quilt= "qnil" | {kind: "qcons", hd: Row, tl: Quilt};

export const qnil = "qnil";

export function qcons(hd: Row, tl: Quilt): Quilt {
  return {kind: "qcons", hd: hd, tl: tl};
}


/** Returns the length of the given row. */
export function rlen(row: Row): number {
  if (row === rnil) {
    return 0;
  } else {
    return 1 + rlen(row.tl);
  }
}

/** Returns the concatenation of two rows. */
export function rconcat(row1: Row, row2: Row): Row {
  if (row1 === rnil) {
    return row2;
  } else {
    return rcons(row1.hd, rconcat(row1.tl, row2));
  }
}


/** Returns the length of the given quilt. */
export function qlen(quilt: Quilt): number {
  if (quilt === qnil) {
    return 0;
  } else {
    return 1 + qlen(quilt.tl);
  }
}

/** Returns the concatenation of two quilts. */
export function qconcat(quilt1: Quilt, quilt2: Quilt): Quilt {
  if (quilt1 === qnil) {
    return quilt2;
  } else {
    return qcons(quilt1.hd, qconcat(quilt1.tl, quilt2));
  }
}