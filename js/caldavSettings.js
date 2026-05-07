
(rl => { if (rl) {

	class CaldavUserSettings
	{
		constructor()
		{
			this.caldavURL = ko.observable('');

			this.loading = ko.observable(false);
			this.saving = ko.observable(false);

			this.savingOrLoading = ko.computed(() => {
				return this.loading() || this.saving();
			});
		}

		caldavJsonSaveData()
		{
			if (!this.saving()) {
				this.saving(true);

				rl.pluginRemoteRequest((iError, oData) => {

					this.saving(false);

					if (iError) {
						console.error({
							iError: iError,
							oData: oData
						});
					} else {
						console.dir({
							iError: iError,
							oData: oData
						});
					}

				}, 'JsonSaveCaldavUserData', {
					'CaldavURL': this.caldavURL(),
				});
			}
		}

		onBuild()
		{
			//this.loading(true);

			rl.pluginRemoteRequest((iError, oData) => {

				this.loading(false);

				if (!iError) {
					this.caldavURL(oData.Result.CaldavURL || '');
				}

			}, 'JsonGetCaldavUserData');

		}
	}

	rl.addSettingsViewModel(CaldavUserSettings, 'caldavSettingsTab',
		'SETTINGS_CALDAV_PLUGIN/TAB_NAME', 'Caldav');

}})(window.rl);
