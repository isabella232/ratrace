'use strict';

const Hapi = require('@hapi/hapi');

const Helpers = require('./helpers');


const internals = {};


exports.start = async function ({ port }) {

    const server = Hapi.server({
        port,
        debug: false,
        operations: {
            cleanStop: false
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        config: {
            cache: false,
            response: {
                ranges: false
            },
            state: { parse: false }
        },
        handler: function (request, h) {

            return Helpers.payload();
        }
    });

    await server.start();

    return {
        stop: () => server.stop({ timeout: 10 })
    };
};
