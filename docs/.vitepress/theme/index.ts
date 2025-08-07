import DefaultTheme from 'vitepress/theme-without-fonts';
import Layout from './Layout.vue';
import './style.css';
import CdsSpinner from '@/components/Spinner.vue';
import Cdstip from '../../../src/utils/directives/cdstip';

export default {
  extends: DefaultTheme,
  Layout: Layout,
  enhanceApp({ app }) {
    app.component('CdsSpinner', CdsSpinner)
	app.directive("cdstip", Cdstip);
  }
}