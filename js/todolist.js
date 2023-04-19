$(function(){
     //取数据
    function getData(){ 
        const data = localStorage.getItem('todolist')
        if(data != null){
            return JSON.parse(data)
        }else{
            return []
        }
    }

    // 保存数据
    function saveData(data){
        // localStorage.setItem('todolist',data)
        localStorage.setItem('todolist',JSON.stringify(data))
    }

    // 渲染数据
    function load(){
        const data = getData()
        $('ol').empty()
        $('ul').empty()
        let todoCount = 0
        let doneCount = 0
        $.each(data,function(i,e){
            // console.log(e);    
            // 这里e是dom对象  ??
            if(e.done === true){
                $('ul').prepend("<li><input type = 'checkbox' checked='checked'> <p>"+e.title+"</p> <a href='javascript:;' id="+i+"></a></input></li>")
                doneCount++
            }else{
                $('ol').prepend("<li><input type = 'checkbox'> <p>"+e.title+"</p> <a href='javascript:;' id="+i+"></a></input></li>")
                todoCount++
            }
        })
        $('#title').val('')
        $('#todocount').text(todoCount)
        $('#donecount').text(doneCount)
    }

    // 删除数据
    $('ol,ul').on('click','a',function(){
        const data = getData()
        const index = $(this).attr('id')  // !!!获取自定义属性
        // console.log(index);

        data.splice(index,1)
        saveData(data)
        load()
    })


    load()
    $('#title').on('keydown',function(e){
        if(e.keyCode === 13){  // 回车
            if($(this).val()===''){
                alert('不能为空')
            }else{
            // alert(11)
            const local = getData()
            // console.log(local);

            local.push({title:$(this).val(),done:false})

            saveData(local)

            load()  
            }

        }
    })

    $('ol,ul').on('click','input',function(){
        const data = getData()
        let index = $(this).siblings('a').attr('id')
        data[index].done = $(this).prop('checked')
        // console.log(data);

        saveData(data)
        load()
    })


})