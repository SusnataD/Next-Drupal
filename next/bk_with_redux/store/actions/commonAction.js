import { GET_GLOBAL_ELEMENTS } from "./actionType";
import { drupal } from "../../lib/drupal";

export const getGlobalElements = () => {
  return async (dispatch) => {
    try {
      // Fetch data from Drupal for menu
      const mainMenu = await drupal.getMenu("main");
      const rightSideMenu = await drupal.getMenu("header-rightside-menu");
      const footerMainMenu = await drupal.getMenu("footer");
      const footerQuickLinks = await drupal.getMenu("footer-quick-links");

      // Fetch data from Drupal for block basic
      const copyright = await drupal.getResource(
        "block_content--basic",
        "6c3b733e-790d-4864-a515-c00bed534788"
      );

      // Fetch data from Drupal for nodes
      const socialMedia = await drupal.getResourceCollectionFromContext(
        "node--social_media",
        drupal, // here context is NEXT_PUBLIC_DRUPAL_BASE_URL
        {
          params: {
            "filter[status]": 1,
            "fields[node--social_media]":
              "title,field_order,field_class,field_url",
            sort: "field_order",
          },
        }
      );

      return dispatch({
        type: GET_GLOBAL_ELEMENTS,
        payload: {
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
        },
      });
    } catch (error) {
      // Handle the error here, you can log it or dispatch another action
      console.error("Error fetching global elements:", error);
      // You might want to dispatch an error action or return an error payload
      // Example: dispatch({ type: GLOBAL_ELEMENTS_ERROR, payload: { error } });
    }
  };
};
