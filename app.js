const canvas = document.querySelector( 'canvas' ),
      ctx = canvas.getContext( '2d' ),
      colorButtons = document.querySelectorAll( '.container .colors button' ),
      sizeButtons = document.querySelectorAll( '.container .size button' ),
      btnClearCanvas = document.querySelector( '.container .generalButtons .clearCanvas' ),
      downloadImage = document.querySelector( '.container .generalButtons .downloadImage' )

let painting = false,
    colors = [ '#ee5f5f', '#5fee7c', '#eed85f' ],
    size = 10, 
    brashColor = '#ee5f5f', 
    sizes = [ 5, 10, 15 ]

    colorButtons.forEach( ( button, index ) => {
        button.style.backgroundColor = colors[ index ]
        button.addEventListener( 'click', function() {
            brashColor = this.style.backgroundColor
            this.classList.add( 'selected' )
            colorButtons.forEach( btn => {
                if ( btn !== this ) btn.classList.remove( 'selected' )
            } )
        } )
    } )

    sizeButtons.forEach( ( button, index) => {
        button.style.backgroundColor = '#55aaf4'
        button.setAttribute( 'data-size', sizes[ index ] )
        button.addEventListener( 'click', function() {
            size = this.getAttribute( 'data-size' )
            this.classList.add( 'selected' )
            sizeButtons.forEach( btn  => {
                if ( btn !== this ) btn.classList.remove( 'selected' )
            })
        } )
    } )

canvas.width = 600
canvas.height = 300

function startPosition( e ) {
    painting = true
    draw( e )
}

function finishedPosition() {
    painting = false
    ctx.beginPath()
}

function draw( e ) {
    if ( !painting ) return 
    ctx.lineWidth = size
    ctx.lineCap = 'round'
    ctx.strokeStyle = brashColor
    
    ctx.lineTo( e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop )
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo( e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop )
}

canvas.addEventListener( 'mousedown', startPosition )
canvas.addEventListener( 'mouseup', finishedPosition )
canvas.addEventListener( 'mousemove', draw )

btnClearCanvas.addEventListener( 'click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
} )

downloadImage.addEventListener( 'click', () => {
    if ( window.navigator.msSaveBlob ) {
        window.navigator.msSaveBlob( canvas.msToBlob(), 'download.png' )
    } else {
        const a = document.createElement( 'a' )

        document.body.appendChild( a )
        a.href = canvas.toDataURL()
        a.download = 'download.png'
        a.click()
        document.body.removeChild( a )
    }
} )

function startPositionM( e ) {
    painting = true
    draw( e )
}

function finishedPositionM() {
    painting = false
    ctx.beginPath()
}

function drawM( e ) {
    if ( !painting ) return 
    ctx.lineWidth = size
    ctx.lineCap = 'round'
    ctx.strokeStyle = brashColor
    
    ctx.lineTo( e.changedTouches[ 0 ].clientX - canvas.offsetLeft, e.changedTouches[ 0 ].clientY - canvas.offsetTop )
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo( e.changedTouches[ 0 ].clientX - canvas.offsetLeft, e.changedTouches[ 0 ].clientY - canvas.offsetTop )
}

canvas.addEventListener( 'touchstart', startPositionM )
canvas.addEventListener( 'touchend', finishedPositionM )
canvas.addEventListener( 'touchmove', drawM )