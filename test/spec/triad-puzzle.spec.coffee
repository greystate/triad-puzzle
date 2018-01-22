describe "Triad", ->

  describe "creation", ->
    @triad = new Triad

    it "defaults to a C major triad", =>
      (expect @triad.pitch).toEqual 0
      (expect @triad.acc).toEqual 0
      (expect @triad.type).toEqual 0


  describe "@fromSymbol", ->
    it "builds a minor Triad from its symbol", =>
      @triad = Triad.fromSymbol 'C#m'

      (expect @triad.pitch).toEqual 0
      (expect @triad.acc).toEqual 1
      (expect @triad.type).toEqual 1

    it "builds an augmented Triad from its symbol", =>
      @triad = Triad.fromSymbol 'Ab+'
      (expect @triad.pitch).toEqual 8
      (expect @triad.acc).toEqual -1
      (expect @triad.type).toEqual 3


  describe ".toSymbol()", ->
    it "defaults to a C major triad", =>
      @triad = new Triad

      (expect @triad.toSymbol()).toEqual 'C'

