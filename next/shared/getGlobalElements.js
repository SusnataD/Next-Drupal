export const GetGlobalElements = async (context) => {
  try {
    // Fetch data from context for menu
    const mainMenu = await context.getMenu("main");
    const rightSideMenu = await context.getMenu("header-rightside-menu");
    const footerMainMenu = await context.getMenu("footer");
    const footerQuickLinks = await context.getMenu("footer-quick-links");

    // Fetch data from context for block basic
    const copyright = await context.getResource(
      "block_content--basic",
      "6c3b733e-790d-4864-a515-c00bed534788"
    );

    // Fetch data from context for nodes
    const socialMedia = await context.getResourceCollectionFromContext(
      "node--social_media",
      context, // here context is NEXT_PUBLIC_context_BASE_URL
      {
        params: {
          "filter[status]": 1,
          "fields[node--social_media]":
            "title,field_order,field_class,field_url",
          sort: "field_order",
        },
      }
    );

    return {
      headermenus: {
        main: mainMenu.tree,
        rightSideMenu: rightSideMenu.tree,
      },
      footermenus: {
        main: footerMainMenu.tree,
        quickLinks: footerQuickLinks.tree,
      },
      copyright: copyright,
      socialMedia: socialMedia,
    };
  } catch (error) {
    // Handle the error here, you can log it or dispatch another action
    console.error("Error fetching global elements:", error);
    // You might want to dispatch an error action or return an error payload
    // Example: dispatch({ type: GLOBAL_ELEMENTS_ERROR, payload: { error } });
  }
};
