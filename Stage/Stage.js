/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 271.5,
        y: 196.6999969482422
      })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];

    this.vars.input = 4;
    this.vars.n = 4;
    this.vars.fibo = [0, 1, 1, 2];

    this.watchers.fibo = new Watcher({
      label: "Fibo",
      style: "normal",
      visible: true,
      value: () => this.vars.fibo,
      x: 245,
      y: 175,
      width: 184,
      height: 256
    });
  }

  *whenGreenFlagClicked() {
    this.vars.fibo = [];
    this.vars.fibo.push(0);
    this.vars.fibo.push(1);
    this.vars.input = 0;
    while (!(this.compare(this.vars.input, 2) > 0)) {
      yield* this.askAndWait("How many Fibonacci numbers do you want? ( >2 )");
      this.vars.input = this.answer;
      yield;
    }
    for (let i = 0; i < this.toNumber(this.vars.input) - 2; i++) {
      this.vars.n = this.vars.fibo.length + 1;
      this.vars.fibo.push(
        this.toNumber(
          this.itemOf(this.vars.fibo, this.toNumber(this.vars.n) - 2)
        ) +
          this.toNumber(
            this.itemOf(this.vars.fibo, this.toNumber(this.vars.n) - 3)
          )
      );
      yield;
    }
  }
}
