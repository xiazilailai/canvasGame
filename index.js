/**
 * create at 2019.06.14 by nmy
 */

const width = window.innerWidth;
const height = window.innerHeight;

const myCanvas = document.getElementById("myCanvas");
const ctx = myCanvas.getContext("2d");

myCanvas.width = width;
myCanvas.height = height;

// console.log(ctx);

ctx.lineWidth = "1px";
ctx.strokeStyle = "rgba(0,0,0,0.1)";
let i = 0, j = 0;
let step = 10;
const rowNum =  Math.floor(height/step);
const colNum =  Math.floor(width/step); 
const cellMap = [];
const state = {
    live: true,
    death: false,
    liveColor: "#7D7",
    deathColor: "#FFF",
}; 
function drawGrid (){
    // ctx.rect(0, 0, width, height);
    // ctx.stroke();
    for (i = 0; i < rowNum; i++){
        cellMap[i] = [];
        for (j = 0; j < colNum; j++){
            cellMap[i][j] = {
                state: state.death,
                liveCellAround: 0,
            }
            ctx.rect(3+j*step, 3+i*step, step, step);
        }
    }    
    // ctx.moveTo(0, 10);
    // ctx.lineTo(width, 10);
    ctx.stroke();
    ctx.closePath();
}
function drawCell (){
    cellMap.forEach((row, i)=>{
        row.forEach((cell, j)=>{
            ctx.fillStyle = cell.state ? state.liveColor : state.deathColor;
            ctx.fillRect(3+j*step + 1, 3+i*step + 1, step-2, step-2);
        });
    });
}
let center = [
    Math.floor(rowNum/2),
    Math.floor(colNum/2),
];
let liveCellMap = {}; // 活着的
let updateCellState = (cellX, cellY, sta) => {
    let key = cellX + "-" + cellY;
    let cell = cellMap[cellX][cellY];    
    cellMap[cellX][cellY].state = sta;
    if(sta === state.live){
        liveCellMap[key] = cell;
        updateLiveAffectCellMap(cellX, cellY);
    }else{
        delete liveCellMap[key];
    }
};
let liveAffectCellMapp = {}; // 活着的周围受影响的
let updateLiveAffectCellMap = (cellX, cellY) => {
    let key1 = [(cellX - 1), (cellY - 1)];
    let key2 = [(cellX - 0), (cellY - 1)];
    let key3 = [(cellX + 1), (cellY - 1)];
    let key4 = [(cellX + 1), (cellY - 0)];
    let key5 = [(cellX + 1), (cellY + 1)];
    let key6 = [(cellX + 0), (cellY + 1)];
    let key7 = [(cellX - 1), (cellY + 1)];
    let key8 = [(cellX - 1), (cellY + 0)];
    if(key1[0] >= 0 && key1[1] >= 0 && key1[0] < rowNum && key1[1] < colNum) liveAffectCellMapp[key1[0] + "-" + key1[1]] = cellMap[key1[0]][key1[1]];
    if(key2[0] >= 0 && key2[1] >= 0 && key2[0] < rowNum && key2[1] < colNum) liveAffectCellMapp[key2[0] + "-" + key2[1]] = cellMap[key2[0]][key2[1]];
    if(key3[0] >= 0 && key3[1] >= 0 && key3[0] < rowNum && key3[1] < colNum) liveAffectCellMapp[key3[0] + "-" + key3[1]] = cellMap[key3[0]][key3[1]];
    if(key4[0] >= 0 && key4[1] >= 0 && key4[0] < rowNum && key4[1] < colNum) liveAffectCellMapp[key4[0] + "-" + key4[1]] = cellMap[key4[0]][key4[1]];
    if(key5[0] >= 0 && key5[1] >= 0 && key5[0] < rowNum && key5[1] < colNum) liveAffectCellMapp[key5[0] + "-" + key5[1]] = cellMap[key5[0]][key5[1]];
    if(key6[0] >= 0 && key6[1] >= 0 && key6[0] < rowNum && key6[1] < colNum) liveAffectCellMapp[key6[0] + "-" + key6[1]] = cellMap[key6[0]][key6[1]];
    if(key7[0] >= 0 && key7[1] >= 0 && key7[0] < rowNum && key7[1] < colNum) liveAffectCellMapp[key7[0] + "-" + key7[1]] = cellMap[key7[0]][key7[1]];
    if(key8[0] >= 0 && key8[1] >= 0 && key8[0] < rowNum && key8[1] < colNum) liveAffectCellMapp[key8[0] + "-" + key8[1]] = cellMap[key8[0]][key8[1]];
    if(key1[0] >= 0 && key1[1] >= 0 && key1[0] < rowNum && key1[1] < colNum) liveAffectCellMapp[key1[0] + "-" + key1[1]].liveCellAround ++;
    if(key2[0] >= 0 && key2[1] >= 0 && key2[0] < rowNum && key2[1] < colNum) liveAffectCellMapp[key2[0] + "-" + key2[1]].liveCellAround ++;
    if(key3[0] >= 0 && key3[1] >= 0 && key3[0] < rowNum && key3[1] < colNum) liveAffectCellMapp[key3[0] + "-" + key3[1]].liveCellAround ++;
    if(key4[0] >= 0 && key4[1] >= 0 && key4[0] < rowNum && key4[1] < colNum) liveAffectCellMapp[key4[0] + "-" + key4[1]].liveCellAround ++;
    if(key5[0] >= 0 && key5[1] >= 0 && key5[0] < rowNum && key5[1] < colNum) liveAffectCellMapp[key5[0] + "-" + key5[1]].liveCellAround ++;
    if(key6[0] >= 0 && key6[1] >= 0 && key6[0] < rowNum && key6[1] < colNum) liveAffectCellMapp[key6[0] + "-" + key6[1]].liveCellAround ++;
    if(key7[0] >= 0 && key7[1] >= 0 && key7[0] < rowNum && key7[1] < colNum) liveAffectCellMapp[key7[0] + "-" + key7[1]].liveCellAround ++;
    if(key8[0] >= 0 && key8[1] >= 0 && key8[0] < rowNum && key8[1] < colNum) liveAffectCellMapp[key8[0] + "-" + key8[1]].liveCellAround ++;
}

