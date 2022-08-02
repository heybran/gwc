#!/usr/bin/env node

/**
 * generate-web-components
 * Generator Web Components Boilderplate File.
 *
 * @author Brandon Zhang <https://brandonzhang.cn>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const generateWebComponent = require('./utils/generateWebComponent');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	flags.name && flags.destination && (await generateWebComponent(flags.name, flags.destination));

	debug && log(flags);
})();
