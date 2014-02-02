$(window).load(function(){

    var mouse = {x:0 , y:0};
    var o = {x:0 , y:0};
    var arraynow = [];
    var arrayactualx = [];
    var arrayactualy = [];
    var ml , mr , nt , nb;
    var top = 0 , left = 0 , num=0;
    var coordinate , coordinateX , coordinateY;
    var min = 1 , sec = 5; // time for game
    var flag = true;
    var empty;

    //  cordiante now
    for(var i=1 ; i<10 ; i++){
        coordinate = $('li:nth-child('+i+')').position();
        coordinateX = coordinate.left;
        coordinateY = coordinate.top;
        arraynow.push(coordinate);
    }

    //  cordinate actual
    for(var i=0 ; i<9 ; i++){
        if( (i % 3 == 0) && (i!=0) ){
            top+=100;
            left = 0;
        }
        o.x = left;
        o.y = top;
        arrayactualx.push(o.x);
        arrayactualy.push(o.y);
        left+=100;
    }

    // get position empty Tile
    empty = $('li.empty').attr('id').substring(1,2);
    o.x = arraynow[empty].left;
    o.y = arraynow[empty].top;

    // determine neighbor empty element
    $('li').hover(function(){
        var bool = true;
        coordinate = $(this).position();
        coordinateX = coordinate.left;
        coordinateY = coordinate.top;

        ml = coordinateX - 100;
        if(arraynow[empty].left == ml && arraynow[empty].top == coordinateY){
            $(this).addClass('neighbor');
            bool = false;
        }

        mr = coordinateX + 100;
        if(arraynow[empty].left == mr && arraynow[empty].top == coordinateY){
            $(this).addClass('neighbor');
            bool = false;
        }

        nt = coordinateY - 100;
        if(arraynow[empty].left == coordinateX && arraynow[empty].top == nt){
            $(this).addClass('neighbor');
            bool = false;
        }

        nb = coordinateY + 100;
        if(arraynow[empty].left == coordinateX && arraynow[empty].top == nb){
            $(this).addClass('neighbor');
            bool = false;
        }

        if(bool){
            $(this).removeClass('neighbor');
        }

        if(!flag){
            $('li').removeClass('neighbor');
        }
    });

    // change place Tile
    $('.puzzle li').click(function(){
        if(flag){
            var p = $(this).position();
            mouse.x =  p.left;
            mouse.y =  p.top;

            var id = $(this).attr('id').substring(1,2);

            ml = mouse.x - 100;
            if(o.x == ml && o.y == mouse.y ){
                o.x+=100;
                arraynow[id].left-=100;
                arraynow[empty].left=o.x;
                $(this).css({left : o.x-100+'px'});
                $('li:nth-child('+empty+')').next().css({left : o.x+'px'});
            }

            mr = mouse.x + 100;
            if( o.x == mr && mouse.y == o.y){
                o.x-=100;
                arraynow[id].left+=100;
                arraynow[empty].left=o.x;
                $(this).css({left : o.x+100+'px'} );
                $('li:nth-child('+empty+')').next().css({left : o.x+'px'});
            }

            nt = mouse.y-100;
            if(o.y == nt && mouse.x == o.x ){
                o.y+=100;
                arraynow[id].top-=100;
                arraynow[empty].top=o.y;
                $(this).css({top : o.y-100+'px'} );
                $('li:nth-child('+empty+')').next().css({top : o.y+'px'} );
            }

            nb = mouse.y+100;
            if(o.y == nb && mouse.x == o.x ){
                o.y-=100;
                arraynow[id].top+=100;
                arraynow[empty].top=o.y;
                $(this).css({top : o.y+100+'px'} );
                $('li:nth-child('+empty+')').next().css({top : o.y+'px'} );
            }

            test_End();
        }
    });

    // test for end puzzel
    function test_End(){
        for(var i=0; i<arraynow.length ;i++){
            if(arraynow[i].left == arrayactualx[i] && arraynow[i].top == arrayactualy[i] ){
                num++;
                if(num==9){
                    alert('you succeed to create puzzel. ');
                    flag = false;
                }
            }
        }
        num = 0;
    }

    if(min < 10){
        min = '0' + min;
    }

    if(sec < 10){
        sec = '0' + sec;
    }
    // show time
    function timer(){
        if(flag){
            $('#min').text(min);
            $('#sec').text(sec);
            if(sec != 0){
                sec--;
                if(sec<10){
                    sec = '0'+sec;
                    $('#sec').text(sec);
                }
                $('#sec').text(sec);
            }

            else{
                min--;
                if(min < 10){
                    min = '0' + min;
                    $('#min').text(min);
                }
                $('#min').text(min);
                sec = 59;
                $('#sec').text(sec);
            }

            if(min == 0 && sec < 10){
                $(document).ready(function(){
                    $('.timer .min').addClass('b-s-m');
                    $('.timer .sec').addClass('b-s-s');
                });

            }

            if(min==0 && sec==0){
                $(document).ready(function(){
                    $('.timer .min').addClass('b-s-m-p');
                    $('.timer .sec').addClass('b-s-s-p');
                });
                flag = false;
                alert('End of time!!');
            }
        }
    }

    setInterval(timer , 1000);
});