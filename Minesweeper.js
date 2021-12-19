function renderBoard(numRows,numCols,grid) {  //创建棋盘
    let boardEl = document.querySelector("#board");

    for  (let i=0 ;i <numRows; i++ ){    //创建行
        let trEl =document.createElement("tr");
        for (let j=0; j< numCols;j++ ){    //创建列
            let cellEl =document.createElement("div");
            cellEl.className="cell";    //棋盘方格的类名
            grid[i][j].cellEl=cellEl

            //if (grid[i][j].count === -1){  //如果网格数据-1显示为雷
            //    cellEl.innerText="*";
            //}else{
            //    cellEl.innerText=grid[i][j].count; //否则显示原本数字
            //}
            
            cellEl.addEventListener("click",(e)=>{ //棋盘方格内点击效果
                if(gameover.js === false){
                    if (grid[i][j].count ===-1 ){ //如果棋盘方格数字-1，执行爆炸函数\
                        exploded(grid, i, j, numRows ,numCols );
                        gameover.js = true;
                        return;
                    }
                    if (grid[i][j].count === 0){  //如果方格数字0.继续搜索周边方格
                        searchClearArea(grid,i ,j,numRows,numCols);
                    }else if (grid [i][j].count>0 ){  //数字>0，清空，添加显示当前数字
                        grid[i][j].clear= true;
                        cellEl.classList.add("clear");
                        grid[i][j].cellEl.innerText =grid[i][j].count
                    }
                    checkAllClear(grid)
                    //cellEl.classList.add("clear");
                }
            })
            cellEl.addEventListener("mousedown",(e)=>{   //标旗（右键双击）
                if (e.button ==2 && grid[i][j].clear===false && grid[i][j].flag===false){
                    grid[i][j].cellEl.classList.add("flag");
                    grid[i][j].flag=true;
                }else if (e.button ==2 && grid[i][j].clear==false){
                    grid[i][j].cellEl.classList.remove("flag");
                    grid[i][j].flag=false
                }    
            })
        

            let tdEl =document.createElement("td");
            tdEl.append(cellEl);
            
            trEl.append(tdEl);
        }
        boardEl.append(trEl);
    }
}


const directions=[
    [-1,-1],[-1,0],[-1,1],
    [0,-1],[0,1],
    [1,-1],[1,0],[1,1],
]

function initialize(numRows,numCols,numMines){ //初始化
    let grid =new Array(numRows);
    for (let i =0; i < numRows; i++){
        grid[i]=new Array(numCols);
        for (let j =0; j < numCols; j++){
            grid[i][j]={
                clear: false,
                count: 0
            };
        }

    }

    let mines =[];
    for (let k=0;k < numMines;k++) {
        let cellSn =Math.trunc(Math.random() *numRows * numCols);
        let row =Math.trunc(cellSn / numCols);   //行的计算
        let col =cellSn % numCols;  //列计算


        grid[row][col].count= -1;
        mines.push([row ,col]);
        
    }
    
      //计算有雷周边为零的周边雷数
    for (let [row,col] of mines) {
        //
        //console.log("")
        for (let [drow,dcol] of directions) {
            let cellRow = row + drow;
            let cellCol = col + dcol;
            if (cellRow <0 || cellRow >= numRows || cellCol <0 || cellCol >= numCols){
                continue;
            }
            if (grid[cellRow][cellCol].count ==0){
                let count = 0;
                for (let [arow,acol] of directions){
                    let ambientRow= cellRow + arow;
                    let ambientCol= cellCol + acol;
                    if (ambientRow <0 || ambientRow >= numRows || ambientCol <0 || ambientCol >= numCols){
                        continue;
                    }

                    if (grid[ambientRow][ambientCol].count ==-1){
                        count +=1;
                    }
                }
                
                if (count > 0 ) {
                    grid[cellRow][cellCol].count = count;
                }
            
            }
            //console.log(row,col,row + drow, col +dcol);
        }
    }
    
    
    //console.log(grid);
    
    return grid;
}

