// ========================================
//   SILLY MAD LIBS - GAME LOGIC
//   1960s Lawn Darts & Twister Edition 🎯
//   Polished & Production-Ready
// ========================================

// ============ CONFIG ============
const CONFIG = {
    templatesUrl: 'https://raw.githubusercontent.com/jonmpan/mad-libs-json/master/mad-libs.json',
    peerConfig: {
        debug: 0,
        config: {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' }
            ]
        }
    },
    playerColors: ['red', 'blue', 'yellow', 'green'],
    playerEmojis: ['🎯', '🎲', '🎪', '🎨', '🎭', '🎵', '🦄', '🐸', '🦊', '🐷'],
    reconnectAttempts: 3,
    reconnectDelay: 2000,
    // Silly word bank for placeholders and auto-fill
    sillyWords: {
        noun: ['booger', 'fart cloud', 'stinky sock', 'unicorn poop', 'belly button lint', 'nose hair', 'butt cheek', 'toenail clipping', 'armpit hair', 'booger monster', 'fart factory', 'poop emoji', 'snot rocket', 'stink bomb', 'toilet', 'diaper'],
        verb: ['farts', 'picks nose', 'burps loudly', 'wiggles butt', 'snorts', 'giggles', 'poops', 'toots', 'stinks up', 'slimes', 'wobbles', 'bounces', 'jiggles', 'squishes'],
        adjective: ['stinky', 'gooey', 'smelly', 'slimy', 'booger-covered', 'farty', 'wiggly', 'giggly', 'fuzzy', 'sparkly', 'squishy', 'gloppy', 'crusty', 'mushy', 'sticky'],
        adverb: ['stinkily', 'goofily', 'loudly', 'sloppily', 'gigglingly', 'bouncily', 'slimily', 'fartily', 'weirdly', 'crazily', 'wildly'],
        exclamation: ['Holy guacamole!', 'Sweet mother of pickles!', 'What the fart?!', 'Boogers and cream!', 'Oh my stinky socks!', 'Jumping jellybeans!', 'Great googly moogly!', 'Bazinga!', 'Yikes!'],
        'body part': ['butt', 'belly button', 'armpit', 'nose', 'toe', 'elbow', 'ear', 'tongue', 'pinky finger', 'eyebrow', 'kneecap'],
        animal: ['farting unicorn', 'booger dragon', 'stinky skunk', 'burping frog', 'gassy llama', 'pooping pigeon', 'snorting pig', 'giggling hyena', 'silly monkey'],
        food: ['booger sandwich', 'fart beans', 'stinky cheese', 'poop soup', 'earwax candy', 'snot smoothie', 'toenail tacos', 'armpit pizza'],
        color: ['booger green', 'poop brown', 'fart yellow', 'sparkle pink', 'unicorn rainbow', 'barf orange', 'snot green'],
        number: ['42', '69', '99', '7', '1000', 'a million', 'eleventy-seven', 'a bazillion'],
        place: ['the toilet', 'Booger Land', 'Fart Mountain', 'the stinky swamp', 'Unicorn Paradise', 'Burp City', 'the smelly basement'],
        name: ['Sir Farts-a-Lot', 'Princess Booger', 'Captain Stinky', 'Lord Tootington', 'Queen Gassy', 'Duke Doodoo', 'Baron Von Burp'],
        'plural noun': ['boogers', 'farts', 'butts', 'unicorns', 'jellybeans', 'stinky socks', 'poop emojis', 'burps', 'giggles', 'toots'],
        'verb ending in ing': ['farting', 'picking noses', 'burping', 'wiggling', 'pooping', 'giggling', 'snorting', 'tooting', 'bouncing'],
        'past tense verb': ['farted', 'burped', 'pooped', 'wiggled', 'snorted', 'giggled', 'exploded', 'wobbled', 'jiggled']
    }
};

