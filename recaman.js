var c = document.getElementById('recaman')

c.width = document.body.clientWidth
c.height = document.body.clientHeight

var x_zero = 10
var y_zero = c.height / 2

var scale = 1

function set_scale(event) {
    if(event.deltaY < 0) {
        scale = scale / 2
    } else {
        scale = scale * 2
    }
    draw()
}

function draw() {
    document.getElementById('scale').textContent = scale
    var p = c.getContext('2d')
    p.strokeStyle = 'black'
    p.clearRect(0, 0, c.width, c.height)
    p.lineWidth = 1
    p.beginPath()
    p.moveTo(x_zero, y_zero)
    p.lineTo(c.width, y_zero)
    p.stroke()
    
    p.beginPath()
    p.moveTo(x_zero, y_zero - 10)
    p.lineTo(x_zero, y_zero + 10)
    p.stroke()
    
    var step = 1
    var log = [0]
    var up = true
    for(var i = 0; i < c.width * (1/scale);) {
        var next = i - step
        var forwards = false
        if(next < 0 || log.indexOf(next) != -1) {
            next = i + step
            forwards = true
        }

        var color = "hsla("+ step +", 100%, 50%, .9)"
        p.strokeStyle = color

        var radius = step/2
        var offset = forwards ? radius : -radius
        var center = x_zero + (i + offset) * scale

        p.beginPath()
        if(forwards) {
            p.arc(center, y_zero, radius * scale, Math.PI, 0, up)
        } else {
            p.arc(center, y_zero, radius * scale, 0, Math.PI, !up)
        }
        p.stroke()
        
        log.push(next)
        step += 1
        up = !up
        i = next
    }
}

document.addEventListener('DOMContentLoaded', draw)
document.addEventListener('wheel', set_scale)
