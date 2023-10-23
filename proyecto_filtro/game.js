class Game {
    code;
    name_game;
    theme;
    price_license;
    points;

    constructor(code,name_game,theme,price_license,points){
        this.code = code;
        this.name_game = name_game;
        this.theme = theme;
        this.price_license = price_license;
        this.points = points;
    }
}

export default Game