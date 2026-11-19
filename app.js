const grid = document.querySelector('#game-grid');
const count = document.querySelector('#game-count');
const player = document.querySelector('#player');
const frame = document.querySelector('#game-frame');
const title = document.querySelector('#playing-title');
const message = document.querySelector('#form-message');

function validGameUrl(value) {
  try {
    const url = new URL(value, window.location.href);
    return ['http:', 'https:'].includes(url.protocol);
  } catch { return false; }
}

function makeCard(game) {
  const card = document.createElement('article');
  card.className = 'game-card';
  const top = document.createElement('div');
  const icon = document.createElement('div');
  icon.className = 'game-icon';
  icon.textContent = game.icon || '🎮';
  const heading = document.createElement('h3');
  heading.textContent = game.name;
  const description = document.createElement('p');
  description.textContent = game.description || 'Ready when you are.';
  top.append(icon, heading, description);
  const button = document.createElement('button');
  button.className = 'play-button';
  button.textContent = '▶ Play game';
  button.addEventListener('click', () => openGame(game));
  card.append(top, button);
  return card;
}

function openGame(game) {
  if (!validGameUrl(game.url)) return;
  title.textContent = game.name;
  frame.src = new URL(game.url, window.location.href).href;
  player.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeGame() {
  player.hidden = true;
  frame.src = 'about:blank';
  document.body.style.overflow = '';
}
document.querySelector('#close-player').addEventListener('click', closeGame);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeGame(); });

async function loadGames() {
  let games = [];
  try {
    const response = await fetch('games.json', {cache:'no-store'});
    if (!response.ok) throw new Error('Could not load games.json');
    games = await response.json();
  } catch (error) {
    grid.innerHTML = '<p class="empty">Could not load games.json. Check that the file exists and contains valid JSON.</p>';
    return;
  }
  const extras = JSON.parse(localStorage.getItem('temArcadeExtras') || '[]');
  games = [...games, ...extras].filter(g => g && typeof g.name === 'string' && validGameUrl(g.url));
  count.textContent = `${games.length} GAME${games.length === 1 ? '' : 'S'}`;
  grid.replaceChildren();
  if (!games.length) {
    grid.innerHTML = '<p class="empty">Your shelf is empty. Add a game below!</p>';
    return;
  }
  games.forEach(game => grid.append(makeCard(game)));
}

document.querySelector('#add-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const game = {name: String(data.get('name')).trim(), url: String(data.get('url')).trim(), description:'Added in this browser', icon:'🎮'};
  if (!game.name || !validGameUrl(game.url)) {
    message.textContent = 'Please enter a name and a valid http:// or https:// URL.';
    return;
  }
  const extras = JSON.parse(localStorage.getItem('temArcadeExtras') || '[]');
  extras.push(game);
  localStorage.setItem('temArcadeExtras', JSON.stringify(extras));
  event.currentTarget.reset();
  message.textContent = 'Added! This entry is saved in this browser.';
  loadGames();
});
loadGames();
