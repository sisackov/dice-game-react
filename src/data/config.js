export const WINDOW_SIZE = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
};

export const BAD_DICE_ROLLS = [12]; //these are the dice rolls that will reset the player's score to turn's starting score
export const NUM_OF_PLAYERS = 2;

export function getWindowWidth() {
    return window.innerWidth > 720 ? WINDOW_SIZE.LARGE : WINDOW_SIZE.SMALL;
}

export function getRandomInRange() {
    return Math.floor(Math.random() * 6) + 1;
}
