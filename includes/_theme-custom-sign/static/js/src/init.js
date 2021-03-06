define(function(require, exports, module){
	var $ = require('modules/jquery'),
		tools = require('modules/tools'),
		js_request 	= require('theme-cache-request');
	require('modules/jquery.validate');
	require('modules/jquery.validate.lang.{locale}');
	
	// alert();
	exports.config = {
		fm_login_id : '#sign-login',
		fm_reg_id : '#sign-register',
		fm_recover_id : '#sign-recover',
		fm_reset_id : '#sign-reset',
		process_url : '',
		lang : {
			M00001 : 'Loading, please wait...',
			E00001 : 'Sorry, server error please try again later.'
		}
	
	};
	exports.cache = {};
	
	exports.init = function(){
		$(document).ready(function(){
			// alert('a');
			exports.sign.init();
			exports.recover.init();
			exports.reset.init();
		});
	};
	/** 
	 * reset
	 */
	exports.reset = {
		init : function(){
			exports.cache.$fm_reset = $(exports.config.fm_reset_id);
			if(exports.cache.$fm_reset[0]){
				tools.auto_focus(exports.cache.$fm_reset);
				var m = new tools.validate();
					m.process_url = exports.config.process_url + '&' + $.param({
						'theme-nonce' : js_request['theme-nonce']
					});
					m.done = function(data){
						if(data && data.status === 'success'){
							setTimeout(function(){
								location.href = location.href;
							},2000);
						}
					};
					m.loading_tx = exports.config.lang.M00001;
					m.error_tx = exports.config.lang.E00001;
					m.$fm = exports.cache.$fm_reset;
					m.init();
			}
		}
	};
	/** 
	 * recover
	 */
	exports.recover = {
		init : function(){
			exports.cache.$fm_recover = $(exports.config.fm_recover_id);
				// alert('a');
			if(exports.cache.$fm_recover[0]){
				tools.auto_focus(exports.cache.$fm_recover);
				var m = new tools.validate();
					m.process_url = exports.config.process_url + '&' + $.param({
						'theme-nonce' : js_request['theme-nonce']
					});
					m.loading_tx = exports.config.lang.M00001;
					m.error_tx = exports.config.lang.E00001;
					m.$fm = exports.cache.$fm_recover;
					m.init();
			}
		}
	};
	exports.sign = {
		init : function(){
			exports.cache.$fm_login = $(exports.config.fm_login_id);
			if(exports.cache.$fm_login[0]){
				tools.auto_focus(exports.cache.$fm_login);
				var m = new tools.validate();
					m.process_url = exports.config.process_url + '&' + $.param({
						'theme-nonce' : js_request['theme-nonce']
					});
					m.done = function(data){
						if(data && data.status === 'success'){
							location.href = location.href;
						}
					};
					m.loading_tx = exports.config.lang.M00001;
					m.error_tx = exports.config.lang.E00001;
					m.$fm = exports.cache.$fm_login;
					m.init();
			}else{
				exports.cache.$fm_reg = $(exports.config.fm_reg_id);
				if(exports.cache.$fm_reg[0]){
					tools.auto_focus(exports.cache.$fm_reg);
					var m = new tools.validate();
						m.process_url = exports.config.process_url + '&' + $.param({
							'theme-nonce' : js_request['theme-nonce']
						});
						m.rules = {
							'user[pwd-again]' : {
								equalTo : '#sign-pwd'
							}
						};
						m.done = function(data){
							if(data && data.status === 'success'){
								location.href = location.href;
							}
						};
						m.loading_tx = exports.config.lang.M00001;
						m.error_tx = exports.config.lang.E00001;
						m.$fm = exports.cache.$fm_reg;
						m.init();
				}
			}
		}
	};
});