// Backup templates (silly stories for dad & daughter)
const BACKUP_TEMPLATES = [
    {
        title: "The Silly Day",
        blanks: ["adjective", "noun", "verb", "adverb", "exclamation", "body part", "animal", "place"],
        value: "Once upon a {0} time, a {1} decided to {2} very {3}. \"{4}\" shouted everyone. Then it touched its {5} and magically turned into a {6}. They all lived happily ever after in {7}. The End!"
    },
    {
        title: "Dad's Big Adventure",
        blanks: ["adjective", "noun", "verb ending in ing", "food", "body part", "animal", "exclamation"],
        value: "Dad was feeling very {0} today. He found a {1} under the couch and immediately started {2}. For lunch, he decided to eat {3} with his bare {4}. Suddenly, a wild {5} appeared in the kitchen! \"{6}\" Dad yelled as he ran away screaming like a little kid."
    },
    {
        title: "The Magical Fart",
        blanks: ["adjective", "noun", "name", "verb", "color", "place", "plural noun", "exclamation"],
        value: "In a land far, far away, there lived a {0} {1}. Its name was {2}, and its favorite thing to do was {3} all day long. One magical morning, it discovered a {4} rainbow leading to {5}. At the end of the rainbow, it found millions and millions of {6}! \"{7}\" it screamed with pure joy!"
    },
    {
        title: "Twister Champion",
        blanks: ["adjective", "body part", "color", "verb ending in ing", "noun", "exclamation", "animal", "adverb"],
        value: "The world's most {0} Twister champion carefully placed their {1} on the {2} dot while {3} the whole time. Suddenly, a flying {4} zoomed across the room! \"{5}\" screamed the {6} who was watching {7} from the corner. It was the craziest Twister game ever!"
    },
    {
        title: "Lawn Darts Disaster",
        blanks: ["adjective", "name", "verb", "noun", "body part", "food", "place", "exclamation"],
        value: "It was a {0} summer afternoon when {1} decided it would be fun to {2} in the backyard. The lawn dart flew through the air and landed right on top of a {3}! Everyone grabbed their {4} and ran for cover. Later, they celebrated with {5} at {6}. \"{7}\" they all shouted together!"
    },
    {
        title: "The Burping Contest",
        blanks: ["adjective", "name", "food", "number", "body part", "adverb", "animal", "exclamation"],
        value: "It was the annual {0} burping contest, and {1} was ready to win! After eating {2} {3} times in a row, they felt their {4} rumbling {5}. The burp that came out sounded exactly like a {6} doing a backflip. The judges jumped up and yelled \"{7}\" It was definitely the greatest burp in history."
    },
    {
        title: "Grandma's Secret Recipe",
        blanks: ["adjective", "food", "noun", "verb ending in ing", "body part", "number", "place", "exclamation"],
        value: "Grandma had a {0} secret recipe that she only shared with family. The main ingredient was {1} mixed with crushed {2}. You had to stir it while {3} and scratching your {4} exactly {5} times. She discovered the recipe in {6} many years ago. When anyone tasted it, they always screamed \"{7}\" Nobody knew if that was good or bad."
    },
    {
        title: "The Talent Show",
        blanks: ["adjective", "animal", "verb", "noun", "body part", "adverb", "color", "exclamation"],
        value: "The school talent show was going to be {0} this year! First up was a trained {1} that could {2} while balancing a {3} on its {4}. The crowd watched {5} as the stage lights turned {6}. When the act finished, the principal stood up and shouted \"{7}\" It won first place, obviously."
    }
];

// ============ STATE ============
const state = {
    mode: null, // 'host', 'client', 'solo'
    templates: [],
    currentStory: null,
    userWords: [],
    roomCode: null,
    nickname: 'Player',
    myPlayerId: null,
    myColor: 'red',
    myEmoji: '🎯',
    
    // Multiplayer
    peer: null,
    connections: new Map(),
    hostConnection: null,
    players: new Map(),
    
    // Game Phase
    phase: 'lobby',
    submittedPlayers: new Set(),
    
    // Reconnection
    reconnectAttempts: 0,
    isReconnecting: false
};

// ============ DOM HELPERS ============
const $ = id => document.getElementById(id);
const screens = {
    landing: $('landing-screen'),
    createRoom: $('create-room-screen'),
    joinRoom: $('join-room-screen'),
    lobby: $('lobby-screen'),
    storyPicker: $('story-picker-screen'),
    input: $('input-screen'),
    reveal: $('reveal-screen'),
};

// ============ UTILITIES ============
function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    if (screens[name]) screens[name].classList.add('active');
}

function showLoading(text = 'Loading...') {
    $('loading-text').textContent = text;
    $('loading-overlay').classList.add('active');
}

