(function() {
    function recaman(canvas) {
        var width = canvas.width = canvas.clientWidth
        var height = canvas.height = canvas.clientHeight

        var scale = 2
        var x_zero = 10
        var y_zero = height/2
        if(canvas.dataset.scale) {
            scale = Number(canvas.dataset.scale)
        }
        if(canvas.dataset.xzero) {
            x_zero = Number(canvas.dataset.xzero)
        }
        if(canvas.dataset.yzero) {
            y_zero = Number(canvas.dataset.yzero)
        }

        // Preliminaries
        var p = canvas.getContext('2d')
        p.strokeStyle = 'black'
        p.clearRect(0, 0, width, height)
        p.lineWidth = 1

        // X-axis
        p.beginPath()
        p.moveTo(x_zero, y_zero)
        p.lineTo(width, y_zero)
        p.stroke()

        // Y-stub
        p.beginPath()
        p.moveTo(x_zero, y_zero - 10)
        p.lineTo(x_zero, y_zero + 10)
        p.stroke()

        var step = 1
        var log = [0]
        var up = true
        for(var i = 0; i < width * (2/scale);) {
            var next = i - step
            var forward = false
            if(next < 0 || log.indexOf(next) != -1) {
                next = i + step
                forward = true
            }

            var color = "hsla("+ step +", 100%, 50%, .9)"
            p.strokeStyle = color

            var radius = step/2
            var offset = forward ? radius : -radius
            var center = x_zero + (i + offset) * scale

            p.beginPath()
            if(forward) {
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

    function set_scale(event) {
        var factor = 2
        var canvas = event.currentTarget
        if(event.deltaY < 0) {
            canvas.dataset.scale = canvas.dataset.scale * factor
        } else {
            canvas.dataset.scale = canvas.dataset.scale / factor
        }
        recaman(canvas)
    }

    function init(event) {
        var canvases = document.querySelectorAll('.recaman')
        canvases.forEach(function(canvas) {
            canvas.addEventListener('wheel', set_scale)
            recaman(canvas)
        })
        window.addEventListener('resize', function(event) {
            canvases.forEach(function(canvas) {
                recaman(canvas)})})
    }
    document.addEventListener('DOMContentLoaded', init)
})()
