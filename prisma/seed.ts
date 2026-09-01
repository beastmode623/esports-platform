import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(' Начинаем наполнение базы данных...');

  // Очищаем таблицу перед наполнением, чтобы избежать дубликатов
  await prisma.tournament.deleteMany();

  const tournaments = [
    {
      slug: 'dota-2-pro-league',
      title: 'Dota 2 Pro League',
      game: 'Dota 2',
      prizePool: '$2,500,000',
      status: 'Регистрация открыта',
      startDate: '15 Сентября 2026',
      description: 'Крупнейший турнир сезона с участием лучших команд мира. Формат: Double Elimination, Best of 3 на всех стадиях кроме гранд-финала (Best of 5). Призовой фонд распределяется между топ-8 командами.',
      format: '5x5',
      region: 'EEU / Global',
      entryFee: 'Бесплатно',
    },
    {
      slug: 'cs2-major-finals',
      title: 'CS2 Major Finals',
      game: 'CS2',
      prizePool: '$1,000,000',
      status: 'Playoffs',
      startDate: '22 Октября 2026',
      description: 'Финальная стадия мейджора по Counter-Strike 2. Легендарная арена, Sold Out билеты, трансляция на 12 языках. Формат: Single Elimination, все матчи Best of 3.',
      format: '5x5',
      region: 'Global',
      entryFee: 'По инвайту',
    },
    {
      slug: 'dota-2-amateur-cup',
      title: 'Dota 2 Amateur Cup',
      game: 'Dota 2',
      prizePool: '$50,000',
      status: 'Регистрация открыта',
      startDate: '5 Ноября 2026',
      description: 'Открытый турнир для любителей и полупрофессиональных команд. Идеальная возможность заявить о себе перед скаутами. Все матчи транслируются на официальном канале.',
      format: '5x5',
      region: 'CIS',
      entryFee: '$10 / команда',
    },
  ];

  for (const t of tournaments) {
    await prisma.tournament.create({ data: t });
    console.log(`✅ Создан турнир: ${t.title}`);
  }

  console.log('🎉 База данных успешно наполнена!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });