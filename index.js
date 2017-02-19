const any = require("ramda/src/any");
const ap = require("ramda/src/ap");
const apply = require("ramda/src/apply");
const memoize = require("ramda/src/memoize");
const of = require("ramda/src/of");
const pipe = require("ramda/src/pipe");

const bad = fns => any(fn => typeof fn !== "function")(fns);

module.exports = (...fns) => {
  const preFns = Array.isArray(fns[0])
        ? fns[0]
        : fns.slice(0, -1);

  if (bad(preFns))
    return () => {
      throw new Error("input-selectors to be functions");
    };

  const lastFn = memoize(fns[fns.length - 1]);
  return pipe(
    of
    , ap(preFns)
    , apply(lastFn));
};
