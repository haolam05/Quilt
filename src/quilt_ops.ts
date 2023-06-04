import { Square, Row, rconcat, Quilt, qnil, qcons, qconcat, NW, NE, SW, SE, rnil, rcons } from './quilt';
import { BadArgument } from './patterns';


/** Returns the same square but flipped vertically. */
export function sflip_vert(s: Square): Square {
    if (s.corner === NW) {
        return { corner: SW, shape: s.shape, color: s.color };
    } else if (s.corner === NE) {
        return { corner: SE, shape: s.shape, color: s.color };
    } else if (s.corner === SW) {
        return { corner: NW, shape: s.shape, color: s.color };
    } else {  // SE
        return { corner: NE, shape: s.shape, color: s.color };
    }
}

/** Returns the same row but flipped vertically. */
export function rflip_vert(r: Row): Row {
    if (r === rnil) {
        return rnil;
    } else {
        return rcons(sflip_vert(r.hd), rflip_vert(r.tl));
    }
}

/** Returns the same quilt but flipped vertically. */
export function qflip_vert(q: Quilt): Quilt {
    if (q === qnil) {
        return qnil;
    } else {
        return qconcat(qflip_vert(q.tl), qcons(rflip_vert(q.hd), qnil));
    }
}


/** Returns the same square but flipped horizontally. */
export function sflip_horz(s: Square): Square {
    if (s.corner === NW) {
        return { corner: NE, shape: s.shape, color: s.color };
    } else if (s.corner === NE) {
        return { corner: NW, shape: s.shape, color: s.color };
    } else if (s.corner === SW) {
        return { corner: SE, shape: s.shape, color: s.color };
    } else {  // SE
        return { corner: SW, shape: s.shape, color: s.color };
    }
}

/** Returns the same row but flipped horizontally. */
export function rflip_horz(r: Row): Row {
    if (r === rnil) {
        return rnil;
    } else {
        return rconcat(rflip_horz(r.tl), rcons(sflip_horz(r.hd), rnil));
    }
}

/** Returns the same quilt but flipped horizontally. */
export function qflip_horz(q: Quilt): Quilt {
    if (q === qnil) {
        return qnil;
    } else {
        return qcons(rflip_horz(q.hd), qflip_horz(q.tl));
    }
}


/**
 * Returns the result of sewing together q1 and q2 horizontally, i.e.,
 * concatenating each of their rows. Throws an exception if they are not the
 * same length.
 */
export function sew(q1: Quilt, q2: Quilt): Quilt {
    if (q1 === qnil) {
        if (q2 === qnil) {
            return qnil;
        } else {
            throw new BadArgument("q2", "q1 has none rows but q2 has some");
        }
    } else {
        if (q2 === qnil) {
            throw new BadArgument("q1", "q2 has none rows but q1 has some");
        } else {
            return qcons(rconcat(q1.hd, q2.hd), sew(q1.tl, q2.tl));
        }
    }
}


/**
 * Returns the result of symmetrizing this quilt first vertically, by sewing it
 * together with its horizontally flipped version, and then horizontally, by
 * concatenating its rows with those of its vertically flipped version.
 */
export function symmetrize(q: Quilt): Quilt {
    let r = sew(q, qflip_horz(q));
    return qconcat(r, qflip_vert(r));
}
 