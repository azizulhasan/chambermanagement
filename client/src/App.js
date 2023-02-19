
/**
 * pages
 */
import Dashboard from "./pages/Dashboard";
import Front from "./pages/Front";
import { addCSS, addScripts } from "./utilities/utilities";

export default function App() {
  let pathArr = window.location.pathname

  if (!pathArr.includes('dashboard')) {
    return <Front />;
  } else {
    addCSS([
      '/assets/dashboard/css/styles.css',
      '/assets/dashboard/css/custom.css',
    ])
    addScripts([
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js",
      "/assets/dashboard/vendor/bootstrap/js/bootstrap.bundle.min.js",
      "/assets/dashboard/js/scripts.js"
    ]);


    return <Dashboard />


    {/*ADD PREFIX TO EVERY CLASS*/ }
    {/*in your editor (i used phpstorm ctrl+shift+f for find and replace in all files of a specific folder):*/ }
    {/*find  : (?<=class=["'][^"']*)([0-9a-zA-Z_-]+\s*)(?=[^"']*["'])*/ }
    {/*replace : tw-$1*/ }
  }
}


