(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    0: function (t, e, n) {
      t.exports = n("zUnb");
    },
    zUnb: function (t, e, n) {
      "use strict";
      function r(t) {
        return "function" == typeof t;
      }
      n.r(e);
      let s = !1;
      const i = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(t) {
          if (t) {
            const t = new Error();
            console.warn(
              "DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
                t.stack
            );
          } else
            s &&
              console.log(
                "RxJS: Back to a better error behavior. Thank you. <3"
              );
          s = t;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return s;
        },
      };
      function o(t) {
        setTimeout(() => {
          throw t;
        }, 0);
      }
      const a = {
          closed: !0,
          next(t) {},
          error(t) {
            if (i.useDeprecatedSynchronousErrorHandling) throw t;
            o(t);
          },
          complete() {},
        },
        l = (() =>
          Array.isArray || ((t) => t && "number" == typeof t.length))();
      function u(t) {
        return null !== t && "object" == typeof t;
      }
      const c = (() => {
        function t(t) {
          return (
            Error.call(this),
            (this.message = t
              ? `${t.length} errors occurred during unsubscription:\n${t
                  .map((t, e) => `${e + 1}) ${t.toString()}`)
                  .join("\n  ")}`
              : ""),
            (this.name = "UnsubscriptionError"),
            (this.errors = t),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      let h = (() => {
        class t {
          constructor(t) {
            (this.closed = !1),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              t && ((this._ctorUnsubscribe = !0), (this._unsubscribe = t));
          }
          unsubscribe() {
            let e;
            if (this.closed) return;
            let {
              _parentOrParents: n,
              _ctorUnsubscribe: s,
              _unsubscribe: i,
              _subscriptions: o,
            } = this;
            if (
              ((this.closed = !0),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              n instanceof t)
            )
              n.remove(this);
            else if (null !== n)
              for (let t = 0; t < n.length; ++t) n[t].remove(this);
            if (r(i)) {
              s && (this._unsubscribe = void 0);
              try {
                i.call(this);
              } catch (a) {
                e = a instanceof c ? d(a.errors) : [a];
              }
            }
            if (l(o)) {
              let t = -1,
                n = o.length;
              for (; ++t < n; ) {
                const n = o[t];
                if (u(n))
                  try {
                    n.unsubscribe();
                  } catch (a) {
                    (e = e || []),
                      a instanceof c ? (e = e.concat(d(a.errors))) : e.push(a);
                  }
              }
            }
            if (e) throw new c(e);
          }
          add(e) {
            let n = e;
            if (!e) return t.EMPTY;
            switch (typeof e) {
              case "function":
                n = new t(e);
              case "object":
                if (
                  n === this ||
                  n.closed ||
                  "function" != typeof n.unsubscribe
                )
                  return n;
                if (this.closed) return n.unsubscribe(), n;
                if (!(n instanceof t)) {
                  const e = n;
                  (n = new t()), (n._subscriptions = [e]);
                }
                break;
              default:
                throw new Error(
                  "unrecognized teardown " + e + " added to Subscription."
                );
            }
            let { _parentOrParents: r } = n;
            if (null === r) n._parentOrParents = this;
            else if (r instanceof t) {
              if (r === this) return n;
              n._parentOrParents = [r, this];
            } else {
              if (-1 !== r.indexOf(this)) return n;
              r.push(this);
            }
            const s = this._subscriptions;
            return null === s ? (this._subscriptions = [n]) : s.push(n), n;
          }
          remove(t) {
            const e = this._subscriptions;
            if (e) {
              const n = e.indexOf(t);
              -1 !== n && e.splice(n, 1);
            }
          }
        }
        return (
          (t.EMPTY = (function (t) {
            return (t.closed = !0), t;
          })(new t())),
          t
        );
      })();
      function d(t) {
        return t.reduce((t, e) => t.concat(e instanceof c ? e.errors : e), []);
      }
      const p = (() =>
        "function" == typeof Symbol
          ? Symbol("rxSubscriber")
          : "@@rxSubscriber_" + Math.random())();
      class f extends h {
        constructor(t, e, n) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = a;
              break;
            case 1:
              if (!t) {
                this.destination = a;
                break;
              }
              if ("object" == typeof t) {
                t instanceof f
                  ? ((this.syncErrorThrowable = t.syncErrorThrowable),
                    (this.destination = t),
                    t.add(this))
                  : ((this.syncErrorThrowable = !0),
                    (this.destination = new g(this, t)));
                break;
              }
            default:
              (this.syncErrorThrowable = !0),
                (this.destination = new g(this, t, e, n));
          }
        }
        [p]() {
          return this;
        }
        static create(t, e, n) {
          const r = new f(t, e, n);
          return (r.syncErrorThrowable = !1), r;
        }
        next(t) {
          this.isStopped || this._next(t);
        }
        error(t) {
          this.isStopped || ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe());
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          this.destination.error(t), this.unsubscribe();
        }
        _complete() {
          this.destination.complete(), this.unsubscribe();
        }
        _unsubscribeAndRecycle() {
          const { _parentOrParents: t } = this;
          return (
            (this._parentOrParents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parentOrParents = t),
            this
          );
        }
      }
      class g extends f {
        constructor(t, e, n, s) {
          let i;
          super(), (this._parentSubscriber = t);
          let o = this;
          r(e)
            ? (i = e)
            : e &&
              ((i = e.next),
              (n = e.error),
              (s = e.complete),
              e !== a &&
                ((o = Object.create(e)),
                r(o.unsubscribe) && this.add(o.unsubscribe.bind(o)),
                (o.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = o),
            (this._next = i),
            (this._error = n),
            (this._complete = s);
        }
        next(t) {
          if (!this.isStopped && this._next) {
            const { _parentSubscriber: e } = this;
            i.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
              ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, t);
          }
        }
        error(t) {
          if (!this.isStopped) {
            const { _parentSubscriber: e } = this,
              { useDeprecatedSynchronousErrorHandling: n } = i;
            if (this._error)
              n && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
            else if (e.syncErrorThrowable)
              n ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0)) : o(t),
                this.unsubscribe();
            else {
              if ((this.unsubscribe(), n)) throw t;
              o(t);
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: t } = this;
            if (this._complete) {
              const e = () => this._complete.call(this._context);
              i.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
                ? (this.__tryOrSetError(t, e), this.unsubscribe())
                : (this.__tryOrUnsub(e), this.unsubscribe());
            } else this.unsubscribe();
          }
        }
        __tryOrUnsub(t, e) {
          try {
            t.call(this._context, e);
          } catch (n) {
            if ((this.unsubscribe(), i.useDeprecatedSynchronousErrorHandling))
              throw n;
            o(n);
          }
        }
        __tryOrSetError(t, e, n) {
          if (!i.useDeprecatedSynchronousErrorHandling)
            throw new Error("bad call");
          try {
            e.call(this._context, n);
          } catch (r) {
            return i.useDeprecatedSynchronousErrorHandling
              ? ((t.syncErrorValue = r), (t.syncErrorThrown = !0), !0)
              : (o(r), !0);
          }
          return !1;
        }
        _unsubscribe() {
          const { _parentSubscriber: t } = this;
          (this._context = null),
            (this._parentSubscriber = null),
            t.unsubscribe();
        }
      }
      const m = (() =>
        ("function" == typeof Symbol && Symbol.observable) || "@@observable")();
      function y(t) {
        return t;
      }
      let v = (() => {
        class t {
          constructor(t) {
            (this._isScalar = !1), t && (this._subscribe = t);
          }
          lift(e) {
            const n = new t();
            return (n.source = this), (n.operator = e), n;
          }
          subscribe(t, e, n) {
            const { operator: r } = this,
              s = (function (t, e, n) {
                if (t) {
                  if (t instanceof f) return t;
                  if (t[p]) return t[p]();
                }
                return t || e || n ? new f(t, e, n) : new f(a);
              })(t, e, n);
            if (
              (s.add(
                r
                  ? r.call(s, this.source)
                  : this.source ||
                    (i.useDeprecatedSynchronousErrorHandling &&
                      !s.syncErrorThrowable)
                  ? this._subscribe(s)
                  : this._trySubscribe(s)
              ),
              i.useDeprecatedSynchronousErrorHandling &&
                s.syncErrorThrowable &&
                ((s.syncErrorThrowable = !1), s.syncErrorThrown))
            )
              throw s.syncErrorValue;
            return s;
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (e) {
              i.useDeprecatedSynchronousErrorHandling &&
                ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
                (function (t) {
                  for (; t; ) {
                    const { closed: e, destination: n, isStopped: r } = t;
                    if (e || r) return !1;
                    t = n && n instanceof f ? n : null;
                  }
                  return !0;
                })(t)
                  ? t.error(e)
                  : console.warn(e);
            }
          }
          forEach(t, e) {
            return new (e = w(e))((e, n) => {
              let r;
              r = this.subscribe(
                (e) => {
                  try {
                    t(e);
                  } catch (s) {
                    n(s), r && r.unsubscribe();
                  }
                },
                n,
                e
              );
            });
          }
          _subscribe(t) {
            const { source: e } = this;
            return e && e.subscribe(t);
          }
          [m]() {
            return this;
          }
          pipe(...t) {
            return 0 === t.length
              ? this
              : (0 === (e = t).length
                  ? y
                  : 1 === e.length
                  ? e[0]
                  : function (t) {
                      return e.reduce((t, e) => e(t), t);
                    })(this);
            var e;
          }
          toPromise(t) {
            return new (t = w(t))((t, e) => {
              let n;
              this.subscribe(
                (t) => (n = t),
                (t) => e(t),
                () => t(n)
              );
            });
          }
        }
        return (t.create = (e) => new t(e)), t;
      })();
      function w(t) {
        if ((t || (t = i.Promise || Promise), !t))
          throw new Error("no Promise impl found");
        return t;
      }
      const _ = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "object unsubscribed"),
            (this.name = "ObjectUnsubscribedError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      class b extends h {
        constructor(t, e) {
          super(),
            (this.subject = t),
            (this.subscriber = e),
            (this.closed = !1);
        }
        unsubscribe() {
          if (this.closed) return;
          this.closed = !0;
          const t = this.subject,
            e = t.observers;
          if (
            ((this.subject = null),
            !e || 0 === e.length || t.isStopped || t.closed)
          )
            return;
          const n = e.indexOf(this.subscriber);
          -1 !== n && e.splice(n, 1);
        }
      }
      class S extends f {
        constructor(t) {
          super(t), (this.destination = t);
        }
      }
      let C = (() => {
        class t extends v {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          [p]() {
            return new S(this);
          }
          lift(t) {
            const e = new x(this, this);
            return (e.operator = t), e;
          }
          next(t) {
            if (this.closed) throw new _();
            if (!this.isStopped) {
              const { observers: e } = this,
                n = e.length,
                r = e.slice();
              for (let s = 0; s < n; s++) r[s].next(t);
            }
          }
          error(t) {
            if (this.closed) throw new _();
            (this.hasError = !0), (this.thrownError = t), (this.isStopped = !0);
            const { observers: e } = this,
              n = e.length,
              r = e.slice();
            for (let s = 0; s < n; s++) r[s].error(t);
            this.observers.length = 0;
          }
          complete() {
            if (this.closed) throw new _();
            this.isStopped = !0;
            const { observers: t } = this,
              e = t.length,
              n = t.slice();
            for (let r = 0; r < e; r++) n[r].complete();
            this.observers.length = 0;
          }
          unsubscribe() {
            (this.isStopped = !0), (this.closed = !0), (this.observers = null);
          }
          _trySubscribe(t) {
            if (this.closed) throw new _();
            return super._trySubscribe(t);
          }
          _subscribe(t) {
            if (this.closed) throw new _();
            return this.hasError
              ? (t.error(this.thrownError), h.EMPTY)
              : this.isStopped
              ? (t.complete(), h.EMPTY)
              : (this.observers.push(t), new b(this, t));
          }
          asObservable() {
            const t = new v();
            return (t.source = this), t;
          }
        }
        return (t.create = (t, e) => new x(t, e)), t;
      })();
      class x extends C {
        constructor(t, e) {
          super(), (this.destination = t), (this.source = e);
        }
        next(t) {
          const { destination: e } = this;
          e && e.next && e.next(t);
        }
        error(t) {
          const { destination: e } = this;
          e && e.error && this.destination.error(t);
        }
        complete() {
          const { destination: t } = this;
          t && t.complete && this.destination.complete();
        }
        _subscribe(t) {
          const { source: e } = this;
          return e ? this.source.subscribe(t) : h.EMPTY;
        }
      }
      function T(t) {
        return t && "function" == typeof t.schedule;
      }
      function E(t, e) {
        return function (n) {
          if ("function" != typeof t)
            throw new TypeError(
              "argument is not a function. Are you looking for `mapTo()`?"
            );
          return n.lift(new k(t, e));
        };
      }
      class k {
        constructor(t, e) {
          (this.project = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new A(t, this.project, this.thisArg));
        }
      }
      class A extends f {
        constructor(t, e, n) {
          super(t),
            (this.project = e),
            (this.count = 0),
            (this.thisArg = n || this);
        }
        _next(t) {
          let e;
          try {
            e = this.project.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      const R = (t) => (e) => {
        for (let n = 0, r = t.length; n < r && !e.closed; n++) e.next(t[n]);
        e.complete();
      };
      function I() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      }
      const O = I(),
        P = (t) => t && "number" == typeof t.length && "function" != typeof t;
      function j(t) {
        return (
          !!t && "function" != typeof t.subscribe && "function" == typeof t.then
        );
      }
      const N = (t) => {
        if (t && "function" == typeof t[m])
          return (
            (r = t),
            (t) => {
              const e = r[m]();
              if ("function" != typeof e.subscribe)
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              return e.subscribe(t);
            }
          );
        if (P(t)) return R(t);
        if (j(t))
          return (
            (n = t),
            (t) => (
              n
                .then(
                  (e) => {
                    t.closed || (t.next(e), t.complete());
                  },
                  (e) => t.error(e)
                )
                .then(null, o),
              t
            )
          );
        if (t && "function" == typeof t[O])
          return (
            (e = t),
            (t) => {
              const n = e[O]();
              for (;;) {
                let e;
                try {
                  e = n.next();
                } catch (r) {
                  return t.error(r), t;
                }
                if (e.done) {
                  t.complete();
                  break;
                }
                if ((t.next(e.value), t.closed)) break;
              }
              return (
                "function" == typeof n.return &&
                  t.add(() => {
                    n.return && n.return();
                  }),
                t
              );
            }
          );
        {
          const e = u(t) ? "an invalid object" : `'${t}'`;
          throw new TypeError(
            `You provided ${e} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`
          );
        }
        var e, n, r;
      };
      function U(t, e) {
        return new v((n) => {
          const r = new h();
          let s = 0;
          return (
            r.add(
              e.schedule(function () {
                s !== t.length
                  ? (n.next(t[s++]), n.closed || r.add(this.schedule()))
                  : n.complete();
              })
            ),
            r
          );
        });
      }
      function D(t, e) {
        return e
          ? (function (t, e) {
              if (null != t) {
                if (
                  (function (t) {
                    return t && "function" == typeof t[m];
                  })(t)
                )
                  return (function (t, e) {
                    return new v((n) => {
                      const r = new h();
                      return (
                        r.add(
                          e.schedule(() => {
                            const s = t[m]();
                            r.add(
                              s.subscribe({
                                next(t) {
                                  r.add(e.schedule(() => n.next(t)));
                                },
                                error(t) {
                                  r.add(e.schedule(() => n.error(t)));
                                },
                                complete() {
                                  r.add(e.schedule(() => n.complete()));
                                },
                              })
                            );
                          })
                        ),
                        r
                      );
                    });
                  })(t, e);
                if (j(t))
                  return (function (t, e) {
                    return new v((n) => {
                      const r = new h();
                      return (
                        r.add(
                          e.schedule(() =>
                            t.then(
                              (t) => {
                                r.add(
                                  e.schedule(() => {
                                    n.next(t),
                                      r.add(e.schedule(() => n.complete()));
                                  })
                                );
                              },
                              (t) => {
                                r.add(e.schedule(() => n.error(t)));
                              }
                            )
                          )
                        ),
                        r
                      );
                    });
                  })(t, e);
                if (P(t)) return U(t, e);
                if (
                  (function (t) {
                    return t && "function" == typeof t[O];
                  })(t) ||
                  "string" == typeof t
                )
                  return (function (t, e) {
                    if (!t) throw new Error("Iterable cannot be null");
                    return new v((n) => {
                      const r = new h();
                      let s;
                      return (
                        r.add(() => {
                          s && "function" == typeof s.return && s.return();
                        }),
                        r.add(
                          e.schedule(() => {
                            (s = t[O]()),
                              r.add(
                                e.schedule(function () {
                                  if (n.closed) return;
                                  let t, e;
                                  try {
                                    const n = s.next();
                                    (t = n.value), (e = n.done);
                                  } catch (r) {
                                    return void n.error(r);
                                  }
                                  e
                                    ? n.complete()
                                    : (n.next(t), this.schedule());
                                })
                              );
                          })
                        ),
                        r
                      );
                    });
                  })(t, e);
              }
              throw new TypeError(
                ((null !== t && typeof t) || t) + " is not observable"
              );
            })(t, e)
          : t instanceof v
          ? t
          : new v(N(t));
      }
      class L extends f {
        constructor(t) {
          super(), (this.parent = t);
        }
        _next(t) {
          this.parent.notifyNext(t);
        }
        _error(t) {
          this.parent.notifyError(t), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(), this.unsubscribe();
        }
      }
      class H extends f {
        notifyNext(t) {
          this.destination.next(t);
        }
        notifyError(t) {
          this.destination.error(t);
        }
        notifyComplete() {
          this.destination.complete();
        }
      }
      function F(t, e) {
        if (!e.closed) return t instanceof v ? t.subscribe(e) : N(t)(e);
      }
      function M(t, e, n = Number.POSITIVE_INFINITY) {
        return "function" == typeof e
          ? (r) =>
              r.pipe(
                M((n, r) => D(t(n, r)).pipe(E((t, s) => e(n, t, r, s))), n)
              )
          : ("number" == typeof e && (n = e), (e) => e.lift(new V(t, n)));
      }
      class V {
        constructor(t, e = Number.POSITIVE_INFINITY) {
          (this.project = t), (this.concurrent = e);
        }
        call(t, e) {
          return e.subscribe(new $(t, this.project, this.concurrent));
        }
      }
      class $ extends H {
        constructor(t, e, n = Number.POSITIVE_INFINITY) {
          super(t),
            (this.project = e),
            (this.concurrent = n),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0);
        }
        _next(t) {
          this.active < this.concurrent
            ? this._tryNext(t)
            : this.buffer.push(t);
        }
        _tryNext(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (r) {
            return void this.destination.error(r);
          }
          this.active++, this._innerSub(e);
        }
        _innerSub(t) {
          const e = new L(this),
            n = this.destination;
          n.add(e);
          const r = F(t, e);
          r !== e && n.add(r);
        }
        _complete() {
          (this.hasCompleted = !0),
            0 === this.active &&
              0 === this.buffer.length &&
              this.destination.complete(),
            this.unsubscribe();
        }
        notifyNext(t) {
          this.destination.next(t);
        }
        notifyComplete() {
          const t = this.buffer;
          this.active--,
            t.length > 0
              ? this._next(t.shift())
              : 0 === this.active &&
                this.hasCompleted &&
                this.destination.complete();
        }
      }
      function z(t = Number.POSITIVE_INFINITY) {
        return M(y, t);
      }
      function q(t, e) {
        return e ? U(t, e) : new v(R(t));
      }
      function B() {
        return function (t) {
          return t.lift(new W(t));
        };
      }
      class W {
        constructor(t) {
          this.connectable = t;
        }
        call(t, e) {
          const { connectable: n } = this;
          n._refCount++;
          const r = new G(t, n),
            s = e.subscribe(r);
          return r.closed || (r.connection = n.connect()), s;
        }
      }
      class G extends f {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _unsubscribe() {
          const { connectable: t } = this;
          if (!t) return void (this.connection = null);
          this.connectable = null;
          const e = t._refCount;
          if (e <= 0) return void (this.connection = null);
          if (((t._refCount = e - 1), e > 1))
            return void (this.connection = null);
          const { connection: n } = this,
            r = t._connection;
          (this.connection = null), !r || (n && r !== n) || r.unsubscribe();
        }
      }
      class Z extends v {
        constructor(t, e) {
          super(),
            (this.source = t),
            (this.subjectFactory = e),
            (this._refCount = 0),
            (this._isComplete = !1);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (t && !t.isStopped) || (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        connect() {
          let t = this._connection;
          return (
            t ||
              ((this._isComplete = !1),
              (t = this._connection = new h()),
              t.add(this.source.subscribe(new K(this.getSubject(), this))),
              t.closed && ((this._connection = null), (t = h.EMPTY))),
            t
          );
        }
        refCount() {
          return B()(this);
        }
      }
      const Q = (() => {
        const t = Z.prototype;
        return {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: t._subscribe },
          _isComplete: { value: t._isComplete, writable: !0 },
          getSubject: { value: t.getSubject },
          connect: { value: t.connect },
          refCount: { value: t.refCount },
        };
      })();
      class K extends S {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _error(t) {
          this._unsubscribe(), super._error(t);
        }
        _complete() {
          (this.connectable._isComplete = !0),
            this._unsubscribe(),
            super._complete();
        }
        _unsubscribe() {
          const t = this.connectable;
          if (t) {
            this.connectable = null;
            const e = t._connection;
            (t._refCount = 0),
              (t._subject = null),
              (t._connection = null),
              e && e.unsubscribe();
          }
        }
      }
      function J() {
        return new C();
      }
      function Y(t) {
        for (let e in t) if (t[e] === Y) return e;
        throw Error("Could not find renamed property on target object.");
      }
      function X(t) {
        if ("string" == typeof t) return t;
        if (Array.isArray(t)) return "[" + t.map(X).join(", ") + "]";
        if (null == t) return "" + t;
        if (t.overriddenName) return "" + t.overriddenName;
        if (t.name) return "" + t.name;
        const e = t.toString();
        if (null == e) return "" + e;
        const n = e.indexOf("\n");
        return -1 === n ? e : e.substring(0, n);
      }
      function tt(t, e) {
        return null == t || "" === t
          ? null === e
            ? ""
            : e
          : null == e || "" === e
          ? t
          : t + " " + e;
      }
      const et = Y({ __forward_ref__: Y });
      function nt(t) {
        return (
          (t.__forward_ref__ = nt),
          (t.toString = function () {
            return X(this());
          }),
          t
        );
      }
      function rt(t) {
        return "function" == typeof (e = t) &&
          e.hasOwnProperty(et) &&
          e.__forward_ref__ === nt
          ? t()
          : t;
        var e;
      }
      function st(t) {
        return {
          token: t.token,
          providedIn: t.providedIn || null,
          factory: t.factory,
          value: void 0,
        };
      }
      function it(t) {
        return {
          factory: t.factory,
          providers: t.providers || [],
          imports: t.imports || [],
        };
      }
      function ot(t) {
        return at(t, ut) || at(t, ht);
      }
      function at(t, e) {
        return t.hasOwnProperty(e) ? t[e] : null;
      }
      function lt(t) {
        return t && (t.hasOwnProperty(ct) || t.hasOwnProperty(dt))
          ? t[ct]
          : null;
      }
      const ut = Y({ "\u0275prov": Y }),
        ct = Y({ "\u0275inj": Y }),
        ht = Y({ ngInjectableDef: Y }),
        dt = Y({ ngInjectorDef: Y });
      var pt = (function (t) {
        return (
          (t[(t.Default = 0)] = "Default"),
          (t[(t.Host = 1)] = "Host"),
          (t[(t.Self = 2)] = "Self"),
          (t[(t.SkipSelf = 4)] = "SkipSelf"),
          (t[(t.Optional = 8)] = "Optional"),
          t
        );
      })({});
      let ft;
      function gt(t) {
        const e = ft;
        return (ft = t), e;
      }
      function mt(t, e, n) {
        const r = ot(t);
        if (r && "root" == r.providedIn)
          return void 0 === r.value ? (r.value = r.factory()) : r.value;
        if (n & pt.Optional) return null;
        if (void 0 !== e) return e;
        throw new Error(`Injector: NOT_FOUND [${X(t)}]`);
      }
      function yt(t) {
        return { toString: t }.toString();
      }
      var vt = (function (t) {
          return (
            (t[(t.OnPush = 0)] = "OnPush"), (t[(t.Default = 1)] = "Default"), t
          );
        })({}),
        wt = (function (t) {
          return (
            (t[(t.Emulated = 0)] = "Emulated"),
            (t[(t.None = 2)] = "None"),
            (t[(t.ShadowDom = 3)] = "ShadowDom"),
            t
          );
        })({});
      const _t = "undefined" != typeof globalThis && globalThis,
        bt = "undefined" != typeof window && window,
        St =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        Ct = "undefined" != typeof global && global,
        xt = _t || Ct || bt || St,
        Tt = {},
        Et = [],
        kt = Y({ "\u0275cmp": Y }),
        At = Y({ "\u0275dir": Y }),
        Rt = Y({ "\u0275pipe": Y }),
        It = Y({ "\u0275mod": Y }),
        Ot = Y({ "\u0275loc": Y }),
        Pt = Y({ "\u0275fac": Y }),
        jt = Y({ __NG_ELEMENT_ID__: Y });
      let Nt = 0;
      function Ut(t) {
        return yt(() => {
          const e = {},
            n = {
              type: t.type,
              providersResolver: null,
              decls: t.decls,
              vars: t.vars,
              factory: null,
              template: t.template || null,
              consts: t.consts || null,
              ngContentSelectors: t.ngContentSelectors,
              hostBindings: t.hostBindings || null,
              hostVars: t.hostVars || 0,
              hostAttrs: t.hostAttrs || null,
              contentQueries: t.contentQueries || null,
              declaredInputs: e,
              inputs: null,
              outputs: null,
              exportAs: t.exportAs || null,
              onPush: t.changeDetection === vt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: t.selectors || Et,
              viewQuery: t.viewQuery || null,
              features: t.features || null,
              data: t.data || {},
              encapsulation: t.encapsulation || wt.Emulated,
              id: "c",
              styles: t.styles || Et,
              _: null,
              setInput: null,
              schemas: t.schemas || null,
              tView: null,
            },
            r = t.directives,
            s = t.features,
            i = t.pipes;
          return (
            (n.id += Nt++),
            (n.inputs = Mt(t.inputs, e)),
            (n.outputs = Mt(t.outputs)),
            s && s.forEach((t) => t(n)),
            (n.directiveDefs = r
              ? () => ("function" == typeof r ? r() : r).map(Dt)
              : null),
            (n.pipeDefs = i
              ? () => ("function" == typeof i ? i() : i).map(Lt)
              : null),
            n
          );
        });
      }
      function Dt(t) {
        return (
          zt(t) ||
          (function (t) {
            return t[At] || null;
          })(t)
        );
      }
      function Lt(t) {
        return (function (t) {
          return t[Rt] || null;
        })(t);
      }
      const Ht = {};
      function Ft(t) {
        const e = {
          type: t.type,
          bootstrap: t.bootstrap || Et,
          declarations: t.declarations || Et,
          imports: t.imports || Et,
          exports: t.exports || Et,
          transitiveCompileScopes: null,
          schemas: t.schemas || null,
          id: t.id || null,
        };
        return (
          null != t.id &&
            yt(() => {
              Ht[t.id] = t.type;
            }),
          e
        );
      }
      function Mt(t, e) {
        if (null == t) return Tt;
        const n = {};
        for (const r in t)
          if (t.hasOwnProperty(r)) {
            let s = t[r],
              i = s;
            Array.isArray(s) && ((i = s[1]), (s = s[0])),
              (n[s] = r),
              e && (e[s] = i);
          }
        return n;
      }
      const Vt = Ut;
      function $t(t) {
        return {
          type: t.type,
          name: t.name,
          factory: null,
          pure: !1 !== t.pure,
          onDestroy: t.type.prototype.ngOnDestroy || null,
        };
      }
      function zt(t) {
        return t[kt] || null;
      }
      function qt(t, e) {
        const n = t[It] || null;
        if (!n && !0 === e)
          throw new Error(`Type ${X(t)} does not have '\u0275mod' property.`);
        return n;
      }
      const Bt = 20,
        Wt = 10;
      function Gt(t) {
        return Array.isArray(t) && "object" == typeof t[1];
      }
      function Zt(t) {
        return Array.isArray(t) && !0 === t[1];
      }
      function Qt(t) {
        return 0 != (8 & t.flags);
      }
      function Kt(t) {
        return 2 == (2 & t.flags);
      }
      function Jt(t) {
        return 1 == (1 & t.flags);
      }
      function Yt(t) {
        return null !== t.template;
      }
      function Xt(t, e) {
        return t.hasOwnProperty(Pt) ? t[Pt] : null;
      }
      class te extends Error {
        constructor(t, e) {
          super(
            (function (t, e) {
              return `${t ? `NG0${t}: ` : ""}${e}`;
            })(t, e)
          ),
            (this.code = t);
        }
      }
      function ee(t) {
        return "string" == typeof t ? t : null == t ? "" : String(t);
      }
      function ne(t) {
        return "function" == typeof t
          ? t.name || t.toString()
          : "object" == typeof t && null != t && "function" == typeof t.type
          ? t.type.name || t.type.toString()
          : ee(t);
      }
      function re(t, e) {
        const n = e ? " in " + e : "";
        throw new te("201", `No provider for ${ne(t)} found${n}`);
      }
      class se {
        constructor(t, e, n) {
          (this.previousValue = t),
            (this.currentValue = e),
            (this.firstChange = n);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function ie() {
        return oe;
      }
      function oe(t) {
        return t.type.prototype.ngOnChanges && (t.setInput = le), ae;
      }
      function ae() {
        const t = ue(this),
          e = null == t ? void 0 : t.current;
        if (e) {
          const n = t.previous;
          if (n === Tt) t.previous = e;
          else for (let t in e) n[t] = e[t];
          (t.current = null), this.ngOnChanges(e);
        }
      }
      function le(t, e, n, r) {
        const s =
            ue(t) ||
            (function (t, e) {
              return (t.__ngSimpleChanges__ = e);
            })(t, { previous: Tt, current: null }),
          i = s.current || (s.current = {}),
          o = s.previous,
          a = this.declaredInputs[n],
          l = o[a];
        (i[a] = new se(l && l.currentValue, e, o === Tt)), (t[r] = e);
      }
      function ue(t) {
        return t.__ngSimpleChanges__ || null;
      }
      ie.ngInherit = !0;
      let ce = void 0;
      function he(t) {
        return !!t.listen;
      }
      const de = {
        createRenderer: (t, e) =>
          void 0 !== ce
            ? ce
            : "undefined" != typeof document
            ? document
            : void 0,
      };
      function pe(t) {
        for (; Array.isArray(t); ) t = t[0];
        return t;
      }
      function fe(t, e) {
        return pe(e[t.index]);
      }
      function ge(t, e) {
        return t.data[e];
      }
      function me(t, e) {
        return t[e];
      }
      function ye(t, e) {
        const n = e[t];
        return Gt(n) ? n : n[0];
      }
      function ve(t) {
        const e = (function (t) {
          return t.__ngContext__ || null;
        })(t);
        return e ? (Array.isArray(e) ? e : e.lView) : null;
      }
      function we(t) {
        return 4 == (4 & t[2]);
      }
      function _e(t) {
        return 128 == (128 & t[2]);
      }
      function be(t, e) {
        return null == e ? null : t[e];
      }
      function Se(t) {
        t[18] = 0;
      }
      function Ce(t, e) {
        t[5] += e;
        let n = t,
          r = t[3];
        for (
          ;
          null !== r && ((1 === e && 1 === n[5]) || (-1 === e && 0 === n[5]));

        )
          (r[5] += e), (n = r), (r = r[3]);
      }
      const xe = {
        lFrame: Be(null),
        bindingsEnabled: !0,
        isInCheckNoChangesMode: !1,
      };
      function Te() {
        return xe.bindingsEnabled;
      }
      function Ee() {
        return xe.lFrame.lView;
      }
      function ke() {
        return xe.lFrame.tView;
      }
      function Ae() {
        let t = Re();
        for (; null !== t && 64 === t.type; ) t = t.parent;
        return t;
      }
      function Re() {
        return xe.lFrame.currentTNode;
      }
      function Ie(t, e) {
        const n = xe.lFrame;
        (n.currentTNode = t), (n.isParent = e);
      }
      function Oe() {
        return xe.lFrame.isParent;
      }
      function Pe() {
        return xe.isInCheckNoChangesMode;
      }
      function je(t) {
        xe.isInCheckNoChangesMode = t;
      }
      function Ne() {
        const t = xe.lFrame;
        let e = t.bindingRootIndex;
        return (
          -1 === e && (e = t.bindingRootIndex = t.tView.bindingStartIndex), e
        );
      }
      function Ue() {
        return xe.lFrame.bindingIndex;
      }
      function De() {
        return xe.lFrame.bindingIndex++;
      }
      function Le(t, e) {
        const n = xe.lFrame;
        (n.bindingIndex = n.bindingRootIndex = t), He(e);
      }
      function He(t) {
        xe.lFrame.currentDirectiveIndex = t;
      }
      function Fe() {
        return xe.lFrame.currentQueryIndex;
      }
      function Me(t) {
        xe.lFrame.currentQueryIndex = t;
      }
      function Ve(t) {
        const e = t[1];
        return 2 === e.type ? e.declTNode : 1 === e.type ? t[6] : null;
      }
      function $e(t, e, n) {
        if (n & pt.SkipSelf) {
          let r = e,
            s = t;
          for (
            ;
            (r = r.parent),
              !(
                null !== r ||
                n & pt.Host ||
                ((r = Ve(s)), null === r) ||
                ((s = s[15]), 10 & r.type)
              );

          );
          if (null === r) return !1;
          (e = r), (t = s);
        }
        const r = (xe.lFrame = qe());
        return (r.currentTNode = e), (r.lView = t), !0;
      }
      function ze(t) {
        const e = qe(),
          n = t[1];
        (xe.lFrame = e),
          (e.currentTNode = n.firstChild),
          (e.lView = t),
          (e.tView = n),
          (e.contextLView = t),
          (e.bindingIndex = n.bindingStartIndex),
          (e.inI18n = !1);
      }
      function qe() {
        const t = xe.lFrame,
          e = null === t ? null : t.child;
        return null === e ? Be(t) : e;
      }
      function Be(t) {
        const e = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: t,
          child: null,
          inI18n: !1,
        };
        return null !== t && (t.child = e), e;
      }
      function We() {
        const t = xe.lFrame;
        return (
          (xe.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t
        );
      }
      const Ge = We;
      function Ze() {
        const t = We();
        (t.isParent = !0),
          (t.tView = null),
          (t.selectedIndex = -1),
          (t.contextLView = null),
          (t.elementDepthCount = 0),
          (t.currentDirectiveIndex = -1),
          (t.currentNamespace = null),
          (t.bindingRootIndex = -1),
          (t.bindingIndex = -1),
          (t.currentQueryIndex = 0);
      }
      function Qe() {
        return xe.lFrame.selectedIndex;
      }
      function Ke(t) {
        xe.lFrame.selectedIndex = t;
      }
      function Je() {
        const t = xe.lFrame;
        return ge(t.tView, t.selectedIndex);
      }
      function Ye(t, e) {
        for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
          const e = t.data[n].type.prototype,
            {
              ngAfterContentInit: r,
              ngAfterContentChecked: s,
              ngAfterViewInit: i,
              ngAfterViewChecked: o,
              ngOnDestroy: a,
            } = e;
          r && (t.contentHooks || (t.contentHooks = [])).push(-n, r),
            s &&
              ((t.contentHooks || (t.contentHooks = [])).push(n, s),
              (t.contentCheckHooks || (t.contentCheckHooks = [])).push(n, s)),
            i && (t.viewHooks || (t.viewHooks = [])).push(-n, i),
            o &&
              ((t.viewHooks || (t.viewHooks = [])).push(n, o),
              (t.viewCheckHooks || (t.viewCheckHooks = [])).push(n, o)),
            null != a && (t.destroyHooks || (t.destroyHooks = [])).push(n, a);
        }
      }
      function Xe(t, e, n) {
        nn(t, e, 3, n);
      }
      function tn(t, e, n, r) {
        (3 & t[2]) === n && nn(t, e, n, r);
      }
      function en(t, e) {
        let n = t[2];
        (3 & n) === e && ((n &= 2047), (n += 1), (t[2] = n));
      }
      function nn(t, e, n, r) {
        const s = null != r ? r : -1;
        let i = 0;
        for (let o = void 0 !== r ? 65535 & t[18] : 0; o < e.length; o++)
          if ("number" == typeof e[o + 1]) {
            if (((i = e[o]), null != r && i >= r)) break;
          } else
            e[o] < 0 && (t[18] += 65536),
              (i < s || -1 == s) &&
                (rn(t, n, e, o), (t[18] = (4294901760 & t[18]) + o + 2)),
              o++;
      }
      function rn(t, e, n, r) {
        const s = n[r] < 0,
          i = n[r + 1],
          o = t[s ? -n[r] : n[r]];
        s
          ? t[2] >> 11 < t[18] >> 16 &&
            (3 & t[2]) === e &&
            ((t[2] += 2048), i.call(o))
          : i.call(o);
      }
      const sn = -1;
      class on {
        constructor(t, e, n) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = e),
            (this.injectImpl = n);
        }
      }
      function an(t, e, n) {
        const r = he(t);
        let s = 0;
        for (; s < n.length; ) {
          const i = n[s];
          if ("number" == typeof i) {
            if (0 !== i) break;
            s++;
            const o = n[s++],
              a = n[s++],
              l = n[s++];
            r ? t.setAttribute(e, a, l, o) : e.setAttributeNS(o, a, l);
          } else {
            const o = i,
              a = n[++s];
            un(o)
              ? r && t.setProperty(e, o, a)
              : r
              ? t.setAttribute(e, o, a)
              : e.setAttribute(o, a),
              s++;
          }
        }
        return s;
      }
      function ln(t) {
        return 3 === t || 4 === t || 6 === t;
      }
      function un(t) {
        return 64 === t.charCodeAt(0);
      }
      function cn(t, e) {
        if (null === e || 0 === e.length);
        else if (null === t || 0 === t.length) t = e.slice();
        else {
          let n = -1;
          for (let r = 0; r < e.length; r++) {
            const s = e[r];
            "number" == typeof s
              ? (n = s)
              : 0 === n ||
                hn(t, n, s, null, -1 === n || 2 === n ? e[++r] : null);
          }
        }
        return t;
      }
      function hn(t, e, n, r, s) {
        let i = 0,
          o = t.length;
        if (-1 === e) o = -1;
        else
          for (; i < t.length; ) {
            const n = t[i++];
            if ("number" == typeof n) {
              if (n === e) {
                o = -1;
                break;
              }
              if (n > e) {
                o = i - 1;
                break;
              }
            }
          }
        for (; i < t.length; ) {
          const e = t[i];
          if ("number" == typeof e) break;
          if (e === n) {
            if (null === r) return void (null !== s && (t[i + 1] = s));
            if (r === t[i + 1]) return void (t[i + 2] = s);
          }
          i++, null !== r && i++, null !== s && i++;
        }
        -1 !== o && (t.splice(o, 0, e), (i = o + 1)),
          t.splice(i++, 0, n),
          null !== r && t.splice(i++, 0, r),
          null !== s && t.splice(i++, 0, s);
      }
      function dn(t) {
        return t !== sn;
      }
      function pn(t) {
        return 32767 & t;
      }
      function fn(t, e) {
        let n = t >> 16,
          r = e;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let gn = !0;
      function mn(t) {
        const e = gn;
        return (gn = t), e;
      }
      let yn = 0;
      function vn(t, e) {
        const n = _n(t, e);
        if (-1 !== n) return n;
        const r = e[1];
        r.firstCreatePass &&
          ((t.injectorIndex = e.length),
          wn(r.data, t),
          wn(e, null),
          wn(r.blueprint, null));
        const s = bn(t, e),
          i = t.injectorIndex;
        if (dn(s)) {
          const t = pn(s),
            n = fn(s, e),
            r = n[1].data;
          for (let s = 0; s < 8; s++) e[i + s] = n[t + s] | r[t + s];
        }
        return (e[i + 8] = s), i;
      }
      function wn(t, e) {
        t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
      }
      function _n(t, e) {
        return -1 === t.injectorIndex ||
          (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
          null === e[t.injectorIndex + 8]
          ? -1
          : t.injectorIndex;
      }
      function bn(t, e) {
        if (t.parent && -1 !== t.parent.injectorIndex)
          return t.parent.injectorIndex;
        let n = 0,
          r = null,
          s = e;
        for (; null !== s; ) {
          const t = s[1],
            e = t.type;
          if (((r = 2 === e ? t.declTNode : 1 === e ? s[6] : null), null === r))
            return sn;
          if ((n++, (s = s[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return sn;
      }
      function Sn(t, e, n) {
        !(function (t, e, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(jt) && (r = n[jt]),
            null == r && (r = n[jt] = yn++);
          const s = 255 & r,
            i = 1 << s,
            o = 64 & s,
            a = 32 & s,
            l = e.data;
          128 & s
            ? o
              ? a
                ? (l[t + 7] |= i)
                : (l[t + 6] |= i)
              : a
              ? (l[t + 5] |= i)
              : (l[t + 4] |= i)
            : o
            ? a
              ? (l[t + 3] |= i)
              : (l[t + 2] |= i)
            : a
            ? (l[t + 1] |= i)
            : (l[t] |= i);
        })(t, e, n);
      }
      function Cn(t, e, n) {
        if (n & pt.Optional) return t;
        re(e, "NodeInjector");
      }
      function xn(t, e, n, r) {
        if (
          (n & pt.Optional && void 0 === r && (r = null),
          0 == (n & (pt.Self | pt.Host)))
        ) {
          const s = t[9],
            i = gt(void 0);
          try {
            return s ? s.get(e, r, n & pt.Optional) : mt(e, r, n & pt.Optional);
          } finally {
            gt(i);
          }
        }
        return Cn(r, e, n);
      }
      function Tn(t, e, n, r = pt.Default, s) {
        if (null !== t) {
          const i = (function (t) {
            if ("string" == typeof t) return t.charCodeAt(0) || 0;
            const e = t.hasOwnProperty(jt) ? t[jt] : void 0;
            return "number" == typeof e ? (e >= 0 ? 255 & e : kn) : e;
          })(n);
          if ("function" == typeof i) {
            if (!$e(e, t, r)) return r & pt.Host ? Cn(s, n, r) : xn(e, n, r, s);
            try {
              const t = i();
              if (null != t || r & pt.Optional) return t;
              re(n);
            } finally {
              Ge();
            }
          } else if ("number" == typeof i) {
            let s = null,
              o = _n(t, e),
              a = sn,
              l = r & pt.Host ? e[16][6] : null;
            for (
              (-1 === o || r & pt.SkipSelf) &&
              ((a = -1 === o ? bn(t, e) : e[o + 8]),
              a !== sn && Pn(r, !1)
                ? ((s = e[1]), (o = pn(a)), (e = fn(a, e)))
                : (o = -1));
              -1 !== o;

            ) {
              const t = e[1];
              if (On(i, o, t.data)) {
                const t = An(o, e, n, s, r, l);
                if (t !== En) return t;
              }
              (a = e[o + 8]),
                a !== sn && Pn(r, e[1].data[o + 8] === l) && On(i, o, e)
                  ? ((s = t), (o = pn(a)), (e = fn(a, e)))
                  : (o = -1);
            }
          }
        }
        return xn(e, n, r, s);
      }
      const En = {};
      function kn() {
        return new jn(Ae(), Ee());
      }
      function An(t, e, n, r, s, i) {
        const o = e[1],
          a = o.data[t + 8],
          l = Rn(
            a,
            o,
            n,
            null == r ? Kt(a) && gn : r != o && 0 != (3 & a.type),
            s & pt.Host && i === a
          );
        return null !== l ? In(e, o, l, a) : En;
      }
      function Rn(t, e, n, r, s) {
        const i = t.providerIndexes,
          o = e.data,
          a = 1048575 & i,
          l = t.directiveStart,
          u = i >> 20,
          c = s ? a + u : t.directiveEnd;
        for (let h = r ? a : a + u; h < c; h++) {
          const t = o[h];
          if ((h < l && n === t) || (h >= l && t.type === n)) return h;
        }
        if (s) {
          const t = o[l];
          if (t && Yt(t) && t.type === n) return l;
        }
        return null;
      }
      function In(t, e, n, r) {
        let s = t[n];
        const i = e.data;
        if (s instanceof on) {
          const o = s;
          o.resolving &&
            (function (t, e) {
              throw new te(
                "200",
                "Circular dependency in DI detected for " + t
              );
            })(ne(i[n]));
          const a = mn(o.canSeeViewProviders);
          o.resolving = !0;
          const l = o.injectImpl ? gt(o.injectImpl) : null;
          $e(t, r, pt.Default);
          try {
            (s = t[n] = o.factory(void 0, i, t, r)),
              e.firstCreatePass &&
                n >= r.directiveStart &&
                (function (t, e, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: s,
                    ngDoCheck: i,
                  } = e.type.prototype;
                  if (r) {
                    const r = oe(e);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(t, r),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, r);
                  }
                  s &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - t, s),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, i));
                })(n, i[n], e);
          } finally {
            null !== l && gt(l), mn(a), (o.resolving = !1), Ge();
          }
        }
        return s;
      }
      function On(t, e, n) {
        const r = 64 & t,
          s = 32 & t;
        let i;
        return (
          (i =
            128 & t
              ? r
                ? s
                  ? n[e + 7]
                  : n[e + 6]
                : s
                ? n[e + 5]
                : n[e + 4]
              : r
              ? s
                ? n[e + 3]
                : n[e + 2]
              : s
              ? n[e + 1]
              : n[e]),
          !!(i & (1 << t))
        );
      }
      function Pn(t, e) {
        return !(t & pt.Self || (t & pt.Host && e));
      }
      class jn {
        constructor(t, e) {
          (this._tNode = t), (this._lView = e);
        }
        get(t, e) {
          return Tn(this._tNode, this._lView, t, void 0, e);
        }
      }
      function Nn(t) {
        return (function (t, e) {
          if ("class" === e) return t.classes;
          if ("style" === e) return t.styles;
          const n = t.attrs;
          if (n) {
            const t = n.length;
            let r = 0;
            for (; r < t; ) {
              const s = n[r];
              if (ln(s)) break;
              if (0 === s) r += 2;
              else if ("number" == typeof s)
                for (r++; r < t && "string" == typeof n[r]; ) r++;
              else {
                if (s === e) return n[r + 1];
                r += 2;
              }
            }
          }
          return null;
        })(Ae(), t);
      }
      const Un = "__parameters__";
      function Dn(t, e, n) {
        return yt(() => {
          const r = (function (t) {
            return function (...e) {
              if (t) {
                const n = t(...e);
                for (const t in n) this[t] = n[t];
              }
            };
          })(e);
          function s(...t) {
            if (this instanceof s) return r.apply(this, t), this;
            const e = new s(...t);
            return (n.annotation = e), n;
            function n(t, n, r) {
              const s = t.hasOwnProperty(Un)
                ? t[Un]
                : Object.defineProperty(t, Un, { value: [] })[Un];
              for (; s.length <= r; ) s.push(null);
              return (s[r] = s[r] || []).push(e), t;
            }
          }
          return (
            n && (s.prototype = Object.create(n.prototype)),
            (s.prototype.ngMetadataName = t),
            (s.annotationCls = s),
            s
          );
        });
      }
      class Ln {
        constructor(t, e) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof e
              ? (this.__NG_ELEMENT_ID__ = e)
              : void 0 !== e &&
                (this.ɵprov = st({
                  token: this,
                  providedIn: e.providedIn || "root",
                  factory: e.factory,
                }));
        }
        toString() {
          return "InjectionToken " + this._desc;
        }
      }
      const Hn = new Ln("AnalyzeForEntryComponents"),
        Fn = Function;
      function Mn(t, e) {
        void 0 === e && (e = t);
        for (let n = 0; n < t.length; n++) {
          let r = t[n];
          Array.isArray(r)
            ? (e === t && (e = t.slice(0, n)), Mn(r, e))
            : e !== t && e.push(r);
        }
        return e;
      }
      function Vn(t, e) {
        t.forEach((t) => (Array.isArray(t) ? Vn(t, e) : e(t)));
      }
      function $n(t, e, n) {
        e >= t.length ? t.push(n) : t.splice(e, 0, n);
      }
      function zn(t, e) {
        return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
      }
      const qn = Dn("Inject", (t) => ({ token: t })),
        Bn = Dn("Optional"),
        Wn = Dn("Self"),
        Gn = Dn("SkipSelf"),
        Zn = {},
        Qn = /\n/gm,
        Kn = "__source",
        Jn = Y({ provide: String, useValue: Y });
      let Yn = void 0;
      function Xn(t) {
        const e = Yn;
        return (Yn = t), e;
      }
      function tr(t, e = pt.Default) {
        if (void 0 === Yn)
          throw new Error("inject() must be called from an injection context");
        return null === Yn
          ? mt(t, void 0, e)
          : Yn.get(t, e & pt.Optional ? null : void 0, e);
      }
      function er(t, e = pt.Default) {
        return (ft || tr)(rt(t), e);
      }
      function nr(t) {
        const e = [];
        for (let n = 0; n < t.length; n++) {
          const r = rt(t[n]);
          if (Array.isArray(r)) {
            if (0 === r.length)
              throw new Error("Arguments array must have arguments.");
            let t = void 0,
              n = pt.Default;
            for (let e = 0; e < r.length; e++) {
              const s = r[e];
              s instanceof Bn || "Optional" === s.ngMetadataName || s === Bn
                ? (n |= pt.Optional)
                : s instanceof Gn || "SkipSelf" === s.ngMetadataName || s === Gn
                ? (n |= pt.SkipSelf)
                : s instanceof Wn || "Self" === s.ngMetadataName || s === Wn
                ? (n |= pt.Self)
                : (t = s instanceof qn || s === qn ? s.token : s);
            }
            e.push(er(t, n));
          } else e.push(er(r));
        }
        return e;
      }
      class rr {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return (
            "SafeValue must use [property]=binding: " +
            this.changingThisBreaksApplicationSecurity +
            " (see https://g.co/ng/security#xss)"
          );
        }
      }
      const sr = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
        ir = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      var or = (function (t) {
        return (
          (t[(t.NONE = 0)] = "NONE"),
          (t[(t.HTML = 1)] = "HTML"),
          (t[(t.STYLE = 2)] = "STYLE"),
          (t[(t.SCRIPT = 3)] = "SCRIPT"),
          (t[(t.URL = 4)] = "URL"),
          (t[(t.RESOURCE_URL = 5)] = "RESOURCE_URL"),
          t
        );
      })({});
      function ar(t) {
        const e = (function () {
          const t = Ee();
          return t && t[12];
        })();
        return e
          ? e.sanitize(or.URL, t) || ""
          : (function (t, e) {
              const n = (function (t) {
                return (t instanceof rr && t.getTypeName()) || null;
              })(t);
              if (null != n && n !== e) {
                if ("ResourceURL" === n && "URL" === e) return !0;
                throw new Error(
                  `Required a safe ${e}, got a ${n} (see https://g.co/ng/security#xss)`
                );
              }
              return n === e;
            })(t, "URL")
          ? (r = t) instanceof rr
            ? r.changingThisBreaksApplicationSecurity
            : r
          : ((n = ee(t)),
            (n = String(n)).match(sr) || n.match(ir) ? n : "unsafe:" + n);
        var n, r;
      }
      function lr(t) {
        return t.ngDebugContext;
      }
      function ur(t) {
        return t.ngOriginalError;
      }
      function cr(t, ...e) {
        t.error(...e);
      }
      class hr {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const e = this._findOriginalError(t),
            n = this._findContext(t),
            r = (function (t) {
              return t.ngErrorLogger || cr;
            })(t);
          r(this._console, "ERROR", t),
            e && r(this._console, "ORIGINAL ERROR", e),
            n && r(this._console, "ERROR CONTEXT", n);
        }
        _findContext(t) {
          return t ? (lr(t) ? lr(t) : this._findContext(ur(t))) : null;
        }
        _findOriginalError(t) {
          let e = ur(t);
          for (; e && ur(e); ) e = ur(e);
          return e;
        }
      }
      function dr(t, e) {
        t.__ngContext__ = e;
      }
      const pr = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(xt))();
      function fr(t) {
        return t instanceof Function ? t() : t;
      }
      var gr = (function (t) {
        return (
          (t[(t.Important = 1)] = "Important"),
          (t[(t.DashCase = 2)] = "DashCase"),
          t
        );
      })({});
      function mr(t, e) {
        return (void 0)(t, e);
      }
      function yr(t) {
        const e = t[3];
        return Zt(e) ? e[3] : e;
      }
      function vr(t) {
        return _r(t[13]);
      }
      function wr(t) {
        return _r(t[4]);
      }
      function _r(t) {
        for (; null !== t && !Zt(t); ) t = t[4];
        return t;
      }
      function br(t, e, n, r, s) {
        if (null != r) {
          let i,
            o = !1;
          Zt(r) ? (i = r) : Gt(r) && ((o = !0), (r = r[0]));
          const a = pe(r);
          0 === t && null !== n
            ? null == s
              ? Ar(e, n, a)
              : kr(e, n, a, s || null, !0)
            : 1 === t && null !== n
            ? kr(e, n, a, s || null, !0)
            : 2 === t
            ? (function (t, e, n) {
                const r = Ir(t, e);
                r &&
                  (function (t, e, n, r) {
                    he(t) ? t.removeChild(e, n, r) : e.removeChild(n);
                  })(t, r, e, n);
              })(e, a, o)
            : 3 === t && e.destroyNode(a),
            null != i &&
              (function (t, e, n, r, s) {
                const i = n[7];
                i !== pe(n) && br(e, t, r, i, s);
                for (let o = Wt; o < n.length; o++) {
                  const s = n[o];
                  Ur(s[1], s, t, e, r, i);
                }
              })(e, t, i, n, s);
        }
      }
      function Sr(t, e, n) {
        return he(t)
          ? t.createElement(e, n)
          : null === n
          ? t.createElement(e)
          : t.createElementNS(n, e);
      }
      function Cr(t, e) {
        const n = t[9],
          r = n.indexOf(e),
          s = e[3];
        1024 & e[2] && ((e[2] &= -1025), Ce(s, -1)), n.splice(r, 1);
      }
      function xr(t, e) {
        if (t.length <= Wt) return;
        const n = Wt + e,
          r = t[n];
        if (r) {
          const i = r[17];
          null !== i && i !== t && Cr(i, r), e > 0 && (t[n - 1][4] = r[4]);
          const o = zn(t, Wt + e);
          Ur(r[1], (s = r), s[11], 2, null, null), (s[0] = null), (s[6] = null);
          const a = o[19];
          null !== a && a.detachView(o[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -129);
        }
        var s;
        return r;
      }
      function Tr(t, e) {
        if (!(256 & e[2])) {
          const n = e[11];
          he(n) && n.destroyNode && Ur(t, e, n, 3, null, null),
            (function (t) {
              let e = t[13];
              if (!e) return Er(t[1], t);
              for (; e; ) {
                let n = null;
                if (Gt(e)) n = e[13];
                else {
                  const t = e[10];
                  t && (n = t);
                }
                if (!n) {
                  for (; e && !e[4] && e !== t; )
                    Gt(e) && Er(e[1], e), (e = e[3]);
                  null === e && (e = t), Gt(e) && Er(e[1], e), (n = e && e[4]);
                }
                e = n;
              }
            })(e);
        }
      }
      function Er(t, e) {
        if (!(256 & e[2])) {
          (e[2] &= -129),
            (e[2] |= 256),
            (function (t, e) {
              let n;
              if (null != t && null != (n = t.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const t = e[n[r]];
                  if (!(t instanceof on)) {
                    const e = n[r + 1];
                    if (Array.isArray(e))
                      for (let n = 0; n < e.length; n += 2)
                        e[n + 1].call(t[e[n]]);
                    else e.call(t);
                  }
                }
            })(t, e),
            (function (t, e) {
              const n = t.cleanup,
                r = e[7];
              let s = -1;
              if (null !== n) {
                for (let t = 0; t < n.length - 1; t += 2)
                  if ("string" == typeof n[t]) {
                    const i = n[t + 1],
                      o = "function" == typeof i ? i(e) : pe(e[i]),
                      a = r[(s = n[t + 2])],
                      l = n[t + 3];
                    "boolean" == typeof l
                      ? o.removeEventListener(n[t], a, l)
                      : l >= 0
                      ? r[(s = l)]()
                      : r[(s = -l)].unsubscribe(),
                      (t += 2);
                  } else {
                    const e = r[(s = n[t + 1])];
                    n[t].call(e);
                  }
                if (null !== r)
                  for (let t = s + 1; t < r.length; t++) (0, r[t])();
                e[7] = null;
              }
            })(t, e),
            1 === e[1].type && he(e[11]) && e[11].destroy();
          const n = e[17];
          if (null !== n && Zt(e[3])) {
            n !== e[3] && Cr(n, e);
            const r = e[19];
            null !== r && r.detachView(t);
          }
        }
      }
      function kr(t, e, n, r, s) {
        he(t) ? t.insertBefore(e, n, r, s) : e.insertBefore(n, r, s);
      }
      function Ar(t, e, n) {
        he(t) ? t.appendChild(e, n) : e.appendChild(n);
      }
      function Rr(t, e, n, r, s) {
        null !== r ? kr(t, e, n, r, s) : Ar(t, e, n);
      }
      function Ir(t, e) {
        return he(t) ? t.parentNode(e) : e.parentNode;
      }
      function Or(t, e, n, r) {
        const s = (function (t, e, n) {
            return (function (t, e, n) {
              let r = e;
              for (; null !== r && 40 & r.type; ) r = (e = r).parent;
              if (null === r) return n[0];
              if (2 & r.flags) {
                const e = t.data[r.directiveStart].encapsulation;
                if (e === wt.None || e === wt.Emulated) return null;
              }
              return fe(r, n);
            })(t, e.parent, n);
          })(t, r, e),
          i = e[11],
          o = (function (t, e, n) {
            return (function (t, e, n) {
              return 40 & t.type ? fe(t, n) : null;
            })(t, 0, n);
          })(r.parent || e[6], 0, e);
        if (null != s)
          if (Array.isArray(n))
            for (let a = 0; a < n.length; a++) Rr(i, s, n[a], o, !1);
          else Rr(i, s, n, o, !1);
      }
      function Pr(t, e) {
        if (null !== e) {
          const n = e.type;
          if (3 & n) return fe(e, t);
          if (4 & n) return jr(-1, t[e.index]);
          if (8 & n) {
            const n = e.child;
            if (null !== n) return Pr(t, n);
            {
              const n = t[e.index];
              return Zt(n) ? jr(-1, n) : pe(n);
            }
          }
          if (32 & n) return mr(e, t)() || pe(t[e.index]);
          {
            const n = t[16],
              r = n[6],
              s = yr(n),
              i = r.projection[e.projection];
            return null != i ? Pr(s, i) : Pr(t, e.next);
          }
        }
        return null;
      }
      function jr(t, e) {
        const n = Wt + t + 1;
        if (n < e.length) {
          const t = e[n],
            r = t[1].firstChild;
          if (null !== r) return Pr(t, r);
        }
        return e[7];
      }
      function Nr(t, e, n, r, s, i, o) {
        for (; null != n; ) {
          const a = r[n.index],
            l = n.type;
          if (
            (o && 0 === e && (a && dr(pe(a), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & l) Nr(t, e, n.child, r, s, i, !1), br(e, t, s, a, i);
            else if (32 & l) {
              const o = mr(n, r);
              let l;
              for (; (l = o()); ) br(e, t, s, l, i);
              br(e, t, s, a, i);
            } else 16 & l ? Dr(t, e, r, n, s, i) : br(e, t, s, a, i);
          n = o ? n.projectionNext : n.next;
        }
      }
      function Ur(t, e, n, r, s, i) {
        Nr(n, r, t.firstChild, e, s, i, !1);
      }
      function Dr(t, e, n, r, s, i) {
        const o = n[16],
          a = o[6].projection[r.projection];
        if (Array.isArray(a))
          for (let l = 0; l < a.length; l++) br(e, t, s, a[l], i);
        else Nr(t, e, a, o[3], s, i, !0);
      }
      function Lr(t, e, n) {
        he(t) ? t.setAttribute(e, "style", n) : (e.style.cssText = n);
      }
      function Hr(t, e, n) {
        he(t)
          ? "" === n
            ? t.removeAttribute(e, "class")
            : t.setAttribute(e, "class", n)
          : (e.className = n);
      }
      function Fr(t, e, n) {
        let r = t.length;
        for (;;) {
          const s = t.indexOf(e, n);
          if (-1 === s) return s;
          if (0 === s || t.charCodeAt(s - 1) <= 32) {
            const n = e.length;
            if (s + n === r || t.charCodeAt(s + n) <= 32) return s;
          }
          n = s + 1;
        }
      }
      const Mr = "ng-template";
      function Vr(t, e, n) {
        let r = 0;
        for (; r < t.length; ) {
          let s = t[r++];
          if (n && "class" === s) {
            if (((s = t[r]), -1 !== Fr(s.toLowerCase(), e, 0))) return !0;
          } else if (1 === s) {
            for (; r < t.length && "string" == typeof (s = t[r++]); )
              if (s.toLowerCase() === e) return !0;
            return !1;
          }
        }
        return !1;
      }
      function $r(t) {
        return 4 === t.type && t.value !== Mr;
      }
      function zr(t, e, n) {
        return e === (4 !== t.type || n ? t.value : Mr);
      }
      function qr(t, e, n) {
        let r = 4;
        const s = t.attrs || [],
          i = (function (t) {
            for (let e = 0; e < t.length; e++) if (ln(t[e])) return e;
            return t.length;
          })(s);
        let o = !1;
        for (let a = 0; a < e.length; a++) {
          const l = e[a];
          if ("number" != typeof l) {
            if (!o)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== l && !zr(t, l, n)) || ("" === l && 1 === e.length))
                ) {
                  if (Br(r)) return !1;
                  o = !0;
                }
              } else {
                const u = 8 & r ? l : e[++a];
                if (8 & r && null !== t.attrs) {
                  if (!Vr(t.attrs, u, n)) {
                    if (Br(r)) return !1;
                    o = !0;
                  }
                  continue;
                }
                const c = Wr(8 & r ? "class" : l, s, $r(t), n);
                if (-1 === c) {
                  if (Br(r)) return !1;
                  o = !0;
                  continue;
                }
                if ("" !== u) {
                  let t;
                  t = c > i ? "" : s[c + 1].toLowerCase();
                  const e = 8 & r ? t : null;
                  if ((e && -1 !== Fr(e, u, 0)) || (2 & r && u !== t)) {
                    if (Br(r)) return !1;
                    o = !0;
                  }
                }
              }
          } else {
            if (!o && !Br(r) && !Br(l)) return !1;
            if (o && Br(l)) continue;
            (o = !1), (r = l | (1 & r));
          }
        }
        return Br(r) || o;
      }
      function Br(t) {
        return 0 == (1 & t);
      }
      function Wr(t, e, n, r) {
        if (null === e) return -1;
        let s = 0;
        if (r || !n) {
          let n = !1;
          for (; s < e.length; ) {
            const r = e[s];
            if (r === t) return s;
            if (3 === r || 6 === r) n = !0;
            else {
              if (1 === r || 2 === r) {
                let t = e[++s];
                for (; "string" == typeof t; ) t = e[++s];
                continue;
              }
              if (4 === r) break;
              if (0 === r) {
                s += 4;
                continue;
              }
            }
            s += n ? 1 : 2;
          }
          return -1;
        }
        return (function (t, e) {
          let n = t.indexOf(4);
          if (n > -1)
            for (n++; n < t.length; ) {
              const r = t[n];
              if ("number" == typeof r) return -1;
              if (r === e) return n;
              n++;
            }
          return -1;
        })(e, t);
      }
      function Gr(t, e, n = !1) {
        for (let r = 0; r < e.length; r++) if (qr(t, e[r], n)) return !0;
        return !1;
      }
      function Zr(t, e) {
        return t ? ":not(" + e.trim() + ")" : e;
      }
      function Qr(t) {
        let e = t[0],
          n = 1,
          r = 2,
          s = "",
          i = !1;
        for (; n < t.length; ) {
          let o = t[n];
          if ("string" == typeof o)
            if (2 & r) {
              const e = t[++n];
              s += "[" + o + (e.length > 0 ? '="' + e + '"' : "") + "]";
            } else 8 & r ? (s += "." + o) : 4 & r && (s += " " + o);
          else
            "" === s || Br(o) || ((e += Zr(i, s)), (s = "")),
              (r = o),
              (i = i || !Br(r));
          n++;
        }
        return "" !== s && (e += Zr(i, s)), e;
      }
      const Kr = {};
      function Jr(t) {
        Yr(ke(), Ee(), Qe() + t, Pe());
      }
      function Yr(t, e, n, r) {
        if (!r)
          if (3 == (3 & e[2])) {
            const r = t.preOrderCheckHooks;
            null !== r && Xe(e, r, n);
          } else {
            const r = t.preOrderHooks;
            null !== r && tn(e, r, 0, n);
          }
        Ke(n);
      }
      function Xr(t, e) {
        const n = t.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const s = n[r],
              i = n[r + 1];
            if (-1 !== i) {
              const n = t.data[i];
              Me(s), n.contentQueries(2, e[i], i);
            }
          }
      }
      function ts(t, e, n, r, s, i, o, a, l, u) {
        const c = e.blueprint.slice();
        return (
          (c[0] = s),
          (c[2] = 140 | r),
          Se(c),
          (c[3] = c[15] = t),
          (c[8] = n),
          (c[10] = o || (t && t[10])),
          (c[11] = a || (t && t[11])),
          (c[12] = l || (t && t[12]) || null),
          (c[9] = u || (t && t[9]) || null),
          (c[6] = i),
          (c[16] = 2 == e.type ? t[16] : c),
          c
        );
      }
      function es(t, e, n, r, s) {
        let i = t.data[e];
        if (null === i)
          (i = (function (t, e, n, r, s) {
            const i = Re(),
              o = Oe(),
              a = (t.data[e] = (function (t, e, n, r, s, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: e ? e.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: s,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: e,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, o ? i : i && i.parent, n, e, r, s));
            return (
              null === t.firstChild && (t.firstChild = a),
              null !== i &&
                (o
                  ? null == i.child && null !== a.parent && (i.child = a)
                  : null === i.next && (i.next = a)),
              a
            );
          })(t, e, n, r, s)),
            xe.lFrame.inI18n && (i.flags |= 64);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = s);
          const t = (function () {
            const t = xe.lFrame,
              e = t.currentTNode;
            return t.isParent ? e : e.parent;
          })();
          i.injectorIndex = null === t ? -1 : t.injectorIndex;
        }
        return Ie(i, !0), i;
      }
      function ns(t, e, n, r) {
        if (0 === n) return -1;
        const s = e.length;
        for (let i = 0; i < n; i++)
          e.push(r), t.blueprint.push(r), t.data.push(null);
        return s;
      }
      function rs(t, e, n) {
        ze(e);
        try {
          const r = t.viewQuery;
          null !== r && Ps(1, r, n);
          const s = t.template;
          null !== s && os(t, e, s, 1, n),
            t.firstCreatePass && (t.firstCreatePass = !1),
            t.staticContentQueries && Xr(t, e),
            t.staticViewQueries && Ps(2, t.viewQuery, n);
          const i = t.components;
          null !== i &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) ks(t, e[n]);
            })(e, i);
        } catch (r) {
          throw (t.firstCreatePass && (t.incompleteFirstPass = !0), r);
        } finally {
          (e[2] &= -5), Ze();
        }
      }
      function ss(t, e, n, r) {
        const s = e[2];
        if (256 == (256 & s)) return;
        ze(e);
        const i = Pe();
        try {
          Se(e),
            (xe.lFrame.bindingIndex = t.bindingStartIndex),
            null !== n && os(t, e, n, 2, r);
          const o = 3 == (3 & s);
          if (!i)
            if (o) {
              const n = t.preOrderCheckHooks;
              null !== n && Xe(e, n, null);
            } else {
              const n = t.preOrderHooks;
              null !== n && tn(e, n, 0, null), en(e, 0);
            }
          if (
            ((function (t) {
              for (let e = vr(t); null !== e; e = wr(e)) {
                if (!e[2]) continue;
                const t = e[9];
                for (let e = 0; e < t.length; e++) {
                  const n = t[e],
                    r = n[3];
                  0 == (1024 & n[2]) && Ce(r, 1), (n[2] |= 1024);
                }
              }
            })(e),
            (function (t) {
              for (let e = vr(t); null !== e; e = wr(e))
                for (let t = Wt; t < e.length; t++) {
                  const n = e[t],
                    r = n[1];
                  _e(n) && ss(r, n, r.template, n[8]);
                }
            })(e),
            null !== t.contentQueries && Xr(t, e),
            !i)
          )
            if (o) {
              const n = t.contentCheckHooks;
              null !== n && Xe(e, n);
            } else {
              const n = t.contentHooks;
              null !== n && tn(e, n, 1), en(e, 1);
            }
          !(function (t, e) {
            const n = t.hostBindingOpCodes;
            if (null !== n)
              try {
                for (let t = 0; t < n.length; t++) {
                  const r = n[t];
                  if (r < 0) Ke(~r);
                  else {
                    const s = r,
                      i = n[++t],
                      o = n[++t];
                    Le(i, s), o(2, e[s]);
                  }
                }
              } finally {
                Ke(-1);
              }
          })(t, e);
          const a = t.components;
          null !== a &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) Ts(t, e[n]);
            })(e, a);
          const l = t.viewQuery;
          if ((null !== l && Ps(2, l, r), !i))
            if (o) {
              const n = t.viewCheckHooks;
              null !== n && Xe(e, n);
            } else {
              const n = t.viewHooks;
              null !== n && tn(e, n, 2), en(e, 2);
            }
          !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
            i || (e[2] &= -73),
            1024 & e[2] && ((e[2] &= -1025), Ce(e[3], -1));
        } finally {
          Ze();
        }
      }
      function is(t, e, n, r) {
        const s = e[10],
          i = !Pe(),
          o = we(e);
        try {
          i && !o && s.begin && s.begin(), o && rs(t, e, r), ss(t, e, n, r);
        } finally {
          i && !o && s.end && s.end();
        }
      }
      function os(t, e, n, r, s) {
        const i = Qe();
        try {
          Ke(-1), 2 & r && e.length > Bt && Yr(t, e, Bt, Pe()), n(r, s);
        } finally {
          Ke(i);
        }
      }
      function as(t, e, n) {
        Te() &&
          ((function (t, e, n, r) {
            const s = n.directiveStart,
              i = n.directiveEnd;
            t.firstCreatePass || vn(n, e), dr(r, e);
            const o = n.initialInputs;
            for (let a = s; a < i; a++) {
              const r = t.data[a],
                i = Yt(r);
              i && bs(e, n, r);
              const l = In(e, t, a, n);
              dr(l, e),
                null !== o && Ss(0, a - s, l, r, 0, o),
                i && (ye(n.index, e)[8] = l);
            }
          })(t, e, n, fe(n, e)),
          128 == (128 & n.flags) &&
            (function (t, e, n) {
              const r = n.directiveStart,
                s = n.directiveEnd,
                i = n.index,
                o = xe.lFrame.currentDirectiveIndex;
              try {
                Ke(i);
                for (let n = r; n < s; n++) {
                  const r = t.data[n],
                    s = e[n];
                  He(n),
                    (null === r.hostBindings &&
                      0 === r.hostVars &&
                      null === r.hostAttrs) ||
                      ms(r, s);
                }
              } finally {
                Ke(-1), He(o);
              }
            })(t, e, n));
      }
      function ls(t, e, n = fe) {
        const r = e.localNames;
        if (null !== r) {
          let s = e.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const o = r[i + 1],
              a = -1 === o ? n(e, t) : t[o];
            t[s++] = a;
          }
        }
      }
      function us(t) {
        const e = t.tView;
        return null === e || e.incompleteFirstPass
          ? (t.tView = cs(
              1,
              null,
              t.template,
              t.decls,
              t.vars,
              t.directiveDefs,
              t.pipeDefs,
              t.viewQuery,
              t.schemas,
              t.consts
            ))
          : e;
      }
      function cs(t, e, n, r, s, i, o, a, l, u) {
        const c = Bt + r,
          h = c + s,
          d = (function (t, e) {
            const n = [];
            for (let r = 0; r < e; r++) n.push(r < t ? null : Kr);
            return n;
          })(c, h),
          p = "function" == typeof u ? u() : u;
        return (d[1] = {
          type: t,
          blueprint: d,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: e,
          data: d.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: h,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof o ? o() : o,
          firstChild: null,
          schemas: l,
          consts: p,
          incompleteFirstPass: !1,
        });
      }
      function hs(t, e, n, r) {
        const s = Ns(e);
        null === n
          ? s.push(r)
          : (s.push(n), t.firstCreatePass && Us(t).push(r, s.length - 1));
      }
      function ds(t, e, n) {
        for (let r in t)
          if (t.hasOwnProperty(r)) {
            const s = t[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(e, s)
              : (n[r] = [e, s]);
          }
        return n;
      }
      function ps(t, e, n, r, s, i, o, a) {
        const l = fe(e, n);
        let u,
          c = e.inputs;
        var h;
        !a && null != c && (u = c[r])
          ? (Ls(t, n, u, r, s),
            Kt(e) &&
              (function (t, e) {
                const n = ye(e, t);
                16 & n[2] || (n[2] |= 64);
              })(n, e.index))
          : 3 & e.type &&
            ((r =
              "class" === (h = r)
                ? "className"
                : "for" === h
                ? "htmlFor"
                : "formaction" === h
                ? "formAction"
                : "innerHtml" === h
                ? "innerHTML"
                : "readonly" === h
                ? "readOnly"
                : "tabindex" === h
                ? "tabIndex"
                : h),
            (s = null != o ? o(s, e.value || "", r) : s),
            he(i)
              ? i.setProperty(l, r, s)
              : un(r) || (l.setProperty ? l.setProperty(r, s) : (l[r] = s)));
      }
      function fs(t, e, n, r) {
        let s = !1;
        if (Te()) {
          const i = (function (t, e, n) {
              const r = t.directiveRegistry;
              let s = null;
              if (r)
                for (let i = 0; i < r.length; i++) {
                  const o = r[i];
                  Gr(n, o.selectors, !1) &&
                    (s || (s = []),
                    Sn(vn(n, e), t, o.type),
                    Yt(o) ? (ys(t, n), s.unshift(o)) : s.push(o));
                }
              return s;
            })(t, e, n),
            o = null === r ? null : { "": -1 };
          if (null !== i) {
            (s = !0), ws(n, t.data.length, i.length);
            for (let t = 0; t < i.length; t++) {
              const e = i[t];
              e.providersResolver && e.providersResolver(e);
            }
            let r = !1,
              a = !1,
              l = ns(t, e, i.length, null);
            for (let s = 0; s < i.length; s++) {
              const u = i[s];
              (n.mergedAttrs = cn(n.mergedAttrs, u.hostAttrs)),
                _s(t, n, e, l, u),
                vs(l, u, o),
                null !== u.contentQueries && (n.flags |= 8),
                (null === u.hostBindings &&
                  null === u.hostAttrs &&
                  0 === u.hostVars) ||
                  (n.flags |= 128);
              const c = u.type.prototype;
              !r &&
                (c.ngOnChanges || c.ngOnInit || c.ngDoCheck) &&
                ((t.preOrderHooks || (t.preOrderHooks = [])).push(n.index),
                (r = !0)),
                a ||
                  (!c.ngOnChanges && !c.ngDoCheck) ||
                  ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(
                    n.index
                  ),
                  (a = !0)),
                l++;
            }
            !(function (t, e) {
              const n = e.directiveEnd,
                r = t.data,
                s = e.attrs,
                i = [];
              let o = null,
                a = null;
              for (let l = e.directiveStart; l < n; l++) {
                const t = r[l],
                  n = t.inputs,
                  u = null === s || $r(e) ? null : Cs(n, s);
                i.push(u), (o = ds(n, l, o)), (a = ds(t.outputs, l, a));
              }
              null !== o &&
                (o.hasOwnProperty("class") && (e.flags |= 16),
                o.hasOwnProperty("style") && (e.flags |= 32)),
                (e.initialInputs = i),
                (e.inputs = o),
                (e.outputs = a);
            })(t, n);
          }
          o &&
            (function (t, e, n) {
              if (e) {
                const r = (t.localNames = []);
                for (let t = 0; t < e.length; t += 2) {
                  const s = n[e[t + 1]];
                  if (null == s)
                    throw new te(
                      "301",
                      `Export of name '${e[t + 1]}' not found!`
                    );
                  r.push(e[t], s);
                }
              }
            })(n, r, o);
        }
        return (n.mergedAttrs = cn(n.mergedAttrs, n.attrs)), s;
      }
      function gs(t, e, n, r, s, i) {
        const o = i.hostBindings;
        if (o) {
          let n = t.hostBindingOpCodes;
          null === n && (n = t.hostBindingOpCodes = []);
          const i = ~e.index;
          (function (t) {
            let e = t.length;
            for (; e > 0; ) {
              const n = t[--e];
              if ("number" == typeof n && n < 0) return n;
            }
            return 0;
          })(n) != i && n.push(i),
            n.push(r, s, o);
        }
      }
      function ms(t, e) {
        null !== t.hostBindings && t.hostBindings(1, e);
      }
      function ys(t, e) {
        (e.flags |= 2), (t.components || (t.components = [])).push(e.index);
      }
      function vs(t, e, n) {
        if (n) {
          if (e.exportAs)
            for (let r = 0; r < e.exportAs.length; r++) n[e.exportAs[r]] = t;
          Yt(e) && (n[""] = t);
        }
      }
      function ws(t, e, n) {
        (t.flags |= 1),
          (t.directiveStart = e),
          (t.directiveEnd = e + n),
          (t.providerIndexes = e);
      }
      function _s(t, e, n, r, s) {
        t.data[r] = s;
        const i = s.factory || (s.factory = Xt(s.type)),
          o = new on(i, Yt(s), null);
        (t.blueprint[r] = o),
          (n[r] = o),
          gs(t, e, 0, r, ns(t, n, s.hostVars, Kr), s);
      }
      function bs(t, e, n) {
        const r = fe(e, t),
          s = us(n),
          i = t[10],
          o = As(
            t,
            ts(
              t,
              s,
              null,
              n.onPush ? 64 : 16,
              r,
              e,
              i,
              i.createRenderer(r, n),
              null,
              null
            )
          );
        t[e.index] = o;
      }
      function Ss(t, e, n, r, s, i) {
        const o = i[e];
        if (null !== o) {
          const t = r.setInput;
          for (let e = 0; e < o.length; ) {
            const s = o[e++],
              i = o[e++],
              a = o[e++];
            null !== t ? r.setInput(n, a, s, i) : (n[i] = a);
          }
        }
      }
      function Cs(t, e) {
        let n = null,
          r = 0;
        for (; r < e.length; ) {
          const s = e[r];
          if (0 !== s)
            if (5 !== s) {
              if ("number" == typeof s) break;
              t.hasOwnProperty(s) &&
                (null === n && (n = []), n.push(s, t[s], e[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function xs(t, e, n, r) {
        return new Array(t, !0, !1, e, null, 0, r, n, null, null);
      }
      function Ts(t, e) {
        const n = ye(e, t);
        if (_e(n)) {
          const t = n[1];
          80 & n[2] ? ss(t, n, t.template, n[8]) : n[5] > 0 && Es(n);
        }
      }
      function Es(t) {
        for (let n = vr(t); null !== n; n = wr(n))
          for (let t = Wt; t < n.length; t++) {
            const e = n[t];
            if (1024 & e[2]) {
              const t = e[1];
              ss(t, e, t.template, e[8]);
            } else e[5] > 0 && Es(e);
          }
        const e = t[1].components;
        if (null !== e)
          for (let n = 0; n < e.length; n++) {
            const r = ye(e[n], t);
            _e(r) && r[5] > 0 && Es(r);
          }
      }
      function ks(t, e) {
        const n = ye(e, t),
          r = n[1];
        !(function (t, e) {
          for (let n = e.length; n < t.blueprint.length; n++)
            e.push(t.blueprint[n]);
        })(r, n),
          rs(r, n, n[8]);
      }
      function As(t, e) {
        return t[13] ? (t[14][4] = e) : (t[13] = e), (t[14] = e), e;
      }
      function Rs(t) {
        for (; t; ) {
          t[2] |= 64;
          const e = yr(t);
          if (0 != (512 & t[2]) && !e) return t;
          t = e;
        }
        return null;
      }
      function Is(t, e, n) {
        const r = e[10];
        r.begin && r.begin();
        try {
          ss(t, e, t.template, n);
        } catch (s) {
          throw (Ds(e, s), s);
        } finally {
          r.end && r.end();
        }
      }
      function Os(t) {
        !(function (t) {
          for (let e = 0; e < t.components.length; e++) {
            const n = t.components[e],
              r = ve(n),
              s = r[1];
            is(s, r, s.template, n);
          }
        })(t[8]);
      }
      function Ps(t, e, n) {
        Me(0), e(t, n);
      }
      const js = (() => Promise.resolve(null))();
      function Ns(t) {
        return t[7] || (t[7] = []);
      }
      function Us(t) {
        return t.cleanup || (t.cleanup = []);
      }
      function Ds(t, e) {
        const n = t[9],
          r = n ? n.get(hr, null) : null;
        r && r.handleError(e);
      }
      function Ls(t, e, n, r, s) {
        for (let i = 0; i < n.length; ) {
          const o = n[i++],
            a = n[i++],
            l = e[o],
            u = t.data[o];
          null !== u.setInput ? u.setInput(l, s, r, a) : (l[a] = s);
        }
      }
      function Hs(t, e, n) {
        const r = (function (t, e) {
          return pe(e[t]);
        })(e, t);
        !(function (t, e, n) {
          he(t) ? t.setValue(e, n) : (e.textContent = n);
        })(t[11], r, n);
      }
      function Fs(t, e, n) {
        let r = n ? t.styles : null,
          s = n ? t.classes : null,
          i = 0;
        if (null !== e)
          for (let o = 0; o < e.length; o++) {
            const t = e[o];
            "number" == typeof t
              ? (i = t)
              : 1 == i
              ? (s = tt(s, t))
              : 2 == i && (r = tt(r, t + ": " + e[++o] + ";"));
          }
        n ? (t.styles = r) : (t.stylesWithoutHost = r),
          n ? (t.classes = s) : (t.classesWithoutHost = s);
      }
      const Ms = new Ln("INJECTOR", -1);
      class Vs {
        get(t, e = Zn) {
          if (e === Zn) {
            const e = new Error(`NullInjectorError: No provider for ${X(t)}!`);
            throw ((e.name = "NullInjectorError"), e);
          }
          return e;
        }
      }
      const $s = new Ln("Set Injector scope."),
        zs = {},
        qs = {},
        Bs = [];
      let Ws = void 0;
      function Gs() {
        return void 0 === Ws && (Ws = new Vs()), Ws;
      }
      function Zs(t, e = null, n = null, r) {
        return new Qs(t, n, e || Gs(), r);
      }
      class Qs {
        constructor(t, e, n, r = null) {
          (this.parent = n),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const s = [];
          e && Vn(e, (n) => this.processProvider(n, t, e)),
            Vn([t], (t) => this.processInjectorType(t, [], s)),
            this.records.set(Ms, Js(void 0, this));
          const i = this.records.get($s);
          (this.scope = null != i ? i.value : null),
            (this.source = r || ("object" == typeof t ? null : X(t)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((t) => t.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(t, e = Zn, n = pt.Default) {
          this.assertNotDestroyed();
          const r = Xn(this);
          try {
            if (!(n & pt.SkipSelf)) {
              let e = this.records.get(t);
              if (void 0 === e) {
                const n =
                  ("function" == typeof (s = t) ||
                    ("object" == typeof s && s instanceof Ln)) &&
                  ot(t);
                (e = n && this.injectableDefInScope(n) ? Js(Ks(t), zs) : null),
                  this.records.set(t, e);
              }
              if (null != e) return this.hydrate(t, e);
            }
            return (n & pt.Self ? Gs() : this.parent).get(
              t,
              (e = n & pt.Optional && e === Zn ? null : e)
            );
          } catch (i) {
            if ("NullInjectorError" === i.name) {
              if (
                ((i.ngTempTokenPath = i.ngTempTokenPath || []).unshift(X(t)), r)
              )
                throw i;
              return (function (t, e, n, r) {
                const s = t.ngTempTokenPath;
                throw (
                  (e[Kn] && s.unshift(e[Kn]),
                  (t.message = (function (t, e, n, r = null) {
                    t =
                      t && "\n" === t.charAt(0) && "\u0275" == t.charAt(1)
                        ? t.substr(2)
                        : t;
                    let s = X(e);
                    if (Array.isArray(e)) s = e.map(X).join(" -> ");
                    else if ("object" == typeof e) {
                      let t = [];
                      for (let n in e)
                        if (e.hasOwnProperty(n)) {
                          let r = e[n];
                          t.push(
                            n +
                              ":" +
                              ("string" == typeof r ? JSON.stringify(r) : X(r))
                          );
                        }
                      s = `{${t.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${s}]: ${t.replace(
                      Qn,
                      "\n  "
                    )}`;
                  })("\n" + t.message, s, n, r)),
                  (t.ngTokenPath = s),
                  (t.ngTempTokenPath = null),
                  t)
                );
              })(i, t, "R3InjectorError", this.source);
            }
            throw i;
          } finally {
            Xn(r);
          }
          var s;
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((t) => this.get(t));
        }
        toString() {
          const t = [];
          return (
            this.records.forEach((e, n) => t.push(X(n))),
            `R3Injector[${t.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed)
            throw new Error("Injector has already been destroyed.");
        }
        processInjectorType(t, e, n) {
          if (!(t = rt(t))) return !1;
          let r = lt(t);
          const s = (null == r && t.ngModule) || void 0,
            i = void 0 === s ? t : s,
            o = -1 !== n.indexOf(i);
          if ((void 0 !== s && (r = lt(s)), null == r)) return !1;
          if (null != r.imports && !o) {
            let t;
            n.push(i);
            try {
              Vn(r.imports, (r) => {
                this.processInjectorType(r, e, n) &&
                  (void 0 === t && (t = []), t.push(r));
              });
            } finally {
            }
            if (void 0 !== t)
              for (let e = 0; e < t.length; e++) {
                const { ngModule: n, providers: r } = t[e];
                Vn(r, (t) => this.processProvider(t, n, r || Bs));
              }
          }
          this.injectorDefTypes.add(i), this.records.set(i, Js(r.factory, zs));
          const a = r.providers;
          if (null != a && !o) {
            const e = t;
            Vn(a, (t) => this.processProvider(t, e, a));
          }
          return void 0 !== s && void 0 !== t.providers;
        }
        processProvider(t, e, n) {
          let r = Xs((t = rt(t))) ? t : rt(t && t.provide);
          const s = (function (t, e, n) {
            return Ys(t)
              ? Js(void 0, t.useValue)
              : Js(
                  (function (t, e, n) {
                    let r = void 0;
                    if (Xs(t)) {
                      const e = rt(t);
                      return Xt(e) || Ks(e);
                    }
                    if (Ys(t)) r = () => rt(t.useValue);
                    else if ((s = t) && s.useFactory)
                      r = () => t.useFactory(...nr(t.deps || []));
                    else if (
                      (function (t) {
                        return !(!t || !t.useExisting);
                      })(t)
                    )
                      r = () => er(rt(t.useExisting));
                    else {
                      const e = rt(t && (t.useClass || t.provide));
                      if (
                        !(function (t) {
                          return !!t.deps;
                        })(t)
                      )
                        return Xt(e) || Ks(e);
                      r = () => new e(...nr(t.deps));
                    }
                    var s;
                    return r;
                  })(t),
                  zs
                );
          })(t);
          if (Xs(t) || !0 !== t.multi) this.records.get(r);
          else {
            let e = this.records.get(r);
            e ||
              ((e = Js(void 0, zs, !0)),
              (e.factory = () => nr(e.multi)),
              this.records.set(r, e)),
              (r = t),
              e.multi.push(t);
          }
          this.records.set(r, s);
        }
        hydrate(t, e) {
          var n;
          return (
            e.value === zs && ((e.value = qs), (e.value = e.factory())),
            "object" == typeof e.value &&
              e.value &&
              null !== (n = e.value) &&
              "object" == typeof n &&
              "function" == typeof n.ngOnDestroy &&
              this.onDestroy.add(e.value),
            e.value
          );
        }
        injectableDefInScope(t) {
          return (
            !!t.providedIn &&
            ("string" == typeof t.providedIn
              ? "any" === t.providedIn || t.providedIn === this.scope
              : this.injectorDefTypes.has(t.providedIn))
          );
        }
      }
      function Ks(t) {
        const e = ot(t),
          n = null !== e ? e.factory : Xt(t);
        if (null !== n) return n;
        const r = lt(t);
        if (null !== r) return r.factory;
        if (t instanceof Ln)
          throw new Error(`Token ${X(t)} is missing a \u0275prov definition.`);
        if (t instanceof Function)
          return (function (t) {
            const e = t.length;
            if (e > 0) {
              const n = (function (t, e) {
                const n = [];
                for (let r = 0; r < t; r++) n.push("?");
                return n;
              })(e);
              throw new Error(
                `Can't resolve all parameters for ${X(t)}: (${n.join(", ")}).`
              );
            }
            const n = (function (t) {
              const e = t && (t[ut] || t[ht]);
              if (e) {
                const n = (function (t) {
                  if (t.hasOwnProperty("name")) return t.name;
                  const e = ("" + t).match(/^function\s*([^\s(]+)/);
                  return null === e ? "" : e[1];
                })(t);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  e
                );
              }
              return null;
            })(t);
            return null !== n ? () => n.factory(t) : () => new t();
          })(t);
        throw new Error("unreachable");
      }
      function Js(t, e, n = !1) {
        return { factory: t, value: e, multi: n ? [] : void 0 };
      }
      function Ys(t) {
        return null !== t && "object" == typeof t && Jn in t;
      }
      function Xs(t) {
        return "function" == typeof t;
      }
      const ti = function (t, e, n) {
        return (function (t, e = null, n = null, r) {
          const s = Zs(t, e, n, r);
          return s._resolveInjectorDefTypes(), s;
        })({ name: n }, e, t, n);
      };
      let ei = (() => {
        class t {
          static create(t, e) {
            return Array.isArray(t)
              ? ti(t, e, "")
              : ti(t.providers, t.parent, t.name || "");
          }
        }
        return (
          (t.THROW_IF_NOT_FOUND = Zn),
          (t.NULL = new Vs()),
          (t.ɵprov = st({
            token: t,
            providedIn: "any",
            factory: () => er(Ms),
          })),
          (t.__NG_ELEMENT_ID__ = -1),
          t
        );
      })();
      function ni(t, e) {
        Ye(ve(t)[1], Ae());
      }
      let ri = null;
      function si() {
        if (!ri) {
          const t = xt.Symbol;
          if (t && t.iterator) ri = t.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let e = 0; e < t.length; ++e) {
              const n = t[e];
              "entries" !== n &&
                "size" !== n &&
                Map.prototype[n] === Map.prototype.entries &&
                (ri = n);
            }
          }
        }
        return ri;
      }
      class ii {
        constructor(t) {
          this.wrapped = t;
        }
        static wrap(t) {
          return new ii(t);
        }
        static unwrap(t) {
          return ii.isWrapped(t) ? t.wrapped : t;
        }
        static isWrapped(t) {
          return t instanceof ii;
        }
      }
      function oi(t) {
        return (
          !!ai(t) && (Array.isArray(t) || (!(t instanceof Map) && si() in t))
        );
      }
      function ai(t) {
        return null !== t && ("function" == typeof t || "object" == typeof t);
      }
      function li(t, e, n) {
        return !Object.is(t[e], n) && ((t[e] = n), !0);
      }
      function ui(t, e, n, r) {
        const s = Ee();
        return (
          li(s, De(), e) &&
            (ke(),
            (function (t, e, n, r, s, i) {
              const o = fe(t, e);
              !(function (t, e, n, r, s, i, o) {
                if (null == i)
                  he(t) ? t.removeAttribute(e, s, n) : e.removeAttribute(s);
                else {
                  const a = null == o ? ee(i) : o(i, r || "", s);
                  he(t)
                    ? t.setAttribute(e, s, a, n)
                    : n
                    ? e.setAttributeNS(n, s, a)
                    : e.setAttribute(s, a);
                }
              })(e[11], o, i, t.value, n, r, s);
            })(Je(), s, t, e, n, r)),
          ui
        );
      }
      function ci(t, e, n, r, s, i, o, a) {
        const l = Ee(),
          u = ke(),
          c = t + Bt,
          h = u.firstCreatePass
            ? (function (t, e, n, r, s, i, o, a, l) {
                const u = e.consts,
                  c = es(e, t, 4, o || null, be(u, a));
                fs(e, n, c, be(u, l)), Ye(e, c);
                const h = (c.tViews = cs(
                  2,
                  c,
                  r,
                  s,
                  i,
                  e.directiveRegistry,
                  e.pipeRegistry,
                  null,
                  e.schemas,
                  u
                ));
                return (
                  null !== e.queries &&
                    (e.queries.template(e, c),
                    (h.queries = e.queries.embeddedTView(c))),
                  c
                );
              })(c, u, l, e, n, r, s, i, o)
            : u.data[c];
        Ie(h, !1);
        const d = l[11].createComment("");
        Or(u, l, d, h),
          dr(d, l),
          As(l, (l[c] = xs(d, l, d, h))),
          Jt(h) && as(u, l, h),
          null != o && ls(l, h, a);
      }
      function hi(t, e = pt.Default) {
        const n = Ee();
        return null === n ? er(t, e) : Tn(Ae(), n, rt(t), e);
      }
      function di(t, e, n) {
        const r = Ee();
        return li(r, De(), e) && ps(ke(), Je(), r, t, e, r[11], n, !1), di;
      }
      function pi(t, e, n, r, s) {
        const i = s ? "class" : "style";
        Ls(t, n, e.inputs[i], i, r);
      }
      function fi(t, e, n, r) {
        const s = Ee(),
          i = ke(),
          o = Bt + t,
          a = s[11],
          l = (s[o] = Sr(a, e, xe.lFrame.currentNamespace)),
          u = i.firstCreatePass
            ? (function (t, e, n, r, s, i, o) {
                const a = e.consts,
                  l = es(e, t, 2, s, be(a, i));
                return (
                  fs(e, n, l, be(a, o)),
                  null !== l.attrs && Fs(l, l.attrs, !1),
                  null !== l.mergedAttrs && Fs(l, l.mergedAttrs, !0),
                  null !== e.queries && e.queries.elementStart(e, l),
                  l
                );
              })(o, i, s, 0, e, n, r)
            : i.data[o];
        Ie(u, !0);
        const c = u.mergedAttrs;
        null !== c && an(a, l, c);
        const h = u.classes;
        null !== h && Hr(a, l, h);
        const d = u.styles;
        null !== d && Lr(a, l, d),
          64 != (64 & u.flags) && Or(i, s, l, u),
          0 === xe.lFrame.elementDepthCount && dr(l, s),
          xe.lFrame.elementDepthCount++,
          Jt(u) &&
            (as(i, s, u),
            (function (t, e, n) {
              if (Qt(e)) {
                const r = e.directiveEnd;
                for (let s = e.directiveStart; s < r; s++) {
                  const e = t.data[s];
                  e.contentQueries && e.contentQueries(1, n[s], s);
                }
              }
            })(i, u, s)),
          null !== r && ls(s, u);
      }
      function gi() {
        let t = Ae();
        Oe() ? (xe.lFrame.isParent = !1) : ((t = t.parent), Ie(t, !1));
        const e = t;
        xe.lFrame.elementDepthCount--;
        const n = ke();
        n.firstCreatePass && (Ye(n, t), Qt(t) && n.queries.elementEnd(t)),
          null != e.classesWithoutHost &&
            (function (t) {
              return 0 != (16 & t.flags);
            })(e) &&
            pi(n, e, Ee(), e.classesWithoutHost, !0),
          null != e.stylesWithoutHost &&
            (function (t) {
              return 0 != (32 & t.flags);
            })(e) &&
            pi(n, e, Ee(), e.stylesWithoutHost, !1);
      }
      function mi(t, e, n, r) {
        fi(t, e, n, r), gi();
      }
      function yi(t) {
        return !!t && "function" == typeof t.then;
      }
      function vi(t) {
        return !!t && "function" == typeof t.subscribe;
      }
      function wi(t, e, n = !1, r) {
        const s = Ee(),
          i = ke(),
          o = Ae();
        return (
          (function (t, e, n, r, s, i, o = !1, a) {
            const l = Jt(r),
              u = t.firstCreatePass && Us(t),
              c = Ns(e);
            let h = !0;
            if (3 & r.type) {
              const d = fe(r, e),
                p = a ? a(d) : Tt,
                f = p.target || d,
                g = c.length,
                m = a ? (t) => a(pe(t[r.index])).target : r.index;
              if (he(n)) {
                let o = null;
                if (
                  (!a &&
                    l &&
                    (o = (function (t, e, n, r) {
                      const s = t.cleanup;
                      if (null != s)
                        for (let i = 0; i < s.length - 1; i += 2) {
                          const t = s[i];
                          if (t === n && s[i + 1] === r) {
                            const t = e[7],
                              n = s[i + 2];
                            return t.length > n ? t[n] : null;
                          }
                          "string" == typeof t && (i += 2);
                        }
                      return null;
                    })(t, e, s, r.index)),
                  null !== o)
                )
                  ((o.__ngLastListenerFn__ || o).__ngNextListenerFn__ = i),
                    (o.__ngLastListenerFn__ = i),
                    (h = !1);
                else {
                  i = bi(r, e, i, !1);
                  const t = n.listen(p.name || f, s, i);
                  c.push(i, t), u && u.push(s, m, g, g + 1);
                }
              } else
                (i = bi(r, e, i, !0)),
                  f.addEventListener(s, i, o),
                  c.push(i),
                  u && u.push(s, m, g, o);
            } else i = bi(r, e, i, !1);
            const d = r.outputs;
            let p;
            if (h && null !== d && (p = d[s])) {
              const t = p.length;
              if (t)
                for (let n = 0; n < t; n += 2) {
                  const t = e[p[n]][p[n + 1]].subscribe(i),
                    o = c.length;
                  c.push(i, t), u && u.push(s, r.index, o, -(o + 1));
                }
            }
          })(i, s, s[11], o, t, e, n, r),
          wi
        );
      }
      function _i(t, e, n) {
        try {
          return !1 !== e(n);
        } catch (r) {
          return Ds(t, r), !1;
        }
      }
      function bi(t, e, n, r) {
        return function s(i) {
          if (i === Function) return n;
          const o = 2 & t.flags ? ye(t.index, e) : e;
          0 == (32 & e[2]) && Rs(o);
          let a = _i(e, n, i),
            l = s.__ngNextListenerFn__;
          for (; l; ) (a = _i(e, l, i) && a), (l = l.__ngNextListenerFn__);
          return r && !1 === a && (i.preventDefault(), (i.returnValue = !1)), a;
        };
      }
      function Si(t, e = "") {
        const n = Ee(),
          r = ke(),
          s = t + Bt,
          i = r.firstCreatePass ? es(r, s, 1, e, null) : r.data[s],
          o = (n[s] = (function (t, e) {
            return he(t) ? t.createText(e) : t.createTextNode(e);
          })(n[11], e));
        Or(r, n, o, i), Ie(i, !1);
      }
      function Ci(t) {
        return xi("", t, ""), Ci;
      }
      function xi(t, e, n) {
        const r = Ee(),
          s = (function (t, e, n, r) {
            return li(t, De(), n) ? e + ee(n) + r : Kr;
          })(r, t, e, n);
        return s !== Kr && Hs(r, Qe(), s), xi;
      }
      function Ti(t, e, n, r, s) {
        const i = Ee(),
          o = (function (t, e, n, r, s, i) {
            const o = (function (t, e, n, r) {
              const s = li(t, e, n);
              return li(t, e + 1, r) || s;
            })(t, Ue(), n, s);
            return (
              (function (t) {
                const e = xe.lFrame;
                e.bindingIndex = e.bindingIndex + 2;
              })(),
              o ? e + ee(n) + r + ee(s) + i : Kr
            );
          })(i, t, e, n, r, s);
        return o !== Kr && Hs(i, Qe(), o), Ti;
      }
      function Ei(t, e, n) {
        const r = Ee();
        return li(r, De(), e) && ps(ke(), Je(), r, t, e, r[11], n, !0), Ei;
      }
      const ki = void 0;
      var Ai = [
        "en",
        [["a", "p"], ["AM", "PM"], ki],
        [["AM", "PM"], ki, ki],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        ki,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        ki,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", ki, "{1} 'at' {0}", ki],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        function (t) {
          let e = Math.floor(Math.abs(t)),
            n = t.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === e && 0 === n ? 1 : 5;
        },
      ];
      let Ri = {};
      function Ii(t) {
        return (
          t in Ri ||
            (Ri[t] =
              xt.ng &&
              xt.ng.common &&
              xt.ng.common.locales &&
              xt.ng.common.locales[t]),
          Ri[t]
        );
      }
      var Oi = (function (t) {
        return (
          (t[(t.LocaleId = 0)] = "LocaleId"),
          (t[(t.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
          (t[(t.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
          (t[(t.DaysFormat = 3)] = "DaysFormat"),
          (t[(t.DaysStandalone = 4)] = "DaysStandalone"),
          (t[(t.MonthsFormat = 5)] = "MonthsFormat"),
          (t[(t.MonthsStandalone = 6)] = "MonthsStandalone"),
          (t[(t.Eras = 7)] = "Eras"),
          (t[(t.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
          (t[(t.WeekendRange = 9)] = "WeekendRange"),
          (t[(t.DateFormat = 10)] = "DateFormat"),
          (t[(t.TimeFormat = 11)] = "TimeFormat"),
          (t[(t.DateTimeFormat = 12)] = "DateTimeFormat"),
          (t[(t.NumberSymbols = 13)] = "NumberSymbols"),
          (t[(t.NumberFormats = 14)] = "NumberFormats"),
          (t[(t.CurrencyCode = 15)] = "CurrencyCode"),
          (t[(t.CurrencySymbol = 16)] = "CurrencySymbol"),
          (t[(t.CurrencyName = 17)] = "CurrencyName"),
          (t[(t.Currencies = 18)] = "Currencies"),
          (t[(t.Directionality = 19)] = "Directionality"),
          (t[(t.PluralCase = 20)] = "PluralCase"),
          (t[(t.ExtraData = 21)] = "ExtraData"),
          t
        );
      })({});
      const Pi = "en-US";
      let ji = Pi;
      function Ni(t) {
        var e, n;
        (n = "Expected localeId to be defined"),
          null == (e = t) &&
            (function (t, e, n, r) {
              throw new Error(
                "ASSERTION ERROR: " + t + ` [Expected=> null != ${e} <=Actual]`
              );
            })(n, e),
          "string" == typeof t && (ji = t.toLowerCase().replace(/_/g, "-"));
      }
      class Ui {}
      class Di {
        resolveComponentFactory(t) {
          throw (function (t) {
            const e = Error(
              `No component factory found for ${X(
                t
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (e.ngComponent = t), e;
          })(t);
        }
      }
      let Li = (() => {
        class t {}
        return (t.NULL = new Di()), t;
      })();
      function Hi(...t) {}
      function Fi(t, e) {
        return new Vi(fe(t, e));
      }
      const Mi = function () {
        return Fi(Ae(), Ee());
      };
      let Vi = (() => {
        class t {
          constructor(t) {
            this.nativeElement = t;
          }
        }
        return (t.__NG_ELEMENT_ID__ = Mi), t;
      })();
      class $i {}
      let zi = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => qi()), t;
      })();
      const qi = function () {
        const t = Ee(),
          e = ye(Ae().index, t);
        return (function (t) {
          return t[11];
        })(Gt(e) ? e : t);
      };
      let Bi = (() => {
        class t {}
        return (
          (t.ɵprov = st({ token: t, providedIn: "root", factory: () => null })),
          t
        );
      })();
      class Wi {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const Gi = new Wi("11.0.5");
      class Zi {
        constructor() {}
        supports(t) {
          return oi(t);
        }
        create(t) {
          return new Ki(t);
        }
      }
      const Qi = (t, e) => e;
      class Ki {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || Qi);
        }
        forEachItem(t) {
          let e;
          for (e = this._itHead; null !== e; e = e._next) t(e);
        }
        forEachOperation(t) {
          let e = this._itHead,
            n = this._removalsHead,
            r = 0,
            s = null;
          for (; e || n; ) {
            const i = !n || (e && e.currentIndex < to(n, r, s)) ? e : n,
              o = to(i, r, s),
              a = i.currentIndex;
            if (i === n) r--, (n = n._nextRemoved);
            else if (((e = e._next), null == i.previousIndex)) r++;
            else {
              s || (s = []);
              const t = o - r,
                e = a - r;
              if (t != e) {
                for (let n = 0; n < t; n++) {
                  const r = n < s.length ? s[n] : (s[n] = 0),
                    i = r + n;
                  e <= i && i < t && (s[n] = r + 1);
                }
                s[i.previousIndex] = e - t;
              }
            }
            o !== a && t(i, o, a);
          }
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachMovedItem(t) {
          let e;
          for (e = this._movesHead; null !== e; e = e._nextMoved) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        forEachIdentityChange(t) {
          let e;
          for (
            e = this._identityChangesHead;
            null !== e;
            e = e._nextIdentityChange
          )
            t(e);
        }
        diff(t) {
          if ((null == t && (t = []), !oi(t)))
            throw new Error(
              `Error trying to diff '${X(
                t
              )}'. Only arrays and iterables are allowed`
            );
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e,
            n,
            r,
            s = this._itHead,
            i = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let e = 0; e < this.length; e++)
              (n = t[e]),
                (r = this._trackByFn(e, n)),
                null !== s && Object.is(s.trackById, r)
                  ? (i && (s = this._verifyReinsertion(s, n, r, e)),
                    Object.is(s.item, n) || this._addIdentityChange(s, n))
                  : ((s = this._mismatch(s, n, r, e)), (i = !0)),
                (s = s._next);
          } else
            (e = 0),
              (function (t, e) {
                if (Array.isArray(t))
                  for (let n = 0; n < t.length; n++) e(t[n]);
                else {
                  const n = t[si()]();
                  let r;
                  for (; !(r = n.next()).done; ) e(r.value);
                }
              })(t, (t) => {
                (r = this._trackByFn(e, t)),
                  null !== s && Object.is(s.trackById, r)
                    ? (i && (s = this._verifyReinsertion(s, t, r, e)),
                      Object.is(s.item, t) || this._addIdentityChange(s, t))
                    : ((s = this._mismatch(s, t, r, e)), (i = !0)),
                  (s = s._next),
                  e++;
              }),
              (this.length = e);
          return this._truncate(s), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, e, n, r) {
          let s;
          return (
            null === t ? (s = this._itTail) : ((s = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._linkedRecords
                ? null
                : this._linkedRecords.get(n, r))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e),
                this._moveAfter(t, s, r))
              : null !==
                (t =
                  null === this._unlinkedRecords
                    ? null
                    : this._unlinkedRecords.get(n, null))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e),
                this._reinsertAfter(t, s, r))
              : (t = this._addAfter(new Ji(e, n), s, r)),
            t
          );
        }
        _verifyReinsertion(t, e, n, r) {
          let s =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(n, null);
          return (
            null !== s
              ? (t = this._reinsertAfter(s, t._prev, r))
              : t.currentIndex != r &&
                ((t.currentIndex = r), this._addToMoves(t, r)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const e = t._next;
            this._addToRemovals(this._unlink(t)), (t = e);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, e, n) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const r = t._prevRemoved,
            s = t._nextRemoved;
          return (
            null === r ? (this._removalsHead = s) : (r._nextRemoved = s),
            null === s ? (this._removalsTail = r) : (s._prevRemoved = r),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _moveAfter(t, e, n) {
          return (
            this._unlink(t),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _addAfter(t, e, n) {
          return (
            this._insertAfter(t, e, n),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, e, n) {
          const r = null === e ? this._itHead : e._next;
          return (
            (t._next = r),
            (t._prev = e),
            null === r ? (this._itTail = t) : (r._prev = t),
            null === e ? (this._itHead = t) : (e._next = t),
            null === this._linkedRecords && (this._linkedRecords = new Xi()),
            this._linkedRecords.put(t),
            (t.currentIndex = n),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const e = t._prev,
            n = t._next;
          return (
            null === e ? (this._itHead = n) : (e._next = n),
            null === n ? (this._itTail = e) : (n._prev = e),
            t
          );
        }
        _addToMoves(t, e) {
          return (
            t.previousIndex === e ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new Xi()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, e) {
          return (
            (t.item = e),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class Ji {
        constructor(t, e) {
          (this.item = t),
            (this.trackById = e),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class Yi {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, e) {
          let n;
          for (n = this._head; null !== n; n = n._nextDup)
            if (
              (null === e || e <= n.currentIndex) &&
              Object.is(n.trackById, t)
            )
              return n;
          return null;
        }
        remove(t) {
          const e = t._prevDup,
            n = t._nextDup;
          return (
            null === e ? (this._head = n) : (e._nextDup = n),
            null === n ? (this._tail = e) : (n._prevDup = e),
            null === this._head
          );
        }
      }
      class Xi {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const e = t.trackById;
          let n = this.map.get(e);
          n || ((n = new Yi()), this.map.set(e, n)), n.add(t);
        }
        get(t, e) {
          const n = this.map.get(t);
          return n ? n.get(t, e) : null;
        }
        remove(t) {
          const e = t.trackById;
          return this.map.get(e).remove(t) && this.map.delete(e), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function to(t, e, n) {
        const r = t.previousIndex;
        if (null === r) return r;
        let s = 0;
        return n && r < n.length && (s = n[r]), r + e + s;
      }
      class eo {
        constructor() {}
        supports(t) {
          return t instanceof Map || ai(t);
        }
        create() {
          return new no();
        }
      }
      class no {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let e;
          for (e = this._mapHead; null !== e; e = e._next) t(e);
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousMapHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachChangedItem(t) {
          let e;
          for (e = this._changesHead; null !== e; e = e._nextChanged) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || ai(t)))
              throw new Error(
                `Error trying to diff '${X(
                  t
                )}'. Only maps and objects are allowed`
              );
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (t, n) => {
              if (e && e.key === n)
                this._maybeAddToChanges(e, t),
                  (this._appendAfter = e),
                  (e = e._next);
              else {
                const r = this._getOrCreateRecordForKey(n, t);
                e = this._insertBeforeOrAppend(e, r);
              }
            }),
            e)
          ) {
            e._prev && (e._prev._next = null), (this._removalsHead = e);
            for (let t = e; null !== t; t = t._nextRemoved)
              t === this._mapHead && (this._mapHead = null),
                this._records.delete(t.key),
                (t._nextRemoved = t._next),
                (t.previousValue = t.currentValue),
                (t.currentValue = null),
                (t._prev = null),
                (t._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, e) {
          if (t) {
            const n = t._prev;
            return (
              (e._next = t),
              (e._prev = n),
              (t._prev = e),
              n && (n._next = e),
              t === this._mapHead && (this._mapHead = e),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = e), (e._prev = this._appendAfter))
              : (this._mapHead = e),
            (this._appendAfter = e),
            null
          );
        }
        _getOrCreateRecordForKey(t, e) {
          if (this._records.has(t)) {
            const n = this._records.get(t);
            this._maybeAddToChanges(n, e);
            const r = n._prev,
              s = n._next;
            return (
              r && (r._next = s),
              s && (s._prev = r),
              (n._next = null),
              (n._prev = null),
              n
            );
          }
          const n = new ro(t);
          return (
            this._records.set(t, n),
            (n.currentValue = e),
            this._addToAdditions(n),
            n
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, e) {
          Object.is(e, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = e),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, e) {
          t instanceof Map
            ? t.forEach(e)
            : Object.keys(t).forEach((n) => e(t[n], n));
        }
      }
      class ro {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      let so = (() => {
          class t {
            constructor(t) {
              this.factories = t;
            }
            static create(e, n) {
              if (null != n) {
                const t = n.factories.slice();
                e = e.concat(t);
              }
              return new t(e);
            }
            static extend(e) {
              return {
                provide: t,
                useFactory: (n) => {
                  if (!n)
                    throw new Error(
                      "Cannot extend IterableDiffers without a parent injector"
                    );
                  return t.create(e, n);
                },
                deps: [[t, new Gn(), new Bn()]],
              };
            }
            find(t) {
              const e = this.factories.find((e) => e.supports(t));
              if (null != e) return e;
              throw new Error(
                `Cannot find a differ supporting object '${t}' of type '${
                  ((n = t), n.name || typeof n)
                }'`
              );
              var n;
            }
          }
          return (
            (t.ɵprov = st({
              token: t,
              providedIn: "root",
              factory: () => new t([new Zi()]),
            })),
            t
          );
        })(),
        io = (() => {
          class t {
            constructor(t) {
              this.factories = t;
            }
            static create(e, n) {
              if (n) {
                const t = n.factories.slice();
                e = e.concat(t);
              }
              return new t(e);
            }
            static extend(e) {
              return {
                provide: t,
                useFactory: (n) => {
                  if (!n)
                    throw new Error(
                      "Cannot extend KeyValueDiffers without a parent injector"
                    );
                  return t.create(e, n);
                },
                deps: [[t, new Gn(), new Bn()]],
              };
            }
            find(t) {
              const e = this.factories.find((e) => e.supports(t));
              if (e) return e;
              throw new Error(`Cannot find a differ supporting object '${t}'`);
            }
          }
          return (
            (t.ɵprov = st({
              token: t,
              providedIn: "root",
              factory: () => new t([new eo()]),
            })),
            t
          );
        })();
      function oo(t, e, n, r, s = !1) {
        for (; null !== n; ) {
          const i = e[n.index];
          if ((null !== i && r.push(pe(i)), Zt(i)))
            for (let t = Wt; t < i.length; t++) {
              const e = i[t],
                n = e[1].firstChild;
              null !== n && oo(e[1], e, n, r);
            }
          const o = n.type;
          if (8 & o) oo(t, e, n.child, r);
          else if (32 & o) {
            const t = mr(n, e);
            let s;
            for (; (s = t()); ) r.push(s);
          } else if (16 & o) {
            const t = e[16],
              s = t[6].projection[n.projection];
            if (Array.isArray(s)) r.push(...s);
            else {
              const e = yr(t);
              oo(e[1], e, s, r, !0);
            }
          }
          n = s ? n.projectionNext : n.next;
        }
        return r;
      }
      class ao {
        constructor(t, e) {
          (this._lView = t),
            (this._cdRefInjectingView = e),
            (this._appRef = null),
            (this._viewContainerRef = null);
        }
        get rootNodes() {
          const t = this._lView,
            e = t[1];
          return oo(e, t, e.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._viewContainerRef) {
            const t = this._viewContainerRef.indexOf(this);
            t > -1 && this._viewContainerRef.detach(t),
              (this._viewContainerRef = null);
          }
          Tr(this._lView[1], this._lView);
        }
        onDestroy(t) {
          hs(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          Rs(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          Is(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function (t, e, n) {
            je(!0);
            try {
              Is(t, e, n);
            } finally {
              je(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef(t) {
          if (this._appRef)
            throw new Error(
              "This view is already attached directly to the ApplicationRef!"
            );
          this._viewContainerRef = t;
        }
        detachFromAppRef() {
          var t;
          (this._appRef = null),
            Ur(this._lView[1], (t = this._lView), t[11], 2, null, null);
        }
        attachToAppRef(t) {
          if (this._viewContainerRef)
            throw new Error(
              "This view is already attached to a ViewContainer!"
            );
          this._appRef = t;
        }
      }
      class lo extends ao {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          Os(this._view);
        }
        checkNoChanges() {
          !(function (t) {
            je(!0);
            try {
              Os(t);
            } finally {
              je(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      const uo = ho;
      let co = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = uo), (t.__ChangeDetectorRef__ = !0), t;
      })();
      function ho(t = !1) {
        return (function (t, e, n) {
          if (!n && Kt(t)) {
            const n = ye(t.index, e);
            return new ao(n, n);
          }
          return 47 & t.type ? new ao(e[16], e) : null;
        })(Ae(), Ee(), t);
      }
      const po = [new eo()],
        fo = new so([new Zi()]),
        go = new io(po),
        mo = function () {
          return _o(Ae(), Ee());
        };
      let yo = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = mo), t;
      })();
      const vo = yo,
        wo = class extends vo {
          constructor(t, e, n) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = e),
              (this.elementRef = n);
          }
          createEmbeddedView(t) {
            const e = this._declarationTContainer.tViews,
              n = ts(
                this._declarationLView,
                e,
                t,
                16,
                null,
                e.declTNode,
                null,
                null,
                null,
                null
              );
            n[17] = this._declarationLView[this._declarationTContainer.index];
            const r = this._declarationLView[19];
            return (
              null !== r && (n[19] = r.createEmbeddedView(e)),
              rs(e, n, t),
              new ao(n)
            );
          }
        };
      function _o(t, e) {
        return 4 & t.type ? new wo(e, t, Fi(t, e)) : null;
      }
      class bo {}
      class So {}
      const Co = function () {
        return Ro(Ae(), Ee());
      };
      let xo = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = Co), t;
      })();
      const To = xo,
        Eo = class extends To {
          constructor(t, e, n) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = e),
              (this._hostLView = n);
          }
          get element() {
            return Fi(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new jn(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = bn(this._hostTNode, this._hostLView);
            if (dn(t)) {
              const e = fn(t, this._hostLView),
                n = pn(t);
              return new jn(e[1].data[n + 8], e);
            }
            return new jn(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const e = ko(this._lContainer);
            return (null !== e && e[t]) || null;
          }
          get length() {
            return this._lContainer.length - Wt;
          }
          createEmbeddedView(t, e, n) {
            const r = t.createEmbeddedView(e || {});
            return this.insert(r, n), r;
          }
          createComponent(t, e, n, r, s) {
            const i = n || this.parentInjector;
            if (!s && null == t.ngModule && i) {
              const t = i.get(bo, null);
              t && (s = t);
            }
            const o = t.create(i, r, void 0, s);
            return this.insert(o.hostView, e), o;
          }
          insert(t, e) {
            const n = t._lView,
              r = n[1];
            if (Zt(n[3])) {
              const e = this.indexOf(t);
              if (-1 !== e) this.detach(e);
              else {
                const e = n[3],
                  r = new Eo(e, e[6], e[3]);
                r.detach(r.indexOf(t));
              }
            }
            const s = this._adjustIndex(e),
              i = this._lContainer;
            !(function (t, e, n, r) {
              const s = Wt + r,
                i = n.length;
              r > 0 && (n[s - 1][4] = e),
                r < i - Wt
                  ? ((e[4] = n[s]), $n(n, Wt + r, e))
                  : (n.push(e), (e[4] = null)),
                (e[3] = n);
              const o = e[17];
              null !== o &&
                n !== o &&
                (function (t, e) {
                  const n = t[9];
                  e[16] !== e[3][3][16] && (t[2] = !0),
                    null === n ? (t[9] = [e]) : n.push(e);
                })(o, e);
              const a = e[19];
              null !== a && a.insertView(t), (e[2] |= 128);
            })(r, n, i, s);
            const o = jr(s, i),
              a = n[11],
              l = Ir(a, i[7]);
            return (
              null !== l &&
                (function (t, e, n, r, s, i) {
                  (r[0] = s), (r[6] = e), Ur(t, r, n, 1, s, i);
                })(r, i[6], a, n, l, o),
              t.attachToViewContainerRef(this),
              $n(Ao(i), s, t),
              t
            );
          }
          move(t, e) {
            return this.insert(t, e);
          }
          indexOf(t) {
            const e = ko(this._lContainer);
            return null !== e ? e.indexOf(t) : -1;
          }
          remove(t) {
            const e = this._adjustIndex(t, -1),
              n = xr(this._lContainer, e);
            n && (zn(Ao(this._lContainer), e), Tr(n[1], n));
          }
          detach(t) {
            const e = this._adjustIndex(t, -1),
              n = xr(this._lContainer, e);
            return n && null != zn(Ao(this._lContainer), e) ? new ao(n) : null;
          }
          _adjustIndex(t, e = 0) {
            return null == t ? this.length + e : t;
          }
        };
      function ko(t) {
        return t[8];
      }
      function Ao(t) {
        return t[8] || (t[8] = []);
      }
      function Ro(t, e) {
        let n;
        const r = e[t.index];
        if (Zt(r)) n = r;
        else {
          let s;
          if (8 & t.type) s = pe(r);
          else {
            const n = e[11];
            s = n.createComment("");
            const r = fe(t, e);
            kr(
              n,
              Ir(n, r),
              s,
              (function (t, e) {
                return he(t) ? t.nextSibling(e) : e.nextSibling;
              })(n, r),
              !1
            );
          }
          (e[t.index] = n = xs(r, e, s, t)), As(e, n);
        }
        return new Eo(n, t, e);
      }
      const Io = {};
      class Oo extends Li {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const e = zt(t);
          return new No(e, this.ngModule);
        }
      }
      function Po(t) {
        const e = [];
        for (let n in t)
          t.hasOwnProperty(n) && e.push({ propName: t[n], templateName: n });
        return e;
      }
      const jo = new Ln("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => pr,
      });
      class No extends Ui {
        constructor(t, e) {
          super(),
            (this.componentDef = t),
            (this.ngModule = e),
            (this.componentType = t.type),
            (this.selector = t.selectors.map(Qr).join(",")),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!e);
        }
        get inputs() {
          return Po(this.componentDef.inputs);
        }
        get outputs() {
          return Po(this.componentDef.outputs);
        }
        create(t, e, n, r) {
          const s = (r = r || this.ngModule)
              ? (function (t, e) {
                  return {
                    get: (n, r, s) => {
                      const i = t.get(n, Io, s);
                      return i !== Io || r === Io ? i : e.get(n, r, s);
                    },
                  };
                })(t, r.injector)
              : t,
            i = s.get($i, de),
            o = s.get(Bi, null),
            a = i.createRenderer(null, this.componentDef),
            l = this.componentDef.selectors[0][0] || "div",
            u = n
              ? (function (t, e, n) {
                  if (he(t)) return t.selectRootElement(e, n === wt.ShadowDom);
                  let r = "string" == typeof e ? t.querySelector(e) : e;
                  return (r.textContent = ""), r;
                })(a, n, this.componentDef.encapsulation)
              : Sr(
                  i.createRenderer(null, this.componentDef),
                  l,
                  (function (t) {
                    const e = t.toLowerCase();
                    return "svg" === e
                      ? "http://www.w3.org/2000/svg"
                      : "math" === e
                      ? "http://www.w3.org/1998/MathML/"
                      : null;
                  })(l)
                ),
            c = this.componentDef.onPush ? 576 : 528,
            h = {
              components: [],
              scheduler: pr,
              clean: js,
              playerHandler: null,
              flags: 0,
            },
            d = cs(0, null, null, 1, 0, null, null, null, null, null),
            p = ts(null, d, h, c, null, null, i, a, o, s);
          let f, g;
          ze(p);
          try {
            const t = (function (t, e, n, r, s, i) {
              const o = n[1];
              n[20] = t;
              const a = es(o, 20, 2, "#host", null),
                l = (a.mergedAttrs = e.hostAttrs);
              null !== l &&
                (Fs(a, l, !0),
                null !== t &&
                  (an(s, t, l),
                  null !== a.classes && Hr(s, t, a.classes),
                  null !== a.styles && Lr(s, t, a.styles)));
              const u = r.createRenderer(t, e),
                c = ts(
                  n,
                  us(e),
                  null,
                  e.onPush ? 64 : 16,
                  n[20],
                  a,
                  r,
                  u,
                  null,
                  null
                );
              return (
                o.firstCreatePass &&
                  (Sn(vn(a, n), o, e.type), ys(o, a), ws(a, n.length, 1)),
                As(n, c),
                (n[20] = c)
              );
            })(u, this.componentDef, p, i, a);
            if (u)
              if (n) an(a, u, ["ng-version", Gi.full]);
              else {
                const { attrs: t, classes: e } = (function (t) {
                  const e = [],
                    n = [];
                  let r = 1,
                    s = 2;
                  for (; r < t.length; ) {
                    let i = t[r];
                    if ("string" == typeof i)
                      2 === s
                        ? "" !== i && e.push(i, t[++r])
                        : 8 === s && n.push(i);
                    else {
                      if (!Br(s)) break;
                      s = i;
                    }
                    r++;
                  }
                  return { attrs: e, classes: n };
                })(this.componentDef.selectors[0]);
                t && an(a, u, t), e && e.length > 0 && Hr(a, u, e.join(" "));
              }
            if (((g = ge(d, Bt)), void 0 !== e)) {
              const t = (g.projection = []);
              for (let n = 0; n < this.ngContentSelectors.length; n++) {
                const r = e[n];
                t.push(null != r ? Array.from(r) : null);
              }
            }
            (f = (function (t, e, n, r, s) {
              const i = n[1],
                o = (function (t, e, n) {
                  const r = Ae();
                  t.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    _s(t, r, e, ns(t, e, 1, null), n));
                  const s = In(e, t, r.directiveStart, r);
                  dr(s, e);
                  const i = fe(r, e);
                  return i && dr(i, e), s;
                })(i, n, e);
              if (
                (r.components.push(o),
                (t[8] = o),
                s && s.forEach((t) => t(o, e)),
                e.contentQueries)
              ) {
                const t = Ae();
                e.contentQueries(1, o, t.directiveStart);
              }
              const a = Ae();
              return (
                !i.firstCreatePass ||
                  (null === e.hostBindings && null === e.hostAttrs) ||
                  (Ke(a.index),
                  gs(n[1], a, 0, a.directiveStart, a.directiveEnd, e),
                  ms(e, o)),
                o
              );
            })(t, this.componentDef, p, h, [ni])),
              rs(d, p, null);
          } finally {
            Ze();
          }
          return new Uo(this.componentType, f, Fi(g, p), p, g);
        }
      }
      class Uo extends class {} {
        constructor(t, e, n, r, s) {
          super(),
            (this.location = n),
            (this._rootLView = r),
            (this._tNode = s),
            (this.instance = e),
            (this.hostView = this.changeDetectorRef = new lo(r)),
            (this.componentType = t);
        }
        get injector() {
          return new jn(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      const Do = new Map();
      class Lo extends bo {
        constructor(t, e) {
          super(),
            (this._parent = e),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Oo(this));
          const n = qt(t),
            r = t[Ot] || null;
          r && Ni(r),
            (this._bootstrapComponents = fr(n.bootstrap)),
            (this._r3Injector = Zs(
              t,
              e,
              [
                { provide: bo, useValue: this },
                { provide: Li, useValue: this.componentFactoryResolver },
              ],
              X(t)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(t));
        }
        get(t, e = ei.THROW_IF_NOT_FOUND, n = pt.Default) {
          return t === ei || t === bo || t === Ms
            ? this
            : this._r3Injector.get(t, e, n);
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class Ho extends So {
        constructor(t) {
          super(),
            (this.moduleType = t),
            null !== qt(t) &&
              (function (t) {
                const e = new Set();
                !(function t(n) {
                  const r = qt(n, !0),
                    s = r.id;
                  null !== s &&
                    ((function (t, e, n) {
                      if (e && e !== n)
                        throw new Error(
                          `Duplicate module registered for ${t} - ${X(
                            e
                          )} vs ${X(e.name)}`
                        );
                    })(s, Do.get(s), n),
                    Do.set(s, n));
                  const i = fr(r.imports);
                  for (const o of i) e.has(o) || (e.add(o), t(o));
                })(t);
              })(t);
        }
        create(t) {
          return new Lo(this.moduleType, t);
        }
      }
      function Fo(t, e, n, r, s, i) {
        const o = e + n;
        return li(t, o, s)
          ? (function (t, e, n) {
              return (t[e] = n);
            })(t, o + 1, i ? r.call(i, s) : r(s))
          : (function (t, e) {
              const n = t[e];
              return n === Kr ? void 0 : n;
            })(t, o + 1);
      }
      const Mo = class extends C {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, e, n) {
          let r,
            s = (t) => null,
            i = () => null;
          t && "object" == typeof t
            ? ((r = this.__isAsync
                ? (e) => {
                    setTimeout(() => t.next(e));
                  }
                : (e) => {
                    t.next(e);
                  }),
              t.error &&
                (s = this.__isAsync
                  ? (e) => {
                      setTimeout(() => t.error(e));
                    }
                  : (e) => {
                      t.error(e);
                    }),
              t.complete &&
                (i = this.__isAsync
                  ? () => {
                      setTimeout(() => t.complete());
                    }
                  : () => {
                      t.complete();
                    }))
            : ((r = this.__isAsync
                ? (e) => {
                    setTimeout(() => t(e));
                  }
                : (e) => {
                    t(e);
                  }),
              e &&
                (s = this.__isAsync
                  ? (t) => {
                      setTimeout(() => e(t));
                    }
                  : (t) => {
                      e(t);
                    }),
              n &&
                (i = this.__isAsync
                  ? () => {
                      setTimeout(() => n());
                    }
                  : () => {
                      n();
                    }));
          const o = super.subscribe(r, s, i);
          return t instanceof h && t.add(o), o;
        }
      };
      function Vo() {
        return this._results[si()]();
      }
      class $o {
        constructor() {
          (this.dirty = !0),
            (this._results = []),
            (this.changes = new Mo()),
            (this.length = 0);
          const t = si(),
            e = $o.prototype;
          e[t] || (e[t] = Vo);
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, e) {
          return this._results.reduce(t, e);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t) {
          (this._results = Mn(t)),
            (this.dirty = !1),
            (this.length = this._results.length),
            (this.last = this._results[this.length - 1]),
            (this.first = this._results[0]);
        }
        notifyOnChanges() {
          this.changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      class zo {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new zo(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class qo {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const e = t.queries;
          if (null !== e) {
            const n =
                null !== t.contentQueries ? t.contentQueries[0] : e.length,
              r = [];
            for (let t = 0; t < n; t++) {
              const n = e.getByIndex(t);
              r.push(this.queries[n.indexInDeclarationView].clone());
            }
            return new qo(r);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let e = 0; e < this.queries.length; e++)
            null !== ea(t, e).matches && this.queries[e].setDirty();
        }
      }
      class Bo {
        constructor(t, e, n, r = null) {
          (this.predicate = t),
            (this.descendants = e),
            (this.isStatic = n),
            (this.read = r);
        }
      }
      class Wo {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, e) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].elementStart(t, e);
        }
        elementEnd(t) {
          for (let e = 0; e < this.queries.length; e++)
            this.queries[e].elementEnd(t);
        }
        embeddedTView(t) {
          let e = null;
          for (let n = 0; n < this.length; n++) {
            const r = null !== e ? e.length : 0,
              s = this.getByIndex(n).embeddedTView(t, r);
            s &&
              ((s.indexInDeclarationView = n),
              null !== e ? e.push(s) : (e = [s]));
          }
          return null !== e ? new Wo(e) : null;
        }
        template(t, e) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].template(t, e);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class Go {
        constructor(t, e = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = e);
        }
        elementStart(t, e) {
          this.isApplyingToNode(e) && this.matchTNode(t, e);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index &&
            (this._appliesToNextNode = !1);
        }
        template(t, e) {
          this.elementStart(t, e);
        }
        embeddedTView(t, e) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-t.index, e),
              new Go(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && !1 === this.metadata.descendants) {
            const e = this._declarationNodeIndex;
            let n = t.parent;
            for (; null !== n && 8 & n.type && n.index !== e; ) n = n.parent;
            return e === (null !== n ? n.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, e) {
          const n = this.metadata.predicate;
          if (Array.isArray(n))
            for (let r = 0; r < n.length; r++) {
              const s = n[r];
              this.matchTNodeWithReadOption(t, e, Zo(e, s)),
                this.matchTNodeWithReadOption(t, e, Rn(e, t, s, !1, !1));
            }
          else
            n === yo
              ? 4 & e.type && this.matchTNodeWithReadOption(t, e, -1)
              : this.matchTNodeWithReadOption(t, e, Rn(e, t, n, !1, !1));
        }
        matchTNodeWithReadOption(t, e, n) {
          if (null !== n) {
            const r = this.metadata.read;
            if (null !== r)
              if (r === Vi || r === xo || (r === yo && 4 & e.type))
                this.addMatch(e.index, -2);
              else {
                const n = Rn(e, t, r, !1, !1);
                null !== n && this.addMatch(e.index, n);
              }
            else this.addMatch(e.index, n);
          }
        }
        addMatch(t, e) {
          null === this.matches
            ? (this.matches = [t, e])
            : this.matches.push(t, e);
        }
      }
      function Zo(t, e) {
        const n = t.localNames;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) if (n[r] === e) return n[r + 1];
        return null;
      }
      function Qo(t, e, n, r) {
        return -1 === n
          ? (function (t, e) {
              return 11 & t.type ? Fi(t, e) : 4 & t.type ? _o(t, e) : null;
            })(e, t)
          : -2 === n
          ? (function (t, e, n) {
              return n === Vi
                ? Fi(e, t)
                : n === yo
                ? _o(e, t)
                : n === xo
                ? Ro(e, t)
                : void 0;
            })(t, e, r)
          : In(t, t[1], n, e);
      }
      function Ko(t, e, n, r) {
        const s = e[19].queries[r];
        if (null === s.matches) {
          const r = t.data,
            i = n.matches,
            o = [];
          for (let t = 0; t < i.length; t += 2) {
            const s = i[t];
            o.push(s < 0 ? null : Qo(e, r[s], i[t + 1], n.metadata.read));
          }
          s.matches = o;
        }
        return s.matches;
      }
      function Jo(t, e, n, r) {
        const s = t.queries.getByIndex(n),
          i = s.matches;
        if (null !== i) {
          const o = Ko(t, e, s, n);
          for (let t = 0; t < i.length; t += 2) {
            const n = i[t];
            if (n > 0) r.push(o[t / 2]);
            else {
              const s = i[t + 1],
                o = e[-n];
              for (let t = Wt; t < o.length; t++) {
                const e = o[t];
                e[17] === e[3] && Jo(e[1], e, s, r);
              }
              if (null !== o[9]) {
                const t = o[9];
                for (let e = 0; e < t.length; e++) {
                  const n = t[e];
                  Jo(n[1], n, s, r);
                }
              }
            }
          }
        }
        return r;
      }
      function Yo(t) {
        const e = Ee(),
          n = ke(),
          r = Fe();
        Me(r + 1);
        const s = ea(n, r);
        if (t.dirty && we(e) === s.metadata.isStatic) {
          if (null === s.matches) t.reset([]);
          else {
            const i = s.crossesNgTemplate ? Jo(n, e, r, []) : Ko(n, e, s, r);
            t.reset(i), t.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function Xo(t, e, n, r) {
        !(function (t, e, n, r, s, i, o, a) {
          t.firstCreatePass &&
            ((function (t, e, n) {
              null === t.queries && (t.queries = new Wo()),
                t.queries.track(new Go(e, n));
            })(t, new Bo(n, r, false, s), o.index),
            (function (t, e) {
              const n = t.contentQueries || (t.contentQueries = []);
              e !== (n.length ? n[n.length - 1] : -1) &&
                n.push(t.queries.length - 1, e);
            })(t, a)),
            (function (t, e) {
              const n = new $o();
              hs(t, e, n, n.destroy),
                null === e[19] && (e[19] = new qo()),
                e[19].queries.push(new zo(n));
            })(t, e);
        })(ke(), Ee(), e, n, r, 0, Ae(), t);
      }
      function ta() {
        return (t = Ee()), (e = Fe()), t[19].queries[e].queryList;
        var t, e;
      }
      function ea(t, e) {
        return t.queries.getByIndex(e);
      }
      function na(t, e) {
        return _o(t, e);
      }
      const ra = new Ln("Application Initializer");
      let sa = (() => {
        class t {
          constructor(t) {
            (this.appInits = t),
              (this.resolve = Hi),
              (this.reject = Hi),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((t, e) => {
                (this.resolve = t), (this.reject = e);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const t = [],
              e = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let n = 0; n < this.appInits.length; n++) {
                const e = this.appInits[n]();
                yi(e) && t.push(e);
              }
            Promise.all(t)
              .then(() => {
                e();
              })
              .catch((t) => {
                this.reject(t);
              }),
              0 === t.length && e(),
              (this.initialized = !0);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(er(ra, 8));
          }),
          (t.ɵprov = st({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const ia = new Ln("AppId"),
        oa = {
          provide: ia,
          useFactory: function () {
            return `${aa()}${aa()}${aa()}`;
          },
          deps: [],
        };
      function aa() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const la = new Ln("Platform Initializer"),
        ua = new Ln("Platform ID"),
        ca = new Ln("appBootstrapListener");
      let ha = (() => {
        class t {
          log(t) {
            console.log(t);
          }
          warn(t) {
            console.warn(t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = st({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const da = new Ln("LocaleId"),
        pa = new Ln("DefaultCurrencyCode");
      class fa {
        constructor(t, e) {
          (this.ngModuleFactory = t), (this.componentFactories = e);
        }
      }
      const ga = function (t) {
          return new Ho(t);
        },
        ma = ga,
        ya = function (t) {
          return Promise.resolve(ga(t));
        },
        va = function (t) {
          const e = ga(t),
            n = fr(qt(t).declarations).reduce((t, e) => {
              const n = zt(e);
              return n && t.push(new No(n)), t;
            }, []);
          return new fa(e, n);
        },
        wa = va,
        _a = function (t) {
          return Promise.resolve(va(t));
        };
      let ba = (() => {
        class t {
          constructor() {
            (this.compileModuleSync = ma),
              (this.compileModuleAsync = ya),
              (this.compileModuleAndAllComponentsSync = wa),
              (this.compileModuleAndAllComponentsAsync = _a);
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = st({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Sa = (() => Promise.resolve(0))();
      function Ca(t) {
        "undefined" == typeof Zone
          ? Sa.then(() => {
              t && t.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", t);
      }
      class xa {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: e = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Mo(!1)),
            (this.onMicrotaskEmpty = new Mo(!1)),
            (this.onStable = new Mo(!1)),
            (this.onError = new Mo(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched();
          const n = this;
          (n._nesting = 0),
            (n._outer = n._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (n._inner = n._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (n._inner = n._inner.fork(Zone.longStackTraceZoneSpec)),
            (n.shouldCoalesceEventChangeDetection = e),
            (n.lastRequestAnimationFrameId = -1),
            (n.nativeRequestAnimationFrame = (function () {
              let t = xt.requestAnimationFrame,
                e = xt.cancelAnimationFrame;
              if ("undefined" != typeof Zone && t && e) {
                const n = t[Zone.__symbol__("OriginalDelegate")];
                n && (t = n);
                const r = e[Zone.__symbol__("OriginalDelegate")];
                r && (e = r);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: e,
              };
            })().nativeRequestAnimationFrame),
            (function (t) {
              const e =
                !!t.shouldCoalesceEventChangeDetection &&
                t.nativeRequestAnimationFrame &&
                (() => {
                  !(function (t) {
                    -1 === t.lastRequestAnimationFrameId &&
                      ((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(
                        xt,
                        () => {
                          t.fakeTopEventTask ||
                            (t.fakeTopEventTask = Zone.root.scheduleEventTask(
                              "fakeTopEventTask",
                              () => {
                                (t.lastRequestAnimationFrameId = -1),
                                  ka(t),
                                  Ea(t);
                              },
                              void 0,
                              () => {},
                              () => {}
                            )),
                            t.fakeTopEventTask.invoke();
                        }
                      )),
                      ka(t));
                  })(t);
                });
              t._inner = t._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0, maybeDelayChangeDetection: e },
                onInvokeTask: (n, r, s, i, o, a) => {
                  try {
                    return Aa(t), n.invokeTask(s, i, o, a);
                  } finally {
                    e && "eventTask" === i.type && e(), Ra(t);
                  }
                },
                onInvoke: (e, n, r, s, i, o, a) => {
                  try {
                    return Aa(t), e.invoke(r, s, i, o, a);
                  } finally {
                    Ra(t);
                  }
                },
                onHasTask: (e, n, r, s) => {
                  e.hasTask(r, s),
                    n === r &&
                      ("microTask" == s.change
                        ? ((t._hasPendingMicrotasks = s.microTask),
                          ka(t),
                          Ea(t))
                        : "macroTask" == s.change &&
                          (t.hasPendingMacrotasks = s.macroTask));
                },
                onHandleError: (e, n, r, s) => (
                  e.handleError(r, s),
                  t.runOutsideAngular(() => t.onError.emit(s)),
                  !1
                ),
              });
            })(n);
        }
        static isInAngularZone() {
          return !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!xa.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (xa.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(t, e, n) {
          return this._inner.run(t, e, n);
        }
        runTask(t, e, n, r) {
          const s = this._inner,
            i = s.scheduleEventTask("NgZoneEvent: " + r, t, Ta, Hi, Hi);
          try {
            return s.runTask(i, e, n);
          } finally {
            s.cancelTask(i);
          }
        }
        runGuarded(t, e, n) {
          return this._inner.runGuarded(t, e, n);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const Ta = {};
      function Ea(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(() => t.onStable.emit(null));
              } finally {
                t.isStable = !0;
              }
          }
      }
      function ka(t) {
        t.hasPendingMicrotasks = !!(
          t._hasPendingMicrotasks ||
          (t.shouldCoalesceEventChangeDetection &&
            -1 !== t.lastRequestAnimationFrameId)
        );
      }
      function Aa(t) {
        t._nesting++,
          t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
      }
      function Ra(t) {
        t._nesting--, Ea(t);
      }
      class Ia {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Mo()),
            (this.onMicrotaskEmpty = new Mo()),
            (this.onStable = new Mo()),
            (this.onError = new Mo());
        }
        run(t, e, n) {
          return t.apply(e, n);
        }
        runGuarded(t, e, n) {
          return t.apply(e, n);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, e, n, r) {
          return t.apply(e, n);
        }
      }
      let Oa = (() => {
          class t {
            constructor(t) {
              (this._ngZone = t),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    "undefined" == typeof Zone
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      xa.assertNotInAngularZone(),
                        Ca(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                Ca(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (e) =>
                    !e.updateCb ||
                    !e.updateCb(t) ||
                    (clearTimeout(e.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((t) => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : [];
            }
            addCallback(t, e, n) {
              let r = -1;
              e &&
                e > 0 &&
                (r = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (t) => t.timeoutId !== r
                  )),
                    t(this._didWork, this.getPendingTasks());
                }, e)),
                this._callbacks.push({ doneCb: t, timeoutId: r, updateCb: n });
            }
            whenStable(t, e, n) {
              if (n && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?'
                );
              this.addCallback(t, e, n), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(t, e, n) {
              return [];
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(er(xa));
            }),
            (t.ɵprov = st({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Pa = (() => {
          class t {
            constructor() {
              (this._applications = new Map()), Ua.addToWindow(this);
            }
            registerApplication(t, e) {
              this._applications.set(t, e);
            }
            unregisterApplication(t) {
              this._applications.delete(t);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(t) {
              return this._applications.get(t) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(t, e = !0) {
              return Ua.findTestabilityInTree(this, t, e);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = st({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      class ja {
        addToWindow(t) {}
        findTestabilityInTree(t, e, n) {
          return null;
        }
      }
      let Na,
        Ua = new ja(),
        Da = !0,
        La = !1;
      function Ha() {
        return (La = !0), Da;
      }
      const Fa = new Ln("AllowMultipleToken");
      class Ma {
        constructor(t, e) {
          (this.name = t), (this.token = e);
        }
      }
      function Va(t, e, n = []) {
        const r = "Platform: " + e,
          s = new Ln(r);
        return (e = []) => {
          let i = $a();
          if (!i || i.injector.get(Fa, !1))
            if (t) t(n.concat(e).concat({ provide: s, useValue: !0 }));
            else {
              const t = n
                .concat(e)
                .concat(
                  { provide: s, useValue: !0 },
                  { provide: $s, useValue: "platform" }
                );
              !(function (t) {
                if (Na && !Na.destroyed && !Na.injector.get(Fa, !1))
                  throw new Error(
                    "There can be only one platform. Destroy the previous one to create a new one."
                  );
                Na = t.get(za);
                const e = t.get(la, null);
                e && e.forEach((t) => t());
              })(ei.create({ providers: t, name: r }));
            }
          return (function (t) {
            const e = $a();
            if (!e) throw new Error("No platform exists!");
            if (!e.injector.get(t, null))
              throw new Error(
                "A platform with a different configuration has been created. Please destroy it first."
              );
            return e;
          })(s);
        };
      }
      function $a() {
        return Na && !Na.destroyed ? Na : null;
      }
      let za = (() => {
        class t {
          constructor(t) {
            (this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(t, e) {
            const n = (function (t, e) {
                let n;
                return (
                  (n =
                    "noop" === t
                      ? new Ia()
                      : ("zone.js" === t ? void 0 : t) ||
                        new xa({
                          enableLongStackTrace: Ha(),
                          shouldCoalesceEventChangeDetection: e,
                        })),
                  n
                );
              })(e ? e.ngZone : void 0, (e && e.ngZoneEventCoalescing) || !1),
              r = [{ provide: xa, useValue: n }];
            return n.run(() => {
              const e = ei.create({
                  providers: r,
                  parent: this.injector,
                  name: t.moduleType.name,
                }),
                s = t.create(e),
                i = s.injector.get(hr, null);
              if (!i)
                throw new Error(
                  "No ErrorHandler. Is platform module (BrowserModule) included?"
                );
              return (
                n.runOutsideAngular(() => {
                  const t = n.onError.subscribe({
                    next: (t) => {
                      i.handleError(t);
                    },
                  });
                  s.onDestroy(() => {
                    Wa(this._modules, s), t.unsubscribe();
                  });
                }),
                (function (t, e, n) {
                  try {
                    const r = n();
                    return yi(r)
                      ? r.catch((n) => {
                          throw (
                            (e.runOutsideAngular(() => t.handleError(n)), n)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (e.runOutsideAngular(() => t.handleError(r)), r);
                  }
                })(i, n, () => {
                  const t = s.injector.get(sa);
                  return (
                    t.runInitializers(),
                    t.donePromise.then(
                      () => (
                        Ni(s.injector.get(da, Pi) || Pi),
                        this._moduleDoBootstrap(s),
                        s
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(t, e = []) {
            const n = qa({}, e);
            return (function (t, e, n) {
              const r = new Ho(n);
              return Promise.resolve(r);
            })(0, 0, t).then((t) => this.bootstrapModuleFactory(t, n));
          }
          _moduleDoBootstrap(t) {
            const e = t.injector.get(Ba);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach((t) => e.bootstrap(t));
            else {
              if (!t.instance.ngDoBootstrap)
                throw new Error(
                  `The module ${X(
                    t.instance.constructor
                  )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`
                );
              t.instance.ngDoBootstrap(e);
            }
            this._modules.push(t);
          }
          onDestroy(t) {
            this._destroyListeners.push(t);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed)
              throw new Error("The platform has already been destroyed!");
            this._modules.slice().forEach((t) => t.destroy()),
              this._destroyListeners.forEach((t) => t()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(er(ei));
          }),
          (t.ɵprov = st({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function qa(t, e) {
        return Array.isArray(e)
          ? e.reduce(qa, t)
          : Object.assign(Object.assign({}, t), e);
      }
      let Ba = (() => {
        class t {
          constructor(t, e, n, r, s, i) {
            (this._zone = t),
              (this._console = e),
              (this._injector = n),
              (this._exceptionHandler = r),
              (this._componentFactoryResolver = s),
              (this._initStatus = i),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe(
                {
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }
              ));
            const o = new v((t) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    t.next(this._stable), t.complete();
                  });
              }),
              a = new v((t) => {
                let e;
                this._zone.runOutsideAngular(() => {
                  e = this._zone.onStable.subscribe(() => {
                    xa.assertNotInAngularZone(),
                      Ca(() => {
                        this._stable ||
                          this._zone.hasPendingMacrotasks ||
                          this._zone.hasPendingMicrotasks ||
                          ((this._stable = !0), t.next(!0));
                      });
                  });
                });
                const n = this._zone.onUnstable.subscribe(() => {
                  xa.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        t.next(!1);
                      }));
                });
                return () => {
                  e.unsubscribe(), n.unsubscribe();
                };
              });
            this.isStable = (function (...t) {
              let e = Number.POSITIVE_INFINITY,
                n = null,
                r = t[t.length - 1];
              return (
                T(r)
                  ? ((n = t.pop()),
                    t.length > 1 &&
                      "number" == typeof t[t.length - 1] &&
                      (e = t.pop()))
                  : "number" == typeof r && (e = t.pop()),
                null === n && 1 === t.length && t[0] instanceof v
                  ? t[0]
                  : z(e)(q(t, n))
              );
            })(
              o,
              a.pipe((t) => {
                return B()(
                  ((e = J),
                  function (t) {
                    let n;
                    n =
                      "function" == typeof e
                        ? e
                        : function () {
                            return e;
                          };
                    const r = Object.create(t, Q);
                    return (r.source = t), (r.subjectFactory = n), r;
                  })(t)
                );
                var e;
              })
            );
          }
          bootstrap(t, e) {
            if (!this._initStatus.done)
              throw new Error(
                "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module."
              );
            let n;
            (n =
              t instanceof Ui
                ? t
                : this._componentFactoryResolver.resolveComponentFactory(t)),
              this.componentTypes.push(n.componentType);
            const r = n.isBoundToModule ? void 0 : this._injector.get(bo),
              s = n.create(ei.NULL, [], e || n.selector, r),
              i = s.location.nativeElement,
              o = s.injector.get(Oa, null),
              a = o && s.injector.get(Pa);
            return (
              o && a && a.registerApplication(i, o),
              s.onDestroy(() => {
                this.detachView(s.hostView),
                  Wa(this.components, s),
                  a && a.unregisterApplication(i);
              }),
              this._loadComponent(s),
              Ha() &&
                this._console.log(
                  "Angular is running in development mode. Call enableProdMode() to enable production mode."
                ),
              s
            );
          }
          tick() {
            if (this._runningTick)
              throw new Error("ApplicationRef.tick is called recursively");
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges();
            } catch (t) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(t)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(t) {
            const e = t;
            this._views.push(e), e.attachToAppRef(this);
          }
          detachView(t) {
            const e = t;
            Wa(this._views, e), e.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get(ca, [])
                .concat(this._bootstrapListeners)
                .forEach((e) => e(t));
          }
          ngOnDestroy() {
            this._views.slice().forEach((t) => t.destroy()),
              this._onMicrotaskEmptySubscription.unsubscribe();
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(er(xa), er(ha), er(ei), er(hr), er(Li), er(sa));
          }),
          (t.ɵprov = st({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Wa(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      class Ga {}
      class Za {}
      const Qa = { factoryPathPrefix: "", factoryPathSuffix: ".ngfactory" };
      let Ka = (() => {
        class t {
          constructor(t, e) {
            (this._compiler = t), (this._config = e || Qa);
          }
          load(t) {
            return this.loadAndCompile(t);
          }
          loadAndCompile(t) {
            let [e, r] = t.split("#");
            return (
              void 0 === r && (r = "default"),
              n("zn8P")(e)
                .then((t) => t[r])
                .then((t) => Ja(t, e, r))
                .then((t) => this._compiler.compileModuleAsync(t))
            );
          }
          loadFactory(t) {
            let [e, r] = t.split("#"),
              s = "NgFactory";
            return (
              void 0 === r && ((r = "default"), (s = "")),
              n("zn8P")(
                this._config.factoryPathPrefix +
                  e +
                  this._config.factoryPathSuffix
              )
                .then((t) => t[r + s])
                .then((t) => Ja(t, e, r))
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(er(ba), er(Za, 8));
          }),
          (t.ɵprov = st({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Ja(t, e, n) {
        if (!t) throw new Error(`Cannot find '${n}' in '${e}'`);
        return t;
      }
      const Ya = Va(null, "core", [
          { provide: ua, useValue: "unknown" },
          { provide: za, deps: [ei] },
          { provide: Pa, deps: [] },
          { provide: ha, deps: [] },
        ]),
        Xa = [
          { provide: Ba, useClass: Ba, deps: [xa, ha, ei, hr, Li, sa] },
          {
            provide: jo,
            deps: [xa],
            useFactory: function (t) {
              let e = [];
              return (
                t.onStable.subscribe(() => {
                  for (; e.length; ) e.pop()();
                }),
                function (t) {
                  e.push(t);
                }
              );
            },
          },
          { provide: sa, useClass: sa, deps: [[new Bn(), ra]] },
          { provide: ba, useClass: ba, deps: [] },
          oa,
          {
            provide: so,
            useFactory: function () {
              return fo;
            },
            deps: [],
          },
          {
            provide: io,
            useFactory: function () {
              return go;
            },
            deps: [],
          },
          {
            provide: da,
            useFactory: function (t) {
              return (
                Ni(
                  (t =
                    t ||
                    ("undefined" != typeof $localize && $localize.locale) ||
                    Pi)
                ),
                t
              );
            },
            deps: [[new qn(da), new Bn(), new Gn()]],
          },
          { provide: pa, useValue: "USD" },
        ];
      let tl = (() => {
          class t {
            constructor(t) {}
          }
          return (
            (t.ɵmod = Ft({ type: t })),
            (t.ɵinj = it({
              factory: function (e) {
                return new (e || t)(er(Ba));
              },
              providers: Xa,
            })),
            t
          );
        })(),
        el = null;
      function nl() {
        return el;
      }
      const rl = new Ln("DocumentToken");
      let sl = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = st({ factory: il, token: t, providedIn: "platform" })),
          t
        );
      })();
      function il() {
        return er(al);
      }
      const ol = new Ln("Location Initialized");
      let al = (() => {
        class t extends sl {
          constructor(t) {
            super(), (this._doc = t), this._init();
          }
          _init() {
            (this.location = nl().getLocation()),
              (this._history = nl().getHistory());
          }
          getBaseHrefFromDOM() {
            return nl().getBaseHref(this._doc);
          }
          onPopState(t) {
            nl()
              .getGlobalEventTarget(this._doc, "window")
              .addEventListener("popstate", t, !1);
          }
          onHashChange(t) {
            nl()
              .getGlobalEventTarget(this._doc, "window")
              .addEventListener("hashchange", t, !1);
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(t) {
            this.location.pathname = t;
          }
          pushState(t, e, n) {
            ll() ? this._history.pushState(t, e, n) : (this.location.hash = n);
          }
          replaceState(t, e, n) {
            ll()
              ? this._history.replaceState(t, e, n)
              : (this.location.hash = n);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(er(rl));
          }),
          (t.ɵprov = st({ factory: ul, token: t, providedIn: "platform" })),
          t
        );
      })();
      function ll() {
        return !!window.history.pushState;
      }
      function ul() {
        return new al(er(rl));
      }
      function cl(t, e) {
        if (0 == t.length) return e;
        if (0 == e.length) return t;
        let n = 0;
        return (
          t.endsWith("/") && n++,
          e.startsWith("/") && n++,
          2 == n ? t + e.substring(1) : 1 == n ? t + e : t + "/" + e
        );
      }
      function hl(t) {
        const e = t.match(/#|\?|$/),
          n = (e && e.index) || t.length;
        return t.slice(0, n - ("/" === t[n - 1] ? 1 : 0)) + t.slice(n);
      }
      function dl(t) {
        return t && "?" !== t[0] ? "?" + t : t;
      }
      let pl = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = st({ factory: fl, token: t, providedIn: "root" })),
          t
        );
      })();
      function fl(t) {
        const e = er(rl).location;
        return new ml(er(sl), (e && e.origin) || "");
      }
      const gl = new Ln("appBaseHref");
      let ml = (() => {
          class t extends pl {
            constructor(t, e) {
              if (
                (super(),
                (this._platformLocation = t),
                null == e && (e = this._platformLocation.getBaseHrefFromDOM()),
                null == e)
              )
                throw new Error(
                  "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document."
                );
              this._baseHref = e;
            }
            onPopState(t) {
              this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t);
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(t) {
              return cl(this._baseHref, t);
            }
            path(t = !1) {
              const e =
                  this._platformLocation.pathname +
                  dl(this._platformLocation.search),
                n = this._platformLocation.hash;
              return n && t ? `${e}${n}` : e;
            }
            pushState(t, e, n, r) {
              const s = this.prepareExternalUrl(n + dl(r));
              this._platformLocation.pushState(t, e, s);
            }
            replaceState(t, e, n, r) {
              const s = this.prepareExternalUrl(n + dl(r));
              this._platformLocation.replaceState(t, e, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(er(sl), er(gl, 8));
            }),
            (t.ɵprov = st({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        yl = (() => {
          class t extends pl {
            constructor(t, e) {
              super(),
                (this._platformLocation = t),
                (this._baseHref = ""),
                null != e && (this._baseHref = e);
            }
            onPopState(t) {
              this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t);
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(t = !1) {
              let e = this._platformLocation.hash;
              return null == e && (e = "#"), e.length > 0 ? e.substring(1) : e;
            }
            prepareExternalUrl(t) {
              const e = cl(this._baseHref, t);
              return e.length > 0 ? "#" + e : e;
            }
            pushState(t, e, n, r) {
              let s = this.prepareExternalUrl(n + dl(r));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(t, e, s);
            }
            replaceState(t, e, n, r) {
              let s = this.prepareExternalUrl(n + dl(r));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(t, e, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(er(sl), er(gl, 8));
            }),
            (t.ɵprov = st({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        vl = (() => {
          class t {
            constructor(t, e) {
              (this._subject = new Mo()),
                (this._urlChangeListeners = []),
                (this._platformStrategy = t);
              const n = this._platformStrategy.getBaseHref();
              (this._platformLocation = e),
                (this._baseHref = hl(_l(n))),
                this._platformStrategy.onPopState((t) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: t.state,
                    type: t.type,
                  });
                });
            }
            path(t = !1) {
              return this.normalize(this._platformStrategy.path(t));
            }
            getState() {
              return this._platformLocation.getState();
            }
            isCurrentPathEqualTo(t, e = "") {
              return this.path() == this.normalize(t + dl(e));
            }
            normalize(e) {
              return t.stripTrailingSlash(
                (function (t, e) {
                  return t && e.startsWith(t) ? e.substring(t.length) : e;
                })(this._baseHref, _l(e))
              );
            }
            prepareExternalUrl(t) {
              return (
                t && "/" !== t[0] && (t = "/" + t),
                this._platformStrategy.prepareExternalUrl(t)
              );
            }
            go(t, e = "", n = null) {
              this._platformStrategy.pushState(n, "", t, e),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + dl(e)),
                  n
                );
            }
            replaceState(t, e = "", n = null) {
              this._platformStrategy.replaceState(n, "", t, e),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + dl(e)),
                  n
                );
            }
            forward() {
              this._platformStrategy.forward();
            }
            back() {
              this._platformStrategy.back();
            }
            onUrlChange(t) {
              this._urlChangeListeners.push(t),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((t) => {
                    this._notifyUrlChangeListeners(t.url, t.state);
                  }));
            }
            _notifyUrlChangeListeners(t = "", e) {
              this._urlChangeListeners.forEach((n) => n(t, e));
            }
            subscribe(t, e, n) {
              return this._subject.subscribe({
                next: t,
                error: e,
                complete: n,
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(er(pl), er(sl));
            }),
            (t.normalizeQueryParams = dl),
            (t.joinWithSlash = cl),
            (t.stripTrailingSlash = hl),
            (t.ɵprov = st({ factory: wl, token: t, providedIn: "root" })),
            t
          );
        })();
      function wl() {
        return new vl(er(pl), er(sl));
      }
      function _l(t) {
        return t.replace(/\/index.html$/, "");
      }
      var bl = (function (t) {
        return (
          (t[(t.Zero = 0)] = "Zero"),
          (t[(t.One = 1)] = "One"),
          (t[(t.Two = 2)] = "Two"),
          (t[(t.Few = 3)] = "Few"),
          (t[(t.Many = 4)] = "Many"),
          (t[(t.Other = 5)] = "Other"),
          t
        );
      })({});
      class Sl {}
      let Cl = (() => {
        class t extends Sl {
          constructor(t) {
            super(), (this.locale = t);
          }
          getPluralCategory(t, e) {
            switch (
              (function (t) {
                return (function (t) {
                  const e = (function (t) {
                    return t.toLowerCase().replace(/_/g, "-");
                  })(t);
                  let n = Ii(e);
                  if (n) return n;
                  const r = e.split("-")[0];
                  if (((n = Ii(r)), n)) return n;
                  if ("en" === r) return Ai;
                  throw new Error(`Missing locale data for the locale "${t}".`);
                })(t)[Oi.PluralCase];
              })(e || this.locale)(t)
            ) {
              case bl.Zero:
                return "zero";
              case bl.One:
                return "one";
              case bl.Two:
                return "two";
              case bl.Few:
                return "few";
              case bl.Many:
                return "many";
              default:
                return "other";
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(er(da));
          }),
          (t.ɵprov = st({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function xl(t, e) {
        e = encodeURIComponent(e);
        for (const n of t.split(";")) {
          const t = n.indexOf("="),
            [r, s] = -1 == t ? [n, ""] : [n.slice(0, t), n.slice(t + 1)];
          if (r.trim() === e) return decodeURIComponent(s);
        }
        return null;
      }
      class Tl {
        constructor(t, e, n, r) {
          (this.$implicit = t),
            (this.ngForOf = e),
            (this.index = n),
            (this.count = r);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let El = (() => {
        class t {
          constructor(t, e, n) {
            (this._viewContainer = t),
              (this._template = e),
              (this._differs = n),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(t) {
            (this._ngForOf = t), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(t) {
            this._trackByFn = t;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(t) {
            t && (this._template = t);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              if (!this._differ && n)
                try {
                  this._differ = this._differs
                    .find(n)
                    .create(this.ngForTrackBy);
                } catch (e) {
                  throw new Error(
                    `Cannot find a differ supporting object '${n}' of type '${
                      ((t = n), t.name || typeof t)
                    }'. NgFor only supports binding to Iterables such as Arrays.`
                  );
                }
            }
            var t;
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf);
              t && this._applyChanges(t);
            }
          }
          _applyChanges(t) {
            const e = [];
            t.forEachOperation((t, n, r) => {
              if (null == t.previousIndex) {
                const n = this._viewContainer.createEmbeddedView(
                    this._template,
                    new Tl(null, this._ngForOf, -1, -1),
                    null === r ? void 0 : r
                  ),
                  s = new kl(t, n);
                e.push(s);
              } else if (null == r)
                this._viewContainer.remove(null === n ? void 0 : n);
              else if (null !== n) {
                const s = this._viewContainer.get(n);
                this._viewContainer.move(s, r);
                const i = new kl(t, s);
                e.push(i);
              }
            });
            for (let n = 0; n < e.length; n++)
              this._perViewChange(e[n].view, e[n].record);
            for (let n = 0, r = this._viewContainer.length; n < r; n++) {
              const t = this._viewContainer.get(n);
              (t.context.index = n),
                (t.context.count = r),
                (t.context.ngForOf = this._ngForOf);
            }
            t.forEachIdentityChange((t) => {
              this._viewContainer.get(t.currentIndex).context.$implicit =
                t.item;
            });
          }
          _perViewChange(t, e) {
            t.context.$implicit = e.item;
          }
          static ngTemplateContextGuard(t, e) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(hi(xo), hi(yo), hi(so));
          }),
          (t.ɵdir = Vt({
            type: t,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
          })),
          t
        );
      })();
      class kl {
        constructor(t, e) {
          (this.record = t), (this.view = e);
        }
      }
      let Al = (() => {
        class t {
          constructor(t, e) {
            (this._viewContainer = t),
              (this._context = new Rl()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = e);
          }
          set ngIf(t) {
            (this._context.$implicit = this._context.ngIf = t),
              this._updateView();
          }
          set ngIfThen(t) {
            Il("ngIfThen", t),
              (this._thenTemplateRef = t),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(t) {
            Il("ngIfElse", t),
              (this._elseTemplateRef = t),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(t, e) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(hi(xo), hi(yo));
          }),
          (t.ɵdir = Vt({
            type: t,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
          })),
          t
        );
      })();
      class Rl {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function Il(t, e) {
        if (e && !e.createEmbeddedView)
          throw new Error(
            `${t} must be a TemplateRef, but received '${X(e)}'.`
          );
      }
      class Ol {
        createSubscription(t, e) {
          return t.subscribe({
            next: e,
            error: (t) => {
              throw t;
            },
          });
        }
        dispose(t) {
          t.unsubscribe();
        }
        onDestroy(t) {
          t.unsubscribe();
        }
      }
      class Pl {
        createSubscription(t, e) {
          return t.then(e, (t) => {
            throw t;
          });
        }
        dispose(t) {}
        onDestroy(t) {}
      }
      const jl = new Pl(),
        Nl = new Ol();
      let Ul = (() => {
          class t {
            constructor(t) {
              (this._ref = t),
                (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null),
                (this._strategy = null);
            }
            ngOnDestroy() {
              this._subscription && this._dispose();
            }
            transform(t) {
              return this._obj
                ? t !== this._obj
                  ? (this._dispose(), this.transform(t))
                  : this._latestValue
                : (t && this._subscribe(t), this._latestValue);
            }
            _subscribe(t) {
              (this._obj = t),
                (this._strategy = this._selectStrategy(t)),
                (this._subscription = this._strategy.createSubscription(
                  t,
                  (e) => this._updateLatestValue(t, e)
                ));
            }
            _selectStrategy(e) {
              if (yi(e)) return jl;
              if (vi(e)) return Nl;
              throw Error(`InvalidPipeArgument: '${e}' for pipe '${X(t)}'`);
            }
            _dispose() {
              this._strategy.dispose(this._subscription),
                (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null);
            }
            _updateLatestValue(t, e) {
              t === this._obj &&
                ((this._latestValue = e), this._ref.markForCheck());
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                (function (t = pt.Default) {
                  const e = ho(!0);
                  if (null != e || t & pt.Optional) return e;
                  re("ChangeDetectorRef");
                })()
              );
            }),
            (t.ɵpipe = $t({ name: "async", type: t, pure: !1 })),
            t
          );
        })(),
        Dl = (() => {
          class t {}
          return (
            (t.ɵmod = Ft({ type: t })),
            (t.ɵinj = it({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [{ provide: Sl, useClass: Cl }],
            })),
            t
          );
        })(),
        Ll = (() => {
          class t {}
          return (
            (t.ɵprov = st({
              token: t,
              providedIn: "root",
              factory: () => new Hl(er(rl), window, er(hr)),
            })),
            t
          );
        })();
      class Hl {
        constructor(t, e, n) {
          (this.document = t),
            (this.window = e),
            (this.errorHandler = n),
            (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (this.supportsScrolling()) {
            const e =
              this.document.getElementById(t) ||
              this.document.getElementsByName(t)[0];
            e && this.scrollToElement(e);
          }
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const e = this.window.history;
            e && e.scrollRestoration && (e.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const e = t.getBoundingClientRect(),
            n = e.left + this.window.pageXOffset,
            r = e.top + this.window.pageYOffset,
            s = this.offset();
          this.window.scrollTo(n - s[0], r - s[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              Fl(this.window.history) ||
              Fl(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch (t) {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch (t) {
            return !1;
          }
        }
      }
      function Fl(t) {
        return Object.getOwnPropertyDescriptor(t, "scrollRestoration");
      }
      class Ml extends class extends class {} {
        constructor() {
          super();
        }
        supportsDOMEvents() {
          return !0;
        }
      } {
        static makeCurrent() {
          var t;
          (t = new Ml()), el || (el = t);
        }
        getProperty(t, e) {
          return t[e];
        }
        log(t) {
          window.console && window.console.log && window.console.log(t);
        }
        logGroup(t) {
          window.console && window.console.group && window.console.group(t);
        }
        logGroupEnd() {
          window.console &&
            window.console.groupEnd &&
            window.console.groupEnd();
        }
        onAndCancel(t, e, n) {
          return (
            t.addEventListener(e, n, !1),
            () => {
              t.removeEventListener(e, n, !1);
            }
          );
        }
        dispatchEvent(t, e) {
          t.dispatchEvent(e);
        }
        remove(t) {
          return t.parentNode && t.parentNode.removeChild(t), t;
        }
        getValue(t) {
          return t.value;
        }
        createElement(t, e) {
          return (e = e || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, e) {
          return "window" === e
            ? window
            : "document" === e
            ? t
            : "body" === e
            ? t.body
            : null;
        }
        getHistory() {
          return window.history;
        }
        getLocation() {
          return window.location;
        }
        getBaseHref(t) {
          const e =
            $l || (($l = document.querySelector("base")), $l)
              ? $l.getAttribute("href")
              : null;
          return null == e
            ? null
            : ((n = e),
              Vl || (Vl = document.createElement("a")),
              Vl.setAttribute("href", n),
              "/" === Vl.pathname.charAt(0) ? Vl.pathname : "/" + Vl.pathname);
          var n;
        }
        resetBaseElement() {
          $l = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        performanceNow() {
          return window.performance && window.performance.now
            ? window.performance.now()
            : new Date().getTime();
        }
        supportsCookies() {
          return !0;
        }
        getCookie(t) {
          return xl(document.cookie, t);
        }
      }
      let Vl,
        $l = null;
      const zl = new Ln("TRANSITION_ID"),
        ql = [
          {
            provide: ra,
            useFactory: function (t, e, n) {
              return () => {
                n.get(sa).donePromise.then(() => {
                  const n = nl();
                  Array.prototype.slice
                    .apply(e.querySelectorAll("style[ng-transition]"))
                    .filter((e) => e.getAttribute("ng-transition") === t)
                    .forEach((t) => n.remove(t));
                });
              };
            },
            deps: [zl, rl, ei],
            multi: !0,
          },
        ];
      class Bl {
        static init() {
          var t;
          (t = new Bl()), (Ua = t);
        }
        addToWindow(t) {
          (xt.getAngularTestability = (e, n = !0) => {
            const r = t.findTestabilityInTree(e, n);
            if (null == r)
              throw new Error("Could not find testability for element.");
            return r;
          }),
            (xt.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (xt.getAllAngularRootElements = () => t.getAllRootElements()),
            xt.frameworkStabilizers || (xt.frameworkStabilizers = []),
            xt.frameworkStabilizers.push((t) => {
              const e = xt.getAllAngularTestabilities();
              let n = e.length,
                r = !1;
              const s = function (e) {
                (r = r || e), n--, 0 == n && t(r);
              };
              e.forEach(function (t) {
                t.whenStable(s);
              });
            });
        }
        findTestabilityInTree(t, e, n) {
          if (null == e) return null;
          const r = t.getTestability(e);
          return null != r
            ? r
            : n
            ? nl().isShadowRoot(e)
              ? this.findTestabilityInTree(t, e.host, !0)
              : this.findTestabilityInTree(t, e.parentElement, !0)
            : null;
        }
      }
      const Wl = new Ln("EventManagerPlugins");
      let Gl = (() => {
        class t {
          constructor(t, e) {
            (this._zone = e),
              (this._eventNameToPlugin = new Map()),
              t.forEach((t) => (t.manager = this)),
              (this._plugins = t.slice().reverse());
          }
          addEventListener(t, e, n) {
            return this._findPluginFor(e).addEventListener(t, e, n);
          }
          addGlobalEventListener(t, e, n) {
            return this._findPluginFor(e).addGlobalEventListener(t, e, n);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(t) {
            const e = this._eventNameToPlugin.get(t);
            if (e) return e;
            const n = this._plugins;
            for (let r = 0; r < n.length; r++) {
              const e = n[r];
              if (e.supports(t)) return this._eventNameToPlugin.set(t, e), e;
            }
            throw new Error("No event manager plugin found for event " + t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(er(Wl), er(xa));
          }),
          (t.ɵprov = st({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Zl {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, e, n) {
          const r = nl().getGlobalEventTarget(this._doc, t);
          if (!r)
            throw new Error(`Unsupported event target ${r} for event ${e}`);
          return this.addEventListener(r, e, n);
        }
      }
      let Ql = (() => {
          class t {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(t) {
              const e = new Set();
              t.forEach((t) => {
                this._stylesSet.has(t) || (this._stylesSet.add(t), e.add(t));
              }),
                this.onStylesAdded(e);
            }
            onStylesAdded(t) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = st({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Kl = (() => {
          class t extends Ql {
            constructor(t) {
              super(),
                (this._doc = t),
                (this._hostNodes = new Set()),
                (this._styleNodes = new Set()),
                this._hostNodes.add(t.head);
            }
            _addStylesToHost(t, e) {
              t.forEach((t) => {
                const n = this._doc.createElement("style");
                (n.textContent = t), this._styleNodes.add(e.appendChild(n));
              });
            }
            addHost(t) {
              this._addStylesToHost(this._stylesSet, t), this._hostNodes.add(t);
            }
            removeHost(t) {
              this._hostNodes.delete(t);
            }
            onStylesAdded(t) {
              this._hostNodes.forEach((e) => this._addStylesToHost(t, e));
            }
            ngOnDestroy() {
              this._styleNodes.forEach((t) => nl().remove(t));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(er(rl));
            }),
            (t.ɵprov = st({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const Jl = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        Yl = /%COMP%/g;
      function Xl(t, e, n) {
        for (let r = 0; r < e.length; r++) {
          let s = e[r];
          Array.isArray(s) ? Xl(t, s, n) : ((s = s.replace(Yl, t)), n.push(s));
        }
        return n;
      }
      function tu(t) {
        return (e) => {
          if ("__ngUnwrap__" === e) return t;
          !1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      let eu = (() => {
        class t {
          constructor(t, e, n) {
            (this.eventManager = t),
              (this.sharedStylesHost = e),
              (this.appId = n),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new nu(t));
          }
          createRenderer(t, e) {
            if (!t || !e) return this.defaultRenderer;
            switch (e.encapsulation) {
              case wt.Emulated: {
                let n = this.rendererByCompId.get(e.id);
                return (
                  n ||
                    ((n = new ru(
                      this.eventManager,
                      this.sharedStylesHost,
                      e,
                      this.appId
                    )),
                    this.rendererByCompId.set(e.id, n)),
                  n.applyToHost(t),
                  n
                );
              }
              case 1:
              case wt.ShadowDom:
                return new su(this.eventManager, this.sharedStylesHost, t, e);
              default:
                if (!this.rendererByCompId.has(e.id)) {
                  const t = Xl(e.id, e.styles, []);
                  this.sharedStylesHost.addStyles(t),
                    this.rendererByCompId.set(e.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(er(Gl), er(Kl), er(ia));
          }),
          (t.ɵprov = st({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class nu {
        constructor(t) {
          (this.eventManager = t), (this.data = Object.create(null));
        }
        destroy() {}
        createElement(t, e) {
          return e
            ? document.createElementNS(Jl[e] || e, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, e) {
          t.appendChild(e);
        }
        insertBefore(t, e, n) {
          t && t.insertBefore(e, n);
        }
        removeChild(t, e) {
          t && t.removeChild(e);
        }
        selectRootElement(t, e) {
          let n = "string" == typeof t ? document.querySelector(t) : t;
          if (!n)
            throw new Error(`The selector "${t}" did not match any elements`);
          return e || (n.textContent = ""), n;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, e, n, r) {
          if (r) {
            e = r + ":" + e;
            const s = Jl[r];
            s ? t.setAttributeNS(s, e, n) : t.setAttribute(e, n);
          } else t.setAttribute(e, n);
        }
        removeAttribute(t, e, n) {
          if (n) {
            const r = Jl[n];
            r ? t.removeAttributeNS(r, e) : t.removeAttribute(`${n}:${e}`);
          } else t.removeAttribute(e);
        }
        addClass(t, e) {
          t.classList.add(e);
        }
        removeClass(t, e) {
          t.classList.remove(e);
        }
        setStyle(t, e, n, r) {
          r & (gr.DashCase | gr.Important)
            ? t.style.setProperty(e, n, r & gr.Important ? "important" : "")
            : (t.style[e] = n);
        }
        removeStyle(t, e, n) {
          n & gr.DashCase ? t.style.removeProperty(e) : (t.style[e] = "");
        }
        setProperty(t, e, n) {
          t[e] = n;
        }
        setValue(t, e) {
          t.nodeValue = e;
        }
        listen(t, e, n) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, e, tu(n))
            : this.eventManager.addEventListener(t, e, tu(n));
        }
      }
      class ru extends nu {
        constructor(t, e, n, r) {
          super(t), (this.component = n);
          const s = Xl(r + "-" + n.id, n.styles, []);
          e.addStyles(s),
            (this.contentAttr = "_ngcontent-%COMP%".replace(
              Yl,
              r + "-" + n.id
            )),
            (this.hostAttr = "_nghost-%COMP%".replace(Yl, r + "-" + n.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, e) {
          const n = super.createElement(t, e);
          return super.setAttribute(n, this.contentAttr, ""), n;
        }
      }
      class su extends nu {
        constructor(t, e, n, r) {
          super(t),
            (this.sharedStylesHost = e),
            (this.hostEl = n),
            (this.shadowRoot = n.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const s = Xl(r.id, r.styles, []);
          for (let i = 0; i < s.length; i++) {
            const t = document.createElement("style");
            (t.textContent = s[i]), this.shadowRoot.appendChild(t);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, e) {
          return super.appendChild(this.nodeOrShadowRoot(t), e);
        }
        insertBefore(t, e, n) {
          return super.insertBefore(this.nodeOrShadowRoot(t), e, n);
        }
        removeChild(t, e) {
          return super.removeChild(this.nodeOrShadowRoot(t), e);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let iu = (() => {
        class t extends Zl {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return !0;
          }
          addEventListener(t, e, n) {
            return (
              t.addEventListener(e, n, !1),
              () => this.removeEventListener(t, e, n)
            );
          }
          removeEventListener(t, e, n) {
            return t.removeEventListener(e, n);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(er(rl));
          }),
          (t.ɵprov = st({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const ou = ["alt", "control", "meta", "shift"],
        au = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        lu = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        uu = {
          alt: (t) => t.altKey,
          control: (t) => t.ctrlKey,
          meta: (t) => t.metaKey,
          shift: (t) => t.shiftKey,
        };
      let cu = (() => {
        class t extends Zl {
          constructor(t) {
            super(t);
          }
          supports(e) {
            return null != t.parseEventName(e);
          }
          addEventListener(e, n, r) {
            const s = t.parseEventName(n),
              i = t.eventCallback(s.fullKey, r, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => nl().onAndCancel(e, s.domEventName, i));
          }
          static parseEventName(e) {
            const n = e.toLowerCase().split("."),
              r = n.shift();
            if (0 === n.length || ("keydown" !== r && "keyup" !== r))
              return null;
            const s = t._normalizeKey(n.pop());
            let i = "";
            if (
              (ou.forEach((t) => {
                const e = n.indexOf(t);
                e > -1 && (n.splice(e, 1), (i += t + "."));
              }),
              (i += s),
              0 != n.length || 0 === s.length)
            )
              return null;
            const o = {};
            return (o.domEventName = r), (o.fullKey = i), o;
          }
          static getEventFullKey(t) {
            let e = "",
              n = (function (t) {
                let e = t.key;
                if (null == e) {
                  if (((e = t.keyIdentifier), null == e)) return "Unidentified";
                  e.startsWith("U+") &&
                    ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                    3 === t.location && lu.hasOwnProperty(e) && (e = lu[e]));
                }
                return au[e] || e;
              })(t);
            return (
              (n = n.toLowerCase()),
              " " === n ? (n = "space") : "." === n && (n = "dot"),
              ou.forEach((r) => {
                r != n && (0, uu[r])(t) && (e += r + ".");
              }),
              (e += n),
              e
            );
          }
          static eventCallback(e, n, r) {
            return (s) => {
              t.getEventFullKey(s) === e && r.runGuarded(() => n(s));
            };
          }
          static _normalizeKey(t) {
            switch (t) {
              case "esc":
                return "escape";
              default:
                return t;
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(er(rl));
          }),
          (t.ɵprov = st({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const hu = Va(Ya, "browser", [
          { provide: ua, useValue: "browser" },
          {
            provide: la,
            useValue: function () {
              Ml.makeCurrent(), Bl.init();
            },
            multi: !0,
          },
          {
            provide: rl,
            useFactory: function () {
              return (
                (function (t) {
                  ce = t;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        du = [
          [],
          { provide: $s, useValue: "root" },
          {
            provide: hr,
            useFactory: function () {
              return new hr();
            },
            deps: [],
          },
          { provide: Wl, useClass: iu, multi: !0, deps: [rl, xa, ua] },
          { provide: Wl, useClass: cu, multi: !0, deps: [rl] },
          [],
          { provide: eu, useClass: eu, deps: [Gl, Kl, ia] },
          { provide: $i, useExisting: eu },
          { provide: Ql, useExisting: Kl },
          { provide: Kl, useClass: Kl, deps: [rl] },
          { provide: Oa, useClass: Oa, deps: [xa] },
          { provide: Gl, useClass: Gl, deps: [Wl, xa] },
          [],
        ];
      let pu = (() => {
        class t {
          constructor(t) {
            if (t)
              throw new Error(
                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
              );
          }
          static withServerTransition(e) {
            return {
              ngModule: t,
              providers: [
                { provide: ia, useValue: e.appId },
                { provide: zl, useExisting: ia },
                ql,
              ],
            };
          }
        }
        return (
          (t.ɵmod = Ft({ type: t })),
          (t.ɵinj = it({
            factory: function (e) {
              return new (e || t)(er(t, 12));
            },
            providers: du,
            imports: [Dl, tl],
          })),
          t
        );
      })();
      function fu(...t) {
        let e = t[t.length - 1];
        return T(e) ? (t.pop(), U(t, e)) : q(t);
      }
      "undefined" != typeof window && window;
      class gu extends C {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const e = super._subscribe(t);
          return e && !e.closed && t.next(this._value), e;
        }
        getValue() {
          if (this.hasError) throw this.thrownError;
          if (this.closed) throw new _();
          return this._value;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      class mu extends f {
        notifyNext(t, e, n, r, s) {
          this.destination.next(e);
        }
        notifyError(t, e) {
          this.destination.error(t);
        }
        notifyComplete(t) {
          this.destination.complete();
        }
      }
      class yu extends f {
        constructor(t, e, n) {
          super(),
            (this.parent = t),
            (this.outerValue = e),
            (this.outerIndex = n),
            (this.index = 0);
        }
        _next(t) {
          this.parent.notifyNext(
            this.outerValue,
            t,
            this.outerIndex,
            this.index++,
            this
          );
        }
        _error(t) {
          this.parent.notifyError(t, this), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(this), this.unsubscribe();
        }
      }
      function vu(t, e, n, r, s = new yu(t, n, r)) {
        if (!s.closed) return e instanceof v ? e.subscribe(s) : N(e)(s);
      }
      const wu = {};
      class _u {
        constructor(t) {
          this.resultSelector = t;
        }
        call(t, e) {
          return e.subscribe(new bu(t, this.resultSelector));
        }
      }
      class bu extends mu {
        constructor(t, e) {
          super(t),
            (this.resultSelector = e),
            (this.active = 0),
            (this.values = []),
            (this.observables = []);
        }
        _next(t) {
          this.values.push(wu), this.observables.push(t);
        }
        _complete() {
          const t = this.observables,
            e = t.length;
          if (0 === e) this.destination.complete();
          else {
            (this.active = e), (this.toRespond = e);
            for (let n = 0; n < e; n++) this.add(vu(this, t[n], void 0, n));
          }
        }
        notifyComplete(t) {
          0 == (this.active -= 1) && this.destination.complete();
        }
        notifyNext(t, e, n) {
          const r = this.values,
            s = this.toRespond
              ? r[n] === wu
                ? --this.toRespond
                : this.toRespond
              : 0;
          (r[n] = e),
            0 === s &&
              (this.resultSelector
                ? this._tryResultSelector(r)
                : this.destination.next(r.slice()));
        }
        _tryResultSelector(t) {
          let e;
          try {
            e = this.resultSelector.apply(this, t);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      const Su = (() => {
          function t() {
            return (
              Error.call(this),
              (this.message = "no elements in sequence"),
              (this.name = "EmptyError"),
              this
            );
          }
          return (t.prototype = Object.create(Error.prototype)), t;
        })(),
        Cu = new v((t) => t.complete());
      function xu(t) {
        return t
          ? (function (t) {
              return new v((e) => t.schedule(() => e.complete()));
            })(t)
          : Cu;
      }
      function Tu(t) {
        return new v((e) => {
          let n;
          try {
            n = t();
          } catch (r) {
            return void e.error(r);
          }
          return (n ? D(n) : xu()).subscribe(e);
        });
      }
      function Eu() {
        return z(1);
      }
      function ku(t, e) {
        return function (n) {
          return n.lift(new Au(t, e));
        };
      }
      class Au {
        constructor(t, e) {
          (this.predicate = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new Ru(t, this.predicate, this.thisArg));
        }
      }
      class Ru extends f {
        constructor(t, e, n) {
          super(t), (this.predicate = e), (this.thisArg = n), (this.count = 0);
        }
        _next(t) {
          let e;
          try {
            e = this.predicate.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          e && this.destination.next(t);
        }
      }
      const Iu = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "argument out of range"),
            (this.name = "ArgumentOutOfRangeError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      function Ou(t) {
        return function (e) {
          return 0 === t ? xu() : e.lift(new Pu(t));
        };
      }
      class Pu {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new Iu();
        }
        call(t, e) {
          return e.subscribe(new ju(t, this.total));
        }
      }
      class ju extends f {
        constructor(t, e) {
          super(t),
            (this.total = e),
            (this.ring = new Array()),
            (this.count = 0);
        }
        _next(t) {
          const e = this.ring,
            n = this.total,
            r = this.count++;
          e.length < n ? e.push(t) : (e[r % n] = t);
        }
        _complete() {
          const t = this.destination;
          let e = this.count;
          if (e > 0) {
            const n = this.count >= this.total ? this.total : this.count,
              r = this.ring;
            for (let s = 0; s < n; s++) {
              const s = e++ % n;
              t.next(r[s]);
            }
          }
          t.complete();
        }
      }
      function Nu(t = Lu) {
        return (e) => e.lift(new Uu(t));
      }
      class Uu {
        constructor(t) {
          this.errorFactory = t;
        }
        call(t, e) {
          return e.subscribe(new Du(t, this.errorFactory));
        }
      }
      class Du extends f {
        constructor(t, e) {
          super(t), (this.errorFactory = e), (this.hasValue = !1);
        }
        _next(t) {
          (this.hasValue = !0), this.destination.next(t);
        }
        _complete() {
          if (this.hasValue) return this.destination.complete();
          {
            let e;
            try {
              e = this.errorFactory();
            } catch (t) {
              e = t;
            }
            this.destination.error(e);
          }
        }
      }
      function Lu() {
        return new Su();
      }
      function Hu(t = null) {
        return (e) => e.lift(new Fu(t));
      }
      class Fu {
        constructor(t) {
          this.defaultValue = t;
        }
        call(t, e) {
          return e.subscribe(new Mu(t, this.defaultValue));
        }
      }
      class Mu extends f {
        constructor(t, e) {
          super(t), (this.defaultValue = e), (this.isEmpty = !0);
        }
        _next(t) {
          (this.isEmpty = !1), this.destination.next(t);
        }
        _complete() {
          this.isEmpty && this.destination.next(this.defaultValue),
            this.destination.complete();
        }
      }
      function Vu(t, e) {
        return "function" == typeof e
          ? (n) =>
              n.pipe(Vu((n, r) => D(t(n, r)).pipe(E((t, s) => e(n, t, r, s)))))
          : (e) => e.lift(new $u(t));
      }
      class $u {
        constructor(t) {
          this.project = t;
        }
        call(t, e) {
          return e.subscribe(new zu(t, this.project));
        }
      }
      class zu extends H {
        constructor(t, e) {
          super(t), (this.project = e), (this.index = 0);
        }
        _next(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (r) {
            return void this.destination.error(r);
          }
          this._innerSub(e);
        }
        _innerSub(t) {
          const e = this.innerSubscription;
          e && e.unsubscribe();
          const n = new L(this),
            r = this.destination;
          r.add(n),
            (this.innerSubscription = F(t, n)),
            this.innerSubscription !== n && r.add(this.innerSubscription);
        }
        _complete() {
          const { innerSubscription: t } = this;
          (t && !t.closed) || super._complete(), this.unsubscribe();
        }
        _unsubscribe() {
          this.innerSubscription = void 0;
        }
        notifyComplete() {
          (this.innerSubscription = void 0),
            this.isStopped && super._complete();
        }
        notifyNext(t) {
          this.destination.next(t);
        }
      }
      function qu(t) {
        return (e) => (0 === t ? xu() : e.lift(new Bu(t)));
      }
      class Bu {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new Iu();
        }
        call(t, e) {
          return e.subscribe(new Wu(t, this.total));
        }
      }
      class Wu extends f {
        constructor(t, e) {
          super(t), (this.total = e), (this.count = 0);
        }
        _next(t) {
          const e = this.total,
            n = ++this.count;
          n <= e &&
            (this.destination.next(t),
            n === e && (this.destination.complete(), this.unsubscribe()));
        }
      }
      function Gu(...t) {
        return Eu()(fu(...t));
      }
      class Zu {
        constructor(t, e, n = !1) {
          (this.accumulator = t), (this.seed = e), (this.hasSeed = n);
        }
        call(t, e) {
          return e.subscribe(
            new Qu(t, this.accumulator, this.seed, this.hasSeed)
          );
        }
      }
      class Qu extends f {
        constructor(t, e, n, r) {
          super(t),
            (this.accumulator = e),
            (this._seed = n),
            (this.hasSeed = r),
            (this.index = 0);
        }
        get seed() {
          return this._seed;
        }
        set seed(t) {
          (this.hasSeed = !0), (this._seed = t);
        }
        _next(t) {
          if (this.hasSeed) return this._tryNext(t);
          (this.seed = t), this.destination.next(t);
        }
        _tryNext(t) {
          const e = this.index++;
          let n;
          try {
            n = this.accumulator(this.seed, t, e);
          } catch (r) {
            this.destination.error(r);
          }
          (this.seed = n), this.destination.next(n);
        }
      }
      function Ku(t) {
        return function (e) {
          const n = new Ju(t),
            r = e.lift(n);
          return (n.caught = r);
        };
      }
      class Ju {
        constructor(t) {
          this.selector = t;
        }
        call(t, e) {
          return e.subscribe(new Yu(t, this.selector, this.caught));
        }
      }
      class Yu extends H {
        constructor(t, e, n) {
          super(t), (this.selector = e), (this.caught = n);
        }
        error(t) {
          if (!this.isStopped) {
            let n;
            try {
              n = this.selector(t, this.caught);
            } catch (e) {
              return void super.error(e);
            }
            this._unsubscribeAndRecycle();
            const r = new L(this);
            this.add(r);
            const s = F(n, r);
            s !== r && this.add(s);
          }
        }
      }
      function Xu(t, e) {
        return M(t, e, 1);
      }
      function tc(t, e) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            t ? ku((e, n) => t(e, n, r)) : y,
            qu(1),
            n ? Hu(e) : Nu(() => new Su())
          );
      }
      function ec() {}
      function nc(t, e, n) {
        return function (r) {
          return r.lift(new rc(t, e, n));
        };
      }
      class rc {
        constructor(t, e, n) {
          (this.nextOrObserver = t), (this.error = e), (this.complete = n);
        }
        call(t, e) {
          return e.subscribe(
            new sc(t, this.nextOrObserver, this.error, this.complete)
          );
        }
      }
      class sc extends f {
        constructor(t, e, n, s) {
          super(t),
            (this._tapNext = ec),
            (this._tapError = ec),
            (this._tapComplete = ec),
            (this._tapError = n || ec),
            (this._tapComplete = s || ec),
            r(e)
              ? ((this._context = this), (this._tapNext = e))
              : e &&
                ((this._context = e),
                (this._tapNext = e.next || ec),
                (this._tapError = e.error || ec),
                (this._tapComplete = e.complete || ec));
        }
        _next(t) {
          try {
            this._tapNext.call(this._context, t);
          } catch (e) {
            return void this.destination.error(e);
          }
          this.destination.next(t);
        }
        _error(t) {
          try {
            this._tapError.call(this._context, t);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.destination.error(t);
        }
        _complete() {
          try {
            this._tapComplete.call(this._context);
          } catch (t) {
            return void this.destination.error(t);
          }
          return this.destination.complete();
        }
      }
      class ic {
        constructor(t) {
          this.callback = t;
        }
        call(t, e) {
          return e.subscribe(new oc(t, this.callback));
        }
      }
      class oc extends f {
        constructor(t, e) {
          super(t), this.add(new h(e));
        }
      }
      class ac {
        constructor(t, e) {
          (this.id = t), (this.url = e);
        }
      }
      class lc extends ac {
        constructor(t, e, n = "imperative", r = null) {
          super(t, e), (this.navigationTrigger = n), (this.restoredState = r);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class uc extends ac {
        constructor(t, e, n) {
          super(t, e), (this.urlAfterRedirects = n);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class cc extends ac {
        constructor(t, e, n) {
          super(t, e), (this.reason = n);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class hc extends ac {
        constructor(t, e, n) {
          super(t, e), (this.error = n);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class dc extends ac {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class pc extends ac {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class fc extends ac {
        constructor(t, e, n, r, s) {
          super(t, e),
            (this.urlAfterRedirects = n),
            (this.state = r),
            (this.shouldActivate = s);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class gc extends ac {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class mc extends ac {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class yc {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class vc {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class wc {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class _c {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class bc {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Sc {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class Cc {
        constructor(t, e, n) {
          (this.routerEvent = t), (this.position = e), (this.anchor = n);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      const xc = "primary";
      class Tc {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e[0] : e;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e : [e];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Ec(t) {
        return new Tc(t);
      }
      function kc(t) {
        const e = Error("NavigationCancelingError: " + t);
        return (e.ngNavigationCancelingError = !0), e;
      }
      function Ac(t, e, n) {
        const r = n.path.split("/");
        if (r.length > t.length) return null;
        if ("full" === n.pathMatch && (e.hasChildren() || r.length < t.length))
          return null;
        const s = {};
        for (let i = 0; i < r.length; i++) {
          const e = r[i],
            n = t[i];
          if (e.startsWith(":")) s[e.substring(1)] = n;
          else if (e !== n.path) return null;
        }
        return { consumed: t.slice(0, r.length), posParams: s };
      }
      function Rc(t, e) {
        const n = Object.keys(t),
          r = Object.keys(e);
        if (!n || !r || n.length != r.length) return !1;
        let s;
        for (let i = 0; i < n.length; i++)
          if (((s = n[i]), !Ic(t[s], e[s]))) return !1;
        return !0;
      }
      function Ic(t, e) {
        if (Array.isArray(t) && Array.isArray(e)) {
          if (t.length !== e.length) return !1;
          const n = [...t].sort(),
            r = [...e].sort();
          return n.every((t, e) => r[e] === t);
        }
        return t === e;
      }
      function Oc(t) {
        return Array.prototype.concat.apply([], t);
      }
      function Pc(t) {
        return t.length > 0 ? t[t.length - 1] : null;
      }
      function jc(t, e) {
        for (const n in t) t.hasOwnProperty(n) && e(t[n], n);
      }
      function Nc(t) {
        return vi(t) ? t : yi(t) ? D(Promise.resolve(t)) : fu(t);
      }
      function Uc(t, e, n) {
        return n
          ? (function (t, e) {
              return Rc(t, e);
            })(t.queryParams, e.queryParams) && Dc(t.root, e.root)
          : (function (t, e) {
              return (
                Object.keys(e).length <= Object.keys(t).length &&
                Object.keys(e).every((n) => Ic(t[n], e[n]))
              );
            })(t.queryParams, e.queryParams) && Lc(t.root, e.root);
      }
      function Dc(t, e) {
        if (!$c(t.segments, e.segments)) return !1;
        if (t.numberOfChildren !== e.numberOfChildren) return !1;
        for (const n in e.children) {
          if (!t.children[n]) return !1;
          if (!Dc(t.children[n], e.children[n])) return !1;
        }
        return !0;
      }
      function Lc(t, e) {
        return Hc(t, e, e.segments);
      }
      function Hc(t, e, n) {
        if (t.segments.length > n.length)
          return !!$c(t.segments.slice(0, n.length), n) && !e.hasChildren();
        if (t.segments.length === n.length) {
          if (!$c(t.segments, n)) return !1;
          for (const n in e.children) {
            if (!t.children[n]) return !1;
            if (!Lc(t.children[n], e.children[n])) return !1;
          }
          return !0;
        }
        {
          const r = n.slice(0, t.segments.length),
            s = n.slice(t.segments.length);
          return (
            !!$c(t.segments, r) &&
            !!t.children.primary &&
            Hc(t.children.primary, e, s)
          );
        }
      }
      class Fc {
        constructor(t, e, n) {
          (this.root = t), (this.queryParams = e), (this.fragment = n);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Ec(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return Wc.serialize(this);
        }
      }
      class Mc {
        constructor(t, e) {
          (this.segments = t),
            (this.children = e),
            (this.parent = null),
            jc(e, (t, e) => (t.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Gc(this);
        }
      }
      class Vc {
        constructor(t, e) {
          (this.path = t), (this.parameters = e);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Ec(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return th(this);
        }
      }
      function $c(t, e) {
        return t.length === e.length && t.every((t, n) => t.path === e[n].path);
      }
      function zc(t, e) {
        let n = [];
        return (
          jc(t.children, (t, r) => {
            r === xc && (n = n.concat(e(t, r)));
          }),
          jc(t.children, (t, r) => {
            r !== xc && (n = n.concat(e(t, r)));
          }),
          n
        );
      }
      class qc {}
      class Bc {
        parse(t) {
          const e = new ih(t);
          return new Fc(
            e.parseRootSegment(),
            e.parseQueryParams(),
            e.parseFragment()
          );
        }
        serialize(t) {
          return `${"/" + Zc(t.root, !0)}${(function (t) {
            const e = Object.keys(t).map((e) => {
              const n = t[e];
              return Array.isArray(n)
                ? n.map((t) => `${Kc(e)}=${Kc(t)}`).join("&")
                : `${Kc(e)}=${Kc(n)}`;
            });
            return e.length ? "?" + e.join("&") : "";
          })(t.queryParams)}${
            "string" == typeof t.fragment ? "#" + encodeURI(t.fragment) : ""
          }`;
        }
      }
      const Wc = new Bc();
      function Gc(t) {
        return t.segments.map((t) => th(t)).join("/");
      }
      function Zc(t, e) {
        if (!t.hasChildren()) return Gc(t);
        if (e) {
          const e = t.children.primary ? Zc(t.children.primary, !1) : "",
            n = [];
          return (
            jc(t.children, (t, e) => {
              e !== xc && n.push(`${e}:${Zc(t, !1)}`);
            }),
            n.length > 0 ? `${e}(${n.join("//")})` : e
          );
        }
        {
          const e = zc(t, (e, n) =>
            n === xc ? [Zc(t.children.primary, !1)] : [`${n}:${Zc(e, !1)}`]
          );
          return 1 === Object.keys(t.children).length &&
            null != t.children.primary
            ? `${Gc(t)}/${e[0]}`
            : `${Gc(t)}/(${e.join("//")})`;
        }
      }
      function Qc(t) {
        return encodeURIComponent(t)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Kc(t) {
        return Qc(t).replace(/%3B/gi, ";");
      }
      function Jc(t) {
        return Qc(t)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Yc(t) {
        return decodeURIComponent(t);
      }
      function Xc(t) {
        return Yc(t.replace(/\+/g, "%20"));
      }
      function th(t) {
        return `${Jc(t.path)}${
          ((e = t.parameters),
          Object.keys(e)
            .map((t) => `;${Jc(t)}=${Jc(e[t])}`)
            .join(""))
        }`;
        var e;
      }
      const eh = /^[^\/()?;=#]+/;
      function nh(t) {
        const e = t.match(eh);
        return e ? e[0] : "";
      }
      const rh = /^[^=?&#]+/,
        sh = /^[^?&#]+/;
      class ih {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new Mc([], {})
              : new Mc([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let e = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (e = this.parseParens(!0)));
          let n = {};
          return (
            this.peekStartsWith("(") && (n = this.parseParens(!1)),
            (t.length > 0 || Object.keys(e).length > 0) &&
              (n.primary = new Mc(t, e)),
            n
          );
        }
        parseSegment() {
          const t = nh(this.remaining);
          if ("" === t && this.peekStartsWith(";"))
            throw new Error(
              `Empty path url segment cannot have parameters: '${this.remaining}'.`
            );
          return this.capture(t), new Vc(Yc(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const e = nh(this.remaining);
          if (!e) return;
          this.capture(e);
          let n = "";
          if (this.consumeOptional("=")) {
            const t = nh(this.remaining);
            t && ((n = t), this.capture(n));
          }
          t[Yc(e)] = Yc(n);
        }
        parseQueryParam(t) {
          const e = (function (t) {
            const e = t.match(rh);
            return e ? e[0] : "";
          })(this.remaining);
          if (!e) return;
          this.capture(e);
          let n = "";
          if (this.consumeOptional("=")) {
            const t = (function (t) {
              const e = t.match(sh);
              return e ? e[0] : "";
            })(this.remaining);
            t && ((n = t), this.capture(n));
          }
          const r = Xc(e),
            s = Xc(n);
          if (t.hasOwnProperty(r)) {
            let e = t[r];
            Array.isArray(e) || ((e = [e]), (t[r] = e)), e.push(s);
          } else t[r] = s;
        }
        parseParens(t) {
          const e = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const n = nh(this.remaining),
              r = this.remaining[n.length];
            if ("/" !== r && ")" !== r && ";" !== r)
              throw new Error(`Cannot parse url '${this.url}'`);
            let s = void 0;
            n.indexOf(":") > -1
              ? ((s = n.substr(0, n.indexOf(":"))),
                this.capture(s),
                this.capture(":"))
              : t && (s = xc);
            const i = this.parseChildren();
            (e[s] = 1 === Object.keys(i).length ? i.primary : new Mc([], i)),
              this.consumeOptional("//");
          }
          return e;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new Error(`Expected "${t}".`);
        }
      }
      class oh {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const e = this.pathFromRoot(t);
          return e.length > 1 ? e[e.length - 2] : null;
        }
        children(t) {
          const e = ah(t, this._root);
          return e ? e.children.map((t) => t.value) : [];
        }
        firstChild(t) {
          const e = ah(t, this._root);
          return e && e.children.length > 0 ? e.children[0].value : null;
        }
        siblings(t) {
          const e = lh(t, this._root);
          return e.length < 2
            ? []
            : e[e.length - 2].children
                .map((t) => t.value)
                .filter((e) => e !== t);
        }
        pathFromRoot(t) {
          return lh(t, this._root).map((t) => t.value);
        }
      }
      function ah(t, e) {
        if (t === e.value) return e;
        for (const n of e.children) {
          const e = ah(t, n);
          if (e) return e;
        }
        return null;
      }
      function lh(t, e) {
        if (t === e.value) return [e];
        for (const n of e.children) {
          const r = lh(t, n);
          if (r.length) return r.unshift(e), r;
        }
        return [];
      }
      class uh {
        constructor(t, e) {
          (this.value = t), (this.children = e);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function ch(t) {
        const e = {};
        return t && t.children.forEach((t) => (e[t.value.outlet] = t)), e;
      }
      class hh extends oh {
        constructor(t, e) {
          super(t), (this.snapshot = e), yh(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function dh(t, e) {
        const n = (function (t, e) {
            const n = new gh([], {}, {}, "", {}, xc, e, null, t.root, -1, {});
            return new mh("", new uh(n, []));
          })(t, e),
          r = new gu([new Vc("", {})]),
          s = new gu({}),
          i = new gu({}),
          o = new gu({}),
          a = new gu(""),
          l = new ph(r, s, o, a, i, xc, e, n.root);
        return (l.snapshot = n.root), new hh(new uh(l, []), n);
      }
      class ph {
        constructor(t, e, n, r, s, i, o, a) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = i),
            (this.component = o),
            (this._futureSnapshot = a);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(E((t) => Ec(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(E((t) => Ec(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function fh(t, e = "emptyOnly") {
        const n = t.pathFromRoot;
        let r = 0;
        if ("always" !== e)
          for (r = n.length - 1; r >= 1; ) {
            const t = n[r],
              e = n[r - 1];
            if (t.routeConfig && "" === t.routeConfig.path) r--;
            else {
              if (e.component) break;
              r--;
            }
          }
        return (function (t) {
          return t.reduce(
            (t, e) => ({
              params: Object.assign(Object.assign({}, t.params), e.params),
              data: Object.assign(Object.assign({}, t.data), e.data),
              resolve: Object.assign(
                Object.assign({}, t.resolve),
                e._resolvedData
              ),
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class gh {
        constructor(t, e, n, r, s, i, o, a, l, u, c) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = i),
            (this.component = o),
            (this.routeConfig = a),
            (this._urlSegment = l),
            (this._lastPathIndex = u),
            (this._resolve = c);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = Ec(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Ec(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((t) => t.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class mh extends oh {
        constructor(t, e) {
          super(e), (this.url = t), yh(this, e);
        }
        toString() {
          return vh(this._root);
        }
      }
      function yh(t, e) {
        (e.value._routerState = t), e.children.forEach((e) => yh(t, e));
      }
      function vh(t) {
        const e =
          t.children.length > 0 ? ` { ${t.children.map(vh).join(", ")} } ` : "";
        return `${t.value}${e}`;
      }
      function wh(t) {
        if (t.snapshot) {
          const e = t.snapshot,
            n = t._futureSnapshot;
          (t.snapshot = n),
            Rc(e.queryParams, n.queryParams) ||
              t.queryParams.next(n.queryParams),
            e.fragment !== n.fragment && t.fragment.next(n.fragment),
            Rc(e.params, n.params) || t.params.next(n.params),
            (function (t, e) {
              if (t.length !== e.length) return !1;
              for (let n = 0; n < t.length; ++n) if (!Rc(t[n], e[n])) return !1;
              return !0;
            })(e.url, n.url) || t.url.next(n.url),
            Rc(e.data, n.data) || t.data.next(n.data);
        } else
          (t.snapshot = t._futureSnapshot), t.data.next(t._futureSnapshot.data);
      }
      function _h(t, e) {
        var n, r;
        return (
          Rc(t.params, e.params) &&
          $c((n = t.url), (r = e.url)) &&
          n.every((t, e) => Rc(t.parameters, r[e].parameters)) &&
          !(!t.parent != !e.parent) &&
          (!t.parent || _h(t.parent, e.parent))
        );
      }
      function bh(t, e, n) {
        if (n && t.shouldReuseRoute(e.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = e.value;
          const s = (function (t, e, n) {
            return e.children.map((e) => {
              for (const r of n.children)
                if (t.shouldReuseRoute(e.value, r.value.snapshot))
                  return bh(t, e, r);
              return bh(t, e);
            });
          })(t, e, n);
          return new uh(r, s);
        }
        {
          const n = t.retrieve(e.value);
          if (n) {
            const t = n.route;
            return Sh(e, t), t;
          }
          {
            const n = new ph(
                new gu((r = e.value).url),
                new gu(r.params),
                new gu(r.queryParams),
                new gu(r.fragment),
                new gu(r.data),
                r.outlet,
                r.component,
                r
              ),
              s = e.children.map((e) => bh(t, e));
            return new uh(n, s);
          }
        }
        var r;
      }
      function Sh(t, e) {
        if (t.value.routeConfig !== e.value.routeConfig)
          throw new Error(
            "Cannot reattach ActivatedRouteSnapshot created from a different route"
          );
        if (t.children.length !== e.children.length)
          throw new Error(
            "Cannot reattach ActivatedRouteSnapshot with a different number of children"
          );
        e.value._futureSnapshot = t.value;
        for (let n = 0; n < t.children.length; ++n)
          Sh(t.children[n], e.children[n]);
      }
      function Ch(t) {
        return (
          "object" == typeof t && null != t && !t.outlets && !t.segmentPath
        );
      }
      function xh(t) {
        return "object" == typeof t && null != t && t.outlets;
      }
      function Th(t, e, n, r, s) {
        let i = {};
        return (
          r &&
            jc(r, (t, e) => {
              i[e] = Array.isArray(t) ? t.map((t) => "" + t) : "" + t;
            }),
          new Fc(n.root === t ? e : Eh(n.root, t, e), i, s)
        );
      }
      function Eh(t, e, n) {
        const r = {};
        return (
          jc(t.children, (t, s) => {
            r[s] = t === e ? n : Eh(t, e, n);
          }),
          new Mc(t.segments, r)
        );
      }
      class kh {
        constructor(t, e, n) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = e),
            (this.commands = n),
            t && n.length > 0 && Ch(n[0]))
          )
            throw new Error("Root segment cannot have matrix parameters");
          const r = n.find(xh);
          if (r && r !== Pc(n))
            throw new Error("{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Ah {
        constructor(t, e, n) {
          (this.segmentGroup = t), (this.processChildren = e), (this.index = n);
        }
      }
      function Rh(t, e, n) {
        if (
          (t || (t = new Mc([], {})),
          0 === t.segments.length && t.hasChildren())
        )
          return Ih(t, e, n);
        const r = (function (t, e, n) {
            let r = 0,
              s = e;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; s < t.segments.length; ) {
              if (r >= n.length) return i;
              const e = t.segments[s],
                o = n[r];
              if (xh(o)) break;
              const a = "" + o,
                l = r < n.length - 1 ? n[r + 1] : null;
              if (s > 0 && void 0 === a) break;
              if (a && l && "object" == typeof l && void 0 === l.outlets) {
                if (!Nh(a, l, e)) return i;
                r += 2;
              } else {
                if (!Nh(a, {}, e)) return i;
                r++;
              }
              s++;
            }
            return { match: !0, pathIndex: s, commandIndex: r };
          })(t, e, n),
          s = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < t.segments.length) {
          const e = new Mc(t.segments.slice(0, r.pathIndex), {});
          return (
            (e.children.primary = new Mc(
              t.segments.slice(r.pathIndex),
              t.children
            )),
            Ih(e, 0, s)
          );
        }
        return r.match && 0 === s.length
          ? new Mc(t.segments, {})
          : r.match && !t.hasChildren()
          ? Oh(t, e, n)
          : r.match
          ? Ih(t, 0, s)
          : Oh(t, e, n);
      }
      function Ih(t, e, n) {
        if (0 === n.length) return new Mc(t.segments, {});
        {
          const r = (function (t) {
              return xh(t[0]) ? t[0].outlets : { [xc]: t };
            })(n),
            s = {};
          return (
            jc(r, (n, r) => {
              "string" == typeof n && (n = [n]),
                null !== n && (s[r] = Rh(t.children[r], e, n));
            }),
            jc(t.children, (t, e) => {
              void 0 === r[e] && (s[e] = t);
            }),
            new Mc(t.segments, s)
          );
        }
      }
      function Oh(t, e, n) {
        const r = t.segments.slice(0, e);
        let s = 0;
        for (; s < n.length; ) {
          const i = n[s];
          if (xh(i)) {
            const t = Ph(i.outlets);
            return new Mc(r, t);
          }
          if (0 === s && Ch(n[0])) {
            r.push(new Vc(t.segments[e].path, n[0])), s++;
            continue;
          }
          const o = xh(i) ? i.outlets.primary : "" + i,
            a = s < n.length - 1 ? n[s + 1] : null;
          o && a && Ch(a)
            ? (r.push(new Vc(o, jh(a))), (s += 2))
            : (r.push(new Vc(o, {})), s++);
        }
        return new Mc(r, {});
      }
      function Ph(t) {
        const e = {};
        return (
          jc(t, (t, n) => {
            "string" == typeof t && (t = [t]),
              null !== t && (e[n] = Oh(new Mc([], {}), 0, t));
          }),
          e
        );
      }
      function jh(t) {
        const e = {};
        return jc(t, (t, n) => (e[n] = "" + t)), e;
      }
      function Nh(t, e, n) {
        return t == n.path && Rc(e, n.parameters);
      }
      class Uh {
        constructor(t, e, n, r) {
          (this.routeReuseStrategy = t),
            (this.futureState = e),
            (this.currState = n),
            (this.forwardEvent = r);
        }
        activate(t) {
          const e = this.futureState._root,
            n = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(e, n, t),
            wh(this.futureState.root),
            this.activateChildRoutes(e, n, t);
        }
        deactivateChildRoutes(t, e, n) {
          const r = ch(e);
          t.children.forEach((t) => {
            const e = t.value.outlet;
            this.deactivateRoutes(t, r[e], n), delete r[e];
          }),
            jc(r, (t, e) => {
              this.deactivateRouteAndItsChildren(t, n);
            });
        }
        deactivateRoutes(t, e, n) {
          const r = t.value,
            s = e ? e.value : null;
          if (r === s)
            if (r.component) {
              const s = n.getContext(r.outlet);
              s && this.deactivateChildRoutes(t, e, s.children);
            } else this.deactivateChildRoutes(t, e, n);
          else s && this.deactivateRouteAndItsChildren(e, n);
        }
        deactivateRouteAndItsChildren(t, e) {
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, e)
            : this.deactivateRouteAndOutlet(t, e);
        }
        detachAndStoreRouteSubtree(t, e) {
          const n = e.getContext(t.value.outlet);
          if (n && n.outlet) {
            const e = n.outlet.detach(),
              r = n.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: e,
              route: t,
              contexts: r,
            });
          }
        }
        deactivateRouteAndOutlet(t, e) {
          const n = e.getContext(t.value.outlet);
          if (n) {
            const r = ch(t),
              s = t.value.component ? n.children : e;
            jc(r, (t, e) => this.deactivateRouteAndItsChildren(t, s)),
              n.outlet &&
                (n.outlet.deactivate(), n.children.onOutletDeactivated());
          }
        }
        activateChildRoutes(t, e, n) {
          const r = ch(e);
          t.children.forEach((t) => {
            this.activateRoutes(t, r[t.value.outlet], n),
              this.forwardEvent(new Sc(t.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new _c(t.value.snapshot));
        }
        activateRoutes(t, e, n) {
          const r = t.value,
            s = e ? e.value : null;
          if ((wh(r), r === s))
            if (r.component) {
              const s = n.getOrCreateContext(r.outlet);
              this.activateChildRoutes(t, e, s.children);
            } else this.activateChildRoutes(t, e, n);
          else if (r.component) {
            const e = n.getOrCreateContext(r.outlet);
            if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
              const t = this.routeReuseStrategy.retrieve(r.snapshot);
              this.routeReuseStrategy.store(r.snapshot, null),
                e.children.onOutletReAttached(t.contexts),
                (e.attachRef = t.componentRef),
                (e.route = t.route.value),
                e.outlet && e.outlet.attach(t.componentRef, t.route.value),
                Dh(t.route);
            } else {
              const n = (function (t) {
                  for (let e = t.parent; e; e = e.parent) {
                    const t = e.routeConfig;
                    if (t && t._loadedConfig) return t._loadedConfig;
                    if (t && t.component) return null;
                  }
                  return null;
                })(r.snapshot),
                s = n ? n.module.componentFactoryResolver : null;
              (e.attachRef = null),
                (e.route = r),
                (e.resolver = s),
                e.outlet && e.outlet.activateWith(r, s),
                this.activateChildRoutes(t, null, e.children);
            }
          } else this.activateChildRoutes(t, null, n);
        }
      }
      function Dh(t) {
        wh(t.value), t.children.forEach(Dh);
      }
      class Lh {
        constructor(t, e) {
          (this.routes = t), (this.module = e);
        }
      }
      function Hh(t) {
        return "function" == typeof t;
      }
      function Fh(t) {
        return t instanceof Fc;
      }
      const Mh = Symbol("INITIAL_VALUE");
      function Vh() {
        return Vu((t) =>
          (function (...t) {
            let e = void 0,
              n = void 0;
            return (
              T(t[t.length - 1]) && (n = t.pop()),
              "function" == typeof t[t.length - 1] && (e = t.pop()),
              1 === t.length && l(t[0]) && (t = t[0]),
              q(t, n).lift(new _u(e))
            );
          })(
            ...t.map((t) =>
              t.pipe(
                qu(1),
                (function (...t) {
                  const e = t[t.length - 1];
                  return T(e) ? (t.pop(), (n) => Gu(t, n, e)) : (e) => Gu(t, e);
                })(Mh)
              )
            )
          ).pipe(
            (function (t, e) {
              let n = !1;
              return (
                arguments.length >= 2 && (n = !0),
                function (r) {
                  return r.lift(new Zu(t, e, n));
                }
              );
            })((t, e) => {
              let n = !1;
              return e.reduce((t, r, s) => {
                if (t !== Mh) return t;
                if ((r === Mh && (n = !0), !n)) {
                  if (!1 === r) return r;
                  if (s === e.length - 1 || Fh(r)) return r;
                }
                return t;
              }, t);
            }, Mh),
            ku((t) => t !== Mh),
            E((t) => (Fh(t) ? t : !0 === t)),
            qu(1)
          )
        );
      }
      let $h = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = Ut({
            type: t,
            selectors: [["ng-component"]],
            decls: 1,
            vars: 0,
            template: function (t, e) {
              1 & t && mi(0, "router-outlet");
            },
            directives: function () {
              return [Dd];
            },
            encapsulation: 2,
          })),
          t
        );
      })();
      function zh(t, e = "") {
        for (let n = 0; n < t.length; n++) {
          const r = t[n];
          qh(r, Bh(e, r));
        }
      }
      function qh(t, e) {
        t.children && zh(t.children, e);
      }
      function Bh(t, e) {
        return e
          ? t || e.path
            ? t && !e.path
              ? t + "/"
              : !t && e.path
              ? e.path
              : `${t}/${e.path}`
            : ""
          : t;
      }
      function Wh(t) {
        const e = t.children && t.children.map(Wh),
          n = e
            ? Object.assign(Object.assign({}, t), { children: e })
            : Object.assign({}, t);
        return (
          !n.component &&
            (e || n.loadChildren) &&
            n.outlet &&
            n.outlet !== xc &&
            (n.component = $h),
          n
        );
      }
      function Gh(t) {
        return t.outlet || xc;
      }
      class Zh {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class Qh {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function Kh(t) {
        return new v((e) => e.error(new Zh(t)));
      }
      function Jh(t) {
        return new v((e) => e.error(new Qh(t)));
      }
      function Yh(t) {
        return new v((e) =>
          e.error(
            new Error(
              `Only absolute redirects can have named outlets. redirectTo: '${t}'`
            )
          )
        );
      }
      class Xh {
        constructor(t, e, n, r, s) {
          (this.configLoader = e),
            (this.urlSerializer = n),
            (this.urlTree = r),
            (this.config = s),
            (this.allowRedirects = !0),
            (this.ngModule = t.get(bo));
        }
        apply() {
          return this.expandSegmentGroup(
            this.ngModule,
            this.config,
            this.urlTree.root,
            xc
          )
            .pipe(
              E((t) =>
                this.createUrlTree(
                  t,
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              Ku((t) => {
                if (t instanceof Qh)
                  return (this.allowRedirects = !1), this.match(t.urlTree);
                if (t instanceof Zh) throw this.noMatchError(t);
                throw t;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.ngModule, this.config, t.root, xc)
            .pipe(E((e) => this.createUrlTree(e, t.queryParams, t.fragment)))
            .pipe(
              Ku((t) => {
                if (t instanceof Zh) throw this.noMatchError(t);
                throw t;
              })
            );
        }
        noMatchError(t) {
          return new Error(
            `Cannot match any routes. URL Segment: '${t.segmentGroup}'`
          );
        }
        createUrlTree(t, e, n) {
          const r = t.segments.length > 0 ? new Mc([], { [xc]: t }) : t;
          return new Fc(r, e, n);
        }
        expandSegmentGroup(t, e, n, r) {
          return 0 === n.segments.length && n.hasChildren()
            ? this.expandChildren(t, e, n).pipe(E((t) => new Mc([], t)))
            : this.expandSegment(t, n, e, n.segments, r, !0);
        }
        expandChildren(t, e, n) {
          return (function (t, e) {
            if (0 === Object.keys(t).length) return fu({});
            const n = [],
              r = [],
              s = {};
            return (
              jc(t, (t, i) => {
                const o = e(i, t).pipe(E((t) => (s[i] = t)));
                i === xc ? n.push(o) : r.push(o);
              }),
              fu.apply(null, n.concat(r)).pipe(
                Eu(),
                (function (t, e) {
                  const n = arguments.length >= 2;
                  return (r) =>
                    r.pipe(
                      t ? ku((e, n) => t(e, n, r)) : y,
                      Ou(1),
                      n ? Hu(e) : Nu(() => new Su())
                    );
                })(),
                E(() => s)
              )
            );
          })(n.children, (n, r) => this.expandSegmentGroup(t, e, r, n));
        }
        expandSegment(t, e, n, r, s, i) {
          const o = (function (t) {
            return t.reduce((t, e) => {
              const n = Gh(e);
              return t.has(n) ? t.get(n).push(e) : t.set(n, [e]), t;
            }, new Map());
          })(n);
          o.has(s) || o.set(s, []);
          const a = (n) =>
            D(n).pipe(
              Xu((o) =>
                this.expandSegmentAgainstRoute(t, e, n, o, r, s, i).pipe(
                  Ku((t) => {
                    if (t instanceof Zh) return fu(null);
                    throw t;
                  })
                )
              ),
              tc((t) => null !== t),
              Ku((t) => {
                if (t instanceof Su || "EmptyError" === t.name) {
                  if (this.noLeftoversInUrl(e, r, s)) return fu(new Mc([], {}));
                  throw new Zh(e);
                }
                throw t;
              })
            );
          return D(
            Array.from(o.entries()).map(([t, e]) => {
              const n = a(e);
              return t === s
                ? n
                : n.pipe(
                    E(() => null),
                    Ku(() => fu(null))
                  );
            })
          ).pipe(
            (t) => t.lift(new _u(void 0)),
            tc(),
            E((t) => t.find((t) => null !== t))
          );
        }
        noLeftoversInUrl(t, e, n) {
          return 0 === e.length && !t.children[n];
        }
        expandSegmentAgainstRoute(t, e, n, r, s, i, o) {
          return Gh(r) !== i && "" !== r.path
            ? Kh(e)
            : void 0 === r.redirectTo
            ? this.matchSegmentAgainstRoute(t, e, r, s)
            : o && this.allowRedirects
            ? this.expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i)
            : Kh(e);
        }
        expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) {
          return "**" === r.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, i)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                e,
                n,
                r,
                s,
                i
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, n, r) {
          const s = this.applyRedirectCommands([], n.redirectTo, {});
          return n.redirectTo.startsWith("/")
            ? Jh(s)
            : this.lineralizeSegments(n, s).pipe(
                M((n) => {
                  const s = new Mc(n, {});
                  return this.expandSegment(t, s, e, n, r, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) {
          const {
            matched: o,
            consumedSegments: a,
            lastChild: l,
            positionalParamSegments: u,
          } = td(e, r, s);
          if (!o) return Kh(e);
          const c = this.applyRedirectCommands(a, r.redirectTo, u);
          return r.redirectTo.startsWith("/")
            ? Jh(c)
            : this.lineralizeSegments(r, c).pipe(
                M((r) =>
                  this.expandSegment(t, e, n, r.concat(s.slice(l)), i, !1)
                )
              );
        }
        matchSegmentAgainstRoute(t, e, n, r) {
          if ("**" === n.path)
            return n.loadChildren
              ? this.configLoader
                  .load(t.injector, n)
                  .pipe(E((t) => ((n._loadedConfig = t), new Mc(r, {}))))
              : fu(new Mc(r, {}));
          const { matched: s, consumedSegments: i, lastChild: o } = td(e, n, r);
          if (!s) return Kh(e);
          const a = r.slice(o);
          return this.getChildConfig(t, n, r).pipe(
            M((t) => {
              const n = t.module,
                r = t.routes,
                { segmentGroup: s, slicedSegments: o } = (function (
                  t,
                  e,
                  n,
                  r
                ) {
                  return n.length > 0 &&
                    (function (t, e, n) {
                      return n.some((n) => nd(t, e, n) && Gh(n) !== xc);
                    })(t, n, r)
                    ? {
                        segmentGroup: ed(
                          new Mc(
                            e,
                            (function (t, e) {
                              const n = {};
                              n.primary = e;
                              for (const r of t)
                                "" === r.path &&
                                  Gh(r) !== xc &&
                                  (n[Gh(r)] = new Mc([], {}));
                              return n;
                            })(r, new Mc(n, t.children))
                          )
                        ),
                        slicedSegments: [],
                      }
                    : 0 === n.length &&
                      (function (t, e, n) {
                        return n.some((n) => nd(t, e, n));
                      })(t, n, r)
                    ? {
                        segmentGroup: ed(
                          new Mc(
                            t.segments,
                            (function (t, e, n, r) {
                              const s = {};
                              for (const i of n)
                                nd(t, e, i) &&
                                  !r[Gh(i)] &&
                                  (s[Gh(i)] = new Mc([], {}));
                              return Object.assign(Object.assign({}, r), s);
                            })(t, n, r, t.children)
                          )
                        ),
                        slicedSegments: n,
                      }
                    : { segmentGroup: t, slicedSegments: n };
                })(e, i, a, r);
              return 0 === o.length && s.hasChildren()
                ? this.expandChildren(n, r, s).pipe(E((t) => new Mc(i, t)))
                : 0 === r.length && 0 === o.length
                ? fu(new Mc(i, {}))
                : this.expandSegment(n, s, r, o, xc, !0).pipe(
                    E((t) => new Mc(i.concat(t.segments), t.children))
                  );
            })
          );
        }
        getChildConfig(t, e, n) {
          return e.children
            ? fu(new Lh(e.children, t))
            : e.loadChildren
            ? void 0 !== e._loadedConfig
              ? fu(e._loadedConfig)
              : this.runCanLoadGuards(t.injector, e, n).pipe(
                  M((n) =>
                    n
                      ? this.configLoader
                          .load(t.injector, e)
                          .pipe(E((t) => ((e._loadedConfig = t), t)))
                      : (function (t) {
                          return new v((e) =>
                            e.error(
                              kc(
                                `Cannot load children because the guard of the route "path: '${t.path}'" returned false`
                              )
                            )
                          );
                        })(e)
                  )
                )
            : fu(new Lh([], t));
        }
        runCanLoadGuards(t, e, n) {
          const r = e.canLoad;
          return r && 0 !== r.length
            ? fu(
                r.map((r) => {
                  const s = t.get(r);
                  let i;
                  if (
                    (function (t) {
                      return t && Hh(t.canLoad);
                    })(s)
                  )
                    i = s.canLoad(e, n);
                  else {
                    if (!Hh(s)) throw new Error("Invalid CanLoad guard");
                    i = s(e, n);
                  }
                  return Nc(i);
                })
              ).pipe(
                Vh(),
                nc((t) => {
                  if (!Fh(t)) return;
                  const e = kc(
                    `Redirecting to "${this.urlSerializer.serialize(t)}"`
                  );
                  throw ((e.url = t), e);
                }),
                E((t) => !0 === t)
              )
            : fu(!0);
        }
        lineralizeSegments(t, e) {
          let n = [],
            r = e.root;
          for (;;) {
            if (((n = n.concat(r.segments)), 0 === r.numberOfChildren))
              return fu(n);
            if (r.numberOfChildren > 1 || !r.children.primary)
              return Yh(t.redirectTo);
            r = r.children.primary;
          }
        }
        applyRedirectCommands(t, e, n) {
          return this.applyRedirectCreatreUrlTree(
            e,
            this.urlSerializer.parse(e),
            t,
            n
          );
        }
        applyRedirectCreatreUrlTree(t, e, n, r) {
          const s = this.createSegmentGroup(t, e.root, n, r);
          return new Fc(
            s,
            this.createQueryParams(e.queryParams, this.urlTree.queryParams),
            e.fragment
          );
        }
        createQueryParams(t, e) {
          const n = {};
          return (
            jc(t, (t, r) => {
              if ("string" == typeof t && t.startsWith(":")) {
                const s = t.substring(1);
                n[r] = e[s];
              } else n[r] = t;
            }),
            n
          );
        }
        createSegmentGroup(t, e, n, r) {
          const s = this.createSegments(t, e.segments, n, r);
          let i = {};
          return (
            jc(e.children, (e, s) => {
              i[s] = this.createSegmentGroup(t, e, n, r);
            }),
            new Mc(s, i)
          );
        }
        createSegments(t, e, n, r) {
          return e.map((e) =>
            e.path.startsWith(":")
              ? this.findPosParam(t, e, r)
              : this.findOrReturn(e, n)
          );
        }
        findPosParam(t, e, n) {
          const r = n[e.path.substring(1)];
          if (!r)
            throw new Error(
              `Cannot redirect to '${t}'. Cannot find '${e.path}'.`
            );
          return r;
        }
        findOrReturn(t, e) {
          let n = 0;
          for (const r of e) {
            if (r.path === t.path) return e.splice(n), r;
            n++;
          }
          return t;
        }
      }
      function td(t, e, n) {
        if ("" === e.path)
          return "full" === e.pathMatch && (t.hasChildren() || n.length > 0)
            ? {
                matched: !1,
                consumedSegments: [],
                lastChild: 0,
                positionalParamSegments: {},
              }
            : {
                matched: !0,
                consumedSegments: [],
                lastChild: 0,
                positionalParamSegments: {},
              };
        const r = (e.matcher || Ac)(n, t, e);
        return r
          ? {
              matched: !0,
              consumedSegments: r.consumed,
              lastChild: r.consumed.length,
              positionalParamSegments: r.posParams,
            }
          : {
              matched: !1,
              consumedSegments: [],
              lastChild: 0,
              positionalParamSegments: {},
            };
      }
      function ed(t) {
        if (1 === t.numberOfChildren && t.children.primary) {
          const e = t.children.primary;
          return new Mc(t.segments.concat(e.segments), e.children);
        }
        return t;
      }
      function nd(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path &&
          void 0 !== n.redirectTo
        );
      }
      class rd {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class sd {
        constructor(t, e) {
          (this.component = t), (this.route = e);
        }
      }
      function id(t, e, n) {
        const r = t._root;
        return ad(r, e ? e._root : null, n, [r.value]);
      }
      function od(t, e, n) {
        const r = (function (t) {
          if (!t) return null;
          for (let e = t.parent; e; e = e.parent) {
            const t = e.routeConfig;
            if (t && t._loadedConfig) return t._loadedConfig;
          }
          return null;
        })(e);
        return (r ? r.module.injector : n).get(t);
      }
      function ad(
        t,
        e,
        n,
        r,
        s = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = ch(e);
        return (
          t.children.forEach((t) => {
            !(function (
              t,
              e,
              n,
              r,
              s = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = t.value,
                o = e ? e.value : null,
                a = n ? n.getContext(t.value.outlet) : null;
              if (o && i.routeConfig === o.routeConfig) {
                const l = (function (t, e, n) {
                  if ("function" == typeof n) return n(t, e);
                  switch (n) {
                    case "pathParamsChange":
                      return !$c(t.url, e.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !$c(t.url, e.url) || !Rc(t.queryParams, e.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !_h(t, e) || !Rc(t.queryParams, e.queryParams);
                    case "paramsChange":
                    default:
                      return !_h(t, e);
                  }
                })(o, i, i.routeConfig.runGuardsAndResolvers);
                l
                  ? s.canActivateChecks.push(new rd(r))
                  : ((i.data = o.data), (i._resolvedData = o._resolvedData)),
                  ad(t, e, i.component ? (a ? a.children : null) : n, r, s),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    s.canDeactivateChecks.push(new sd(a.outlet.component, o));
              } else
                o && ld(e, a, s),
                  s.canActivateChecks.push(new rd(r)),
                  ad(t, null, i.component ? (a ? a.children : null) : n, r, s);
            })(t, i[t.value.outlet], n, r.concat([t.value]), s),
              delete i[t.value.outlet];
          }),
          jc(i, (t, e) => ld(t, n.getContext(e), s)),
          s
        );
      }
      function ld(t, e, n) {
        const r = ch(t),
          s = t.value;
        jc(r, (t, r) => {
          ld(t, s.component ? (e ? e.children.getContext(r) : null) : e, n);
        }),
          n.canDeactivateChecks.push(
            new sd(
              s.component && e && e.outlet && e.outlet.isActivated
                ? e.outlet.component
                : null,
              s
            )
          );
      }
      function ud(t, e) {
        return null !== t && e && e(new bc(t)), fu(!0);
      }
      function cd(t, e) {
        return null !== t && e && e(new wc(t)), fu(!0);
      }
      function hd(t, e, n) {
        const r = e.routeConfig ? e.routeConfig.canActivate : null;
        return r && 0 !== r.length
          ? fu(
              r.map((r) =>
                Tu(() => {
                  const s = od(r, e, n);
                  let i;
                  if (
                    (function (t) {
                      return t && Hh(t.canActivate);
                    })(s)
                  )
                    i = Nc(s.canActivate(e, t));
                  else {
                    if (!Hh(s)) throw new Error("Invalid CanActivate guard");
                    i = Nc(s(e, t));
                  }
                  return i.pipe(tc());
                })
              )
            ).pipe(Vh())
          : fu(!0);
      }
      function dd(t, e, n) {
        const r = e[e.length - 1],
          s = e
            .slice(0, e.length - 1)
            .reverse()
            .map((t) =>
              (function (t) {
                const e = t.routeConfig ? t.routeConfig.canActivateChild : null;
                return e && 0 !== e.length ? { node: t, guards: e } : null;
              })(t)
            )
            .filter((t) => null !== t)
            .map((e) =>
              Tu(() =>
                fu(
                  e.guards.map((s) => {
                    const i = od(s, e.node, n);
                    let o;
                    if (
                      (function (t) {
                        return t && Hh(t.canActivateChild);
                      })(i)
                    )
                      o = Nc(i.canActivateChild(r, t));
                    else {
                      if (!Hh(i))
                        throw new Error("Invalid CanActivateChild guard");
                      o = Nc(i(r, t));
                    }
                    return o.pipe(tc());
                  })
                ).pipe(Vh())
              )
            );
        return fu(s).pipe(Vh());
      }
      class pd {}
      class fd {
        constructor(t, e, n, r, s, i) {
          (this.rootComponentType = t),
            (this.config = e),
            (this.urlTree = n),
            (this.url = r),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = i);
        }
        recognize() {
          try {
            const t = yd(
                this.urlTree.root,
                [],
                [],
                this.config,
                this.relativeLinkResolution
              ).segmentGroup,
              e = this.processSegmentGroup(this.config, t, xc),
              n = new gh(
                [],
                Object.freeze({}),
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                {},
                xc,
                this.rootComponentType,
                null,
                this.urlTree.root,
                -1,
                {}
              ),
              r = new uh(n, e),
              s = new mh(this.url, r);
            return this.inheritParamsAndData(s._root), fu(s);
          } catch (t) {
            return new v((e) => e.error(t));
          }
        }
        inheritParamsAndData(t) {
          const e = t.value,
            n = fh(e, this.paramsInheritanceStrategy);
          (e.params = Object.freeze(n.params)),
            (e.data = Object.freeze(n.data)),
            t.children.forEach((t) => this.inheritParamsAndData(t));
        }
        processSegmentGroup(t, e, n) {
          return 0 === e.segments.length && e.hasChildren()
            ? this.processChildren(t, e)
            : this.processSegment(t, e, e.segments, n);
        }
        processChildren(t, e) {
          const n = zc(e, (e, n) => this.processSegmentGroup(t, e, n));
          return (
            (function (t) {
              const e = {};
              t.forEach((t) => {
                const n = e[t.value.outlet];
                if (n) {
                  const e = n.url.map((t) => t.toString()).join("/"),
                    r = t.value.url.map((t) => t.toString()).join("/");
                  throw new Error(
                    `Two segments cannot have the same outlet name: '${e}' and '${r}'.`
                  );
                }
                e[t.value.outlet] = t.value;
              });
            })(n),
            n.sort((t, e) =>
              t.value.outlet === xc
                ? -1
                : e.value.outlet === xc
                ? 1
                : t.value.outlet.localeCompare(e.value.outlet)
            ),
            n
          );
        }
        processSegment(t, e, n, r) {
          for (const i of t)
            try {
              return this.processSegmentAgainstRoute(i, e, n, r);
            } catch (s) {
              if (!(s instanceof pd)) throw s;
            }
          if (this.noLeftoversInUrl(e, n, r)) return [];
          throw new pd();
        }
        noLeftoversInUrl(t, e, n) {
          return 0 === e.length && !t.children[n];
        }
        processSegmentAgainstRoute(t, e, n, r) {
          if (t.redirectTo) throw new pd();
          if ((t.outlet || xc) !== r) throw new pd();
          let s,
            i = [],
            o = [];
          if ("**" === t.path) {
            const i = n.length > 0 ? Pc(n).parameters : {};
            s = new gh(
              n,
              i,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              wd(t),
              r,
              t.component,
              t,
              gd(e),
              md(e) + n.length,
              _d(t)
            );
          } else {
            const a = (function (t, e, n) {
              if ("" === e.path) {
                if ("full" === e.pathMatch && (t.hasChildren() || n.length > 0))
                  throw new pd();
                return { consumedSegments: [], lastChild: 0, parameters: {} };
              }
              const r = (e.matcher || Ac)(n, t, e);
              if (!r) throw new pd();
              const s = {};
              jc(r.posParams, (t, e) => {
                s[e] = t.path;
              });
              const i =
                r.consumed.length > 0
                  ? Object.assign(
                      Object.assign({}, s),
                      r.consumed[r.consumed.length - 1].parameters
                    )
                  : s;
              return {
                consumedSegments: r.consumed,
                lastChild: r.consumed.length,
                parameters: i,
              };
            })(e, t, n);
            (i = a.consumedSegments),
              (o = n.slice(a.lastChild)),
              (s = new gh(
                i,
                a.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                wd(t),
                r,
                t.component,
                t,
                gd(e),
                md(e) + i.length,
                _d(t)
              ));
          }
          const a = (function (t) {
              return t.children
                ? t.children
                : t.loadChildren
                ? t._loadedConfig.routes
                : [];
            })(t),
            { segmentGroup: l, slicedSegments: u } = yd(
              e,
              i,
              o,
              a,
              this.relativeLinkResolution
            );
          if (0 === u.length && l.hasChildren()) {
            const t = this.processChildren(a, l);
            return [new uh(s, t)];
          }
          if (0 === a.length && 0 === u.length) return [new uh(s, [])];
          const c = this.processSegment(a, l, u, xc);
          return [new uh(s, c)];
        }
      }
      function gd(t) {
        let e = t;
        for (; e._sourceSegment; ) e = e._sourceSegment;
        return e;
      }
      function md(t) {
        let e = t,
          n = e._segmentIndexShift ? e._segmentIndexShift : 0;
        for (; e._sourceSegment; )
          (e = e._sourceSegment),
            (n += e._segmentIndexShift ? e._segmentIndexShift : 0);
        return n - 1;
      }
      function yd(t, e, n, r, s) {
        if (
          n.length > 0 &&
          (function (t, e, n) {
            return n.some((n) => vd(t, e, n) && Gh(n) !== xc);
          })(t, n, r)
        ) {
          const s = new Mc(
            e,
            (function (t, e, n, r) {
              const s = {};
              (s.primary = r),
                (r._sourceSegment = t),
                (r._segmentIndexShift = e.length);
              for (const i of n)
                if ("" === i.path && Gh(i) !== xc) {
                  const n = new Mc([], {});
                  (n._sourceSegment = t),
                    (n._segmentIndexShift = e.length),
                    (s[Gh(i)] = n);
                }
              return s;
            })(t, e, r, new Mc(n, t.children))
          );
          return (
            (s._sourceSegment = t),
            (s._segmentIndexShift = e.length),
            { segmentGroup: s, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function (t, e, n) {
            return n.some((n) => vd(t, e, n));
          })(t, n, r)
        ) {
          const i = new Mc(
            t.segments,
            (function (t, e, n, r, s, i) {
              const o = {};
              for (const a of r)
                if (vd(t, n, a) && !s[Gh(a)]) {
                  const n = new Mc([], {});
                  (n._sourceSegment = t),
                    (n._segmentIndexShift =
                      "legacy" === i ? t.segments.length : e.length),
                    (o[Gh(a)] = n);
                }
              return Object.assign(Object.assign({}, s), o);
            })(t, e, n, r, t.children, s)
          );
          return (
            (i._sourceSegment = t),
            (i._segmentIndexShift = e.length),
            { segmentGroup: i, slicedSegments: n }
          );
        }
        const i = new Mc(t.segments, t.children);
        return (
          (i._sourceSegment = t),
          (i._segmentIndexShift = e.length),
          { segmentGroup: i, slicedSegments: n }
        );
      }
      function vd(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path &&
          void 0 === n.redirectTo
        );
      }
      function wd(t) {
        return t.data || {};
      }
      function _d(t) {
        return t.resolve || {};
      }
      function bd(t) {
        return function (e) {
          return e.pipe(
            Vu((e) => {
              const n = t(e);
              return n ? D(n).pipe(E(() => e)) : D([e]);
            })
          );
        };
      }
      class Sd extends class {
        shouldDetach(t) {
          return !1;
        }
        store(t, e) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, e) {
          return t.routeConfig === e.routeConfig;
        }
      } {}
      const Cd = new Ln("ROUTES");
      class xd {
        constructor(t, e, n, r) {
          (this.loader = t),
            (this.compiler = e),
            (this.onLoadStartListener = n),
            (this.onLoadEndListener = r);
        }
        load(t, e) {
          return (
            this.onLoadStartListener && this.onLoadStartListener(e),
            this.loadModuleFactory(e.loadChildren).pipe(
              E((n) => {
                this.onLoadEndListener && this.onLoadEndListener(e);
                const r = n.create(t);
                return new Lh(Oc(r.injector.get(Cd)).map(Wh), r);
              })
            )
          );
        }
        loadModuleFactory(t) {
          return "string" == typeof t
            ? D(this.loader.load(t))
            : Nc(t()).pipe(
                M((t) =>
                  t instanceof So
                    ? fu(t)
                    : D(this.compiler.compileModuleAsync(t))
                )
              );
        }
      }
      class Td {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new Ed()),
            (this.attachRef = null);
        }
      }
      class Ed {
        constructor() {
          this.contexts = new Map();
        }
        onChildOutletCreated(t, e) {
          const n = this.getOrCreateContext(t);
          (n.outlet = e), this.contexts.set(t, n);
        }
        onChildOutletDestroyed(t) {
          const e = this.getContext(t);
          e && (e.outlet = null);
        }
        onOutletDeactivated() {
          const t = this.contexts;
          return (this.contexts = new Map()), t;
        }
        onOutletReAttached(t) {
          this.contexts = t;
        }
        getOrCreateContext(t) {
          let e = this.getContext(t);
          return e || ((e = new Td()), this.contexts.set(t, e)), e;
        }
        getContext(t) {
          return this.contexts.get(t) || null;
        }
      }
      class kd {
        shouldProcessUrl(t) {
          return !0;
        }
        extract(t) {
          return t;
        }
        merge(t, e) {
          return t;
        }
      }
      function Ad(t) {
        throw t;
      }
      function Rd(t, e, n) {
        return e.parse("/");
      }
      function Id(t, e) {
        return fu(null);
      }
      let Od = (() => {
          class t {
            constructor(t, e, n, r, s, i, o, a) {
              (this.rootComponentType = t),
                (this.urlSerializer = e),
                (this.rootContexts = n),
                (this.location = r),
                (this.config = a),
                (this.lastSuccessfulNavigation = null),
                (this.currentNavigation = null),
                (this.lastLocationChangeInfo = null),
                (this.navigationId = 0),
                (this.isNgZoneEnabled = !1),
                (this.events = new C()),
                (this.errorHandler = Ad),
                (this.malformedUriErrorHandler = Rd),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1),
                (this.hooks = {
                  beforePreactivation: Id,
                  afterPreactivation: Id,
                }),
                (this.urlHandlingStrategy = new kd()),
                (this.routeReuseStrategy = new Sd()),
                (this.onSameUrlNavigation = "ignore"),
                (this.paramsInheritanceStrategy = "emptyOnly"),
                (this.urlUpdateStrategy = "deferred"),
                (this.relativeLinkResolution = "corrected"),
                (this.ngModule = s.get(bo)),
                (this.console = s.get(ha));
              const l = s.get(xa);
              (this.isNgZoneEnabled = l instanceof xa),
                this.resetConfig(a),
                (this.currentUrlTree = new Fc(new Mc([], {}), {}, null)),
                (this.rawUrlTree = this.currentUrlTree),
                (this.browserUrlTree = this.currentUrlTree),
                (this.configLoader = new xd(
                  i,
                  o,
                  (t) => this.triggerEvent(new yc(t)),
                  (t) => this.triggerEvent(new vc(t))
                )),
                (this.routerState = dh(
                  this.currentUrlTree,
                  this.rootComponentType
                )),
                (this.transitions = new gu({
                  id: 0,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.currentUrlTree,
                  extractedUrl: this.urlHandlingStrategy.extract(
                    this.currentUrlTree
                  ),
                  urlAfterRedirects: this.urlHandlingStrategy.extract(
                    this.currentUrlTree
                  ),
                  rawUrl: this.currentUrlTree,
                  extras: {},
                  resolve: null,
                  reject: null,
                  promise: Promise.resolve(!0),
                  source: "imperative",
                  restoredState: null,
                  currentSnapshot: this.routerState.snapshot,
                  targetSnapshot: null,
                  currentRouterState: this.routerState,
                  targetRouterState: null,
                  guards: { canActivateChecks: [], canDeactivateChecks: [] },
                  guardsResult: null,
                })),
                (this.navigations = this.setupNavigations(this.transitions)),
                this.processNavigations();
            }
            setupNavigations(t) {
              const e = this.events;
              return t.pipe(
                ku((t) => 0 !== t.id),
                E((t) =>
                  Object.assign(Object.assign({}, t), {
                    extractedUrl: this.urlHandlingStrategy.extract(t.rawUrl),
                  })
                ),
                Vu((t) => {
                  let n = !1,
                    r = !1;
                  return fu(t).pipe(
                    nc((t) => {
                      this.currentNavigation = {
                        id: t.id,
                        initialUrl: t.currentRawUrl,
                        extractedUrl: t.extractedUrl,
                        trigger: t.source,
                        extras: t.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? Object.assign(
                              Object.assign({}, this.lastSuccessfulNavigation),
                              { previousNavigation: null }
                            )
                          : null,
                      };
                    }),
                    Vu((t) => {
                      const n =
                        !this.navigated ||
                        t.extractedUrl.toString() !==
                          this.browserUrlTree.toString();
                      if (
                        ("reload" === this.onSameUrlNavigation || n) &&
                        this.urlHandlingStrategy.shouldProcessUrl(t.rawUrl)
                      )
                        return fu(t).pipe(
                          Vu((t) => {
                            const n = this.transitions.getValue();
                            return (
                              e.next(
                                new lc(
                                  t.id,
                                  this.serializeUrl(t.extractedUrl),
                                  t.source,
                                  t.restoredState
                                )
                              ),
                              n !== this.transitions.getValue() ? Cu : [t]
                            );
                          }),
                          Vu((t) => Promise.resolve(t)),
                          ((r = this.ngModule.injector),
                          (s = this.configLoader),
                          (i = this.urlSerializer),
                          (o = this.config),
                          function (t) {
                            return t.pipe(
                              Vu((t) =>
                                (function (t, e, n, r, s) {
                                  return new Xh(t, e, n, r, s).apply();
                                })(r, s, i, t.extractedUrl, o).pipe(
                                  E((e) =>
                                    Object.assign(Object.assign({}, t), {
                                      urlAfterRedirects: e,
                                    })
                                  )
                                )
                              )
                            );
                          }),
                          nc((t) => {
                            this.currentNavigation = Object.assign(
                              Object.assign({}, this.currentNavigation),
                              { finalUrl: t.urlAfterRedirects }
                            );
                          }),
                          (function (t, e, n, r, s) {
                            return function (i) {
                              return i.pipe(
                                M((i) =>
                                  (function (
                                    t,
                                    e,
                                    n,
                                    r,
                                    s = "emptyOnly",
                                    i = "legacy"
                                  ) {
                                    return new fd(t, e, n, r, s, i).recognize();
                                  })(
                                    t,
                                    e,
                                    i.urlAfterRedirects,
                                    n(i.urlAfterRedirects),
                                    r,
                                    s
                                  ).pipe(
                                    E((t) =>
                                      Object.assign(Object.assign({}, i), {
                                        targetSnapshot: t,
                                      })
                                    )
                                  )
                                )
                              );
                            };
                          })(
                            this.rootComponentType,
                            this.config,
                            (t) => this.serializeUrl(t),
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          nc((t) => {
                            "eager" === this.urlUpdateStrategy &&
                              (t.extras.skipLocationChange ||
                                this.setBrowserUrl(
                                  t.urlAfterRedirects,
                                  !!t.extras.replaceUrl,
                                  t.id,
                                  t.extras.state
                                ),
                              (this.browserUrlTree = t.urlAfterRedirects));
                          }),
                          nc((t) => {
                            const n = new dc(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            e.next(n);
                          })
                        );
                      var r, s, i, o;
                      if (
                        n &&
                        this.rawUrlTree &&
                        this.urlHandlingStrategy.shouldProcessUrl(
                          this.rawUrlTree
                        )
                      ) {
                        const {
                            id: n,
                            extractedUrl: r,
                            source: s,
                            restoredState: i,
                            extras: o,
                          } = t,
                          a = new lc(n, this.serializeUrl(r), s, i);
                        e.next(a);
                        const l = dh(r, this.rootComponentType).snapshot;
                        return fu(
                          Object.assign(Object.assign({}, t), {
                            targetSnapshot: l,
                            urlAfterRedirects: r,
                            extras: Object.assign(Object.assign({}, o), {
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            }),
                          })
                        );
                      }
                      return (
                        (this.rawUrlTree = t.rawUrl),
                        (this.browserUrlTree = t.urlAfterRedirects),
                        t.resolve(null),
                        Cu
                      );
                    }),
                    bd((t) => {
                      const {
                        targetSnapshot: e,
                        id: n,
                        extractedUrl: r,
                        rawUrl: s,
                        extras: { skipLocationChange: i, replaceUrl: o },
                      } = t;
                      return this.hooks.beforePreactivation(e, {
                        navigationId: n,
                        appliedUrlTree: r,
                        rawUrlTree: s,
                        skipLocationChange: !!i,
                        replaceUrl: !!o,
                      });
                    }),
                    nc((t) => {
                      const e = new pc(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(t.urlAfterRedirects),
                        t.targetSnapshot
                      );
                      this.triggerEvent(e);
                    }),
                    E((t) =>
                      Object.assign(Object.assign({}, t), {
                        guards: id(
                          t.targetSnapshot,
                          t.currentSnapshot,
                          this.rootContexts
                        ),
                      })
                    ),
                    (function (t, e) {
                      return function (n) {
                        return n.pipe(
                          M((n) => {
                            const {
                              targetSnapshot: r,
                              currentSnapshot: s,
                              guards: {
                                canActivateChecks: i,
                                canDeactivateChecks: o,
                              },
                            } = n;
                            return 0 === o.length && 0 === i.length
                              ? fu(
                                  Object.assign(Object.assign({}, n), {
                                    guardsResult: !0,
                                  })
                                )
                              : (function (t, e, n, r) {
                                  return D(t).pipe(
                                    M((t) =>
                                      (function (t, e, n, r, s) {
                                        const i =
                                          e && e.routeConfig
                                            ? e.routeConfig.canDeactivate
                                            : null;
                                        return i && 0 !== i.length
                                          ? fu(
                                              i.map((i) => {
                                                const o = od(i, e, s);
                                                let a;
                                                if (
                                                  (function (t) {
                                                    return (
                                                      t && Hh(t.canDeactivate)
                                                    );
                                                  })(o)
                                                )
                                                  a = Nc(
                                                    o.canDeactivate(t, e, n, r)
                                                  );
                                                else {
                                                  if (!Hh(o))
                                                    throw new Error(
                                                      "Invalid CanDeactivate guard"
                                                    );
                                                  a = Nc(o(t, e, n, r));
                                                }
                                                return a.pipe(tc());
                                              })
                                            ).pipe(Vh())
                                          : fu(!0);
                                      })(t.component, t.route, n, e, r)
                                    ),
                                    tc((t) => !0 !== t, !0)
                                  );
                                })(o, r, s, t).pipe(
                                  M((n) =>
                                    n && "boolean" == typeof n
                                      ? (function (t, e, n, r) {
                                          return D(e).pipe(
                                            Xu((e) =>
                                              D([
                                                cd(e.route.parent, r),
                                                ud(e.route, r),
                                                dd(t, e.path, n),
                                                hd(t, e.route, n),
                                              ]).pipe(
                                                Eu(),
                                                tc((t) => !0 !== t, !0)
                                              )
                                            ),
                                            tc((t) => !0 !== t, !0)
                                          );
                                        })(r, i, t, e)
                                      : fu(n)
                                  ),
                                  E((t) =>
                                    Object.assign(Object.assign({}, n), {
                                      guardsResult: t,
                                    })
                                  )
                                );
                          })
                        );
                      };
                    })(this.ngModule.injector, (t) => this.triggerEvent(t)),
                    nc((t) => {
                      if (Fh(t.guardsResult)) {
                        const e = kc(
                          `Redirecting to "${this.serializeUrl(
                            t.guardsResult
                          )}"`
                        );
                        throw ((e.url = t.guardsResult), e);
                      }
                    }),
                    nc((t) => {
                      const e = new fc(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(t.urlAfterRedirects),
                        t.targetSnapshot,
                        !!t.guardsResult
                      );
                      this.triggerEvent(e);
                    }),
                    ku((t) => {
                      if (!t.guardsResult) {
                        this.resetUrlToCurrentUrlTree();
                        const n = new cc(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          ""
                        );
                        return e.next(n), t.resolve(!1), !1;
                      }
                      return !0;
                    }),
                    bd((t) => {
                      if (t.guards.canActivateChecks.length)
                        return fu(t).pipe(
                          nc((t) => {
                            const e = new gc(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            this.triggerEvent(e);
                          }),
                          Vu((t) => {
                            let n = !1;
                            return fu(t).pipe(
                              ((r = this.paramsInheritanceStrategy),
                              (s = this.ngModule.injector),
                              function (t) {
                                return t.pipe(
                                  M((t) => {
                                    const {
                                      targetSnapshot: e,
                                      guards: { canActivateChecks: n },
                                    } = t;
                                    if (!n.length) return fu(t);
                                    let i = 0;
                                    return D(n).pipe(
                                      Xu((t) =>
                                        (function (t, e, n, r) {
                                          return (function (t, e, n, r) {
                                            const s = Object.keys(t);
                                            if (0 === s.length) return fu({});
                                            const i = {};
                                            return D(s).pipe(
                                              M((s) =>
                                                (function (t, e, n, r) {
                                                  const s = od(t, e, r);
                                                  return Nc(
                                                    s.resolve
                                                      ? s.resolve(e, n)
                                                      : s(e, n)
                                                  );
                                                })(t[s], e, n, r).pipe(
                                                  nc((t) => {
                                                    i[s] = t;
                                                  })
                                                )
                                              ),
                                              Ou(1),
                                              M(() =>
                                                Object.keys(i).length ===
                                                s.length
                                                  ? fu(i)
                                                  : Cu
                                              )
                                            );
                                          })(t._resolve, t, e, r).pipe(
                                            E(
                                              (e) => (
                                                (t._resolvedData = e),
                                                (t.data = Object.assign(
                                                  Object.assign({}, t.data),
                                                  fh(t, n).resolve
                                                )),
                                                null
                                              )
                                            )
                                          );
                                        })(t.route, e, r, s)
                                      ),
                                      nc(() => i++),
                                      Ou(1),
                                      M((e) => (i === n.length ? fu(t) : Cu))
                                    );
                                  })
                                );
                              }),
                              nc({
                                next: () => (n = !0),
                                complete: () => {
                                  if (!n) {
                                    const n = new cc(
                                      t.id,
                                      this.serializeUrl(t.extractedUrl),
                                      "At least one route resolver didn't emit any value."
                                    );
                                    e.next(n), t.resolve(!1);
                                  }
                                },
                              })
                            );
                            var r, s;
                          }),
                          nc((t) => {
                            const e = new mc(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            this.triggerEvent(e);
                          })
                        );
                    }),
                    bd((t) => {
                      const {
                        targetSnapshot: e,
                        id: n,
                        extractedUrl: r,
                        rawUrl: s,
                        extras: { skipLocationChange: i, replaceUrl: o },
                      } = t;
                      return this.hooks.afterPreactivation(e, {
                        navigationId: n,
                        appliedUrlTree: r,
                        rawUrlTree: s,
                        skipLocationChange: !!i,
                        replaceUrl: !!o,
                      });
                    }),
                    E((t) => {
                      const e = (function (t, e, n) {
                        const r = bh(t, e._root, n ? n._root : void 0);
                        return new hh(r, e);
                      })(
                        this.routeReuseStrategy,
                        t.targetSnapshot,
                        t.currentRouterState
                      );
                      return Object.assign(Object.assign({}, t), {
                        targetRouterState: e,
                      });
                    }),
                    nc((t) => {
                      (this.currentUrlTree = t.urlAfterRedirects),
                        (this.rawUrlTree = this.urlHandlingStrategy.merge(
                          this.currentUrlTree,
                          t.rawUrl
                        )),
                        (this.routerState = t.targetRouterState),
                        "deferred" === this.urlUpdateStrategy &&
                          (t.extras.skipLocationChange ||
                            this.setBrowserUrl(
                              this.rawUrlTree,
                              !!t.extras.replaceUrl,
                              t.id,
                              t.extras.state
                            ),
                          (this.browserUrlTree = t.urlAfterRedirects));
                    }),
                    ((i = this.rootContexts),
                    (o = this.routeReuseStrategy),
                    (a = (t) => this.triggerEvent(t)),
                    E(
                      (t) => (
                        new Uh(
                          o,
                          t.targetRouterState,
                          t.currentRouterState,
                          a
                        ).activate(i),
                        t
                      )
                    )),
                    nc({
                      next() {
                        n = !0;
                      },
                      complete() {
                        n = !0;
                      },
                    }),
                    ((s = () => {
                      if (!n && !r) {
                        this.resetUrlToCurrentUrlTree();
                        const n = new cc(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          `Navigation ID ${t.id} is not equal to the current navigation id ${this.navigationId}`
                        );
                        e.next(n), t.resolve(!1);
                      }
                      this.currentNavigation = null;
                    }),
                    (t) => t.lift(new ic(s))),
                    Ku((n) => {
                      if (((r = !0), (s = n) && s.ngNavigationCancelingError)) {
                        const r = Fh(n.url);
                        r ||
                          ((this.navigated = !0),
                          this.resetStateAndUrl(
                            t.currentRouterState,
                            t.currentUrlTree,
                            t.rawUrl
                          ));
                        const s = new cc(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          n.message
                        );
                        e.next(s),
                          r
                            ? setTimeout(() => {
                                const e = this.urlHandlingStrategy.merge(
                                  n.url,
                                  this.rawUrlTree
                                );
                                return this.scheduleNavigation(
                                  e,
                                  "imperative",
                                  null,
                                  {
                                    skipLocationChange:
                                      t.extras.skipLocationChange,
                                    replaceUrl:
                                      "eager" === this.urlUpdateStrategy,
                                  },
                                  {
                                    resolve: t.resolve,
                                    reject: t.reject,
                                    promise: t.promise,
                                  }
                                );
                              }, 0)
                            : t.resolve(!1);
                      } else {
                        this.resetStateAndUrl(
                          t.currentRouterState,
                          t.currentUrlTree,
                          t.rawUrl
                        );
                        const r = new hc(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          n
                        );
                        e.next(r);
                        try {
                          t.resolve(this.errorHandler(n));
                        } catch (i) {
                          t.reject(i);
                        }
                      }
                      var s;
                      return Cu;
                    })
                  );
                  var s, i, o, a;
                })
              );
            }
            resetRootComponentType(t) {
              (this.rootComponentType = t),
                (this.routerState.root.component = this.rootComponentType);
            }
            getTransition() {
              const t = this.transitions.value;
              return (t.urlAfterRedirects = this.browserUrlTree), t;
            }
            setTransition(t) {
              this.transitions.next(
                Object.assign(Object.assign({}, this.getTransition()), t)
              );
            }
            initialNavigation() {
              this.setUpLocationChangeListener(),
                0 === this.navigationId &&
                  this.navigateByUrl(this.location.path(!0), {
                    replaceUrl: !0,
                  });
            }
            setUpLocationChangeListener() {
              this.locationSubscription ||
                (this.locationSubscription = this.location.subscribe((t) => {
                  const e = this.extractLocationChangeInfoFromEvent(t);
                  this.shouldScheduleNavigation(
                    this.lastLocationChangeInfo,
                    e
                  ) &&
                    setTimeout(() => {
                      const { source: t, state: n, urlTree: r } = e,
                        s = { replaceUrl: !0 };
                      if (n) {
                        const t = Object.assign({}, n);
                        delete t.navigationId,
                          0 !== Object.keys(t).length && (s.state = t);
                      }
                      this.scheduleNavigation(r, t, n, s);
                    }, 0),
                    (this.lastLocationChangeInfo = e);
                }));
            }
            extractLocationChangeInfoFromEvent(t) {
              var e;
              return {
                source: "popstate" === t.type ? "popstate" : "hashchange",
                urlTree: this.parseUrl(t.url),
                state: (
                  null === (e = t.state) || void 0 === e
                    ? void 0
                    : e.navigationId
                )
                  ? t.state
                  : null,
                transitionId: this.getTransition().id,
              };
            }
            shouldScheduleNavigation(t, e) {
              if (!t) return !0;
              const n = e.urlTree.toString() === t.urlTree.toString();
              return !(
                e.transitionId === t.transitionId &&
                n &&
                (("hashchange" === e.source && "popstate" === t.source) ||
                  ("popstate" === e.source && "hashchange" === t.source))
              );
            }
            get url() {
              return this.serializeUrl(this.currentUrlTree);
            }
            getCurrentNavigation() {
              return this.currentNavigation;
            }
            triggerEvent(t) {
              this.events.next(t);
            }
            resetConfig(t) {
              zh(t),
                (this.config = t.map(Wh)),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1);
            }
            ngOnDestroy() {
              this.dispose();
            }
            dispose() {
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0));
            }
            createUrlTree(t, e = {}) {
              const {
                  relativeTo: n,
                  queryParams: r,
                  fragment: s,
                  queryParamsHandling: i,
                  preserveFragment: o,
                } = e,
                a = n || this.routerState.root,
                l = o ? this.currentUrlTree.fragment : s;
              let u = null;
              switch (i) {
                case "merge":
                  u = Object.assign(
                    Object.assign({}, this.currentUrlTree.queryParams),
                    r
                  );
                  break;
                case "preserve":
                  u = this.currentUrlTree.queryParams;
                  break;
                default:
                  u = r || null;
              }
              return (
                null !== u && (u = this.removeEmptyProps(u)),
                (function (t, e, n, r, s) {
                  if (0 === n.length) return Th(e.root, e.root, e, r, s);
                  const i = (function (t) {
                    if (
                      "string" == typeof t[0] &&
                      1 === t.length &&
                      "/" === t[0]
                    )
                      return new kh(!0, 0, t);
                    let e = 0,
                      n = !1;
                    const r = t.reduce((t, r, s) => {
                      if ("object" == typeof r && null != r) {
                        if (r.outlets) {
                          const e = {};
                          return (
                            jc(r.outlets, (t, n) => {
                              e[n] = "string" == typeof t ? t.split("/") : t;
                            }),
                            [...t, { outlets: e }]
                          );
                        }
                        if (r.segmentPath) return [...t, r.segmentPath];
                      }
                      return "string" != typeof r
                        ? [...t, r]
                        : 0 === s
                        ? (r.split("/").forEach((r, s) => {
                            (0 == s && "." === r) ||
                              (0 == s && "" === r
                                ? (n = !0)
                                : ".." === r
                                ? e++
                                : "" != r && t.push(r));
                          }),
                          t)
                        : [...t, r];
                    }, []);
                    return new kh(n, e, r);
                  })(n);
                  if (i.toRoot()) return Th(e.root, new Mc([], {}), e, r, s);
                  const o = (function (t, e, n) {
                      if (t.isAbsolute) return new Ah(e.root, !0, 0);
                      if (-1 === n.snapshot._lastPathIndex) {
                        const t = n.snapshot._urlSegment;
                        return new Ah(t, t === e.root, 0);
                      }
                      const r = Ch(t.commands[0]) ? 0 : 1;
                      return (function (t, e, n) {
                        let r = t,
                          s = e,
                          i = n;
                        for (; i > s; ) {
                          if (((i -= s), (r = r.parent), !r))
                            throw new Error("Invalid number of '../'");
                          s = r.segments.length;
                        }
                        return new Ah(r, !1, s - i);
                      })(
                        n.snapshot._urlSegment,
                        n.snapshot._lastPathIndex + r,
                        t.numberOfDoubleDots
                      );
                    })(i, e, t),
                    a = o.processChildren
                      ? Ih(o.segmentGroup, o.index, i.commands)
                      : Rh(o.segmentGroup, o.index, i.commands);
                  return Th(o.segmentGroup, a, e, r, s);
                })(a, this.currentUrlTree, t, u, l)
              );
            }
            navigateByUrl(t, e = { skipLocationChange: !1 }) {
              const n = Fh(t) ? t : this.parseUrl(t),
                r = this.urlHandlingStrategy.merge(n, this.rawUrlTree);
              return this.scheduleNavigation(r, "imperative", null, e);
            }
            navigate(t, e = { skipLocationChange: !1 }) {
              return (
                (function (t) {
                  for (let e = 0; e < t.length; e++) {
                    const n = t[e];
                    if (null == n)
                      throw new Error(
                        `The requested path contains ${n} segment at index ${e}`
                      );
                  }
                })(t),
                this.navigateByUrl(this.createUrlTree(t, e), e)
              );
            }
            serializeUrl(t) {
              return this.urlSerializer.serialize(t);
            }
            parseUrl(t) {
              let e;
              try {
                e = this.urlSerializer.parse(t);
              } catch (n) {
                e = this.malformedUriErrorHandler(n, this.urlSerializer, t);
              }
              return e;
            }
            isActive(t, e) {
              if (Fh(t)) return Uc(this.currentUrlTree, t, e);
              const n = this.parseUrl(t);
              return Uc(this.currentUrlTree, n, e);
            }
            removeEmptyProps(t) {
              return Object.keys(t).reduce((e, n) => {
                const r = t[n];
                return null != r && (e[n] = r), e;
              }, {});
            }
            processNavigations() {
              this.navigations.subscribe(
                (t) => {
                  (this.navigated = !0),
                    (this.lastSuccessfulId = t.id),
                    this.events.next(
                      new uc(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(this.currentUrlTree)
                      )
                    ),
                    (this.lastSuccessfulNavigation = this.currentNavigation),
                    (this.currentNavigation = null),
                    t.resolve(!0);
                },
                (t) => {
                  this.console.warn("Unhandled Navigation Error: ");
                }
              );
            }
            scheduleNavigation(t, e, n, r, s) {
              const i = this.getTransition(),
                o =
                  "imperative" !== e &&
                  "imperative" === (null == i ? void 0 : i.source),
                a =
                  (this.lastSuccessfulId === i.id || this.currentNavigation
                    ? i.rawUrl
                    : i.urlAfterRedirects
                  ).toString() === t.toString();
              if (o && a) return Promise.resolve(!0);
              let l, u, c;
              s
                ? ((l = s.resolve), (u = s.reject), (c = s.promise))
                : (c = new Promise((t, e) => {
                    (l = t), (u = e);
                  }));
              const h = ++this.navigationId;
              return (
                this.setTransition({
                  id: h,
                  source: e,
                  restoredState: n,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.rawUrlTree,
                  rawUrl: t,
                  extras: r,
                  resolve: l,
                  reject: u,
                  promise: c,
                  currentSnapshot: this.routerState.snapshot,
                  currentRouterState: this.routerState,
                }),
                c.catch((t) => Promise.reject(t))
              );
            }
            setBrowserUrl(t, e, n, r) {
              const s = this.urlSerializer.serialize(t);
              (r = r || {}),
                this.location.isCurrentPathEqualTo(s) || e
                  ? this.location.replaceState(
                      s,
                      "",
                      Object.assign(Object.assign({}, r), { navigationId: n })
                    )
                  : this.location.go(
                      s,
                      "",
                      Object.assign(Object.assign({}, r), { navigationId: n })
                    );
            }
            resetStateAndUrl(t, e, n) {
              (this.routerState = t),
                (this.currentUrlTree = e),
                (this.rawUrlTree = this.urlHandlingStrategy.merge(
                  this.currentUrlTree,
                  n
                )),
                this.resetUrlToCurrentUrlTree();
            }
            resetUrlToCurrentUrlTree() {
              this.location.replaceState(
                this.urlSerializer.serialize(this.rawUrlTree),
                "",
                { navigationId: this.lastSuccessfulId }
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                er(Fn),
                er(qc),
                er(Ed),
                er(vl),
                er(ei),
                er(Ga),
                er(ba),
                er(void 0)
              );
            }),
            (t.ɵprov = st({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Pd = (() => {
          class t {
            constructor(t, e, n, r, s) {
              (this.router = t),
                (this.route = e),
                (this.commands = []),
                (this.onChanges = new C()),
                null == n && r.setAttribute(s.nativeElement, "tabindex", "0");
            }
            ngOnChanges(t) {
              this.onChanges.next(this);
            }
            set routerLink(t) {
              this.commands = null != t ? (Array.isArray(t) ? t : [t]) : [];
            }
            onClick() {
              const t = {
                skipLocationChange: Nd(this.skipLocationChange),
                replaceUrl: Nd(this.replaceUrl),
                state: this.state,
              };
              return this.router.navigateByUrl(this.urlTree, t), !0;
            }
            get urlTree() {
              return this.router.createUrlTree(this.commands, {
                relativeTo: this.route,
                queryParams: this.queryParams,
                fragment: this.fragment,
                queryParamsHandling: this.queryParamsHandling,
                preserveFragment: Nd(this.preserveFragment),
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                hi(Od),
                hi(ph),
                Nn("tabindex"),
                hi(zi),
                hi(Vi)
              );
            }),
            (t.ɵdir = Vt({
              type: t,
              selectors: [["", "routerLink", "", 5, "a", 5, "area"]],
              hostBindings: function (t, e) {
                1 & t &&
                  wi("click", function () {
                    return e.onClick();
                  });
              },
              inputs: {
                routerLink: "routerLink",
                queryParams: "queryParams",
                fragment: "fragment",
                queryParamsHandling: "queryParamsHandling",
                preserveFragment: "preserveFragment",
                skipLocationChange: "skipLocationChange",
                replaceUrl: "replaceUrl",
                state: "state",
              },
              features: [ie],
            })),
            t
          );
        })(),
        jd = (() => {
          class t {
            constructor(t, e, n) {
              (this.router = t),
                (this.route = e),
                (this.locationStrategy = n),
                (this.commands = []),
                (this.onChanges = new C()),
                (this.subscription = t.events.subscribe((t) => {
                  t instanceof uc && this.updateTargetUrlAndHref();
                }));
            }
            set routerLink(t) {
              this.commands = null != t ? (Array.isArray(t) ? t : [t]) : [];
            }
            ngOnChanges(t) {
              this.updateTargetUrlAndHref(), this.onChanges.next(this);
            }
            ngOnDestroy() {
              this.subscription.unsubscribe();
            }
            onClick(t, e, n, r, s) {
              if (0 !== t || e || n || r || s) return !0;
              if ("string" == typeof this.target && "_self" != this.target)
                return !0;
              const i = {
                skipLocationChange: Nd(this.skipLocationChange),
                replaceUrl: Nd(this.replaceUrl),
                state: this.state,
              };
              return this.router.navigateByUrl(this.urlTree, i), !1;
            }
            updateTargetUrlAndHref() {
              this.href = this.locationStrategy.prepareExternalUrl(
                this.router.serializeUrl(this.urlTree)
              );
            }
            get urlTree() {
              return this.router.createUrlTree(this.commands, {
                relativeTo: this.route,
                queryParams: this.queryParams,
                fragment: this.fragment,
                queryParamsHandling: this.queryParamsHandling,
                preserveFragment: Nd(this.preserveFragment),
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(hi(Od), hi(ph), hi(pl));
            }),
            (t.ɵdir = Vt({
              type: t,
              selectors: [
                ["a", "routerLink", ""],
                ["area", "routerLink", ""],
              ],
              hostVars: 2,
              hostBindings: function (t, e) {
                1 & t &&
                  wi("click", function (t) {
                    return e.onClick(
                      t.button,
                      t.ctrlKey,
                      t.shiftKey,
                      t.altKey,
                      t.metaKey
                    );
                  }),
                  2 & t && (Ei("href", e.href, ar), ui("target", e.target));
              },
              inputs: {
                routerLink: "routerLink",
                target: "target",
                queryParams: "queryParams",
                fragment: "fragment",
                queryParamsHandling: "queryParamsHandling",
                preserveFragment: "preserveFragment",
                skipLocationChange: "skipLocationChange",
                replaceUrl: "replaceUrl",
                state: "state",
              },
              features: [ie],
            })),
            t
          );
        })();
      function Nd(t) {
        return "" === t || !!t;
      }
      let Ud = (() => {
          class t {
            constructor(t, e, n, r, s, i) {
              (this.router = t),
                (this.element = e),
                (this.renderer = n),
                (this.cdr = r),
                (this.link = s),
                (this.linkWithHref = i),
                (this.classes = []),
                (this.isActive = !1),
                (this.routerLinkActiveOptions = { exact: !1 }),
                (this.routerEventsSubscription = t.events.subscribe((t) => {
                  t instanceof uc && this.update();
                }));
            }
            ngAfterContentInit() {
              D([this.links.changes, this.linksWithHrefs.changes, fu(null)])
                .pipe(z())
                .subscribe((t) => {
                  this.update(), this.subscribeToEachLinkOnChanges();
                });
            }
            subscribeToEachLinkOnChanges() {
              var t;
              null === (t = this.linkInputChangesSubscription) ||
                void 0 === t ||
                t.unsubscribe();
              const e = [
                ...this.links.toArray(),
                ...this.linksWithHrefs.toArray(),
                this.link,
                this.linkWithHref,
              ]
                .filter((t) => !!t)
                .map((t) => t.onChanges);
              this.linkInputChangesSubscription = D(e)
                .pipe(z())
                .subscribe((t) => {
                  this.isActive !== this.isLinkActive(this.router)(t) &&
                    this.update();
                });
            }
            set routerLinkActive(t) {
              const e = Array.isArray(t) ? t : t.split(" ");
              this.classes = e.filter((t) => !!t);
            }
            ngOnChanges(t) {
              this.update();
            }
            ngOnDestroy() {
              var t;
              this.routerEventsSubscription.unsubscribe(),
                null === (t = this.linkInputChangesSubscription) ||
                  void 0 === t ||
                  t.unsubscribe();
            }
            update() {
              this.links &&
                this.linksWithHrefs &&
                this.router.navigated &&
                Promise.resolve().then(() => {
                  const t = this.hasActiveLinks();
                  this.isActive !== t &&
                    ((this.isActive = t),
                    this.cdr.markForCheck(),
                    this.classes.forEach((e) => {
                      t
                        ? this.renderer.addClass(this.element.nativeElement, e)
                        : this.renderer.removeClass(
                            this.element.nativeElement,
                            e
                          );
                    }));
                });
            }
            isLinkActive(t) {
              return (e) =>
                t.isActive(e.urlTree, this.routerLinkActiveOptions.exact);
            }
            hasActiveLinks() {
              const t = this.isLinkActive(this.router);
              return (
                (this.link && t(this.link)) ||
                (this.linkWithHref && t(this.linkWithHref)) ||
                this.links.some(t) ||
                this.linksWithHrefs.some(t)
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                hi(Od),
                hi(Vi),
                hi(zi),
                hi(co),
                hi(Pd, 8),
                hi(jd, 8)
              );
            }),
            (t.ɵdir = Vt({
              type: t,
              selectors: [["", "routerLinkActive", ""]],
              contentQueries: function (t, e, n) {
                if ((1 & t && (Xo(n, Pd, !0), Xo(n, jd, !0)), 2 & t)) {
                  let t;
                  Yo((t = ta())) && (e.links = t),
                    Yo((t = ta())) && (e.linksWithHrefs = t);
                }
              },
              inputs: {
                routerLinkActiveOptions: "routerLinkActiveOptions",
                routerLinkActive: "routerLinkActive",
              },
              exportAs: ["routerLinkActive"],
              features: [ie],
            })),
            t
          );
        })(),
        Dd = (() => {
          class t {
            constructor(t, e, n, r, s) {
              (this.parentContexts = t),
                (this.location = e),
                (this.resolver = n),
                (this.changeDetector = s),
                (this.activated = null),
                (this._activatedRoute = null),
                (this.activateEvents = new Mo()),
                (this.deactivateEvents = new Mo()),
                (this.name = r || xc),
                t.onChildOutletCreated(this.name, this);
            }
            ngOnDestroy() {
              this.parentContexts.onChildOutletDestroyed(this.name);
            }
            ngOnInit() {
              if (!this.activated) {
                const t = this.parentContexts.getContext(this.name);
                t &&
                  t.route &&
                  (t.attachRef
                    ? this.attach(t.attachRef, t.route)
                    : this.activateWith(t.route, t.resolver || null));
              }
            }
            get isActivated() {
              return !!this.activated;
            }
            get component() {
              if (!this.activated) throw new Error("Outlet is not activated");
              return this.activated.instance;
            }
            get activatedRoute() {
              if (!this.activated) throw new Error("Outlet is not activated");
              return this._activatedRoute;
            }
            get activatedRouteData() {
              return this._activatedRoute
                ? this._activatedRoute.snapshot.data
                : {};
            }
            detach() {
              if (!this.activated) throw new Error("Outlet is not activated");
              this.location.detach();
              const t = this.activated;
              return (this.activated = null), (this._activatedRoute = null), t;
            }
            attach(t, e) {
              (this.activated = t),
                (this._activatedRoute = e),
                this.location.insert(t.hostView);
            }
            deactivate() {
              if (this.activated) {
                const t = this.component;
                this.activated.destroy(),
                  (this.activated = null),
                  (this._activatedRoute = null),
                  this.deactivateEvents.emit(t);
              }
            }
            activateWith(t, e) {
              if (this.isActivated)
                throw new Error("Cannot activate an already activated outlet");
              this._activatedRoute = t;
              const n = (e = e || this.resolver).resolveComponentFactory(
                  t._futureSnapshot.routeConfig.component
                ),
                r = this.parentContexts.getOrCreateContext(this.name).children,
                s = new Ld(t, r, this.location.injector);
              (this.activated = this.location.createComponent(
                n,
                this.location.length,
                s
              )),
                this.changeDetector.markForCheck(),
                this.activateEvents.emit(this.activated.instance);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(hi(Ed), hi(xo), hi(Li), Nn("name"), hi(co));
            }),
            (t.ɵdir = Vt({
              type: t,
              selectors: [["router-outlet"]],
              outputs: {
                activateEvents: "activate",
                deactivateEvents: "deactivate",
              },
              exportAs: ["outlet"],
            })),
            t
          );
        })();
      class Ld {
        constructor(t, e, n) {
          (this.route = t), (this.childContexts = e), (this.parent = n);
        }
        get(t, e) {
          return t === ph
            ? this.route
            : t === Ed
            ? this.childContexts
            : this.parent.get(t, e);
        }
      }
      class Hd {}
      class Fd {
        preload(t, e) {
          return fu(null);
        }
      }
      let Md = (() => {
          class t {
            constructor(t, e, n, r, s) {
              (this.router = t),
                (this.injector = r),
                (this.preloadingStrategy = s),
                (this.loader = new xd(
                  e,
                  n,
                  (e) => t.triggerEvent(new yc(e)),
                  (e) => t.triggerEvent(new vc(e))
                ));
            }
            setUpPreloading() {
              this.subscription = this.router.events
                .pipe(
                  ku((t) => t instanceof uc),
                  Xu(() => this.preload())
                )
                .subscribe(() => {});
            }
            preload() {
              const t = this.injector.get(bo);
              return this.processRoutes(t, this.router.config);
            }
            ngOnDestroy() {
              this.subscription && this.subscription.unsubscribe();
            }
            processRoutes(t, e) {
              const n = [];
              for (const r of e)
                if (r.loadChildren && !r.canLoad && r._loadedConfig) {
                  const t = r._loadedConfig;
                  n.push(this.processRoutes(t.module, t.routes));
                } else
                  r.loadChildren && !r.canLoad
                    ? n.push(this.preloadConfig(t, r))
                    : r.children && n.push(this.processRoutes(t, r.children));
              return D(n).pipe(
                z(),
                E((t) => {})
              );
            }
            preloadConfig(t, e) {
              return this.preloadingStrategy.preload(e, () =>
                this.loader
                  .load(t.injector, e)
                  .pipe(
                    M(
                      (t) => (
                        (e._loadedConfig = t),
                        this.processRoutes(t.module, t.routes)
                      )
                    )
                  )
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(er(Od), er(Ga), er(ba), er(ei), er(Hd));
            }),
            (t.ɵprov = st({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Vd = (() => {
          class t {
            constructor(t, e, n = {}) {
              (this.router = t),
                (this.viewportScroller = e),
                (this.options = n),
                (this.lastId = 0),
                (this.lastSource = "imperative"),
                (this.restoredId = 0),
                (this.store = {}),
                (n.scrollPositionRestoration =
                  n.scrollPositionRestoration || "disabled"),
                (n.anchorScrolling = n.anchorScrolling || "disabled");
            }
            init() {
              "disabled" !== this.options.scrollPositionRestoration &&
                this.viewportScroller.setHistoryScrollRestoration("manual"),
                (this.routerEventsSubscription = this.createScrollEvents()),
                (this.scrollEventsSubscription = this.consumeScrollEvents());
            }
            createScrollEvents() {
              return this.router.events.subscribe((t) => {
                t instanceof lc
                  ? ((this.store[
                      this.lastId
                    ] = this.viewportScroller.getScrollPosition()),
                    (this.lastSource = t.navigationTrigger),
                    (this.restoredId = t.restoredState
                      ? t.restoredState.navigationId
                      : 0))
                  : t instanceof uc &&
                    ((this.lastId = t.id),
                    this.scheduleScrollEvent(
                      t,
                      this.router.parseUrl(t.urlAfterRedirects).fragment
                    ));
              });
            }
            consumeScrollEvents() {
              return this.router.events.subscribe((t) => {
                t instanceof Cc &&
                  (t.position
                    ? "top" === this.options.scrollPositionRestoration
                      ? this.viewportScroller.scrollToPosition([0, 0])
                      : "enabled" === this.options.scrollPositionRestoration &&
                        this.viewportScroller.scrollToPosition(t.position)
                    : t.anchor && "enabled" === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(t.anchor)
                    : "disabled" !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]));
              });
            }
            scheduleScrollEvent(t, e) {
              this.router.triggerEvent(
                new Cc(
                  t,
                  "popstate" === this.lastSource
                    ? this.store[this.restoredId]
                    : null,
                  e
                )
              );
            }
            ngOnDestroy() {
              this.routerEventsSubscription &&
                this.routerEventsSubscription.unsubscribe(),
                this.scrollEventsSubscription &&
                  this.scrollEventsSubscription.unsubscribe();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(er(Od), er(Ll), er(void 0));
            }),
            (t.ɵprov = st({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const $d = new Ln("ROUTER_CONFIGURATION"),
        zd = new Ln("ROUTER_FORROOT_GUARD"),
        qd = [
          vl,
          { provide: qc, useClass: Bc },
          {
            provide: Od,
            useFactory: function (t, e, n, r, s, i, o, a = {}, l, u) {
              const c = new Od(null, t, e, n, r, s, i, Oc(o));
              if (
                (l && (c.urlHandlingStrategy = l),
                u && (c.routeReuseStrategy = u),
                (function (t, e) {
                  t.errorHandler && (e.errorHandler = t.errorHandler),
                    t.malformedUriErrorHandler &&
                      (e.malformedUriErrorHandler = t.malformedUriErrorHandler),
                    t.onSameUrlNavigation &&
                      (e.onSameUrlNavigation = t.onSameUrlNavigation),
                    t.paramsInheritanceStrategy &&
                      (e.paramsInheritanceStrategy =
                        t.paramsInheritanceStrategy),
                    t.relativeLinkResolution &&
                      (e.relativeLinkResolution = t.relativeLinkResolution),
                    t.urlUpdateStrategy &&
                      (e.urlUpdateStrategy = t.urlUpdateStrategy);
                })(a, c),
                a.enableTracing)
              ) {
                const t = nl();
                c.events.subscribe((e) => {
                  t.logGroup("Router Event: " + e.constructor.name),
                    t.log(e.toString()),
                    t.log(e),
                    t.logGroupEnd();
                });
              }
              return c;
            },
            deps: [
              qc,
              Ed,
              vl,
              ei,
              Ga,
              ba,
              Cd,
              $d,
              [class {}, new Bn()],
              [class {}, new Bn()],
            ],
          },
          Ed,
          {
            provide: ph,
            useFactory: function (t) {
              return t.routerState.root;
            },
            deps: [Od],
          },
          { provide: Ga, useClass: Ka },
          Md,
          Fd,
          class {
            preload(t, e) {
              return e().pipe(Ku(() => fu(null)));
            }
          },
          { provide: $d, useValue: { enableTracing: !1 } },
        ];
      function Bd() {
        return new Ma("Router", Od);
      }
      let Wd = (() => {
        class t {
          constructor(t, e) {}
          static forRoot(e, n) {
            return {
              ngModule: t,
              providers: [
                qd,
                Kd(e),
                {
                  provide: zd,
                  useFactory: Qd,
                  deps: [[Od, new Bn(), new Gn()]],
                },
                { provide: $d, useValue: n || {} },
                {
                  provide: pl,
                  useFactory: Zd,
                  deps: [sl, [new qn(gl), new Bn()], $d],
                },
                { provide: Vd, useFactory: Gd, deps: [Od, Ll, $d] },
                {
                  provide: Hd,
                  useExisting:
                    n && n.preloadingStrategy ? n.preloadingStrategy : Fd,
                },
                { provide: Ma, multi: !0, useFactory: Bd },
                [
                  Jd,
                  { provide: ra, multi: !0, useFactory: Yd, deps: [Jd] },
                  { provide: tp, useFactory: Xd, deps: [Jd] },
                  { provide: ca, multi: !0, useExisting: tp },
                ],
              ],
            };
          }
          static forChild(e) {
            return { ngModule: t, providers: [Kd(e)] };
          }
        }
        return (
          (t.ɵmod = Ft({ type: t })),
          (t.ɵinj = it({
            factory: function (e) {
              return new (e || t)(er(zd, 8), er(Od, 8));
            },
          })),
          t
        );
      })();
      function Gd(t, e, n) {
        return n.scrollOffset && e.setOffset(n.scrollOffset), new Vd(t, e, n);
      }
      function Zd(t, e, n = {}) {
        return n.useHash ? new yl(t, e) : new ml(t, e);
      }
      function Qd(t) {
        return "guarded";
      }
      function Kd(t) {
        return [
          { provide: Hn, multi: !0, useValue: t },
          { provide: Cd, multi: !0, useValue: t },
        ];
      }
      let Jd = (() => {
        class t {
          constructor(t) {
            (this.injector = t),
              (this.initNavigation = !1),
              (this.resultOfPreactivationDone = new C());
          }
          appInitializer() {
            return this.injector.get(ol, Promise.resolve(null)).then(() => {
              let t = null;
              const e = new Promise((e) => (t = e)),
                n = this.injector.get(Od),
                r = this.injector.get($d);
              return (
                "disabled" === r.initialNavigation
                  ? (n.setUpLocationChangeListener(), t(!0))
                  : "enabled" === r.initialNavigation ||
                    "enabledBlocking" === r.initialNavigation
                  ? ((n.hooks.afterPreactivation = () =>
                      this.initNavigation
                        ? fu(null)
                        : ((this.initNavigation = !0),
                          t(!0),
                          this.resultOfPreactivationDone)),
                    n.initialNavigation())
                  : t(!0),
                e
              );
            });
          }
          bootstrapListener(t) {
            const e = this.injector.get($d),
              n = this.injector.get(Md),
              r = this.injector.get(Vd),
              s = this.injector.get(Od),
              i = this.injector.get(Ba);
            t === i.components[0] &&
              (("enabledNonBlocking" !== e.initialNavigation &&
                void 0 !== e.initialNavigation) ||
                s.initialNavigation(),
              n.setUpPreloading(),
              r.init(),
              s.resetRootComponentType(i.componentTypes[0]),
              this.resultOfPreactivationDone.next(null),
              this.resultOfPreactivationDone.complete());
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(er(ei));
          }),
          (t.ɵprov = st({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Yd(t) {
        return t.appInitializer.bind(t);
      }
      function Xd(t) {
        return t.bootstrapListener.bind(t);
      }
      const tp = new Ln("Router Initializer");
      let ep = (() => {
        class t {
          constructor() {}
          ngOnInit() {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = Ut({
            type: t,
            selectors: [["recipes-view-main"]],
            decls: 15,
            vars: 0,
            template: function (t, e) {
              1 & t &&
                (fi(0, "p"),
                fi(1, "b"),
                Si(2, " Marie's Recipes"),
                gi(),
                gi(),
                fi(3, "p"),
                Si(4, "Thanks for stopping by."),
                gi(),
                fi(5, "p"),
                Si(
                  6,
                  "All recipes found here are among my personal favorites."
                ),
                gi(),
                fi(7, "p"),
                Si(
                  8,
                  " This cheesecake is absolutely delicious. Yes, it really does call for 1/3 cup of lemon juice. I was surprised when I seen the recipe (after tasting the cheesecake) because I never would have guessed. After asking if my mom was absolutely sure it was really 1/3 cup of lemon juice, I tried making it according to the directions. Apparently it was right because there were no left overs.\n"
                ),
                gi(),
                fi(9, "p"),
                Si(
                  10,
                  ' Some of the moistest chocolate cake you will ever taste. When I was little my mom made sure I did not know what was in the cake. Finally when I got older and begged her for the recipe she handed me this recipe for "Salad Dressing" cake. You make it with mayonaise. I hate mayonaise and was sure was mistaken. She promised that this was the cake she always made. It turns out that it really was the correct recipe, the secret to the super moist cake is the mayonaise.\n'
                ),
                gi(),
                fi(11, "p"),
                Si(
                  12,
                  " The Tator Tot Casserole is absolutely a favorite around our house. It is fairly simple to make and is very filling. I added green beans to the recipe to try to add some vegetables to our diet (I was hoping the kids would not notice them). Everybody loved it, the green beans enhanced the flavor. Now I almost always make it with the green beans added, my whole family prefers it that way.\n"
                ),
                gi(),
                fi(13, "p"),
                Si(
                  14,
                  " Anyway, I have talked enough. I hope you and your family will enjoy these recipes as much as we do.\n"
                ),
                gi());
            },
            styles: [""],
          })),
          t
        );
      })();
      var np,
        rp = new Uint8Array(16);
      function sp() {
        if (
          !np &&
          !(np =
            ("undefined" != typeof crypto &&
              crypto.getRandomValues &&
              crypto.getRandomValues.bind(crypto)) ||
            ("undefined" != typeof msCrypto &&
              "function" == typeof msCrypto.getRandomValues &&
              msCrypto.getRandomValues.bind(msCrypto)))
        )
          throw new Error(
            "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
          );
        return np(rp);
      }
      for (
        var ip = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,
          op = function (t) {
            return "string" == typeof t && ip.test(t);
          },
          ap = [],
          lp = 0;
        lp < 256;
        ++lp
      )
        ap.push((lp + 256).toString(16).substr(1));
      var up = function (t, e, n) {
        var r = (t = t || {}).random || (t.rng || sp)();
        if (((r[6] = (15 & r[6]) | 64), (r[8] = (63 & r[8]) | 128), e)) {
          n = n || 0;
          for (var s = 0; s < 16; ++s) e[n + s] = r[s];
          return e;
        }
        return (function (t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 0,
            n = (
              ap[t[e + 0]] +
              ap[t[e + 1]] +
              ap[t[e + 2]] +
              ap[t[e + 3]] +
              "-" +
              ap[t[e + 4]] +
              ap[t[e + 5]] +
              "-" +
              ap[t[e + 6]] +
              ap[t[e + 7]] +
              "-" +
              ap[t[e + 8]] +
              ap[t[e + 9]] +
              "-" +
              ap[t[e + 10]] +
              ap[t[e + 11]] +
              ap[t[e + 12]] +
              ap[t[e + 13]] +
              ap[t[e + 14]] +
              ap[t[e + 15]]
            ).toLowerCase();
          if (!op(n)) throw TypeError("Stringified UUID is invalid");
          return n;
        })(r);
      };
      function cp(t) {
        return (
          (t.name = t.name || "Unknown Ingredient"),
          (t.measure = t.measure || "1"),
          (t.linkedItem = t.linkedItem || void 0),
          t.linkedItem instanceof v &&
            console.log(
              t.linkedItem
                .pipe(
                  nc((e) => {
                    console.log(t.name),
                      (t.name =
                        (null == e ? void 0 : e.name) || "Unknown Link");
                  })
                )
                .subscribe()
            ),
          t
        );
      }
      class hp {}
      class dp {}
      class pp {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  "string" == typeof t
                    ? () => {
                        (this.headers = new Map()),
                          t.split("\n").forEach((t) => {
                            const e = t.indexOf(":");
                            if (e > 0) {
                              const n = t.slice(0, e),
                                r = n.toLowerCase(),
                                s = t.slice(e + 1).trim();
                              this.maybeSetNormalizedName(n, r),
                                this.headers.has(r)
                                  ? this.headers.get(r).push(s)
                                  : this.headers.set(r, [s]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(t).forEach((e) => {
                            let n = t[e];
                            const r = e.toLowerCase();
                            "string" == typeof n && (n = [n]),
                              n.length > 0 &&
                                (this.headers.set(r, n),
                                this.maybeSetNormalizedName(e, r));
                          });
                      })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const e = this.headers.get(t.toLowerCase());
          return e && e.length > 0 ? e[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, e) {
          return this.clone({ name: t, value: e, op: "a" });
        }
        set(t, e) {
          return this.clone({ name: t, value: e, op: "s" });
        }
        delete(t, e) {
          return this.clone({ name: t, value: e, op: "d" });
        }
        maybeSetNormalizedName(t, e) {
          this.normalizedNames.has(e) || this.normalizedNames.set(e, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof pp
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((e) => {
              this.headers.set(e, t.headers.get(e)),
                this.normalizedNames.set(e, t.normalizedNames.get(e));
            });
        }
        clone(t) {
          const e = new pp();
          return (
            (e.lazyInit =
              this.lazyInit && this.lazyInit instanceof pp
                ? this.lazyInit
                : this),
            (e.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            e
          );
        }
        applyUpdate(t) {
          const e = t.name.toLowerCase();
          switch (t.op) {
            case "a":
            case "s":
              let n = t.value;
              if (("string" == typeof n && (n = [n]), 0 === n.length)) return;
              this.maybeSetNormalizedName(t.name, e);
              const r = ("a" === t.op ? this.headers.get(e) : void 0) || [];
              r.push(...n), this.headers.set(e, r);
              break;
            case "d":
              const s = t.value;
              if (s) {
                let t = this.headers.get(e);
                if (!t) return;
                (t = t.filter((t) => -1 === s.indexOf(t))),
                  0 === t.length
                    ? (this.headers.delete(e), this.normalizedNames.delete(e))
                    : this.headers.set(e, t);
              } else this.headers.delete(e), this.normalizedNames.delete(e);
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((e) =>
              t(this.normalizedNames.get(e), this.headers.get(e))
            );
        }
      }
      class fp {
        encodeKey(t) {
          return gp(t);
        }
        encodeValue(t) {
          return gp(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      function gp(t) {
        return encodeURIComponent(t)
          .replace(/%40/gi, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/gi, "$")
          .replace(/%2C/gi, ",")
          .replace(/%3B/gi, ";")
          .replace(/%2B/gi, "+")
          .replace(/%3D/gi, "=")
          .replace(/%3F/gi, "?")
          .replace(/%2F/gi, "/");
      }
      class mp {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new fp()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function (t, e) {
              const n = new Map();
              return (
                t.length > 0 &&
                  t.split("&").forEach((t) => {
                    const r = t.indexOf("="),
                      [s, i] =
                        -1 == r
                          ? [e.decodeKey(t), ""]
                          : [
                              e.decodeKey(t.slice(0, r)),
                              e.decodeValue(t.slice(r + 1)),
                            ],
                      o = n.get(s) || [];
                    o.push(i), n.set(s, o);
                  }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((e) => {
                  const n = t.fromObject[e];
                  this.map.set(e, Array.isArray(n) ? n : [n]);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const e = this.map.get(t);
          return e ? e[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, e) {
          return this.clone({ param: t, value: e, op: "a" });
        }
        set(t, e) {
          return this.clone({ param: t, value: e, op: "s" });
        }
        delete(t, e) {
          return this.clone({ param: t, value: e, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const e = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((t) => e + "=" + this.encoder.encodeValue(t))
                  .join("&");
              })
              .filter((t) => "" !== t)
              .join("&")
          );
        }
        clone(t) {
          const e = new mp({ encoder: this.encoder });
          return (
            (e.cloneFrom = this.cloneFrom || this),
            (e.updates = (this.updates || []).concat([t])),
            e
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const e =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                    e.push(t.value), this.map.set(t.param, e);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let e = this.map.get(t.param) || [];
                      const n = e.indexOf(t.value);
                      -1 !== n && e.splice(n, 1),
                        e.length > 0
                          ? this.map.set(t.param, e)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      function yp(t) {
        return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer;
      }
      function vp(t) {
        return "undefined" != typeof Blob && t instanceof Blob;
      }
      function wp(t) {
        return "undefined" != typeof FormData && t instanceof FormData;
      }
      class _p {
        constructor(t, e, n, r) {
          let s;
          if (
            ((this.url = e),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function (t) {
              switch (t) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || r
              ? ((this.body = void 0 !== n ? n : null), (s = r))
              : (s = n),
            s &&
              ((this.reportProgress = !!s.reportProgress),
              (this.withCredentials = !!s.withCredentials),
              s.responseType && (this.responseType = s.responseType),
              s.headers && (this.headers = s.headers),
              s.params && (this.params = s.params)),
            this.headers || (this.headers = new pp()),
            this.params)
          ) {
            const t = this.params.toString();
            if (0 === t.length) this.urlWithParams = e;
            else {
              const n = e.indexOf("?");
              this.urlWithParams =
                e + (-1 === n ? "?" : n < e.length - 1 ? "&" : "") + t;
            }
          } else (this.params = new mp()), (this.urlWithParams = e);
        }
        serializeBody() {
          return null === this.body
            ? null
            : yp(this.body) ||
              vp(this.body) ||
              wp(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof mp
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || wp(this.body)
            ? null
            : vp(this.body)
            ? this.body.type || null
            : yp(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof mp
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              Array.isArray(this.body)
            ? "application/json"
            : null;
        }
        clone(t = {}) {
          const e = t.method || this.method,
            n = t.url || this.url,
            r = t.responseType || this.responseType,
            s = void 0 !== t.body ? t.body : this.body,
            i =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            o =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let a = t.headers || this.headers,
            l = t.params || this.params;
          return (
            void 0 !== t.setHeaders &&
              (a = Object.keys(t.setHeaders).reduce(
                (e, n) => e.set(n, t.setHeaders[n]),
                a
              )),
            t.setParams &&
              (l = Object.keys(t.setParams).reduce(
                (e, n) => e.set(n, t.setParams[n]),
                l
              )),
            new _p(e, n, s, {
              params: l,
              headers: a,
              reportProgress: o,
              responseType: r,
              withCredentials: i,
            })
          );
        }
      }
      var bp = (function (t) {
        return (
          (t[(t.Sent = 0)] = "Sent"),
          (t[(t.UploadProgress = 1)] = "UploadProgress"),
          (t[(t.ResponseHeader = 2)] = "ResponseHeader"),
          (t[(t.DownloadProgress = 3)] = "DownloadProgress"),
          (t[(t.Response = 4)] = "Response"),
          (t[(t.User = 5)] = "User"),
          t
        );
      })({});
      class Sp {
        constructor(t, e = 200, n = "OK") {
          (this.headers = t.headers || new pp()),
            (this.status = void 0 !== t.status ? t.status : e),
            (this.statusText = t.statusText || n),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class Cp extends Sp {
        constructor(t = {}) {
          super(t), (this.type = bp.ResponseHeader);
        }
        clone(t = {}) {
          return new Cp({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class xp extends Sp {
        constructor(t = {}) {
          super(t),
            (this.type = bp.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new xp({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class Tp extends Sp {
        constructor(t) {
          super(t, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? "Http failure during parsing for " +
                  (t.url || "(unknown url)")
                : `Http failure response for ${t.url || "(unknown url)"}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function Ep(t, e) {
        return {
          body: e,
          headers: t.headers,
          observe: t.observe,
          params: t.params,
          reportProgress: t.reportProgress,
          responseType: t.responseType,
          withCredentials: t.withCredentials,
        };
      }
      let kp = (() => {
        class t {
          constructor(t) {
            this.handler = t;
          }
          request(t, e, n = {}) {
            let r;
            if (t instanceof _p) r = t;
            else {
              let s = void 0;
              s = n.headers instanceof pp ? n.headers : new pp(n.headers);
              let i = void 0;
              n.params &&
                (i =
                  n.params instanceof mp
                    ? n.params
                    : new mp({ fromObject: n.params })),
                (r = new _p(t, e, void 0 !== n.body ? n.body : null, {
                  headers: s,
                  params: i,
                  reportProgress: n.reportProgress,
                  responseType: n.responseType || "json",
                  withCredentials: n.withCredentials,
                }));
            }
            const s = fu(r).pipe(Xu((t) => this.handler.handle(t)));
            if (t instanceof _p || "events" === n.observe) return s;
            const i = s.pipe(ku((t) => t instanceof xp));
            switch (n.observe || "body") {
              case "body":
                switch (r.responseType) {
                  case "arraybuffer":
                    return i.pipe(
                      E((t) => {
                        if (null !== t.body && !(t.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return t.body;
                      })
                    );
                  case "blob":
                    return i.pipe(
                      E((t) => {
                        if (null !== t.body && !(t.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return t.body;
                      })
                    );
                  case "text":
                    return i.pipe(
                      E((t) => {
                        if (null !== t.body && "string" != typeof t.body)
                          throw new Error("Response is not a string.");
                        return t.body;
                      })
                    );
                  case "json":
                  default:
                    return i.pipe(E((t) => t.body));
                }
              case "response":
                return i;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${n.observe}}`
                );
            }
          }
          delete(t, e = {}) {
            return this.request("DELETE", t, e);
          }
          get(t, e = {}) {
            return this.request("GET", t, e);
          }
          head(t, e = {}) {
            return this.request("HEAD", t, e);
          }
          jsonp(t, e) {
            return this.request("JSONP", t, {
              params: new mp().append(e, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(t, e = {}) {
            return this.request("OPTIONS", t, e);
          }
          patch(t, e, n = {}) {
            return this.request("PATCH", t, Ep(n, e));
          }
          post(t, e, n = {}) {
            return this.request("POST", t, Ep(n, e));
          }
          put(t, e, n = {}) {
            return this.request("PUT", t, Ep(n, e));
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(er(hp));
          }),
          (t.ɵprov = st({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Ap {
        constructor(t, e) {
          (this.next = t), (this.interceptor = e);
        }
        handle(t) {
          return this.interceptor.intercept(t, this.next);
        }
      }
      const Rp = new Ln("HTTP_INTERCEPTORS");
      let Ip = (() => {
        class t {
          intercept(t, e) {
            return e.handle(t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = st({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Op = /^\)\]\}',?\n/;
      class Pp {}
      let jp = (() => {
          class t {
            constructor() {}
            build() {
              return new XMLHttpRequest();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = st({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Np = (() => {
          class t {
            constructor(t) {
              this.xhrFactory = t;
            }
            handle(t) {
              if ("JSONP" === t.method)
                throw new Error(
                  "Attempted to construct Jsonp request without HttpClientJsonpModule installed."
                );
              return new v((e) => {
                const n = this.xhrFactory.build();
                if (
                  (n.open(t.method, t.urlWithParams),
                  t.withCredentials && (n.withCredentials = !0),
                  t.headers.forEach((t, e) =>
                    n.setRequestHeader(t, e.join(","))
                  ),
                  t.headers.has("Accept") ||
                    n.setRequestHeader(
                      "Accept",
                      "application/json, text/plain, */*"
                    ),
                  !t.headers.has("Content-Type"))
                ) {
                  const e = t.detectContentTypeHeader();
                  null !== e && n.setRequestHeader("Content-Type", e);
                }
                if (t.responseType) {
                  const e = t.responseType.toLowerCase();
                  n.responseType = "json" !== e ? e : "text";
                }
                const r = t.serializeBody();
                let s = null;
                const i = () => {
                    if (null !== s) return s;
                    const e = 1223 === n.status ? 204 : n.status,
                      r = n.statusText || "OK",
                      i = new pp(n.getAllResponseHeaders()),
                      o =
                        (function (t) {
                          return "responseURL" in t && t.responseURL
                            ? t.responseURL
                            : /^X-Request-URL:/m.test(t.getAllResponseHeaders())
                            ? t.getResponseHeader("X-Request-URL")
                            : null;
                        })(n) || t.url;
                    return (
                      (s = new Cp({
                        headers: i,
                        status: e,
                        statusText: r,
                        url: o,
                      })),
                      s
                    );
                  },
                  o = () => {
                    let { headers: r, status: s, statusText: o, url: a } = i(),
                      l = null;
                    204 !== s &&
                      (l = void 0 === n.response ? n.responseText : n.response),
                      0 === s && (s = l ? 200 : 0);
                    let u = s >= 200 && s < 300;
                    if ("json" === t.responseType && "string" == typeof l) {
                      const t = l;
                      l = l.replace(Op, "");
                      try {
                        l = "" !== l ? JSON.parse(l) : null;
                      } catch (c) {
                        (l = t), u && ((u = !1), (l = { error: c, text: l }));
                      }
                    }
                    u
                      ? (e.next(
                          new xp({
                            body: l,
                            headers: r,
                            status: s,
                            statusText: o,
                            url: a || void 0,
                          })
                        ),
                        e.complete())
                      : e.error(
                          new Tp({
                            error: l,
                            headers: r,
                            status: s,
                            statusText: o,
                            url: a || void 0,
                          })
                        );
                  },
                  a = (t) => {
                    const { url: r } = i(),
                      s = new Tp({
                        error: t,
                        status: n.status || 0,
                        statusText: n.statusText || "Unknown Error",
                        url: r || void 0,
                      });
                    e.error(s);
                  };
                let l = !1;
                const u = (r) => {
                    l || (e.next(i()), (l = !0));
                    let s = { type: bp.DownloadProgress, loaded: r.loaded };
                    r.lengthComputable && (s.total = r.total),
                      "text" === t.responseType &&
                        n.responseText &&
                        (s.partialText = n.responseText),
                      e.next(s);
                  },
                  c = (t) => {
                    let n = { type: bp.UploadProgress, loaded: t.loaded };
                    t.lengthComputable && (n.total = t.total), e.next(n);
                  };
                return (
                  n.addEventListener("load", o),
                  n.addEventListener("error", a),
                  t.reportProgress &&
                    (n.addEventListener("progress", u),
                    null !== r &&
                      n.upload &&
                      n.upload.addEventListener("progress", c)),
                  n.send(r),
                  e.next({ type: bp.Sent }),
                  () => {
                    n.removeEventListener("error", a),
                      n.removeEventListener("load", o),
                      t.reportProgress &&
                        (n.removeEventListener("progress", u),
                        null !== r &&
                          n.upload &&
                          n.upload.removeEventListener("progress", c)),
                      n.readyState !== n.DONE && n.abort();
                  }
                );
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(er(Pp));
            }),
            (t.ɵprov = st({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const Up = new Ln("XSRF_COOKIE_NAME"),
        Dp = new Ln("XSRF_HEADER_NAME");
      class Lp {}
      let Hp = (() => {
          class t {
            constructor(t, e, n) {
              (this.doc = t),
                (this.platform = e),
                (this.cookieName = n),
                (this.lastCookieString = ""),
                (this.lastToken = null),
                (this.parseCount = 0);
            }
            getToken() {
              if ("server" === this.platform) return null;
              const t = this.doc.cookie || "";
              return (
                t !== this.lastCookieString &&
                  (this.parseCount++,
                  (this.lastToken = xl(t, this.cookieName)),
                  (this.lastCookieString = t)),
                this.lastToken
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(er(rl), er(ua), er(Up));
            }),
            (t.ɵprov = st({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Fp = (() => {
          class t {
            constructor(t, e) {
              (this.tokenService = t), (this.headerName = e);
            }
            intercept(t, e) {
              const n = t.url.toLowerCase();
              if (
                "GET" === t.method ||
                "HEAD" === t.method ||
                n.startsWith("http://") ||
                n.startsWith("https://")
              )
                return e.handle(t);
              const r = this.tokenService.getToken();
              return (
                null === r ||
                  t.headers.has(this.headerName) ||
                  (t = t.clone({ headers: t.headers.set(this.headerName, r) })),
                e.handle(t)
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(er(Lp), er(Dp));
            }),
            (t.ɵprov = st({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Mp = (() => {
          class t {
            constructor(t, e) {
              (this.backend = t), (this.injector = e), (this.chain = null);
            }
            handle(t) {
              if (null === this.chain) {
                const t = this.injector.get(Rp, []);
                this.chain = t.reduceRight(
                  (t, e) => new Ap(t, e),
                  this.backend
                );
              }
              return this.chain.handle(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(er(dp), er(ei));
            }),
            (t.ɵprov = st({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Vp = (() => {
          class t {
            static disable() {
              return {
                ngModule: t,
                providers: [{ provide: Fp, useClass: Ip }],
              };
            }
            static withOptions(e = {}) {
              return {
                ngModule: t,
                providers: [
                  e.cookieName ? { provide: Up, useValue: e.cookieName } : [],
                  e.headerName ? { provide: Dp, useValue: e.headerName } : [],
                ],
              };
            }
          }
          return (
            (t.ɵmod = Ft({ type: t })),
            (t.ɵinj = it({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [
                Fp,
                { provide: Rp, useExisting: Fp, multi: !0 },
                { provide: Lp, useClass: Hp },
                { provide: Up, useValue: "XSRF-TOKEN" },
                { provide: Dp, useValue: "X-XSRF-TOKEN" },
              ],
            })),
            t
          );
        })(),
        $p = (() => {
          class t {}
          return (
            (t.ɵmod = Ft({ type: t })),
            (t.ɵinj = it({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [
                kp,
                { provide: hp, useClass: Mp },
                Np,
                { provide: dp, useExisting: Np },
                jp,
                { provide: Pp, useExisting: jp },
              ],
              imports: [
                [
                  Vp.withOptions({
                    cookieName: "XSRF-TOKEN",
                    headerName: "X-XSRF-TOKEN",
                  }),
                ],
              ],
            })),
            t
          );
        })(),
        zp = (() => {
          class t {
            constructor(t) {
              (this.http = t),
                (this._allItems = new gu([])),
                (this.allItems = this._allItems.asObservable()),
                (this._itemsById = {}),
                (this.addItemPipe = E((t) => {
                  (this._itemsById[t.id] = t), (this._itemsById[t.slug] = t);
                })),
                this.loadAllRecipes(),
                this.findBySlug("cake").subscribe((t) => console.log(t)),
                this.allItems
                  .pipe(nc((t) => console.log(t, this._itemsById)))
                  .subscribe();
            }
            loadAllRecipes() {
              this.http
                .get("/assets/data/original-recipes.json")
                .pipe(
                  qu(1),
                  E((t) => t),
                  nc((t) =>
                    t.forEach((t) =>
                      t.ingredients.forEach((t, e) => {
                        t.link &&
                          (console.log(t.link),
                          (t.linkedItem = this.findOneBySlug(t.link.id)));
                      })
                    )
                  ),
                  E((t) =>
                    t.map((t) =>
                      (function (t) {
                        return (
                          (t.id = t.id || up()),
                          (t.name = t.name || "Unknown Dish"),
                          (t.slug =
                            t.slug || t.name.toLowerCase().replace(/ /g, "-")),
                          (t.authors = t.authors || []),
                          (t.ingredients = t.ingredients || []),
                          (t.directions = t.directions || []),
                          (t.authors = t.authors.map((t) => t)),
                          (t.ingredients = t.ingredients.map(cp)),
                          (t.directions = t.directions.map((t) => t)),
                          t
                        );
                      })(t)
                    )
                  ),
                  nc((t) => D(t).pipe(this.addItemPipe).subscribe()),
                  nc((t) => this._allItems.next(t))
                )
                .subscribe();
            }
            findOneBySlug(t) {
              return this.findBySlug(t).pipe(E((t) => t[0]));
            }
            findBySlug(t) {
              return (
                (t = t.toLowerCase()),
                this.allItems.pipe(
                  E((e) =>
                    this._itemsById[t]
                      ? [this._itemsById[t]]
                      : e.filter(
                          (e) => !!e.slug.includes(t) || !!e.id.includes(t)
                        )
                  )
                )
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(er(kp));
            }),
            (t.ɵprov = st({ token: t, factory: t.ɵfac, providedIn: "root" })),
            t
          );
        })();
      function qp(t, e) {
        if ((1 & t && (Si(0), mi(1, "br")), 2 & t)) {
          const t = e.$implicit;
          Ti(" ", t.measure, " ", t.name, " ");
        }
      }
      function Bp(t, e) {
        if ((1 & t && (fi(0, "p"), Si(1), gi()), 2 & t)) {
          const t = e.$implicit;
          Jr(1), Ci(t);
        }
      }
      function Wp(t, e) {
        if (
          (1 & t &&
            (fi(0, "b"),
            Si(1),
            gi(),
            mi(2, "br"),
            mi(3, "br"),
            ci(4, qp, 2, 2, "ng-template", 2),
            mi(5, "br"),
            ci(6, Bp, 2, 1, "ng-template", 2)),
          2 & t)
        ) {
          const t = (function (t = 1) {
            return (function (t) {
              return (xe.lFrame.contextLView = (function (t, e) {
                for (; t > 0; ) (e = e[15]), t--;
                return e;
              })(t, xe.lFrame.contextLView))[8];
            })(t);
          })();
          Jr(1),
            Ci(t.recipe.name),
            Jr(3),
            di("ngForOf", t.recipe.ingredients),
            Jr(2),
            di("ngForOf", t.recipe.directions);
        }
      }
      function Gp(t, e) {
        1 & t &&
          (fi(0, "p"),
          Si(1, "There doesn't seem to be a recipe here..."),
          gi());
      }
      const Zp = [
        { path: "home", component: ep },
        {
          path: "r/:slug",
          component: (() => {
            class t {
              constructor(t, e, n) {
                (this.recipeService = t),
                  (this.router = e),
                  (this.route = n),
                  (this.slug = ""),
                  (this.subscriptions = new h());
              }
              ngOnInit() {
                let t = this.route.params.pipe(
                  (function (...t) {
                    const e = t.length;
                    if (0 === e)
                      throw new Error("list of properties cannot be empty.");
                    return (n) =>
                      E(
                        (function (t, e) {
                          return (n) => {
                            let r = n;
                            for (let s = 0; s < e; s++) {
                              const e = null != r ? r[t[s]] : void 0;
                              if (void 0 === e) return;
                              r = e;
                            }
                            return r;
                          };
                        })(t, e)
                      )(n);
                  })("slug"),
                  nc((t) => (this.slug = t)),
                  M((t) => this.recipeService.findBySlug(t)),
                  nc((t) => {
                    switch (t.length) {
                      case 0:
                        return void (this.recipe = void 0);
                      case 1:
                        return void (this.recipe = t[0]);
                      default:
                        this.router.navigate(["search", this.slug]);
                    }
                  })
                );
                this.subscriptions.add(t.subscribe());
              }
              ngOnDestroy() {
                this.subscriptions.unsubscribe();
              }
            }
            return (
              (t.ɵfac = function (e) {
                return new (e || t)(hi(zp), hi(Od), hi(ph));
              }),
              (t.ɵcmp = Ut({
                type: t,
                selectors: [["recipes-display-single-recipe"]],
                decls: 3,
                vars: 2,
                consts: [
                  [3, "ngIf", "ngIfElse"],
                  ["noRecipeSorry", ""],
                  ["ngFor", "", 3, "ngForOf"],
                ],
                template: function (t, e) {
                  if (
                    (1 & t &&
                      (ci(0, Wp, 7, 3, "ng-template", 0),
                      ci(1, Gp, 2, 0, "ng-template", null, 1, na)),
                    2 & t)
                  ) {
                    const t = me(xe.lFrame.contextLView, 22);
                    di("ngIf", e.recipe)("ngIfElse", t);
                  }
                },
                directives: [Al, El],
                styles: [""],
              })),
              t
            );
          })(),
        },
        {
          path: "search/:searchTerm",
          component: (() => {
            class t {
              constructor() {}
              ngOnInit() {}
            }
            return (
              (t.ɵfac = function (e) {
                return new (e || t)();
              }),
              (t.ɵcmp = Ut({
                type: t,
                selectors: [["recipes-search"]],
                decls: 2,
                vars: 0,
                template: function (t, e) {
                  1 & t && (fi(0, "p"), Si(1, "search works!"), gi());
                },
                styles: [""],
              })),
              t
            );
          })(),
        },
        { path: "", pathMatch: "full", redirectTo: "home" },
      ];
      let Qp = (() => {
        class t {}
        return (
          (t.ɵmod = Ft({ type: t })),
          (t.ɵinj = it({
            factory: function (e) {
              return new (e || t)();
            },
            imports: [[Wd.forRoot(Zp)], Wd],
          })),
          t
        );
      })();
      const Kp = function (t) {
        return ["r", t];
      };
      function Jp(t, e) {
        if ((1 & t && (fi(0, "a", 1), Si(1), gi()), 2 & t)) {
          const t = e.$implicit;
          di(
            "routerLink",
            (2, (n = Kp), (r = t.slug), Fo(Ee(), Ne(), 2, n, r, undefined))
          ),
            Jr(1),
            xi(" ", t.name, " ");
        }
        var n, r;
      }
      let Yp = (() => {
          class t {
            constructor(t) {
              (this.recipeService = t), (this.recipes = t.allItems);
            }
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(hi(zp));
            }),
            (t.ɵcmp = Ut({
              type: t,
              selectors: [["recipes-side-menu"]],
              decls: 2,
              vars: 3,
              consts: [
                ["ngFor", "", 3, "ngForOf"],
                ["routerLinkActive", "active", 3, "routerLink"],
              ],
              template: function (t, e) {
                1 & t &&
                  (ci(0, Jp, 2, 4, "ng-template", 0),
                  (function (t, e) {
                    const n = ke();
                    let r;
                    n.firstCreatePass
                      ? ((r = (function (t, e) {
                          if (e)
                            for (let n = e.length - 1; n >= 0; n--) {
                              const r = e[n];
                              if (t === r.name) return r;
                            }
                          throw new te(
                            "302",
                            "The pipe 'async' could not be found!"
                          );
                        })("async", n.pipeRegistry)),
                        (n.data[21] = r),
                        r.onDestroy &&
                          (n.destroyHooks || (n.destroyHooks = [])).push(
                            21,
                            r.onDestroy
                          ))
                      : (r = n.data[21]);
                    const s = r.factory || (r.factory = Xt(r.type)),
                      i = gt(hi);
                    try {
                      const t = mn(!1),
                        e = s();
                      mn(t),
                        (function (t, e, n, r) {
                          21 >= t.data.length &&
                            ((t.data[21] = null), (t.blueprint[21] = null)),
                            (e[21] = r);
                        })(n, Ee(), 0, e);
                    } finally {
                      gt(i);
                    }
                  })()),
                  2 & t &&
                    di(
                      "ngForOf",
                      (function (t, e, n) {
                        const r = t + Bt,
                          s = Ee(),
                          i = me(s, r);
                        return (function (t, e) {
                          return (
                            ii.isWrapped(e) &&
                              ((e = ii.unwrap(e)), (t[Ue()] = Kr)),
                            e
                          );
                        })(
                          s,
                          (function (t, e) {
                            return t[1].data[e].pure;
                          })(s, r)
                            ? Fo(s, Ne(), e, i.transform, n, i)
                            : i.transform(n)
                        );
                      })(1, 1, e.recipes)
                    );
              },
              directives: [El, jd, Ud],
              pipes: [Ul],
              styles: [
                "a[_ngcontent-%COMP%]{display:inline-block;box-sizing:border-box;width:100%;margin:.2em auto;padding:.2em .8em;border-radius:.8em;color:#ffc;background-color:#8d4e8d;text-decoration:none}a.active[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:hover{color:#8d4e8d;background-color:#ffc}",
              ],
            })),
            t
          );
        })(),
        Xp = (() => {
          class t {
            constructor() {
              this.title = "recipe-sharing-client";
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = Ut({
              type: t,
              selectors: [["app-root"]],
              decls: 8,
              vars: 0,
              consts: [
                [1, "wrapper"],
                [1, "row"],
                [1, "main"],
              ],
              template: function (t, e) {
                1 & t &&
                  (fi(0, "div", 0),
                  fi(1, "header"),
                  fi(2, "p"),
                  Si(3, "Recipes"),
                  gi(),
                  gi(),
                  fi(4, "div", 1),
                  mi(5, "recipes-side-menu"),
                  fi(6, "nav", 2),
                  mi(7, "router-outlet"),
                  gi(),
                  gi(),
                  gi());
              },
              directives: [Yp, Dd],
              styles: [
                "div.row[_ngcontent-%COMP%]{display:flex;flex-wrap:nowrap}.wrapper[_ngcontent-%COMP%]{max-width:950px;margin:auto;display:flex;flex-wrap:wrap}header[_ngcontent-%COMP%]{border:2px solid #381f38;border-radius:15px;box-shadow:10px 7px 5px #633663;box-sizing:border-box;margin:7.5px;padding:10px;background-color:#f5b3f5;background-image:url(/assets/img/Kauths_Old.gif);background-repeat:no-repeat;min-width:90%;flex-grow:1;color:#8d4e8d}header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{float:right;font-family:FreeStyle Script;font-size:75px;margin-bottom:0}recipes-side-menu[_ngcontent-%COMP%]{background-color:#f5b3f5;max-width:30%}.main[_ngcontent-%COMP%], recipes-side-menu[_ngcontent-%COMP%]{display:inline-block;border:2px solid #381f38;border-radius:15px;box-shadow:10px 7px 5px #633663;box-sizing:border-box;margin:7.5px;padding:10px;min-height:200px}.main[_ngcontent-%COMP%]{background-color:#8d4e8d;color:#ffc;max-width:65%;flex-grow:3}",
              ],
            })),
            t
          );
        })(),
        tf = (() => {
          class t {}
          return (
            (t.ɵmod = Ft({ type: t, bootstrap: [Xp] })),
            (t.ɵinj = it({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [{ provide: gl, useValue: "/recipes" }],
              imports: [[pu, Qp, $p]],
            })),
            t
          );
        })();
      (function () {
        if (La)
          throw new Error("Cannot enable prod mode after platform setup.");
        Da = !1;
      })(),
        hu()
          .bootstrapModule(tf)
          .catch((t) => console.error(t));
    },
    zn8P: function (t, e) {
      function n(t) {
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + t + "'");
          throw ((e.code = "MODULE_NOT_FOUND"), e);
        });
      }
      (n.keys = function () {
        return [];
      }),
        (n.resolve = n),
        (t.exports = n),
        (n.id = "zn8P");
    },
  },
  [[0, 0]],
]);
