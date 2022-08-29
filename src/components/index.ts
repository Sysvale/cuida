import Badge from './Badge.vue'; 


export default {
	install: (app: any, options: any) => {
		app.component('CdsBadge', Badge);
	},
}
