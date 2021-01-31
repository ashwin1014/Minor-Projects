document.addEventListener('DOMContentLoaded', () => {
    const dino = document.querySelector('.dino');
    let isJumping = false;
    let gravity = 0.9;
    let position = 0;

    function control(e) {
        if (e.keyCode === 32) {
            if (!isJumping) {
                isJumping = true;
                jump();
            }
        }
    }
    document.addEventListener('keyup', control);

    function jump () {
        let count = 0;
        let timerId = setInterval(() => {
            // move down
            if (count === 15) {
                clearInterval(timerId);
               let downTimerId = setInterval(() => {
                   if (count === 0) {
                    clearInterval(downTimerId);
                    isJumping = false;
                   }
                position -= 5;
                count --;
                position = position * gravity;
                dino.style.bottom = position + 'px';
               }, 20);
            }

            // move up
            count ++;
            position += 30;
            position = position * gravity;
            dino.style.bottom = position + 'px';
        }, 20);
    }

});