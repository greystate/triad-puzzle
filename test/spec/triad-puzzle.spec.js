"use strict";

describe("Triad", function () {
  describe("creation", function () {
    var _this = this;

    this.triad = new Triad();
    this.otherTriad = new Triad({
      pitch: 3,
      acc: 1,
      type: 1
    });
    this.notherTriad = new Triad("Abdim");
    it("defaults to a C major triad", function () {
      expect(_this.triad.pitch).toEqual(0);
      expect(_this.triad.acc).toEqual(0);
      return expect(_this.triad.type).toEqual(0);
    });
    it("can create a D#m triad as well", function () {
      expect(_this.otherTriad.pitch).toEqual(3);
      expect(_this.otherTriad.acc).toEqual(1);
      return expect(_this.otherTriad.type).toEqual(1);
    });
    it("can create with a symbol too", function () {
      expect(_this.notherTriad.pitch).toEqual(8);
      expect(_this.notherTriad.acc).toEqual(-1);
      return expect(_this.notherTriad.type).toEqual(2);
    });
    it("reports its root name", function () {
      expect(_this.triad.rootName()).toEqual('C');
      expect(_this.otherTriad.rootName()).toEqual('D#');
      return expect(_this.notherTriad.rootName()).toEqual('Ab');
    });
    it("reports its accidental sign", function () {
      expect(_this.triad.accidentalSign()).toEqual('');
      expect(_this.otherTriad.accidentalSign()).toEqual('#');
      return expect(_this.notherTriad.accidentalSign()).toEqual('b');
    });
    return it("reports its type name", function () {
      expect(_this.triad.typeName()).toEqual('');
      expect(_this.otherTriad.typeName()).toEqual('m');
      return expect(_this.notherTriad.typeName()).toEqual('dim');
    });
  });
  describe("@fromSymbol", function () {
    var _this2 = this;

    it("builds a minor Triad from its symbol", function () {
      _this2.triad = Triad.fromSymbol('C#m');
      expect(_this2.triad.pitch).toEqual(1);
      expect(_this2.triad.acc).toEqual(1);
      return expect(_this2.triad.type).toEqual(1);
    });
    it("builds an augmented Triad from its symbol", function () {
      _this2.triad = Triad.fromSymbol('Ab+');
      expect(_this2.triad.pitch).toEqual(8);
      expect(_this2.triad.acc).toEqual(-1);
      return expect(_this2.triad.type).toEqual(3);
    });
    it("builds a major Triad from its symbol", function () {
      this.triad = Triad.fromSymbol('F');
      expect(this.triad.pitch).toEqual(5);
      expect(this.triad.acc).toEqual(0);
      return expect(this.triad.type).toEqual(0);
    });
    it("builds a diminished Triad from its symbol", function () {
      this.triad = Triad.fromSymbol('Bbdim');
      expect(this.triad.pitch).toEqual(10);
      expect(this.triad.acc).toEqual(-1);
      return expect(this.triad.type).toEqual(2);
    });
    return it("Shouldn't build a Triad from a wrong symbol", function () {
      this.triad = Triad.fromSymbol('Pdiddy');
      return expect(this.triad).toBeUndefined();
    });
  });
  describe(".toSymbol()", function () {
    var _this3 = this;

    it("converts a C major triad", function () {
      _this3.triad = new Triad();
      return expect(_this3.triad.toSymbol()).toEqual('C');
    });
    it("converts a Db minor triad", function () {
      this.triad = new Triad({
        pitch: 1,
        acc: -1,
        type: 1
      });
      return expect(this.triad.toSymbol()).toEqual('Dbm');
    });
    it("converts an F#+ triad", function () {
      this.triad = new Triad({
        pitch: 6,
        acc: 1,
        type: 3
      });
      return expect(this.triad.toSymbol()).toEqual('F#+');
    });
    return it("converts a Bdim triad", function () {
      this.triad = new Triad({
        pitch: 11,
        acc: 0,
        type: 2
      });
      return expect(this.triad.toSymbol()).toEqual('Bdim');
    });
  });
  return describe(".toHTML()", function () {
    it("renders a simple C triad", function () {
      var html;
      this.triad = new Triad();
      html = this.triad.toHTML();
      return expect(html).toEqual("<span class=\"piece\">\n	<data class=\"root\" value=\"C\">C</data>\n</span>");
    });
    return it("also renders an F#+ triad", function () {
      var html;
      this.triad = new Triad('F#+');
      html = this.triad.toHTML();
      return expect(html).toEqual("<span class=\"piece\">\n	<data class=\"root\" value=\"F\">F</data>\n	<data class=\"acc\" value=\"#\">♯</data>\n	<data class=\"triad\" value=\"+\">+</data>\n</span>");
    });
  });
});
