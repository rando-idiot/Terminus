function love.load()
    Sprites = {}
    Sprites.missingTexture = love.graphics.newImage('sprites/null.png')
    Sprites.logoPathLarge = love.graphics.newImage('sprites/logo512x.png')
    Sprites.logoPathLargeData = love.image.newImageData('sprites/logo512x.png')
    NormalFont = love.graphics.newFont('fonts/MainFont.ttf')
    love.window.setTitle('Terminus V0.0.0.0')
    love.window.setIcon(Sprites.logoPathLargeData)
    love.window.setFullscreen(true)
    WindowSize = {}
    WindowSize.middlePointX = love.graphics.getWidth() / 2
    WindowSize.middlePointY = love.graphics.getHeight() / 2
    currentInput1 = ""
    currentInput2 = ""
    currentInput3 = ""
    foo = 0
    --this is spaghetti
end
function love.textinput(t)
    if (foo == 0) then
        currentInput1 = t
    end
    if (foo == 1) then
    currentInput2 = t    
    end
    if (foo == 3) then
        currentInput3 = t
    end
    foo = foo + 1
end
function love.draw()
    love.graphics.rectangle("line", 0,0, love.graphics.getWidth(),love.graphics.getHeight())
    love.graphics.printf(currentInput1, 0,0, love.graphics.getWidth())
    love.graphics.printf(currentInput2, 5,0,love.graphics.getWidth())
    love.graphics.printf(currentInput3, 10,0, love.graphics.getWidth())
    
end