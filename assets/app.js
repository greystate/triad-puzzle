"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  var ACCIDENTAL, ACCIDENTALS, DEFAULTS, PIECES, ROOTS, SPACE_KEY, TYPE, TYPES, Triad, TriadPuzzle, TriadPuzzleController, randomInt;

  randomInt = function randomInt() {
    var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  ACCIDENTAL = {
    flat: -1,
    natural: 0,
    sharp: 1
  };
  TYPE = {
    major: 0,
    minor: 1,
    diminished: 2,
    augmented: 3,
    add9: 4,
    madd9: 5,
    sus2: 6,
    sus4: 7
  };
  DEFAULTS = {
    pitch: 0,
    // 0-11
    acc: 0,
    // -1, 0, 1    (b, [nothing/natural], #)
    type: 0 // 0-7         (major, minor, diminished, augmented etc.)

  };
  ROOTS = 'C D EF G A B'; //              012345678901

  ACCIDENTALS = 'b #';
  TYPES = ['', 'm', 'dim', '+', 'add9', 'm(add9)', 'sus2', 'sus4'];

  Triad =
  /*#__PURE__*/
  function () {
    function Triad() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Triad);

      if (typeof options === 'string') {
        return Triad.fromSymbol(options);
      } else {
        this.pitch = options.pitch;
        this.acc = options.acc;
        this.type = options.type;

        if (this.pitch == null) {
          this.pitch = DEFAULTS.pitch;
        }

        if (this.acc == null) {
          this.acc = DEFAULTS.acc;
        }

        if (this.type == null) {
          this.type = DEFAULTS.type;
        }
      }

      this.validate();
    }

    _createClass(Triad, [{
      key: "validate",
      value: function validate() {
        switch (this.acc) {
          case -1:
            switch (this.pitch) {
              case 0:
              case 2:
              case 5:
              case 7:
              case 9:
                // Can't be represented as a "flat"
                return this.acc = 0;
            }

            break;

          case 0:
            switch (this.pitch) {
              case 1:
              case 3:
              case 6:
              case 8:
                return this.acc = 1;

              case 10:
                return this.acc = -1;
            }

            break;

          case 1:
            switch (this.pitch) {
              case 2:
              case 4:
              case 7:
              case 9:
              case 11:
                // Can't be represented as a "sharp"
                return this.acc = 0;
            }

        }
      }
    }, {
      key: "rootName",
      value: function rootName() {
        return "".concat(this.baseName()).concat(this.accidentalSign());
      }
    }, {
      key: "baseName",
      value: function baseName() {
        var index;
        index = this.pitch - this.acc;

        if (index > 11) {
          index = 0;
        }

        if (index < 0) {
          index = 11;
        }

        return ROOTS.charAt(index);
      }
    }, {
      key: "accidentalSign",
      value: function accidentalSign() {
        var forHTML = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (!forHTML) {
          switch (this.acc) {
            case -1:
              return 'b';

            case 1:
              return '#';

            default:
              return '';
          }
        }
      }
    }, {
      key: "typeName",
      value: function typeName() {
        return TYPES[this.type];
      }
    }, {
      key: "toSymbol",
      value: function toSymbol() {
        return "".concat(this.rootName()).concat(this.typeName());
      }
    }, {
      key: "toHTML",
      value: function toHTML() {
        var acc, accEntity, accHTML, base, baseHTML, parts, type, typeHTML;
        base = this.baseName();
        acc = this.accidentalSign();
        accEntity = this.accidentalSign(true);
        type = this.typeName();
        baseHTML = "<data class=\"root\" value=\"".concat(base, "\">").concat(base, "</data>");
        accHTML = acc !== '' ? "<data class=\"acc\" value=\"".concat(acc, "\">").concat(acc, "</data>") : '';
        typeHTML = type !== '' ? "<data class=\"triad\" value=\"".concat(type, "\">").concat(type, "</data>") : '';
        parts = [baseHTML, accHTML, typeHTML].filter(function (val) {
          return val !== '';
        });
        return "<span class=\"piece\">\n\t".concat(parts.join('\n\t'), "\n</span>");
      }
    }], [{
      key: "fromSymbol",
      value: function fromSymbol(symbol) {
        var acc, accidental, match, pitch, root, symbolRE, triadtype, type;
        symbolRE = /^([CDEFGAB])([b\#]?)(\+|m|dim)?$/; // root
        // optional accidental
        // optional triad type

        if (symbolRE.test(symbol)) {
          var _symbol$match = symbol.match(symbolRE);

          var _symbol$match2 = _slicedToArray(_symbol$match, 4);

          match = _symbol$match2[0];
          root = _symbol$match2[1];
          accidental = _symbol$match2[2];
          triadtype = _symbol$match2[3];
          acc = accidental !== '' ? ACCIDENTALS.indexOf(accidental) - 1 : 0;
          pitch = ROOTS.indexOf(root) + acc;
          type = triadtype !== void 0 ? TYPES.indexOf(triadtype) : 0;
          return new Triad({
            pitch: pitch,
            acc: acc,
            type: type
          });
        }
      }
    }]);

    return Triad;
  }();

  window.Triad = Triad;
  SPACE_KEY = 32;
  PIECES = 8;

  TriadPuzzle =
  /*#__PURE__*/
  function () {
    function TriadPuzzle() {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, TriadPuzzle);

      this.sheetSelector = options.sheetSelector;
      this.majorAndMinorOnly = options.majorAndMinorOnly;
      this.add9s = options.add9s;

      if (this.sheetSelector == null) {
        this.sheetSelector = '.sheet';
      }

      if (this.majorAndMinorOnly == null) {
        this.majorAndMinorOnly = false;
      }

      if (this.add9s == null) {
        this.add9s = false;
      }

      if (this.suss == null) {
        this.suss = false;
      }

      this.setupSheet();
      document.body.addEventListener('keypress', function (event) {
        if (event.keyCode === SPACE_KEY) {
          event.preventDefault();
          return _this.setupSheet();
        }
      });
      document.body.addEventListener('touchend', function (event) {
        var target;
        target = event.target;

        if (target.closest('.piece')) {
          return _this.setupSheet();
        }
      });
    }

    _createClass(TriadPuzzle, [{
      key: "setupSheet",
      value: function setupSheet() {
        var keepExisting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var count, hanger, item, previousTriad, rotation, sheet, triad;
        sheet = document.querySelector(this.sheetSelector);
        hanger = document.createDocumentFragment();
        previousTriad = null;
        count = 1; // We need 8 pieces, but we don't want to have
        // two identical triads follow each other

        while (count <= PIECES) {
          item = document.createElement('li');
          triad = this.getRandomTriad();

          if (triad.toSymbol() !== previousTriad) {
            rotation = randomInt(-2, 3);
            item.innerHTML = triad.toHTML();
            item.style.setProperty('--rotation', rotation);
            hanger.appendChild(item);
            previousTriad = triad.toSymbol();
            count++;
          }
        }

        if (keepExisting !== true) {
          sheet.innerHTML = '';
        }

        return sheet.appendChild(hanger);
      }
    }, {
      key: "getRandomTriad",
      value: function getRandomTriad() {
        var acc, pitch, type;
        pitch = randomInt(0, 11);
        acc = randomInt(-1, 1);
        type = randomInt(0, this.majorAndMinorOnly ? 1 : 3);

        if (this.add9s && type <= 1) {
          if (randomInt(0, 20) > 16) {
            type += 4;
          }
        }

        if (this.suss && type <= 1) {
          if (randomInt(0, 20) > 13) {
            type += 6;
          }
        }

        return new Triad({
          pitch: pitch,
          acc: acc,
          type: type
        });
      }
    }]);

    return TriadPuzzle;
  }(); // Export


  window.TriadPuzzle = TriadPuzzle; // @codekit-prepend "helpers.coffee"
  // @codekit-prepend "triad.coffee"
  // Global app object 

  if (window.app == null) {
    window.app = {};
  } // Main controller for the page's functions


  TriadPuzzleController =
  /*#__PURE__*/
  function () {
    function TriadPuzzleController() {
      _classCallCheck(this, TriadPuzzleController);

      this.setup();
    }

    _createClass(TriadPuzzleController, [{
      key: "setup",
      value: function setup() {
        return this.puzzle = new TriadPuzzle({
          majorAndMinorOnly: true
        });
      }
    }]);

    return TriadPuzzleController;
  }(); // Start everything when the page is ready


  document.addEventListener('DOMContentLoaded', function (event) {
    return app.controller = new TriadPuzzleController();
  }); // @codekit-prepend "triad-puzzle.coffee"
}).call(void 0);

//# sourceMappingURL=app.js.map
