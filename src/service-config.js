'use strict';

/*
Para modo silencioso (eliminar stderr e stdout): atualizar chave logmode para none no arquivo xml da pasta daemon
*/

const project = 'BOILER-SERVER';

/*
	-> name			: Nome do servico.
	-> description	: Descricao que vai aparecer no Gerenciamento de serviços do Windows.
	-> script		: Caminho absoluto do script ou aplicacao no servidor.
	-> env			: Define a variavel de ambiente NODE_ENV do node para producao (production).
*/
const serviceConfig = {
	name: `NODE - ${project}`,
	description: `Serviço associado a aplicação NODE - ${project}`,
	script: 'C:\\project-path\\API\\main.js',
	env: [
		{
			name: 'NODE_ENV',
			value: 'production'
		}
	]
};

module.exports = serviceConfig;