function hideLoading() {
    $('loading-overlay').classList.remove('active');
}

function showToast(message, type = 'success') {
    const container = $('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

function generateRoomCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function generatePlayerId() {
    return 'p_' + Math.random().toString(36).substring(2, 8);
}

function getRandomFrom(arr, exclude = []) {
    const available = arr.filter(item => !exclude.includes(item));
    return available[Math.floor(Math.random() * available.length)] || arr[0];
}

function getRandomSillyWord(type) {
    const key = type.toLowerCase();
    const words = CONFIG.sillyWords[key] || CONFIG.sillyWords.noun;
    return words[Math.floor(Math.random() * words.length)];
}

function createFartCloud(x, y) {
    const cloud = document.createElement('div');
    cloud.className = 'fart-cloud';
    cloud.textContent = '💨';
    cloud.style.left = `${x}px`;
    cloud.style.top = `${y}px`;
    document.body.appendChild(cloud);
    setTimeout(() => cloud.remove(), 1800);
}

function playFartEffect() {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            createFartCloud(
                Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1,
                Math.random() * window.innerHeight * 0.5 + window.innerHeight * 0.3
            );
        }, i * 200);
    }
}

// ============ TEMPLATES ============
async function loadTemplates() {
    if (state.templates.length > 0) return state.templates;
    
    showLoading('Loading silly stories... 📚');
    
    try {
        const response = await fetch(CONFIG.templatesUrl);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        // Filter for good stories and add our backups
        state.templates = [...BACKUP_TEMPLATES, ...data.slice(0, 15)];
        hideLoading();
        return state.templates;
    } catch (error) {
        console.log('Using backup stories');
        hideLoading();
        state.templates = BACKUP_TEMPLATES;
        return state.templates;
    }
}

// ============ PLAYER MANAGEMENT ============
function createPlayerData(nick, isHost = false) {
    const usedColors = Array.from(state.players.values()).map(p => p.color);
    const usedEmojis = Array.from(state.players.values()).map(p => p.emoji);
    
    return {
        id: generatePlayerId(),
        nick: (nick || 'Player').substring(0, 20),
        color: getRandomFrom(CONFIG.playerColors, usedColors),
        emoji: getRandomFrom(CONFIG.playerEmojis, usedEmojis),
        isHost,
        status: 'connected',
        words: null
    };
}

function getPlayersArray() {
    return Array.from(state.players.values()).sort((a, b) => (b.isHost ? 1 : 0) - (a.isHost ? 1 : 0));
}

