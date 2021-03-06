// Import styles
import './main.scss';

// Libs imports
import domready from 'domready';
import lazySizes from 'lazysizes';
import 'lazysizes/plugins/unveilhooks/ls.unveilhooks.min';

// Custom JS imports
import './about/about_index';
import './home/home_index';
import './projet-pages/projet-pages_index';
import './projets/projets_index';

domready(() => {
  lazySizes.init();
});
