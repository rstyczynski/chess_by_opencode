export class Game{
  constructor(){
    this.reset()
  }
  reset(){
    this.board=[
      ['r','n','b','q','k','b','n','r'],
      ['p','p','p','p','p','p','p','p'],
      ['.','.','.','.','.','.','.','.'],
      ['.','.','.','.','.','.','.','.'],
      ['.','.','.','.','.','.','.','.'],
      ['.','.','.','.','.','.','.','.'],
      ['P','P','P','P','P','P','P','P'],
      ['R','N','B','Q','K','B','N','R']
    ]
    this.turn='w'
  }
  playSan(san){
    const move = this.parseSimpleSan(san)
    if(!move) return false
    const {from,to} = move
    const [fr,ff]=from,[tr,tf]=to
    if(fr<0||fr>7||ff<0||ff>7||tr<0||tr>7||tf<0||tf>7) return false
    const piece = this.board[fr][ff]
    if(!piece || piece==='.' || (this.turn==='w' && piece!==piece.toUpperCase()) || (this.turn==='b' && piece!==piece.toLowerCase())) return false
    this.board[tr][tf]=piece
    this.board[fr][ff]='.'
    this.turn=this.turn==='w'?'b':'w'
    return true
  }
  parseSimpleSan(s){
    if(/^[a-h][1-8][a-h][1-8]$/.test(s)){ // long algebraic like e2e4
      const ff=s.charCodeAt(0)-97, fr=8-parseInt(s[1],10)
      const tf=s.charCodeAt(2)-97, tr=8-parseInt(s[3],10)
      return {from:[fr,ff], to:[tr,tf]}
    }
    return null
  }
  playEngine(){
    const moves=[]
    for(let r=0;r<8;r++) for(let f=0;f<8;f++){
      const p=this.board[r][f]
      if(this.turn==='b' && p && p===p.toLowerCase()){
        for(let tf=0;tf<8;tf++) for(let tr=0;tr<8;tr++){
          moves.push({from:[r,f], to:[tr,tf]})
        }
      } else if(this.turn==='w' && p && p===p.toUpperCase()){
        for(let tf=0;tf<8;tf++) for(let tr=0;tr<8;tr++){
          moves.push({from:[r,f], to:[tr,tf]})
        }
      }
    }
    if(moves.length===0) return
    const m=moves[Math.floor(Math.random()*moves.length)]
    const {from,to}=m
    const [fr,ff]=from,[tr,tf]=to
    const piece = this.board[fr][ff]
    this.board[tr][tf]=piece
    this.board[fr][ff]='.'
    this.turn=this.turn==='w'?'b':'w'
  }
  isGameOver(){ return false }
}
