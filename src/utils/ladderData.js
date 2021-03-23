export const ladderData = [
  {
    rank: 1,
    name: 'Danku',
    points: 1100,
    games: [
      {
        date: '12/14/2020',
        opponent: 'AOD Gaming',
        result: 'W',
        map: 'Vales of the Templar',
        replay:
          'https://www.gamereplays.org/cnctiberiandawnremastered/replays.php?game=99&show=details&id=349370',
      },
      {
        date: '12/14/2020',
        opponent: 'Adam',
        result: 'L',
        map: 'Sand Crystal Shard',
        replay:
          'https://www.gamereplays.org/cnctiberiandawnremastered/replays.php?game=99&show=details&id=349370',
      },
      {
        date: '12/14/2020',
        opponent: 'AOD Gaming',
        result: 'W',
        map: 'Vales of the Templar',
        replay:
          'https://www.gamereplays.org/cnctiberiandawnremastered/replays.php?game=99&show=details&id=349370',
      },
    ],
  },
  {
    rank: 2,
    name: 'AOD Gaming',
    points: 900,
    games: [
      {
        date: '12/14/2020',
        opponent: 'Danku',
        result: 'L',
        map: 'Vales of the Templar',
        replay:
          'https://www.gamereplays.org/cnctiberiandawnremastered/replays.php?game=99&show=details&id=349370',
      },
      {
        date: '12/14/2020',
        opponent: 'Danku',
        result: 'L',
        map: 'Vales of the Templar',
        replay:
          'https://www.gamereplays.org/cnctiberiandawnremastered/replays.php?game=99&show=details&id=349370',
      },
    ],
  },
  {
    rank: 3,
    name: 'Adam',
    points: 1050,
    games: [
      {
        date: '12/14/2020',
        opponent: 'Danku',
        result: 'W',
        map: 'Sand Crystal Shard',
        replay:
          'https://www.gamereplays.org/cnctiberiandawnremastered/replays.php?game=99&show=details&id=349370',
      },
    ],
  },
  {
    rank: 4,
    name: 'Rambo',
    points: 1000,
    games: [],
  },
  {
    rank: 5,
    name: 'PaRappa56',
    points: 1000,
    games: [],
  },
  {
    rank: 6,
    name: 'WarMachine',
    points: 1000,
    games: [],
  },
  {
    rank: 7,
    name: 'Peasy',
    points: 1000,
    games: [],
  },
  {
    rank: 8,
    name: 'Khanomancer',
    points: 1000,
    games: [],
  },
];

// Sorting based on points values
ladderData.sort(function (a, b) {
  return b.points - a.points;
});
