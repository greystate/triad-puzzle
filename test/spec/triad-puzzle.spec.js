"use strict";

describe("Triad", function () {
  describe("creation", function () {
    var _this = this;

    this.triad = new Triad();
    return it("defaults to a C major triad", function () {
      expect(_this.triad.pitch).toEqual(0);
      expect(_this.triad.acc).toEqual(0);
      return expect(_this.triad.type).toEqual(0);
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
  return describe(".toSymbol()", function () {
    var _this3 = this;

    return it("defaults to a C major triad", function () {
      _this3.triad = new Triad();
      return expect(_this3.triad.toSymbol()).toEqual('C');
    });
  });
});
