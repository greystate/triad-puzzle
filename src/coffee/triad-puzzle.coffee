DEFAULTS =
  pitch: 0    # 0-11
  acc: 0      # -1, 0, 1     (b, [nothing/natural], #)
  type: 0     # 0-3          (major, minor, diminished, augmented)

class Triad
  constructor: (options = { }) ->
    { @pitch, @acc, @type } = options
    
    @pitch ?= DEFAULTS.pitch
    @acc ?= DEFAULTS.acc
    @type ?= DEFAULTS.type
    
    return Triad.fromSymbol options if typeof options is 'string'
  
  
  toSymbol: () ->
    "C"
  
  @fromSymbol: (symbol) ->
    switch symbol
      when 'C#m'
        new Triad
          pitch: 0
          acc: 1
          type: 1
      when 'Ab+'
        new Triad
          pitch: 8
          acc: -1
          type: 3
      else
        new Triad

window.Triad = Triad
