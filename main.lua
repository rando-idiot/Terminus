function love.load()
    sprites = {}
    sprites.logoPathLarge = love.graphics.newImage('sprites/logo512x.png')
end
function love.draw()
    love.graphics.draw(sprites.logoPathLarge, 0, 0)
end 