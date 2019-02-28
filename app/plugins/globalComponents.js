import Vue from 'vue'
import {
  BaseInput,
  Card,
  BaseDropdown,
  BaseButton,
  BaseCheckbox
} from '~/components/atoms/template/index'
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

Vue.component(BaseInput.name, BaseInput)
Vue.component(Card.name, Card)
Vue.component(BaseDropdown.name, BaseDropdown)
Vue.component(BaseButton.name, BaseButton)
Vue.component(BaseCheckbox.name, BaseCheckbox)
