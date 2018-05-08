import ReactOnRails from "react-on-rails";

import Recipes from "../bundles/Recipes/components/Recipes";

// This is how react_on_rails can see the Recipes in the browser.
ReactOnRails.register({
  Recipes,
});