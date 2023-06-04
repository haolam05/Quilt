export type JsxList = "jnil" | {kind: "jcons", hd: JSX.Element, tl: JsxList};

export const jnil = "jnil";

export function jcons(hd: JSX.Element, tl: JsxList): JsxList {
  return {kind: "jcons", hd: hd, tl: tl};
}


/** Returns the elements of a list, packed into an array. */
export function jcompact(L: JsxList): JSX.Element[] {
    const A: JSX.Element[] = [];
    while (L !== jnil) {
        A.push(L.hd);
        L = L.tl;
    }
    return A;
}

/** Returns the elements in the given array as a list. */
export function jexplode(A: JSX.Element[]): JsxList {
    let L: JsxList = jnil;
    for (let i = A.length - 1; i >= 0; i--) {
        L = jcons(A[i], L);
    }
    return L;
}