"use strict";

const { Post } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Post.bulkCreate(
      [
        {
          title: "Black Clover",
          description: `Asta and Yuno were abandoned at the same church on the same day. Raised together as children, they came to know of the "Wizard King"—a title given to the strongest mage in the kingdom—and promised that they would compete against each other for the position of the next Wizard King. However, as they grew up, the stark difference between them became evident. While Yuno is able to wield magic with amazing power and control, Asta cannot use magic at all and desperately tries to awaken his powers by training physically. When they reach the age of 15, Yuno is bestowed a spectacular Grimoire with a four-leaf clover, while Asta receives nothing. However, soon after, Yuno is attacked by a person named Lebuty, whose main purpose is to obtain Yuno's Grimoire. Asta tries to fight Lebuty, but he is outmatched. Though without hope and on the brink of defeat, he finds the strength to continue when he hears Yuno's voice. Unleashing his inner emotions in a rage, Asta receives a five-leaf clover Grimoire, a "Black Clover" giving him enough power to defeat Lebuty. A few days later, the two friends head out into the world, both seeking the same goal—to become the Wizard King!`,
          userId: "1",
          categories_id: "2",
        },
        {
          title: "Mushoku Tensei: Jobless Reincarnation",
          description: `Despite being bullied, scorned, and oppressed all of his life, a 34-year-old shut-in still found the resolve to attempt something heroic—only for it to end in a tragic accident. But in a twist of fate, he awakens in another world as Rudeus Greyrat, starting life again as a baby born to two loving parents. Preserving his memories and knowledge from his previous life, Rudeus quickly adapts to his new environment. With the mind of a grown adult, he starts to display magical talent that exceeds all expectations, honing his skill with the help of a mage named Roxy Migurdia. Rudeus learns swordplay from his father, Paul, and meets Sylphiette, a girl his age who quickly becomes his closest friend. As Rudeus' second chance at life begins, he tries to make the most of his new opportunity while conquering his traumatic past. And perhaps, one day, he may find the one thing he could not find in his old world—love.`,
          userId: "2",
          categories_id: "1",
        },
        {
          title: "Hell's Paradise",
          description: `After being sentenced to death, ninja Gabimaru the Hollow finds himself apathetic. After leading a blood-soaked life, Gabimaru believes he deserves to die. However, every attempt to execute him inexplicably fails. Finally, Sagiri Yamada Asaemon, a fledgling member of a famed executioner clan, is asked to take Gabimaru's life; yet Sagiri makes no move to kill him as requested. Insisting that Gabimaru will not die because of his love for his wife, Sagiri instead offers him the chance to obtain a full pardon for his crimes. If he can travel to the island of Shinsekyo and obtain the Elixir of Life—which supposedly grants immortality—and bring it back for the shogun, then his freedom will be assured. But of the many who have traveled to Shinsekyo in search of the mythical Elixir, not a single person has returned sound of mind, if at all. Though unaware of the numerous dangers ahead, Gabimaru decides to accept the offer—alongside ten other death row convicts—in hope that he and his wife may finally live in peace.`,
          userId: "3",
          categories_id: "2",
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Posts";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        userId: { [Op.in]: ["1", "2", "3", "4"] },
      },
      {}
    );
  },
};
