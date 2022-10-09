/**
 * функция для обработки окончаний слов
 *
 * @param n - числительное
 * @param titles - массив с тремя вариантами написания [один, два, много]
 * @returns {string}
 */

export function declOfNum(n: number, titles: string[]): string {
  return titles[
    n % 10 === 1 && n % 100 !== 11
      ? 0
      : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
      ? 1
      : 2
  ];
}
