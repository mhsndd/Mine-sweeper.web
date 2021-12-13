function renderBoard(numRows,numCols) {
    let boardEl = document.querySelector("#board");

    for  (let i=0 ;i <numRows; i++ ){
        let trEl =document.createElement("tr");
        for (let j=0; j< numCols;j++ ){
            let cellEl =document.createElement("div");
            cellEl.className="cell";
            
            let tdEl =document.createElement("td");
            tdEl.append(cellEl);
            
            trEl.append(tdEl);
        }
        boardEl.append(trEl);
    }
}


function initialize(numRows,numCols){
    let grid =new Array(numRows);
    for (let i =0; i < numRows; i++){
        grid[i]=new Array(numCols);
    }

    console.log(grid);
    return grid;
}


renderBoard(15,20)

initialize(15,20)