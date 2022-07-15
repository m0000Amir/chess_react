import {Colors} from "./Colors";
import {Figure} from "./figures/Figure";
import {Board} from "./Board";

export class Cell {
  readonly x: number;
  readonly y: number
  readonly color: Colors;
  figure: Figure | null;
  board: Board;
  available: boolean; // is able to move to this
  id: number // react key

  constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
    this.x = x;
    this.y = y;
    this.board = board;
    this.color = color;
    this.figure = figure;
    this.available= false;
    this.id = Math.random();
  }
}