// 绘制网格
drawGrid();
ctx.save();
// 主线 演化 初始条件
updateCellState(center[0], center[1], state.live);
updateCellState(center[0]+1, center[1], state.live);
updateCellState(center[0], center[1]+1, state.live);
updateCellState(center[0]+3, center[1]+1, state.live);
drawCell();
let loopTicket;
function main(){
    // 计算生死
    let key, updateList = [], index = 0;
    for(key in liveAffectCellMapp){
        let cell = liveAffectCellMapp[key];
        let [cellX, cellY] = key.split("-");        
        let sta;
        if(cell.liveCellAround == 2 || cell.liveCellAround == 3){
            // 活
            // sta = state.live;
            // 加上一定的概率
            sta =  Math.random()*cell.liveCellAround*4 >= 1 ? state.live : state.death
        }else{
            // 死
            sta = state.death;
        }
        // 重置周围活着的计数器
        cell.liveCellAround = 0;        
        // 暂存需要更新的队列
        // updateList[index] = {
        //     cellX: +cellX, 
        //     cellY: +cellY, 
        //     state: sta
        // };
        updateList[index] = [+cellX, +cellY, sta];
        index ++;
    }
    // 重置暂存MAP
    liveCellMap = {}; // 活着的
    liveAffectCellMapp = {}; // 活着的周围受影响的
    // 更新cell状态
    updateList.forEach((item)=>{
        updateCellState(...item);
    });    
    // 绘制cell
    drawCell();
    // window.requestAnimationFrame(main);
    loopTicket = setTimeout(()=>{
        main();
    }, 100);
}

// window.requestAnimationFrame(main);
// setTimeout(()=>{
//     main();
// }, 1000);

function run (){
    if(!loopTicket) main();
}
function stop (){
    clearTimeout(loopTicket);
    // console.log(loopTicket);
    loopTicket = null;
}
