function love.load()
    Sprites = {}
    Sprites.missingTexture = love.graphics.newImage('sprites/null.png')
    Sprites.logoPathLarge = love.graphics.newImage('sprites/logo512x.png')
    Sprites.logoPathLargeData = love.image.newImageData('sprites/logo512x.png')
    NormalFont = love.graphics.newFont('fonts/MainFont.ttf')
    love.window.setTitle('Terminus V0.0.0.0')
    love.window.setIcon(Sprites.logoPathLargeData)
    love.window.setFullscreen(false)
    WindowSize = {}
    WindowSize.middlePointX = love.graphics.getWidth() / 2
    WindowSize.middlePointY = love.graphics.getHeight() / 2
    currentInput1 = "_"
    currentInput2 = "_"
    currentInput3 = "_"
    currentInput4 = "_"
    currentInput5 = "_"
    foo = 0
    inputScaleX = 10
    inputScaleY = 10
    inputOffsetX = 0
    inputOffsetY = 0
    inputSeparation = 10 * love.graphics.getWidth() / 100
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
    foo = foo + 1
end
function love.draw()
    love.graphics.rectangle("line", 0,0, love.graphics.getWidth(),love.graphics.getHeight())
    love.graphics.print(currentInput1, NormalFont, WindowSize.middlePointX - inputScaleX / 2 - inputOffsetX - inputSeparation * 2, WindowSize.middlePointY - inputScaleY / 2,0 - inputOffsetY, inputScaleX, inputScaleY)
    love.graphics.print(currentInput2, NormalFont, WindowSize.middlePointX - inputScaleX / 2 - inputOffsetX - inputSeparation, WindowSize.middlePointY - inputScaleY / 2,0 - inputOffsetY, inputScaleX, inputScaleY)
    love.graphics.print(currentInput3, NormalFont, WindowSize.middlePointX - inputScaleX / 2 - inputOffsetX, WindowSize.middlePointY - inputScaleY / 2,0 - inputOffsetY, inputScaleX, inputScaleY)
    love.graphics.print(currentInput4, NormalFont, WindowSize.middlePointX - inputScaleX / 2 - inputOffsetX + inputSeparation, WindowSize.middlePointY - inputScaleY / 2,0 - inputOffsetY, inputScaleX, inputScaleY)
    love.graphics.print(currentInput5, NormalFont, WindowSize.middlePointX - inputScaleX / 2 - inputOffsetX + inputSeparation * 2, WindowSize.middlePointY - inputScaleY / 2,0 - inputOffsetY, inputScaleX, inputScaleY)
end
function love.update()
    if love.keyboard.isDown("return") then
        if currentInput1 == "F" and currentInput2 == "i" and currentInput3 == "s" and currentInput4 == "h" and currentInput5 == "." then
            print ("HOLY SHIT FISH????????")
        end
    end
end