function renderPlayerList(containerId) {
    const container = $(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    const players = getPlayersArray();
    
    players.forEach((player, index) => {
        const li = document.createElement('li');
        li.className = `player-item ${player.isHost ? 'host' : ''} ${player.status === 'submitted' ? 'submitted' : ''}`;
        li.style.animationDelay = `${index * 0.05}s`;
        
        const statusText = player.status === 'submitted' ? 'Done!' : 
                          player.status === 'filling' ? 'Writing...' : 'Ready';
        const statusClass = player.status === 'submitted' ? 'submitted' : 
                           player.status === 'filling' ? 'waiting' : 'connected';
        
        li.innerHTML = `
            <span class="player-avatar ${player.color}">${player.emoji}</span>
            <span class="player-name">${player.nick}${player.isHost ? ' 👑' : ''}</span>
            <span class="player-status ${statusClass}">${statusText}</span>
        `;
        container.appendChild(li);
    });
    
    // Update hints
    const hint = $('player-hint');
    if (hint) {
        const count = players.length;
        hint.textContent = count === 1 ? 'You can play solo or wait for friends!' : 
                          count > 1 ? `${count} players ready to play!` : '';
    }
}

function updateSubmissionTracker() {
    if (state.mode === 'solo') return;
    
    const players = getPlayersArray();
    const submitted = players.filter(p => p.status === 'submitted').length;
    const total = players.length;
    
    const title = $('input-title');
    const subtitle = $('input-subtitle');
    
    if (title) {
        title.textContent = state.mode === 'client' ? '📝 Fill in the Blanks!' : 
                           `📝 ${submitted}/${total} Done!`;
    }
    
    if (subtitle && state.mode !== 'solo') {
        subtitle.textContent = submitted === total ? 'Everyone\'s done! Revealing...' :
                              'Submit your words before peeking! 👀';
    }
}

// ============ HOST FUNCTIONS ============
function initHost() {
    state.mode = 'host';
    state.roomCode = generateRoomCode();
    state.phase = 'lobby';
    
    showLoading('Creating game room... 🏠');
    
    const hostPlayer = createPlayerData('You (Host)', true);
    state.myPlayerId = hostPlayer.id;
    state.myColor = hostPlayer.color;
    state.myEmoji = hostPlayer.emoji;
    state.players.set(hostPlayer.id, hostPlayer);
    
    try {
        state.peer = new Peer(state.roomCode, CONFIG.peerConfig);
        
        state.peer.on('open', id => {
            console.log('🎯 Room created:', id);
            hideLoading();
            $('room-code').textContent = state.roomCode;
            updateHostUI();
            showScreen('createRoom');
            showToast('Room created! 🎉');
        });
        
        state.peer.on('connection', handleIncomingConnection);
        
        state.peer.on('error', err => {
            console.error('Peer error:', err);
            hideLoading();
            
            if (err.type === 'unavailable-id') {
                state.peer.destroy();
                state.roomCode = generateRoomCode();
                setTimeout(initHost, 300);
            } else {
                showToast('Connection error!', 'error');
                resetToLanding();
            }
        });
        
        state.peer.on('disconnected', () => {
            if (!state.peer.destroyed) {
                state.peer.reconnect();
            }
        });
        
    } catch (error) {
        hideLoading();
        showToast('Could not create room!', 'error');
        resetToLanding();
    }
}

function handleIncomingConnection(conn) {
    console.log('📱 New connection:', conn.peer);
    
    conn.on('open', () => console.log('Connection ready:', conn.peer));
    conn.on('data', data => handleClientMessage(conn, data));
    conn.on('close', () => handlePlayerDisconnect(conn.peer));
    conn.on('error', () => handlePlayerDisconnect(conn.peer));
}

function handleClientMessage(conn, data) {
    switch (data.type) {
        case 'join':
            handlePlayerJoin(conn, data);
            break;
        case 'submit_words':
            handleWordSubmission(conn.peer, data.words);
            break;
    }
}

function handlePlayerJoin(conn, data) {
    const player = createPlayerData(data.nick, false);
    player.id = conn.peer;
    
    state.connections.set(conn.peer, { conn, player });
    state.players.set(player.id, player);
    
    conn.send({
        type: 'welcome',
        playerId: player.id,
        color: player.color,
        emoji: player.emoji,
        players: getPlayersArray(),
        phase: state.phase,
        story: state.currentStory
    });
    
    broadcastPlayerList();
    updateHostUI();
    showToast(`${data.nick} joined! 🎉`);
    playFartEffect();
}

function handleWordSubmission(peerId, words) {
    const player = state.players.get(peerId);
    if (player) {
        player.words = words;
        player.status = 'submitted';
        state.submittedPlayers.add(peerId);
        
        broadcastPlayerList();
        renderPlayerList('player-list');
        updateSubmissionTracker();
        checkAllSubmitted();
    }
}

function handlePlayerDisconnect(peerId) {
    const connData = state.connections.get(peerId);
    if (connData) {
        showToast(`${connData.player.nick} left`, 'info');
    }
    
    state.connections.delete(peerId);
    state.players.delete(peerId);
    state.submittedPlayers.delete(peerId);
    
    broadcastPlayerList();
    updateHostUI();
}

function updateHostUI() {
    renderPlayerList('player-list');
    
    const count = state.players.size;
    const btn = $('btn-start-game');
    
    btn.disabled = count < 1;
    btn.querySelector('.btn-subtitle').textContent = 
        count === 1 ? 'Play solo or wait for friends!' : `${count} players ready!`;
}

function broadcastToClients(data) {
    state.connections.forEach(({ conn }) => {
        if (conn.open) conn.send(data);
    });
}

function broadcastPlayerList() {
    broadcastToClients({ type: 'player_list', players: getPlayersArray() });
}

function broadcastGameStart(story) {
    state.phase = 'filling';
    state.players.forEach(p => { p.status = 'filling'; p.words = null; });
    state.submittedPlayers.clear();
    
    broadcastToClients({ type: 'start_game', story, players: getPlayersArray() });
}

function checkAllSubmitted() {
    const players = getPlayersArray();
    if (players.every(p => p.status === 'submitted') && players.length > 0) {
        // Combine words from all players
        const allWords = players.map(p => p.words || []);
        const combined = [];
        const blankCount = state.currentStory.blanks.length;
        
        for (let i = 0; i < blankCount; i++) {
            const playerIdx = i % allWords.length;
            const wordIdx = Math.floor(i / allWords.length);
            const word = allWords[playerIdx]?.[wordIdx] || allWords[playerIdx]?.[i % (allWords[playerIdx]?.length || 1)];
            combined.push(word || getRandomSillyWord(state.currentStory.blanks[i]));
        }
        
        setTimeout(() => revealStory(combined), 400);
    }
}

// ============ CLIENT FUNCTIONS ============
function initClient(roomCode, nickname) {
    state.mode = 'client';
    state.roomCode = roomCode.toUpperCase();
    state.nickname = nickname || 'Player';
    state.phase = 'lobby';
    
    showLoading('Joining game... 🎉');
    
    try {
        state.peer = new Peer(undefined, CONFIG.peerConfig);
        
        state.peer.on('open', () => {
            console.log('🎲 Connecting to host...');
            connectToHost();
        });
        
        state.peer.on('error', err => {
            console.error('Peer error:', err);
            hideLoading();
            
            if (err.type === 'peer-unavailable') {
                showToast('Room not found!', 'error');
                $('join-status').className = 'status-message error';
                $('join-status').textContent = '❌ Room not found. Check the code!';
            } else {
                showToast('Connection error!', 'error');
            }
            showScreen('joinRoom');
        });
        
    } catch (error) {
        hideLoading();
        showToast('Could not join!', 'error');
        showScreen('joinRoom');
    }
}

function connectToHost() {
    state.hostConnection = state.peer.connect(state.roomCode, { reliable: true });
    
    state.hostConnection.on('open', () => {
        console.log('✅ Connected!');
        hideLoading();
        state.hostConnection.send({ type: 'join', nick: state.nickname });
    });
    
    state.hostConnection.on('data', handleHostMessage);
    
    state.hostConnection.on('close', () => {
        if (state.phase !== 'reveal') {
            showToast('Host ended the game', 'info');
            resetToLanding();
        }
    });
    
    state.hostConnection.on('error', () => {
        hideLoading();
        showToast('Connection failed!', 'error');
        showScreen('joinRoom');
    });
}

function handleHostMessage(data) {
    switch (data.type) {
        case 'welcome':
            state.myPlayerId = data.playerId;
            state.myColor = data.color;
            state.myEmoji = data.emoji;
            state.phase = data.phase;
            data.players.forEach(p => state.players.set(p.id, p));
            
            if (data.phase === 'filling' && data.story) {
                state.currentStory = data.story;
                state.userWords = new Array(state.currentStory.blanks.length).fill('');
                showInputScreen();
            } else {
                showScreen('lobby');
                renderPlayerList('lobby-player-list');
            }
            showToast(`Welcome, ${state.nickname}! 🎉`);
            break;
            
        case 'player_list':
            state.players.clear();
            data.players.forEach(p => state.players.set(p.id, p));
            renderPlayerList('lobby-player-list');
            updateSubmissionTracker();
            break;
            
        case 'start_game':
            state.currentStory = data.story;
            state.phase = 'filling';
            state.userWords = new Array(state.currentStory.blanks.length).fill('');
            if (data.players) data.players.forEach(p => state.players.set(p.id, p));
            showInputScreen();
            showToast('Game started! 📝');
            break;
            
        case 'reveal_story':
            hideLoading();
            state.phase = 'reveal';
            showScreen('reveal');
            $('story-title').textContent = data.title || 'The Story';
            $('story-content').innerHTML = data.story;
            playFartEffect();
            break;
    }
}

function sendToHost(data) {
    if (state.hostConnection?.open) {
        state.hostConnection.send(data);
        return true;
    }
    return false;
}

// ============ STORY PICKER ============
function renderStoryList() {
    const container = $('story-list');
    container.innerHTML = '';
    
    state.templates.forEach((story, i) => {
        const card = document.createElement('div');
        card.className = 'story-card';
        card.innerHTML = `
            <h4>${story.title || `Story ${i + 1}`}</h4>
            <p>${story.blanks.length} silly words needed</p>
        `;
        card.addEventListener('click', () => selectStory(i));
        container.appendChild(card);
    });
}

function selectStory(index) {
    state.currentStory = state.templates[index];
    state.userWords = new Array(state.currentStory.blanks.length).fill('');
    
    document.querySelectorAll('.story-card').forEach((c, i) => {
        c.classList.toggle('selected', i === index);
    });
    
    if (state.mode === 'solo') {
        showInputScreen();
    } else if (state.mode === 'host') {
        broadcastGameStart(state.currentStory);
        const host = state.players.get(state.myPlayerId);
        if (host) host.status = 'filling';
        showInputScreen();
    }
}

function selectRandomStory() {
    selectStory(Math.floor(Math.random() * state.templates.length));
    playFartEffect();
}

// ============ INPUT SCREEN ============
function showInputScreen() {
    showScreen('input');
    renderWordInputs();
    updateProgress();
    updateSubmissionTracker();
}

function renderWordInputs() {
    const form = $('word-form');
    form.innerHTML = '';
    
    const colors = ['var(--twister-red)', 'var(--twister-yellow)', 'var(--twister-green)', 'var(--twister-blue)'];
    
    state.currentStory.blanks.forEach((blank, i) => {
        const group = document.createElement('div');
        group.className = 'word-input-group';
        group.style.animationDelay = `${i * 0.04}s`;
        
        const placeholder = getRandomSillyWord(blank);
        const colorStyle = colors[i % 4];
        const textColor = i % 4 === 1 ? 'var(--color-text-dark)' : 'white';
        
        group.innerHTML = `
            <label class="word-label">
                <span class="number" style="background:${colorStyle};color:${textColor}">${i + 1}</span>
                Give me a <strong>${blank}</strong>:
            </label>
            <input type="text" class="word-input" data-index="${i}" placeholder="e.g., ${placeholder}" autocomplete="off">
        `;
        form.appendChild(group);
    });
    
    const firstInput = form.querySelector('input');
    if (firstInput) setTimeout(() => firstInput.focus(), 150);
    
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', e => {
            state.userWords[parseInt(e.target.dataset.index)] = e.target.value;
            updateProgress();
        });
        
        input.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const next = input.closest('.word-input-group').nextElementSibling?.querySelector('input');
                if (next) next.focus();
                else handleReveal();
            }
        });
    });
}

