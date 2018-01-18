/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Surasom visus savo kintamuosius, kad kodas butu svaresnis
var scores, roundScore, activePlayer, dice, diceDOM, gamePlaying;
init();

diceDOM = document.querySelector('.dice');
// Matematine salyga, kad atsitiktine tvarka butu rasomi skaiciai nuo 1 iki 6
// Math.floor reiskia, kad skaiciai bus suapvalinti i mazejancia puse
// Math.random reiskia, kad random skaiciai bus generuojami
// Dauginam is 6, nes mums reikia, kad reiksmes nebutu didesnes negu 6
// Pridedam 1, nes skaicia yra apvalinami i mazesne puse (0.44 bus 0), o mums reikia nuo 1 iki 6;
//-----------  dice = Math.floor(Math.random()*6) + 1;
// querySelector leidzia pasirinkti klase, id ir elementa is html'o
// textContent pakeicia teksto turini i nurodyta (siuo atveju bus atspausdintas random skaicius)
//document.querySelector('#current-' + activePlayer).textContent = dice;
//////document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
// style.display reiskia, kad nurodyta klase ('.dice') nebus rodoma (='none')
diceDOM.style.display = 'none';
// addEventListener tai yra metodas kuomet pradeda daryti kazka, kuomet yra kazkas padaryta(siuo atveju, kai paspaudzia, dar funkcija)
// zemiau pateikta funkcija vadinasi anonymous funkcija, kadangi ji neturi pavadinimo ir gali buti naudojama tik cia
document.querySelector('.btn-roll').addEventListener('click', function(){
  if(gamePlaying) {
    dice = Math.floor(Math.random()*6) + 1;

    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice +'.png';

    if (dice !== 1){
  // roundScore += dice daro tai, kad jeigu suma nera = 1, tai tada priskirs prie roundScore kiek buvo iskrite.
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
    nextPlayer();
  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
  if(gamePlaying){
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    if(scores[activePlayer] >= 100){
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    }else{
      nextPlayer();
    }
  }
});
function nextPlayer(){
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  diceDOM.style.display = 'none';
}

function init(){
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}

document.querySelector('.btn-new').addEventListener('click', init);
