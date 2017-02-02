box = 15; //一个格子的宽高
mainBoxWidth = 20; //背景宽的格子数
mainBoxHeight = 20; //背景高的格子数
foodPos = { x: 0, y: 0 }; //食物的位置
snakeHeadPos = { x: 0, y: 0 }; //蛇头的位置
snakeTailPos = []; //蛇尾的位置
direction = "right"; //蛇移动方向

$(function() {
    //初始化食物出现的位置
    initFoodPos();
    // 初始化定时器
    initTimer();
    //按钮点击
    initEvent();
});

function initEvent() {
    $("#down").click(function() {
        direction = "down";
    });
    $("#up").click(function() {
        direction = "up";
    });
    $("#left").click(function() {
        direction = "left";
    });
    $("#right").click(function() {
        direction = "right";
    });
}

function initTimer() {
    var timerID = setInterval(function() {
        //移动
        var pos = { x: snakeHeadPos.x, y: snakeHeadPos.y };
        snakeTailPos.push(pos);
        // 把新添加到蛇尾的坐标显示出来
        var tail = $("<div class='snakeTail'>");
        tail.css({
            "left": pos.x * box,
            "top": pos.y * box
        });


        $("#mainBox").append(tail);

        switch (direction) {
            case "right":
                snakeHeadPos.x++;
                break;
            case "left":
                snakeHeadPos.x--;
                break;
            case "up":
                snakeHeadPos.y--;
                break;
            case "down":
                snakeHeadPos.y++;
                break;
        }

        // snakeHeadPos.x++;
        // 更新蛇头的位置
        upadteSnakeHeadPos();


        if (snakeHeadPos.x < 0 || snakeHeadPos.x >= mainBoxWidth || snakeHeadPos.y < 0 || snakeHeadPos.y >= mainBoxHeight) {
            clearInterval(timerID);
            alert("游戏结束");
        }
        if (snakeHeadPos.x === foodPos.x && snakeHeadPos.y === foodPos.y) {
            initFoodPos();
        } else {
            var out = snakeTailPos.shift();

            // 把最后格子变回原样
            $(".snakeTail").first().remove();
        }
    }, 500);
}

function upadteSnakeHeadPos() {
    $(".snakeHead").css({
        "left": snakeHeadPos.x * box,
        "top": snakeHeadPos.y * box
    });
}

function initFoodPos() {
    var x = Math.floor(Math.random() * 20);
    var y = Math.floor(Math.random() * 20);
    foodPos.x = x;
    foodPos.y = y;
    $(".food").css({
        "left": foodPos.x * 15,
        "top": foodPos.y * 15
    })
}
