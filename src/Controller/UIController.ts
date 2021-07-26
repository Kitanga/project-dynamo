import { Application, Text } from 'pixi.js';
import { getApp } from '../Utils';

export class UIController {
	public static instance: UIController | undefined;
	
	public static getInstance(): UIController {
		if (!UIController.instance) {
			UIController.instance = new UIController();
		}

		return UIController.instance;
	}

	protected app: Application;

	// We'll use an array to define how our GUI will look like.
	structure: [string, Text][][] = [];

	// GUI elements
	protected scoreTitleText = new Text('');
	protected scoreText = new Text('');
	protected highScoreTitleText = new Text('');
	protected highScoreText = new Text('');

	protected score = 0;
	protected highscore = 0;

	private constructor() {
		this.app = getApp();

		this.structure = [
			[
				['Score: ', this.scoreTitleText], ['0', this.scoreText]
			],
			[
				['High Score: ', this.highScoreTitleText], ['0', this.highScoreText]
			],
		]

		this.setupText();
		this.setHighScore();
	}

	protected setupText(): void {
		let prevY = 10;
		this.structure.forEach((rowSet, y) => {
			const columnTextObj: Text[] = [];

			rowSet.forEach((textSet, x) => {
				const text = textSet[0];
				const textObj = textSet[1];

				textObj.anchor.set(0, 0.5);

				textObj.text = text;
				columnTextObj.push(textObj);
				this.app.stage.addChild(textObj);

				const prevTextObj: Text | undefined = columnTextObj[x - 1];

				if (prevTextObj) {
					const bounds = prevTextObj.getBounds();

					textObj.x = bounds.right;
					textObj.y = bounds.y + (textObj.height * 0.5);
				} else {
					textObj.y = prevY + (textObj.height * 0.5) + 10;
					prevY = textObj.y;
				}
			});
		});
	}

	/** Get highscore from localstorage */
	protected setHighScore(): void {
		this.highscore = parseFloat(localStorage.getItem('myHighScore') as string) || 0;

		this.updateHighScore();
	}

	/** Update the highscore gui element */
	protected updateHighScore(): void {
		this.highScoreText.text = this.highscore.toString();
	}

	/**
	 * Increment score by some amount
	 * @param points Amount to increment score by
	 */
	public addToScore(points: number): void {
		this.score += points;
		this.scoreText.text = this.score.toString();
	}

	/** Checks if player has beaten highscore */
	public gameEnded(): void {
		// Has record been beaten
		if (this.score > this.highscore) {
			this.highscore = this.score;
			
			localStorage.setItem('myHighScore', this.highscore.toString());
			this.updateHighScore();
		}
	}

	/** Returns the player's score */
	public getScore(): number {
		return this.score;
	}
}