#!/usr/bin/env node
'use strict';

const { makeChangeLog: githubMake } = require( './github' );
const { makeChangeLog: zenhubMake } = require( './zenhub' );
const { pkg } = require( './config' );
const makeChangeLog = pkg.zenhub ? zenhubMake : githubMake;

makeChangeLog();
