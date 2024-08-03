!(function () {
    "use strict";
    var t,
        e = {
            1033: function (t, e, n) {
                var o = n(5318),
                    i = o(n(4575)),
                    a = o(n(3913)),
                    r = o(n(9713));
                Object.defineProperty(e, "__esModule", { value: !0 }),
                    (e.CameraController = e.CAMERA_CONTAINER_NAME = void 0);
                var l = n(7040),
                    u = n(8067);
                e.CAMERA_CONTAINER_NAME = "camera-main";
                var s = (function () {
                    function t() {
                        (0, i.default)(this, t),
                            (0, r.default)(this, "camera", void 0),
                            (0, r.default)(this, "cameraContainer", void 0),
                            (0, r.default)(this, "app", void 0),
                            (this.app = (0, u.getApp)());
                        var e = { ticker: this.app.ticker };
                        this.camera = new l.Camera(e);
                    }
                    return (
                        (0, a.default)(
                            t,
                            [
                                {
                                    key: "screenShake",
                                    value: function (t, e) {
                                        this.camera.effect(new l.Shake(this.app.stage, t, e));
                                    },
                                },
                                {
                                    key: "resetCamera",
                                    value: function () {
                                        this.app.stage.position.set(0, 0);
                                    },
                                },
                            ],
                            [
                                {
                                    key: "getInstance",
                                    value: function () {
                                        return t.instance || (t.instance = new t()), t.instance;
                                    },
                                },
                            ]
                        ),
                        t
                    );
                })();
                (0, r.default)(s, "instance", void 0), (e.CameraController = s);
            },
            8469: function (t, e, n) {
                var o = n(5318);
                n(2222);
                var i = o(n(4575)),
                    a = o(n(3913)),
                    r = o(n(9713));
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.EventController = void 0);
                var l,
                    u = (l = n(6729)) && l.__esModule ? l : { default: l },
                    s = (function () {
                        function t() {
                            (0, i.default)(this, t),
                                (0, r.default)(this, "eventEmitter", void 0),
                                (this.eventEmitter = new u.default());
                        }
                        return (
                            (0, a.default)(
                                t,
                                [
                                    {
                                        key: "on",
                                        value: function (t, e) {
                                            this.eventEmitter.on(t, e);
                                        },
                                    },
                                    {
                                        key: "emit",
                                        value: function (t) {
                                            for (
                                                var e, n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), i = 1;
                                                i < n;
                                                i++
                                            )
                                                o[i - 1] = arguments[i];
                                            (e = this.eventEmitter).emit.apply(e, [t].concat(o));
                                        },
                                    },
                                ],
                                [
                                    {
                                        key: "getInstance",
                                        value: function () {
                                            return t.instance || (t.instance = new t()), t.instance;
                                        },
                                    },
                                ]
                            ),
                            t
                        );
                    })();
                (0, r.default)(s, "instance", void 0), (e.EventController = s);
            },
            6171: function (t, e, n) {
                var o = n(5318);
                n(9826), n(1539), n(4747);
                var i = o(n(4575)),
                    a = o(n(3913)),
                    r = o(n(9713));
                Object.defineProperty(e, "__esModule", { value: !0 }),
                    (e.GamepadController = e.EVENT_ALIASES = e.GamepadAxes = e.GamepadButtons = void 0);
                var l,
                    u,
                    s,
                    c = n(8508),
                    d = n(8067),
                    f = n(1033),
                    h = n(8469),
                    v = n(5239);
                ((s = e.GamepadButtons || (e.GamepadButtons = {}))[(s.FACE_1 = 0)] = "FACE_1"),
                    (s[(s.FACE_2 = 1)] = "FACE_2"),
                    (s[(s.FACE_3 = 2)] = "FACE_3"),
                    (s[(s.FACE_4 = 3)] = "FACE_4"),
                    (s[(s.LEFT_TOP_SHOULDER = 4)] = "LEFT_TOP_SHOULDER"),
                    (s[(s.RIGHT_TOP_SHOULDER = 5)] = "RIGHT_TOP_SHOULDER"),
                    (s[(s.LEFT_BOTTOM_SHOULDER = 6)] = "LEFT_BOTTOM_SHOULDER"),
                    (s[(s.RIGHT_BOTTOM_SHOULDER = 7)] = "RIGHT_BOTTOM_SHOULDER"),
                    (s[(s.SELECT_BACK = 8)] = "SELECT_BACK"),
                    (s[(s.START_FORWARD = 9)] = "START_FORWARD"),
                    (s[(s.LEFT_STICK = 10)] = "LEFT_STICK"),
                    (s[(s.RIGHT_STICK = 11)] = "RIGHT_STICK"),
                    (s[(s.DPAD_UP = 12)] = "DPAD_UP"),
                    (s[(s.DPAD_DOWN = 13)] = "DPAD_DOWN"),
                    (s[(s.DPAD_LEFT = 14)] = "DPAD_LEFT"),
                    (s[(s.DPAD_RIGHT = 15)] = "DPAD_RIGHT"),
                    (s[(s.HOME = 16)] = "HOME"),
                    (function (t) {
                        (t[(t.LEFT_STICK_X = 0)] = "LEFT_STICK_X"),
                            (t[(t.LEFT_STICK_Y = 1)] = "LEFT_STICK_Y"),
                            (t[(t.RIGHT_STICK_X = 2)] = "RIGHT_STICK_X"),
                            (t[(t.RIGHT_STICK_Y = 3)] = "RIGHT_STICK_Y");
                    })((l = e.GamepadAxes || (e.GamepadAxes = {}))),
                    ((u = e.EVENT_ALIASES || (e.EVENT_ALIASES = {})).CONNECT = "connect"),
                    (u.DISCONNECT = "disconnect"),
                    (u.BUTTON_PRESS = "button_press"),
                    (u.AXIS_MOVEMENT = "axis_move");
                var p = (function () {
                    function t(e, n) {
                        (0, i.default)(this, t),
                            (0, r.default)(this, "player", void 0),
                            (0, r.default)(this, "controlMapping", void 0),
                            (0, r.default)(this, "activeGamepad", null),
                            (0, r.default)(this, "events", void 0),
                            (0, r.default)(this, "deadZone", [
                                [-0.34, 0.34],
                                [-0.34, 0.34],
                            ]),
                            (0, r.default)(this, "isActive", !0),
                            (this.player = e),
                            (this.controlMapping = n),
                            (this.events = h.EventController.getInstance()),
                            this.initEvents();
                    }
                    return (
                        (0, a.default)(
                            t,
                            [
                                {
                                    key: "initEvents",
                                    value: function () {
                                        var t = this;
                                        this.events.on("EXPLOSION1", function () {
                                            var e = arguments.length <= 0 ? void 0 : arguments[0],
                                                n = arguments.length <= 1 ? void 0 : arguments[1],
                                                o = arguments.length <= 2 ? void 0 : arguments[2];
                                            t.explosion1(e, n, o);
                                        });
                                    },
                                },
                                {
                                    key: "update",
                                    value: function () {
                                        var t = this;
                                        if (
                                            ((this.activeGamepad = navigator.getGamepads().find(function (t) {
                                                return !!t;
                                            })),
                                            this.activeGamepad)
                                        ) {
                                            var e = this.player;
                                            this.controlMapping.forEach(function (n) {
                                                var o,
                                                    i,
                                                    a = n[0],
                                                    r = n[1];
                                                null !== (o = t.activeGamepad) &&
                                                void 0 !== o &&
                                                o.buttons &&
                                                t.activeGamepad.buttons[a].pressed
                                                    ? (e["activate" + r].bind(e)(), (t.isActive = !0))
                                                    : t.isActive && e["deactivate" + r].bind(e)();
                                                var u =
                                                    null === (i = t.activeGamepad) || void 0 === i ? void 0 : i.axes;
                                                if (u) {
                                                    var s = u[l.LEFT_STICK_X],
                                                        c = u[l.LEFT_STICK_Y];
                                                    t.notInDeadZone(s, l.LEFT_STICK_X) &&
                                                        (s < 0 ? e.activateLeft(s) : e.activateRight(s)),
                                                        t.notInDeadZone(c, l.LEFT_STICK_Y) &&
                                                            (c < 0 ? e.activateUp(c) : e.activateDown(c));
                                                }
                                            });
                                        }
                                    },
                                },
                                {
                                    key: "notInDeadZone",
                                    value: function (t, e) {
                                        var n = this.deadZone[e];
                                        return t <= n[0] || t >= n[1];
                                    },
                                },
                                {
                                    key: "explosion1",
                                    value: function (t, e, n) {
                                        this.explosionFromPlayer(
                                            { weakMagnitude: 0.7, strongMagnitude: 0.65 },
                                            { weakMagnitude: 0, strongMagnitude: 0 },
                                            700,
                                            t,
                                            e,
                                            n
                                        );
                                    },
                                },
                                {
                                    key: "explosionFromPlayer",
                                    value: function (t, e, n, o, i, a) {
                                        var r = this,
                                            l = { weakMagnitude: 0, strongMagnitude: 0 };
                                        v.TweenController.getInstance().createUpdateTween(
                                            l,
                                            t,
                                            e,
                                            n,
                                            function () {
                                                var t = c.Vector2D.distance(o, i),
                                                    e = 1 - Math.min(1, t / a);
                                                f.CameraController.getInstance().screenShake(7 * e, 16),
                                                    r.vibrate({
                                                        duration: 16,
                                                        startDelay: 0,
                                                        strongMagnitude: l.strongMagnitude * e,
                                                        weakMagnitude: l.weakMagnitude * e,
                                                    });
                                            },
                                            this
                                        );
                                    },
                                },
                                {
                                    key: "vibrate",
                                    value: function (t) {
                                        this.isActive &&
                                            this.activeGamepad &&
                                            this.activeGamepad.vibrationActuator.playEffect("dual-rumble", t);
                                    },
                                },
                                {
                                    key: "vibrateRamped",
                                    value: function (t, e, n) {
                                        var o = this;
                                        v.TweenController.getInstance().createUpdateTween(
                                            { weakMagnitude: 0, strongMagnitude: 0 },
                                            t,
                                            e,
                                            n,
                                            function (i) {
                                                var a = i / n;
                                                o.vibrate({
                                                    duration: 16,
                                                    startDelay: 0,
                                                    strongMagnitude: (0, d.lerp)(
                                                        t.strongMagnitude,
                                                        e.strongMagnitude,
                                                        a
                                                    ),
                                                    weakMagnitude: (0, d.lerp)(t.weakMagnitude, e.weakMagnitude, a),
                                                });
                                            },
                                            this
                                        );
                                    },
                                },
                            ],
                            [
                                {
                                    key: "buttonPressed",
                                    value: function () {
                                        var t = !1,
                                            e = navigator.getGamepads().find(function (t) {
                                                return !!t;
                                            });
                                        if (e)
                                            for (var n = e.buttons, o = 0; o < n.length; o++)
                                                if (n[o].pressed) {
                                                    t = !0;
                                                    break;
                                                }
                                        return t;
                                    },
                                },
                            ]
                        ),
                        t
                    );
                })();
                e.GamepadController = p;
            },
            6004: function (t, e, n) {
                var o = n(5318),
                    i = o(n(4575)),
                    a = o(n(3913)),
                    r = o(n(9713));
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.ShockwaveController = void 0);
                var l = n(2686),
                    u = n(8067),
                    s = n(5239),
                    c = (function () {
                        function t() {
                            (0, i.default)(this, t),
                                (0, r.default)(this, "app", void 0),
                                (0, r.default)(this, "shockwaveFilter", void 0),
                                (this.app = (0, u.getApp)()),
                                (this.shockwaveFilter = new l.ShockwaveFilter(
                                    void 0,
                                    { amplitude: 10, wavelength: 70, brightness: 1, radius: 200 },
                                    0
                                )),
                                (this.app.stage.filters = [this.shockwaveFilter]);
                        }
                        return (
                            (0, a.default)(
                                t,
                                [
                                    {
                                        key: "shockwave",
                                        value: function (t, e) {
                                            (this.shockwaveFilter.center = { x: t, y: e }),
                                                s.TweenController.getInstance().createUpdateTween(
                                                    this.shockwaveFilter,
                                                    { time: 0 },
                                                    { time: 200 / this.shockwaveFilter.speed },
                                                    700,
                                                    function () {},
                                                    this
                                                );
                                        },
                                    },
                                    {
                                        key: "resetShockwave",
                                        value: function () {
                                            (this.shockwaveFilter.time = 0), (this.app.stage.filters = []);
                                        },
                                    },
                                ],
                                [
                                    {
                                        key: "getInstance",
                                        value: function () {
                                            return t.instance || (t.instance = new t()), t.instance;
                                        },
                                    },
                                ]
                            ),
                            t
                        );
                    })();
                (0, r.default)(c, "instance", void 0), (e.ShockwaveController = c);
            },
            5939: function (t, e, n) {
                var o = n(5318),
                    i = o(n(7757)),
                    a = o(n(8926)),
                    r = o(n(4575)),
                    l = o(n(3913)),
                    u = o(n(9713));
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.SoundController = void 0);
                var s = n(2292),
                    c = n(9342),
                    d = n(8067),
                    f = (function () {
                        function t(e) {
                            (0, r.default)(this, t),
                                (0, u.default)(this, "player", void 0),
                                (0, u.default)(this, "explosionSounds", [
                                    c.AUDIO_EXPLOSION_1,
                                    c.AUDIO_EXPLOSION_2,
                                    c.AUDIO_EXPLOSION_3,
                                    c.AUDIO_EXPLOSION_4,
                                    c.AUDIO_EXPLOSION_5,
                                ]),
                                (this.player = e);
                        }
                        var e, n, o, f, h, v, p, y;
                        return (
                            (0, l.default)(
                                t,
                                [
                                    {
                                        key: "setPlayerRef",
                                        value: function (t) {
                                            this.player = t;
                                        },
                                    },
                                    {
                                        key: "playPlayerShootLeft",
                                        value:
                                            ((y = (0, a.default)(
                                                i.default.mark(function t() {
                                                    return i.default.wrap(function (t) {
                                                        for (;;)
                                                            switch ((t.prev = t.next)) {
                                                                case 0:
                                                                    return t.abrupt(
                                                                        "return",
                                                                        s.sound.play(c.AUDIO_PLAYER_SHOOT_LEFT)
                                                                    );
                                                                case 1:
                                                                case "end":
                                                                    return t.stop();
                                                            }
                                                    }, t);
                                                })
                                            )),
                                            function () {
                                                return y.apply(this, arguments);
                                            }),
                                    },
                                    {
                                        key: "playPlayerShootRight",
                                        value:
                                            ((p = (0, a.default)(
                                                i.default.mark(function t() {
                                                    return i.default.wrap(function (t) {
                                                        for (;;)
                                                            switch ((t.prev = t.next)) {
                                                                case 0:
                                                                    return t.abrupt(
                                                                        "return",
                                                                        s.sound.play(c.AUDIO_PLAYER_SHOOT_RIGHT)
                                                                    );
                                                                case 1:
                                                                case "end":
                                                                    return t.stop();
                                                            }
                                                    }, t);
                                                })
                                            )),
                                            function () {
                                                return p.apply(this, arguments);
                                            }),
                                    },
                                    {
                                        key: "playEnemyShoot",
                                        value:
                                            ((v = (0, a.default)(
                                                i.default.mark(function t(e, n) {
                                                    return i.default.wrap(function (t) {
                                                        for (;;)
                                                            switch ((t.prev = t.next)) {
                                                                case 0:
                                                                    return t.abrupt(
                                                                        "return",
                                                                        s.sound.play(e || c.AUDIO_ENEMY_SHOOT, n)
                                                                    );
                                                                case 1:
                                                                case "end":
                                                                    return t.stop();
                                                            }
                                                    }, t);
                                                })
                                            )),
                                            function (t, e) {
                                                return v.apply(this, arguments);
                                            }),
                                    },
                                    {
                                        key: "playEnemyHit",
                                        value:
                                            ((h = (0, a.default)(
                                                i.default.mark(function t() {
                                                    return i.default.wrap(function (t) {
                                                        for (;;)
                                                            switch ((t.prev = t.next)) {
                                                                case 0:
                                                                    return t.abrupt(
                                                                        "return",
                                                                        s.sound.play(c.AUDIO_ENEMY_HIT)
                                                                    );
                                                                case 1:
                                                                case "end":
                                                                    return t.stop();
                                                            }
                                                    }, t);
                                                })
                                            )),
                                            function () {
                                                return h.apply(this, arguments);
                                            }),
                                    },
                                    {
                                        key: "playKillConfirmed",
                                        value:
                                            ((f = (0, a.default)(
                                                i.default.mark(function t() {
                                                    return i.default.wrap(function (t) {
                                                        for (;;)
                                                            switch ((t.prev = t.next)) {
                                                                case 0:
                                                                    return t.abrupt(
                                                                        "return",
                                                                        s.sound.play(c.AUDIO_KILL_CONFIRMED, {
                                                                            volume: 0.34,
                                                                        })
                                                                    );
                                                                case 1:
                                                                case "end":
                                                                    return t.stop();
                                                            }
                                                    }, t);
                                                })
                                            )),
                                            function () {
                                                return f.apply(this, arguments);
                                            }),
                                    },
                                    {
                                        key: "playEnemyRandomExplode",
                                        value:
                                            ((o = (0, a.default)(
                                                i.default.mark(function t() {
                                                    var e;
                                                    return i.default.wrap(
                                                        function (t) {
                                                            for (;;)
                                                                switch ((t.prev = t.next)) {
                                                                    case 0:
                                                                        return (
                                                                            (e =
                                                                                this.explosionSounds[
                                                                                    Math.floor((0, d.random)(1, 5))
                                                                                ]),
                                                                            t.abrupt(
                                                                                "return",
                                                                                s.sound.play(e, { volume: 0.25 })
                                                                            )
                                                                        );
                                                                    case 2:
                                                                    case "end":
                                                                        return t.stop();
                                                                }
                                                        },
                                                        t,
                                                        this
                                                    );
                                                })
                                            )),
                                            function () {
                                                return o.apply(this, arguments);
                                            }),
                                    },
                                    {
                                        key: "playMenuMusic",
                                        value:
                                            ((n = (0, a.default)(
                                                i.default.mark(function t() {
                                                    return i.default.wrap(function (t) {
                                                        for (;;)
                                                            switch ((t.prev = t.next)) {
                                                                case 0:
                                                                    return t.abrupt(
                                                                        "return",
                                                                        s.sound.play(c.AUDIO_MENU_MUSIC, { loop: !0 })
                                                                    );
                                                                case 1:
                                                                case "end":
                                                                    return t.stop();
                                                            }
                                                    }, t);
                                                })
                                            )),
                                            function () {
                                                return n.apply(this, arguments);
                                            }),
                                    },
                                    {
                                        key: "playGameOverMusic",
                                        value:
                                            ((e = (0, a.default)(
                                                i.default.mark(function t() {
                                                    return i.default.wrap(function (t) {
                                                        for (;;)
                                                            switch ((t.prev = t.next)) {
                                                                case 0:
                                                                    return t.abrupt(
                                                                        "return",
                                                                        s.sound.play(c.AUDIO_GAME_OVER_MUSIC, {
                                                                            loop: !0,
                                                                        })
                                                                    );
                                                                case 1:
                                                                case "end":
                                                                    return t.stop();
                                                            }
                                                    }, t);
                                                })
                                            )),
                                            function () {
                                                return e.apply(this, arguments);
                                            }),
                                    },
                                    {
                                        key: "playMouseClick",
                                        value: function () {
                                            return s.sound.play(c.AUDIO_MOUSE_CLICK, { volume: 0.5 });
                                        },
                                    },
                                    {
                                        key: "stopAll",
                                        value: function () {
                                            s.sound.stopAll();
                                        },
                                    },
                                ],
                                [
                                    {
                                        key: "getInstance",
                                        value: function (e) {
                                            return t.instance || (t.instance = new t(e)), t.instance;
                                        },
                                    },
                                ]
                            ),
                            t
                        );
                    })();
                (0, u.default)(f, "instance", void 0), (e.SoundController = f);
            },
            1966: function (t, e, n) {
                var o = n(5318);
                n(1539), n(4747), n(9714), n(6699), n(2023);
                var i = o(n(4575)),
                    a = o(n(3913)),
                    r = o(n(9713));
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.Spawner = void 0);
                var l,
                    u = n(9342),
                    s = n(6195),
                    c = n(3602),
                    d = n(9521),
                    f = n(8067);
                !(function (t) {
                    (t[(t.FIGHTER = 1)] = "FIGHTER"),
                        (t[(t.SHOOTING_FIGHTER = 2)] = "SHOOTING_FIGHTER"),
                        (t[(t.EIGHT_SHOT_BOMBERS = 3)] = "EIGHT_SHOT_BOMBERS"),
                        (t[(t.FOUR_SHOT_BOMBERS = 4)] = "FOUR_SHOT_BOMBERS");
                })(l || (l = {}));
                var h = l.FIGHTER,
                    v = l.SHOOTING_FIGHTER,
                    p = l.FOUR_SHOT_BOMBERS,
                    y = l.EIGHT_SHOT_BOMBERS,
                    _ = (function () {
                        function t(e) {
                            (0, i.default)(this, t),
                                (0, r.default)(this, "player", void 0),
                                (0, r.default)(this, "gameStarted", void 0),
                                (0, r.default)(this, "bulletPool", new s.ObjectPoolHandler(200, s.EnemyBullet)),
                                (0, r.default)(this, "fighterPool", new s.ObjectPoolHandler(30, d.NormalPlane)),
                                (0, r.default)(
                                    this,
                                    "shootingFightersPool",
                                    new s.ObjectPoolHandler(30, c.ShooterFighterPlane)
                                ),
                                (0, r.default)(
                                    this,
                                    "fourShotBomberPool",
                                    new s.ObjectPoolHandler(40, c.FourShotBomberPlane)
                                ),
                                (0, r.default)(
                                    this,
                                    "eightShotBomberPool",
                                    new s.ObjectPoolHandler(40, c.EightShotBomberPlane)
                                ),
                                (0, r.default)(this, "formations", [
                                    [
                                        [0, 0, 0],
                                        [h, 0, h],
                                        [0, h, 0],
                                    ],
                                    [
                                        [h, 0, h],
                                        [0, 0, 0],
                                        [0, h, 0],
                                    ],
                                    [
                                        [p, 0, 0, 0],
                                        [0, p, 0, p],
                                        [0, 0, p, 0],
                                    ],
                                    [
                                        [0, 0, 0, p],
                                        [p, 0, p, 0],
                                        [0, p, 0, 0],
                                    ],
                                    [
                                        [0, 0, 0],
                                        [v, 0, v],
                                        [0, v, 0],
                                    ],
                                    [
                                        [v, 0, v],
                                        [0, 0, 0],
                                        [0, v, 0],
                                    ],
                                    [
                                        [0, 0, 0],
                                        [p, 0, p],
                                        [0, p, 0],
                                    ],
                                    [
                                        [p, 0, p],
                                        [0, 0, 0],
                                        [0, p, 0],
                                    ],
                                    [
                                        [0, 0, 0],
                                        [y, 0, y],
                                        [0, y, 0],
                                    ],
                                    [
                                        [y, 0, y],
                                        [0, 0, 0],
                                        [0, y, 0],
                                    ],
                                    [
                                        [y, 0, 0, 0],
                                        [0, y, 0, y],
                                        [0, 0, y, 0],
                                    ],
                                    [
                                        [0, 0, 0, y],
                                        [y, 0, y, 0],
                                        [0, y, 0, 0],
                                    ],
                                    [
                                        [0, 0, 0],
                                        [y, 0, y],
                                        [0, y, 0],
                                    ],
                                    [
                                        [y, 0, y],
                                        [0, 0, 0],
                                        [0, y, 0],
                                    ],
                                ]),
                                (0, r.default)(this, "mixedFormation", [
                                    [
                                        [0, 0, 0, 0, 0, 0, 0],
                                        [0, p, 0, p, 0, 0, 0],
                                        [0, 0, p, 0, p, 0, p],
                                        [h, 0, h, 0, h, p, 0],
                                        [0, h, 0, h, 0, 0, 0],
                                    ],
                                    [
                                        [0, 0, 0, 0, 0, 0, 0],
                                        [0, p, 0, p, 0, 0, 0],
                                        [0, 0, p, 0, p, 0, p],
                                        [h, 0, 0, 0, 0, p, 0],
                                        [0, h, 0, 0, 0, 0, 0],
                                    ],
                                    [
                                        [0, 0, 0, 0, 0, 0, 0],
                                        [0, p, 0, p, 0, 0, 0],
                                        [0, 0, p, 0, p, 0, p],
                                        [h, 0, h, 0, h, p, 0],
                                        [0, h, 0, h, 0, 0, 0],
                                    ],
                                    [
                                        [0, 0, 0, 0, 0, 0, 0],
                                        [0, p, 0, p, 0, 0, 0],
                                        [0, 0, p, 0, p, 0, p],
                                        [v, 0, v, 0, v, p, 0],
                                        [0, v, 0, v, 0, 0, 0],
                                    ],
                                    [
                                        [0, 0, 0, 0, 0, 0, 0],
                                        [0, p, 0, p, 0, 0, 0],
                                        [0, 0, p, 0, p, 0, p],
                                        [v, 0, 0, 0, 0, p, 0],
                                        [0, v, 0, 0, 0, 0, 0],
                                    ],
                                    [
                                        [0, 0, 0, 0, 0, 0, 0],
                                        [0, p, 0, p, 0, 0, 0],
                                        [0, 0, p, 0, p, 0, p],
                                        [v, 0, v, 0, v, p, 0],
                                        [0, v, 0, v, 0, 0, 0],
                                    ],
                                    [
                                        [0, 0, 0, 0, 0, 0, 0],
                                        [0, y, 0, y, 0, 0, 0],
                                        [0, 0, y, 0, y, 0, y],
                                        [h, 0, h, 0, h, y, 0],
                                        [0, h, 0, h, 0, 0, 0],
                                    ],
                                    [
                                        [0, 0, 0, 0, 0, 0, 0],
                                        [0, y, 0, y, 0, 0, 0],
                                        [0, 0, y, 0, y, 0, y],
                                        [h, 0, 0, 0, 0, y, 0],
                                        [0, h, 0, 0, 0, 0, 0],
                                    ],
                                    [
                                        [0, 0, 0, 0, 0, 0, 0],
                                        [0, y, 0, y, 0, 0, 0],
                                        [0, 0, y, 0, y, 0, y],
                                        [h, 0, h, 0, h, y, 0],
                                        [0, h, 0, h, 0, 0, 0],
                                    ],
                                    [
                                        [0, 0, 0, 0, 0, 0, 0],
                                        [0, y, 0, y, 0, 0, 0],
                                        [0, 0, y, 0, y, 0, y],
                                        [v, 0, v, 0, v, y, 0],
                                        [0, v, 0, v, 0, 0, 0],
                                    ],
                                    [
                                        [0, 0, 0, 0, 0, 0, 0],
                                        [0, y, 0, y, 0, 0, 0],
                                        [0, 0, y, 0, y, 0, y],
                                        [v, 0, 0, 0, 0, y, 0],
                                        [0, v, 0, 0, 0, 0, 0],
                                    ],
                                    [
                                        [0, 0, 0, 0, 0, 0, 0],
                                        [0, y, 0, y, 0, 0, 0],
                                        [0, 0, y, 0, y, 0, y],
                                        [v, 0, v, 0, v, y, 0],
                                        [0, v, 0, v, 0, 0, 0],
                                    ],
                                ]),
                                (0, r.default)(this, "timedActions", []),
                                (0, r.default)(this, "spawnOrder", [
                                    [0, 3e3, this.spawnNoneFormationFighter.bind(this)],
                                    [4e3, 3e3, this.spawnNoneFormationShooterFighter.bind(this)],
                                    [16e3, 3e3, this.spawnMixedFormation.bind(this)],
                                ]),
                                (0, r.default)(this, "shouldUpdate", !0),
                                (this.player = e),
                                (this.gameStarted = performance.now()),
                                this.applyBulletPoolTo(this.shootingFightersPool),
                                this.applyBulletPoolTo(this.fourShotBomberPool),
                                this.applyBulletPoolTo(this.eightShotBomberPool),
                                this.init();
                        }
                        return (
                            (0, a.default)(t, [
                                {
                                    key: "applyBulletPoolTo",
                                    value: function (t) {
                                        var e = this;
                                        t.pool.forEach(function (t) {
                                            t.bulletPool = e.bulletPool;
                                        });
                                    },
                                },
                                {
                                    key: "init",
                                    value: function () {
                                        var t = this;
                                        this.spawnOrder.forEach(function (e) {
                                            var n = e[0],
                                                o = e[1],
                                                i = e[2];
                                            t.timedActions.push(
                                                window.setTimeout(function () {
                                                    i(), t.timedActions.push(window.setInterval(i, o));
                                                }, n)
                                            );
                                        });
                                    },
                                },
                                {
                                    key: "spawnNoneFormationFighter",
                                    value: function () {
                                        var t = this.fighterPool.get();
                                        if (t)
                                            return (
                                                this.spawnSingleUnit(t), Math.random() > 0.6 && t.setVelocity(0, 2.8), t
                                            );
                                    },
                                },
                                {
                                    key: "spawnNoneFormationShooterFighter",
                                    value: function () {
                                        var t = this.shootingFightersPool.get();
                                        if (t) return this.spawnSingleUnit(t);
                                    },
                                },
                                {
                                    key: "spawnSingleUnit",
                                    value: function (t) {
                                        t.y = 0.5 * -t.height;
                                        var e = 0.5 * t.width;
                                        return (
                                            (t.x = (0, f.random)(e, u.GAME_WIDTH - e)),
                                            (t.x = (0, f.lerp)(t.x, this.player.x, (0, f.random)(0, 1))),
                                            t
                                        );
                                    },
                                },
                                {
                                    key: "spawnMixedFormation",
                                    value: function () {
                                        var t = Math.random() > 0.5 ? this.formations : this.mixedFormation,
                                            e = t[Math.floor(Math.random() * t.length)];
                                        return this.spawnFormation(e);
                                    },
                                },
                                {
                                    key: "consoleFormation",
                                    value: function (t) {
                                        console.log("Formation:", t),
                                            t.forEach(function (t) {
                                                return console.log(t.toString());
                                            }),
                                            console.log("====");
                                    },
                                },
                                {
                                    key: "spawnFormationFighter",
                                    value: function () {
                                        var t = this.getFormationByType(l.SHOOTING_FIGHTER, this.formations),
                                            e = t[Math.floor(Math.random() * t.length)];
                                        return this.spawnFormation(e);
                                    },
                                },
                                {
                                    key: "spawnFormationBomber",
                                    value: function () {
                                        var t = this.getFormationByType(l.FOUR_SHOT_BOMBERS, this.formations),
                                            e = t[Math.floor(Math.random() * t.length)];
                                        return this.spawnFormation(e);
                                    },
                                },
                                {
                                    key: "getFormationByType",
                                    value: function (t, e) {
                                        var n = [];
                                        return (
                                            e.forEach(function (e) {
                                                for (var o = 0, i = e.length; o < i; o++)
                                                    if (e[o].includes(t)) {
                                                        n.push(e);
                                                        break;
                                                    }
                                            }),
                                            n
                                        );
                                    },
                                },
                                {
                                    key: "spawnFormation",
                                    value: function (t) {
                                        for (
                                            var e = this.fighterPool,
                                                n = this.shootingFightersPool,
                                                o = this.fourShotBomberPool,
                                                i = this.eightShotBomberPool,
                                                a = [],
                                                r = o.pool[0],
                                                s = 0.5 * r.width,
                                                c = 0.5 * r.height,
                                                d = (0, f.random)(s, u.GAME_WIDTH - s * t[0].length),
                                                h = c * t.length + 1,
                                                v = 0,
                                                p = t.length;
                                            v < p;
                                            v++
                                        )
                                            for (var y = t[v], _ = 0, E = y.length; _ < E; _++) {
                                                var g = void 0;
                                                switch (y[_]) {
                                                    case l.FIGHTER:
                                                        g = e.get();
                                                        break;
                                                    case l.SHOOTING_FIGHTER:
                                                        g = n.get();
                                                        break;
                                                    case l.FOUR_SHOT_BOMBERS:
                                                        g = o.get();
                                                        break;
                                                    case l.EIGHT_SHOT_BOMBERS:
                                                        g = i.get();
                                                }
                                                g &&
                                                    ((g.x = _ * r.width + d),
                                                    (g.y = v * r.height - h),
                                                    g.despawn(),
                                                    a.push(g));
                                            }
                                        return a;
                                    },
                                },
                                {
                                    key: "update",
                                    value: function (t) {
                                        null != this &&
                                            this.shouldUpdate &&
                                            (this.fighterPool.update(t),
                                            this.shootingFightersPool.update(t),
                                            this.fourShotBomberPool.update(t),
                                            this.eightShotBomberPool.update(t),
                                            this.bulletPool.update(t));
                                    },
                                },
                                {
                                    key: "gameOver",
                                    value: function () {
                                        (this.shouldUpdate = !1),
                                            this.timedActions.forEach(function (t) {
                                                window.clearInterval(t), window.clearTimeout(t);
                                            });
                                    },
                                },
                            ]),
                            t
                        );
                    })();
                e.Spawner = _;
            },
            5239: function (t, e, n) {
                var o = n(5318),
                    i = o(n(4575)),
                    a = o(n(3913)),
                    r = o(n(9713)),
                    l = Object.create
                        ? function (t, e, n, o) {
                              void 0 === o && (o = n),
                                  Object.defineProperty(t, o, {
                                      enumerable: !0,
                                      get: function () {
                                          return e[n];
                                      },
                                  });
                          }
                        : function (t, e, n, o) {
                              void 0 === o && (o = n), (t[o] = e[n]);
                          },
                    u = Object.create
                        ? function (t, e) {
                              Object.defineProperty(t, "default", { enumerable: !0, value: e });
                          }
                        : function (t, e) {
                              t.default = e;
                          };
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.TweenController = void 0);
                var s = (function (t) {
                        if (t && t.__esModule) return t;
                        var e = {};
                        if (null != t)
                            for (var n in t)
                                "default" !== n && Object.prototype.hasOwnProperty.call(t, n) && l(e, t, n);
                        return u(e, t), e;
                    })(n(6389)),
                    c = (function () {
                        function t() {
                            (0, i.default)(this, t),
                                (0, r.default)(this, "tweenManager", void 0),
                                (this.tweenManager = s.tweenManager);
                        }
                        return (
                            (0, a.default)(
                                t,
                                [
                                    {
                                        key: "update",
                                        value: function () {
                                            this.tweenManager.update();
                                        },
                                    },
                                    {
                                        key: "createUpdateTween",
                                        value: function (t, e, n, o, i, a) {
                                            var r = this.tweenManager.createTween(t);
                                            return (
                                                r.from(e).to(n), (r.time = o), r.on("update", i.bind(a)), r.start(), r
                                            );
                                        },
                                    },
                                ],
                                [
                                    {
                                        key: "getInstance",
                                        value: function () {
                                            return t.instance || (t.instance = new t()), t.instance;
                                        },
                                    },
                                ]
                            ),
                            t
                        );
                    })();
                (0, r.default)(c, "instance", void 0), (e.TweenController = c);
            },
            7937: function (t, e, n) {
                var o = n(5318);
                n(1539), n(4747), n(5218), n(4678), n(9714);
                var i = o(n(4575)),
                    a = o(n(3913)),
                    r = o(n(9713));
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.UIController = void 0);
                var l = n(6389),
                    u = n(8067),
                    s = (function () {
                        function t() {
                            (0, i.default)(this, t),
                                (0, r.default)(this, "app", void 0),
                                (0, r.default)(this, "structure", []),
                                (0, r.default)(this, "scoreTitleText", new l.Text("")),
                                (0, r.default)(this, "scoreText", new l.Text("")),
                                (0, r.default)(this, "highScoreTitleText", new l.Text("")),
                                (0, r.default)(this, "highScoreText", new l.Text("")),
                                (0, r.default)(this, "score", 0),
                                (0, r.default)(this, "highscore", 0),
                                (this.app = (0, u.getApp)()),
                                (this.structure = [
                                    [
                                        ["Score: ", this.scoreTitleText],
                                        ["0", this.scoreText],
                                    ],
                                    [
                                        ["High Score: ", this.highScoreTitleText],
                                        ["0", this.highScoreText],
                                    ],
                                ]),
                                this.setupText(),
                                this.setHighScore();
                        }
                        return (
                            (0, a.default)(
                                t,
                                [
                                    {
                                        key: "setupText",
                                        value: function () {
                                            var t = this,
                                                e = 10;
                                            this.structure.forEach(function (n) {
                                                var o = [];
                                                n.forEach(function (n, i) {
                                                    var a = n[0],
                                                        r = n[1];
                                                    r.anchor.set(0, 0.5),
                                                        (r.text = a),
                                                        o.push(r),
                                                        t.app.stage.addChild(r);
                                                    var l = o[i - 1];
                                                    if (l) {
                                                        var u = l.getBounds();
                                                        (r.x = u.right), (r.y = u.y + 0.5 * r.height);
                                                    } else (r.y = e + 0.5 * r.height + 10), (e = r.y);
                                                });
                                            });
                                        },
                                    },
                                    {
                                        key: "setHighScore",
                                        value: function () {
                                            (this.highscore = parseFloat(localStorage.getItem("myHighScore")) || 0),
                                                this.updateHighScore();
                                        },
                                    },
                                    {
                                        key: "updateHighScore",
                                        value: function () {
                                            this.highScoreText.text = this.highscore.toString();
                                        },
                                    },
                                    {
                                        key: "addToScore",
                                        value: function (t) {
                                            (this.score += 100 * t), (this.scoreText.text = this.score.toString());
                                        },
                                    },
                                    {
                                        key: "gameEnded",
                                        value: function () {
                                            this.score > this.highscore &&
                                                ((this.highscore = this.score),
                                                localStorage.setItem("myHighScore", this.highscore.toString()),
                                                this.updateHighScore());
                                        },
                                    },
                                    {
                                        key: "getScore",
                                        value: function () {
                                            return this.score;
                                        },
                                    },
                                ],
                                [
                                    {
                                        key: "getInstance",
                                        value: function () {
                                            return t.instance || (t.instance = new t()), t.instance;
                                        },
                                    },
                                ]
                            ),
                            t
                        );
                    })();
                (0, r.default)(s, "instance", void 0), (e.UIController = s);
            },
            8418: function (t, e, n) {
                var o = Object.create
                        ? function (t, e, n, o) {
                              void 0 === o && (o = n),
                                  Object.defineProperty(t, o, {
                                      enumerable: !0,
                                      get: function () {
                                          return e[n];
                                      },
                                  });
                          }
                        : function (t, e, n, o) {
                              void 0 === o && (o = n), (t[o] = e[n]);
                          },
                    i = function (t, e) {
                        for (var n in t) "default" === n || Object.prototype.hasOwnProperty.call(e, n) || o(e, t, n);
                    };
                Object.defineProperty(e, "__esModule", { value: !0 }),
                    i(n(1966), e),
                    i(n(7937), e),
                    i(n(6171), e),
                    i(n(5239), e),
                    i(n(8469), e),
                    i(n(1033), e),
                    i(n(6004), e),
                    i(n(5939), e);
            },
            637: function (t, e, n) {
                n(1539), n(2419);
                var o = n(5318);
                n(5218);
                var i = o(n(4575)),
                    a = o(n(3913)),
                    r = o(n(1506)),
                    l = o(n(2205)),
                    u = o(n(8585)),
                    s = o(n(9754)),
                    c = o(n(9713));
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.Bullet = void 0);
                var d = n(6389),
                    f = n(9342),
                    h = n(8418),
                    v = n(661),
                    p = (function (t) {
                        (0, l.default)(d, t);
                        var e,
                            n,
                            o =
                                ((e = d),
                                (n = (function () {
                                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                                    if (Reflect.construct.sham) return !1;
                                    if ("function" == typeof Proxy) return !0;
                                    try {
                                        return (
                                            Boolean.prototype.valueOf.call(
                                                Reflect.construct(Boolean, [], function () {})
                                            ),
                                            !0
                                        );
                                    } catch (t) {
                                        return !1;
                                    }
                                })()),
                                function () {
                                    var t,
                                        o = (0, s.default)(e);
                                    if (n) {
                                        var i = (0, s.default)(this).constructor;
                                        t = Reflect.construct(o, arguments, i);
                                    } else t = o.apply(this, arguments);
                                    return (0, u.default)(this, t);
                                });
                        function d(t) {
                            var e;
                            return (
                                (0, i.default)(this, d),
                                (e = o.call(this, t)),
                                (0, c.default)((0, r.default)(e), "velocity", new v.Vector2D()),
                                (0, c.default)((0, r.default)(e), "active", !1),
                                (0, c.default)((0, r.default)(e), "entityType", 1),
                                (0, c.default)((0, r.default)(e), "soundController", void 0),
                                e.anchor.set(0.5),
                                (e.visible = !1),
                                (e.active = !1),
                                (e.soundController = h.SoundController.getInstance()),
                                e
                            );
                        }
                        return (
                            (0, a.default)(d, [
                                {
                                    key: "setVelocity",
                                    value: function (t, e) {
                                        this.velocity.set(t, e);
                                    },
                                },
                                {
                                    key: "update",
                                    value: function (t) {
                                        this.active && (this.despawn(), this.active && this.updateMovement(t));
                                    },
                                },
                                {
                                    key: "despawn",
                                    value: function () {
                                        var t = this.x,
                                            e = this.y,
                                            n = 0.5 * this.width,
                                            o = 0.5 * this.height;
                                        (t + n < 0 ||
                                            t - n > f.GAME_WIDTH ||
                                            e - o > f.GAME_HEIGHT + o ||
                                            e + o < -o) &&
                                            this.reset();
                                    },
                                },
                                {
                                    key: "updateMovement",
                                    value: function (t) {
                                        (this.x += this.velocity.x * t), (this.y += this.velocity.y * t);
                                    },
                                },
                                {
                                    key: "reset",
                                    value: function () {
                                        (this.visible = !1), (this.active = !1);
                                    },
                                },
                                {
                                    key: "collision",
                                    value: function () {
                                        this.reset();
                                    },
                                },
                                {
                                    key: "limitVelocity",
                                    value: function (t) {
                                        this.velocity.limit(t);
                                    },
                                },
                            ]),
                            d
                        );
                    })(d.Sprite);
                e.Bullet = p;
            },
            5697: function (t, e, n) {
                n(1539), n(2419);
                var o = n(5318);
                n(5218);
                var i = o(n(4575)),
                    a = o(n(3913)),
                    r = o(n(1506)),
                    l = o(n(6525)),
                    u = o(n(2205)),
                    s = o(n(8585)),
                    c = o(n(9754)),
                    d = o(n(9713));
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.EnemyBullet = void 0);
                var f = n(661),
                    h = n(8067),
                    v = (function (t) {
                        (0, u.default)(v, t);
                        var e,
                            n,
                            o =
                                ((e = v),
                                (n = (function () {
                                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                                    if (Reflect.construct.sham) return !1;
                                    if ("function" == typeof Proxy) return !0;
                                    try {
                                        return (
                                            Boolean.prototype.valueOf.call(
                                                Reflect.construct(Boolean, [], function () {})
                                            ),
                                            !0
                                        );
                                    } catch (t) {
                                        return !1;
                                    }
                                })()),
                                function () {
                                    var t,
                                        o = (0, c.default)(e);
                                    if (n) {
                                        var i = (0, c.default)(this).constructor;
                                        t = Reflect.construct(o, arguments, i);
                                    } else t = o.apply(this, arguments);
                                    return (0, s.default)(this, t);
                                });
                        function v() {
                            var t;
                            return (
                                (0, i.default)(this, v),
                                (t = o.call(this, (0, h.getGraphicTexture)(h.Graphic_List.ENEMY_BULLET))),
                                (0, d.default)((0, r.default)(t), "velocity", new f.Vector2D()),
                                (0, d.default)((0, r.default)(t), "active", !1),
                                (0, d.default)((0, r.default)(t), "entityType", 3),
                                (0, d.default)((0, r.default)(t), "TIME_BETWEEN_SHOTS", void 0),
                                t.anchor.set(0.5),
                                (t.visible = !1),
                                (t.active = !1),
                                t.setVelocity(0, 2.9),
                                (t.TIME_BETWEEN_SHOTS = 1500),
                                t
                            );
                        }
                        return (
                            (0, a.default)(v, [
                                {
                                    key: "reset",
                                    value: function () {
                                        (0, l.default)((0, c.default)(v.prototype), "reset", this).call(this),
                                            this.setVelocity(0, 2.9);
                                    },
                                },
                            ]),
                            v
                        );
                    })(n(637).Bullet);
                e.EnemyBullet = v;
            },
            376: function (t, e) {
                Object.defineProperty(e, "__esModule", { value: !0 });
            },
            4401: function (t, e, n) {
                var o = n(5318);
                n(561);
                var i = o(n(9100)),
                    a = o(n(319)),
                    r = o(n(4575)),
                    l = o(n(3913)),
                    u = o(n(9713));
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.ObjectPoolHandler = void 0);
                var s = n(7435),
                    c = (function () {
                        function t(e, n) {
                            (0, r.default)(this, t),
                                (0, u.default)(this, "pool", []),
                                (0, u.default)(this, "size", 0),
                                (0, u.default)(this, "entityClass", void 0),
                                (0, u.default)(this, "entityProps", void 0),
                                (0, u.default)(this, "app", void 0),
                                (this.size = e),
                                (this.entityClass = n);
                            for (var o = arguments.length, i = new Array(o > 2 ? o - 2 : 0), a = 2; a < o; a++)
                                i[a - 2] = arguments[a];
                            (this.entityProps = i), (this.app = (0, s.getApp)()), this.initPool();
                        }
                        return (
                            (0, l.default)(t, [
                                {
                                    key: "initPool",
                                    value: function () {
                                        for (
                                            var t = this.size,
                                                e = this.entityClass,
                                                n = this.entityProps,
                                                o = (this.pool = new Array(t)),
                                                r = 0;
                                            r < t;
                                            r++
                                        )
                                            (o[r] = (0, i.default)(e, (0, a.default)(n))),
                                                this.app.stage.addChild(o[r]);
                                    },
                                },
                                {
                                    key: "get",
                                    value: function () {
                                        var t = this.pool,
                                            e = t[0];
                                        if (!e.active) return t.push(t.shift()), (e.active = !0), (e.visible = !0), e;
                                    },
                                },
                                {
                                    key: "update",
                                    value: function (t) {
                                        for (var e = this.pool, n = 0, o = this.size; n < o; n++) {
                                            var i = e[n];
                                            i.active && (i.update(t), i.active || e.push(e.splice(n, 1)[0]));
                                        }
                                    },
                                },
                            ]),
                            t
                        );
                    })();
                e.ObjectPoolHandler = c;
            },
            6408: function (t, e, n) {
                n(1539), n(2419);
                var o = n(5318),
                    i = o(n(4575)),
                    a = o(n(3913)),
                    r = o(n(1506)),
                    l = o(n(6525)),
                    u = o(n(2205)),
                    s = o(n(8585)),
                    c = o(n(9754)),
                    d = o(n(9713));
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.PlayerBullet = void 0);
                var f = n(661),
                    h = n(8067),
                    v = (function (t) {
                        (0, u.default)(v, t);
                        var e,
                            n,
                            o =
                                ((e = v),
                                (n = (function () {
                                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                                    if (Reflect.construct.sham) return !1;
                                    if ("function" == typeof Proxy) return !0;
                                    try {
                                        return (
                                            Boolean.prototype.valueOf.call(
                                                Reflect.construct(Boolean, [], function () {})
                                            ),
                                            !0
                                        );
                                    } catch (t) {
                                        return !1;
                                    }
                                })()),
                                function () {
                                    var t,
                                        o = (0, c.default)(e);
                                    if (n) {
                                        var i = (0, c.default)(this).constructor;
                                        t = Reflect.construct(o, arguments, i);
                                    } else t = o.apply(this, arguments);
                                    return (0, s.default)(this, t);
                                });
                        function v() {
                            var t;
                            return (
                                (0, i.default)(this, v),
                                (t = o.call(this, (0, h.getGraphicTexture)(h.Graphic_List.BULLET))),
                                (0, d.default)((0, r.default)(t), "acceleration", new f.Vector2D(0, -0.06)),
                                (0, d.default)((0, r.default)(t), "baseVelocity", new f.Vector2D(0, -2)),
                                (0, d.default)((0, r.default)(t), "entityType", 1),
                                (0, d.default)((0, r.default)(t), "poolParent", void 0),
                                t.reset(),
                                (t.poolParent = arguments.length <= 0 ? void 0 : arguments[0]),
                                t
                            );
                        }
                        return (
                            (0, a.default)(v, [
                                {
                                    key: "despawn",
                                    value: function () {
                                        this.y + 0.5 * this.height < 0 &&
                                            ((this.active = this.visible = !1), this.reset());
                                    },
                                },
                                {
                                    key: "updateMovement",
                                    value: function (t) {
                                        var e = this.velocity,
                                            n = this.acceleration,
                                            o = e.y + n.y * t;
                                        (e.y = Math.min(o, -8)), (this.y += o * t);
                                        var i = Math.round(1 * Math.random());
                                        this.x += Math.random() > 0.5 ? i : -i;
                                    },
                                },
                                {
                                    key: "reset",
                                    value: function () {
                                        (0, l.default)((0, c.default)(v.prototype), "reset", this).call(this),
                                            this.velocity.setFromObject(this.baseVelocity);
                                    },
                                },
                            ]),
                            v
                        );
                    })(n(6195).Bullet);
                e.PlayerBullet = v;
            },
            6195: function (t, e, n) {
                var o = Object.create
                        ? function (t, e, n, o) {
                              void 0 === o && (o = n),
                                  Object.defineProperty(t, o, {
                                      enumerable: !0,
                                      get: function () {
                                          return e[n];
                                      },
                                  });
                          }
                        : function (t, e, n, o) {
                              void 0 === o && (o = n), (t[o] = e[n]);
                          },
                    i = function (t, e) {
                        for (var n in t) "default" === n || Object.prototype.hasOwnProperty.call(e, n) || o(e, t, n);
                    };
                Object.defineProperty(e, "__esModule", { value: !0 }),
                    i(n(4401), e),
                    i(n(376), e),
                    i(n(637), e),
                    i(n(6408), e),
                    i(n(5697), e);
            },
            7502: function (t, e, n) {
                n(1539), n(2419);
                var o = n(5318),
                    i = o(n(3913)),
                    a = o(n(4575)),
                    r = o(n(2205)),
                    l = o(n(8585)),
                    u = o(n(9754));
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.FourShotBomberPlane = void 0);
                var s = n(6389),
                    c = (function (t) {
                        (0, r.default)(c, t);
                        var e,
                            n,
                            o =
                                ((e = c),
                                (n = (function () {
                                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                                    if (Reflect.construct.sham) return !1;
                                    if ("function" == typeof Proxy) return !0;
                                    try {
                                        return (
                                            Boolean.prototype.valueOf.call(
                                                Reflect.construct(Boolean, [], function () {})
                                            ),
                                            !0
                                        );
                                    } catch (t) {
                                        return !1;
                                    }
                                })()),
                                function () {
                                    var t,
                                        o = (0, u.default)(e);
                                    if (n) {
                                        var i = (0, u.default)(this).constructor;
                                        t = Reflect.construct(o, arguments, i);
                                    } else t = o.apply(this, arguments);
                                    return (0, l.default)(this, t);
                                });
                        function c() {
                            return (0, a.default)(this, c), o.call(this, s.Texture.from("aircraft_2d.png"));
                        }
                        return (0, i.default)(c);
                    })(n(4123).BomberPlane);
                e.FourShotBomberPlane = c;
            },
            4470: function (t, e, n) {
                n(1539), n(2419);
                var o = n(5318),
                    i = o(n(4575)),
                    a = o(n(3913)),
                    r = o(n(2205)),
                    l = o(n(8585)),
                    u = o(n(9754));
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.EightShotBomberPlane = void 0);
                var s = n(6389),
                    c = (function (t) {
                        (0, r.default)(c, t);
                        var e,
                            n,
                            o =
                                ((e = c),
                                (n = (function () {
                                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                                    if (Reflect.construct.sham) return !1;
                                    if ("function" == typeof Proxy) return !0;
                                    try {
                                        return (
                                            Boolean.prototype.valueOf.call(
                                                Reflect.construct(Boolean, [], function () {})
                                            ),
                                            !0
                                        );
                                    } catch (t) {
                                        return !1;
                                    }
                                })()),
                                function () {
                                    var t,
                                        o = (0, u.default)(e);
                                    if (n) {
                                        var i = (0, u.default)(this).constructor;
                                        t = Reflect.construct(o, arguments, i);
                                    } else t = o.apply(this, arguments);
                                    return (0, l.default)(this, t);
                                });
                        function c() {
                            return (0, i.default)(this, c), o.call(this, s.Texture.from("aircraft_3e.png"));
                        }
                        return (
                            (0, a.default)(c, [
                                {
                                    key: "spawnBullets",
                                    value: function () {
                                        for (var t = [], e = this.bulletSpeed, n = -1; n < 2; n++)
                                            for (var o = -1; o < 2; o++)
                                                if (0 != n || 0 != o) {
                                                    var i = this.bulletPool.get();
                                                    i &&
                                                        (t.push(i),
                                                        i.position.set(this.x, this.y),
                                                        i.setVelocity(n * e, o * e),
                                                        i.limitVelocity(2.9));
                                                }
                                        return t;
                                    },
                                },
                            ]),
                            c
                        );
                    })(n(4123).BomberPlane);
                e.EightShotBomberPlane = c;
            },
            3100: function (t, e, n) {
                n(1539), n(2419);
                var o = n(5318),
                    i = o(n(4575)),
                    a = o(n(3913)),
                    r = o(n(1506)),
                    l = o(n(6525)),
                    u = o(n(2205)),
                    s = o(n(8585)),
                    c = o(n(9754)),
                    d = o(n(9713));
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.ArmedPlane = void 0);
                var f = n(9342),
                    h = n(6195),
                    v = (function (t) {
                        (0, u.default)(v, t);
                        var e,
                            n,
                            o =
                                ((e = v),
                                (n = (function () {
                                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                                    if (Reflect.construct.sham) return !1;
                                    if ("function" == typeof Proxy) return !0;
                                    try {
                                        return (
                                            Boolean.prototype.valueOf.call(
                                                Reflect.construct(Boolean, [], function () {})
                                            ),
                                            !0
                                        );
                                    } catch (t) {
                                        return !1;
                                    }
                                })()),
                                function () {
                                    var t,
                                        o = (0, c.default)(e);
                                    if (n) {
                                        var i = (0, c.default)(this).constructor;
                                        t = Reflect.construct(o, arguments, i);
                                    } else t = o.apply(this, arguments);
                                    return (0, s.default)(this, t);
                                });
                        function v(t) {
                            var e;
                            return (
                                (0, i.default)(this, v),
                                (e = o.call(this, t)),
                                (0, d.default)((0, r.default)(e), "RPS", 1),
                                (0, d.default)((0, r.default)(e), "TIME_BETWEEN_SHOTS", void 0),
                                (0, d.default)((0, r.default)(e), "lastShot", 0),
                                (0, d.default)((0, r.default)(e), "bulletPool", void 0),
                                (0, d.default)((0, r.default)(e), "canShoot", void 0),
                                (0, d.default)((0, r.default)(e), "shootAudioName", void 0),
                                (e.TIME_BETWEEN_SHOTS = 1e3 / e.RPS),
                                (e.canShoot = !1),
                                (e.bulletPool = new h.ObjectPoolHandler(20, h.EnemyBullet)),
                                (e.shootAudioName = f.AUDIO_ENEMY_SHOOT),
                                e
                            );
                        }
                        return (
                            (0, a.default)(v, [
                                {
                                    key: "shoot",
                                    value: function () {
                                        var t = performance.now();
                                        t > this.lastShot + this.TIME_BETWEEN_SHOTS &&
                                            this.y > 0.5 * this.height &&
                                            ((this.lastShot = t), this.spawnBullets());
                                    },
                                },
                                {
                                    key: "spawnBullets",
                                    value: function () {
                                        var t = [],
                                            e = this.bulletPool.get();
                                        return e && (t.push(e), e.position.set(this.x, this.y)), t;
                                    },
                                },
                                {
                                    key: "update",
                                    value: function (t) {
                                        (0, l.default)((0, c.default)(v.prototype), "update", this).call(this, t),
                                            this.canShoot && this.shoot();
                                    },
                                },
                            ]),
                            v
                        );
                    })(n(41).Plane);
                e.ArmedPlane = v;
            },
            4123: function (t, e, n) {
                n(1539), n(2419);
                var o = n(5318),
                    i = o(n(4575)),
                    a = o(n(3913)),
                    r = o(n(1506)),
                    l = o(n(2205)),
                    u = o(n(8585)),
                    s = o(n(9754)),
                    c = o(n(9713));
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.BomberPlane = void 0);
                var d = n(661),
                    f = (function (t) {
                        (0, l.default)(f, t);
                        var e,
                            n,
                            o =
                                ((e = f),
                                (n = (function () {
                                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                                    if (Reflect.construct.sham) return !1;
                                    if ("function" == typeof Proxy) return !0;
                                    try {
                                        return (
                                            Boolean.prototype.valueOf.call(
                                                Reflect.construct(Boolean, [], function () {})
                                            ),
                                            !0
                                        );
                                    } catch (t) {
                                        return !1;
                                    }
                                })()),
                                function () {
                                    var t,
                                        o = (0, s.default)(e);
                                    if (n) {
                                        var i = (0, s.default)(this).constructor;
                                        t = Reflect.construct(o, arguments, i);
                                    } else t = o.apply(this, arguments);
                                    return (0, u.default)(this, t);
                                });
                        function f(t) {
                            var e;
                            return (
                                (0, i.default)(this, f),
                                (e = o.call(this, t)),
                                (0, c.default)((0, r.default)(e), "bulletSpeed", 2.9),
                                (0, c.default)((0, r.default)(e), "velocity", new d.Vector2D()),
                                (0, c.default)((0, r.default)(e), "active", !1),
                                (0, c.default)((0, r.default)(e), "entityType", 2),
                                (0, c.default)((0, r.default)(e), "RPS", 1),
                                (0, c.default)((0, r.default)(e), "TIME_BETWEEN_SHOTS", 0),
                                (0, c.default)((0, r.default)(e), "lastShot", 0),
                                (0, c.default)((0, r.default)(e), "PLAYER_BULLET_DAMAGE", 1),
                                e.scale.set(1, -1),
                                (e.TIME_BETWEEN_SHOTS = 2e3),
                                e.setVelocity(0, 1.6),
                                (e.BASE_HP = 9),
                                (e.hp = e.BASE_HP),
                                (e.canShoot = !0),
                                (e.CRITICAL_HIT_MULTIPLIER = 2),
                                e
                            );
                        }
                        return (
                            (0, a.default)(f, [
                                {
                                    key: "spawnBullets",
                                    value: function () {
                                        for (var t = [], e = this.bulletSpeed, n = -1; n < 2; n++)
                                            for (var o = -1; o < 2; o++)
                                                if (0 != n && 0 != o) {
                                                    var i = this.bulletPool.get();
                                                    i &&
                                                        (t.push(i),
                                                        i.position.set(this.x, this.y),
                                                        i.setVelocity(n * e, o * e),
                                                        i.limitVelocity(2.9));
                                                }
                                        return t;
                                    },
                                },
                            ]),
                            f
                        );
                    })(n(3100).ArmedPlane);
                e.BomberPlane = f;
            },
            9521: function (t, e, n) {
                n(1539), n(2419);
                var o = n(5318),
                    i = o(n(3913)),
                    a = o(n(4575)),
                    r = o(n(1506)),
                    l = o(n(2205)),
                    u = o(n(8585)),
                    s = o(n(9754)),
                    c = o(n(9713));
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.NormalPlane = void 0);
                var d = n(6389),
                    f = n(661),
                    h = (function (t) {
                        (0, l.default)(h, t);
                        var e,
                            n,
                            o =
                                ((e = h),
                                (n = (function () {
                                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                                    if (Reflect.construct.sham) return !1;
                                    if ("function" == typeof Proxy) return !0;
                                    try {
                                        return (
                                            Boolean.prototype.valueOf.call(
                                                Reflect.construct(Boolean, [], function () {})
                                            ),
                                            !0
                                        );
                                    } catch (t) {
                                        return !1;
                                    }
                                })()),
                                function () {
                                    var t,
                                        o = (0, s.default)(e);
                                    if (n) {
                                        var i = (0, s.default)(this).constructor;
                                        t = Reflect.construct(o, arguments, i);
                                    } else t = o.apply(this, arguments);
                                    return (0, u.default)(this, t);
                                });
                        function h() {
                            var t;
                            return (
                                (0, a.default)(this, h),
                                (t = o.call(this, d.Texture.from("aircraft_1.png"))),
                                (0, c.default)((0, r.default)(t), "velocity", new f.Vector2D()),
                                (0, c.default)((0, r.default)(t), "active", !1),
                                (0, c.default)((0, r.default)(t), "entityType", 2),
                                (0, c.default)((0, r.default)(t), "MAX_VELOCITY_X", 4),
                                (0, c.default)((0, r.default)(t), "MAX_VELOCITY_Y", 4),
                                (0, c.default)((0, r.default)(t), "RPS", 1),
                                (0, c.default)((0, r.default)(t), "TIME_BETWEEN_SHOTS", void 0),
                                (0, c.default)((0, r.default)(t), "lastShot", 0),
                                (0, c.default)((0, r.default)(t), "PLAYER_BULLET_DAMAGE", 1),
                                t.scale.set(1, -1),
                                (t.TIME_BETWEEN_SHOTS = 1e3 / t.RPS),
                                t.setVelocity(0, 2),
                                (t.BASE_HP = 1),
                                (t.hp = t.BASE_HP),
                                t
                            );
                        }
                        return (0, i.default)(h);
                    })(n(41).Plane);
                e.NormalPlane = h;
            },
            41: function (t, e, n) {
                n(1539), n(2419);
                var o = n(5318),
                    i = o(n(4575)),
                    a = o(n(3913)),
                    r = o(n(1506)),
                    l = o(n(6525)),
                    u = o(n(2205)),
                    s = o(n(8585)),
                    c = o(n(9754)),
                    d = o(n(9713));
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.Plane = void 0);
                var f = n(9342),
                    h = n(8418),
                    v = n(8067),
                    p = (function (t) {
                        (0, u.default)(p, t);
                        var e,
                            n,
                            o =
                                ((e = p),
                                (n = (function () {
                                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                                    if (Reflect.construct.sham) return !1;
                                    if ("function" == typeof Proxy) return !0;
                                    try {
                                        return (
                                            Boolean.prototype.valueOf.call(
                                                Reflect.construct(Boolean, [], function () {})
                                            ),
                                            !0
                                        );
                                    } catch (t) {
                                        return !1;
                                    }
                                })()),
                                function () {
                                    var t,
                                        o = (0, c.default)(e);
                                    if (n) {
                                        var i = (0, c.default)(this).constructor;
                                        t = Reflect.construct(o, arguments, i);
                                    } else t = o.apply(this, arguments);
                                    return (0, s.default)(this, t);
                                });
                        function p(t) {
                            var e;
                            return (
                                (0, i.default)(this, p),
                                (e = o.call(this, t)),
                                (0, d.default)((0, r.default)(e), "entityType", 2),
                                (0, d.default)((0, r.default)(e), "BASE_HP", 1),
                                (0, d.default)((0, r.default)(e), "hp", 1),
                                (0, d.default)((0, r.default)(e), "PLAYER_BULLET_DAMAGE", 1),
                                (0, d.default)((0, r.default)(e), "CRITICAL_HIT_MULTIPLIER", void 0),
                                (0, d.default)((0, r.default)(e), "eventController", void 0),
                                (0, d.default)((0, r.default)(e), "explosionRadius", void 0),
                                e.scale.set(1, -1),
                                e.setVelocity(0, 2),
                                (e.hp = e.BASE_HP),
                                (e.CRITICAL_HIT_MULTIPLIER = 1),
                                (e.eventController = h.EventController.getInstance()),
                                (e.explosionRadius = 300),
                                e
                            );
                        }
                        return (
                            (0, a.default)(p, [
                                {
                                    key: "despawn",
                                    value: function () {
                                        var t = this.x,
                                            e = this.y,
                                            n = 0.5 * this.width,
                                            o = 0.5 * this.height;
                                        (t + n < 0 ||
                                            t - n > f.GAME_WIDTH ||
                                            e - o > f.GAME_HEIGHT + o ||
                                            e + o < -8 * o) &&
                                            (this.active = this.visible = !1);
                                    },
                                },
                                {
                                    key: "damage",
                                    value: function (t, e, n) {
                                        var o = this;
                                        if (((this.hp -= t), this.hp <= 0))
                                            e &&
                                                (this.soundController.playEnemyRandomExplode(),
                                                this.soundController.playKillConfirmed()),
                                                e && h.ShockwaveController.getInstance().shockwave(this.x, this.y),
                                                e &&
                                                    this.eventController.emit(
                                                        "EXPLOSION1",
                                                        n,
                                                        { x: this.x, y: this.y },
                                                        this.explosionRadius
                                                    ),
                                                this.onDead(e),
                                                this.reset();
                                        else {
                                            var i = 16777215,
                                                a = { c: 0 };
                                            h.TweenController.getInstance().createUpdateTween(
                                                a,
                                                { c: 0 },
                                                { c: 1 },
                                                340,
                                                function () {
                                                    var t = a.c;
                                                    o.tint = t < 0.5 ? (0, v.lerp)(i, 0, t) : (0, v.lerp)(0, i, t);
                                                },
                                                this
                                            ),
                                                this.soundController.playEnemyHit();
                                        }
                                    },
                                },
                                {
                                    key: "collision",
                                    value: function (t) {
                                        if (t)
                                            switch (t.entityType) {
                                                case 1:
                                                    Math.abs(this.x - t.x) < 5
                                                        ? this.damage(
                                                              this.PLAYER_BULLET_DAMAGE * this.CRITICAL_HIT_MULTIPLIER,
                                                              this.BASE_HP,
                                                              t.poolParent
                                                          )
                                                        : this.damage(
                                                              this.PLAYER_BULLET_DAMAGE,
                                                              this.BASE_HP,
                                                              t.poolParent
                                                          );
                                                    break;
                                                case 0:
                                                    this.damage(1, 0, t);
                                            }
                                    },
                                },
                                {
                                    key: "reset",
                                    value: function () {
                                        (0, l.default)((0, c.default)(p.prototype), "reset", this).call(this),
                                            (this.hp = this.BASE_HP);
                                    },
                                },
                                {
                                    key: "onDead",
                                    value: function (t) {
                                        h.UIController.getInstance().addToScore(t);
                                    },
                                },
                            ]),
                            p
                        );
                    })(n(6195).Bullet);
                e.Plane = p;
            },
            8183: function (t, e, n) {
                n(2419);
                var o = n(5318);
                n(1539), n(4747);
                var i = o(n(4575)),
                    a = o(n(3913)),
                    r = o(n(1506)),
                    l = o(n(2205)),
                    u = o(n(8585)),
                    s = o(n(9754)),
                    c = o(n(9713));
                Object.defineProperty(e, "__esModule", { value: !0 }),
                    (e.PlayerPlane = e.GamepadControls = e.alternateControls = e.PrimaryControls = void 0);
                var d,
                    f,
                    h,
                    v,
                    p = n(6389),
                    y = (h = n(3444)) && h.__esModule ? h : { default: h },
                    _ = n(8508),
                    E = n(9342),
                    g = n(6195),
                    O = n(8418);
                !(function (t) {
                    (t.SHOOT = "n"), (t.LEFT = "a"), (t.RIGHT = "d"), (t.UP = "w"), (t.DOWN = "s");
                })((d = e.PrimaryControls || (e.PrimaryControls = {}))),
                    (function (t) {
                        (t.SHOOT = "space"), (t.LEFT = "left"), (t.RIGHT = "right"), (t.UP = "up"), (t.DOWN = "down");
                    })((f = e.alternateControls || (e.alternateControls = {}))),
                    ((v = e.GamepadControls || (e.GamepadControls = {})).SHOOT = "space"),
                    (v.LEFT = "left"),
                    (v.RIGHT = "right"),
                    (v.UP = "up"),
                    (v.DOWN = "down");
                var T = (function (t) {
                    (0, l.default)(h, t);
                    var e,
                        n,
                        o =
                            ((e = h),
                            (n = (function () {
                                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                                if (Reflect.construct.sham) return !1;
                                if ("function" == typeof Proxy) return !0;
                                try {
                                    return (
                                        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})),
                                        !0
                                    );
                                } catch (t) {
                                    return !1;
                                }
                            })()),
                            function () {
                                var t,
                                    o = (0, s.default)(e);
                                if (n) {
                                    var i = (0, s.default)(this).constructor;
                                    t = Reflect.construct(o, arguments, i);
                                } else t = o.apply(this, arguments);
                                return (0, u.default)(this, t);
                            });
                    function h() {
                        var t;
                        return (
                            (0, i.default)(this, h),
                            (t = o.call(this, p.Texture.from("player_plane_1.png"))),
                            (0, c.default)((0, r.default)(t), "kb", void 0),
                            (0, c.default)((0, r.default)(t), "gc", void 0),
                            (0, c.default)((0, r.default)(t), "velocity", new _.Vector2D()),
                            (0, c.default)((0, r.default)(t), "MAX_VELOCITY_X", 4),
                            (0, c.default)((0, r.default)(t), "MAX_VELOCITY_Y", 4),
                            (0, c.default)((0, r.default)(t), "RPS", 7),
                            (0, c.default)((0, r.default)(t), "TIME_BETWEEN_SHOTS", void 0),
                            (0, c.default)((0, r.default)(t), "lastShot", 0),
                            (0, c.default)((0, r.default)(t), "bulletPool", void 0),
                            (0, c.default)((0, r.default)(t), "controls", {
                                shoot: !1,
                                up: !1,
                                down: !1,
                                left: !1,
                                right: !1,
                            }),
                            (0, c.default)((0, r.default)(t), "fuel", 1),
                            (0, c.default)((0, r.default)(t), "lives", 9),
                            (0, c.default)((0, r.default)(t), "entityType", 0),
                            (0, c.default)((0, r.default)(t), "FRAME_BEFORE_ALT", 3),
                            (0, c.default)((0, r.default)(t), "fireRight", !0),
                            (0, c.default)((0, r.default)(t), "frameCount", void 0),
                            (0, c.default)((0, r.default)(t), "controlMapping", void 0),
                            (0, c.default)((0, r.default)(t), "movementMultiplier", { x: 1, y: 1 }),
                            (0, c.default)((0, r.default)(t), "shootFeedbackDuration", 50),
                            (0, c.default)((0, r.default)(t), "collisionBoundOffsets", {
                                x: 3,
                                y: 13,
                                width: 7,
                                height: 16,
                            }),
                            (0, c.default)((0, r.default)(t), "_collisionBound", { x: 0, y: 0, width: 0, height: 0 }),
                            (t.bulletPool = new g.ObjectPoolHandler(20, g.PlayerBullet, (0, r.default)(t))),
                            (t.TIME_BETWEEN_SHOTS = 1e3 / t.RPS),
                            (t.frameCount = t.FRAME_BEFORE_ALT),
                            (t.active = !0),
                            (t.visible = !0),
                            (t._collisionBound.width = t.collisionBoundOffsets.width),
                            (t._collisionBound.height = t.collisionBoundOffsets.height),
                            (t.controlMapping = [
                                [d.SHOOT, "Shoot"],
                                [d.UP, "Up"],
                                [d.DOWN, "Down"],
                                [d.LEFT, "Left"],
                                [d.RIGHT, "Right"],
                                [f.SHOOT, "Shoot"],
                                [f.UP, "Up"],
                                [f.DOWN, "Down"],
                                [f.LEFT, "Left"],
                                [f.RIGHT, "Right"],
                            ]),
                            (t.gc = new O.GamepadController((0, r.default)(t), [
                                [O.GamepadButtons.RIGHT_BOTTOM_SHOULDER, "Shoot"],
                                [O.GamepadButtons.DPAD_UP, "Up"],
                                [O.GamepadButtons.DPAD_DOWN, "Down"],
                                [O.GamepadButtons.DPAD_LEFT, "Left"],
                                [O.GamepadButtons.DPAD_RIGHT, "Right"],
                            ])),
                            (t.soundController = O.SoundController.getInstance()),
                            (t.kb = new y.default()),
                            t.initEvents(),
                            t
                        );
                    }
                    return (
                        (0, a.default)(h, [
                            {
                                key: "activateShoot",
                                value: function () {
                                    this.controls.shoot = !0;
                                },
                            },
                            {
                                key: "activateUp",
                                value: function () {
                                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                                    (this.movementMultiplier.y = t), (this.controls.up = !0);
                                },
                            },
                            {
                                key: "activateDown",
                                value: function () {
                                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                                    (this.movementMultiplier.y = t), (this.controls.down = !0);
                                },
                            },
                            {
                                key: "activateLeft",
                                value: function () {
                                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                                    (this.movementMultiplier.x = t), (this.controls.left = !0);
                                },
                            },
                            {
                                key: "activateRight",
                                value: function () {
                                    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
                                    (this.movementMultiplier.x = t), (this.controls.right = !0);
                                },
                            },
                            {
                                key: "deactivateShoot",
                                value: function () {
                                    this.controls.shoot = !1;
                                },
                            },
                            {
                                key: "deactivateUp",
                                value: function () {
                                    this.controls.up = !1;
                                },
                            },
                            {
                                key: "deactivateDown",
                                value: function () {
                                    this.controls.down = !1;
                                },
                            },
                            {
                                key: "deactivateLeft",
                                value: function () {
                                    this.controls.left = !1;
                                },
                            },
                            {
                                key: "deactivateRight",
                                value: function () {
                                    this.controls.right = !1;
                                },
                            },
                            {
                                key: "keyboardActive",
                                value: function () {
                                    this.gc.isActive = !1;
                                },
                            },
                            {
                                key: "initEvents",
                                value: function () {
                                    var t = this,
                                        e = this.kb,
                                        n = this.controls;
                                    e.on("blur", function () {
                                        (n.shoot = !1), (n.up = !1), (n.down = !1), (n.left = !1), (n.right = !1);
                                    }),
                                        this.controlMapping.forEach(function (n) {
                                            var o = n[0],
                                                i = n[1];
                                            e.keydown(o, function () {
                                                t.keyboardActive(), t["activate" + i]();
                                            }),
                                                e.keyup(o, function () {
                                                    t.keyboardActive(), t["deactivate" + i]();
                                                });
                                        }),
                                        this.on("destroyed", this.stopKeyboardListening, this);
                                },
                            },
                            {
                                key: "updateMovement",
                                value: function () {
                                    var t = this.controls,
                                        e = t.up,
                                        n = t.down,
                                        o = t.left,
                                        i = t.right,
                                        a = this.MAX_VELOCITY_X * Math.abs(this.movementMultiplier.x),
                                        r = this.MAX_VELOCITY_Y * Math.abs(this.movementMultiplier.y);
                                    e ? this.setVelocityY(-r) : n ? this.setVelocityY(r) : this.setVelocityY(0),
                                        o ? this.setVelocityX(-a) : i ? this.setVelocityX(a) : this.setVelocityX(0);
                                },
                            },
                            {
                                key: "shoot",
                                value: function () {
                                    var t = performance.now();
                                    if (t > this.lastShot) {
                                        this.lastShot = t + this.TIME_BETWEEN_SHOTS;
                                        var e = this.bulletPool.get();
                                        if (e) {
                                            var n = this.x,
                                                o = this.y;
                                            this.fireRight
                                                ? ((n += 3), this.soundController.playPlayerShootRight())
                                                : ((n -= 4), this.soundController.playPlayerShootLeft()),
                                                e.position.set(n, o),
                                                this.gc.vibrateRamped(
                                                    { weakMagnitude: 0.8, strongMagnitude: 0.7 },
                                                    { weakMagnitude: 0, strongMagnitude: 0 },
                                                    0.52 * this.TIME_BETWEEN_SHOTS
                                                );
                                        }
                                    }
                                },
                            },
                            {
                                key: "stopKeyboardListening",
                                value: function () {
                                    this.kb.destroy();
                                },
                            },
                            {
                                key: "setVelocityX",
                                value: function (t) {
                                    this.velocity.x = t;
                                },
                            },
                            {
                                key: "setVelocityY",
                                value: function (t) {
                                    this.velocity.y = t;
                                },
                            },
                            {
                                key: "update",
                                value: function (t) {
                                    this.gc.update(),
                                        --this.frameCount ||
                                            ((this.fireRight = !this.fireRight),
                                            (this.frameCount = this.FRAME_BEFORE_ALT)),
                                        this.bulletPool.update(t);
                                    var e = this.velocity,
                                        n = e.x,
                                        o = e.y;
                                    this.updateMovement(), this.controls.shoot && this.shoot();
                                    var i = 0.5 * this.width,
                                        a = this.x + n * t,
                                        r = this.y + o * t,
                                        l = a - i,
                                        u = a + i,
                                        s = r - 0.5 * this.height,
                                        c = r + 0.5 * this.height;
                                    u < E.GAME_WIDTH && l > 0 && (this.x = a),
                                        c < E.GAME_HEIGHT && s > 0 && (this.y = r);
                                },
                            },
                            {
                                key: "collision",
                                value: function () {
                                    this.emit("game-over");
                                },
                            },
                            {
                                key: "collisionBounds",
                                get: function () {
                                    var t = this.position,
                                        e = this._collisionBound;
                                    return (e.x = t.x), (e.y = t.y), e;
                                },
                            },
                        ]),
                        h
                    );
                })(g.Bullet);
                e.PlayerPlane = T;
            },
            2435: function (t, e, n) {
                n(1539), n(2419);
                var o = n(5318),
                    i = o(n(4575)),
                    a = o(n(3913)),
                    r = o(n(1506)),
                    l = o(n(2205)),
                    u = o(n(8585)),
                    s = o(n(9754)),
                    c = o(n(9713));
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.ShooterFighterPlane = void 0);
                var d = n(6389),
                    f = n(661),
                    h = (function (t) {
                        (0, l.default)(h, t);
                        var e,
                            n,
                            o =
                                ((e = h),
                                (n = (function () {
                                    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                                    if (Reflect.construct.sham) return !1;
                                    if ("function" == typeof Proxy) return !0;
                                    try {
                                        return (
                                            Boolean.prototype.valueOf.call(
                                                Reflect.construct(Boolean, [], function () {})
                                            ),
                                            !0
                                        );
                                    } catch (t) {
                                        return !1;
                                    }
                                })()),
                                function () {
                                    var t,
                                        o = (0, s.default)(e);
                                    if (n) {
                                        var i = (0, s.default)(this).constructor;
                                        t = Reflect.construct(o, arguments, i);
                                    } else t = o.apply(this, arguments);
                                    return (0, u.default)(this, t);
                                });
                        function h() {
                            var t;
                            return (
                                (0, i.default)(this, h),
                                (t = o.call(this, d.Texture.from("aircraft_1e.png"))),
                                (0, c.default)((0, r.default)(t), "velocity", new f.Vector2D()),
                                (0, c.default)((0, r.default)(t), "active", !1),
                                (0, c.default)((0, r.default)(t), "entityType", 2),
                                (0, c.default)((0, r.default)(t), "RPS", 1),
                                (0, c.default)((0, r.default)(t), "TIME_BETWEEN_SHOTS", 0),
                                (0, c.default)((0, r.default)(t), "lastShot", 0),
                                (0, c.default)((0, r.default)(t), "PLAYER_BULLET_DAMAGE", 1),
                                (0, c.default)((0, r.default)(t), "chanceToShoot", 0.4),
                                t.scale.set(1, -1),
                                (t.TIME_BETWEEN_SHOTS = 2e3),
                                t.setVelocity(0, 2),
                                (t.BASE_HP = 3),
                                (t.hp = t.BASE_HP),
                                (t.canShoot = !0),
                                t
                            );
                        }
                        return (
                            (0, a.default)(h, [
                                {
                                    key: "shoot",
                                    value: function () {
                                        var t = performance.now();
                                        t > this.lastShot + this.TIME_BETWEEN_SHOTS &&
                                            Math.random() < this.chanceToShoot &&
                                            ((this.lastShot = t), this.spawnBullets());
                                    },
                                },
                            ]),
                            h
                        );
                    })(n(3100).ArmedPlane);
                e.ShooterFighterPlane = h;
            },
            3602: function (t, e, n) {
                var o = Object.create
                        ? function (t, e, n, o) {
                              void 0 === o && (o = n),
                                  Object.defineProperty(t, o, {
                                      enumerable: !0,
                                      get: function () {
                                          return e[n];
                                      },
                                  });
                          }
                        : function (t, e, n, o) {
                              void 0 === o && (o = n), (t[o] = e[n]);
                          },
                    i = function (t, e) {
                        for (var n in t) "default" === n || Object.prototype.hasOwnProperty.call(e, n) || o(e, t, n);
                    };
                Object.defineProperty(e, "__esModule", { value: !0 }),
                    i(n(9521), e),
                    i(n(8183), e),
                    i(n(4123), e),
                    i(n(2435), e),
                    i(n(41), e),
                    i(n(3100), e),
                    i(n(4470), e),
                    i(n(7502), e);
            },
            661: function (t, e, n) {
                var o = n(5318),
                    i = o(n(8)),
                    a = o(n(4575)),
                    r = o(n(3913)),
                    l = o(n(9713));
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.Vector2D = void 0);
                var u = (function () {
                    function t(e, n) {
                        (0, a.default)(this, t),
                            (0, l.default)(this, "x", 0),
                            (0, l.default)(this, "y", 0),
                            (this.x = 0),
                            (this.y = 0),
                            "object" === (0, i.default)(e)
                                ? ((this.x = e.x || 0), (this.y = e.y || 0))
                                : (void 0 === n && (n = e), (this.x = e || 0), (this.y = n || 0));
                    }
                    return (
                        (0, r.default)(
                            t,
                            [
                                {
                                    key: "clone",
                                    value: function () {
                                        return new t(this.x, this.y);
                                    },
                                },
                                {
                                    key: "copy",
                                    value: function (t) {
                                        return (this.x = t.x || 0), (this.y = t.y || 0), this;
                                    },
                                },
                                {
                                    key: "setFromObject",
                                    value: function (t) {
                                        return (this.x = t.x || 0), (this.y = t.y || 0), this;
                                    },
                                },
                                {
                                    key: "set",
                                    value: function (t) {
                                        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : t;
                                        return void 0 === e && (e = t), (this.x = t), (this.y = e), this;
                                    },
                                },
                                {
                                    key: "setTo",
                                    value: function (t) {
                                        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : t;
                                        return this.set(t, e);
                                    },
                                },
                                {
                                    key: "setToPolar",
                                    value: function (t, e) {
                                        return (
                                            null == e && (e = 1),
                                            (this.x = Math.cos(t) * e),
                                            (this.y = Math.sin(t) * e),
                                            this
                                        );
                                    },
                                },
                                {
                                    key: "equals",
                                    value: function (t) {
                                        return this.x === t.x && this.y === t.y;
                                    },
                                },
                                {
                                    key: "angle",
                                    value: function () {
                                        var t = Math.atan2(this.y, this.x);
                                        return t < 0 && (t += 2 * Math.PI), t;
                                    },
                                },
                                {
                                    key: "setAngle",
                                    value: function (t) {
                                        return this.setToPolar(t, this.length());
                                    },
                                },
                                {
                                    key: "add",
                                    value: function (t) {
                                        return (this.x += t.x), (this.y += t.y), this;
                                    },
                                },
                                {
                                    key: "subtract",
                                    value: function (t) {
                                        return (this.x -= t.x), (this.y -= t.y), this;
                                    },
                                },
                                {
                                    key: "multiply",
                                    value: function (t) {
                                        return (this.x *= t.x), (this.y *= t.y), this;
                                    },
                                },
                                {
                                    key: "scale",
                                    value: function (t) {
                                        return (
                                            isFinite(t) ? ((this.x *= t), (this.y *= t)) : ((this.x = 0), (this.y = 0)),
                                            this
                                        );
                                    },
                                },
                                {
                                    key: "divide",
                                    value: function (t) {
                                        return (this.x /= t.x), (this.y /= t.y), this;
                                    },
                                },
                                {
                                    key: "negate",
                                    value: function () {
                                        return (this.x = -this.x), (this.y = -this.y), this;
                                    },
                                },
                                {
                                    key: "distance",
                                    value: function (e) {
                                        return t.distance(e, this);
                                    },
                                },
                                {
                                    key: "distanceSq",
                                    value: function (t) {
                                        var e = t.x - this.x,
                                            n = t.y - this.y;
                                        return e * e + n * n;
                                    },
                                },
                                {
                                    key: "length",
                                    value: function () {
                                        var t = this.x,
                                            e = this.y;
                                        return Math.sqrt(t * t + e * e);
                                    },
                                },
                                {
                                    key: "setLength",
                                    value: function (t) {
                                        return this.normalize().scale(t);
                                    },
                                },
                                {
                                    key: "lengthSq",
                                    value: function () {
                                        var t = this.x,
                                            e = this.y;
                                        return t * t + e * e;
                                    },
                                },
                                {
                                    key: "normalize",
                                    value: function () {
                                        var t = this.x,
                                            e = this.y,
                                            n = t * t + e * e;
                                        return (
                                            n > 0 && ((n = 1 / Math.sqrt(n)), (this.x = t * n), (this.y = e * n)), this
                                        );
                                    },
                                },
                                {
                                    key: "normalizeRightHand",
                                    value: function () {
                                        var t = this.x;
                                        return (this.x = -1 * this.y), (this.y = t), this;
                                    },
                                },
                                {
                                    key: "normalizeLeftHand",
                                    value: function () {
                                        var t = this.x;
                                        return (this.x = this.y), (this.y = -1 * t), this;
                                    },
                                },
                                {
                                    key: "dot",
                                    value: function (t) {
                                        return this.x * t.x + this.y * t.y;
                                    },
                                },
                                {
                                    key: "cross",
                                    value: function (t) {
                                        return this.x * t.y - this.y * t.x;
                                    },
                                },
                                {
                                    key: "lerp",
                                    value: function (t, e) {
                                        void 0 === e && (e = 0);
                                        var n = this.x,
                                            o = this.y;
                                        return (this.x = n + e * (t.x - n)), (this.y = o + e * (t.y - o)), this;
                                    },
                                },
                                {
                                    key: "reset",
                                    value: function () {
                                        return (this.x = 0), (this.y = 0), this;
                                    },
                                },
                                {
                                    key: "limit",
                                    value: function (t) {
                                        var e = this.length();
                                        return e && e > t && this.scale(t / e), this;
                                    },
                                },
                                {
                                    key: "reflect",
                                    value: function (t) {
                                        return (t = t.clone().normalize()), this.subtract(t.scale(2 * this.dot(t)));
                                    },
                                },
                                {
                                    key: "mirror",
                                    value: function (t) {
                                        return this.reflect(t).negate();
                                    },
                                },
                                {
                                    key: "rotate",
                                    value: function (t) {
                                        var e = Math.cos(t),
                                            n = Math.sin(t);
                                        return this.set(e * this.x - n * this.y, n * this.x + e * this.y);
                                    },
                                },
                            ],
                            [
                                {
                                    key: "distance",
                                    value: function (t, e) {
                                        var n = t.x - e.x,
                                            o = t.y - e.y;
                                        return Math.sqrt(n * n + o * o);
                                    },
                                },
                            ]
                        ),
                        t
                    );
                })();
                (0, l.default)(u, "ZERO", void 0),
                    (0, l.default)(u, "RIGHT", void 0),
                    (0, l.default)(u, "LEFT", void 0),
                    (0, l.default)(u, "UP", void 0),
                    (0, l.default)(u, "DOWN", void 0),
                    (0, l.default)(u, "ONE", void 0),
                    (e.Vector2D = u),
                    (u.ZERO = new u()),
                    (u.RIGHT = new u(1, 0)),
                    (u.LEFT = new u(-1, 0)),
                    (u.UP = new u(0, -1)),
                    (u.DOWN = new u(0, 1)),
                    (u.ONE = new u(1, 1));
            },
            8508: function (t, e, n) {
                var o = Object.create
                    ? function (t, e, n, o) {
                          void 0 === o && (o = n),
                              Object.defineProperty(t, o, {
                                  enumerable: !0,
                                  get: function () {
                                      return e[n];
                                  },
                              });
                      }
                    : function (t, e, n, o) {
                          void 0 === o && (o = n), (t[o] = e[n]);
                      };
                Object.defineProperty(e, "__esModule", { value: !0 }),
                    (function (t, e) {
                        for (var n in t) "default" === n || Object.prototype.hasOwnProperty.call(e, n) || o(e, t, n);
                    })(n(661), e);
            },
            902: function (t, e, n) {
                var o = n(5318);
                n(1539), n(4747), n(5218);
                var i = o(n(319)),
                    a = o(n(4575)),
                    r = o(n(3913)),
                    l = o(n(9713));
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.Topple = void 0);
                var u,
                    s = (u = n(7742)) && u.__esModule ? u : { default: u },
                    c = n(909),
                    d = n(9342),
                    f = (function () {
                        function t() {
                            (0, a.default)(this, t),
                                (0, l.default)(this, "retrievalPoints", []),
                                (0, l.default)(this, "pool", []),
                                (0, l.default)(this, "shouldUpdate", !0),
                                (0, l.default)(
                                    this,
                                    "quadTree",
                                    new s.default({ x: 0, y: 0, width: d.GAME_WIDTH, height: d.GAME_HEIGHT })
                                );
                        }
                        return (
                            (0, r.default)(t, [
                                {
                                    key: "registerRetrievalPoints",
                                    value: function (t) {
                                        this.retrievalPoints.push(t);
                                    },
                                },
                                {
                                    key: "addToPool",
                                    value: function (t) {
                                        var e;
                                        (e = this.pool).push.apply(e, (0, i.default)(t));
                                    },
                                },
                                {
                                    key: "update",
                                    value: function () {
                                        var t = this;
                                        null != this &&
                                            this.shouldUpdate &&
                                            (this.quadTree.clear(),
                                            this.pool.forEach(function (e) {
                                                t.quadTree.insert(e);
                                            }),
                                            this.retrievalPoints.forEach(function (e) {
                                                e.active &&
                                                    t.quadTree.retrieve(e).forEach(function (t) {
                                                        var n,
                                                            o,
                                                            i,
                                                            a,
                                                            r,
                                                            l,
                                                            u = e,
                                                            s = t;
                                                        if (u.collisionBounds) {
                                                            n = u.collisionBounds;
                                                            var d = u.collisionBoundOffsets;
                                                            (o = d.x), (i = d.y);
                                                        } else (n = u), (o = u.anchor.x * u.width), (i = u.anchor.y * u.height);
                                                        if (s.collisionBounds) {
                                                            a = s.collisionBounds;
                                                            var f = s.collisionBoundOffsets;
                                                            (r = f.x), (l = f.y);
                                                        } else (a = s), (r = s.anchor.x * s.width), (l = s.anchor.y * s.height);
                                                        s.active &&
                                                            (0, c.boxBox)(
                                                                n.x - o,
                                                                n.y - i,
                                                                n.width,
                                                                n.height,
                                                                a.x - r,
                                                                a.y - l,
                                                                a.width,
                                                                a.height
                                                            ) &&
                                                            (s.collision && (null == s || s.collision(u)),
                                                            u.collision && (null == u || u.collision(s)));
                                                    });
                                            }));
                                    },
                                },
                                {
                                    key: "destroy",
                                    value: function () {
                                        this.shouldUpdate = !1;
                                    },
                                },
                            ]),
                            t
                        );
                    })();
                e.Topple = f;
            },
            4110: function (t, e, n) {
                var o = Object.create
                    ? function (t, e, n, o) {
                          void 0 === o && (o = n),
                              Object.defineProperty(t, o, {
                                  enumerable: !0,
                                  get: function () {
                                      return e[n];
                                  },
                              });
                      }
                    : function (t, e, n, o) {
                          void 0 === o && (o = n), (t[o] = e[n]);
                      };
                Object.defineProperty(e, "__esModule", { value: !0 }),
                    (function (t, e) {
                        for (var n in t) "default" === n || Object.prototype.hasOwnProperty.call(e, n) || o(e, t, n);
                    })(n(902), e);
            },
            7435: function (t, e, n) {
                Object.defineProperty(e, "__esModule", { value: !0 }), (e.getApp = void 0);
                var o = n(6389),
                    i = n(9342),
                    a = {};
                function r() {
                    a.app.renderer.resize(window.innerWidth, window.innerHeight),
                        (a.app.stage.scale.x = window.innerWidth / i.GAME_WIDTH),
                        (a.app.stage.scale.y = window.innerHeight / i.GAME_HEIGHT);
                }
                function l() {
                    a.app && r();
                }
                e.getApp = function () {
                    return (
                        a.app ||
                            ((window.app = a.app =
                                new o.Application({
                                    width: i.GAME_WIDTH,
                                    height: i.GAME_HEIGHT,
                                    backgroundColor: i.GAME_BACKGROUND_COLOR,
                                    antialias: !1,
                                })),
                            document.body.appendChild(a.app.view),
                            window.addEventListener("resize", l),
                            r()),
                        a.app
                    );
                };
            },
            8067: function (t, e, n) {
                n(1539), n(4747), n(6699), n(2023), n(6992), n(1532), n(8783), n(3948);
                var o = Object.create
                    ? function (t, e, n, o) {
                          void 0 === o && (o = n),
                              Object.defineProperty(t, o, {
                                  enumerable: !0,
                                  get: function () {
                                      return e[n];
                                  },
                              });
                      }
                    : function (t, e, n, o) {
                          void 0 === o && (o = n), (t[o] = e[n]);
                      };
                Object.defineProperty(e, "__esModule", { value: !0 }),
                    (e.random =
                        e.getGraphicTexture =
                        e.generateCustomTextures =
                        e.createBackgroundWaterTexture =
                        e.Graphic_List =
                        e.createSpriteFromGraphic =
                        e.calculateImageAssetArrayCount =
                        e.lerp =
                            void 0);
                var i = n(6389),
                    a = n(9342),
                    r = n(7435);
                function l(t) {
                    var e = (0, r.getApp)();
                    return e.renderer.generateTexture(t, i.SCALE_MODES.NEAREST, e.renderer.resolution);
                }
                (e.lerp = function (t, e, n) {
                    return (1 - n) * t + n * e;
                }),
                    (e.calculateImageAssetArrayCount = function (t) {
                        var e = 0;
                        return (
                            t.forEach(function (t) {
                                t[1].includes("-atlas.json") ? (e += 2) : e++;
                            }),
                            e
                        );
                    }),
                    (e.createSpriteFromGraphic = function (t) {
                        var e = l(t);
                        return new i.Sprite(e);
                    });
                var u,
                    s = new Map();
                !(function (t) {
                    (t[(t.PRELOADER = 0)] = "PRELOADER"),
                        (t[(t.BULLET = 1)] = "BULLET"),
                        (t[(t.ENEMY_BULLET = 2)] = "ENEMY_BULLET"),
                        (t[(t.GAME_OVER_BACKGROUND = 3)] = "GAME_OVER_BACKGROUND");
                })((u = e.Graphic_List || (e.Graphic_List = {}))),
                    (e.createBackgroundWaterTexture = function () {
                        var t = (0, r.getApp)(),
                            e = document.createElement("canvas");
                        (e.width = a.GAME_WIDTH), (e.height = a.GAME_HEIGHT);
                        for (
                            var n = e.getContext("2d"),
                                o = i.Texture.from("water_tile"),
                                l = new i.Sprite(o),
                                u = t.renderer.plugins.extract.canvas(l),
                                s = l.width,
                                c = l.height,
                                d = Math.ceil(a.GAME_WIDTH / s),
                                f = Math.ceil(a.GAME_HEIGHT / c),
                                h = 0;
                            h < d;
                            h++
                        )
                            for (var v = 0; v < f; v++) null == n || n.drawImage(u, h * s, v * c);
                        return i.Texture.from(e);
                    }),
                    (e.generateCustomTextures = function () {
                        var t, e;
                        s.set(
                            u.PRELOADER,
                            l(
                                ((t = new i.Graphics()).beginFill(4474967),
                                t.lineStyle(0),
                                t.drawRect(0, 0, 0.25 * a.GAME_WIDTH, 0.05 * a.GAME_HEIGHT),
                                t.endFill(),
                                t)
                            )
                        ),
                            s.set(
                                u.BULLET,
                                l(
                                    ((e = new i.Graphics()).beginFill(16771899),
                                    e.lineStyle(0),
                                    e.drawRect(0, 0, 7, 7),
                                    e.endFill(),
                                    e)
                                )
                            ),
                            s.set(
                                u.ENEMY_BULLET,
                                l(
                                    (function () {
                                        var t = new i.Graphics();
                                        return (
                                            t.beginFill(16771899),
                                            t.lineStyle(1, 16711680),
                                            t.drawRect(0, 0, 7, 7),
                                            t.endFill(),
                                            t
                                        );
                                    })()
                                )
                            ),
                            s.set(
                                u.GAME_OVER_BACKGROUND,
                                l(
                                    (function () {
                                        var t = new i.Graphics();
                                        return (
                                            t.beginFill(0, 0.84),
                                            t.lineStyle(0),
                                            t.drawRect(0, 0, a.GAME_WIDTH, a.GAME_HEIGHT),
                                            t.endFill(),
                                            t
                                        );
                                    })()
                                )
                            );
                    }),
                    (e.getGraphicTexture = function (t) {
                        return s.get(t);
                    }),
                    (e.random = function () {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                        return t + Math.random() * (e - t);
                    }),
                    (function (t, e) {
                        for (var n in t) "default" === n || Object.prototype.hasOwnProperty.call(e, n) || o(e, t, n);
                    })(n(7435), e);
            },
            9342: function (t, e) {
                Object.defineProperty(e, "__esModule", { value: !0 }),
                    (e.ASSETS_LIST =
                        e.AUDIO_ENEMY_SHOOT =
                        e.AUDIO_KILL_CONFIRMED =
                        e.AUDIO_ENEMY_HIT =
                        e.AUDIO_MOUSE_CLICK =
                        e.AUDIO_EXPLOSION_5 =
                        e.AUDIO_EXPLOSION_4 =
                        e.AUDIO_EXPLOSION_3 =
                        e.AUDIO_EXPLOSION_2 =
                        e.AUDIO_EXPLOSION_1 =
                        e.AUDIO_PLAYER_SHOOT_RIGHT =
                        e.AUDIO_PLAYER_SHOOT_LEFT =
                        e.AUDIO_GAME_OVER_MUSIC =
                        e.AUDIO_MENU_MUSIC =
                        e.GAME_BACKGROUND_COLOR =
                        e.GAME_RATIO =
                        e.GAME_HEIGHT =
                        e.GAME_WIDTH =
                            void 0),
                    (e.GAME_WIDTH = window.innerWidth),
                    (e.GAME_HEIGHT = window.innerHeight),
                    (e.GAME_RATIO = e.GAME_WIDTH / e.GAME_HEIGHT),
                    (e.GAME_BACKGROUND_COLOR = 13882323),
                    (e.AUDIO_MENU_MUSIC = "AUDIO_MENU_MUSIC"),
                    (e.AUDIO_GAME_OVER_MUSIC = "AUDIO_GAME_OVER_MUSIC"),
                    (e.AUDIO_PLAYER_SHOOT_LEFT = "AUDIO_PLAYER_SHOOT_LEFT"),
                    (e.AUDIO_PLAYER_SHOOT_RIGHT = "AUDIO_PLAYER_SHOOT_RIGHT"),
                    (e.AUDIO_EXPLOSION_1 = "AUDIO_EXPLOSION_1"),
                    (e.AUDIO_EXPLOSION_2 = "AUDIO_EXPLOSION_2"),
                    (e.AUDIO_EXPLOSION_3 = "AUDIO_EXPLOSION_3"),
                    (e.AUDIO_EXPLOSION_4 = "AUDIO_EXPLOSION_4"),
                    (e.AUDIO_EXPLOSION_5 = "AUDIO_EXPLOSION_5"),
                    (e.AUDIO_MOUSE_CLICK = "AUDIO_MOUSE_CLICK"),
                    (e.AUDIO_ENEMY_HIT = "AUDIO_ENEMY_HIT"),
                    (e.AUDIO_KILL_CONFIRMED = "AUDIO_KILL_CONFIRMED"),
                    (e.AUDIO_ENEMY_SHOOT = "AUDIO_ENEMY_SHOOT"),
                    (e.ASSETS_LIST = [
                        ["air_units", "./assets/spriteSheets/air_units-atlas.json"],
                        ["player_plane", "./assets/spriteSheets/player_plane-atlas.json"],
                        ["water_tile", "./assets/img/water_tile.jpg"],
                        [e.AUDIO_MENU_MUSIC, "./assets/snd/edith-piaf-non-je-ne-regrette.ogg"],
                        [e.AUDIO_GAME_OVER_MUSIC, "./assets/snd/game-over.mp3"],
                        [e.AUDIO_PLAYER_SHOOT_LEFT, "./assets/snd/player_shoot_left.mp3"],
                        [e.AUDIO_PLAYER_SHOOT_RIGHT, "./assets/snd/player_shoot_right.mp3"],
                        [e.AUDIO_EXPLOSION_1, "./assets/snd/explosion_1.ogg"],
                        [e.AUDIO_EXPLOSION_2, "./assets/snd/explosion_2.ogg"],
                        [e.AUDIO_EXPLOSION_3, "./assets/snd/explosion_3.ogg"],
                        [e.AUDIO_EXPLOSION_4, "./assets/snd/explosion_4.ogg"],
                        [e.AUDIO_EXPLOSION_5, "./assets/snd/explosion_5.ogg"],
                        [e.AUDIO_MOUSE_CLICK, "./assets/snd/mouse-click.ogg"],
                        [e.AUDIO_ENEMY_HIT, "./assets/snd/hit_enemy.ogg"],
                        [e.AUDIO_KILL_CONFIRMED, "./assets/snd/kill_confirmed.mp3"],
                        [e.AUDIO_ENEMY_SHOOT, "./assets/snd/enemy_shoot.ogg"],
                        ["menu-bg-video", "./assets/vid/menu-bg-vid-3.mp4"],
                        ["dynamo", "./assets/img/dynamo.png"],
                        ["dm", "./assets/img/displacement_map.png"],
                    ]);
            },
            4909: function (t, e, n) {
                n(7941), n(2526), n(7327), n(5003), n(9337);
                var o = n(5318),
                    i = o(n(9713)),
                    a = o(n(319));
                function r(t, e) {
                    var n = Object.keys(t);
                    if (Object.getOwnPropertySymbols) {
                        var o = Object.getOwnPropertySymbols(t);
                        e &&
                            (o = o.filter(function (e) {
                                return Object.getOwnPropertyDescriptor(t, e).enumerable;
                            })),
                            n.push.apply(n, o);
                    }
                    return n;
                }
                function l(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = null != arguments[e] ? arguments[e] : {};
                        e % 2
                            ? r(Object(n), !0).forEach(function (e) {
                                  (0, i.default)(t, e, n[e]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
                            : r(Object(n)).forEach(function (e) {
                                  Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                              });
                    }
                    return t;
                }
                n(5218), n(1539), n(4747), n(9826), n(2222), n(9714);
                var u,
                    s,
                    c = Object.create
                        ? function (t, e, n, o) {
                              void 0 === o && (o = n),
                                  Object.defineProperty(t, o, {
                                      enumerable: !0,
                                      get: function () {
                                          return e[n];
                                      },
                                  });
                          }
                        : function (t, e, n, o) {
                              void 0 === o && (o = n), (t[o] = e[n]);
                          },
                    d = Object.create
                        ? function (t, e) {
                              Object.defineProperty(t, "default", { enumerable: !0, value: e });
                          }
                        : function (t, e) {
                              t.default = e;
                          },
                    f = (s = n(7686)) && s.__esModule ? s : { default: s },
                    h = (function (t) {
                        if (t && t.__esModule) return t;
                        var e = {};
                        if (null != t)
                            for (var n in t)
                                "default" !== n && Object.prototype.hasOwnProperty.call(t, n) && c(e, t, n);
                        return d(e, t), e;
                    })(n(6389)),
                    v = n(6389),
                    p = n(9342),
                    y = n(8418),
                    _ = n(3602),
                    E = n(4110),
                    g = n(8067),
                    O = n(7435);
                (window.PIXI = h), n(7761);
                var T,
                    S = v.Loader.shared,
                    m = 0.5 * p.GAME_WIDTH,
                    I = 0.5 * p.GAME_HEIGHT,
                    w = p.ASSETS_LIST,
                    P = (0, g.calculateImageAssetArrayCount)(w) + [].length,
                    A = 0,
                    M = new v.Sprite();
                function b() {
                    !(function () {
                        R();
                        var t = "Click on THIS text\n    or tap any button on your gamepad\n    to start game!",
                            e = new SpeechSynthesisUtterance(t);
                        speechSynthesis.speak(e);
                        var n = new v.Text(t, { align: "center" });
                        (n.x = 0.5 * u.renderer.width),
                            (n.y = 0.5 * u.renderer.height),
                            (n.interactive = !0),
                            (n.buttonMode = !0),
                            n.anchor.set(0.5),
                            n.on("pointerup", function () {
                                clearInterval(i),
                                    (function () {
                                        R();
                                        var t = u.renderer,
                                            e = 0.5 * t.width,
                                            n = 0.5 * t.height,
                                            o = T["menu-bg-video"].data;
                                        o.loop = !0;
                                        var i = v.Texture.from(o),
                                            a = new v.Sprite(i);
                                        if (n > e) {
                                            var r = window.innerHeight / o.videoHeight;
                                            (a.width = o.videoWidth * r), (a.height = o.videoHeight * r);
                                        } else {
                                            var l = window.innerWidth / o.videoWidth;
                                            if (
                                                ((a.width = o.videoWidth * l),
                                                (a.height = o.videoHeight * l),
                                                a.height < window.innerHeight)
                                            ) {
                                                var s = window.innerHeight / o.videoHeight;
                                                (a.width = o.videoWidth * s), (a.height = o.videoHeight * s);
                                            }
                                        }
                                        a.anchor.set(0.5),
                                            (a.x = e),
                                            (a.y = n),
                                            o.play(),
                                            y.SoundController.getInstance().playMenuMusic(),
                                            u.stage.addChild(a);
                                        var c = v.Sprite.from("dynamo");
                                        (c.x = 20), (c.y = 0.5 * t.height);
                                        var d = c.width / c.height;
                                        (c.scale.x = (0.502 * t.width) / c.width),
                                            (c.scale.y = c.width / d / c.height),
                                            c.anchor.set(0, 1);
                                        var f = new v.TextStyle({ fill: "white", align: "right" }),
                                            h = new v.Text(
                                                "Movement: WASD, Arrow keys, DPAD/Left-Stick on Controller\n        Shooting: Spacebar or RT/R2\n        N.B.: Use a controller with rumble\n        N.B.: Don't be too close to other planes when they blow up\n        N.B.: Bombers are weaker in the middle",
                                                f
                                            );
                                        h.anchor.set(1, 0.5),
                                            (h.x = t.width - 20),
                                            (h.y = 0.5 * t.height),
                                            (h.visible = !1);
                                        var p = new v.Text("Help", f);
                                        p.anchor.set(0, 0);
                                        var _ = new v.Text("PLAY", f);
                                        _.anchor.set(0, 0);
                                        (_.x = p.x = c.x),
                                            (_.y = c.getBounds().bottom + 10),
                                            (p.y = _.getBounds().bottom + 10),
                                            (_.interactive = !0),
                                            (_.buttonMode = !0),
                                            (p.interactive = !0),
                                            (p.buttonMode = !0);
                                        _.on("pointerup", function () {
                                            o.pause(),
                                                (o.currentTime = 0),
                                                y.SoundController.getInstance().stopAll(),
                                                y.SoundController.getInstance().playMouseClick(),
                                                clearInterval(g),
                                                x();
                                        }),
                                            p.on("pointerup", function () {
                                                h.visible = !h.visible;
                                            });
                                        var E = !1,
                                            g = setInterval(function () {
                                                var t = navigator.getGamepads().find(function (t) {
                                                    return !!t;
                                                });
                                                t &&
                                                    ((t.buttons[y.GamepadButtons.START_FORWARD].pressed ||
                                                        t.buttons[y.GamepadButtons.FACE_1].pressed ||
                                                        t.buttons[y.GamepadButtons.FACE_2].pressed ||
                                                        t.buttons[y.GamepadButtons.FACE_3].pressed ||
                                                        t.buttons[y.GamepadButtons.FACE_4].pressed) &&
                                                        (console.log("A, B, X, Y, pressed"), clearInterval(g)),
                                                    t.buttons[y.GamepadButtons.SELECT_BACK].pressed && !E
                                                        ? (E = !0)
                                                        : !t.buttons[y.GamepadButtons.SELECT_BACK].pressed &&
                                                          E &&
                                                          (p.emit("pointerup"), (E = !1)));
                                            }, 1e3 / 30);
                                        u.stage.addChild(c),
                                            u.stage.addChild(_),
                                            u.stage.addChild(h),
                                            u.stage.addChild(p);
                                        var O = new v.Text("v0.7.0", new v.TextStyle({ fill: "white" }));
                                        O.updateText(!0), (O.x = e), (O.y = t.height - O.height), u.stage.addChild(O);
                                    })();
                            });
                        var o = !1,
                            i = setInterval(function () {
                                var t = navigator.getGamepads().find(function (t) {
                                    return !!t;
                                });
                                t &&
                                    (t.buttons.some(function (t) {
                                        return t.pressed;
                                    })
                                        ? (o = !0)
                                        : o && ((o = !1), clearInterval(i), n.emit("pointerup")));
                            }, 1e3 / 30);
                        u.stage.addChild(n);
                    })();
                }
                function R() {
                    (0, g.generateCustomTextures)(),
                        u.stage.children.forEach(function (t) {
                            t.destroy({ children: !0 });
                        }),
                        u.stage.removeChildren();
                }
                function x() {
                    var t = u.stage;
                    R();
                    var e,
                        n,
                        o,
                        i,
                        r =
                            ((n = 2 * (e = (0, g.createBackgroundWaterTexture)()).width + window.innerWidth),
                            (o = 2 * e.height + window.innerHeight),
                            ((i = new v.TilingSprite(e, n, o)).x = 0.5 * -e.width),
                            (i.y = 0.5 * -e.height),
                            i),
                        s = v.Sprite.from("dm");
                    s.texture.baseTexture.wrapMode = h.WRAP_MODES.REPEAT;
                    var c = new h.filters.DisplacementFilter(s);
                    (r.filters = [c]), t.addChild(r), y.CameraController.getInstance();
                    var d,
                        f =
                            ((d = new _.PlayerPlane()).anchor.set(0.5, 0.5),
                            d.position.set(m, p.GAME_HEIGHT - (d.height + 10)),
                            (d.roundPixels = !0),
                            d);
                    y.SoundController.getInstance().setPlayerRef(f), t.addChild(f);
                    var O = new y.Spawner(f),
                        T = { dangerToPlayer: new E.Topple(), playerShoots: new E.Topple() };
                    T.dangerToPlayer.registerRetrievalPoints(f),
                        T.dangerToPlayer.addToPool(
                            [].concat(
                                (0, a.default)(O.fighterPool.pool),
                                (0, a.default)(O.shootingFightersPool.pool),
                                (0, a.default)(O.fourShotBomberPool.pool),
                                (0, a.default)(O.bulletPool.pool),
                                (0, a.default)(O.eightShotBomberPool.pool)
                            )
                        ),
                        f.bulletPool.pool.forEach(function (t) {
                            var e;
                            null === (e = T) || void 0 === e || e.playerShoots.registerRetrievalPoints(t);
                        }),
                        T.playerShoots.addToPool(
                            [].concat(
                                (0, a.default)(O.fighterPool.pool),
                                (0, a.default)(O.shootingFightersPool.pool),
                                (0, a.default)(O.fourShotBomberPool.pool),
                                (0, a.default)(O.eightShotBomberPool.pool)
                            )
                        );
                    var S = y.UIController.getInstance(),
                        I = y.TweenController.getInstance(),
                        w = function (t) {
                            try {
                                var e, n;
                                O.update(t),
                                    (r.tilePosition.y += 1 * t),
                                    r.tilePosition.y > p.GAME_HEIGHT &&
                                        (r.tilePosition.y = r.tilePosition.y - p.GAME_HEIGHT),
                                    f.update(t),
                                    null === (e = T) || void 0 === e || e.dangerToPlayer.update(),
                                    null === (n = T) || void 0 === n || n.playerShoots.update(),
                                    I.update();
                            } catch (t) {
                                console.error(t);
                            }
                        };
                    f.on("game-over", function () {
                        var t, e;
                        console.log("Game Over!!!"),
                            u.ticker.remove(w),
                            y.CameraController.getInstance().resetCamera(),
                            O.gameOver(),
                            null === (t = T) || void 0 === t || t.dangerToPlayer.destroy(),
                            null === (e = T) || void 0 === e || e.playerShoots.destroy(),
                            (T = null),
                            S.gameEnded();
                        var n = y.UIController.getInstance().getScore();
                        (y.UIController.instance = void 0),
                            (y.TweenController.instance = void 0),
                            (y.CameraController.instance = void 0),
                            y.ShockwaveController.getInstance().resetShockwave(),
                            (y.ShockwaveController.instance = void 0),
                            (function (t) {
                                (0, g.generateCustomTextures)(),
                                    y.SoundController.getInstance().stopAll(),
                                    y.SoundController.getInstance().playGameOverMusic();
                                var e = new v.Container();
                                u.stage.addChild(e);
                                var n = new v.Sprite((0, g.getGraphicTexture)(g.Graphic_List.GAME_OVER_BACKGROUND));
                                e.addChild(n);
                                var o = u.renderer,
                                    i = 0.5 * o.width,
                                    a = 0.5 * o.height,
                                    r = { fontFamily: "Courier New", fill: 13882323 },
                                    s = Math.round(0.02 * window.innerWidth),
                                    c = new v.Text("GAME OVER", new v.TextStyle(l(l({}, r), {}, { fontSize: s + 40 })));
                                (c.x = i), (c.y = 0.3333 * o.height), c.anchor.set(0.5), e.addChild(c);
                                var d = new v.Text(
                                        t.toString(),
                                        new v.TextStyle(l(l({}, r), {}, { fontSize: s + 22 }))
                                    ),
                                    f = new v.Text("Score", new v.TextStyle(l(l({}, r), {}, { fontSize: s })));
                                (d.x = i),
                                    (d.y = a),
                                    d.anchor.set(0.5),
                                    (f.x = i),
                                    (f.y = d.getBounds().bottom + 4),
                                    f.anchor.set(0.5, 0),
                                    e.addChild(d),
                                    e.addChild(f);
                                var h = new v.Text(
                                    "Play Again",
                                    new v.TextStyle(l(l({}, r), {}, { fontSize: s + 22 }))
                                );
                                (h.interactive = !0),
                                    (h.buttonMode = !0),
                                    h.anchor.set(0.5),
                                    (h.x = i),
                                    (h.y = 0.68 * o.height),
                                    h.on("pointerup", function () {
                                        y.SoundController.getInstance().stopAll(), clearInterval(_), x();
                                    }),
                                    e.addChild(h);
                                var p = !1,
                                    _ = setInterval(function () {
                                        var t = navigator.getGamepads().find(function (t) {
                                            return !!t;
                                        });
                                        t &&
                                            (t.buttons[y.GamepadButtons.START_FORWARD].pressed ||
                                            t.buttons[y.GamepadButtons.FACE_1].pressed ||
                                            t.buttons[y.GamepadButtons.FACE_2].pressed ||
                                            t.buttons[y.GamepadButtons.FACE_3].pressed ||
                                            t.buttons[y.GamepadButtons.FACE_4].pressed
                                                ? (p = !0)
                                                : p && ((p = !1), clearInterval(_), h.emit("pointerup")));
                                    }, 1e3 / 30);
                            })(n);
                    }),
                        u.ticker.add(w);
                }
                (Math.random = (0, f.default)()),
                    (window.onload = function () {
                        (u = (0, O.getApp)()),
                            (function () {
                                R(),
                                    (M = (function () {
                                        var t = new v.Sprite((0, g.getGraphicTexture)(g.Graphic_List.PRELOADER));
                                        t.anchor.set(0, 0.5);
                                        var e = 0.5 * -t.width + m;
                                        return t.position.set(e, I), t.scale.set(0.1, 1), t;
                                    })());
                                var t = new v.Text("Loading...", { fontSize: 34 });
                                t.anchor.set(0, 0.5), t.position.set(M.x, M.y - M.height), u.stage.addChild(t);
                            })(),
                            u.stage.addChild(M),
                            w.forEach(function (t) {
                                S.add.apply(S, (0, a.default)(t));
                            }),
                            S.onLoad.add(function () {
                                ++A;
                                var t = Math.max(A / P, 0.1);
                                M.scale.set(t, 1), console.log("Progress:", t);
                            }),
                            S.load(),
                            S.onComplete.once(function (t) {
                                console.log("Resources:", t), (T = t.resources), b();
                            });
                    });
            },
        },
        n = {};
    function o(t) {
        var i = n[t];
        if (void 0 !== i) return i.exports;
        var a = (n[t] = { id: t, loaded: !1, exports: {} });
        return e[t].call(a.exports, a, a.exports, o), (a.loaded = !0), a.exports;
    }
    (o.m = e),
        (t = []),
        (o.O = function (e, n, i, a) {
            if (!n) {
                var r = 1 / 0;
                for (c = 0; c < t.length; c++) {
                    (n = t[c][0]), (i = t[c][1]), (a = t[c][2]);
                    for (var l = !0, u = 0; u < n.length; u++)
                        (!1 & a || r >= a) &&
                        Object.keys(o.O).every(function (t) {
                            return o.O[t](n[u]);
                        })
                            ? n.splice(u--, 1)
                            : ((l = !1), a < r && (r = a));
                    if (l) {
                        t.splice(c--, 1);
                        var s = i();
                        void 0 !== s && (e = s);
                    }
                }
                return e;
            }
            a = a || 0;
            for (var c = t.length; c > 0 && t[c - 1][2] > a; c--) t[c] = t[c - 1];
            t[c] = [n, i, a];
        }),
        (o.n = function (t) {
            var e =
                t && t.__esModule
                    ? function () {
                          return t.default;
                      }
                    : function () {
                          return t;
                      };
            return o.d(e, { a: e }), e;
        }),
        (o.d = function (t, e) {
            for (var n in e) o.o(e, n) && !o.o(t, n) && Object.defineProperty(t, n, { enumerable: !0, get: e[n] });
        }),
        (o.g = (function () {
            if ("object" == typeof globalThis) return globalThis;
            try {
                return this || new Function("return this")();
            } catch (t) {
                if ("object" == typeof window) return window;
            }
        })()),
        (o.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e);
        }),
        (o.r = function (t) {
            "undefined" != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
                Object.defineProperty(t, "__esModule", { value: !0 });
        }),
        (o.nmd = function (t) {
            return (t.paths = []), t.children || (t.children = []), t;
        }),
        (function () {
            var t = { 179: 0 };
            o.O.j = function (e) {
                return 0 === t[e];
            };
            var e = function (e, n) {
                    var i,
                        a,
                        r = n[0],
                        l = n[1],
                        u = n[2],
                        s = 0;
                    if (
                        r.some(function (e) {
                            return 0 !== t[e];
                        })
                    ) {
                        for (i in l) o.o(l, i) && (o.m[i] = l[i]);
                        if (u) var c = u(o);
                    }
                    for (e && e(n); s < r.length; s++) (a = r[s]), o.o(t, a) && t[a] && t[a][0](), (t[r[s]] = 0);
                    return o.O(c);
                },
                n = (self.webpackChunkproject_dynamo = self.webpackChunkproject_dynamo || []);
            n.forEach(e.bind(null, 0)), (n.push = e.bind(null, n.push.bind(n)));
        })();
    var i = o.O(void 0, [970], function () {
        return o(4909);
    });
    i = o.O(i);
})();
