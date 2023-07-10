export class Player {
    static GeneratePlayerName(){
        const adjectives = [
            "Mighty",
            "Sneaky",
            "Swift",
            "Daring",
            "Fierce",
            "Brave",
            "Clever",
            "Wise",
            "Shadow",
            "Blaze",
            "Thunder",
            "Epic",
            "Steel",
            "Golden",
            "Crimson",
            "Savage",
            "Radiant",
            "Viper",
            "Raven",
            "Phoenix"
          ];
        
          const nouns = [
            "Warrior",
            "Ninja",
            "Wizard",
            "Assassin",
            "Hunter",
            "Champion",
            "Knight",
            "Sorcerer",
            "Samurai",
            "Rogue",
            "Hero",
            "Dragon",
            "Guardian",
            "Mercenary",
            "Spartan",
            "Cyborg",
            "Pirate",
            "Jedi",
            "Viking",
            "Gladiator"
          ];
    
        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    
        const nickname = randomAdjective + " " + randomNoun;
        return nickname;
    }
    
    static DisplayPlayerName() {
        const blackPlayer = this.GeneratePlayerName()
        const whitePlayer = this.GeneratePlayerName()

        while(blackPlayer === whitePlayer) whitePlayer = this.GeneratePlayerName()

        document.getElementById('black-name').textContent = blackPlayer
        document.getElementById('white-name').textContent = whitePlayer
    }    
}