function updateProgress() {
    const filled = state.userWords.filter(w => w.trim()).length;
    const total = state.currentStory.blanks.length;
    
    $('progress-fill').style.width = `${(filled / total) * 100}%`;
    $('progress-text').textContent = `${filled} / ${total}`;
    $('btn-reveal').disabled = filled < total;
}

// ============ REVEAL ============
function handleReveal() {
    // Fill empty with random silly words
    state.userWords = state.userWords.map((word, i) => 
        word.trim() || getRandomSillyWord(state.currentStory.blanks[i])
    );
    
    if (state.mode === 'client') {
        sendToHost({ type: 'submit_words', words: state.userWords });
        const me = state.players.get(state.myPlayerId);
        if (me) me.status = 'submitted';
        showLoading('Waiting for others... ⏳');
        updateSubmissionTracker();
    } else if (state.mode === 'host') {
        const host = state.players.get(state.myPlayerId);
        if (host) {
            host.words = state.userWords;
            host.status = 'submitted';
            state.submittedPlayers.add(state.myPlayerId);
        }
        broadcastPlayerList();
        updateSubmissionTracker();
        
        if (state.players.size === 1) {
            revealStory(state.userWords);
        } else {
            showLoading('Waiting for others... ⏳');
            checkAllSubmitted();
        }
    } else {
        revealStory(state.userWords);
    }
}

