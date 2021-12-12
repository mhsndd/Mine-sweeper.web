function renderbBoard(numRows,numCols){
    let boardEl = document.querySelector("#board");

    for(let i=0;i<numRows;i++){
        let trEl=document.createElement("tr");
        for (let j=0; j< numCols;j++){
            let trEl=document.createElement("td");
            let cellEl=document.createElement("div");
            tdEl.append(cellEl)
            
            trEl.append(trEl)
        }
        boardEl.append(trEl)
    }

}
renderbBoard();