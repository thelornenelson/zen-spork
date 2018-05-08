import ReactOnRails from "react-on-rails";
import Users from "../bundles/Users/components/Users";

// This is how react_on_rails can see the Recipes in the browser.
ReactOnRails.register({
  Users,
});