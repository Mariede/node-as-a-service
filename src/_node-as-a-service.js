'use strict';

// -------------------------------------------------------------------------
// Modulos de inicializacao
const config = require('./config');
const parseArgs = require('minimist');
const Service = require('node-windows').Service;

// Constantes globais
const sOn = 'on';
const sOff = 'off';
// -------------------------------------------------------------------------

const _servicoOnOff = param => {
	const dataService = {};

	if (config.name) {
		dataService.name = config.name;
	}

	if (config.description) {
		dataService.description = config.description;
	}

	if (config.script) {
		dataService.script = config.script;
	}

	if (config.env) {
		dataService.env = config.env;
	}

	const svc = new Service(
		dataService
	);

	svc.on(
		'install',
		() => {
			svc.start();
			console.log('Install complete.');
		}
	);

	svc.on(
		'alreadyinstalled',
		() => {
			console.log('Already Installed.');
		}
	);

	svc.on(
		'start',
		() => {
			console.log(`${svc.name} started!`);
		}
	);

	svc.on(
		'uninstall',
		() => {
			console.log('Uninstall complete.');
			console.log(`${svc.exists ? 'Service still seems to exist... check it manually.' : 'Service does not exist.'}`);
		}
	);

	switch (param) {
		case sOn: {
			// Instalando o servico
			svc.install();
			break;
		}
		case sOff: {
			// Desinstalando o serviço
			svc.uninstall();
			break;
		}
		default: {
			console.log('Invalid or undefined argument for function _servicoOnOff...');
		}
	}
};

const executeAction = () => {
	const args = parseArgs(process.argv);
	const lenArgs = (typeof args === 'object' ? Object.keys(args).length : 0);
	const errMsg = 'Use one of the arguments:\n   --on  : to install a Windows service associated with the Node project (see config file)\n   --off : to uninstall a Windows service associated with the Node project (see config file)\n\nExample: node ./src/_node-as-a-service --on\n';

	if (lenArgs === 2) {
		if (args.on || args.off) {
			if (args.on) {
				_servicoOnOff(sOn);
			} else {
				_servicoOnOff(sOff);
			}
		} else {
			console.log(errMsg);
		}
	} else {
		console.log(errMsg);
	}
};

executeAction();