function searchClearArea(grid ,row,col,numRows,numCols){  //搜索周边区域
    let gridCell =grid[row][col];
    gridCell.clear=true;
    gridCell.cellEl.classList.add("clear");
    
    for (let [drow,dcol] of directions){
        let cellRow = row + drow;
        let cellCol = col + dcol;
        if (cellRow <0 || cellRow >= numRows || cellCol <0 || cellCol >= numCols){
            continue;
        }
        
        let gridCell =grid[cellRow][cellCol];
        if (!gridCell.clear){
            gridCell.clear=true;
            gridCell.cellEl.classList.add("clear");
            if(gridCell.count===0){
                searchClearArea(grid ,cellRow,cellCol,numRows,numCols);
            }else if (gridCell.count>0){
                gridCell.cellEl.innerText =gridCell.count;
            }
        }
    }                
}

function exploded(grid ,row,col,numRows,numCols){  //爆炸函数
    grid[row][col].cellEl.classList.add("exploded");
    alert ("you lose");

    for (let cellRow =0; cellRow < numRows; cellRow++){
        for (let cellCol =0; cellCol < numCols; cellCol++){
            let cell =grid[cellRow][cellCol];
            cell.clear =true;
            cell.cellEl.classList.add('clear');

            if (cell.count  ===-1){    //如果值为-1，则添加到有雷的类
                cell.cellEl.classList.add('Iandmine');
            }
        }
    }
}

function checkAllClear(grid){   //检查清空
    for (let row=0 ;row < grid.length;row++){
        let gridRow =grid[row];
        for (let col =0; col <gridRow.length ;col++){
            let cell =gridRow[col];
            if (cell.count !=-1 && !cell.clear){
                return false
            }
        }
    }
    

    for (let row=0 ;row < grid.length;row++){
        let gridRow =grid[row];
        for (let col =0; col <gridRow.length ;col++){
            let cell =gridRow[col];

            if (cell.count === -1 ){
                cell.cellEl.classList.add("landmine");

            }
            cell.cellEl.classList.add("success");
        
        }
    }

    return true
}

// function difficulty1(numRows,numCols,numMines){
//     let buttonEl2=document.querySelector("#button2");
//     buttonEl2.addEventListener("click",(e)=>{


//         initialize(numRows+1,numCols+1,numMines)
//     // buttonEl1.addEventListener("click",(e)=>{
//     //     let grid =new Array(numRows);
//     //     for (let i =0; i < numRows; i++){
//     //         grid[i]=new Array(numCols);
//     //             for (let j =0; j < numCols; j++){
//     //                 grid[i][j]={
//     //                 clear: false,
//     //                 count: 0
//     //                 }
//     //             }
//     //     }
//     })
//         console.log(numRows,numCols,numMines)
// }

function hard1(){  //简单难度
    //let buttonEl1=document.querySelector("#button1" );
    //buttonEl1.addEventListener("click",(e)=>{
    document.getElementById("board").innerHTML="";   //在board类中添加空元素，避免重复调用函数
        let grid =initialize(9,9,15)
        renderBoard(9,9,grid)
        gameover.js = false;
}

function hard2(){   //中级难度
    //let buttonEl2=document.querySelector("#button2");
    //buttonEl2.addEventListener("click",(e)=>{
        document.getElementById("board").innerHTML="";
        let grid =initialize(12,12,30)
        renderBoard(12,12,grid)
        gameover.js = false

}

function hard3(){   //高级难度
    ///let buttonEl3=document.querySelector("#button3");
    //buttonEl3.addEventListener("click",(e)=>{
        document.getElementById("board").innerHTML="";
        let grid =initialize(15,15,50)
        renderBoard(15,15,grid)
        gameover.js = false
}





document.oncontextmenu = function(e){ //单击右键功能取消
    return false
}

let gameover ={  //游戏结束后鼠标无法点击
    js:false
}

