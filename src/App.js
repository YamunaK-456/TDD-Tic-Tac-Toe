import {useState} from 'react';
export default function App(){
  return(
    <Board/>
  );
}

export const Board=()=>{

  const [squares,setSquares]=useState(Array(9).fill(null));
  const [xIsNext,setXIsNext]=useState(true);

  let status;

  const handleClick=(index)=>{
    if(squares[index] || calculateWinner(squares)){
      return;
    }

    const newSquares=squares.slice();
    if(xIsNext){
      newSquares[index]="X";
    }
    else{
      newSquares[index]="O";
    }
    setXIsNext(!xIsNext);
    setSquares(newSquares);
  }
  
  const winner=calculateWinner(squares);
  if(winner){
    status="Winner: "+winner;
  }
  else{
    status="Next Player: "+(xIsNext?"X":"O");
  }

  return (
    <>
    <div data-testid="status">
      {status}
    </div>

    <div className='board-row'>
      <div className='board-row'>
    <div className='board-row' data-testid="gameBoard">
    <Square value={squares[0]} handleClick={()=>handleClick(0)}/>
    <Square value={squares[1]} handleClick={()=>handleClick(1)}/>
    <Square value={squares[2]} handleClick={()=>handleClick(2)}/>
       </div>
       <Square value={squares[3]} handleClick={()=>handleClick(3)}/>
       <Square value={squares[4]} handleClick={()=>handleClick(4)}/>
       <Square value={squares[5]} handleClick={()=>handleClick(5)}/>
       </div>
       <Square value={squares[6]} handleClick={()=>handleClick(6)}/>
       <Square value={squares[7]} handleClick={()=>handleClick(7)}/>
       <Square value={squares[8]} handleClick={()=>handleClick(8)}/>
       </div>
    </>
  );
}

export const Square=({value,handleClick})=>{
  // const handleClick=()=>{
  //   console.log('Clicked!');
  // setValue("X");
  // }

  return (
    <button className='square_input' onClick={handleClick}>{value}</button>
  );
}

const calculateWinner=(squares)=>{
  const lines=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i=0;i<lines.length;i++){
    const [a,b,c]=lines[i];
    if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
      return squares[a];
    }
  }
}
