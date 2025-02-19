function love.load()
    io.stdout:setvbuf("no")
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
    currentInput1 = "_"
    currentInput2 = "_"
    currentInput3 = "_"
    currentInput4 = "_"
    currentInput5 = "_"
    foo = 0
    inputScaleX = 1
    inputScaleY = 1
    inputOffsetX = -3 * love.graphics.getWidth() / 9
    inputOffsetY = -2 * love.graphics.getHeight() / 6
    inputSeparation = 1 * love.graphics.getWidth() / 100
    love.keyboard.setKeyRepeat(false)
    --god i hate lua
end
function love.textinput(t)
    if (foo == 0) then
        currentInput1 = t
    end
    if (foo == 1) then
    currentInput2 = t    
    end
    if (foo == 2) then
        currentInput3 = t
    end
    if (foo == 3) then 
        currentInput4 = t
    end
    if (foo == 4) then
        currentInput5 = t
    end
    if (foo ~= 5) then
    foo = foo + 1
    end
end
function love.draw()
    love.graphics.rectangle("line", 0,0, love.graphics.getWidth(),love.graphics.getHeight())
    love.graphics.print(currentInput1, NormalFont, WindowSize.middlePointX - inputScaleX / 2 - inputSeparation * 2, WindowSize.middlePointY - inputScaleY / 2,0, inputScaleX, inputScaleY, inputOffsetX, inputOffsetY)
    love.graphics.print(currentInput2, NormalFont, WindowSize.middlePointX - inputScaleX / 2 - inputSeparation, WindowSize.middlePointY - inputScaleY / 2,0, inputScaleX, inputScaleY, inputOffsetX, inputOffsetY)
    love.graphics.print(currentInput3, NormalFont, WindowSize.middlePointX - inputScaleX / 2, WindowSize.middlePointY - inputScaleY / 2, 0, inputScaleX, inputScaleY, inputOffsetX, inputOffsetY)
    love.graphics.print(currentInput4, NormalFont, WindowSize.middlePointX - inputScaleX / 2 + inputSeparation, WindowSize.middlePointY - inputScaleY / 2,0, inputScaleX, inputScaleY, inputOffsetX, inputOffsetY)
    love.graphics.print(currentInput5, NormalFont, WindowSize.middlePointX - inputScaleX / 2 + inputSeparation * 2, WindowSize.middlePointY - inputScaleY / 2,0, inputScaleX, inputScaleY, inputOffsetX, inputOffsetY)
end

function love.keypressed(key, scancode, isrepeat)
    if key == "backspace" or scancode == "backspace" then
    if (foo == 5) then
        foo = foo - 1
    end
    if (foo == 0) then
        currentInput1 = "_"
    end
    if (foo == 1) then
    currentInput2 = "_"   
    end
    if (foo == 2) then
        currentInput3 = "_"
    end
    if (foo == 3) then 
        currentInput4 = "_"
    end
    if (foo == 4) then
        currentInput5 = "_"
    end
    if foo > 0 then
    foo = foo - 1
    end

end

if key == "return" or scancode == "return" then
    if currentInput1 == "F" and currentInput2 == "i" and currentInput3 == "s" and currentInput4 == "h" and currentInput5 == "." then
        print("HOLY SHIT FISH????????")
        foo = 0
        currentInput1 = "_"
        currentInput2 = "_"
        currentInput3 = "_"
        currentInput4 = "_"
        currentInput5 = "_"
    end

    end
end