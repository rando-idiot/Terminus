local moonshine = require 'moonshine'
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
    currentInput = "_ _ _ _ _"
    inputScaleX = 1
    inputScaleY = 1
    inputOffsetX = -3 * love.graphics.getWidth() / 9
    inputOffsetY = -2 * love.graphics.getHeight() / 6
    inputSeparation = 1 * love.graphics.getWidth() / 100
    love.keyboard.setKeyRepeat(false)
    --god i hate lua
end
function love.textinput(t)
    if currentInput == "_ _ _ _ _" then
        currentInput = ""
    end

    currentInput = currentInput .. t
    print()
end
function love.draw()
    love.graphics.rectangle("line", 0,0, love.graphics.getWidth(),love.graphics.getHeight())
    love.graphics.print(currentInput, NormalFont, WindowSize.middlePointX - inputScaleX / 2 - inputSeparation * 2, WindowSize.middlePointY - inputScaleY / 2,0, inputScaleX, inputScaleY, inputOffsetX, inputOffsetY)
end
love._openConsole()



function love.keypressed(key, scancode, isrepeat)
    if key == "backspace" or scancode == "backspace" then
        if currentInput == "_ _ _ _ _" then
            currentInput = ""
            return
        end
        currentInput = currentInput.sub(currentInput,0,-2)

    end
    if key == "return" or scancode == "return" then
        if currentInput.lower(currentInput) == "fish." then
            print("HOLY SHIT FISH????????")
            currentInput = "_ _ _ _ _"
        end

    end
end
