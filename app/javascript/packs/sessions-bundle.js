import ReactOnRails from "react-on-rails"; 
import Sessions from "../bundles/Sessions/components/Sessions";

// This is how react_on_rails can see the Recipes in the browser.
ReactOnRails.register({
  Sessions,
});