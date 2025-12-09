#!/usr/bin/env node
import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { Game } from './game.mjs'

function renderBoard(board){
  const files='abcdefgh'.split('')
  let s='\n'
  for(let r=8;r>=1;r--){
    s+=r+' '
    for(let f=0;f<8;f++){
      s+=(board[r-1][f]||'.')+' '
    }
    s+='\n'
  }
  s+='  '+files.join(' ')+'\n'
  return s
}

async function main(){
  const rl = readline.createInterface({ input, output })
  const g = new Game()
  console.log(renderBoard(g.board))
  while(true){
    const mv = await rl.question('Your move (SAN, q to quit): ')
    if(mv==='q') break
    const ok = g.playSan(mv)
    if(!ok){ console.log('Invalid move'); continue }
    console.log(renderBoard(g.board))
    if(g.isGameOver()) break
    g.playEngine()
    console.log('Engine moved')
    console.log(renderBoard(g.board))
    if(g.isGameOver()) break
  }
  rl.close()
}

main().catch(e=>{ console.error(e); process.exitCode=1 })
