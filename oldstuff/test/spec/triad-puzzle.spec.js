"use strict";

describe("Triad", function () {
  describe("creation", function () {
    this.triad = new Triad();
    this.otherTriad = new Triad({
      pitch: 3,
      acc: 1,
      type: 1
    });
    this.notherTriad = new Triad("Abdim");
    it("defaults to a C major triad", () => {
      expect(this.triad.pitch).toEqual(0);
      expect(this.triad.acc).toEqual(0);
      return expect(this.triad.type).toEqual(0);
    });
    it("can create a D#m triad as well", () => {
      expect(this.otherTriad.pitch).toEqual(3);
      expect(this.otherTriad.acc).toEqual(1);
      return expect(this.otherTriad.type).toEqual(1);
    });
    it("can create with a symbol too", () => {
      expect(this.notherTriad.pitch).toEqual(8);
      expect(this.notherTriad.acc).toEqual(-1);
      return expect(this.notherTriad.type).toEqual(2);
    });
    it("reports its root name", () => {
      expect(this.triad.rootName()).toEqual('C');
      expect(this.otherTriad.rootName()).toEqual('D#');
      return expect(this.notherTriad.rootName()).toEqual('Ab');
    });
    it("reports its accidental sign", () => {
      expect(this.triad.accidentalSign()).toEqual('');
      expect(this.otherTriad.accidentalSign()).toEqual('#');
      return expect(this.notherTriad.accidentalSign()).toEqual('b');
    });
    return it("reports its type name", () => {
      expect(this.triad.typeName()).toEqual('');
      expect(this.otherTriad.typeName()).toEqual('m');
      return expect(this.notherTriad.typeName()).toEqual('dim');
    });
  });
  describe("validation", function () {
    it("fixes 'impossible flats'", function () {
      this.triad = new Triad({
        pitch: 0,
        acc: -1
      });
      return expect(this.triad.acc).toEqual(0);
    });
    it("fixes 'impossible sharps'", function () {
      this.triad = new Triad({
        pitch: 4,
        acc: 1
      });
      return expect(this.triad.acc).toEqual(0);
    });
    it("fixes 'impossible naturals'", function () {
      this.triadBflat = new Triad({
        pitch: 10,
        acc: 0
      });
      this.triadFsharp = new Triad({
        pitch: 6,
        acc: 0
      });
      expect(this.triadBflat.acc).toEqual(-1);
      return expect(this.triadFsharp.acc).toEqual(1);
    });
    return it("fixes out of range root values", function () {
      this.triadOver = new Triad({
        pitch: 11,
        acc: -1
      });
      this.triadUnder = new Triad({
        pitch: 0,
        acc: 1
      });
      expect(this.triadOver.baseName()).toEqual('C');
      return expect(this.triadUnder.baseName()).toEqual('B');
    });
  });
  describe("@fromSymbol", function () {
    it("builds a minor Triad from its symbol", () => {
      this.triad = Triad.fromSymbol('C#m');
      expect(this.triad.pitch).toEqual(1);
      expect(this.triad.acc).toEqual(1);
      return expect(this.triad.type).toEqual(1);
    });
    it("builds an augmented Triad from its symbol", () => {
      this.triad = Triad.fromSymbol('Ab+');
      expect(this.triad.pitch).toEqual(8);
      expect(this.triad.acc).toEqual(-1);
      return expect(this.triad.type).toEqual(3);
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
    it("converts a C major triad", () => {
      this.triad = new Triad();
      return expect(this.triad.toSymbol()).toEqual('C');
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
      return expect(html).toEqual(`<span class="piece">
	<data class="root" value="C">C</data>
</span>`);
    });
    return it("also renders an F#+ triad", function () {
      var html;
      this.triad = new Triad('F#+');
      html = this.triad.toHTML();
      return expect(html).toEqual(`<span class="piece">
	<data class="root" value="F">F</data>
	<data class="acc" value="#">#</data>
	<data class="triad" value="+">+</data>
</span>`);
    });
  });
});

//# sourceMappingURL=triad-puzzle.spec.js.map
