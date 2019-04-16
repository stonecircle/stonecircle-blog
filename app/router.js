import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

const Router = EmberRouter.extend({
  location: config.locationType,
  metrics: service(),
  fastboot: service(),

  init() {
    this._super(...arguments);
    this.on('routeDidChange', () => {
        this._trackPage();
    });
  },

  _trackPage() {
    if(get(this, 'fastboot.isFastBoot')) {
      return
    }

    scheduleOnce('afterRender', this, () => {
      const page = this.get('url');
      const title = this.getWithDefault('currentRouteName', 'unknown');
      const hostname = 'blog.stonecircle.io'

      get(this, 'metrics').trackPage({ page, title, hostname });
    });
  }
});

Router.map(function() {
});

export default Router;
