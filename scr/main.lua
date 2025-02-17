function love.load()
    sprites = {}
    sprites.logoPathLarge = love.graphics.newImage('../sprites/logo512x.png')

function love.draw()
    love.graphics.print('This is a test, i have no idea what im fucking doing.', 400, 300)
    love.graphics.draw(sprites.logoPathLarge, 0, 0)
end