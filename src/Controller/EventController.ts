import EventEmitter from 'eventemitter3';
import { AnimationNames } from '../constants';

export class EventController {
	public static instance: EventController | undefined;

	public static getInstance(): EventController {
		if (!EventController.instance) {
			EventController.instance = new EventController();
		}

		return EventController.instance;
	}

	protected eventEmitter: EventEmitter;

	private constructor() {
		this.eventEmitter = new EventEmitter();
	}

	public on<T extends unknown[]>(event: AnimationNames, callback: (...props: unknown[] | T) => void): void {
		this.eventEmitter.on(event, callback);
	}

	public emit<T extends unknown[]>(event: AnimationNames, ...props: unknown[] | T): void {
		this.eventEmitter.emit(event, ...props);
	}
}