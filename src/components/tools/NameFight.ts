import { nameFightData as data } from "./NameFightData";
import { getRandomElement, delay } from "./utils";

export interface Player {
  name: string;
  hp: number;
}

export async function gameLoop(
  players: Player[],
  onLogAdded: (log: string) => void,
  setHp: (index: number, value: number) => void
) {
  let rounder = 0;
  let roundCount = 0;

  while (players[0].hp > 0 && players[1].hp > 0) {
    attack(players, rounder, onLogAdded, setHp);
    rounder = 1 - rounder;
    roundCount++;
    if (roundCount > 200) {
      console.error("Too many rounds! There may be some errors.");
      break;
    }
    await delay(1000);
  }

  const winner = players[0].hp > 0 ? players[0].name : players[1].name;
  return winner;
}

function attack(
  players: Player[],
  rounder: number,
  onLogAdded: (log: string) => void,
  setHp: (index: number, value: number) => void
) {
  const who = players[rounder].name;
  const to = players[1 - rounder].name;

  //动作类型
  if (Math.random() > 0.8) {
    //特殊动作
    specialAction(players, rounder, who, to, onLogAdded, setHp);
    return;
  }
  //攻击类型
  const [attack, index] = getRandomElement(data.attackTypes);

  const hit = Math.random() <= 0.9;
  if (hit === false) {
    onLogAdded(`${who}使用了【${attack}】, 但是被${to}闪躲了！`);
    return;
  }

  const [modifier, modIndex] = getRandomElement(data.modifiers);
  const damage = Math.floor(data.attackBases[index] * data.mods[modIndex]);
  setHp(1 - rounder, players[1 - rounder].hp - damage);
  onLogAdded(
    `${who}使用了${modifier}的【${attack}】，造成了<span class="damage">${damage}</span>点伤害！`
  );
}

function specialAction(
  players: Player[],
  rounder: number,
  who: string,
  to: string,
  onLogAdded: (log: string) => void,
  setHp: (index: number, value: number) => void
) {
  const [special, _] = getRandomElement(data.special_actions);
  switch (special) {
    case "Idle":
      onLogAdded(`${who}开始怀疑人生。`);
      break;
    case "Heal":
      const [heal, _] = getRandomElement(data.heals);
      const healNum = Math.floor(
        Math.random() * (data.healRange[1] - data.healRange[0]) +
          data.healRange[0]
      );
      setHp(rounder, players[rounder].hp + healNum);
      onLogAdded(
        `${who}${heal}, 恢复了<strong class="heal">${healNum}</strong>点生命！`
      );
      break;
    case "咬":
      setHp(1 - rounder, players[1 - rounder].hp - 1);
      onLogAdded(
        `${who}咬了${to}一口，造成<span class="damage">1</span>点真实伤害！`
      );
      break;
    case "天谴":
      setHp(rounder, players[rounder].hp * 0.5);
      onLogAdded(`${who}遭到了天谴，生命值减半！`);
      break;
  }
}
