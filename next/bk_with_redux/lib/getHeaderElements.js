import { drupal } from "../lib/drupal";

async function getHeaderElements(context) {
  const mainMenu = await drupal.getMenu("main");

  // Uncomment the following lines if you include contactInfoBlock in the return
  // const contactInfoBlock = await drupal.getResource(
  //   "block_content--basic",
  //   "26456f82-8344-4b7a-856e-2f3dc5b791cd"
  // );

  return {
    menus: {
      main: mainMenu.tree,
    },
    // Uncomment the following lines if you include contactInfoBlock in the return
    // blocks: {
    //   contactInfoBlock,
    // },
  };
}

module.exports = { getHeaderElements };