function revealStory(words) {
    hideLoading();
    state.phase = 'reveal';
    showScreen('reveal');
    
    $('story-title').textContent = state.currentStory.title || 'Your Masterpiece';
    
    let filled = state.currentStory.value;
    words.forEach((word, i) => {
        filled = filled.replace(new RegExp(`\\{${i}\\}`, 'g'), `<span class="filled-word">${word}</span>`);
    });
    
    $('story-content').innerHTML = filled;
    
    if (state.mode === 'host') {
        broadcastToClients({ type: 'reveal_story', title: state.currentStory.title, story: filled });
    }
    
    playFartEffect();
}

// ============ RESET ============
function resetToLanding() {
    if (state.peer) {
        state.peer.destroy();
        state.peer = null;
    }
    
    state.mode = null;
    state.connections.clear();
    state.players.clear();
    state.hostConnection = null;
    state.currentStory = null;
    state.userWords = [];
    state.phase = 'lobby';
    state.submittedPlayers.clear();
    state.reconnectAttempts = 0;
    
    showScreen('landing');
}

function resetForNewGame() {
    state.currentStory = null;
    state.userWords = [];
    state.phase = 'picking';
    state.submittedPlayers.clear();
    state.players.forEach(p => { p.status = 'connected'; p.words = null; });
}

