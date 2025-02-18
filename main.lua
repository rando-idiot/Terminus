function love.load()
    Sprites = {}
    Sprites.logoPathLarge = love.graphics.newImage('sprites/logo512x.png')
    Sprites.logoPathLargeData = love.image.newImageData('sprites/logo512x.png')
    NormalFont = love.graphics.newFont('fonts/MainFont.ttf')
    BgShader = love.graphics.newShader('shaders/bg.file')
    --this is spaghetti
end
function love.draw()
    love.graphics.draw(Sprites.logoPathLarge, 0, 0)
    love.window.setIcon(Sprites.logoPathLargeData)
    love.window.setFullscreen(true)
end 