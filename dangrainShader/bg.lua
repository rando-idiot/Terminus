function love.load()
    math.randomseed(os.time())
    lines = {}
    circles = {}
    numLines = 10
    numCircles = 5
    local width = love.graphics.getWidth()
    local height = love.graphics.getHeight()
    for i = 1, numLines do
        local baseY = math.random(50, height - 50)
        local amplitude = math.random(10, 50)
        local frequency = math.random() * 0.05 + 0.01
        local speed = math.random() * 2 + 1
        local phase = math.random() * 2 * math.pi
        table.insert(lines, {baseY = baseY, amplitude = amplitude, frequency = frequency, speed = speed, phase = phase})
    end
    for i = 1, numCircles do
        local baseX = math.random(50, width - 50)
        local baseY = math.random(50, height - 50)
        local radius = math.random(10, 30)
        local amplitudeX = math.random(5, 20)
        local amplitudeY = math.random(5, 20)
        local speed = math.random() * 2 + 1
        local phase = math.random() * 2 * math.pi
        table.insert(circles, {baseX = baseX, baseY = baseY, radius = radius, amplitudeX = amplitudeX, amplitudeY = amplitudeY, speed = speed, phase = phase})
    end
end

function love.update(dt)
end

function love.draw()
    local time = love.timer.getTime()
    local lineColor = {0.8, 0.3, 0.2}
    local circleColor = {0.3, 0.8, 0.2}
    love.graphics.setColor(lineColor)
    for _, line in ipairs(lines) do
        local points = {}
        local width = love.graphics.getWidth()
        for x = 0, width, 10 do
            local y = line.baseY + line.amplitude * math.sin(x * line.frequency + time * line.speed + line.phase)
            table.insert(points, x)
            table.insert(points, y)
        end
        love.graphics.line(points)
    end
    love.graphics.setColor(circleColor)
    for _, circle in ipairs(circles) do
        local x = circle.baseX + circle.amplitudeX * math.sin(time * circle.speed + circle.phase)
        local y = circle.baseY + circle.amplitudeY * math.cos(time * circle.speed + circle.phase)
        love.graphics.circle("fill", x, y, circle.radius)
    end
end