// ============ EVENT LISTENERS ============
function initEventListeners() {
    // Landing
    $('btn-create-room').addEventListener('click', initHost);
    $('btn-join-room').addEventListener('click', () => {
        showScreen('joinRoom');
        $('join-status').textContent = '';
    });
    $('btn-single-player').addEventListener('click', async () => {
        state.mode = 'solo';
        await loadTemplates();
        renderStoryList();
        showScreen('storyPicker');
    });
    
    // Create Room
    $('btn-back-create').addEventListener('click', resetToLanding);
    $('btn-copy-code').addEventListener('click', () => {
        navigator.clipboard.writeText(state.roomCode)
            .then(() => showToast('Copied! 📋'))
            .catch(() => showToast('Copy failed', 'error'));
    });
    $('btn-share').addEventListener('click', () => {
        const text = `Join my Silly Mad Libs! 🎯\nCode: ${state.roomCode}`;
        if (navigator.share) {
            navigator.share({ title: 'Silly Mad Libs', text, url: location.href }).catch(() => {});
        } else {
            navigator.clipboard.writeText(text).then(() => showToast('Copied! 📋'));
        }
    });
    $('btn-start-game').addEventListener('click', async () => {
        await loadTemplates();
        renderStoryList();
        state.phase = 'picking';
        showScreen('storyPicker');
    });
    
    // Join Room
    $('btn-back-join').addEventListener('click', () => showScreen('landing'));
    $('input-room-code').addEventListener('input', e => {
        e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    });
    $('btn-join').addEventListener('click', () => {
        const nick = $('input-nickname').value.trim() || 'Player';
        const code = $('input-room-code').value.trim();
        
        if (code.length !== 6) {
            $('join-status').className = 'status-message error';
            $('join-status').textContent = '❌ Enter a 6-character code';
            return;
        }
        
        $('join-status').className = 'status-message info';
        $('join-status').textContent = '🔄 Connecting...';
        initClient(code, nick);
    });
    
    // Story Picker
    $('btn-back-picker').addEventListener('click', () => {
        showScreen(state.mode === 'host' ? 'createRoom' : 'landing');
    });
    $('btn-random-story').addEventListener('click', selectRandomStory);
    
    // Input
    $('word-form').addEventListener('submit', e => { e.preventDefault(); handleReveal(); });
    $('btn-reveal').addEventListener('click', e => { e.preventDefault(); handleReveal(); });
    
    // Reveal
    $('btn-play-again').addEventListener('click', () => {
        if (state.mode === 'client') {
            showToast('Wait for host!', 'info');
            return;
        }
        state.userWords = new Array(state.currentStory.blanks.length).fill('');
        if (state.mode === 'host') {
            state.players.forEach(p => { p.status = 'filling'; p.words = null; });
            state.submittedPlayers.clear();
            state.phase = 'filling';
            broadcastGameStart(state.currentStory);
        }
        showInputScreen();
    });
    
    $('btn-new-story').addEventListener('click', () => {
        resetForNewGame();
        if (state.mode === 'host') broadcastPlayerList();
        renderStoryList();
        showScreen('storyPicker');
    });
    
    $('btn-home').addEventListener('click', resetToLanding);
    
    // URL room code
    const params = new URLSearchParams(location.search);
    const roomParam = params.get('room');
    if (roomParam) {
        $('input-room-code').value = roomParam.toUpperCase();
        showScreen('joinRoom');
    }
}

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    loadTemplates().catch(() => {});
    console.log('🎯 Silly Mad Libs ready! Twister Edition 🎲');
});
